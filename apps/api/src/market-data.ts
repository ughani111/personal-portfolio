import { candleSchema, normalizeTicker, type Candle } from "@open-stack/core";
import type { AppStorage } from "@open-stack/storage";

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    }>;
    error?: unknown;
  };
};

export class MarketDataClient {
  constructor(
    private readonly storage: AppStorage,
    private readonly cacheTtlMinutes: number
  ) {}

  async getDailyCandles(ticker: string, forceRefresh = false): Promise<Candle[]> {
    const parsedTicker = normalizeTicker(ticker);
    const cacheAge = await this.storage.candles.getFetchAgeMinutes(parsedTicker);
    if (!forceRefresh && cacheAge !== null && cacheAge < this.cacheTtlMinutes) {
      const cached = await this.storage.candles.get(parsedTicker);
      if (cached.length > 0) return cached;
    }

    const candles = await this.fetchYahooDailyCandles(parsedTicker);
    await this.storage.candles.upsertMany(parsedTicker, candles, new Date().toISOString());
    return this.storage.candles.get(parsedTicker);
  }

  async getLatestPrice(ticker: string): Promise<number | null> {
    const candles = await this.getDailyCandles(ticker);
    return candles.at(-1)?.close ?? null;
  }

  private async fetchYahooDailyCandles(ticker: string): Promise<Candle[]> {
    const period2 = Math.floor(Date.now() / 1000);
    const period1 = period2 - 3600 * 24 * 260;
    const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}`);
    url.searchParams.set("period1", String(period1));
    url.searchParams.set("period2", String(period2));
    url.searchParams.set("interval", "1d");
    url.searchParams.set("events", "history");

    const response = await fetch(url, {
      headers: {
        "user-agent": "TradeSentinel/0.1"
      }
    });
    if (!response.ok) throw new Error(`Market data request failed for ${ticker}: ${response.status}`);

    const payload = (await response.json()) as YahooChartResponse;
    const result = payload.chart?.result?.[0];
    const timestamps = result?.timestamp ?? [];
    const quote = result?.indicators?.quote?.[0];
    if (!quote || timestamps.length === 0) throw new Error(`No market data returned for ${ticker}`);

    const candles: Candle[] = [];
    for (let index = 0; index < timestamps.length; index += 1) {
      const open = quote.open?.[index];
      const high = quote.high?.[index];
      const low = quote.low?.[index];
      const close = quote.close?.[index];
      const volume = quote.volume?.[index];
      const timestamp = timestamps[index];
      if (!timestamp || open === null || high === null || low === null || close === null || volume === null) continue;
      if (open === undefined || high === undefined || low === undefined || close === undefined || volume === undefined) continue;

      candles.push(
        candleSchema.parse({
          ticker,
          date: new Date(timestamp * 1000).toISOString().slice(0, 10),
          open,
          high,
          low,
          close,
          volume
        })
      );
    }

    return candles;
  }
}
