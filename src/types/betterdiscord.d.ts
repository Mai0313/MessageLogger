/**
 * BetterDiscord and ZeresPluginLibrary Type Definitions
 */

declare global {
    const BdApi: BdApiInstance;
    const ZeresPluginLibrary: ZeresPluginLibraryInstance;

    interface Window {
        BdApi: BdApiInstance;
        ZeresPluginLibrary: ZeresPluginLibraryInstance;
    }
}

export interface BdApiInstance {
    Plugins: {
        folder: string;
        get(name: string): Plugin | undefined;
        enable(name: string): void;
        disable(name: string): void;
    };
    Data: {
        save(pluginName: string, key: string, value: unknown): void;
        load(pluginName: string, key: string): unknown;
        delete(pluginName: string, key: string): void;
    };
    showConfirmationModal(title: string, content: string, options?: ModalOptions): void;
    showToast(content: string, options?: ToastOptions): void;
    injectCSS(id: string, css: string): void;
    clearCSS(id: string): void;
}

export interface ModalOptions {
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface ToastOptions {
    type?: 'info' | 'success' | 'warning' | 'error';
    timeout?: number;
}

export interface Plugin {
    name: string;
    version: string;
    author: string;
    description: string;
}

export interface ZeresPluginLibraryInstance {
    buildPlugin(config: PluginConfig): PluginConstructor;
    Logger: Logger;
    Patcher: Patcher;
    WebpackModules: WebpackModules;
    DiscordModules: DiscordModules;
    Settings: Settings;
    Utilities: Utilities;
    DOMTools: DOMTools;
}

export interface PluginConfig {
    info: PluginInfo;
    changelog: ChangelogEntry[];
    defaultConfig: SettingCategory[];
}

export interface PluginInfo {
    name: string;
    authors: Author[];
    version: string;
    description: string;
    github?: string;
    github_raw?: string;
}

export interface Author {
    name: string;
    discord_id?: string;
    github_username?: string;
}

export interface ChangelogEntry {
    title: string;
    type: 'added' | 'fixed' | 'improved' | 'removed';
    items: string[];
}

export interface SettingCategory {
    type: 'category';
    id: string;
    name: string;
    collapsible: boolean;
    shown: boolean;
    settings: Setting[];
}

export type Setting = SwitchSetting | SliderSetting | TextboxSetting | ColorSetting;

export interface BaseSetting {
    id: string;
    name: string;
    note: string;
    value: unknown;
}

export interface SwitchSetting extends BaseSetting {
    type: 'switch';
    value: boolean;
}

export interface SliderSetting extends BaseSetting {
    type: 'slider';
    value: number;
    min: number;
    max: number;
    markers?: number[];
    stickToMarkers?: boolean;
}

export interface TextboxSetting extends BaseSetting {
    type: 'textbox';
    value: string;
}

export interface ColorSetting extends BaseSetting {
    type: 'color';
    value: string;
}

export interface Logger {
    log(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    stacktrace(name: string, message: string, error: Error): void;
}

export interface Patcher {
    before(caller: string, module: unknown, functionName: string, callback: PatchCallback): void;
    after(caller: string, module: unknown, functionName: string, callback: PatchCallback): void;
    instead(caller: string, module: unknown, functionName: string, callback: PatchCallback): void;
    unpatchAll(caller?: string): void;
}

export type PatchCallback = (
    thisObject: unknown,
    args: unknown[],
    returnValue?: unknown
) => unknown;

export interface WebpackModules {
    getByProps(...props: string[]): unknown;
    getByDisplayName(name: string): unknown;
    getModule(filter: (module: unknown) => boolean): unknown;
}

export interface DiscordModules {
    MessageStore: MessageStore;
    UserStore: UserStore;
    ChannelStore: ChannelStore;
    Dispatcher: Dispatcher;
}

export interface MessageStore {
    getMessage(channelId: string, messageId: string): DiscordMessage | null;
    getMessages(channelId: string): { _array: DiscordMessage[] };
}

export interface UserStore {
    getCurrentUser(): DiscordUser;
    getUser(userId: string): DiscordUser | null;
}

export interface ChannelStore {
    getChannel(channelId: string): DiscordChannel | null;
}

export interface Dispatcher {
    subscribe(event: string, callback: (data: unknown) => void): void;
    unsubscribe(event: string, callback: (data: unknown) => void): void;
    dispatch(event: { type: string; [key: string]: unknown }): void;
}

export interface DiscordMessage {
    id: string;
    channel_id: string;
    author: DiscordUser;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    mentions: DiscordUser[];
    mention_roles: string[];
    attachments: Attachment[];
    embeds: Embed[];
    reactions?: Reaction[];
    pinned: boolean;
    type: number;
}

export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
}

export interface DiscordChannel {
    id: string;
    type: number;
    guild_id?: string;
    name?: string;
    topic?: string | null;
}

export interface Attachment {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height: number | null;
    width: number | null;
}

export interface Embed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
}

export interface Reaction {
    emoji: {
        id: string | null;
        name: string;
    };
    count: number;
    me: boolean;
}

export interface Settings {
    SettingPanel: {
        build(saveCallback: () => void, ...groups: SettingGroup[]): HTMLElement;
    };
    SettingGroup: new (name: string, options?: GroupOptions) => SettingGroup;
    Switch: new (
        name: string,
        note: string,
        value: boolean,
        onChange: (value: boolean) => void
    ) => SettingElement;
    Slider: new (
        name: string,
        note: string,
        min: number,
        max: number,
        value: number,
        onChange: (value: number) => void,
        options?: SliderOptions
    ) => SettingElement;
    Textbox: new (
        name: string,
        note: string,
        value: string,
        onChange: (value: string) => void
    ) => SettingElement;
    ColorPicker: new (
        name: string,
        note: string,
        value: string,
        onChange: (value: string) => void
    ) => SettingElement;
}

export interface GroupOptions {
    collapsible?: boolean;
    shown?: boolean;
}

export interface SliderOptions {
    markers?: number[];
    stickToMarkers?: boolean;
}

export interface SettingGroup {
    append(...elements: SettingElement[]): SettingGroup;
}

export interface SettingElement {
    getElement(): HTMLElement;
}

export interface Utilities {
    saveSettings(pluginName: string, settings: unknown): void;
    loadSettings(pluginName: string, defaultSettings: unknown): unknown;
}

export interface DOMTools {
    addStyle(id: string, css: string): void;
    removeStyle(id: string): void;
}

export type PluginConstructor = new () => PluginInstance;

export interface PluginInstance {
    getName(): string;
    getAuthor(): string;
    getDescription(): string;
    getVersion(): string;
    load(): void;
    start(): void;
    stop(): void;
    getSettingsPanel?(): HTMLElement;
}

export {};
