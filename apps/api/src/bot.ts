import { createTradeSentinel } from "./app";
import { handleCommand } from "./commands";

const { storage, telegram, sentinel } = createTradeSentinel();

if (!telegram) {
  throw new Error("TELEGRAM_BOT_TOKEN is required to run the bot.");
}

let offset = 0;
console.log("TradeSentinel Telegram bot polling started.");

while (true) {
  const updates = await telegram.getUpdates(offset);
  for (const update of updates) {
    offset = update.update_id + 1;
    const chatId = String(update.message?.chat.id ?? "");
    const text = update.message?.text;
    if (!chatId || !text?.startsWith("/")) continue;

    try {
      await storage.settings.update({ telegramChatId: chatId });
      const response = await handleCommand(text, chatId, storage, sentinel);
      await telegram.sendMessage(chatId, response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await telegram.sendMessage(chatId, `Command failed: ${message}`);
    }
  }
}
