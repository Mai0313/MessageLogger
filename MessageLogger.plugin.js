/**
 * @name MessageLogger
 * @description A powerful Discord message logger that tracks deleted messages, edits, and ghost pings with persistent storage.
 * @author Mai0313
 * @version 1.0.0
 * @website https://github.com/Mai0313/MessageLogger
 * @source https://github.com/Mai0313/MessageLogger/blob/main/MessageLogger.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js
 */

module.exports = (() => {
    const config = {
        info: {
            name: "MessageLogger",
            authors: [{
                name: "Mai0313",
                discord_id: "YOUR_DISCORD_ID",
                github_username: "Mai0313"
            }],
            version: "1.0.0",
            description: "Track deleted messages, edits, and ghost pings with persistent storage",
            github: "https://github.com/Mai0313/MessageLogger",
            github_raw: "https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js"
        },
        changelog: [
            {
                title: "Initial Release",
                type: "added",
                items: [
                    "Deleted message tracking",
                    "Edit history logging",
                    "Ghost ping detection",
                    "Persistent storage system",
                    "Configurable settings panel"
                ]
            }
        ],
        defaultConfig: [
            {
                type: "category",
                id: "general",
                name: "General Settings",
                collapsible: true,
                shown: true,
                settings: [
                    {
                        type: "switch",
                        id: "logDeletes",
                        name: "Log Deleted Messages",
                        note: "Track and display deleted messages",
                        value: true
                    },
                    {
                        type: "switch",
                        id: "logEdits",
                        name: "Log Message Edits",
                        note: "Track message edit history",
                        value: true
                    },
                    {
                        type: "switch",
                        id: "logGhostPings",
                        name: "Log Ghost Pings",
                        note: "Track deleted mentions",
                        value: true
                    },
                    {
                        type: "switch",
                        id: "persistentStorage",
                        name: "Persistent Storage",
                        note: "Save logged messages across sessions",
                        value: true
                    }
                ]
            },
            {
                type: "category",
                id: "appearance",
                name: "Appearance",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "showDeletedBadge",
                        name: "Show Deleted Badge",
                        note: "Display a badge on deleted messages",
                        value: true
                    },
                    {
                        type: "switch",
                        id: "showEditedBadge",
                        name: "Show Edited Badge",
                        note: "Display a badge on edited messages",
                        value: true
                    },
                    {
                        type: "color",
                        id: "deletedColor",
                        name: "Deleted Message Color",
                        note: "Color for deleted message indicators",
                        value: "#f04747"
                    },
                    {
                        type: "color",
                        id: "editedColor",
                        name: "Edited Message Color",
                        note: "Color for edited message indicators",
                        value: "#faa61a"
                    }
                ]
            },
            {
                type: "category",
                id: "storage",
                name: "Storage Settings",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "slider",
                        id: "maxMessages",
                        name: "Maximum Stored Messages",
                        note: "Maximum number of messages to store per channel",
                        value: 100,
                        min: 10,
                        max: 1000,
                        markers: [10, 50, 100, 250, 500, 1000],
                        stickToMarkers: false
                    },
                    {
                        type: "slider",
                        id: "storageDays",
                        name: "Storage Duration (Days)",
                        note: "How long to keep logged messages",
                        value: 7,
                        min: 1,
                        max: 30,
                        markers: [1, 7, 14, 30],
                        stickToMarkers: true
                    }
                ]
            },
            {
                type: "category",
                id: "filters",
                name: "Filters",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "ignoreOwnMessages",
                        name: "Ignore Own Messages",
                        note: "Don't log your own deleted/edited messages",
                        value: false
                    },
                    {
                        type: "switch",
                        id: "ignoreBots",
                        name: "Ignore Bot Messages",
                        note: "Don't log bot messages",
                        value: false
                    },
                    {
                        type: "textbox",
                        id: "ignoredUsers",
                        name: "Ignored User IDs",
                        note: "Comma-separated list of user IDs to ignore",
                        value: ""
                    },
                    {
                        type: "textbox",
                        id: "ignoredChannels",
                        name: "Ignored Channel IDs",
                        note: "Comma-separated list of channel IDs to ignore",
                        value: ""
                    }
                ]
            }
        ]
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }

        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }

        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }

        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
            const { Logger, Patcher, WebpackModules, DiscordModules, Settings, Utilities, DOMTools } = Library;
            const { MessageStore, UserStore, ChannelStore, Dispatcher } = DiscordModules;

            return class MessageLogger extends Plugin {
                constructor() {
                    super();
                    this.deletedMessages = new Map();
                    this.editHistory = new Map();
                    this.ghostPings = new Map();
                }

                onStart() {
                    Logger.log("Starting MessageLogger...");
                    this.loadStoredData();
                    this.patchMessageHandlers();
                    this.addStyles();
                    this.startCacheCleanup();
                }

                onStop() {
                    Logger.log("Stopping MessageLogger...");
                    Patcher.unpatchAll();
                    this.removeStyles();
                    this.stopCacheCleanup();
                    if (this.settings.general.persistentStorage) {
                        this.saveStoredData();
                    }
                }

                getSettingsPanel() {
                    return Settings.SettingPanel.build(this.saveSettings.bind(this), ...this.buildSettings());
                }

                buildSettings() {
                    const settings = [];
                    for (const category of config.defaultConfig) {
                        const options = category.settings.map(setting => {
                            switch (setting.type) {
                                case "switch":
                                    return new Settings.Switch(
                                        setting.name,
                                        setting.note,
                                        this.settings[category.id][setting.id],
                                        (value) => {
                                            this.settings[category.id][setting.id] = value;
                                        }
                                    );
                                case "slider":
                                    return new Settings.Slider(
                                        setting.name,
                                        setting.note,
                                        setting.min,
                                        setting.max,
                                        this.settings[category.id][setting.id],
                                        (value) => {
                                            this.settings[category.id][setting.id] = value;
                                        },
                                        {
                                            markers: setting.markers,
                                            stickToMarkers: setting.stickToMarkers
                                        }
                                    );
                                case "textbox":
                                    return new Settings.Textbox(
                                        setting.name,
                                        setting.note,
                                        this.settings[category.id][setting.id],
                                        (value) => {
                                            this.settings[category.id][setting.id] = value;
                                        }
                                    );
                                case "color":
                                    return new Settings.ColorPicker(
                                        setting.name,
                                        setting.note,
                                        this.settings[category.id][setting.id],
                                        (value) => {
                                            this.settings[category.id][setting.id] = value;
                                        }
                                    );
                                default:
                                    return null;
                            }
                        }).filter(Boolean);

                        settings.push(new Settings.SettingGroup(category.name, { collapsible: category.collapsible, shown: category.shown }).append(...options));
                    }
                    return settings;
                }

                saveSettings() {
                    Utilities.saveSettings(this.getName(), this.settings);
                }

                loadStoredData() {
                    try {
                        const data = BdApi.Data.load(this.getName(), "messageCache");
                        if (data) {
                            this.deletedMessages = new Map(data.deleted || []);
                            this.editHistory = new Map(data.edits || []);
                            this.ghostPings = new Map(data.ghostPings || []);
                            Logger.log("Loaded stored message data");
                        }
                    } catch (error) {
                        Logger.error("Failed to load stored data:", error);
                    }
                }

                saveStoredData() {
                    try {
                        const data = {
                            deleted: Array.from(this.deletedMessages.entries()),
                            edits: Array.from(this.editHistory.entries()),
                            ghostPings: Array.from(this.ghostPings.entries())
                        };
                        BdApi.Data.save(this.getName(), "messageCache", data);
                        Logger.log("Saved message data");
                    } catch (error) {
                        Logger.error("Failed to save data:", error);
                    }
                }

                patchMessageHandlers() {
                    // Listen for message deletions
                    Dispatcher.subscribe("MESSAGE_DELETE", this.handleMessageDelete.bind(this));
                    
                    // Listen for message updates (edits)
                    Dispatcher.subscribe("MESSAGE_UPDATE", this.handleMessageUpdate.bind(this));
                    
                    // Listen for bulk message deletions
                    Dispatcher.subscribe("MESSAGE_DELETE_BULK", this.handleBulkDelete.bind(this));
                }

                handleMessageDelete(event) {
                    if (!this.settings.general.logDeletes) return;

                    const { channelId, id } = event;
                    const message = MessageStore.getMessage(channelId, id);
                    
                    if (!message || this.shouldIgnoreMessage(message)) return;

                    // Check for ghost ping
                    if (this.settings.general.logGhostPings && this.hasUserMentions(message)) {
                        this.logGhostPing(message);
                    }

                    this.logDeletedMessage(message);
                    Logger.log(`Logged deleted message: ${id}`);
                }

                handleMessageUpdate(event) {
                    if (!this.settings.general.logEdits) return;

                    const { message } = event;
                    if (!message || this.shouldIgnoreMessage(message)) return;

                    const cachedMessage = MessageStore.getMessage(message.channel_id, message.id);
                    if (cachedMessage && cachedMessage.content !== message.content) {
                        this.logEditedMessage(cachedMessage, message);
                        Logger.log(`Logged edited message: ${message.id}`);
                    }
                }

                handleBulkDelete(event) {
                    if (!this.settings.general.logDeletes) return;

                    const { channelId, ids } = event;
                    ids.forEach(id => {
                        const message = MessageStore.getMessage(channelId, id);
                        if (message && !this.shouldIgnoreMessage(message)) {
                            this.logDeletedMessage(message);
                        }
                    });
                    Logger.log(`Logged ${ids.length} bulk deleted messages`);
                }

                shouldIgnoreMessage(message) {
                    const { filters } = this.settings;
                    
                    // Check if own messages should be ignored
                    if (filters.ignoreOwnMessages && message.author.id === UserStore.getCurrentUser().id) {
                        return true;
                    }

                    // Check if bot messages should be ignored
                    if (filters.ignoreBots && message.author.bot) {
                        return true;
                    }

                    // Check ignored user list
                    const ignoredUsers = filters.ignoredUsers.split(",").map(id => id.trim()).filter(Boolean);
                    if (ignoredUsers.includes(message.author.id)) {
                        return true;
                    }

                    // Check ignored channel list
                    const ignoredChannels = filters.ignoredChannels.split(",").map(id => id.trim()).filter(Boolean);
                    if (ignoredChannels.includes(message.channel_id)) {
                        return true;
                    }

                    return false;
                }

                hasUserMentions(message) {
                    const currentUserId = UserStore.getCurrentUser().id;
                    return message.mentions && message.mentions.some(user => user.id === currentUserId);
                }

                logDeletedMessage(message) {
                    const channelKey = message.channel_id;
                    
                    if (!this.deletedMessages.has(channelKey)) {
                        this.deletedMessages.set(channelKey, []);
                    }

                    const channelMessages = this.deletedMessages.get(channelKey);
                    channelMessages.push({
                        ...message,
                        deletedAt: Date.now()
                    });

                    // Limit storage per channel
                    const maxMessages = this.settings.storage.maxMessages;
                    if (channelMessages.length > maxMessages) {
                        channelMessages.shift();
                    }

                    if (this.settings.general.persistentStorage) {
                        this.saveStoredData();
                    }
                }

                logEditedMessage(oldMessage, newMessage) {
                    const messageKey = newMessage.id;
                    
                    if (!this.editHistory.has(messageKey)) {
                        this.editHistory.set(messageKey, []);
                    }

                    const history = this.editHistory.get(messageKey);
                    history.push({
                        content: oldMessage.content,
                        editedAt: Date.now()
                    });

                    // Keep only last 10 edits per message
                    if (history.length > 10) {
                        history.shift();
                    }

                    if (this.settings.general.persistentStorage) {
                        this.saveStoredData();
                    }
                }

                logGhostPing(message) {
                    const channelKey = message.channel_id;
                    
                    if (!this.ghostPings.has(channelKey)) {
                        this.ghostPings.set(channelKey, []);
                    }

                    const channelPings = this.ghostPings.get(channelKey);
                    channelPings.push({
                        ...message,
                        ghostPingedAt: Date.now()
                    });

                    // Limit ghost pings stored
                    if (channelPings.length > 50) {
                        channelPings.shift();
                    }

                    BdApi.showToast(`Ghost ping detected from ${message.author.username}`, {
                        type: "warning"
                    });

                    if (this.settings.general.persistentStorage) {
                        this.saveStoredData();
                    }
                }

                startCacheCleanup() {
                    // Clean old messages every hour
                    this.cleanupInterval = setInterval(() => {
                        this.cleanOldMessages();
                    }, 60 * 60 * 1000);
                }

                stopCacheCleanup() {
                    if (this.cleanupInterval) {
                        clearInterval(this.cleanupInterval);
                    }
                }

                cleanOldMessages() {
                    const maxAge = this.settings.storage.storageDays * 24 * 60 * 60 * 1000;
                    const now = Date.now();

                    // Clean deleted messages
                    for (const [channel, messages] of this.deletedMessages.entries()) {
                        const filtered = messages.filter(msg => (now - msg.deletedAt) < maxAge);
                        if (filtered.length === 0) {
                            this.deletedMessages.delete(channel);
                        } else {
                            this.deletedMessages.set(channel, filtered);
                        }
                    }

                    // Clean ghost pings
                    for (const [channel, pings] of this.ghostPings.entries()) {
                        const filtered = pings.filter(ping => (now - ping.ghostPingedAt) < maxAge);
                        if (filtered.length === 0) {
                            this.ghostPings.delete(channel);
                        } else {
                            this.ghostPings.set(channel, filtered);
                        }
                    }

                    Logger.log("Cleaned old messages from cache");
                }

                addStyles() {
                    const css = `
                        .message-logger-deleted {
                            background-color: ${this.settings.appearance.deletedColor}15;
                            border-left: 2px solid ${this.settings.appearance.deletedColor};
                            padding-left: 8px;
                        }
                        
                        .message-logger-edited {
                            background-color: ${this.settings.appearance.editedColor}15;
                            border-left: 2px solid ${this.settings.appearance.editedColor};
                            padding-left: 8px;
                        }
                        
                        .message-logger-badge {
                            display: inline-block;
                            padding: 2px 6px;
                            margin-left: 6px;
                            border-radius: 3px;
                            font-size: 10px;
                            font-weight: 600;
                            text-transform: uppercase;
                        }
                        
                        .message-logger-badge-deleted {
                            background-color: ${this.settings.appearance.deletedColor};
                            color: white;
                        }
                        
                        .message-logger-badge-edited {
                            background-color: ${this.settings.appearance.editedColor};
                            color: white;
                        }
                        
                        .message-logger-ghost-ping {
                            background-color: #7289da15;
                            border-left: 2px solid #7289da;
                            padding-left: 8px;
                        }
                    `;
                    
                    BdApi.injectCSS(this.getName(), css);
                }

                removeStyles() {
                    BdApi.clearCSS(this.getName());
                }
            };
        };

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
