import { zodToJsonSchema } from "zod-to-json-schema";

import { GetConsoleLogsTool, ScreenshotTool } from "@/types/mcp/tool";

import { Tool } from "./tool";

export const getConsoleLogs: Tool = {
  schema: {
    name: GetConsoleLogsTool.shape.name.value,
    description: GetConsoleLogsTool.shape.description.value,
    inputSchema: zodToJsonSchema(GetConsoleLogsTool.shape.arguments),
  },
  handle: async (context, _params) => {
    const response = await context.sendSocketMessage(
      "browser_get_console_logs",
      {},
    );
    const consoleLogs = (response as { logs: any[] }).logs;
    const text: string = consoleLogs
      .map((log) => JSON.stringify(log))
      .join("\n");
    return {
      content: [{ type: "text", text }],
    };
  },
};

export const screenshot: Tool = {
  schema: {
    name: ScreenshotTool.shape.name.value,
    description: ScreenshotTool.shape.description.value,
    inputSchema: zodToJsonSchema(ScreenshotTool.shape.arguments),
  },
  handle: async (context, _params) => {
    const response = await context.sendSocketMessage(
      "browser_screenshot",
      {},
    );
    const screenshotData = (response as { data: string }).data;
    return {
      content: [
        {
          type: "image",
          data: screenshotData,
          mimeType: "image/png",
        },
      ],
    };
  },
};
