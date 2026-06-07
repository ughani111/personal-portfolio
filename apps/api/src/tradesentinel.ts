import {
  evaluateMarketRegime,
  formatBuyAlert,
  formatExitAlert,
  normalizeTicker,
  runBacktest,
  scoreTradeSetup,
  type BacktestResult,
  type TradeSignal
} from "@open-stack/core";
import type { AppStorage } from "@open-stack/storage";
import type { AppConfig } from "./config";
import type { MarketDataClient } from "./market-data";
import type { TelegramClient } from "./telegram";

export class TradeSentinel {
  constructor(
    private readonly storage: AppStorage,
    private readonly marketData: MarketDataClient,
    private readonly config: AppConfig,
    private readonly telegram?: TelegramClient
  ) {}

  async seedDefaultWatchlist(): Promise<void> {
    const existing = await this.storage.watchlist.list();
    if (existing.length > 0) return;
    for (const ticker of this.config.defaultWatchlist) await this.storage.watchlist.add(ticker);
  }

  async scan(options: { sendAlerts?: boolean; forceRefresh?: boolean } = {}): Promise<TradeSignal[]> {
    await this.seedDefaultWatchlist();
    const settings = await this.storage.settings.update(this.config.settings);
    const [spy, qqq, watchlist] = await Promise.all([
      this.marketData.getDailyCandles("SPY", options.forceRefresh),
      this.marketData.getDailyCandles("QQQ", options.forceRefresh),
      this.storage.watchlist.list()
    ]);
    const market = evaluateMarketRegime(spy, qqq);
    const signals: TradeSignal[] = [];

    for (const item of watchlist) {
      const candles = await this.marketData.getDailyCandles(item.ticker, options.forceRefresh);
      const candidate = scoreTradeSetup({
        ticker: item.ticker,
        candles,
        market,
        minConfidence: settings.minConfidence,
        defaultTrailingStopPercent: settings.trailingStopPercent
      });
      if (!candidate.signal) continue;

      signals.push(candidate.signal);
      if (options.sendAlerts) await this.sendSignal(candidate.signal);
    }

    if (options.sendAlerts) await this.watchPositions();
    return signals.sort((left, right) => right.confidence - left.confidence);
  }

  async watchPositions(): Promise<string[]> {
    const positions = await this.storage.positions.listOpen();
    const alerts: string[] = [];

    for (const position of positions) {
      const currentPrice = await this.marketData.getLatestPrice(position.ticker);
      if (!currentPrice) continue;

      const highestPrice = Math.max(position.highestPrice, currentPrice);
      const trailingStopPrice = highestPrice * (1 - position.trailingStopPercent / 100);
      const hitStop = currentPrice <= position.stopLoss;
      const hitTrailingStop = currentPrice <= trailingStopPrice && highestPrice > position.buyPrice;
      const hitTarget2 = currentPrice >= position.target2;
      const hitTarget1 = currentPrice >= position.target1;
      const next = { ...position, highestPrice };
      await this.storage.positions.update(next);

      const reason = hitStop ? "STOP_LOSS" : hitTrailingStop ? "TRAILING_STOP" : hitTarget2 ? "TARGET_2" : hitTarget1 ? "TARGET_1" : null;
      if (!reason) continue;

      const fingerprint = `${reason}:${position.openedAt}:${Math.round(currentPrice * 100)}`;
      if (await this.storage.alerts.wasSent(position.ticker, fingerprint)) continue;

      const message = formatExitAlert({ ticker: position.ticker, currentPrice, peakPrice: highestPrice, reason });
      await this.sendMessage(message);
      await this.storage.alerts.record(position.ticker, fingerprint, message);
      alerts.push(message);
    }

    return alerts;
  }

  async openPosition(ticker: string, buyPrice: number, shares: number): Promise<void> {
    const settings = await this.storage.settings.get();
    const parsedTicker = normalizeTicker(ticker);
    const candles = await this.marketData.getDailyCandles(parsedTicker);
    const [spy, qqq] = await Promise.all([this.marketData.getDailyCandles("SPY"), this.marketData.getDailyCandles("QQQ")]);
    const candidate = scoreTradeSetup({
      ticker: parsedTicker,
      candles,
      market: evaluateMarketRegime(spy, qqq),
      minConfidence: 0,
      defaultTrailingStopPercent: settings.trailingStopPercent
    });
    const signal = candidate.signal;
    const fallbackRisk = buyPrice * (settings.maxRiskPercent / 100);

    await this.storage.positions.open({
      ticker: parsedTicker,
      buyPrice,
      shares,
      stopLoss: signal?.stopLoss ?? Number((buyPrice - fallbackRisk * 4).toFixed(2)),
      target1: signal?.target1 ?? Number((buyPrice * 1.06).toFixed(2)),
      target2: signal?.target2 ?? Number((buyPrice * 1.12).toFixed(2)),
      trailingStopPercent: signal?.trailingStopPercent ?? settings.trailingStopPercent
    });
  }

  async backtest(ticker: string): Promise<BacktestResult> {
    const parsedTicker = normalizeTicker(ticker);
    const candles = await this.marketData.getDailyCandles(parsedTicker, true);
    return runBacktest(parsedTicker, candles);
  }

  private async sendSignal(signal: TradeSignal): Promise<void> {
    const fingerprint = `BUY:${signal.generatedAt.slice(0, 10)}:${signal.confidence}`;
    if (await this.storage.alerts.wasSent(signal.ticker, fingerprint)) return;

    const message = formatBuyAlert(signal);
    await this.sendMessage(message);
    await this.storage.alerts.record(signal.ticker, fingerprint, message);
  }

  private async sendMessage(message: string): Promise<void> {
    const chatId = this.config.telegramChatId;
    if (!this.telegram || !chatId) return;
    await this.telegram.sendMessage(chatId, message);
  }
}
