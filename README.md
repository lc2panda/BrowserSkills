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

Browser MCP is an MCP server + Chrome extension that allows you to automate your browser using AI applications like VS Code, Claude, Cursor, and Windsurf.

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
   - `src/types/mcp/tool.ts` - Complete tool type definitions (14 tools)
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
- The MCP server runs on port `8765` by default
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
3. Port `8765` is available for WebSocket connections
4. AI application has proper MCP configuration

---

## Original Credits

Browser MCP was adapted from the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) in order to automate the user's browser rather than creating new browser instances. This allows using your existing browser profile for logged-in sessions and avoids bot detection mechanisms.
