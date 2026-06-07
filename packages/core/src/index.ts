import { z } from "zod";

export const tickerSchema = z
  .string()
  .trim()
  .min(1)
  .max(12)
  .transform((value) => value.toUpperCase().replace(/[^A-Z0-9.-]/g, ""));

export const candleSchema = z.object({
  ticker: z.string().min(1),
  date: z.string().min(1),
  open: z.number().positive(),
  high: z.number().positive(),
  low: z.number().positive(),
  close: z.number().positive(),
  volume: z.number().nonnegative()
});

export const watchlistItemSchema = z.object({
  ticker: z.string().min(1),
  createdAt: z.string().datetime()
});

export const positionSchema = z.object({
  ticker: z.string().min(1),
  buyPrice: z.number().positive(),
  shares: z.number().positive(),
  highestPrice: z.number().positive(),
  stopLoss: z.number().positive(),
  target1: z.number().positive(),
  target2: z.number().positive(),
  trailingStopPercent: z.number().positive(),
  openedAt: z.string().datetime(),
  closedAt: z.string().datetime().nullable()
});

export const settingsSchema = z.object({
  minConfidence: z.number().min(0).max(100).default(75),
  maxRiskPercent: z.number().positive().max(10).default(1),
  trailingStopPercent: z.number().positive().max(30).default(4),
  telegramChatId: z.string().min(1).optional()
});

export const tradeSignalSchema = z.object({
  ticker: z.string().min(1),
  price: z.number().positive(),
  confidence: z.number().min(0).max(100),
  expectedHold: z.literal("1-3 days"),
  buyZoneLow: z.number().positive(),
  buyZoneHigh: z.number().positive(),
  target1: z.number().positive(),
  target2: z.number().positive(),
  stopLoss: z.number().positive(),
  trailingStopPercent: z.number().positive(),
  invalidation: z.string().min(1),
  reason: z.string().min(1),
  generatedAt: z.string().datetime()
});

export const backtestResultSchema = z.object({
  ticker: z.string().min(1),
  trades: z.number().int().nonnegative(),
  winRate: z.number().min(0).max(100),
  averageGainPercent: z.number(),
  averageLossPercent: z.number(),
  maxDrawdownPercent: z.number().min(0),
  profitFactor: z.number().nonnegative(),
  notes: z.string()
});

export type Candle = z.infer<typeof candleSchema>;
export type WatchlistItem = z.infer<typeof watchlistItemSchema>;
export type Position = z.infer<typeof positionSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type TradeSignal = z.infer<typeof tradeSignalSchema>;
export type BacktestResult = z.infer<typeof backtestResultSchema>;

export type MarketRegime = {
  healthy: boolean;
  score: number;
  reason: string;
};

export type ScoreBreakdown = {
  market: number;
  trend: number;
  breakout: number;
  volume: number;
  volatility: number;
  catalyst: number;
};

export type ScanCandidate = {
  signal: TradeSignal | null;
  breakdown: ScoreBreakdown;
  rejectionReasons: string[];
};

export function normalizeTicker(ticker: string): string {
  return tickerSchema.parse(ticker);
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundPrice(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function sma(candles: Candle[], period: number): number | null {
  if (candles.length < period) return null;
  return average(candles.slice(-period).map((candle) => candle.close));
}

export function atr(candles: Candle[], period = 14): number | null {
  if (candles.length < period + 1) return null;
  const recent = candles.slice(-(period + 1));
  const ranges: number[] = [];

  for (let index = 1; index < recent.length; index += 1) {
    const current = recent[index];
    const previous = recent[index - 1];
    if (!current || !previous) continue;
    ranges.push(Math.max(current.high - current.low, Math.abs(current.high - previous.close), Math.abs(current.low - previous.close)));
  }

  return average(ranges);
}

export function evaluateMarketRegime(spy: Candle[], qqq: Candle[]): MarketRegime {
  const components = [scoreIndexTrend("SPY", spy), scoreIndexTrend("QQQ", qqq)];
  const score = roundScore(average(components.map((component) => component.score)));
  const weak = components.filter((component) => !component.healthy).map((component) => component.ticker);

  return {
    healthy: score >= 55 && weak.length < 2,
    score,
    reason: weak.length === 0 ? "SPY and QQQ trend positive" : `${weak.join("/")} trend weak`
  };
}

function scoreIndexTrend(ticker: string, candles: Candle[]): { ticker: string; healthy: boolean; score: number } {
  const last = candles.at(-1);
  const sma20 = sma(candles, 20);
  const sma50 = sma(candles, 50);
  if (!last || !sma20 || !sma50) return { ticker, healthy: false, score: 0 };

  let score = 0;
  if (last.close > sma20) score += 35;
  if (last.close > sma50) score += 35;
  if (sma20 > sma50) score += 30;

  return { ticker, healthy: score >= 55, score };
}

export function scoreTradeSetup(params: {
  ticker: string;
  candles: Candle[];
  market: MarketRegime;
  catalystScore?: number;
  minConfidence?: number;
  defaultTrailingStopPercent?: number;
}): ScanCandidate {
  const { ticker, candles, market } = params;
  const minConfidence = params.minConfidence ?? 75;
  const latest = candles.at(-1);
  const previous = candles.at(-2);
  const sma10 = sma(candles, 10);
  const sma20 = sma(candles, 20);
  const sma50 = sma(candles, 50);
  const currentAtr = atr(candles, 14);
  const rejectionReasons: string[] = [];

  const emptyBreakdown: ScoreBreakdown = {
    market: market.score * 0.2,
    trend: 0,
    breakout: 0,
    volume: 0,
    volatility: 0,
    catalyst: params.catalystScore ?? 0
  };

  if (!latest || !previous || !sma10 || !sma20 || !sma50 || !currentAtr || candles.length < 55) {
    return {
      signal: null,
      breakdown: emptyBreakdown,
      rejectionReasons: ["not enough price history"]
    };
  }

  if (!market.healthy) rejectionReasons.push(`market filter failed: ${market.reason}`);

  const recentResistance = Math.max(...candles.slice(-21, -1).map((candle) => candle.high));
  const avgVolume20 = average(candles.slice(-21, -1).map((candle) => candle.volume));
  const volumeRatio = avgVolume20 > 0 ? latest.volume / avgVolume20 : 0;
  const atrPercent = (currentAtr / latest.close) * 100;
  const oneDayMovePercent = ((latest.close - previous.close) / previous.close) * 100;

  const trendScore = roundScore(
    (latest.close > sma10 ? 25 : 0) +
      (latest.close > sma20 ? 25 : 0) +
      (sma10 > sma20 ? 20 : 0) +
      (sma20 > sma50 ? 20 : 0) +
      (oneDayMovePercent > 0 ? 10 : 0)
  );
  const breakoutScore = roundScore(latest.close > recentResistance ? 100 : latest.close > recentResistance * 0.985 ? 70 : 25);
  const volumeScore = roundScore(volumeRatio >= 1.8 ? 100 : volumeRatio >= 1.3 ? 80 : volumeRatio >= 1 ? 55 : 10);
  const volatilityScore = roundScore(atrPercent >= 1 && atrPercent <= 7 ? 100 : atrPercent < 1 ? 45 : atrPercent <= 10 ? 55 : 15);
  const catalystScore = roundScore(params.catalystScore ?? 40);

  if (trendScore < 70) rejectionReasons.push("short-term trend is not strong enough");
  if (breakoutScore < 70) rejectionReasons.push("no breakout above recent resistance");
  if (volumeScore < 55) rejectionReasons.push("breakout volume is weak");
  if (volatilityScore < 45) rejectionReasons.push("volatility profile is unattractive");

  const breakdown: ScoreBreakdown = {
    market: market.score * 0.2,
    trend: trendScore * 0.25,
    breakout: breakoutScore * 0.25,
    volume: volumeScore * 0.15,
    volatility: volatilityScore * 0.1,
    catalyst: catalystScore * 0.05
  };
  const confidence = roundScore(Object.values(breakdown).reduce((sum, value) => sum + value, 0));

  if (confidence < minConfidence) rejectionReasons.push(`confidence ${confidence}/100 below ${minConfidence}/100`);

  if (rejectionReasons.length > 0) {
    return { signal: null, breakdown, rejectionReasons };
  }

  const buyZoneLow = roundPrice(Math.max(latest.close - currentAtr * 0.35, latest.close * 0.985));
  const buyZoneHigh = roundPrice(latest.close + currentAtr * 0.25);
  const stopLoss = roundPrice(Math.min(latest.close - currentAtr * 1.2, latest.close * 0.955));
  const risk = Math.max(latest.close - stopLoss, currentAtr);
  const target1 = roundPrice(latest.close + risk * 1.8);
  const target2 = roundPrice(latest.close + risk * 3);
  const trailingStopPercent = Math.max(params.defaultTrailingStopPercent ?? 4, Math.min(8, atrPercent * 1.25));
  const reasons = ["breakout", volumeRatio >= 1.3 ? "strong volume" : "acceptable volume", market.reason.toLowerCase()];

  return {
    signal: tradeSignalSchema.parse({
      ticker,
      price: roundPrice(latest.close),
      confidence,
      expectedHold: "1-3 days",
      buyZoneLow,
      buyZoneHigh,
      target1,
      target2,
      stopLoss,
      trailingStopPercent: roundPrice(trailingStopPercent),
      invalidation: `Close below ${stopLoss} or market regime turns weak`,
      reason: reasons.join(" + "),
      generatedAt: new Date().toISOString()
    }),
    breakdown,
    rejectionReasons: []
  };
}

export function formatBuyAlert(signal: TradeSignal): string {
  return [
    "🚨 STRONG BUY WATCH",
    `Ticker: ${signal.ticker}`,
    `Price: ${signal.price.toFixed(2)}`,
    `Confidence: ${signal.confidence}/100`,
    `Expected hold: ${signal.expectedHold}`,
    `Buy zone: ${signal.buyZoneLow.toFixed(2)}-${signal.buyZoneHigh.toFixed(2)}`,
    `Target 1: ${signal.target1.toFixed(2)}`,
    `Target 2: ${signal.target2.toFixed(2)}`,
    `Stop loss: ${signal.stopLoss.toFixed(2)}`,
    `Trailing stop: ${signal.trailingStopPercent.toFixed(2)}%`,
    `Reason: ${signal.reason}`,
    "",
    "Not financial advice. No auto trading. Use manual sizing and stops."
  ].join("\n");
}

export function formatExitAlert(params: {
  ticker: string;
  currentPrice: number;
  peakPrice: number;
  reason: "STOP_LOSS" | "TRAILING_STOP" | "TARGET_1" | "TARGET_2";
}): string {
  const labels = {
    STOP_LOSS: "SELL ALERT",
    TRAILING_STOP: "EXIT WARNING",
    TARGET_1: "TAKE PROFIT ALERT",
    TARGET_2: "TAKE PROFIT ALERT"
  };

  return `${labels[params.reason]}: ${params.ticker} dropped from peak ${params.peakPrice.toFixed(2)} to ${params.currentPrice.toFixed(
    2
  )}. ${params.reason.replaceAll("_", " ").toLowerCase()} triggered. Consider your manual exit plan.`;
}

export function runBacktest(ticker: string, candles: Candle[]): BacktestResult {
  const trades: number[] = [];
  let equity = 1;
  let peakEquity = 1;
  let maxDrawdown = 0;

  for (let index = 60; index < candles.length - 3; index += 1) {
    const history = candles.slice(0, index + 1);
    const market: MarketRegime = { healthy: true, score: 75, reason: "single-symbol validation mode" };
    const candidate = scoreTradeSetup({ ticker, candles: history, market, minConfidence: 75 });
    if (!candidate.signal) continue;

    const signal = candidate.signal;
    const forward = candles.slice(index + 1, index + 4);
    let exit = forward.at(-1)?.close ?? signal.price;
    for (const candle of forward) {
      if (candle.low <= signal.stopLoss) {
        exit = signal.stopLoss;
        break;
      }
      if (candle.high >= signal.target2) {
        exit = signal.target2;
        break;
      }
      if (candle.high >= signal.target1) {
        exit = signal.target1;
        break;
      }
    }

    const gain = ((exit - signal.price) / signal.price) * 100;
    trades.push(gain);
    equity *= 1 + gain / 100;
    peakEquity = Math.max(peakEquity, equity);
    maxDrawdown = Math.max(maxDrawdown, ((peakEquity - equity) / peakEquity) * 100);
  }

  const winners = trades.filter((trade) => trade > 0);
  const losers = trades.filter((trade) => trade <= 0);
  const grossProfit = winners.reduce((sum, trade) => sum + trade, 0);
  const grossLoss = Math.abs(losers.reduce((sum, trade) => sum + trade, 0));

  return backtestResultSchema.parse({
    ticker,
    trades: trades.length,
    winRate: trades.length ? roundPrice((winners.length / trades.length) * 100) : 0,
    averageGainPercent: winners.length ? roundPrice(average(winners)) : 0,
    averageLossPercent: losers.length ? roundPrice(average(losers)) : 0,
    maxDrawdownPercent: roundPrice(maxDrawdown),
    profitFactor: grossLoss > 0 ? roundPrice(grossProfit / grossLoss) : grossProfit > 0 ? roundPrice(grossProfit) : 0,
    notes: "Walk-forward style simulation using only prior candles; live alerts still require manual review."
  });
}
