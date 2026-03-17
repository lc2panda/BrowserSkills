<a href="https://browsermcp.io">
  <img src="./.github/images/banner.png" alt="Browser MCP banner">
</a>

<h3 align="center">Browser MCP</h3>

<p align="center">
  使用 AI 自动化您的浏览器。
  <br />
  <a href="https://browsermcp.io"><strong>官方网站</strong></a> 
  •
  <a href="https://docs.browsermcp.io"><strong>文档</strong></a>
</p>

## 关于此项目

Browser MCP 是一个 **MCP Server**，通过配合官方 Browser MCP Chrome 扩展（外部扩展，需单独安装），让您使用 AI 应用（如 VS Code、Claude、Cursor 和 Windsurf）自动化您的浏览器。本项目仅提供服务器端实现。

## 主要特点

- ⚡ **快速**：自动化在本地机器上运行，性能更好，无网络延迟。
- 🔒 **私密**：由于自动化在本地运行，您的浏览器活动保留在设备上，不会发送到远程服务器。
- 👤 **保持登录**：使用您现有的浏览器配置文件，保持登录所有服务。
- 🥷 **防检测**：使用真实的浏览器指纹，避免基本机器人检测和 CAPTCHA。

## 🚀 分支优化

此分支解决了原项目的主要限制：**独立构建能力**。

### ✅ **已完成的优化**

1. **移除 Monorepo 依赖**
   - 移除所有 `workspace:*` 依赖 (`@repo/config`、`@repo/types`、`@repo/messaging`、`@repo/utils`、`@r2r/messaging`)
   - 为必要功能添加了内联实现

2. **添加缺失的配置文件**
   - `src/config/app.config.ts` - 应用配置
   - `src/config/mcp.config.ts` - MCP 服务器配置
   - `src/types/mcp/tool.ts` - 完整的工具类型定义（15种工具）
   - `src/types/messages/ws.ts` - WebSocket 消息映射
   - `src/messaging/types.ts` - 消息类型工具
   - `src/messaging/ws/sender.ts` - WebSocket 消息发送器

3. **修复导入路径**
   - 将所有 `@repo/*` 导入更新为 `@/*` 路径
   - 修复 TypeScript 模块解析

4. **TypeScript 兼容性**
   - 通过严格 TypeScript 检查 (`npm run typecheck`)
   - 可独立成功构建

5. **修复 drag 工具注册**
   - 将 `snapshot.drag` 加入 `snapshotTools` 数组（`src/index.ts`）
   - 重新构建验证，`tools/list` 现返回完整 15 个工具

6. **超时时间延长**
   - 默认超时从 30s 延长至 10min（600000ms），支持复杂长时间操作

7. **新增 scroll 工具**
   - 支持页面滚动，实现完整浏览器交互能力

8. **新增 fullpage_screenshot 工具**
   - 使用 `Page.captureScreenshot` + `captureBeyondViewport: true`
   - 可截取超出视窗的完整页面内容

9. **响应格式兼容**
   - 兼容 array 和 `{result}` 两种 WebSocket 响应格式

## 🛠 安装与设置

### **1. 安装 MCP 服务器**
```bash
# 克隆此仓库
git clone https://github.com/lc2panda/mcp.git
cd mcp

# 安装依赖
npm install

# 构建 MCP 服务器
npm run build

# 测试服务器（显示帮助）
node dist/index.js --help
```

### **2. 安装 Chrome 扩展**
1. 访问 [Browser MCP Chrome Web Store](https://chromewebstore.google.com/detail/browsermcp/...) *（请查看官网获取最新链接）*
2. 点击“添加到 Chrome”安装扩展
3. 固定扩展以便快速访问
4. 点击扩展图标并点击“Connect”连接到 MCP 服务器

### **3. 配置您的 AI 应用**
在您的 AI 应用的 MCP 服务器配置中添加：
```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "node",
      "args": ["/path/to/mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

### **4. 开始自动化**
- MCP 服务器默认运行在端口 `9009`
- 通过扩展连接浏览器标签页
- 使用 AI 工具自动化浏览器操作

## 🧪 安装测试

**测试 Google 搜索自动化：**
1. 确保 MCP 服务器正在运行
2. 通过扩展连接浏览器标签页
3. 使用 AI 工具：
   - 导航到 `https://google.com`
   - 搜索 "OpenClaw"
   - 截取屏幕截图
   - 提取控制台日志

## 📋 验证清单
- [ ] MCP 服务器成功构建 (`npm run build`)
- [ ] TypeScript 检查通过 (`npm run typecheck`)
- [ ] Chrome 扩展已安装并连接
- [ ] AI 应用已配置 MCP 服务器
- [ ] 浏览器自动化工具按预期工作

## 🐛 问题报告
如果遇到问题，请检查：
1. Chrome 扩展是否已安装并连接
2. MCP 服务器是否正在运行 (`node dist/index.js`)
3. 端口 `9009` 是否可用于 WebSocket 连接
4. AI 应用是否有正确的 MCP 配置

---

<details>
<summary><strong>English Version / 英文版本</strong></summary>

<a href="https://browsermcp.io">
  <img src="./.github/images/banner.png" alt="Browser MCP banner">
</a>

<h3 align="center">Browser MCP</h3>

<p align="center">
  Automate your browser with AI.
  <br />
  <a href="https://browsermcp.io"><strong>Website</strong></a> 
  •
  <a href="https://docs.browsermcp.io"><strong>Docs</strong></a>
</p>

## About

Browser MCP is an **MCP Server** that works with the official Browser MCP Chrome Extension (external, install separately) to automate your browser using AI applications like VS Code, Claude, Cursor, and Windsurf. This project provides the server-side implementation only.

## Features

- ⚡ Fast: Automation happens locally on your machine, resulting in better performance without network latency.
- 🔒 Private: Since automation happens locally, your browser activity stays on your device and isn't sent to remote servers.
- 👤 Logged In: Uses your existing browser profile, keeping you logged into all your services.
- 🥷🏼 Stealth: Avoids basic bot detection and CAPTCHAs by using your real browser fingerprint.

## 🚀 Fork Optimizations

This fork resolves the main limitation of the original project: **independent build capability**.

### ✅ **Optimizations Made:**

1. **Removed Monorepo Dependencies**
   - Eliminated all `workspace:*` dependencies (`@repo/config`, `@repo/types`, `@repo/messaging`, `@repo/utils`, `@r2r/messaging`)
   - Added inline implementations for essential functionality

2. **Added Missing Configuration Files**
   - `src/config/app.config.ts` - Application configuration
   - `src/config/mcp.config.ts` - MCP server configuration
   - `src/types/mcp/tool.ts` - Complete tool type definitions (13 tools)
   - `src/types/messages/ws.ts` - WebSocket message mappings
   - `src/messaging/types.ts` - Message type utilities
   - `src/messaging/ws/sender.ts` - WebSocket message sender

3. **Fixed Import Paths**
   - Updated all imports from `@repo/*` to `@/*` paths
   - Fixed TypeScript module resolution

4. **TypeScript Compatibility**
   - Passes strict TypeScript checking (`npm run typecheck`)
   - Successfully builds standalone

## 🛠 Installation & Setup

### **1. Install MCP Server**
```bash
# Clone this repository
git clone https://github.com/lc2panda/mcp.git
cd mcp

# Install dependencies
npm install

# Build the MCP server
npm run build

# Test the server (shows help)
node dist/index.js --help
```

### **2. Install Chrome Extension**
1. Visit [Browser MCP Chrome Web Store](https://chromewebstore.google.com/detail/browsermcp/...) *(Check official site for latest link)*
2. Click "Add to Chrome" to install the extension
3. Pin the extension for easy access
4. Click the extension icon and "Connect" to link to MCP server

### **3. Configure Your AI Application**
Add to your AI app's MCP server configuration:
```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "node",
      "args": ["/path/to/mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

### **4. Start Automating**
- The MCP server runs on port `9009` by default
- Connect browser tabs via the extension
- Use AI tools to automate browser actions

## 🧪 Testing the Installation

**Test Google Search Automation:**
1. Ensure MCP server is running
2. Connect a browser tab via the extension
3. Use AI tools to:
   - Navigate to `https://google.com`
   - Search for "OpenClaw"
   - Take screenshots
   - Extract console logs

## 📋 Verification Checklist
- [ ] MCP server builds successfully (`npm run build`)
- [ ] TypeScript checks pass (`npm run typecheck`)
- [ ] Chrome extension installed and connected
- [ ] AI application configured with MCP server
- [ ] Browser automation tools work as expected

## 🐛 Issue Reporting
If you encounter issues, check:
1. Chrome extension is installed and connected
2. MCP server is running (`node dist/index.js`)
3. Port `9009` is available for WebSocket connections
4. AI application has proper MCP configuration

---

## Original Credits

Browser MCP was adapted from the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) in order to automate the user's browser rather than creating new browser instances. This allows using your existing browser profile for logged-in sessions and avoids bot detection mechanisms.

</details>

---

**简体中文版 | Simplified Chinese Version**
*本分支解决了原项目无法独立构建的问题，提供完整的中文文档和使用指南。*

**项目维护者**: [lc2panda](https://github.com/lc2panda)
**最后更新**: 2026-03-17