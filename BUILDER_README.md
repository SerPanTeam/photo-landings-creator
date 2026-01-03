# Landing Builder System

Component-based landing page builder for photographer websites. Build complete landing pages by combining reusable sections through JSON configuration.

## Quick Start

```bash
# Install dependencies
npm install

# Build a landing
node builder/builder.js <landing-name>

# Examples
node builder/builder.js photographer
node builder/builder.js family-quiz
node builder/builder.js mutter-kind
```

Output directory: `projects/<landing-name>/`

## Project Structure

```
landing/
├── sections/              # 18 reusable section components
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
│       ├── js/            # Custom scripts (quiz.js)
│       └── assets/        # Landing-specific images
│
├── projects/              # Built output (generated)
│   └── <landing-name>/
│       ├── index.html
│       ├── css/
│       ├── js/
│       └── assets/
│
├── assets/                # Shared assets
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── base-styles.css
│   │   └── common.css
│   └── js/
│       ├── bootstrap.bundle.min.js
│       └── common.js
│
└── builder/
    └── builder.js         # Build system
```

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary BG | `#F5EDE0` | Main sections background |
| Secondary BG | `#EEE3D0` | Alternating sections |
| Accent | `#E2C08D` | Buttons, highlights |
| Text Dark | `#3D3D3D` | Primary text |
| Text Black | `#000000` | Headings |
| Placeholder | `#7F7F7F` | Image placeholders |

### Typography (Inter)
| Style | Size | Weight | Class |
|-------|------|--------|-------|
| Header 1 | 55px | Bold (700) | `.text-h1` |
| Header 2 | 45px | Bold (700) | `.text-h2` |
| Header 3 | 35px | Bold (700) | `.text-h3` |
| Text Bold Big | 28px | Bold (700) | `.text-bold-big` |
| Text Medium Big | 28px | Medium (500) | `.text-medium-big` |
| Text Bold Small | 22px | Bold (700) | `.text-bold-small` |
| Text Medium Small | 22px | Medium (500) | `.text-medium-small` |

### Buttons
| Class | Style | Height |
|-------|-------|--------|
| `.btn-primary-custom` | Solid #E2C08D, white text | 70px |
| `.btn-outline-custom` | Transparent, black border | 60px |

## Config.json Format

### Single Page Landing
```json
{
  "name": "Landing Name",
  "lang": "de",
  "meta": {
    "title": "Page Title",
    "description": "SEO description",
    "keywords": "keyword1, keyword2"
  },
  "sections": [
    {
      "type": "hero",
      "content": {
        "title": "Custom Title",
        "cta": { "text": "Button", "link": "#" }
      }
    }
  ]
}
```

### Multi-Page Landing (Quiz)
```json
{
  "name": "Quiz Landing",
  "lang": "de",
  "meta": { ... },
  "scripts": ["quiz.js"],
  "pages": [
    {
      "filename": "index.html",
      "title": "Main Page",
      "sections": [ ... ]
    },
    {
      "filename": "quiz-1.html",
      "title": "Quiz Question 1",
      "sections": [ ... ]
    }
  ]
}
```

---

## Available Sections (18)

### 1. hero
Main header section with logo, title, CTA, and images.

```json
{
  "type": "hero",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#3D3D3D",
    "logo": "Logo",
    "title": "Hello, i am a photographer",
    "titleHighlight": "photographer",
    "titleHighlightColor": "#E2C08D",
    "subtitle": "Description here",
    "cta": {
      "text": "Button",
      "link": "#contact"
    },
    "images": [
      {
        "src": "image1.jpg",
        "width": 428,
        "height": 394,
        "placeholderColor": "#A19F9F"
      },
      {
        "src": "image2.jpg",
        "width": 306,
        "height": 290,
        "placeholderColor": "#7F7F7F"
      }
    ]
  }
}
```

### 2. hero-dark
Dark theme hero with promotional text block.

```json
{
  "type": "hero-dark",
  "content": {
    "backgroundColor": "#3D3D3D",
    "logo": "Logo",
    "logoColor": "#F5EDE0",
    "promoTitle": "Promotional text",
    "promoHighlight": "Highlight text",
    "promoHighlightColor": "#E2C08D",
    "titleHighlight": "Kostenloses",
    "title": "Mutter-Kind-Fotoshooting!",
    "titleColor": "#E2C08D",
    "subtitle": "Subtitle text",
    "cta": {
      "text": "Jetzt Rabatt sichern",
      "link": "#contact"
    }
  }
}
```

### 3. hero-centered
Centered layout with multiple images.

```json
{
  "type": "hero-centered",
  "content": {
    "backgroundColor": "#F5EDE0",
    "logo": "Logo",
    "title": "Newborn Fotoshooting",
    "subtitle": "Subtitle description",
    "cta": { "text": "Button", "link": "#" },
    "images": [
      { "src": "img1.jpg", "width": 320, "height": 320, "borderRadius": "10px" },
      { "src": "img2.jpg", "width": 320, "height": 400, "borderRadius": "10px" },
      { "src": "img3.jpg", "width": 280, "height": 280, "borderRadius": "10px" }
    ]
  }
}
```

### 4. promotional
Promotional block with image on left, text on right.

```json
{
  "type": "promotional",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Weihnachts-Fotoshooting-Aktion",
    "description": "Text with <br> HTML support",
    "image": "promo.jpg",
    "cta": {
      "text": "Hier geht's zur Aktion",
      "link": "#",
      "showArrow": true
    }
  }
}
```

### 5. features
Feature description with image and tagline.

```json
{
  "type": "features",
  "content": {
    "backgroundColor": "#F5EDE0",
    "title": "Main Title",
    "subtitle": "Subtitle",
    "description": "Description with HTML",
    "image": "feature.jpg",
    "tagline": "– für dich, für dein Kind, für immer –",
    "cta": {
      "text": "Shootingplatz sichern",
      "link": "#",
      "showArrow": true
    }
  }
}
```

### 6. benefits
Three benefit cards with icons.

```json
{
  "type": "benefits",
  "content": {
    "backgroundColor": "#F5EDE0",
    "items": [
      {
        "icon": "icon1.jpg",
        "title": "Viel Zeit & Raum",
        "description": "für Momente für dich und deine Familie"
      },
      {
        "icon": "icon2.jpg",
        "title": "Professionelle Fotografin",
        "description": "aus Leidenschaft"
      },
      {
        "icon": "icon3.jpg",
        "title": "Hohe Qualität",
        "description": "der Fotos hautnah erleben"
      }
    ]
  }
}
```

### 7. process
Four-step process with icons.

```json
{
  "type": "process",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Wie genau komme ich zum Fotoshooting?",
    "steps": [
      {
        "icon": "step1.jpg",
        "title": "1. Eintragen",
        "description": "Step description"
      },
      {
        "icon": "step2.jpg",
        "title": "2. Shootingzeit",
        "description": "Step description"
      },
      {
        "icon": "step3.jpg",
        "title": "3. Wähle dein Lieblingsbild",
        "description": "Step description"
      },
      {
        "icon": "step4.jpg",
        "title": "4. Ergebnis",
        "description": "Step description"
      }
    ],
    "cta": {
      "text": "Jetzt sichern!",
      "link": "#"
    }
  }
}
```

### 8. faq
Accordion-style FAQ section.

```json
{
  "type": "faq",
  "content": {
    "backgroundColor": "#F5EDE0",
    "title": "Häufige Fragen zum Fotoshooting",
    "items": [
      {
        "q": "Wie lange dauert ein Fotoshooting?",
        "a": "Ein Fotoshooting dauert 30-60 Minuten."
      },
      {
        "q": "Was sollen wir anziehen?",
        "a": "Am besten abgestimmte Farben."
      }
    ]
  }
}
```

**IMPORTANT**: Use `q` and `a` keys, NOT `question` and `answer`!

### 9. faq-cards
Card-based FAQ layout.

```json
{
  "type": "faq-cards",
  "content": {
    "backgroundColor": "#F5EDE0",
    "title": "Häufige Fragen",
    "items": [
      { "q": "Question?", "a": "Answer" }
    ],
    "cta": { "text": "More questions?", "link": "#" }
  }
}
```

### 10. services
Four service cards in a grid.

```json
{
  "type": "services",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Das ganze Jahr über...",
    "items": [
      {
        "image": "service1.jpg",
        "title": "Family Time",
        "description": "Service description"
      },
      {
        "image": "service2.jpg",
        "title": "Kinder-Fotoshooting",
        "description": "Service description"
      },
      {
        "image": "service3.jpg",
        "title": "Babybauch & Newborn",
        "description": "Service description"
      },
      {
        "image": "service4.jpg",
        "title": "Portraitfotografie",
        "description": "Service description"
      }
    ],
    "cta": {
      "text": "Jetzt anfragen",
      "link": "#"
    }
  }
}
```

### 11. about
Bio section with photo.

```json
{
  "type": "about",
  "content": {
    "backgroundColor": "#F5EDE0",
    "photo": "photographer.jpg",
    "greeting": "Willkommen bei",
    "name": "Dorett Dornbusch",
    "bio": "Ich bin Dorett (Fotografenmeisterin)...<br><br>Bio text with HTML support."
  }
}
```

### 12. gallery
Image slider with navigation arrows.

```json
{
  "type": "gallery",
  "content": {
    "backgroundColor": "#EEE3D0",
    "showArrows": true,
    "images": [
      { "src": "gallery1.jpg", "alt": "Familienfoto 1" },
      { "src": "gallery2.jpg", "alt": "Familienfoto 2" },
      { "src": "gallery3.jpg", "alt": "Familienfoto 3" }
    ]
  }
}
```

### 13. fullwidth-image
Full-width image or placeholder.

```json
{
  "type": "fullwidth-image",
  "content": {
    "src": "fullwidth.jpg",
    "alt": "Description",
    "backgroundColor": "#7F7F7F",
    "height": 656
  }
}
```

### 14. testimonials
Client reviews slider.

```json
{
  "type": "testimonials",
  "content": {
    "backgroundColor": "#EEE3D0",
    "title": "Was Eltern sagen",
    "showArrows": true,
    "items": [
      {
        "title": "Review Title",
        "text": "Review text",
        "author": "Familie Müller",
        "childAge": "3 Wochen"
      }
    ]
  }
}
```

**IMPORTANT**: Use `author`, NOT `name`!

### 15. footer
Google Maps embed.

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

**Default map**: Ansbach, Germany (49.3009, 10.5478)

### 16. legal-footer
Legal links and copyright.

```json
{
  "type": "legal-footer",
  "content": {
    "backgroundColor": "#F5EDE0",
    "links": [
      { "text": "Impressum", "href": "impressum.html" },
      { "text": "Datenschutz", "href": "datenschutz.html" }
    ],
    "copyright": "© 2025 Company. Alle Rechte vorbehalten."
  }
}
```

---

## Quiz Sections

### 17. quiz-header
Header for quiz pages.

```json
{
  "type": "quiz-header",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#3D3D3D",
    "logo": "Logo",
    "logoLink": "index.html",
    "progress": "Weiter zum Gutschein"
  }
}
```

### 18. quiz-question
Question with image options.

```json
{
  "type": "quiz-question",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "questionId": "q1",
    "question": "Kennst du mich bereits?",
    "optionsCount": "4",
    "options": [
      {
        "text": "Ja, vom Hören",
        "value": "vom_hoeren",
        "link": "quiz-2.html",
        "image": "option1.jpg"
      },
      {
        "text": "Ja, na klar!",
        "value": "na_klar",
        "link": "quiz-2.html",
        "image": "option2.jpg"
      },
      {
        "text": "Schon sehr lang",
        "value": "sehr_lang",
        "link": "quiz-2.html",
        "image": "option3.jpg",
        "multiline": false
      },
      {
        "text": "Nein, noch nicht",
        "value": "noch_nicht",
        "link": "quiz-2.html",
        "image": "option4.jpg"
      }
    ]
  }
}
```

### 19. quiz-form
Registration form.

```json
{
  "type": "quiz-form",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "subtitle": "Trage dich jetzt ein",
    "title": "Familien-Fotoshooting zu Weihnachten!",
    "deadline": "Diese Aktion gilt nur bis zum 06.12.25.",
    "namePlaceholder": "Dein Vor- und Nachname",
    "emailPlaceholder": "Deine E-Mail Adresse",
    "phonePlaceholder": "Deine Telefonnummer",
    "availabilityPlaceholder": "Wann seid ihr erreichbar",
    "availabilityOptions": [
      { "value": "morgens", "text": "Morgens (9-12 Uhr)" },
      { "value": "mittags", "text": "Mittags (12-15 Uhr)" }
    ],
    "privacyText": "Ich akzeptiere die",
    "privacyLinkText": "Datenschutzbestimmungen",
    "privacyLink": "datenschutz.html",
    "submitText": "Jetzt Gutschein sichern!",
    "sideImage": "sidebar.jpg",
    "sideText": "Privacy text",
    "importantTitle": "WICHTIG!",
    "importantText": "Important details text"
  }
}
```

### 20. thank-you-hero
Success page content.

```json
{
  "type": "thank-you-hero",
  "content": {
    "backgroundColor": "#F5EDE0",
    "textColor": "#000000",
    "title": "Herzlichen Glückwunsch!",
    "subtitle": "Deine Anfrage ist eingegangen!",
    "description": "<p>Wir melden uns bald.</p>",
    "image": "thankyou.jpg",
    "ctaPrimary": {
      "text": "Jetzt Termin wählen!",
      "link": "#calendar"
    },
    "additionalText": "Du kannst uns auch anrufen",
    "secondaryButtons": [
      { "text": "Jetzt anrufen", "link": "tel:+4912345678" },
      { "text": "Mail uns!", "link": "mailto:info@example.com" }
    ]
  }
}
```

### 21. author-footer
Author info with social links.

```json
{
  "type": "author-footer",
  "content": {
    "backgroundColor": "#EEE3D0",
    "textColor": "#000000",
    "accentColor": "#E2C08D",
    "name": "Yvonne Jadke – Fotograf Hannover",
    "specialization": "Familienfotos, Businessportraits",
    "description": "<p>Description with HTML</p>",
    "socialLinks": [
      { "type": "facebook", "link": "https://facebook.com/", "title": "Facebook" },
      { "type": "instagram", "link": "https://instagram.com/", "title": "Instagram" },
      { "type": "website", "link": "https://example.com/", "title": "Website" }
    ]
  }
}
```

---

## Typical Section Order

### Standard Landing Page
```
hero
promotional
features
gallery
benefits
process
fullwidth-image
faq
services
about
footer
legal-footer
```

### Quiz Landing Flow
```
Page: index.html
  hero, promotional, features, gallery, benefits, process,
  fullwidth-image, faq, services, about, footer, legal-footer

Page: quiz-1.html → quiz-4.html
  quiz-header, quiz-question, legal-footer

Page: quiz-form.html
  quiz-header, quiz-form, footer, legal-footer

Page: thank-you.html
  quiz-header, thank-you-hero, author-footer, footer, legal-footer
```

---

## Adding a New Section

1. Create folder: `sections/my-section/`

2. Create template `my-section.html`:
```html
<section class="my-section" style="background-color: {{backgroundColor}};">
  <div class="container">
    <h2 class="text-h2">{{title}}</h2>
    <p class="text-medium-small">{{description}}</p>
  </div>
</section>
```

3. Create styles `my-section.css`:
```css
.my-section {
  padding: 80px 0;
}

@media (max-width: 768px) {
  .my-section {
    padding: 40px 0;
  }
}
```

4. Create defaults `variables.json`:
```json
{
  "backgroundColor": "#F5EDE0",
  "title": "Default Title",
  "description": "Default description"
}
```

5. Use in config.json:
```json
{
  "type": "my-section",
  "content": {
    "title": "Custom Title"
  }
}
```

---

## Technical Info

- **Templating**: Handlebars 4.7.8
- **CSS Framework**: Bootstrap 5.3.2
- **Node.js**: Required for build
- **Browser Support**: All modern browsers

## Security Features

- HTML sanitization for user content
- URL validation (blocks javascript: etc.)
- Content Security Policy headers
- Path traversal protection
