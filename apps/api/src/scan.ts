import { createTradeSentinel } from "./app";
import { isUsMarketHours } from "./config";

const force = process.argv.includes("--force");
const ignoreHours = process.argv.includes("--ignore-hours");
const { sentinel } = createTradeSentinel();

if (!ignoreHours && !isUsMarketHours()) {
  console.log("Outside US market hours; skipping scan.");
  process.exit(0);
}

const signals = await sentinel.scan({ sendAlerts: true, forceRefresh: force });
console.log(`Scan complete. Strong buy watch alerts: ${signals.length}`);
for (const signal of signals) {
  console.log(`${signal.ticker} ${signal.confidence}/100 ${signal.price}`);
}
