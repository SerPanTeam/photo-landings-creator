# Landing Builder - AI Instructions

## Project Overview

This is a **component-based landing page builder** for photographer websites. Landings are assembled from reusable sections defined in `sections/` folder, configured via JSON, and built using Handlebars templates.

## Quick Start

```bash
# Build a landing
node builder/builder.js <landing-name>

# Example
node builder/builder.js family-quiz
```

Output: `projects/<landing-name>/`

## Project Structure

```
landing/
├── sections/           # Reusable section components (18 total)
├── landings/           # Landing configurations
│   └── <name>/
│       ├── config.json # Sections, content, meta
│       ├── FIGMA.md    # Figma node references
│       ├── js/         # Custom scripts
│       └── assets/     # Landing-specific images
├── projects/           # Built output (generated)
├── assets/
│   ├── css/            # Bootstrap, base-styles, common
│   └── js/             # Bootstrap, common.js
└── builder/
    └── builder.js      # Build system
```

## Design System

### Colors
```
Primary BG:    #F5EDE0
Secondary BG:  #EEE3D0
Accent:        #E2C08D
Text Dark:     #3D3D3D
Text Black:    #000000
Placeholder:   #7F7F7F
```

### Typography (Inter font)
```
H1: 55px Bold
H2: 45px Bold
H3: 35px Bold
H4: 28px Bold
Body: 22px Medium
```

### CSS Classes
- `.text-h1`, `.text-h2`, `.text-h3` - Headings
- `.text-bold-big`, `.text-medium-big` - 28px text
- `.text-bold-small`, `.text-medium-small` - 22px text
- `.btn-primary-custom` - Accent button (#E2C08D)
- `.btn-outline-custom` - Outline button

## Available Sections (18)

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
| `promotional` | Promo block with image + text |
| `features` | Description + image + tagline |
| `benefits` | 3 icon cards with titles |
| `process` | 4-step process with icons |
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
| `quiz-question` | Question with image options |
| `quiz-form` | Registration form |
| `thank-you-hero` | Success page content |
| `author-footer` | Author info + social links |

## Config.json Structure

### Single Page
```json
{
  "name": "Landing Name",
  "lang": "de",
  "meta": {
    "title": "Page Title",
    "description": "SEO description",
    "keywords": "keywords"
  },
  "sections": [
    { "type": "hero", "content": { ... } },
    { "type": "faq", "content": { ... } }
  ]
}
```

### Multi-Page (Quiz)
```json
{
  "name": "Quiz Landing",
  "scripts": ["quiz.js"],
  "pages": [
    {
      "filename": "index.html",
      "title": "Page Title",
      "sections": [ ... ]
    },
    {
      "filename": "quiz-1.html",
      "sections": [ ... ]
    }
  ]
}
```

## Section Reference

### hero
```json
{
  "type": "hero",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#3D3D3D",
    "logo": "Logo",
    "title": "Main Title",
    "titleHighlight": "highlighted word",
    "titleHighlightColor": "#E2C08D",
    "description": "Description text",
    "cta": { "text": "Button", "link": "#" },
    "images": [
      { "src": "url", "width": 428, "height": 394, "placeholderColor": "#A19F9F" },
      { "src": "url", "width": 306, "height": 290, "placeholderColor": "#7F7F7F" }
    ]
  }
}
```

### promotional
```json
{
  "type": "promotional",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Promo Title",
    "description": "Text BEFORE line divider",
    "description2": "Text AFTER line divider (optional)",
    "image": "url",
    "cta": { "text": "Link text", "link": "#", "showArrow": true }
  }
}
```
**NOTE**: Line divider is BETWEEN `description` and `description2`. Use both when Figma has line in middle of text!

### features
```json
{
  "type": "features",
  "content": {
    "backgroundColor": "#F5EDE0",
    "title": "Main Title",
    "centeredTitle": "Centered title above",
    "centeredTitleHighlight": "highlighted part",
    "subtitle": "Subtitle (italic, under title)",
    "description": "Description with HTML",
    "image": "url",
    "tagline": "– tagline text –",
    "taglineColor": "#E2C08D",
    "ctaAfterTitle": true,
    "cta": { "text": "Link", "link": "#", "isButton": true }
  }
}
```

**ctaAfterTitle: true** - кнопка и description в одной строке после заголовка:
```
[centeredTitle - слева]
[description - col-6 слева] [CTA - col-6 справа]
```

### benefits
```json
{
  "type": "benefits",
  "content": {
    "backgroundColor": "#F5EDE0",
    "items": [
      { "icon": "url", "title": "Title", "description": "Text" }
    ]
  }
}
```

### process
```json
{
  "type": "process",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Process Title",
    "steps": [
      { "icon": "url", "title": "1. Step", "description": "Text" }
    ],
    "cta": { "text": "Button", "link": "#" }
  }
}
```

### faq
```json
{
  "type": "faq",
  "content": {
    "backgroundColor": "#F5EDE0",
    "title": "FAQ Title",
    "items": [
      { "q": "Question?", "a": "Answer text" }
    ]
  }
}
```
**IMPORTANT**: Use `q` and `a`, NOT `question` and `answer`!

### services
```json
{
  "type": "services",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Services Title",
    "items": [
      { "image": "url", "title": "Service", "description": "Text" }
    ],
    "cta": { "text": "Button", "link": "#" }
  }
}
```

### about
```json
{
  "type": "about",
  "content": {
    "backgroundColor": "#F5EDE0",
    "photo": "url",
    "greeting": "Willkommen bei",
    "name": "Name",
    "bio": "Bio text with HTML"
  }
}
```

### gallery
```json
{
  "type": "gallery",
  "content": {
    "backgroundColor": "#EEE3D0",
    "showArrows": true,
    "images": [
      { "src": "url", "alt": "Description" }
    ]
  }
}
```

### fullwidth-image
```json
{
  "type": "fullwidth-image",
  "content": {
    "src": "url",
    "alt": "Description",
    "backgroundColor": "#7F7F7F",
    "height": 656
  }
}
```

### quiz-header
```json
{
  "type": "quiz-header",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#3D3D3D",
    "logo": "Logo",
    "logoLink": "index.html",
    "progress": "Progress text"
  }
}
```

### quiz-question
```json
{
  "type": "quiz-question",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "questionId": "q1",
    "question": "Question text?",
    "optionsCount": "4",
    "options": [
      { "text": "Option", "value": "opt1", "link": "next.html", "image": "url", "multiline": false }
    ]
  }
}
```

### quiz-form
```json
{
  "type": "quiz-form",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "subtitle": "Subtitle",
    "title": "Form Title",
    "deadline": "Deadline text",
    "namePlaceholder": "Name field",
    "emailPlaceholder": "Email field",
    "phonePlaceholder": "Phone field",
    "availabilityPlaceholder": "Select placeholder",
    "availabilityOptions": [
      { "value": "morning", "text": "Morning" }
    ],
    "privacyText": "I accept",
    "privacyLinkText": "Privacy Policy",
    "privacyLink": "privacy.html",
    "submitText": "Submit",
    "sideImage": "url",
    "sideText": "Side text",
    "importantTitle": "Important!",
    "importantText": "Important details"
  }
}
```

### thank-you-hero
```json
{
  "type": "thank-you-hero",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "title": "Thank You!",
    "subtitle": "Subtitle",
    "description": "<p>HTML description</p>",
    "image": "url",
    "ctaPrimary": { "text": "Primary CTA", "link": "#" },
    "additionalText": "Additional info",
    "secondaryButtons": [
      { "text": "Call", "link": "tel:+123" },
      { "text": "Email", "link": "mailto:a@b.com" }
    ]
  }
}
```

### author-footer
```json
{
  "type": "author-footer",
  "content": {
    "backgroundColor": "#EEE3D0",
    "textColor": "#000000",
    "accentColor": "#E2C08D",
    "name": "Author Name",
    "specialization": "Specialization",
    "description": "<p>HTML description</p>",
    "socialLinks": [
      { "type": "facebook", "link": "url", "title": "Facebook" },
      { "type": "instagram", "link": "url", "title": "Instagram" },
      { "type": "website", "link": "url", "title": "Website" }
    ]
  }
}
```

### footer
```json
{
  "type": "footer",
  "content": {
    "backgroundColor": "#FFFFFF",
    "mapUrl": "https://www.google.com/maps/embed?pb=...",
    "height": "450"
  }
}
```
**Default**: Ansbach, Germany (49.3009, 10.5478)

### legal-footer
```json
{
  "type": "legal-footer",
  "content": {
    "backgroundColor": "#F5EDE0",
    "links": [
      { "text": "Impressum", "href": "impressum.html" },
      { "text": "Datenschutz", "href": "datenschutz.html" }
    ],
    "copyright": "© 2025 Company. All rights reserved."
  }
}
```

## Figma Integration

### ОБЯЗАТЕЛЬНО: Протокол проверки

**ПЕРЕД любой работой с Figma** (верстка, проверка, синхронизация):
1. Прочитать: `.claude/figma-verification-protocol.md`
2. Следовать чек-листу из протокола
3. Проверять X/Y координаты для определения layout строк

**Ключевое правило:** Элементы с близкими Y-координатами (±50px) = одна строка в Bootstrap!

### MCP Figma Tools

Use MCP Figma tools for design comparison:

```javascript
// Get design context (returns CSS/code with exact positions)
mcp__figma__get_design_context({ nodeId: "1-3" })

// Get screenshot (visual reference)
mcp__figma__get_screenshot({ nodeId: "1-3" })
```

Store Figma references in `landings/<name>/FIGMA.md`:
```markdown
| Page | Figma Node ID |
|------|---------------|
| index.html | 1-3 |
| quiz-1.html | 137-51 |
```

## CRITICAL: Figma Verification Protocol

**Полный протокол проверки:** `.claude/figma-verification-protocol.md`

Протокол содержит:
- Алгоритм проверки (5 шагов)
- Правила позиционирования (X/Y координаты → Bootstrap rows)
- Размеры элементов и border-radius
- Чек-листы по каждой секции
- Таблицу частых ошибок
- Документацию исправленных багов

## Common Patterns

### Typical Landing Page Structure
```
hero → promotional → features → gallery → benefits →
process → fullwidth-image → faq → services → about →
footer → legal-footer
```

### Quiz Flow Structure
```
index.html (main) →
quiz-1.html → quiz-2.html → quiz-3.html → quiz-4.html →
quiz-form.html → thank-you.html
```

## Important Notes

1. **Field naming**: FAQ uses `q`/`a`, testimonials use `author` (not `name`)
2. **Images**: Use picsum.photos for placeholders with correct dimensions
3. **HTML content**: Use `{{{description}}}` (triple braces) for HTML in Handlebars
4. **Buttons**: Hero uses 286x70px, quiz uses auto x 66px, outline uses auto x 60px
5. **Default map**: Ansbach, Germany coordinates
6. **Hero images**: Image 2 overlaps Image 1 from BOTTOM-LEFT (not right!)
7. **ALWAYS run `get_design_context` AND `get_screenshot`** before verifying Figma match
8. **Extract EXACT pixel values** from Figma code - never assume positions
9. **Check BOTH width AND height** for all buttons and images

## Git Commits

**NEVER include in commit messages:**
- `Generated with [Claude Code]` or similar
- `Co-Authored-By: Claude` or any AI attribution
- Links to claude.com

**Use clean, conventional commit format:**
```
feat: Add feature description
fix: Fix bug description
refactor: Refactor description
docs: Documentation update
```
