import { WebSocketServer } from "ws";
import { mcpConfig } from "@/config/mcp.config";
import { isPortInUse, killProcessOnPort } from "@/utils/port";

export async function createWebSocketServer(
  port: number = mcpConfig.ws.port,
): Promise<WebSocketServer> {
  killProcessOnPort(port);
  // Wait until the port is free
  while (await isPortInUse(port)) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return new WebSocketServer({ port });
}
