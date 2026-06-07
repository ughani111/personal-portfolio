import type { Candle, Position, Settings, TradeSignal, WatchlistItem } from "@open-stack/core";

export interface WatchlistRepository {
  list(): Promise<WatchlistItem[]>;
  add(ticker: string): Promise<WatchlistItem>;
  remove(ticker: string): Promise<void>;
}

export interface CandleRepository {
  get(ticker: string): Promise<Candle[]>;
  upsertMany(ticker: string, candles: Candle[], fetchedAt: string): Promise<void>;
  getFetchAgeMinutes(ticker: string): Promise<number | null>;
}

export interface PositionRepository {
  listOpen(): Promise<Position[]>;
  getOpen(ticker: string): Promise<Position | null>;
  open(input: Omit<Position, "openedAt" | "closedAt" | "highestPrice">): Promise<Position>;
  update(position: Position): Promise<void>;
  close(ticker: string): Promise<void>;
}

export interface AlertRepository {
  wasSent(ticker: string, fingerprint: string): Promise<boolean>;
  record(ticker: string, fingerprint: string, message: string): Promise<void>;
  latest(limit: number): Promise<Array<{ ticker: string; fingerprint: string; message: string; sentAt: string }>>;
}

export interface SettingsRepository {
  get(): Promise<Settings>;
  update(settings: Partial<Settings>): Promise<Settings>;
}

export interface AppStorage {
  watchlist: WatchlistRepository;
  candles: CandleRepository;
  positions: PositionRepository;
  alerts: AlertRepository;
  settings: SettingsRepository;
}
