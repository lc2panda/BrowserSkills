import { WebSocketServer } from "ws";
import http from "http";
import { mcpConfig } from "@/config/mcp.config";
import { isPortInUse } from "@/utils/port";

export interface WSServerWithHttp {
  wss: WebSocketServer;
  httpServer: http.Server;
  port: number;
}

export async function createWebSocketServer(
  port: number = mcpConfig.ws.port,
): Promise<WSServerWithHttp> {
  // Wait until the port is free
  while (await isPortInUse(port)) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const httpServer = http.createServer((req, res) => {
    // Simple HTTP response for health checks
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Browser MCP Server');
  });
  
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: mcpConfig.ws.path
  });
  
  return new Promise((resolve, reject) => {
    httpServer.listen(port, () => {
      console.log(`WebSocket server listening on ws://localhost:${port}${mcpConfig.ws.path}`);
      resolve({ wss, httpServer, port });
    });
    
    httpServer.on('error', reject);
  });
}
