#!/usr/bin/env node
/**
 * ============================================================================
 * CLI.JS - Command-line utilities for Landing Builder
 * ============================================================================
 *
 * Commands:
 * - create <name> [--template quiz-funnel] - Create new landing
 * - build <name> [--watch] - Build landing with optional watch mode
 * - validate <name> - Validate config and images
 * - list - List all landings
 */

const fs = require('fs-extra');
const path = require('path');
const LandingBuilder = require('./builder');

const rootDir = path.join(__dirname, '..');

// ============================================================================
// TEMPLATES
// ============================================================================

const TEMPLATES = {
  'quiz-funnel': {
    name: 'Quiz Funnel (7 pages)',
    description: 'Quiz flow: index → quiz-1..4 → quiz-form → thank-you',
    pages: [
      'index.html',
      'quiz-1.html',
      'quiz-2.html',
      'quiz-3.html',
      'quiz-4.html',
      'quiz-form.html',
      'thank-you.html'
    ],
    config: {
      name: '',
      theme: 'default',
      lang: 'de',
      meta: {
        title: '',
        description: '',
        keywords: ''
      },
      scripts: ['quiz.js'],
      pages: [
        {
          filename: 'index.html',
          title: '',
          sections: [
            { type: 'hero', content: {} },
            { type: 'promotional', content: {} },
            { type: 'benefits', content: { items: [] } },
            { type: 'gallery', content: { images: [] } },
            { type: 'process', content: { steps: [] } },
            { type: 'faq', content: { items: [] } },
            { type: 'services', content: { items: [] } },
            { type: 'about', content: {} },
            { type: 'footer', content: {} },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'quiz-1.html',
          sections: [
            { type: 'quiz-header', content: { progress: 'Weiter zum Gutschein' } },
            { type: 'quiz-question', content: { questionId: 'q1', options: [] } },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'quiz-2.html',
          sections: [
            { type: 'quiz-header', content: { progress: 'Noch 3 Fragen bis zum Gutschein' } },
            { type: 'quiz-question', content: { questionId: 'q2', options: [] } },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'quiz-3.html',
          sections: [
            { type: 'quiz-header', content: { progress: 'Noch 2 Fragen bis zum Gutschein' } },
            { type: 'quiz-question', content: { questionId: 'q3', options: [] } },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'quiz-4.html',
          sections: [
            { type: 'quiz-header', content: { progress: 'Noch 1 Frage bis zum Gutschein' } },
            { type: 'quiz-question', content: { questionId: 'q4', options: [] } },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'quiz-form.html',
          sections: [
            { type: 'quiz-header', content: { progress: 'Klasse, jetzt zum Gutschein' } },
            { type: 'quiz-form', content: {} },
            { type: 'footer', content: {} },
            { type: 'legal-footer', content: { links: [] } }
          ]
        },
        {
          filename: 'thank-you.html',
          sections: [
            { type: 'quiz-header', content: {} },
            { type: 'thank-you-hero', content: {} },
            { type: 'author-footer', content: {} },
            { type: 'footer', content: {} },
            { type: 'legal-footer', content: { links: [] } }
          ]
        }
      ]
    }
  },
  'single-page': {
    name: 'Single Page Landing',
    description: 'Simple one-page landing',
    pages: ['index.html'],
    config: {
      name: '',
      theme: 'default',
      lang: 'de',
      meta: {
        title: '',
        description: '',
        keywords: ''
      },
      sections: [
        { type: 'hero', content: {} },
        { type: 'about', content: {} },
        { type: 'footer', content: {} },
        { type: 'legal-footer', content: { links: [] } }
      ]
    }
  }
};

// ============================================================================
// COMMANDS
// ============================================================================

/**
 * Create a new landing from template
 */
async function createLanding(name, templateName = 'quiz-funnel') {
  console.log(`\n📦 Creating landing: ${name}\n`);

  // Validate name
  if (!name || !/^[a-zA-Z0-9\-_]+$/.test(name)) {
    console.error('❌ Invalid landing name. Use only letters, numbers, hyphens, and underscores.');
    process.exit(1);
  }

  // Check template
  const template = TEMPLATES[templateName];
  if (!template) {
    console.error(`❌ Unknown template: ${templateName}`);
    console.error(`   Available templates: ${Object.keys(TEMPLATES).join(', ')}`);
    process.exit(1);
  }

  // Check if exists
  const landingDir = path.join(rootDir, 'landings', name);
  if (fs.existsSync(landingDir)) {
    console.error(`❌ Landing "${name}" already exists at ${landingDir}`);
    process.exit(1);
  }

  // Create directory
  await fs.ensureDir(landingDir);

  // Create config.json
  const config = JSON.parse(JSON.stringify(template.config));
  config.name = `${name} Landing`;
  config.meta.title = name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const configPath = path.join(landingDir, 'config.json');
  await fs.writeJson(configPath, config, { spaces: 2 });
  console.log(`  ✓ Created config.json`);

  // Create FIGMA.md
  const figmaContent = `# ${name} - Figma Reference

## Pages
| Page | Figma Node ID | Description |
|------|---------------|-------------|
${template.pages.map(p => `| ${p} | TODO | |`).join('\n')}

## Figma File
- URL: https://www.figma.com/design/YOUR_FILE_ID/
`;
  await fs.writeFile(path.join(landingDir, 'FIGMA.md'), figmaContent);
  console.log(`  ✓ Created FIGMA.md`);

  console.log(`\n✅ Landing "${name}" created successfully!`);
  console.log(`\n📁 Location: ${landingDir}`);
  console.log(`📝 Template: ${template.name}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Edit ${configPath}`);
  console.log(`   2. Fill in content from Figma`);
  console.log(`   3. Run: node builder/builder.js ${name}`);
  console.log('');
}

/**
 * Build landing with optional watch mode
 */
async function buildLanding(name, watch = false) {
  if (!name) {
    console.error('❌ Landing name required');
    process.exit(1);
  }

  try {
    const builder = new LandingBuilder(name);
    await builder.build();

    if (watch) {
      console.log(`\n👀 Watching for changes... (Ctrl+C to stop)\n`);

      const landingDir = path.join(rootDir, 'landings', name);
      const sectionsDir = path.join(rootDir, 'sections');

      const rebuild = async () => {
        console.log(`\n🔄 Rebuilding...`);
        try {
          const newBuilder = new LandingBuilder(name);
          await newBuilder.build();
        } catch (error) {
          console.error(`❌ Build error: ${error.message}`);
        }
      };

      // Watch landing config
      fs.watch(landingDir, { recursive: true }, (event, filename) => {
        if (filename && filename.endsWith('.json')) {
          console.log(`📝 Changed: ${filename}`);
          rebuild();
        }
      });

      // Watch sections
      fs.watch(sectionsDir, { recursive: true }, (event, filename) => {
        if (filename && (filename.endsWith('.html') || filename.endsWith('.css'))) {
          console.log(`📝 Changed: ${filename}`);
          rebuild();
        }
      });
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Validate landing config and images
 */
async function validateLanding(name) {
  console.log(`\n🔍 Validating landing: ${name}\n`);

  const configPath = path.join(rootDir, 'landings', name, 'config.json');
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config not found: ${configPath}`);
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  let errors = 0;
  let warnings = 0;

  // Check theme
  if (config.theme) {
    const themePath = path.join(rootDir, 'assets', 'themes', `${config.theme}.json`);
    if (!fs.existsSync(themePath)) {
      console.error(`❌ Theme not found: ${config.theme}`);
      errors++;
    } else {
      console.log(`✓ Theme: ${config.theme}`);
    }
  }

  // Collect all image URLs
  const imageUrls = [];
  const collectUrls = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && (key === 'src' || key === 'image' || key === 'icon' || key === 'photo')) {
        if (value.startsWith('http')) {
          imageUrls.push(value);
        }
      } else if (Array.isArray(value)) {
        value.forEach(collectUrls);
      } else if (typeof value === 'object') {
        collectUrls(value);
      }
    }
  };
  collectUrls(config);

  console.log(`\n📷 Found ${imageUrls.length} image URLs\n`);

  // Validate images (check if accessible)
  for (const url of imageUrls.slice(0, 10)) { // Check first 10
    try {
      const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
      if (response.ok) {
        console.log(`  ✓ ${url.substring(0, 60)}...`);
      } else {
        console.log(`  ⚠ ${response.status}: ${url.substring(0, 50)}...`);
        warnings++;
      }
    } catch (error) {
      console.log(`  ❌ Failed: ${url.substring(0, 50)}...`);
      errors++;
    }
  }

  if (imageUrls.length > 10) {
    console.log(`  ... and ${imageUrls.length - 10} more`);
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Validation complete: ${errors} errors, ${warnings} warnings`);
  console.log(`${'='.repeat(50)}\n`);

  process.exit(errors > 0 ? 1 : 0);
}

/**
 * List all landings
 */
function listLandings() {
  console.log(`\n📋 Available landings:\n`);

  const landingsDir = path.join(rootDir, 'landings');
  const landings = fs.readdirSync(landingsDir).filter(name => {
    const configPath = path.join(landingsDir, name, 'config.json');
    return fs.existsSync(configPath);
  });

  landings.forEach(name => {
    const configPath = path.join(landingsDir, name, 'config.json');
    const config = fs.readJsonSync(configPath);
    const pages = config.pages ? config.pages.length : 1;
    const theme = config.theme || 'none';
    console.log(`  • ${name} (${pages} pages, theme: ${theme})`);
  });

  console.log(`\n📁 Total: ${landings.length} landings\n`);
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
Landing Builder CLI

Usage:
  node builder/cli.js <command> [options]

Commands:
  create <name> [--template <template>]  Create new landing
  build <name> [--watch]                 Build landing
  validate <name>                        Validate config and images
  list                                   List all landings

Templates:
  quiz-funnel   (default) 7-page quiz flow
  single-page   Simple one-page landing

Examples:
  node builder/cli.js create my-landing
  node builder/cli.js create my-landing --template single-page
  node builder/cli.js build my-landing --watch
  node builder/cli.js validate my-landing
  node builder/cli.js list
`);
}

// ============================================================================
// MAIN
// ============================================================================

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'create':
    const templateIndex = args.indexOf('--template');
    const template = templateIndex > -1 ? args[templateIndex + 1] : 'quiz-funnel';
    createLanding(args[1], template);
    break;

  case 'build':
    const watch = args.includes('--watch');
    buildLanding(args[1], watch);
    break;

  case 'validate':
    validateLanding(args[1]);
    break;

  case 'list':
    listLandings();
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    if (command) {
      console.error(`❌ Unknown command: ${command}`);
    }
    showHelp();
    process.exit(command ? 1 : 0);
}
