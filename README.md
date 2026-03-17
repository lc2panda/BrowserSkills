# Browser MCP — 可独立构建的浏览器自动化 MCP 服务器

> **给人类**：这是 [Browser MCP](https://browsermcp.io) 的独立构建分支，修复了原项目无法脱离 Monorepo 独立构建的问题，并新增 scroll、fullpage_screenshot 等工具，同时将项目打包为 Claude Code **Skill**，AI 助手可自动完成全套部署。详见下方说明。
>
> **维护者**：[lc2panda](https://github.com/lc2panda/mcp) · **最后更新**：2026-03-17

---

# AI DEPLOYMENT GUIDE

> The following sections are structured for AI agents. Read and execute each step in order to fully deploy Browser MCP with the bundled skill.

## STEP 0 — Understand the Architecture

This project has two components:

| Component | Role |
|-----------|------|
| **MCP Server** (`dist/index.js`) | Node.js process that exposes 15 browser tools via MCP stdio protocol |
| **Chrome Extension** | Runs inside Chrome, bridges CDP ↔ WebSocket on port `9009` |
| **Skill** (`skill/`) | Claude Code skill definition — copy to `~/.claude/skills/browser-mcp/` |

Flow: `AI client → MCP Server (stdio) → WebSocket :9009 → Chrome Extension → CDP → Browser`

---

## STEP 1 — Check Prerequisites

```bash
# Required: Node.js 18+
node --version

# Required: npm
npm --version

# Required: Chrome browser with Browser MCP extension installed
# Extension: https://browsermcp.io (install from Chrome Web Store)
```

If Node.js is missing, install it before proceeding.

---

## STEP 2 — Clone and Build

```bash
git clone https://github.com/lc2panda/mcp.git
cd mcp
npm install
npm run build

# Verify build succeeded
node dist/index.js --version
```

Expected output: version string like `0.1.3`

---

## STEP 3 — Install the Claude Code Skill

The `skill/` directory contains the browser-mcp skill definition. Copy it to the Claude Code skills directory:

```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills/browser-mcp/references

# Copy skill files
cp skill/SKILL.md ~/.claude/skills/browser-mcp/
cp skill/_meta.json ~/.claude/skills/browser-mcp/
cp skill/metadata.json ~/.claude/skills/browser-mcp/
cp skill/references/tools-reference.md ~/.claude/skills/browser-mcp/references/
cp skill/references/workflows.md ~/.claude/skills/browser-mcp/references/

echo "Skill installed at ~/.claude/skills/browser-mcp/"
```

After this step, the `browser-mcp` skill will be available in Claude Code sessions.

---

## STEP 4 — Configure MCP Client

Add the server to your AI client's MCP configuration. Replace `/absolute/path/to/mcp` with the actual path.

### Claude Code (`~/.claude/claude_desktop_config.json` or project config)
```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/dist/index.js"]
    }
  }
}
```

### Cursor / VS Code (`mcp.json`)
```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/dist/index.js"]
    }
  }
}
```

> The MCP server listens on WebSocket port `9009` for the Chrome extension. No additional port configuration is needed.

---

## STEP 5 — Connect Chrome Extension

1. Open Chrome and navigate to any page
2. Click the **Browser MCP** extension icon in the toolbar
3. Click **Connect**
4. The extension status should show **Connected**

The extension creates a WebSocket connection to `ws://localhost:9009/`.

---

## STEP 6 — Verify Installation

After restarting the AI client, run a verification:

```
# In Claude Code or your AI client:
/browser-mcp
```

Or ask the AI:
> "使用 browser-mcp 导航到 https://example.com 并截图"

Expected behavior:
- AI uses `mcp__browsermcp__navigate` tool
- AI uses `mcp__browsermcp__fullpage_screenshot` tool
- Screenshot saved to system temp dir: `/var/folders/.../T/fullpage_{timestamp}.jpg`

---

## TOOL REFERENCE (15 tools)

| Tool | Description | Key Params |
|------|-------------|------------|
| `navigate` | Navigate to URL | `url` |
| `go_back` | Browser back | — |
| `go_forward` | Browser forward | — |
| `snapshot` | Get ARIA snapshot + refs | — |
| `click` | Click element | `element`, `ref` |
| `hover` | Hover element | `element`, `ref` |
| `type` | Type text | `element`, `ref`, `text` |
| `select_option` | Select dropdown | `element`, `ref`, `values` |
| `drag` | Drag & drop | `startElement`, `startRef`, `endElement`, `endRef` |
| `scroll` | Scroll page | `x`, `y`, `deltaX`, `deltaY` |
| `press_key` | Press key | `key` |
| `wait` | Wait N seconds | `time` (0–60) |
| `get_console_logs` | Get browser console | — |
| `screenshot` | Viewport screenshot | — |
| `fullpage_screenshot` | Full-page screenshot | — |

All tools use the prefix `mcp__browsermcp__` when called.

---

## TROUBLESHOOTING

| Problem | Cause | Fix |
|---------|-------|-----|
| Tools not available | Extension not connected | Click extension icon → Connect |
| Port 9009 in use | Another process | `lsof -i:9009` to identify |
| `ref` invalid | Page changed after snapshot | Re-run `snapshot` |
| Screenshot blank | Page not loaded | Add `wait {time: 2}` before screenshot |
| Build fails | Missing deps | Run `npm install` again |

---

## FORK CHANGES vs ORIGINAL

1. Removed Monorepo dependencies — standalone `npm install && npm run build`
2. Fixed all `@repo/*` imports → `@/*` paths
3. Fixed WebSocket protocol (port `9009`, `messageResponse` format)
4. Fixed `drag` tool not registered in `snapshotTools`
5. Increased default timeout `30s → 10min`
6. Added `scroll` tool
7. Added `fullpage_screenshot` tool (CDP `captureBeyondViewport: true`)
8. Fixed response normalization for `getConsoleLogs` / `getUrl` / `getTitle`
9. Bundled Claude Code skill in `skill/`
