<div align="center" markdown="1">

# MessageLogger for BetterDiscord

![Discord](https://img.shields.io/badge/Discord-Plugin-7289DA?style=flat-square&logo=discord)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)
[![npm version](https://img.shields.io/npm/v/ts-template.svg)](https://www.npmjs.com/package/ts-template)
[![node](https://img.shields.io/badge/-Node.js_18%7C20%7C22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![tests](https://github.com/Mai0313/MessageLogger/actions/workflows/test.yml/badge.svg)](https://github.com/Mai0313/MessageLogger/actions/workflows/test.yml)
[![code-quality](https://github.com/Mai0313/MessageLogger/actions/workflows/code-quality-check.yml/badge.svg)](https://github.com/Mai0313/MessageLogger/actions/workflows/code-quality-check.yml)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/MessageLogger/blob/main/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/MessageLogger/pulls)

</div>

一个功能强大的现代化 BetterDiscord 插件，通过记录已删除消息、追踪编辑和侦测幽灵提及来保存您的 Discord 消息历史，并支持永久存储。

## ✨ 功能特色

- **📝 删除消息追踪**：自动保存所有已删除的消息
- **✏️ 编辑历史**：完整追踪所有消息的编辑历程
- **👻 幽灵提及侦测**：捕捉并通知您已删除的提及
- **💾 永久存储**：消息在 Discord 重启后仍然保留
- **⚙️ 高度可配置**：丰富的自定义设置选项
- **🎨 整洁界面**：与 Discord 界面无缝整合
- **🔍 智能筛选**：忽略特定用户、频道或消息类型
- **🚀 现代且轻量**：注重性能的设计

## 📦 安装方式

### 系统需求
- 已安装 [BetterDiscord](https://betterdiscord.app/)
- [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9)（如缺少会自动下载）

### 安装步骤

1. **下载插件**：
   - [MessageLogger.plugin.js](https://raw.githubusercontent.com/Mai0313/MessageLogger/main/dist/MessageLogger.plugin.js)

2. **放置文件**到您的 BetterDiscord 插件文件夹：
   - **Windows**：`%AppData%\BetterDiscord\plugins`
   - **macOS**：`~/Library/Application Support/BetterDiscord/plugins`
   - **Linux**：`~/.config/BetterDiscord/plugins`

3. **重新启动 Discord** 或按下 `Ctrl+R`（Windows/Linux）或 `Cmd+R`（macOS）

4. **启用插件**在"用户设置"→"插件"

## 🚀 使用方式

启用后，MessageLogger 会在后台自动运作：

### 删除消息
- 已删除的消息会以红色强调显示
- 如果在设置中启用，会显示"已删除"徽章
- 消息会根据您的存储设置保留

### 编辑消息
- 已编辑的消息会显示橙色强调
- 完整的编辑历史会被保留
- 点击已编辑的消息查看历史（即将推出）

### 幽灵提及
- 当有人删除提及时会立即收到通知
- 幽灵提及会被保存并以蓝色强调显示

## ⚙️ 配置选项

前往**用户设置** → **插件** → **MessageLogger** → **设置**

### 一般设置
- **记录删除消息**：切换删除消息追踪
- **记录消息编辑**：切换编辑历史追踪
- **记录幽灵提及**：切换幽灵提及侦测
- **永久存储**：跨会话保存消息

### 外观
- **显示删除徽章**：在已删除消息上显示徽章
- **显示编辑徽章**：在已编辑消息上显示徽章
- **删除消息颜色**：自定义已删除消息的强调颜色
- **编辑消息颜色**：自定义已编辑消息的强调颜色

### 存储设置
- **最大存储消息数**：限制每个频道存储的消息数量（10-1000）
- **存储期限**：消息保留时间（1-30 天）

### 筛选器
- **忽略自己的消息**：不记录您自己的消息
- **忽略机器人消息**：不记录机器人的消息
- **忽略的用户 ID**：以逗号分隔的用户 ID 列表
- **忽略的频道 ID**：以逗号分隔的频道 ID 列表

## 🔧 疑难解答

**插件无法加载？**
- 确保 BetterDiscord 已更新至最新版本
- 检查 ZeresPluginLibrary 是否已安装
- 尝试停用后重新启用插件
- 检查控制台（`Ctrl+Shift+I`）是否有错误

**消息没有被记录？**
- 确认插件已启用
- 检查您的筛选设置
- 确保在设置中启用了特定的记录功能

**性能问题？**
- 在设置中减少最大存储消息数
- 降低存储期限
- 启用筛选器以减少不必要的记录

## 📝 许可条款

本项目采用 MIT 许可条款 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 使用 [BetterDiscord Plugin Library](https://github.com/rauenzi/BDPluginLibrary) 构建
- 灵感来自于 Discord 中更好的消息历史保存需求

## 🌐 多语言支持

本 README 提供多种语言版本：
- [English (英文)](README.md)
- [繁體中文 (繁体中文)](README.zh-TW.md)

## 🤝 贡献

欢迎贡献！请先阅读[贡献指南](CONTRIBUTING.md)。

## ⚠️ 免责声明

本插件仅供个人使用。请尊重他人隐私并遵守 Discord 服务条款。作者不对本工具的任何滥用负责。

---

**⭐ 如果您觉得这个项目有用，请给个星星！**
