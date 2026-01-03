# Family Quiz - Figma Reference

## Figma File
**URL**: https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/

## Pages & Node IDs

| Page | File | Figma Node ID | Figma URL |
|------|------|---------------|-----------|
| Главная | `index.html` | `1-3` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=1-3&m=dev) |
| Quiz 1 | `quiz-1.html` | `137-51` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-51&m=dev) |
| Quiz 2 | `quiz-2.html` | `137-159` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-159&m=dev) |
| Quiz 3 | `quiz-3.html` | `137-71` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-71&m=dev) |
| Quiz 4 | `quiz-4.html` | `137-179` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-179&m=dev) |
| Quiz Form | `quiz-form.html` | `137-111` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-111&m=dev) |
| Thank You | `thank-you.html` | `137-84` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-84&m=dev) |

## User Flow

```
index.html (Главная)
    │
    └──> quiz-1.html (Kennst du mich bereits?)
            │
            └──> quiz-2.html (Welches Bild gefällt dir?)
                    │
                    └──> quiz-3.html (Familien-Fotoshooting Erfahrung?)
                            │
                            └──> quiz-4.html (Wer wird dabei sein?)
                                    │
                                    └──> quiz-form.html (Anmeldung)
                                            │
                                            └──> thank-you.html (Erfolg)
```

## Sections Used

### index.html
1. hero
2. promotional
3. features
4. benefits
5. process
6. faq
7. services
8. about
9. footer
10. legal-footer

### quiz-*.html (all quiz pages)
1. quiz-header
2. quiz-question
3. legal-footer

### quiz-form.html
1. quiz-header
2. quiz-form
3. footer
4. legal-footer

### thank-you.html
1. quiz-header
2. thank-you-hero
3. author-footer
4. footer
5. legal-footer

## Design Tokens

- **Primary BG**: #F5EDE0
- **Secondary BG**: #EEE3D0
- **Accent**: #E2C08D
- **Text**: #3D3D3D / #000000
- **Font**: Inter (500 Medium, 700 Bold)

## Comparison Status (2026-01-03)

| Page | Status | Notes |
|------|--------|-------|
| index.html | ✅ Verified | Added gallery + fullwidth-image sections |
| quiz-1.html | ✅ Verified | Matches Figma |
| quiz-2.html | ✅ Verified | Matches Figma |
| quiz-3.html | ✅ Verified | Matches Figma |
| quiz-4.html | ✅ Verified | Matches Figma |
| quiz-form.html | ✅ Verified | Matches Figma |
| thank-you.html | ✅ Verified | Matches Figma |

## Build Command

```bash
node builder/builder.js family-quiz
```

Output: `projects/family-quiz/`
