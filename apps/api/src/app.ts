import { createSqliteStorage } from "@open-stack/storage/sqlite";
import { loadConfig } from "./config";
import { MarketDataClient } from "./market-data";
import { TelegramClient } from "./telegram";
import { TradeSentinel } from "./tradesentinel";

export function createTradeSentinel() {
  const config = loadConfig();
  const storage = createSqliteStorage(config.databaseUrl);
  const marketData = new MarketDataClient(storage, config.cacheTtlMinutes);
  const telegram = config.telegramBotToken ? new TelegramClient(config.telegramBotToken) : undefined;
  const sentinel = new TradeSentinel(storage, marketData, config, telegram);

  return { config, storage, marketData, telegram, sentinel };
}
