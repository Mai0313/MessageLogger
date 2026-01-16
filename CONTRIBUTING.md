# Contributing to MessageLogger

Thank you for your interest in contributing to MessageLogger! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Common Development Tasks](#common-development-tasks)
- [Testing](#testing)
- [Building for Release](#building-for-release)

## 📜 Code of Conduct

- Be respectful and inclusive to all contributors
- Welcome newcomers and help them learn
- Provide constructive feedback
- Focus on the code, not the person
- Respect privacy and security considerations

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include:

**Required Information:**
- **Clear Title**: Brief description of the issue
- **Description**: Detailed explanation of the problem
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**:
  - Discord version
  - BetterDiscord version
  - Plugin version
  - Operating system
  - Other relevant plugins installed

**Optional but Helpful:**
- Screenshots or GIFs
- Console logs (open with `Ctrl+Shift+I`)
- Any error messages

### Suggesting Enhancements

Enhancement suggestions are always welcome! Please include:

- **Use Case**: Why this feature would be useful
- **Description**: Clear explanation of the proposed feature
- **Examples**: How it would work in practice
- **Alternatives**: Other solutions you've considered

### Pull Requests

We love pull requests! Here's the process:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠️ Development Setup

This project uses **TypeScript** for development, which provides type safety and better development experience.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **BetterDiscord** installed
- **Code editor** (VS Code recommended)
- **Git** for version control

### Initial Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Mai0313/MessageLogger.git
cd MessageLogger
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the plugin:**
```bash
npm run build
```

This will:
- Format code with Prettier
- Check code with ESLint
- Compile TypeScript to JavaScript
- Bundle into a single `.plugin.js` file
- Output to `dist/MessageLogger.plugin.js`

## 💻 Development Workflow

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Full build (format + lint + clean + compile + bundle) |
| `npm run dev` | Development mode (auto-watch and rebuild) |
| `npm run compile` | Compile TypeScript only |
| `npm run watch` | Watch TypeScript files for changes |
| `npm run bundle` | Bundle compiled files into plugin |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Clean build output |

### Development Mode

For active development, use watch mode:

```bash
npm run dev
```

This will automatically rebuild when you save TypeScript files.

### Installing the Plugin for Testing

**Option A: Manual Copy**
```bash
# Linux
cp dist/MessageLogger.plugin.js ~/.config/BetterDiscord/plugins/

# Windows
copy dist\MessageLogger.plugin.js %AppData%\BetterDiscord\plugins\

# macOS
cp dist/MessageLogger.plugin.js ~/Library/Application\ Support/BetterDiscord/plugins/
```

**Option B: Symbolic Link (Recommended)**
```bash
# Linux
ln -s "$(pwd)/dist/MessageLogger.plugin.js" ~/.config/BetterDiscord/plugins/

# Windows (as Administrator)
mklink "%AppData%\BetterDiscord\plugins\MessageLogger.plugin.js" "%CD%\dist\MessageLogger.plugin.js"

# macOS
ln -s "$(pwd)/dist/MessageLogger.plugin.js" ~/Library/Application\ Support/BetterDiscord/plugins/
```

With a symbolic link, the plugin automatically updates when you rebuild!

### Reload Discord

After building or updating, press `Ctrl+R` (Windows/Linux) or `Cmd+R` (macOS) to reload Discord.

## 🏗️ Project Structure

```
MessageLogger/
├── src/                              # TypeScript source code
│   ├── types/                        # Type definitions
│   │   ├── betterdiscord.d.ts       # BetterDiscord API types
│   │   └── plugin.d.ts              # Plugin-specific types
│   ├── config.ts                     # Plugin configuration
│   ├── plugin.ts                     # Main plugin implementation
│   └── index.ts                      # Entry point
├── scripts/                          # Build scripts
│   └── bundle.js                     # Bundling script
├── dist/                             # Build output (generated, not committed)
│   ├── compiled/                     # TypeScript compiled output
│   └── MessageLogger.plugin.js      # Final bundled plugin
├── package.json                      # NPM configuration
├── tsconfig.json                     # TypeScript configuration
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc.json                 # Prettier configuration
└── CONTRIBUTING.md                   # This file
```

### Key Files Explained

**`src/types/betterdiscord.d.ts`**
- Type definitions for BetterDiscord API
- ZeresPluginLibrary interfaces
- Discord data structures (messages, users, channels)

**`src/types/plugin.d.ts`**
- Plugin-specific type definitions
- Settings interfaces
- Message cache structures
- Event payloads

**`src/config.ts`**
- Plugin metadata (name, version, author)
- Changelog entries
- Default settings structure

**`src/plugin.ts`**
- Main plugin implementation (~400 lines)
- Message logging logic
- Event handlers
- Settings management
- Storage operations

**`src/index.ts`**
- Entry point for BetterDiscord
- Library dependency checking
- Plugin initialization

## 📝 Pull Request Process

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Check console for errors (`Ctrl+Shift+I`)
- [ ] Run `npm run lint` and fix any issues
- [ ] Run `npm run build` successfully
- [ ] Update documentation if needed
- [ ] Add entry to CHANGELOG.md
- [ ] Follow coding standards

### PR Checklist

Your PR should include:

- [ ] **Clear Title**: Descriptive title of changes
- [ ] **Description**: What changes were made and why
- [ ] **Testing**: How you tested the changes
- [ ] **Screenshots**: If UI changes were made
- [ ] **Breaking Changes**: Note any breaking changes
- [ ] **Related Issues**: Link to related issues

### After Submitting

- Respond to review comments promptly
- Make requested changes
- Keep the PR focused and clean
- Be patient during the review process

## 💻 Coding Standards

### TypeScript Style Guide

**General Rules:**
- Use TypeScript strict mode
- Add types for all parameters and return values
- Use 4 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_CASE for constants
- Add semicolons at the end of statements

**Example:**
```typescript
// Good
const MAX_MESSAGES = 1000;

interface MessageCache {
    messages: DeletedMessage[];
    timestamp: number;
}

class MessageLogger extends Plugin {
    private messageCache: Map<string, MessageCache>;
    
    logMessage(message: DiscordMessage): void {
        // Implementation
    }
}

// Bad
const max_messages = 1000;
interface message_cache {
    messages: any;
}
class messagelogger {
    cache;
}
```

### Comments

**All code comments must be in English:**

```typescript
// Good: Check if message should be ignored
if (this.shouldIgnore(message)) {
    return;
}

// Bad: 檢查是否應該忽略訊息
if (this.shouldIgnore(message)) {
    return;
}
```

**Comment Guidelines:**
- Write clear, concise comments
- Explain WHY, not WHAT (code should be self-explanatory)
- Update comments when code changes
- Use JSDoc for functions and classes

**JSDoc Example:**
```typescript
/**
 * Log a deleted message to cache
 * @param message - The Discord message object
 * @returns void
 */
logDeletedMessage(message: DiscordMessage): void {
    // Implementation
}
```

### Commit Messages

Follow the conventional commits format:

**Format:**
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks
- `build`: Build system changes

**Examples:**
```bash
feat(logging): add support for thread messages
fix(storage): resolve memory leak in cache cleanup
docs(readme): update installation instructions
refactor(ui): improve badge rendering performance
build(deps): update TypeScript to 5.3.3
```

### Error Handling

Always handle errors gracefully:

```typescript
// Good
try {
    const data = JSON.parse(rawData);
    this.processData(data);
} catch (error) {
    this.logger.error('Failed to parse data:', error);
    BdApi.showToast('Failed to load data', { type: 'error' });
}

// Bad
const data = JSON.parse(rawData);  // Can crash the plugin
this.processData(data);
```

### Performance Considerations

- Avoid unnecessary loops and operations
- Use Maps instead of Objects for large datasets
- Clean up listeners and intervals in `stop()`
- Implement throttling/debouncing for frequent operations
- Use efficient data structures

## 🔨 Common Development Tasks

### Adding a New Setting

1. **Add to config** (`src/config.ts`):
```typescript
{
    type: 'switch',
    id: 'myNewSetting',
    name: 'My New Setting',
    note: 'Description of what it does',
    value: false,
}
```

2. **Add to settings interface** (`src/types/plugin.d.ts`):
```typescript
export interface GeneralSettings {
    // ... existing settings
    myNewSetting: boolean;
}
```

3. **Use in plugin** (`src/plugin.ts`):
```typescript
if (this.settings.general.myNewSetting) {
    // Your logic here
}
```

### Adding a New Event Handler

1. **Define event type** (`src/types/plugin.d.ts`):
```typescript
export interface MyNewEvent {
    someProperty: string;
    anotherProperty: number;
}
```

2. **Subscribe to event** (`src/plugin.ts`):
```typescript
private patchMessageHandlers(): void {
    // ... existing handlers
    this.discordModules.Dispatcher.subscribe(
        'MY_EVENT',
        this.handleMyEvent.bind(this)
    );
}

private handleMyEvent(event: unknown): void {
    const typedEvent = event as MyNewEvent;
    // Handle event
}
```

### Modifying Styles

Edit the `addStyles()` method in `src/plugin.ts`:

```typescript
private addStyles(): void {
    const css = `
        .my-custom-class {
            color: ${this.settings.appearance.deletedColor};
            // ... more styles
        }
    `;
    BdApi.injectCSS(this.getName(), css);
}
```

## 🧪 Testing

### Manual Testing

1. Build the plugin: `npm run build`
2. Install to BetterDiscord plugins folder
3. Reload Discord (`Ctrl+R` or `Cmd+R`)
4. Enable the plugin in settings
5. Test features:
   - Delete a message
   - Edit a message
   - Test ghost pings
   - Check settings panel
   - Verify persistence across reloads

### Discord DevTools

Open with `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac):
- Check Console for errors and logs
- Monitor Network requests
- Inspect DOM elements
- Check performance

### Common Issues

**TypeScript errors:**
- Run `npm run lint` to see all errors
- Check type definitions match usage
- Ensure all imports are correct

**Build errors:**
- Ensure all dependencies installed: `npm install`
- Clear dist: `npm run clean && npm run build`
- Check for syntax errors

**Plugin not loading:**
- Check BetterDiscord console for errors
- Verify ZeresPluginLibrary is installed
- Check plugin file is in correct location
- Verify file permissions

## 📦 Building for Release

1. **Update version** in:
   - `package.json`
   - `src/config.ts`
   - `CHANGELOG.md`

2. **Build:**
```bash
npm run build
```

3. **Test thoroughly** (see Testing section)

4. **Commit and tag:**
```bash
git add .
git commit -m "chore: release v1.x.x"
git tag v1.x.x
git push origin main --tags
```

5. **Create GitHub Release:**
   - Go to GitHub repository
   - Create new release from tag
   - Attach `dist/MessageLogger.plugin.js`
   - Include changelog from CHANGELOG.md

## 💡 Development Tips

1. **Use VS Code Extensions:**
   - ESLint - Real-time linting
   - Prettier - Code formatting
   - TypeScript - Enhanced IntelliSense

2. **Enable "Format On Save"** in VS Code settings

3. **Use TypeScript's type checking:**
   - Hover over variables to see types
   - Use autocomplete extensively
   - Let the compiler catch errors early

4. **Keep functions small and focused:**
   - Each function should do one thing well
   - Extract complex logic into separate functions
   - Use meaningful names

5. **Test incrementally:**
   - Don't wait until everything is done
   - Test each feature as you build it
   - Use `npm run dev` for quick iteration

## 📚 Resources

- [BetterDiscord Documentation](https://docs.betterdiscord.app/)
- [ZeresPluginLibrary](https://github.com/rauenzi/BDPluginLibrary)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Discord.js Documentation](https://discord.js.org/) (for Discord API reference)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📞 Getting Help

- **Issues**: Open an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Pull Requests**: Ask questions in PR comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MessageLogger! 🎉 Your efforts help make this plugin better for everyone.
