# Contributing to MessageLogger

Thank you for your interest in contributing to MessageLogger! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

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

### Prerequisites

- [BetterDiscord](https://betterdiscord.app/) installed
- [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9)
- Text editor (VS Code recommended)
- Basic knowledge of JavaScript
- Git for version control

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/Mai0313/MessageLogger.git
cd MessageLogger
```

2. **Create a symbolic link** to your BetterDiscord plugins folder:

**Windows (PowerShell as Administrator):**
```powershell
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\BetterDiscord\plugins\MessageLogger.plugin.js" -Target "$(Get-Location)\MessageLogger.plugin.js"
```

**macOS/Linux:**
```bash
ln -s "$(pwd)/MessageLogger.plugin.js" ~/Library/Application\ Support/BetterDiscord/plugins/MessageLogger.plugin.js
# or for Linux:
ln -s "$(pwd)/MessageLogger.plugin.js" ~/.config/BetterDiscord/plugins/MessageLogger.plugin.js
```

3. **Restart Discord** or press `Ctrl+R` / `Cmd+R`

4. **Enable the plugin** in Discord settings

### Development Workflow

1. Make changes to `MessageLogger.plugin.js`
2. Save the file
3. Reload Discord (`Ctrl+R` / `Cmd+R`)
4. Test your changes
5. Check console for errors (`Ctrl+Shift+I`)

## 📝 Pull Request Process

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Check console for errors
- [ ] Verify no performance degradation
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

### JavaScript Style Guide

**General Rules:**
- Use 4 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_CASE for constants
- Add semicolons at the end of statements

**Example:**
```javascript
// Good
const MAX_MESSAGES = 1000;

class MessageLogger {
    constructor() {
        this.messageCache = new Map();
    }
    
    logMessage(message) {
        // Implementation
    }
}

// Bad
const max_messages = 1000;
class messagelogger {
    constructor() {
        this.message_cache = new Map()
    }
}
```

### Comments

**All code comments must be in English:**

```javascript
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
```javascript
/**
 * Log a deleted message to cache
 * @param {Object} message - The Discord message object
 * @returns {void}
 */
logDeletedMessage(message) {
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

**Examples:**
```bash
feat(logging): add support for thread messages
fix(storage): resolve memory leak in cache cleanup
docs(readme): update installation instructions
refactor(ui): improve badge rendering performance
```

### Code Organization

**File Structure:**
```javascript
// 1. Module exports and config
module.exports = (() => {
    const config = { /* ... */ };
    
    // 2. Check for required libraries
    return !global.ZeresPluginLibrary ? class {
        // Minimal class for missing library
    } : (([Plugin, Api]) => {
        // 3. Main plugin implementation
        const plugin = (Plugin, Library) => {
            // 4. Destructure needed modules
            const { Logger, Patcher, ... } = Library;
            
            // 5. Return plugin class
            return class MessageLogger extends Plugin {
                // Implementation
            };
        };
        
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
```

### Error Handling

Always handle errors gracefully:

```javascript
// Good
try {
    const data = JSON.parse(rawData);
    this.processData(data);
} catch (error) {
    Logger.error("Failed to parse data:", error);
    BdApi.showToast("Failed to load data", { type: "error" });
}

// Bad
const data = JSON.parse(rawData);  // Can crash the plugin
this.processData(data);
```

### Performance Considerations

- Avoid unnecessary loops and operations
- Use Maps instead of Objects for large datasets
- Clean up listeners and intervals in `onStop()`
- Implement throttling/debouncing for frequent operations
- Use efficient data structures

## 🧪 Testing

### Manual Testing

Before submitting:

1. **Basic Functionality:**
   - Enable/disable the plugin
   - Delete messages and verify logging
   - Edit messages and verify history
   - Test ghost ping detection

2. **Settings:**
   - Test all settings toggles
   - Verify color pickers work
   - Test sliders and text inputs
   - Save and reload settings

3. **Edge Cases:**
   - Very long messages
   - Messages with embeds
   - Messages with attachments
   - Bulk deletions
   - Rapid edits

4. **Performance:**
   - Monitor memory usage
   - Check CPU usage
   - Test with many logged messages
   - Verify cleanup works

### Console Testing

Monitor the console for:
- Errors (red messages)
- Warnings (yellow messages)
- Plugin logs (should be informative, not spammy)

## 📚 Resources

- [BetterDiscord Plugin Documentation](https://docs.betterdiscord.app/)
- [ZeresPluginLibrary Docs](https://github.com/rauenzi/BDPluginLibrary)
- [Discord.js Documentation](https://discord.js.org/) (for Discord API reference)

## 💡 Tips for Contributors

1. **Start Small**: Begin with small improvements or fixes
2. **Ask Questions**: Don't hesitate to ask if you're unsure
3. **Read Existing Code**: Understand the codebase first
4. **Test Thoroughly**: Your changes should not break existing functionality
5. **Be Patient**: Reviews may take time, but we appreciate your contribution

## 📞 Getting Help

- **Issues**: Open an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Pull Requests**: Ask questions in PR comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MessageLogger! 🎉 Your efforts help make this plugin better for everyone.
