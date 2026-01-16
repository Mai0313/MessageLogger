# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-16

### Added
- **Initial Release** - Complete rewrite of MessageLogger
- Deleted message tracking and logging
- Full edit history tracking
- Ghost ping detection with notifications
- Persistent storage system across Discord sessions
- Comprehensive settings panel with multiple categories:
  - General settings for logging controls
  - Appearance customization
  - Storage management
  - Advanced filters
- Smart filtering system:
  - Ignore own messages
  - Ignore bot messages
  - Custom user ID ignore list
  - Custom channel ID ignore list
- Automatic cache cleanup based on retention settings
- Modern UI integration with Discord
- Color-coded message indicators
- Customizable badge display
- Multi-language documentation (English, Traditional Chinese, Simplified Chinese)

### Technical Features
- Built on ZeresPluginLibrary for stability
- Efficient message caching system
- Automatic data persistence
- Performance-optimized code
- Clean and maintainable architecture

---

## Future Plans

### [1.1.0] - Planned
- [ ] Click to view edit history modal
- [ ] Export logged messages
- [ ] Search functionality for logged messages
- [ ] Better visualization for ghost pings
- [ ] Message restoration feature

### [1.2.0] - Planned
- [ ] Server/Guild-specific settings
- [ ] Keyword filtering
- [ ] Advanced statistics dashboard
- [ ] Import/Export settings

---

**Note**: This is a complete rewrite and not a continuation of previous MessageLogger versions.
