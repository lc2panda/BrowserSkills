---
name: "browser-mcp"
description: "Browser automation skill with 15 tools. Navigate, click, type, scroll, screenshot, fullpage capture, console logs, drag & drop. Powered by Browser MCP + Chrome extension."
---

# Browser MCP Skill v1.0.0

浏览器自动化技能，通过 Browser MCP Chrome 扩展控制真实浏览器。

## 前置条件

1. MCP 服务器已运行：`node /path/to/mcp/dist/index.js`
2. Browser MCP Chrome 扩展已安装并点击 **Connect** 连接
3. MCP 工具前缀：`mcp__browsermcp__*`

## 工具总览（15个）

| 工具 | 说明 | 必填参数 |
|------|------|----------|
| `navigate` | 导航到 URL | `url` |
| `go_back` | 浏览器后退 | — |
| `go_forward` | 浏览器前进 | — |
| `snapshot` | 获取页面 ARIA 快照 | — |
| `click` | 点击元素 | `element`, `ref` |
| `hover` | 悬停元素 | `element`, `ref` |
| `type` | 输入文本 | `element`, `ref`, `text` |
| `select_option` | 选择下拉选项 | `element`, `ref`, `values` |
| `drag` | 拖拽元素 | `startElement`, `startRef`, `endElement`, `endRef` |
| `scroll` | 滚动页面 | `x`, `y`, `deltaX`, `deltaY` |
| `press_key` | 按键 | `key` |
| `wait` | 等待 N 秒 | `time` |
| `get_console_logs` | 获取控制台日志 | — |
| `screenshot` | 截图（视窗内） | — |
| `fullpage_screenshot` | 全页截图（含视窗外） | — |

## 标准工作流

### 1. 导航 + 快照
```
1. mcp__browsermcp__navigate {url}
2. mcp__browsermcp__snapshot  → 获取 ref 引用
3. 根据 ref 执行后续操作
```

### 2. 表单填写
```
1. navigate → snapshot → 找到 input ref
2. click {ref}  → 激活输入框
3. type {ref, text}  → 输入内容
4. press_key "Enter" 或 click 提交按钮
```

### 3. 页面截图存档
```
1. navigate {url}
2. wait {time: 2}  → 等待渲染
3. fullpage_screenshot  → 保存至 /tmp/fullpage_*.jpg
```

### 4. 数据抓取
```
1. navigate {url}
2. snapshot  → 解析结构
3. 多次 scroll {deltaY: 500} + snapshot  → 加载更多
4. get_console_logs  → 检查网络/错误
```

### 5. 拖拽操作
```
1. snapshot → 找到 startRef 和 endRef
2. drag {startElement, startRef, endElement, endRef}
```

## 关键参数说明

### ref 引用
- 每次 `snapshot` 返回元素的 `ref`（如 `s1e12`）
- ref 会随页面变化而更新，操作前需重新 snapshot
- click/hover/type/drag 均依赖 ref

### scroll 参数
- `x`, `y`：滚动起始坐标（视窗坐标）
- `deltaX`, `deltaY`：滚动距离（正数向右/向下）
- 滚动整页：`{x: 760, y: 400, deltaX: 0, deltaY: 800}`

### fullpage_screenshot
- 截图保存至系统临时目录：`/tmp/fullpage_{timestamp}.jpg`
- 使用 CDP `Page.captureScreenshot` + `captureBeyondViewport: true`
- 适合长页面、文章、报告存档

## 常用场景示例

```
// 微信文章截图
1. navigate "https://mp.weixin.qq.com/s/..."
2. wait 3
3. fullpage_screenshot

// Google 搜索
1. navigate "https://www.google.com"
2. snapshot → 找搜索框 ref
3. type {ref, text: "关键词"}
4. press_key "Enter"
5. snapshot → 读取结果

// 登录表单
1. navigate "https://example.com/login"
2. snapshot
3. type {ref: username_ref, text: "user@mail.com"}
4. type {ref: password_ref, text: "password"}
5. click {ref: submit_ref}
6. snapshot → 验证登录状态
```

## 故障排查

| 问题 | 原因 | 解决 |
|------|------|------|
| 工具不可用 | 扩展未连接 | 点击扩展图标 → Connect |
| ref 无效 | 页面已变化 | 重新执行 snapshot |
| 截图为空 | 页面未加载完 | 添加 wait 2-3s |
| 超时 | 操作超过 10min | 拆分为多步执行 |
| 端口占用 | 9009 被占用 | `lsof -i:9009` 检查 |

## 文档

- `references/tools-reference.md` - 完整工具参数文档
- `references/workflows.md` - 高级工作流示例
