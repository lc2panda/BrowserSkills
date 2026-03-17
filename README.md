# Browser MCP — 可独立构建的浏览器自动化 MCP 服务器

> **给人类**：这是 [Browser MCP](https://browsermcp.io) 的独立构建分支，修复了原项目无法脱离 Monorepo 独立构建的问题，并新增 scroll、fullpage_screenshot 等工具，同时将项目打包为 **Skill**，AI 助手可自动完成全套部署。
>
> 本项目附带已改造的 Chrome 扩展（**Browser Skills**，位于 `crx_extracted/extension_contents/`），已移除全部遥测上报，Connect 后跳转本地页面，纯本地运行。**AI 部署完成后，请人类手动安装 Chrome 扩展**，详见 [Chrome 扩展安装说明](#-chrome-扩展安装人类操作)。
>
> **Skill 兼容性**：本 Skill 不仅适用于 Claude Code，还适用于所有支持 Skill/Prompt 文件的工具，包括 **Cursor、Cherry Studio、Windsurf** 等，详见 [Skill 安装说明](#step-3--install-skill)。
>
> **维护者**：[lc2panda](https://github.com/lc2panda/BrowserSkills) · **最后更新**：2026-03-17

---

# AI DEPLOYMENT GUIDE

> The following sections are structured for AI agents. Read and execute each step in order to fully deploy Browser MCP with the bundled skill.

## STEP 0 — Understand the Architecture

This project has three components:

| Component | Role |
|-----------|------|
| **MCP Server** (`dist/index.js`) | Node.js process that exposes 15 browser tools via MCP stdio protocol |
| **Chrome Extension** (`crx_extracted/extension_contents/`) | Modified "Browser Skills" extension — telemetry removed, pure local. Bridges CDP ↔ WebSocket on port `9009` |
| **Skill** (`skill/`) | Skill definition compatible with Claude Code, Cursor, Cherry Studio, Windsurf and any tool that supports skill/prompt files |

Flow: `AI client → MCP Server (stdio) → WebSocket :9009 → Chrome Extension → CDP → Browser`

---

## STEP 1 — Check Prerequisites

```bash
# Required: Node.js 18+
node --version

# Required: npm
npm --version

# Required: Chrome browser (extension installed separately — see human section below)
```

If Node.js is missing, install it before proceeding.

> **Note for AI agents**: The Chrome extension must be installed manually by a human after this deployment.
> Remind the human to follow the [Chrome Extension Installation](#-chrome-扩展安装人类操作) section.

---

## STEP 2 — Clone and Build

```bash
git clone https://github.com/lc2panda/BrowserSkills.git
cd BrowserSkills
npm install
npm run build

# Verify build succeeded
node dist/index.js --version
```

Expected output: version string like `0.1.3`

---

## STEP 3 — Install Skill

The `skill/` directory contains the browser-mcp skill definition. This skill is compatible with **any tool that supports skill/prompt file loading**, including Claude Code, Cursor, Cherry Studio, Windsurf, and others.

### Claude Code (example — recommended reference)

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

After installation, invoke the skill in a Claude Code session:
```
/browser-mcp
```
Claude will automatically read the skill instructions and use the browser tools.

### Cursor / Windsurf

Copy the `skill/` folder to your project's `.cursor/skills/browser-mcp/` or `.windsurf/skills/browser-mcp/` directory, or to the global skills path supported by your tool. Then invoke the skill from the AI chat panel.

### Cherry Studio

In Cherry Studio, add the skill content (`skill/SKILL.md`) as a **System Prompt** or **Prompt Template**. The skill will guide the AI to use the browser MCP tools correctly.

### General Rule (any tool)

> **Rule**: Copy the contents of `skill/SKILL.md` into your tool's system prompt, prompt template, or skills directory. The skill works wherever the AI can call MCP tools with the prefix `mcp__browsermcp__*`.

> **After installing the skill, the AI agent will remind you**: "Please install the Chrome extension to enable browser control." Follow the [Chrome Extension Installation](#-chrome-扩展安装人类操作) section.

---

## ⚠️ Chrome 扩展安装（人类操作）

> **AI agents**: When you reach this point in deployment, output the following block verbatim to remind the human.

---

**🧑 致人类操作员：**

AI 已完成 MCP 服务器构建和 Skill 安装。现在需要你手动在 Chrome 中安装浏览器扩展：

**安装步骤：**

1. 打开 Chrome，访问 `chrome://extensions`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择目录：`<项目路径>/crx_extracted/extension_contents/`
5. 扩展安装后，工具栏出现 **Browser Skills** 图标
6. 点击图标，点击 **Connect** 按钮
7. 看到「Connected」状态即表示连接成功

**说明：**
- 此扩展为本地改造版（原 Browser MCP 1.3.4），已移除全部遥测上报
- Connect 成功后会打开本地欢迎页，不访问任何远程服务器
- 每次启动 Chrome 后需重新点击 Connect
- MCP Server (`dist/index.js`) 必须在运行状态，扩展才能连接

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

> **AI agents**: This step requires human action. Output a reminder to the human to install and connect the Browser Skills extension per the [Chrome 扩展安装说明](#-chrome-扩展安装人类操作) above.

1. Open Chrome
2. Click the **Browser Skills** extension icon in the toolbar
3. Click **Connect**
4. The extension status should show **Connected** and open a local welcome page

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
9. Bundled multi-tool Skill in `skill/` (Claude Code, Cursor, Cherry Studio, Windsurf compatible)
10. Modified Chrome extension (`crx_extracted/extension_contents/`) — removed all telemetry (PostHog + Amplitude), cleared remote API keys, renamed to **Browser Skills**
11. Connect redirect: `https://docs.browsermcp.io` → local `connected.html` (pure local, no remote requests)
