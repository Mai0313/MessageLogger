# MessageLogger for BetterDiscord

![Discord](https://img.shields.io/badge/Discord-Plugin-7289DA?style=flat-square&logo=discord)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

A powerful and modern BetterDiscord plugin that preserves your Discord message history by logging deleted messages, tracking edits, and detecting ghost pings with persistent storage.

## ✨ Features

- **📝 Deleted Message Tracking**: Automatically saves all deleted messages
- **✏️ Edit History**: Complete edit history tracking for all messages
- **👻 Ghost Ping Detection**: Catches and notifies you of deleted mentions
- **💾 Persistent Storage**: Messages persist across Discord restarts
- **⚙️ Highly Configurable**: Extensive settings for customization
- **🎨 Clean UI**: Seamless integration with Discord's interface
- **🔍 Smart Filters**: Ignore specific users, channels, or message types
- **🚀 Modern & Lightweight**: Built with performance in mind

## 📦 Installation

### Requirements
- [BetterDiscord](https://betterdiscord.app/) installed
- [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9) (auto-downloads if missing)

### Installation Steps

1. **Download the plugin**:
   - [MessageLogger.plugin.js](https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js)

2. **Place the file** in your BetterDiscord plugins folder:
   - **Windows**: `%AppData%\BetterDiscord\plugins`
   - **macOS**: `~/Library/Application Support/BetterDiscord/plugins`
   - **Linux**: `~/.config/BetterDiscord/plugins`

3. **Restart Discord** or press `Ctrl+R` (Windows/Linux) or `Cmd+R` (macOS)

4. **Enable the plugin** in User Settings → Plugins

## 🚀 Usage

Once enabled, MessageLogger works automatically in the background:

### Deleted Messages
- Deleted messages are highlighted with a red accent
- A "DELETED" badge appears if enabled in settings
- Messages persist based on your storage settings

### Edited Messages
- Edited messages show an orange accent
- Full edit history is preserved
- Click on edited messages to view history (coming soon)

### Ghost Pings
- Receive instant notifications when someone deletes a mention
- Ghost pings are saved and highlighted in blue

## ⚙️ Configuration

Access settings via **User Settings** → **Plugins** → **MessageLogger** → **Settings**

### General Settings
- **Log Deleted Messages**: Toggle deleted message tracking
- **Log Message Edits**: Toggle edit history tracking
- **Log Ghost Pings**: Toggle ghost ping detection
- **Persistent Storage**: Save messages across sessions

### Appearance
- **Show Deleted Badge**: Display badge on deleted messages
- **Show Edited Badge**: Display badge on edited messages
- **Deleted Message Color**: Customize deleted message highlight color
- **Edited Message Color**: Customize edited message highlight color

### Storage Settings
- **Maximum Stored Messages**: Limit messages stored per channel (10-1000)
- **Storage Duration**: How long to keep messages (1-30 days)

### Filters
- **Ignore Own Messages**: Don't log your own messages
- **Ignore Bot Messages**: Don't log bot messages
- **Ignored User IDs**: Comma-separated list of user IDs
- **Ignored Channel IDs**: Comma-separated list of channel IDs

## 🔧 Troubleshooting

**Plugin not loading?**
- Ensure BetterDiscord is up to date
- Check that ZeresPluginLibrary is installed
- Try disabling and re-enabling the plugin
- Check the console (`Ctrl+Shift+I`) for errors

**Messages not being logged?**
- Verify the plugin is enabled
- Check your filter settings
- Ensure the specific logging feature is enabled in settings

**Performance issues?**
- Reduce the maximum stored messages in settings
- Lower the storage duration
- Enable filters to reduce unnecessary logging

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built using the [BetterDiscord Plugin Library](https://github.com/rauenzi/BDPluginLibrary)
- Inspired by the need for better message history preservation in Discord

## 🌐 Language Support

This README is available in multiple languages:
- [繁體中文 (Traditional Chinese)](README.zh-TW.md)
- [简体中文 (Simplified Chinese)](README.zh-CN.md)

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) first.

## ⚠️ Disclaimer

This plugin is for personal use only. Please respect others' privacy and follow Discord's Terms of Service. The author is not responsible for any misuse of this tool.

---

**⭐ Star this repository if you find it useful!**
