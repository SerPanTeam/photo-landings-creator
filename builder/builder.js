const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

// =============================================================================
// SECURITY: HTML Sanitization
// =============================================================================

// Allowed HTML tags for rich text content
const ALLOWED_TAGS = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'a', 'ul', 'ol', 'li'];
const ALLOWED_ATTRS = {
  'a': ['href', 'title'],
  'span': ['class'],
  '*': ['class']
};

// Sanitize HTML - remove dangerous tags and attributes
function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return '';

  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  html = html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  html = html.replace(/\s*on\w+\s*=\s*[^\s>]+/gi, '');

  // Remove javascript: URLs
  html = html.replace(/javascript\s*:/gi, '');

  // Remove data: URLs (can be used for XSS)
  html = html.replace(/data\s*:\s*text\/html/gi, '');

  // Remove style attributes (can contain expressions)
  html = html.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '');

  // Remove dangerous tags
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'meta', 'link', 'base'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
    html = html.replace(regex, '');
    // Self-closing
    html = html.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi'), '');
  });

  return html;
}

// Sanitize CSS value (for inline styles)
function sanitizeCssValue(value) {
  if (!value || typeof value !== 'string') return '';

  // Remove anything that looks like JavaScript
  value = value.replace(/javascript\s*:/gi, '');
  value = value.replace(/expression\s*\(/gi, '');
  value = value.replace(/url\s*\(\s*["']?\s*javascript/gi, 'url(');

  // Only allow safe CSS characters
  value = value.replace(/[^a-zA-Z0-9#%.,\s\-()]/g, '');

  return value;
}

// Sanitize URL (for href, src attributes)
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';

  // Allow only safe URL schemes
  const safeSchemes = ['http:', 'https:', 'mailto:', 'tel:', '#'];
  const trimmedUrl = url.trim().toLowerCase();

  // Check if URL starts with a safe scheme or is relative
  const isSafe = safeSchemes.some(scheme => trimmedUrl.startsWith(scheme)) ||
                 trimmedUrl.startsWith('/') ||
                 trimmedUrl.startsWith('./') ||
                 trimmedUrl.startsWith('#') ||
                 !trimmedUrl.includes(':');

  if (!isSafe) {
    console.warn(`⚠ Potentially unsafe URL blocked: ${url}`);
    return '#';
  }

  return url;
}

// =============================================================================
// HANDLEBARS HELPERS
// =============================================================================

// Helper for conditional equality
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

// Helper for conditional inequality
Handlebars.registerHelper('unlessEquals', function(arg1, arg2, options) {
  return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});

// Helper for safe HTML output (sanitized)
Handlebars.registerHelper('safeHtml', function(html) {
  return new Handlebars.SafeString(sanitizeHtml(html));
});

// Helper for safe URL
Handlebars.registerHelper('safeUrl', function(url) {
  return sanitizeUrl(url);
});

// Helper for safe CSS value
Handlebars.registerHelper('safeCss', function(value) {
  return sanitizeCssValue(value);
});

// =============================================================================
// LANDING BUILDER CLASS
// =============================================================================

class LandingBuilder {
  constructor(landingName) {
    // SECURITY: Sanitize landing name to prevent path traversal
    this.landingName = this.sanitizeLandingName(landingName);
    this.rootDir = path.join(__dirname, '..');
    this.configPath = path.join(this.rootDir, 'landings', this.landingName, 'config.json');

    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config file not found: ${this.configPath}`);
    }

    this.config = this.loadConfig();
    this.outputDir = path.join(this.rootDir, 'projects', this.landingName);
  }

  // SECURITY: Prevent path traversal attacks
  sanitizeLandingName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Landing name is required');
    }

    // Only allow alphanumeric characters, hyphens, and underscores
    const sanitized = name.replace(/[^a-zA-Z0-9\-_]/g, '');

    if (sanitized !== name) {
      throw new Error(`Invalid landing name: "${name}". Only alphanumeric characters, hyphens, and underscores are allowed.`);
    }

    if (sanitized.length === 0) {
      throw new Error('Landing name cannot be empty');
    }

    // Additional check: ensure the sanitized name matches the original
    const resolved = path.resolve(this.rootDir || __dirname, 'landings', sanitized);
    const expected = path.resolve(this.rootDir || __dirname, 'landings');

    if (!resolved.startsWith(expected)) {
      throw new Error('Invalid landing name: path traversal detected');
    }

    return sanitized;
  }

  loadConfig() {
    try {
      const configContent = fs.readFileSync(this.configPath, 'utf8');

      // SECURITY: Limit config file size (prevent DoS)
      if (configContent.length > 1024 * 1024) { // 1MB limit
        throw new Error('Config file too large (max 1MB)');
      }

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
    if (!config.name || typeof config.name !== 'string') {
      errors.push('Missing or invalid field: name (must be a string)');
    }

    if (!config.sections || !Array.isArray(config.sections)) {
      errors.push('Missing or invalid field: sections (must be an array)');
    } else if (config.sections.length === 0) {
      errors.push('sections array cannot be empty');
    } else {
      // Validate each section
      const validSectionTypes = this.getValidSectionTypes();

      config.sections.forEach((section, index) => {
        if (!section.type) {
          errors.push(`Section ${index + 1}: missing required field "type"`);
        } else if (!validSectionTypes.includes(section.type)) {
          errors.push(`Section ${index + 1}: unknown section type "${section.type}". Valid types: ${validSectionTypes.join(', ')}`);
        }

        // Validate URLs in section content
        if (section.content) {
          this.validateUrls(section.content, `Section ${index + 1}`, errors);
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

  // Get list of valid section types
  getValidSectionTypes() {
    const sectionsDir = path.join(this.rootDir, 'sections');
    if (!fs.existsSync(sectionsDir)) return [];

    return fs.readdirSync(sectionsDir).filter(name => {
      const sectionPath = path.join(sectionsDir, name);
      return fs.statSync(sectionPath).isDirectory();
    });
  }

  // Validate URLs recursively in config object
  validateUrls(obj, context, errors) {
    if (!obj || typeof obj !== 'object') return;

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        // Check URL fields
        if (key === 'link' || key === 'href' || key === 'src' || key === 'url') {
          const sanitized = sanitizeUrl(value);
          if (sanitized === '#' && value !== '#') {
            errors.push(`${context}: potentially unsafe URL in "${key}": ${value}`);
          }
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, i) => this.validateUrls(item, `${context}[${i}]`, errors));
      } else if (typeof value === 'object') {
        this.validateUrls(value, context, errors);
      }
    }
  }

  // Load a section template and merge with variables
  loadSection(sectionType, sectionContent) {
    const sectionDir = path.join(this.rootDir, 'sections', sectionType);
    const templatePath = path.join(sectionDir, `${sectionType}.html`);
    const defaultVarsPath = path.join(sectionDir, 'variables.json');

    if (!fs.existsSync(templatePath)) {
      // SECURITY: Throw error instead of silently continuing
      throw new Error(`Template not found: ${templatePath}`);
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

    // SECURITY: Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data:",
      "font-src 'self' https:",
      "frame-src https://www.google.com https://maps.google.com",
      "connect-src 'self'"
    ].join('; ');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <title>${title}</title>

  <!-- Security Headers -->
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

  <!-- Bootstrap CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom CSS -->
  <link href="css/base-styles.css" rel="stylesheet">
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

    // Copy base-styles.css and common.css
    await fs.copy(
      path.join(this.rootDir, 'assets/css/base-styles.css'),
      path.join(outputCSSDir, 'base-styles.css')
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

  try {
    const builder = new LandingBuilder(landingName);
    builder.build().catch(error => {
      console.error(error);
      process.exit(1);
    });
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = LandingBuilder;
