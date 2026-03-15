#!/bin/bash

echo "=== 🚀 Browser MCP Claude Code 测试安装脚本 ==="
echo "时间: $(date)"
echo ""

# 检查必要组件
echo "🔍 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi
echo "✅ Node.js 版本: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi
echo "✅ npm 版本: $(npm --version)"

echo ""

# 构建项目
echo "🔨 构建 MCP 服务器..."
cd "$(dirname "$0")"
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi
echo "✅ 构建成功"

echo ""

# 检测 Claude/Cursor 配置位置
echo "🔍 检测 MCP 客户端配置..."
CONFIG_FOUND=false
CONFIG_PATHS=(
    "$HOME/.cursor/mcp.json"
    "$HOME/.config/claude/mcp.json" 
    "$HOME/.claude/desktop_config.json"
    "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
)

for config_path in "${CONFIG_PATHS[@]}"; do
    if [ -f "$config_path" ] || [ -d "$(dirname "$config_path")" ]; then
        CONFIG_FOUND=true
        echo "✅ 找到配置位置: $(dirname "$config_path")"
        
        # 复制我们的配置
        cp claude-mcp-config.json "$config_path" 2>/dev/null || \
        echo "📋 手动复制配置到: $config_path"
        break
    fi
done

if [ "$CONFIG_FOUND" = false ]; then
    echo "⚠️  未找到已知 MCP 配置位置"
    echo "📋 手动配置：将 claude-mcp-config.json 复制到您的 MCP 客户端配置目录"
fi

echo ""

# 启动服务器
echo "🚀 启动 MCP 服务器..."
echo "注意：服务器将在后台运行，按 Ctrl+C 停止"
echo ""
echo "MCP 服务器输出:"
echo "================"

# 在前台启动以便看到输出
node dist/index.js

echo ""
echo "================"
echo "服务器已停止"