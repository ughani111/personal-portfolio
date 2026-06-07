import {
  candleSchema,
  normalizeTicker,
  positionSchema,
  settingsSchema,
  watchlistItemSchema,
  type Candle,
  type Position,
  type Settings,
  type WatchlistItem
} from "@open-stack/core";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { AlertRepository, AppStorage, CandleRepository, PositionRepository, SettingsRepository, WatchlistRepository } from "./index";

type WatchlistRow = { ticker: string; created_at: string };
type CandleRow = { ticker: string; date: string; open: number; high: number; low: number; close: number; volume: number };
type PositionRow = {
  ticker: string;
  buy_price: number;
  shares: number;
  highest_price: number;
  stop_loss: number;
  target1: number;
  target2: number;
  trailing_stop_percent: number;
  opened_at: string;
  closed_at: string | null;
};
type SettingsRow = { key: string; value: string };
type AlertRow = { ticker: string; fingerprint: string; message: string; sent_at: string };

function nowIso(): string {
  return new Date().toISOString();
}

function rowToWatchlistItem(row: WatchlistRow): WatchlistItem {
  return watchlistItemSchema.parse({ ticker: row.ticker, createdAt: row.created_at });
}

function rowToCandle(row: CandleRow): Candle {
  return candleSchema.parse(row);
}

function rowToPosition(row: PositionRow): Position {
  return positionSchema.parse({
    ticker: row.ticker,
    buyPrice: row.buy_price,
    shares: row.shares,
    highestPrice: row.highest_price,
    stopLoss: row.stop_loss,
    target1: row.target1,
    target2: row.target2,
    trailingStopPercent: row.trailing_stop_percent,
    openedAt: row.opened_at,
    closedAt: row.closed_at
  });
}

class SqliteWatchlistRepository implements WatchlistRepository {
  constructor(private readonly db: Database.Database) {}

  async list(): Promise<WatchlistItem[]> {
    const rows = this.db.prepare("select ticker, created_at from watchlist order by ticker").all() as WatchlistRow[];
    return rows.map(rowToWatchlistItem);
  }

  async add(ticker: string): Promise<WatchlistItem> {
    const parsedTicker = normalizeTicker(ticker);
    const createdAt = nowIso();
    this.db.prepare("insert or ignore into watchlist (ticker, created_at) values (?, ?)").run(parsedTicker, createdAt);
    const row = this.db.prepare("select ticker, created_at from watchlist where ticker = ?").get(parsedTicker) as WatchlistRow;
    return rowToWatchlistItem(row);
  }

  async remove(ticker: string): Promise<void> {
    this.db.prepare("delete from watchlist where ticker = ?").run(normalizeTicker(ticker));
  }
}

class SqliteCandleRepository implements CandleRepository {
  constructor(private readonly db: Database.Database) {}

  async get(ticker: string): Promise<Candle[]> {
    const rows = this.db
      .prepare("select ticker, date, open, high, low, close, volume from candles where ticker = ? order by date asc")
      .all(normalizeTicker(ticker)) as CandleRow[];
    return rows.map(rowToCandle);
  }

  async upsertMany(ticker: string, candles: Candle[], fetchedAt: string): Promise<void> {
    const parsedTicker = normalizeTicker(ticker);
    const insert = this.db.prepare(`
      insert into candles (ticker, date, open, high, low, close, volume)
      values (@ticker, @date, @open, @high, @low, @close, @volume)
      on conflict(ticker, date) do update set
        open = excluded.open,
        high = excluded.high,
        low = excluded.low,
        close = excluded.close,
        volume = excluded.volume
    `);
    const transaction = this.db.transaction((items: Candle[]) => {
      for (const candle of items) insert.run(candleSchema.parse({ ...candle, ticker: parsedTicker }));
      this.db
        .prepare("insert into fetch_cache (ticker, fetched_at) values (?, ?) on conflict(ticker) do update set fetched_at = excluded.fetched_at")
        .run(parsedTicker, fetchedAt);
    });

    transaction(candles);
  }

  async getFetchAgeMinutes(ticker: string): Promise<number | null> {
    const row = this.db.prepare("select fetched_at from fetch_cache where ticker = ?").get(normalizeTicker(ticker)) as { fetched_at: string } | undefined;
    if (!row) return null;
    return Math.max(0, (Date.now() - new Date(row.fetched_at).getTime()) / 60_000);
  }
}

class SqlitePositionRepository implements PositionRepository {
  constructor(private readonly db: Database.Database) {}

  async listOpen(): Promise<Position[]> {
    const rows = this.db.prepare("select * from positions where closed_at is null order by opened_at desc").all() as PositionRow[];
    return rows.map(rowToPosition);
  }

  async getOpen(ticker: string): Promise<Position | null> {
    const row = this.db.prepare("select * from positions where ticker = ? and closed_at is null").get(normalizeTicker(ticker)) as PositionRow | undefined;
    return row ? rowToPosition(row) : null;
  }

  async open(input: Omit<Position, "openedAt" | "closedAt" | "highestPrice">): Promise<Position> {
    const position = positionSchema.parse({
      ...input,
      ticker: normalizeTicker(input.ticker),
      highestPrice: input.buyPrice,
      openedAt: nowIso(),
      closedAt: null
    });
    this.db
      .prepare(
        `insert into positions
          (ticker, buy_price, shares, highest_price, stop_loss, target1, target2, trailing_stop_percent, opened_at, closed_at)
         values (@ticker, @buyPrice, @shares, @highestPrice, @stopLoss, @target1, @target2, @trailingStopPercent, @openedAt, @closedAt)`
      )
      .run(position);
    return position;
  }

  async update(position: Position): Promise<void> {
    const parsed = positionSchema.parse(position);
    this.db
      .prepare(
        `update positions set
          highest_price = @highestPrice,
          stop_loss = @stopLoss,
          target1 = @target1,
          target2 = @target2,
          trailing_stop_percent = @trailingStopPercent,
          closed_at = @closedAt
        where ticker = @ticker and opened_at = @openedAt`
      )
      .run(parsed);
  }

  async close(ticker: string): Promise<void> {
    this.db.prepare("update positions set closed_at = ? where ticker = ? and closed_at is null").run(nowIso(), normalizeTicker(ticker));
  }
}

class SqliteAlertRepository implements AlertRepository {
  constructor(private readonly db: Database.Database) {}

  async wasSent(ticker: string, fingerprint: string): Promise<boolean> {
    const row = this.db.prepare("select 1 from alerts where ticker = ? and fingerprint = ?").get(normalizeTicker(ticker), fingerprint);
    return Boolean(row);
  }

  async record(ticker: string, fingerprint: string, message: string): Promise<void> {
    this.db.prepare("insert or ignore into alerts (ticker, fingerprint, message, sent_at) values (?, ?, ?, ?)").run(normalizeTicker(ticker), fingerprint, message, nowIso());
  }

  async latest(limit: number): Promise<Array<{ ticker: string; fingerprint: string; message: string; sentAt: string }>> {
    const rows = this.db.prepare("select ticker, fingerprint, message, sent_at from alerts order by sent_at desc limit ?").all(limit) as AlertRow[];
    return rows.map((row) => ({
      ticker: row.ticker,
      fingerprint: row.fingerprint,
      message: row.message,
      sentAt: row.sent_at
    }));
  }
}

class SqliteSettingsRepository implements SettingsRepository {
  constructor(private readonly db: Database.Database) {}

  async get(): Promise<Settings> {
    const rows = this.db.prepare("select key, value from settings").all() as SettingsRow[];
    const values = Object.fromEntries(rows.map((row) => [row.key, JSON.parse(row.value)]));
    return settingsSchema.parse(values);
  }

  async update(settings: Partial<Settings>): Promise<Settings> {
    const current = await this.get();
    const next = settingsSchema.parse({ ...current, ...settings });
    const insert = this.db.prepare("insert into settings (key, value) values (?, ?) on conflict(key) do update set value = excluded.value");
    for (const [key, value] of Object.entries(next)) {
      if (value !== undefined) insert.run(key, JSON.stringify(value));
    }
    return next;
  }
}

export function createSqliteStorage(filename = "data/tradesentinel.sqlite"): AppStorage {
  mkdirSync(dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma("journal_mode = WAL");
  db.exec(`
    create table if not exists watchlist (
      ticker text primary key,
      created_at text not null
    );

    create table if not exists candles (
      ticker text not null,
      date text not null,
      open real not null,
      high real not null,
      low real not null,
      close real not null,
      volume real not null,
      primary key (ticker, date)
    );

    create table if not exists fetch_cache (
      ticker text primary key,
      fetched_at text not null
    );

    create table if not exists positions (
      ticker text not null,
      buy_price real not null,
      shares real not null,
      highest_price real not null,
      stop_loss real not null,
      target1 real not null,
      target2 real not null,
      trailing_stop_percent real not null,
      opened_at text not null,
      closed_at text,
      primary key (ticker, opened_at)
    );

    create table if not exists alerts (
      ticker text not null,
      fingerprint text not null,
      message text not null,
      sent_at text not null,
      primary key (ticker, fingerprint)
    );

    create table if not exists settings (
      key text primary key,
      value text not null
    );
  `);

  const storage: AppStorage = {
    watchlist: new SqliteWatchlistRepository(db),
    candles: new SqliteCandleRepository(db),
    positions: new SqlitePositionRepository(db),
    alerts: new SqliteAlertRepository(db),
    settings: new SqliteSettingsRepository(db)
  };

  void storage.settings.update({});
  return storage;
}
