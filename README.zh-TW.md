# MessageLogger for BetterDiscord

![Discord](https://img.shields.io/badge/Discord-外掛-7289DA?style=flat-square&logo=discord)
![版本](https://img.shields.io/badge/版本-1.0.0-green?style=flat-square)
![授權](https://img.shields.io/badge/授權-MIT-blue?style=flat-square)

一個功能強大的現代化 BetterDiscord 外掛，透過記錄已刪除訊息、追蹤編輯和偵測幽靈提及來保存您的 Discord 訊息歷史，並支援永久儲存。

## ✨ 功能特色

- **📝 刪除訊息追蹤**：自動保存所有已刪除的訊息
- **✏️ 編輯歷史**：完整追蹤所有訊息的編輯歷程
- **👻 幽靈提及偵測**：捕捉並通知您已刪除的提及
- **💾 永久儲存**：訊息在 Discord 重啟後仍然保留
- **⚙️ 高度可設定**：豐富的自訂設定選項
- **🎨 整潔介面**：與 Discord 介面無縫整合
- **🔍 智慧篩選**：忽略特定使用者、頻道或訊息類型
- **🚀 現代且輕量**：注重效能的設計

## 📦 安裝方式

### 系統需求
- 已安裝 [BetterDiscord](https://betterdiscord.app/)
- [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9)（如缺少會自動下載）

### 安裝步驟

1. **下載外掛**：
   - [MessageLogger.plugin.js](https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js)

2. **放置檔案**到您的 BetterDiscord 外掛資料夾：
   - **Windows**：`%AppData%\BetterDiscord\plugins`
   - **macOS**：`~/Library/Application Support/BetterDiscord/plugins`
   - **Linux**：`~/.config/BetterDiscord/plugins`

3. **重新啟動 Discord** 或按下 `Ctrl+R`（Windows/Linux）或 `Cmd+R`（macOS）

4. **啟用外掛**在「使用者設定」→「外掛」

## 🚀 使用方式

啟用後，MessageLogger 會在背景自動運作：

### 刪除訊息
- 已刪除的訊息會以紅色強調顯示
- 如果在設定中啟用，會顯示「已刪除」徽章
- 訊息會根據您的儲存設定保留

### 編輯訊息
- 已編輯的訊息會顯示橙色強調
- 完整的編輯歷史會被保留
- 點擊已編輯的訊息查看歷史（即將推出）

### 幽靈提及
- 當有人刪除提及時會立即收到通知
- 幽靈提及會被保存並以藍色強調顯示

## ⚙️ 設定選項

前往**使用者設定** → **外掛** → **MessageLogger** → **設定**

### 一般設定
- **記錄刪除訊息**：切換刪除訊息追蹤
- **記錄訊息編輯**：切換編輯歷史追蹤
- **記錄幽靈提及**：切換幽靈提及偵測
- **永久儲存**：跨會話保存訊息

### 外觀
- **顯示刪除徽章**：在已刪除訊息上顯示徽章
- **顯示編輯徽章**：在已編輯訊息上顯示徽章
- **刪除訊息顏色**：自訂已刪除訊息的強調顏色
- **編輯訊息顏色**：自訂已編輯訊息的強調顏色

### 儲存設定
- **最大儲存訊息數**：限制每個頻道儲存的訊息數量（10-1000）
- **儲存期限**：訊息保留時間（1-30 天）

### 篩選器
- **忽略自己的訊息**：不記錄您自己的訊息
- **忽略機器人訊息**：不記錄機器人的訊息
- **忽略的使用者 ID**：以逗號分隔的使用者 ID 清單
- **忽略的頻道 ID**：以逗號分隔的頻道 ID 清單

## 🔧 疑難排解

**外掛無法載入？**
- 確保 BetterDiscord 已更新至最新版本
- 檢查 ZeresPluginLibrary 是否已安裝
- 嘗試停用後重新啟用外掛
- 檢查控制台（`Ctrl+Shift+I`）是否有錯誤

**訊息沒有被記錄？**
- 確認外掛已啟用
- 檢查您的篩選設定
- 確保在設定中啟用了特定的記錄功能

**效能問題？**
- 在設定中減少最大儲存訊息數
- 降低儲存期限
- 啟用篩選器以減少不必要的記錄

## 📝 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

## 🙏 致謝

- 使用 [BetterDiscord Plugin Library](https://github.com/rauenzi/BDPluginLibrary) 建構
- 靈感來自於 Discord 中更好的訊息歷史保存需求

## 🌐 多語言支援

本 README 提供多種語言版本：
- [English (英文)](README.md)
- [简体中文 (簡體中文)](README.zh-CN.md)

## 🤝 貢獻

歡迎貢獻！請先閱讀[貢獻指南](CONTRIBUTING.md)。

## ⚠️ 免責聲明

本外掛僅供個人使用。請尊重他人隱私並遵守 Discord 服務條款。作者不對本工具的任何濫用負責。

---

**⭐ 如果您覺得這個專案有用，請給個星星！**
