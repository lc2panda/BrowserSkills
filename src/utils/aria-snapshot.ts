import { Context } from "@/context";
import { ToolResult } from "@/tools/tool";

export async function captureAriaSnapshot(
  context: Context,
  status: string = "",
): Promise<ToolResult> {
  const url = await context.sendSocketMessage("getUrl", {}) as unknown as string;
  const title = await context.sendSocketMessage("getTitle", {}) as unknown as string;
  const snapshot = await context.sendSocketMessage("browser_snapshot", {}) as unknown as string;

  return {
    content: [
      {
        type: "text",
        text: `${status ? `${status}\n` : ""}
- Page URL: ${url}
- Page Title: ${title}
- Page Snapshot
\`\`\`yaml
${snapshot}
\`\`\`
`,
      },
    ],
  };
}
