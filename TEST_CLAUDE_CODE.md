# 🧪 Claude Code MCP 测试指南

## 🚀 **快速开始**

### **1. 确保 MCP 服务器运行**
```bash
# 在终端中启动服务器
cd ~/Downloads/mcp
node dist/index.js
```
**预期输出**：`WebSocket server listening on ws://localhost:8765/ws`

### **2. 配置 Claude Code MCP**
根据您的 Claude Code 版本，配置文件位置可能是：

#### **选项 A：Cursor (推荐)**
```bash
# 检查 Cursor 配置位置
ls -la ~/.cursor/
# 如果有 mcp.json，复制我们的配置
cp ~/Downloads/mcp/claude-mcp-config.json ~/.cursor/mcp.json
```

#### **选项 B：Claude Desktop**
```bash
# Claude 桌面版配置
cp ~/Downloads/mcp/claude-mcp-config.json ~/.config/claude/mcp.json
```

#### **选项 C：其他 MCP 客户端**
```bash
# VS Code with Claude 扩展
# 在 VS Code 设置中添加 MCP 配置
```

### **3. Chrome 扩展连接**
1. 打开 Chrome 浏览器
2. 点击 Browser MCP 扩展图标
3. 点击 "Connect"
4. **验证**：扩展应显示"连接成功"

---

## 🧪 **测试用例**

### **测试 1：基本导航**
在 Claude Code 中执行：
```javascript
// 导航到 Google
await navigate("https://google.com")
```

### **测试 2：Google 搜索 OpenClaw**
```javascript
// 输入搜索词
await type("input[name='q']", "OpenClaw")
// 点击搜索按钮
await click("input[value='Google 搜索']")
// 等待结果
await wait(3000)
```

### **测试 3：信息获取**
```javascript
// 获取页面信息
const snapshot = await snapshot()
console.log("页面快照:", snapshot)

// 获取控制台日志
const logs = await get_console_logs()
console.log("控制台日志:", logs)

// 截图
const screenshot = await screenshot()
console.log("截图成功")
```

### **测试 4：完整工作流**
```javascript
// 完整的 OpenClaw 信息收集
async function testOpenClawSearch() {
  try {
    // 1. 导航到 Google
    await navigate("https://google.com")
    
    // 2. 搜索 OpenClaw
    await type("input[name='q']", "OpenClaw GitHub")
    await click("input[value='Google 搜索']")
    await wait(3000)
    
    // 3. 收集信息
    const info = await snapshot()
    const logs = await get_console_logs()
    const screenshot = await screenshot()
    
    return {
      success: true,
      info,
      logs,
      screenshot,
      message: "OpenClaw 搜索测试完成"
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "测试失败"
    }
  }
}

// 执行测试
const result = await testOpenClawSearch()
console.log(JSON.stringify(result, null, 2))
```

---

## 🔧 **故障排除**

### **问题 1：服务器无法启动**
```
Error: Port 8765 already in use
```
**解决方案**：
```bash
# 杀死占用端口的进程
lsof -ti:8765 | xargs kill -9
# 重新启动
node dist/index.js
```

### **问题 2：扩展连接失败**
- 刷新 Chrome 页面
- 重新点击扩展中的"Connect"
- 检查服务器是否在运行

### **问题 3：Claude Code 未检测到工具**
- 重启 Claude Code / Cursor
- 检查配置文件位置是否正确
- 确认 MCP 服务器在运行

---

## 📊 **预期测试结果**

### **成功标志**：
- ✅ 服务器持续运行
- ✅ Chrome 扩展显示"已连接"
- ✅ Claude Code 中出现浏览器工具
- ✅ 可以执行导航、点击等操作
- ✅ 信息获取功能正常

### **失败处理**：
1. **检查连接状态**：扩展和服务器是否连通
2. **查看日志**：服务器输出有无错误
3. **验证配置**：MCP 配置路径是否正确

---

## 📞 **技术支持**

### **测试结果提交**：
请记录以下信息：
1. 测试时间
2. Claude Code 版本/类型
3. 测试用例执行情况
4. 错误信息（如果有）
5. 建议的改进

### **紧急联系**：
如果测试完全无法进行，请提供：
- 服务器输出日志
- Claude Code 错误信息
- Chrome 扩展状态截图

---

*测试指南生成时间: 2026-03-15 11:30:00*
*项目版本: @browsermcp/mcp@0.1.3 (forked)*