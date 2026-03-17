# Browser MCP Tools Reference

## 导航类
| 工具 | 参数 | 说明 |
|------|------|------|
| `navigate` | `url: string` | 跳转到指定 URL |
| `go_back` | — | 浏览器后退 |
| `go_forward` | — | 浏览器前进 |
| `wait` | `time: number (0-60s)` | 等待指定秒数 |

## 页面感知
| 工具 | 参数 | 说明 |
|------|------|------|
| `snapshot` | — | 获取 ARIA 结构快照，返回所有可交互元素及 ref |
| `screenshot` | `selector?: string` | 截取当前视窗截图 |
| `fullpage_screenshot` | — | 截取完整页面长图，保存至 /tmp/ |
| `get_console_logs` | — | 获取浏览器控制台日志 |

## 交互类
| 工具 | 参数 | 说明 |
|------|------|------|
| `click` | `element: string, ref: string` | 点击元素 |
| `hover` | `element: string, ref: string` | 悬停元素 |
| `type` | `element, ref, text, submit?: bool` | 输入文字 |
| `select_option` | `element, ref, values: string[]` | 下拉选择 |
| `press_key` | `key: string` | 键盘按键（Enter/Tab/Escape 等）|
| `drag` | `startElement, startRef, endElement, endRef` | 拖拽 |
| `scroll` | `x, y, deltaX, deltaY` | 滚动页面 |

## 重要说明
- `ref` 来自 `snapshot` 返回的 ARIA 树，格式如 `s1e42`
- `element` 是人类可读的描述，用于日志
- `fullpage_screenshot` 输出：`/var/folders/.../T/fullpage_<timestamp>.jpg`
- WebSocket 端口：`9009`
- 需先启动 MCP server 并连接 Chrome 扩展
