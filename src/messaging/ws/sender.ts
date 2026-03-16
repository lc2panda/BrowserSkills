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
      options: SocketMessageSenderOptions = { timeoutMs: 600000 },
    ): Promise<T[K]["response"]> => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Timeout after ${options.timeoutMs}ms`));
        }, options.timeoutMs || 600000);

        const requestId = crypto.randomUUID();
        ws.send(JSON.stringify({ type, id: requestId, payload }));

        const messageHandler = (data: Buffer) => {
          try {
            const message = JSON.parse(data.toString());
            if (message.type === "messageResponse" && message.payload?.requestId === requestId) {
              clearTimeout(timeout);
              ws.off("message", messageHandler);
              if (message.payload.error) {
                reject(new Error(message.payload.error.message || String(message.payload.error)));
              } else {
                resolve(message.payload.result as T[K]["response"]);
              }
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