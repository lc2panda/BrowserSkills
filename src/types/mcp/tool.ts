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
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
    }),
  },
};

export const HoverTool = {
  shape: {
    name: z.literal("hover"),
    description: z.literal("Hover over an element"),
    arguments: z.object({
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
    }),
  },
};

export const TypeTool = {
  shape: {
    name: z.literal("type"),
    description: z.literal("Type text into an element"),
    arguments: z.object({
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      text: z.string().describe("Text to type into the element"),
      submit: z.boolean().optional().describe("Whether to submit entered text (press Enter after)"),
    }),
  },
};

export const SelectOptionTool = {
  shape: {
    name: z.literal("select_option"),
    description: z.literal("Select an option from a dropdown"),
    arguments: z.object({
      element: z.string().describe("Human-readable element description used to obtain permission to interact with the element"),
      ref: z.string().describe("Exact target element reference from the page snapshot"),
      values: z.array(z.string()).describe("Array of values to select in the dropdown"),
    }),
  },
};

export const ScrollTool = {
  shape: {
    name: z.literal("scroll"),
    description: z.literal("Scroll the page or a scrollable element"),
    arguments: z.object({
      x: z.number().describe("X coordinate to scroll at (pixels from left)"),
      y: z.number().describe("Y coordinate to scroll at (pixels from top)"),
      deltaX: z.number().describe("Horizontal scroll distance in pixels (positive = right, negative = left)"),
      deltaY: z.number().describe("Vertical scroll distance in pixels (positive = down, negative = up)"),
    }),
  },
};

export const DragTool = {
  shape: {
    name: z.literal("drag"),
    description: z.literal("Perform drag and drop between two elements"),
    arguments: z.object({
      startElement: z.string().describe("Human-readable source element description"),
      startRef: z.string().describe("Exact source element reference from the page snapshot"),
      endElement: z.string().describe("Human-readable target element description"),
      endRef: z.string().describe("Exact target element reference from the page snapshot"),
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

export const FullpageScreenshotTool = {
  shape: {
    name: z.literal("fullpage_screenshot"),
    description: z.literal("Take a full-page screenshot capturing the entire page height"),
    arguments: z.object({}),
  },
};