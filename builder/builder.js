const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

// Register custom Handlebars helpers
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('unlessEquals', function(arg1, arg2, options) {
  return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});

class LandingBuilder {
  constructor(landingName) {
    this.landingName = landingName;
    this.rootDir = path.join(__dirname, '..');
    this.configPath = path.join(this.rootDir, 'landings', landingName, 'config.json');

    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config file not found: ${this.configPath}`);
    }

    this.config = this.loadConfig();
    this.outputDir = path.join(this.rootDir, 'projects', landingName);
  }

  loadConfig() {
    try {
      const configContent = fs.readFileSync(this.configPath, 'utf8');
      const config = JSON.parse(configContent);
      this.validateConfig(config);
      return config;
    } catch (error) {
      if (error.name === 'SyntaxError') {
        throw new Error(`Invalid JSON in config file: ${error.message}`);
      }
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  validateConfig(config) {
    const errors = [];

    // Check required fields
    if (!config.name) {
      errors.push('Missing required field: name');
    }

    if (!config.sections || !Array.isArray(config.sections)) {
      errors.push('Missing or invalid field: sections (must be an array)');
    } else if (config.sections.length === 0) {
      errors.push('sections array cannot be empty');
    } else {
      // Validate each section
      config.sections.forEach((section, index) => {
        if (!section.type) {
          errors.push(`Section ${index + 1}: missing required field "type"`);
        }
      });
    }

    // Check meta fields
    if (!config.meta) {
      console.warn('⚠ Warning: Missing "meta" object (title, description, keywords)');
    } else {
      if (!config.meta.title) {
        console.warn('⚠ Warning: Missing meta.title');
      }
      if (!config.meta.description) {
        console.warn('⚠ Warning: Missing meta.description');
      }
    }

    if (errors.length > 0) {
      throw new Error(`Config validation failed:\n  - ${errors.join('\n  - ')}`);
    }
  }

  // Load a section template and merge with variables
  loadSection(sectionType, sectionContent) {
    const sectionDir = path.join(this.rootDir, 'sections', sectionType);
    const templatePath = path.join(sectionDir, `${sectionType}.html`);
    const defaultVarsPath = path.join(sectionDir, 'variables.json');

    if (!fs.existsSync(templatePath)) {
      console.warn(`⚠ Template not found: ${templatePath}`);
      return '';
    }

    // Load default variables
    let defaultVars = {};
    if (fs.existsSync(defaultVarsPath)) {
      defaultVars = JSON.parse(fs.readFileSync(defaultVarsPath, 'utf8'));
    }

    // Merge with content from config
    const variables = { ...defaultVars, ...sectionContent };

    // Load and compile template
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    return template(variables);
  }

  // Build all sections
  buildHTML() {
    console.log(`\n📦 Building landing: ${this.landingName}\n`);

    let sectionsHTML = '';
    let sectionCSS = [];

    this.config.sections.forEach((section, index) => {
      console.log(`  ${index + 1}. Loading section: ${section.type}`);

      const sectionHTML = this.loadSection(section.type, section.content || {});
      sectionsHTML += sectionHTML + '\n\n';

      // Track CSS files
      const cssPath = path.join(this.rootDir, 'sections', section.type, `${section.type}.css`);
      if (fs.existsSync(cssPath)) {
        sectionCSS.push(`${section.type}.css`);
      }
    });

    console.log(`\n✓ All sections loaded`);

    return this.wrapLayout(sectionsHTML, sectionCSS);
  }

  // Escape HTML special characters for safe attribute values
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Wrap sections in HTML layout
  wrapLayout(bodyContent, sectionCSS) {
    const lang = this.config.lang || 'de';
    const title = this.escapeHtml(this.config.meta?.title || this.landingName);
    const description = this.escapeHtml(this.config.meta?.description || '');
    const keywords = this.escapeHtml(this.config.meta?.keywords || '');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <title>${title}</title>

  <!-- Bootstrap CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom CSS -->
  <link href="css/variables.css" rel="stylesheet">
  <link href="css/common.css" rel="stylesheet">

  <!-- Section-specific CSS -->
${sectionCSS.map(css => `  <link href="css/${css}" rel="stylesheet">`).join('\n')}
</head>
<body>

${bodyContent}

  <!-- Bootstrap JS -->
  <script src="js/bootstrap.bundle.min.js"></script>

  <!-- Common JS -->
  <script src="js/common.js"></script>
</body>
</html>`;
  }

  // Copy assets to output directory
  async copyAssets() {
    console.log(`\n📂 Copying assets...\n`);

    const outputCSSDir = path.join(this.outputDir, 'css');
    const outputJSDir = path.join(this.outputDir, 'js');
    const outputAssetsDir = path.join(this.outputDir, 'assets');

    // Create directories
    await fs.ensureDir(outputCSSDir);
    await fs.ensureDir(outputJSDir);
    await fs.ensureDir(outputAssetsDir);

    // Copy Bootstrap CSS & JS
    await fs.copy(
      path.join(this.rootDir, 'assets/css/bootstrap.min.css'),
      path.join(outputCSSDir, 'bootstrap.min.css')
    );
    await fs.copy(
      path.join(this.rootDir, 'assets/js/bootstrap.bundle.min.js'),
      path.join(outputJSDir, 'bootstrap.bundle.min.js')
    );

    // Copy variables.css and common.css
    await fs.copy(
      path.join(this.rootDir, 'assets/css/variables.css'),
      path.join(outputCSSDir, 'variables.css')
    );
    await fs.copy(
      path.join(this.rootDir, 'assets/css/common.css'),
      path.join(outputCSSDir, 'common.css')
    );

    // Copy common.js
    await fs.copy(
      path.join(this.rootDir, 'assets/js/common.js'),
      path.join(outputJSDir, 'common.js')
    );

    // Copy section-specific CSS
    for (const section of this.config.sections) {
      const sectionCSSPath = path.join(this.rootDir, 'sections', section.type, `${section.type}.css`);
      if (fs.existsSync(sectionCSSPath)) {
        await fs.copy(
          sectionCSSPath,
          path.join(outputCSSDir, `${section.type}.css`)
        );
        console.log(`  ✓ Copied ${section.type}.css`);
      }
    }

    // Copy landing-specific assets if they exist
    const landingAssetsDir = path.join(this.rootDir, 'landings', this.landingName, 'assets');
    if (fs.existsSync(landingAssetsDir)) {
      await fs.copy(landingAssetsDir, outputAssetsDir);
      console.log(`  ✓ Copied landing-specific assets`);
    }

    console.log(`\n✓ Assets copied`);
  }

  // Main build function
  async build() {
    try {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`  LANDING BUILDER`);
      console.log(`${'='.repeat(60)}`);

      // Build HTML
      const html = this.buildHTML();

      // Ensure output directory exists
      await fs.ensureDir(this.outputDir);

      // Write HTML file
      const indexPath = path.join(this.outputDir, 'index.html');
      await fs.writeFile(indexPath, html, 'utf8');

      // Copy assets
      await this.copyAssets();

      console.log(`\n${'='.repeat(60)}`);
      console.log(`\n✅ Landing built successfully!`);
      console.log(`\n📁 Output: ${this.outputDir}`);
      console.log(`🌐 Open: ${indexPath}\n`);
      console.log(`${'='.repeat(60)}\n`);

      return {
        success: true,
        outputDir: this.outputDir,
        indexPath
      };
    } catch (error) {
      console.error(`\n❌ Build failed: ${error.message}\n`);
      throw error;
    }
  }
}

// CLI Interface
if (require.main === module) {
  const landingName = process.argv[2];

  if (!landingName) {
    console.error('\n❌ Usage: node builder/builder.js <landing-name>\n');
    console.error('Example: node builder/builder.js photographer\n');
    process.exit(1);
  }

  const builder = new LandingBuilder(landingName);
  builder.build().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = LandingBuilder;
