import { Context } from "@/context";
import { ToolResult } from "@/tools/tool";

export async function captureAriaSnapshot(
  context: Context,
  status: string = "",
): Promise<ToolResult> {
  const urlResponse = await context.sendSocketMessage("getUrl", {});
  const url = (urlResponse as { url: string }).url;
  
  const titleResponse = await context.sendSocketMessage("getTitle", {});
  const title = (titleResponse as { title: string }).title;
  
  const snapshotResponse = await context.sendSocketMessage("browser_snapshot", {});
  const snapshot = JSON.stringify(snapshotResponse, null, 2);
  
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
