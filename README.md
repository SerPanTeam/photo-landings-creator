# Photo Landing Builder

Universal landing page generator for photographers. Create professional landing pages by combining reusable sections through simple JSON configuration.

**For any photographer** - just customize the `config.json` with your content, images, and branding.

## Quick Start

```bash
# Install dependencies
npm install

# Build a landing
node builder/builder.js <landing-name>

# Examples
node builder/builder.js family-quiz
node builder/builder.js christmas-free
```

Output: `projects/<landing-name>/`

## Example Templates

Ready-to-use templates (copy and customize for your needs):

| Template | Type | Pages | Use Case |
|----------|------|-------|----------|
| `family-quiz` | Multi-page | 7 | Quiz funnel for family photoshoot |
| `christmas-free` | Multi-page | 7 | Free Christmas photoshoot promo |
| `christmas-family` | Single-page | 1 | Christmas family landing |
| `photographer` | Single-page | 1 | Basic photographer portfolio |
| `newborn` | Single-page | 1 | Newborn photography |
| `mutter-kind` | Single-page | 1 | Mother & child photoshoot |
| `free-photoshoot` | Single-page | 1 | Free photoshoot promo |

To create your own: copy any template folder in `landings/`, rename it, and edit `config.json`.

## Project Structure

```
landing/
├── sections/              # 21 reusable section components
│   ├── hero/
│   │   ├── hero.html      # Handlebars template
│   │   ├── hero.css       # Section styles
│   │   └── variables.json # Default values
│   └── ...
│
├── landings/              # Landing configurations
│   └── <landing-name>/
│       ├── config.json    # Sections + content
│       ├── FIGMA.md       # Figma node references
│       ├── js/            # Custom scripts
│       └── assets/        # Landing-specific images
│
├── projects/              # Built output (generated)
├── assets/                # Shared CSS/JS/icons
└── builder/builder.js     # Build system
```

## Available Sections (21)

### Page Structure
| Section | Purpose |
|---------|---------|
| `hero` | Main header with logo, title, CTA, images |
| `hero-dark` | Dark theme hero with promo text |
| `hero-centered` | Centered layout with multiple images |
| `footer` | Google Maps embed |
| `legal-footer` | Impressum/Datenschutz links |

### Content Sections
| Section | Purpose |
|---------|---------|
| `promotional` | Promo block with image + text (supports `description2`) |
| `features` | Description + image + tagline |
| `benefits` | 3 icon cards (supports optional `title`) |
| `process` | 4-step process (supports `ctaCentered` for primary button) |
| `services` | 4 service cards grid |
| `about` | Bio section with photo |
| `gallery` | Image slider with arrows |
| `fullwidth-image` | Full-width image/placeholder |
| `faq` | Accordion Q&A |
| `faq-cards` | Card-based Q&A |
| `testimonials` | Client reviews slider |

### Quiz Sections
| Section | Purpose |
|---------|---------|
| `quiz-header` | Logo + progress text |
| `quiz-question` | Question with 2-4 image options |
| `quiz-form` | Registration form |
| `thank-you-hero` | Success page content |
| `author-footer` | Author info + social links |

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary BG | `#F5EDE0` | Main sections |
| Secondary BG | `#EEE3D0` | Alternating sections |
| Accent | `#E2C08D` | Buttons, highlights |
| Text Dark | `#3D3D3D` | Primary text |
| Text Black | `#000000` | Headings |

### Typography (Inter)
| Style | Size | Class |
|-------|------|-------|
| Header 1 | 55px Bold | `.text-h1` |
| Header 2 | 45px Bold | `.text-h2` |
| Header 3 | 35px Bold | `.text-h3` |
| Text Bold | 28px/22px Bold | `.text-bold-big`, `.text-bold-small` |
| Text Medium | 28px/22px Medium | `.text-medium-big`, `.text-medium-small` |

### Buttons
| Class | Style | Size |
|-------|-------|------|
| `.btn-primary-custom` | Solid #E2C08D | 286x70 (hero), 476x71 (process centered) |
| `.btn-outline-custom` | Black border | auto x 60px |

## Config.json Examples

### Single Page
```json
{
  "name": "Landing Name",
  "lang": "de",
  "meta": { "title": "...", "description": "..." },
  "sections": [
    { "type": "hero", "content": { "title": "..." } },
    { "type": "faq", "content": { "items": [...] } }
  ]
}
```

### Multi-Page (Quiz)
```json
{
  "name": "Quiz Landing",
  "scripts": ["quiz.js"],
  "pages": [
    { "filename": "index.html", "sections": [...] },
    { "filename": "quiz-1.html", "sections": [...] }
  ]
}
```

## Key Section Features

### promotional - Split text with line divider
```json
{
  "type": "promotional",
  "content": {
    "description": "Text BEFORE line divider",
    "description2": "Text AFTER line divider (optional)"
  }
}
```

### benefits - Optional title
```json
{
  "type": "benefits",
  "content": {
    "title": "Was dich erwartet",
    "items": [...]
  }
}
```

### process - Centered primary button
```json
{
  "type": "process",
  "content": {
    "ctaCentered": true,
    "cta": { "text": "Button", "link": "#" }
  }
}
```

### quiz-question - 2/3/4 options
```json
{
  "type": "quiz-question",
  "content": {
    "optionsCount": "4",
    "options": [
      { "text": "Option", "link": "next.html", "image": "url", "multiline": false }
    ]
  }
}
```

## Quiz Page Flow

```
index.html (main landing)
    └──> quiz-1.html (4 options)
            └──> quiz-2.html (4 options)
                    └──> quiz-3.html (2 options, centered)
                            └──> quiz-4.html (3 options, centered)
                                    └──> quiz-form.html (registration)
                                            └──> thank-you.html (success)
```

## Figma Integration

Each landing has a `FIGMA.md` with node IDs for design verification:

```bash
# Use Figma MCP tools
mcp__figma__get_screenshot({ nodeId: "233-22" })
mcp__figma__get_design_context({ nodeId: "233-22" })
```

## Technical Info

- **Templating**: Handlebars 4.7.8
- **CSS Framework**: Bootstrap 5.3.2
- **Node.js**: Required for build
- **Output**: Static HTML/CSS/JS (no runtime dependencies)
