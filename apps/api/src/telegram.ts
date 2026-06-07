export type TelegramUpdate = {
  update_id: number;
  message?: {
    chat: { id: number | string };
    text?: string;
  };
};

export class TelegramClient {
  constructor(private readonly token: string) {}

  async sendMessage(chatId: string | number, text: string): Promise<void> {
    await this.request("sendMessage", {
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    });
  }

  async getUpdates(offset?: number): Promise<TelegramUpdate[]> {
    const payload = await this.request<{ result: TelegramUpdate[] }>("getUpdates", {
      offset,
      timeout: 25,
      allowed_updates: ["message"]
    });
    return payload.result;
  }

  private async request<T = unknown>(method: string, body: Record<string, unknown>): Promise<T> {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Telegram ${method} failed: ${response.status} ${text}`);
    }
    return (await response.json()) as T;
  }
}
