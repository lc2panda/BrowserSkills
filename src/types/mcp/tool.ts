import { z } from "zod";

export const NavigateTool = {
  shape: {
    name: z.literal("navigate"),
    description: z.literal("Navigate to a URL"),
    arguments: z.object({
      url: z.string().url().describe("URL to navigate to"),
    }),
  },
};

export const GoBackTool = {
  shape: {
    name: z.literal("go_back"),
    description: z.literal("Navigate back in history"),
    arguments: z.object({}),
  },
};

export const GoForwardTool = {
  shape: {
    name: z.literal("go_forward"),
    description: z.literal("Navigate forward in history"),
    arguments: z.object({}),
  },
};

export const WaitTool = {
  shape: {
    name: z.literal("wait"),
    description: z.literal("Wait for a specified time"),
    arguments: z.object({
      time: z.number().min(0).max(60).describe("Time to wait in seconds"),
    }),
  },
};

export const PressKeyTool = {
  shape: {
    name: z.literal("press_key"),
    description: z.literal("Press a key on the keyboard"),
    arguments: z.object({
      key: z.string().min(1).max(100).describe("Key to press (e.g., 'Enter', 'Tab')"),
    }),
  },
};

export const SnapshotTool = {
  shape: {
    name: z.literal("snapshot"),
    description: z.literal("Take a snapshot of the current page"),
    arguments: z.object({}),
  },
};

export const ClickTool = {
  shape: {
    name: z.literal("click"),
    description: z.literal("Click on an element"),
    arguments: z.object({
      selector: z.string().describe("CSS selector of the element to click"),
    }),
  },
};

export const HoverTool = {
  shape: {
    name: z.literal("hover"),
    description: z.literal("Hover over an element"),
    arguments: z.object({
      selector: z.string().describe("CSS selector of the element to hover over"),
    }),
  },
};

export const TypeTool = {
  shape: {
    name: z.literal("type"),
    description: z.literal("Type text into an element"),
    arguments: z.object({
      selector: z.string().describe("CSS selector of the element"),
      text: z.string().describe("Text to type"),
    }),
  },
};

export const SelectOptionTool = {
  shape: {
    name: z.literal("select_option"),
    description: z.literal("Select an option from a dropdown"),
    arguments: z.object({
      selector: z.string().describe("CSS selector of the select element"),
      value: z.string().describe("Value of the option to select"),
    }),
  },
};

export const DragTool = {
  shape: {
    name: z.literal("drag"),
    description: z.literal("Drag an element"),
    arguments: z.object({
      selector: z.string().describe("CSS selector of the element to drag"),
      direction: z.enum(["up", "down", "left", "right"]).describe("Direction to drag"),
    }),
  },
};

export const GetConsoleLogsTool = {
  shape: {
    name: z.literal("get_console_logs"),
    description: z.literal("Get console logs from the browser"),
    arguments: z.object({}),
  },
};

export const ScreenshotTool = {
  shape: {
    name: z.literal("screenshot"),
    description: z.literal("Take a screenshot"),
    arguments: z.object({
      selector: z.string().optional().describe("Optional CSS selector for element screenshot"),
    }),
  },
};