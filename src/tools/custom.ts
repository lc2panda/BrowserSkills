import { zodToJsonSchema } from "zod-to-json-schema";

import { FullpageScreenshotTool, GetConsoleLogsTool, ScreenshotTool } from "@/types/mcp/tool";

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
    const raw = response as { logs?: any[] } | any[];
    const consoleLogs: any[] = Array.isArray(raw) ? raw : (raw?.logs ?? []);
    const text: string = consoleLogs.length
      ? consoleLogs.map((log) => JSON.stringify(log)).join("\n")
      : "(no console logs)";
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
    const screenshotData = typeof response === 'string' ? response : (response as { data: string }).data;
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

export const fullpageScreenshot: Tool = {
  schema: {
    name: FullpageScreenshotTool.shape.name.value,
    description: FullpageScreenshotTool.shape.description.value,
    inputSchema: zodToJsonSchema(FullpageScreenshotTool.shape.arguments),
  },
  handle: async (context, _params) => {
    const response = await context.sendSocketMessage(
      "browser_fullpage_screenshot",
      {},
    );
    const screenshotData = typeof response === 'string' ? response : (response as { data: string }).data;
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
