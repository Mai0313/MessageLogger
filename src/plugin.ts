/**
 * MessageLogger Plugin Implementation
 */

import { config } from './config';
import type {
    Logger,
    Patcher,
    DiscordModules,
    Settings,
    Utilities,
    PluginInstance,
    DiscordMessage,
} from './types/betterdiscord';
import type {
    PluginSettings,
    DeletedMessage,
    EditedMessageHistory,
    GhostPing,
    MessageDeleteEvent,
    MessageUpdateEvent,
    MessageDeleteBulkEvent,
    CacheData,
} from './types/plugin';

export class MessageLoggerPlugin implements PluginInstance {
    private logger: Logger;
    private patcher: Patcher;
    private discordModules: DiscordModules;
    private settingsModule: Settings;
    private utilities: Utilities;

    private deletedMessages: Map<string, DeletedMessage[]> = new Map();
    private editHistory: Map<string, EditedMessageHistory[]> = new Map();
    private ghostPings: Map<string, GhostPing[]> = new Map();
    private cleanupInterval: NodeJS.Timeout | null = null;

    settings: PluginSettings = {
        general: {
            logDeletes: true,
            logEdits: true,
            logGhostPings: true,
            persistentStorage: true,
        },
        appearance: {
            showDeletedBadge: true,
            showEditedBadge: true,
            deletedColor: '#f04747',
            editedColor: '#faa61a',
        },
        storage: {
            maxMessages: 100,
            storageDays: 7,
        },
        filters: {
            ignoreOwnMessages: false,
            ignoreBots: false,
            ignoredUsers: '',
            ignoredChannels: '',
        },
    };

    constructor(
        logger: Logger,
        patcher: Patcher,
        discordModules: DiscordModules,
        settingsModule: Settings,
        utilities: Utilities
    ) {
        this.logger = logger;
        this.patcher = patcher;
        this.discordModules = discordModules;
        this.settingsModule = settingsModule;
        this.utilities = utilities;
    }

    getName(): string {
        return config.info.name;
    }

    getAuthor(): string {
        return config.info.authors.map((a) => a.name).join(', ');
    }

    getDescription(): string {
        return config.info.description;
    }

    getVersion(): string {
        return config.info.version;
    }

    load(): void {
        // Load saved settings
        const savedSettings = this.utilities.loadSettings(
            this.getName(),
            this.settings
        ) as PluginSettings;
        this.settings = { ...this.settings, ...savedSettings };
    }

    start(): void {
        this.logger.log('Starting MessageLogger...');
        this.loadStoredData();
        this.patchMessageHandlers();
        this.addStyles();
        this.startCacheCleanup();
    }

    stop(): void {
        this.logger.log('Stopping MessageLogger...');
        this.patcher.unpatchAll();
        this.removeStyles();
        this.stopCacheCleanup();
        if (this.settings.general.persistentStorage) {
            this.saveStoredData();
        }
    }

    getSettingsPanel(): HTMLElement {
        return this.settingsModule.SettingPanel.build(
            this.saveSettings.bind(this),
            ...this.buildSettings()
        );
    }

    private buildSettings(): any[] {
        const settings: any[] = [];

        for (const category of config.defaultConfig) {
            const options = category.settings
                .map((setting) => {
                    switch (setting.type) {
                        case 'switch':
                            return new this.settingsModule.Switch(
                                setting.name,
                                setting.note,
                                this.settings[category.id as keyof PluginSettings][
                                    setting.id as never
                                ] as boolean,
                                (value: boolean) => {
                                    (this.settings[category.id as keyof PluginSettings] as never)[
                                        setting.id as never
                                    ] = value as never;
                                }
                            );
                        case 'slider':
                            return new this.settingsModule.Slider(
                                setting.name,
                                setting.note,
                                setting.min,
                                setting.max,
                                this.settings[category.id as keyof PluginSettings][
                                    setting.id as never
                                ] as number,
                                (value: number) => {
                                    (this.settings[category.id as keyof PluginSettings] as never)[
                                        setting.id as never
                                    ] = value as never;
                                },
                                {
                                    markers: setting.markers,
                                    stickToMarkers: setting.stickToMarkers,
                                }
                            );
                        case 'textbox':
                            return new this.settingsModule.Textbox(
                                setting.name,
                                setting.note,
                                this.settings[category.id as keyof PluginSettings][
                                    setting.id as never
                                ] as string,
                                (value: string) => {
                                    (this.settings[category.id as keyof PluginSettings] as never)[
                                        setting.id as never
                                    ] = value as never;
                                }
                            );
                        case 'color':
                            return new this.settingsModule.ColorPicker(
                                setting.name,
                                setting.note,
                                this.settings[category.id as keyof PluginSettings][
                                    setting.id as never
                                ] as string,
                                (value: string) => {
                                    (this.settings[category.id as keyof PluginSettings] as never)[
                                        setting.id as never
                                    ] = value as never;
                                }
                            );
                        default:
                            return null;
                    }
                })
                .filter((s): s is NonNullable<typeof s> => s !== null);

            settings.push(
                new this.settingsModule.SettingGroup(category.name, {
                    collapsible: category.collapsible,
                    shown: category.shown,
                }).append(...options)
            );
        }

        return settings;
    }

    private saveSettings(): void {
        this.utilities.saveSettings(this.getName(), this.settings);
    }

    private loadStoredData(): void {
        try {
            const data = BdApi.Data.load(this.getName(), 'messageCache') as CacheData | null;
            if (data) {
                this.deletedMessages = new Map(data.deleted || []);
                this.editHistory = new Map(data.edits || []);
                this.ghostPings = new Map(data.ghostPings || []);
                this.logger.log('Loaded stored message data');
            }
        } catch (error) {
            this.logger.error('Failed to load stored data:', error);
        }
    }

    private saveStoredData(): void {
        try {
            const data: CacheData = {
                deleted: Array.from(this.deletedMessages.entries()),
                edits: Array.from(this.editHistory.entries()),
                ghostPings: Array.from(this.ghostPings.entries()),
            };
            BdApi.Data.save(this.getName(), 'messageCache', data);
            this.logger.log('Saved message data');
        } catch (error) {
            this.logger.error('Failed to save data:', error);
        }
    }

    private patchMessageHandlers(): void {
        // Listen for message deletions
        this.discordModules.Dispatcher.subscribe(
            'MESSAGE_DELETE',
            this.handleMessageDelete.bind(this)
        );

        // Listen for message updates (edits)
        this.discordModules.Dispatcher.subscribe(
            'MESSAGE_UPDATE',
            this.handleMessageUpdate.bind(this)
        );

        // Listen for bulk message deletions
        this.discordModules.Dispatcher.subscribe(
            'MESSAGE_DELETE_BULK',
            this.handleBulkDelete.bind(this)
        );
    }

    private handleMessageDelete(event: unknown): void {
        if (!this.settings.general.logDeletes) return;

        const { channelId, id } = event as MessageDeleteEvent;
        const message = this.discordModules.MessageStore.getMessage(channelId, id);

        if (!message || this.shouldIgnoreMessage(message)) return;

        // Check for ghost ping
        if (this.settings.general.logGhostPings && this.hasUserMentions(message)) {
            this.logGhostPing(message);
        }

        this.logDeletedMessage(message);
        this.logger.log(`Logged deleted message: ${id}`);
    }

    private handleMessageUpdate(event: unknown): void {
        if (!this.settings.general.logEdits) return;

        const { message } = event as MessageUpdateEvent;
        if (!message || this.shouldIgnoreMessage(message)) return;

        const cachedMessage = this.discordModules.MessageStore.getMessage(
            message.channel_id,
            message.id
        );
        if (cachedMessage && cachedMessage.content !== message.content) {
            this.logEditedMessage(cachedMessage, message);
            this.logger.log(`Logged edited message: ${message.id}`);
        }
    }

    private handleBulkDelete(event: unknown): void {
        if (!this.settings.general.logDeletes) return;

        const { channelId, ids } = event as MessageDeleteBulkEvent;
        ids.forEach((id) => {
            const message = this.discordModules.MessageStore.getMessage(channelId, id);
            if (message && !this.shouldIgnoreMessage(message)) {
                this.logDeletedMessage(message);
            }
        });
        this.logger.log(`Logged ${ids.length} bulk deleted messages`);
    }

    private shouldIgnoreMessage(message: DiscordMessage): boolean {
        const { filters } = this.settings;

        // Check if own messages should be ignored
        if (
            filters.ignoreOwnMessages &&
            message.author.id === this.discordModules.UserStore.getCurrentUser().id
        ) {
            return true;
        }

        // Check if bot messages should be ignored
        if (filters.ignoreBots && message.author.bot) {
            return true;
        }

        // Check ignored user list
        const ignoredUsers = filters.ignoredUsers
            .split(',')
            .map((id) => id.trim())
            .filter(Boolean);
        if (ignoredUsers.includes(message.author.id)) {
            return true;
        }

        // Check ignored channel list
        const ignoredChannels = filters.ignoredChannels
            .split(',')
            .map((id) => id.trim())
            .filter(Boolean);
        if (ignoredChannels.includes(message.channel_id)) {
            return true;
        }

        return false;
    }

    private hasUserMentions(message: DiscordMessage): boolean {
        const currentUserId = this.discordModules.UserStore.getCurrentUser().id;
        return message.mentions?.some((user) => user.id === currentUserId) ?? false;
    }

    private logDeletedMessage(message: DiscordMessage): void {
        const channelKey = message.channel_id;

        if (!this.deletedMessages.has(channelKey)) {
            this.deletedMessages.set(channelKey, []);
        }

        const channelMessages = this.deletedMessages.get(channelKey)!;
        channelMessages.push({
            ...message,
            deletedAt: Date.now(),
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

    private logEditedMessage(oldMessage: DiscordMessage, newMessage: DiscordMessage): void {
        const messageKey = newMessage.id;

        if (!this.editHistory.has(messageKey)) {
            this.editHistory.set(messageKey, []);
        }

        const history = this.editHistory.get(messageKey)!;
        history.push({
            content: oldMessage.content,
            editedAt: Date.now(),
        });

        // Keep only last 10 edits per message
        if (history.length > 10) {
            history.shift();
        }

        if (this.settings.general.persistentStorage) {
            this.saveStoredData();
        }
    }

    private logGhostPing(message: DiscordMessage): void {
        const channelKey = message.channel_id;

        if (!this.ghostPings.has(channelKey)) {
            this.ghostPings.set(channelKey, []);
        }

        const channelPings = this.ghostPings.get(channelKey)!;
        channelPings.push({
            ...message,
            ghostPingedAt: Date.now(),
        });

        // Limit ghost pings stored
        if (channelPings.length > 50) {
            channelPings.shift();
        }

        BdApi.showToast(`Ghost ping detected from ${message.author.username}`, {
            type: 'warning',
        });

        if (this.settings.general.persistentStorage) {
            this.saveStoredData();
        }
    }

    private startCacheCleanup(): void {
        // Clean old messages every hour
        this.cleanupInterval = setInterval(
            () => {
                this.cleanOldMessages();
            },
            60 * 60 * 1000
        );
    }

    private stopCacheCleanup(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
    }

    private cleanOldMessages(): void {
        const maxAge = this.settings.storage.storageDays * 24 * 60 * 60 * 1000;
        const now = Date.now();

        // Clean deleted messages
        for (const [channel, messages] of this.deletedMessages.entries()) {
            const filtered = messages.filter((msg) => now - msg.deletedAt < maxAge);
            if (filtered.length === 0) {
                this.deletedMessages.delete(channel);
            } else {
                this.deletedMessages.set(channel, filtered);
            }
        }

        // Clean ghost pings
        for (const [channel, pings] of this.ghostPings.entries()) {
            const filtered = pings.filter((ping) => now - ping.ghostPingedAt < maxAge);
            if (filtered.length === 0) {
                this.ghostPings.delete(channel);
            } else {
                this.ghostPings.set(channel, filtered);
            }
        }

        this.logger.log('Cleaned old messages from cache');
    }

    private addStyles(): void {
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

    private removeStyles(): void {
        BdApi.clearCSS(this.getName());
    }
}
