/**
 * MessageLogger - Main Plugin Entry Point
 * @author Mai0313
 * @version 1.0.0
 */

import { config } from './config';
import { MessageLoggerPlugin } from './plugin';
import { BdApiInstance, ZeresPluginLibraryInstance, PluginInstance } from './types/betterdiscord';

declare const BdApi: BdApiInstance;
declare const ZeresPluginLibrary: ZeresPluginLibraryInstance;

/**
 * Main module export for BetterDiscord
 */
module.exports = (() => {
    // Check if ZeresPluginLibrary is available
    if (!(global as any).ZeresPluginLibrary) {
        return class MissingLibrary {
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
                BdApi.showConfirmationModal(
                    'Library Missing',
                    `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
                    {
                        confirmText: 'Download Now',
                        cancelText: 'Cancel',
                        onConfirm: () => {
                            require('request').get(
                                'https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js',
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                async (error: Error | null, _response: unknown, body: string) => {
                                    if (error) {
                                        require('electron').shell.openExternal(
                                            'https://betterdiscord.app/Download?id=9'
                                        );
                                        return;
                                    }
                                    await new Promise<void>((resolve) =>
                                        require('fs').writeFile(
                                            require('path').join(
                                                BdApi.Plugins.folder,
                                                '0PluginLibrary.plugin.js'
                                            ),
                                            body,
                                            () => resolve()
                                        )
                                    );
                                }
                            );
                        },
                    }
                );
            }

            start(): void {
                // Do nothing
            }

            stop(): void {
                // Do nothing
            }
        };
    }

    // Library is available, build the plugin
    return ((): typeof MessageLoggerPlugin => {
        const { Logger, Patcher, DiscordModules, Settings, Utilities } = ZeresPluginLibrary;

        return class MessageLogger extends MessageLoggerPlugin {
            constructor() {
                super(Logger, Patcher, DiscordModules, Settings, Utilities);
            }
        } as typeof MessageLoggerPlugin;
    })() as unknown as typeof MessageLoggerPlugin;
})() as unknown as new () => PluginInstance;
