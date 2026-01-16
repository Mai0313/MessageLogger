/**
 * Bundle script to create the final BetterDiscord plugin file
 */

const fs = require('fs');
const path = require('path');

const COMPILED_DIR = path.join(__dirname, '../dist/compiled');
const OUTPUT_DIR = path.join(__dirname, '../dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'MessageLogger.plugin.js');

// Plugin metadata template
const PLUGIN_HEADER = `/**
 * @name MessageLogger
 * @description A powerful Discord message logger that tracks deleted messages, edits, and ghost pings with persistent storage.
 * @author Mai0313
 * @version 1.0.0
 * @website https://github.com/Mai0313/MessageLogger
 * @source https://github.com/Mai0313/MessageLogger/blob/main/MessageLogger.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Mai0313/MessageLogger/main/MessageLogger.plugin.js
 */

`;

function bundle() {
    console.log('🔨 Bundling plugin...');

    // Read compiled files
    const indexPath = path.join(COMPILED_DIR, 'index.js');
    const configPath = path.join(COMPILED_DIR, 'config.js');
    const pluginPath = path.join(COMPILED_DIR, 'plugin.js');

    if (!fs.existsSync(indexPath)) {
        console.error('❌ Error: Compiled files not found. Run `npm run compile` first.');
        process.exit(1);
    }

    let indexContent = fs.readFileSync(indexPath, 'utf8');
    let configContent = fs.readFileSync(configPath, 'utf8');
    let pluginContent = fs.readFileSync(pluginPath, 'utf8');

    // Remove exports and imports
    configContent = configContent
        .replace(/^export\s+/gm, '')
        .replace(/^import\s+.*from\s+['"].*['"];?\s*$/gm, '');

    pluginContent = pluginContent
        .replace(/^export\s+/gm, '')
        .replace(/^import\s+.*from\s+['"].*['"];?\s*$/gm, '');

    indexContent = indexContent
        .replace(/^import\s+.*from\s+['"].*['"];?\s*$/gm, '')
        .replace(/^export\s+/gm, '');

    // Create bundled content
    const bundledContent =
        PLUGIN_HEADER +
        '\n' +
        '// Config\n' +
        configContent +
        '\n\n' +
        '// Plugin Implementation\n' +
        pluginContent +
        '\n\n' +
        '// Main Export\n' +
        indexContent;

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write bundled file
    fs.writeFileSync(OUTPUT_FILE, bundledContent);

    console.log('✅ Plugin bundled successfully!');
    console.log(`📦 Output: ${OUTPUT_FILE}`);
}

try {
    bundle();
} catch (error) {
    console.error('❌ Bundling failed:', error);
    process.exit(1);
}
