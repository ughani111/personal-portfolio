import cors from "cors";
import express from "express";
import { createTradeSentinel } from "./app";
import { handleCommand } from "./commands";

const port = Number(process.env.PORT ?? 3001);
const { storage, sentinel } = createTradeSentinel();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "TradeSentinel" });
});

app.get("/status", async (_request, response, next) => {
  try {
    const [watchlist, positions, alerts] = await Promise.all([storage.watchlist.list(), storage.positions.listOpen(), storage.alerts.latest(10)]);
    response.json({ watchlist, positions, alerts });
  } catch (error) {
    next(error);
  }
});

app.post("/scan", async (_request, response, next) => {
  try {
    response.json({ signals: await sentinel.scan({ sendAlerts: false, forceRefresh: true }) });
  } catch (error) {
    next(error);
  }
});

app.post("/telegram-command", async (request, response, next) => {
  try {
    const chatId = String(request.body.chatId ?? "local");
    const text = String(request.body.text ?? "");
    response.json({ message: await handleCommand(text, chatId, storage, sentinel) });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`TradeSentinel API listening on http://localhost:${port}`);
});
