import type { AppStorage } from "./index";

export async function createIndexedDbStorage(): Promise<AppStorage> {
  throw new Error("TradeSentinel browser storage is not implemented yet. Use the SQLite API backend for the MVP.");
}
