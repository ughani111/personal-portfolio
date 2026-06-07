import { normalizeTicker } from "@open-stack/core";
import type { AppStorage } from "@open-stack/storage";
import type { TradeSentinel } from "./tradesentinel";

export async function handleCommand(text: string, chatId: string, storage: AppStorage, sentinel: TradeSentinel): Promise<string> {
  const [commandRaw, ...args] = text.trim().split(/\s+/);
  const command = commandRaw?.toLowerCase();

  switch (command) {
    case "/start":
      await storage.settings.update({ telegramChatId: chatId });
      return [
        "TradeSentinel is active.",
        "Commands: /watch NVDA, /unwatch NVDA, /scan, /buy NVDA 70 20, /positions, /sell NVDA, /settings, /backtest NVDA, /status.",
        "No auto trading. Alerts are probability-based and always require manual review."
      ].join("\n");

    case "/watch": {
      const ticker = normalizeTicker(args[0] ?? "");
      await storage.watchlist.add(ticker);
      return `${ticker} added to watchlist.`;
    }

    case "/unwatch": {
      const ticker = normalizeTicker(args[0] ?? "");
      await storage.watchlist.remove(ticker);
      return `${ticker} removed from watchlist.`;
    }

    case "/scan": {
      const signals = await sentinel.scan({ sendAlerts: false, forceRefresh: true });
      if (signals.length === 0) return "No strong buy watch alerts right now. Confidence threshold remains enforced.";
      return signals
        .slice(0, 5)
        .map((signal) => `${signal.ticker}: ${signal.confidence}/100 at ${signal.price.toFixed(2)} | ${signal.reason}`)
        .join("\n");
    }

    case "/buy": {
      const ticker = normalizeTicker(args[0] ?? "");
      const buyPrice = Number(args[1]);
      const shares = Number(args[2]);
      if (!Number.isFinite(buyPrice) || !Number.isFinite(shares) || buyPrice <= 0 || shares <= 0) {
        return "Usage: /buy NVDA 70 20";
      }
      await sentinel.openPosition(ticker, buyPrice, shares);
      return `${ticker} position recorded at ${buyPrice} for ${shares} shares. I will monitor stops, targets, and trailing exits.`;
    }

    case "/positions": {
      const positions = await storage.positions.listOpen();
      if (positions.length === 0) return "No open manual positions tracked.";
      return positions
        .map(
          (position) =>
            `${position.ticker}: ${position.shares} @ ${position.buyPrice.toFixed(2)} | peak ${position.highestPrice.toFixed(
              2
            )} | stop ${position.stopLoss.toFixed(2)} | T1 ${position.target1.toFixed(2)} | T2 ${position.target2.toFixed(2)}`
        )
        .join("\n");
    }

    case "/sell": {
      const ticker = normalizeTicker(args[0] ?? "");
      await storage.positions.close(ticker);
      return `${ticker} marked closed.`;
    }

    case "/settings": {
      const settings = await storage.settings.get();
      return [
        `Min confidence: ${settings.minConfidence}/100`,
        `Max risk per trade: ${settings.maxRiskPercent}%`,
        `Trailing stop default: ${settings.trailingStopPercent}%`
      ].join("\n");
    }

    case "/backtest": {
      const ticker = normalizeTicker(args[0] ?? "");
      const result = await sentinel.backtest(ticker);
      return [
        `Backtest ${result.ticker}`,
        `Trades: ${result.trades}`,
        `Win rate: ${result.winRate}%`,
        `Average gain: ${result.averageGainPercent}%`,
        `Average loss: ${result.averageLossPercent}%`,
        `Max drawdown: ${result.maxDrawdownPercent}%`,
        `Profit factor: ${result.profitFactor}`,
        result.notes
      ].join("\n");
    }

    case "/status": {
      const [watchlist, positions, settings] = await Promise.all([storage.watchlist.list(), storage.positions.listOpen(), storage.settings.get()]);
      return [
        "TradeSentinel status: online",
        `Watchlist: ${watchlist.map((item) => item.ticker).join(", ") || "empty"}`,
        `Open positions: ${positions.length}`,
        `Alert threshold: ${settings.minConfidence}/100`
      ].join("\n");
    }

    default:
      return "Unknown command. Try /status or /start.";
  }
}
