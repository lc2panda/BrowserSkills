import type { WebSocket } from "ws";

export interface SocketMessageSenderOptions {
  timeoutMs?: number;
}

export function createSocketMessageSender<T extends Record<string, { request: any; response: any }>>(
  ws: WebSocket,
) {
  return {
    sendSocketMessage: async <K extends keyof T>(
      type: K,
      payload: T[K]["request"],
      options: SocketMessageSenderOptions = { timeoutMs: 30000 },
    ): Promise<T[K]["response"]> => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Timeout after ${options.timeoutMs}ms`));
        }, options.timeoutMs || 30000);

        ws.send(JSON.stringify({ type, payload }));

        const messageHandler = (data: Buffer) => {
          try {
            const message = JSON.parse(data.toString());
            if (message.type === type) {
              clearTimeout(timeout);
              ws.off("message", messageHandler);
              resolve(message.payload as T[K]["response"]);
            }
          } catch (error) {
            // Ignore invalid messages
          }
        };

        ws.on("message", messageHandler);
      });
    },
  };
}