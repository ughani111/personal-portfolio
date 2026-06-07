import { settingsSchema } from "@open-stack/core";

export type AppConfig = {
  databaseUrl: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  defaultWatchlist: string[];
  cacheTtlMinutes: number;
  settings: {
    minConfidence: number;
    maxRiskPercent: number;
    trailingStopPercent: number;
  };
};

function parseWatchlist(value: string | undefined): string[] {
  return (value ?? "AAPL,AMD,AMZN,AVGO,GOOGL,META,MSFT,NVDA,PLTR,TSLA")
    .split(",")
    .map((ticker) => ticker.trim().toUpperCase())
    .filter(Boolean);
}

export function loadConfig(): AppConfig {
  const settings = settingsSchema.parse({
    minConfidence: Number(process.env.MIN_CONFIDENCE ?? 75),
    maxRiskPercent: Number(process.env.MAX_RISK_PERCENT ?? 1),
    trailingStopPercent: Number(process.env.TRAILING_STOP_PERCENT ?? 4),
    telegramChatId: process.env.TELEGRAM_CHAT_ID
  });

  return {
    databaseUrl: process.env.DATABASE_URL ?? "data/tradesentinel.sqlite",
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    defaultWatchlist: parseWatchlist(process.env.DEFAULT_WATCHLIST),
    cacheTtlMinutes: Number(process.env.CACHE_TTL_MINUTES ?? 15),
    settings
  };
}

export function isUsMarketHours(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const weekdayOpen = weekday !== "Sat" && weekday !== "Sun";
  const minutes = hour * 60 + minute;

  return weekdayOpen && minutes >= 9 * 60 + 30 && minutes <= 16 * 60;
}
