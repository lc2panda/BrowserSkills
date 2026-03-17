# Browser MCP Common Workflows

## 1. 导航并截图存档
```
navigate {url} → wait {2} → fullpage_screenshot
```
截图保存至 `/var/folders/.../T/fullpage_<timestamp>.jpg`

## 2. 搜索并点击结果
```
navigate {搜索URL} → snapshot → click {结果ref}
```

## 3. 表单填写提交
```
navigate {url} → snapshot → click {input ref} → type {ref, text} → press_key "Enter"
```

## 4. 无限滚动页面采集
```
navigate {url} → snapshot → scroll {x:0,y:0,deltaX:0,deltaY:800} → snapshot → 重复
```

## 5. 下拉选择
```
snapshot → select_option {ref, values:["option"]}
```

## 6. 拖拽操作
```
snapshot → drag {startRef, endRef}
```

## 7. 调试页面错误
```
navigate {url} → get_console_logs
```

## 8. 多标签页操作
每次 navigate 会在当前 tab 跳转，切换 tab 需在 Chrome 扩展中重新 Connect。

## ref 使用规则
1. 每次 `snapshot` 后 ref 会刷新
2. 操作前必须先 snapshot 获取最新 ref
3. ref 格式：`s1e{数字}`，如 `s1e42`
