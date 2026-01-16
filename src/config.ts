/**
 * Plugin configuration
 */

import { PluginConfig } from './types/betterdiscord';

export const config: PluginConfig = {
    info: {
        name: 'MessageLogger',
        authors: [
            {
                name: 'Mai0313',
                discord_id: 'YOUR_DISCORD_ID',
                github_username: 'Mai0313',
            },
        ],
        version: '1.0.0',
        description: 'Track deleted messages, edits, and ghost pings with persistent storage',
        github: 'https://github.com/Mai0313/MessageLogger',
        github_raw:
            'https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js',
    },
    changelog: [
        {
            title: 'Initial Release',
            type: 'added',
            items: [
                'Deleted message tracking',
                'Edit history logging',
                'Ghost ping detection',
                'Persistent storage system',
                'Configurable settings panel',
            ],
        },
    ],
    defaultConfig: [
        {
            type: 'category',
            id: 'general',
            name: 'General Settings',
            collapsible: true,
            shown: true,
            settings: [
                {
                    type: 'switch',
                    id: 'logDeletes',
                    name: 'Log Deleted Messages',
                    note: 'Track and display deleted messages',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'logEdits',
                    name: 'Log Message Edits',
                    note: 'Track message edit history',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'logGhostPings',
                    name: 'Log Ghost Pings',
                    note: 'Track deleted mentions',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'persistentStorage',
                    name: 'Persistent Storage',
                    note: 'Save logged messages across sessions',
                    value: true,
                },
            ],
        },
        {
            type: 'category',
            id: 'appearance',
            name: 'Appearance',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'showDeletedBadge',
                    name: 'Show Deleted Badge',
                    note: 'Display a badge on deleted messages',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'showEditedBadge',
                    name: 'Show Edited Badge',
                    note: 'Display a badge on edited messages',
                    value: true,
                },
                {
                    type: 'color',
                    id: 'deletedColor',
                    name: 'Deleted Message Color',
                    note: 'Color for deleted message indicators',
                    value: '#f04747',
                },
                {
                    type: 'color',
                    id: 'editedColor',
                    name: 'Edited Message Color',
                    note: 'Color for edited message indicators',
                    value: '#faa61a',
                },
            ],
        },
        {
            type: 'category',
            id: 'storage',
            name: 'Storage Settings',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'slider',
                    id: 'maxMessages',
                    name: 'Maximum Stored Messages',
                    note: 'Maximum number of messages to store per channel',
                    value: 100,
                    min: 10,
                    max: 1000,
                    markers: [10, 50, 100, 250, 500, 1000],
                    stickToMarkers: false,
                },
                {
                    type: 'slider',
                    id: 'storageDays',
                    name: 'Storage Duration (Days)',
                    note: 'How long to keep logged messages',
                    value: 7,
                    min: 1,
                    max: 30,
                    markers: [1, 7, 14, 30],
                    stickToMarkers: true,
                },
            ],
        },
        {
            type: 'category',
            id: 'filters',
            name: 'Filters',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'ignoreOwnMessages',
                    name: 'Ignore Own Messages',
                    note: "Don't log your own deleted/edited messages",
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'ignoreBots',
                    name: 'Ignore Bot Messages',
                    note: "Don't log bot messages",
                    value: false,
                },
                {
                    type: 'textbox',
                    id: 'ignoredUsers',
                    name: 'Ignored User IDs',
                    note: 'Comma-separated list of user IDs to ignore',
                    value: '',
                },
                {
                    type: 'textbox',
                    id: 'ignoredChannels',
                    name: 'Ignored Channel IDs',
                    note: 'Comma-separated list of channel IDs to ignore',
                    value: '',
                },
            ],
        },
    ],
};
