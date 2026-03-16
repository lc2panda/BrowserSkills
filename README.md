# 🚀 Browser MCP - 独立构建分支

<a href="https://browsermcp.io">
  <img src="./.github/images/banner.png" alt="Browser MCP banner">
</a>

<h3 align="center">Browser MCP - 浏览器自动化 MCP 服务器</h3>

<p align="center">
  Automate your browser with AI. / 使用 AI 自动化您的浏览器
  <br />
  <a href="https://browsermcp.io"><strong>Official Website</strong></a> 
  •
  <a href="https://docs.browsermcp.io"><strong>Documentation</strong></a>
  •
  <a href="README_CN.md"><strong>中文完整版</strong></a>
</p>

---

## 🌟 主要特点 / Key Features

| 特点 | 说明 |
|------|------|
| ⚡ **快速 / Fast** | 本地自动化，无网络延迟 / Local automation, no network latency |
| 🔒 **私密 / Private** | 数据保留在本地设备 / Data stays on your local device |
| 👤 **保持登录 / Logged In** | 使用现有浏览器配置文件 / Uses your existing browser profile |
| 🥷 **防检测 / Stealth** | 使用真实浏览器指纹 / Uses real browser fingerprint |

---

## 🔧 分支优化 / Fork Optimizations

**此分支解决了原项目的主要限制：独立构建能力。**  
*This fork resolves the main limitation of the original project: independent build capability.*

### ✅ 已完成的优化 / Optimizations Made

#### 1. **移除 Monorepo 依赖 / Removed Monorepo Dependencies**
- ✅ 移除所有 `workspace:*` 依赖
- ✅ Eliminated all `workspace:*` dependencies

#### 2. **创建缺失配置文件 / Added Missing Configuration Files**
```bash
src/config/app.config.ts        # 应用配置 / Application configuration
src/config/mcp.config.ts        # MCP 服务器配置 / MCP server configuration
src/types/mcp/tool.ts           # 14 种工具类型 / Complete tool type definitions
src/types/messages/ws.ts        # WebSocket 消息映射 / WebSocket message mappings
src/messaging/types.ts          # 消息类型工具 / Message type utilities
src/messaging/ws/sender.ts      # WebSocket 消息发送器 / WebSocket message sender
```

#### 3. **技术兼容性 / Technical Compatibility**
- ✅ TypeScript 严格检查通过 / Passes strict TypeScript checking
- ✅ 可独立成功构建 / Successfully builds standalone
- ✅ 兼容官方 Chrome 扩展 / Compatible with official Chrome extension

---

## 🛠️ 快速开始 / Quick Start

### 1. 克隆并构建 / Clone & Build
```bash
# 克隆此仓库 / Clone this repository
git clone https://github.com/lc2panda/mcp.git
cd mcp

# 安装依赖 / Install dependencies
npm install

# 构建 MCP 服务器 / Build the MCP server
npm run build

# 测试服务器 / Test the server (shows help)
node dist/index.js --help
```

### 2. 配置 MCP 客户端 / Configure MCP Client
```json
// 在 AI 应用中配置 / Add to your AI app's MCP configuration
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

### 3. 连接浏览器扩展 / Connect Browser Extension
**重要提示 / Important Note**: 此 fork 优化的是构建独立性，并非创建新的浏览器插件。  
*This fork optimizes build independence, not creating a new browser extension.*

**实际步骤 / Actual Steps**:
1. 从 Chrome 网上应用店安装官方 Browser MCP 扩展 / Install official Browser MCP extension from Chrome Web Store
2. 扩展图标固定后，点击 "Connect" / After pinning the extension icon, click "Connect"
3. 系统会自动连接到本 MCP 服务器 / It will automatically connect to this MCP server
4. 验证连接状态（扩展图标显示已连接） / Verify connection status (extension icon shows connected)

**原因 / Why this is required**: Browser MCP 采用客户端‑扩展‑服务器三端架构：AI 客户端 ↔ MCP 服务器 ↔ Chrome 扩展。我们的优化集中在服务器端，扩展仍是必需的通信桥梁。  
*Browser MCP uses a three‑end architecture: AI client ↔ MCP server ↔ Chrome extension. Our optimizations focus on the server side; the extension remains the essential communication bridge.*

---

## 🧪 功能测试 / Functional Testing

```javascript
// 示例测试代码 / Example test code
await navigate("https://google.com")
await type("input[name='q']", "OpenClaw")
await click("input[value='Google 搜索']")
await wait(3000)
const snapshot = await snapshot()
const screenshot = await screenshot()
```

## 📋 验证清单 / Verification Checklist

- [ ] MCP 服务器成功构建 / MCP server builds successfully
- [ ] TypeScript 检查通过 / TypeScript checks pass
- [ ] Chrome 扩展已连接 / Chrome extension connected
- [ ] AI 应用配置完成 / AI application configured
- [ ] 浏览器自动化工作正常 / Browser automation works as expected

---

## 🐛 问题报告 / Issue Reporting

### 常见问题 / Common Issues
1. **连接失败 / Connection Failed**
   - 检查服务器是否运行 / Check if server is running: `node dist/index.js`
   - 检查端口 8765 是否可用 / Check if port 8765 is available

2. **工具不可用 / Tools Not Available**
   - 重启 MCP 客户端 / Restart MCP client
   - 验证配置文件路径 / Verify configuration file path

---

## 📄 文档资源 / Documentation Resources

| 文档 | 描述 |
|------|------|
| [README_CN.md](README_CN.md) | 完整中文文档 / Full Chinese documentation |
| [TESTING.md](TESTING.md) | 测试报告 / Testing report |
| [TEST_CLAUDE_CODE.md](TEST_CLAUDE_CODE.md) | Claude Code 集成指南 / Claude Code integration guide |

---

## 🚀 一键安装脚本 / One-Click Setup

```bash
# 运行安装脚本 / Run setup script
./setup-and-test.sh
```

脚本会自动：
- ✅ 构建项目 / Build the project
- ✅ 配置 MCP 客户端 / Configure MCP client
- ✅ 启动服务器 / Start the server
- ✅ 提供测试指南 / Provide testing guidance

---

## 🤝 技术贡献 / Technical Contributions

### 修复的关键问题 / Key Issues Fixed
1. **递归调用问题 / Recursive Call Issue**: `server.close` 方法修复
2. **系统依赖问题 / System Dependency Issue**: 移除 `lsof` 依赖
3. **WebSocket 服务器 / WebSocket Server**: 正确集成 HTTP+WebSocket 双服务
4. **缺失配置 / Missing Configuration**: 创建 6 个缺失的配置文件
5. **导入路径 / Import Paths**: 修复所有 `@repo/*` 引用

---

## 📊 项目状态 / Project Status

| 项目指标 | 状态 |
|----------|------|
| **独立构建** / Independent Build | ✅ 完成 / Complete |
| **TypeScript 检查** / TypeScript Checking | ✅ 通过 / Passed |
| **Chrome 扩展兼容** / Chrome Extension Compatibility | ✅ 已验证 / Verified |
| **服务器运行** / Server Running | ✅ 正常 / Normal |
| **功能测试** / Functional Testing | 🔄 待验证 / Pending |

---

<details>
<summary><strong>📜 完整提交记录 / Complete Commit History</strong></summary>

```bash
# 最新提交记录 / Latest commits
63bc5ca [FINAL BUGFIX] Complete WebSocket server and final fixes
3eca73e [DOCS] Update README with fork optimizations and installation guide  
52e67a9 [BUGFIX] Make project independently buildable
9db12f2 chore: version 0.1.3 (original commit)
```

</details>

---

## 📞 联系方式 / Contact

- **GitHub 仓库 / GitHub Repository**: https://github.com/lc2panda/mcp
- **维护者 / Maintainer**: [lc2panda](https://github.com/lc2panda)
- **最后更新 / Last Updated**: 2026-03-15

---

**🎉 此分支使得 Browser MCP 项目完全可独立构建和使用！**  
*This fork makes Browser MCP project completely independent and usable!*