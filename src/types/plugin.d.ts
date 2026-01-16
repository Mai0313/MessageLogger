/**
 * Plugin-specific type definitions
 */

import { DiscordMessage } from './betterdiscord';

export interface PluginSettings {
    general: GeneralSettings;
    appearance: AppearanceSettings;
    storage: StorageSettings;
    filters: FilterSettings;
}

export interface GeneralSettings {
    logDeletes: boolean;
    logEdits: boolean;
    logGhostPings: boolean;
    persistentStorage: boolean;
}

export interface AppearanceSettings {
    showDeletedBadge: boolean;
    showEditedBadge: boolean;
    deletedColor: string;
    editedColor: string;
}

export interface StorageSettings {
    maxMessages: number;
    storageDays: number;
}

export interface FilterSettings {
    ignoreOwnMessages: boolean;
    ignoreBots: boolean;
    ignoredUsers: string;
    ignoredChannels: string;
}

export interface DeletedMessage extends DiscordMessage {
    deletedAt: number;
}

export interface EditedMessageHistory {
    content: string;
    editedAt: number;
}

export interface GhostPing extends DiscordMessage {
    ghostPingedAt: number;
}

export interface MessageDeleteEvent {
    channelId: string;
    id: string;
}

export interface MessageUpdateEvent {
    message: DiscordMessage;
}

export interface MessageDeleteBulkEvent {
    channelId: string;
    ids: string[];
}

export interface CacheData {
    deleted: [string, DeletedMessage[]][];
    edits: [string, EditedMessageHistory[]][];
    ghostPings: [string, GhostPing[]][];
}
