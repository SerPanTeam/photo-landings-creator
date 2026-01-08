# Hunde-Fotoshooting - Figma Reference

## Figma File
**URL**: https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/

## Pages & Node IDs

| Page | File | Figma Node ID | Figma URL |
|------|------|---------------|-----------|
| Hauptseite | `index.html` | `369-256` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=369-256&m=dev) |
| Quiz 1 | `quiz-1.html` | `370-441` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-441&m=dev) |
| Quiz 2 | `quiz-2.html` | `370-460` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-460&m=dev) |
| Quiz 3 | `quiz-3.html` | `370-479` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-479&m=dev) |
| Quiz 4 | `quiz-4.html` | `370-503` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-503&m=dev) |
| Quiz Form | `quiz-form.html` | `370-526` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-526&m=dev) |
| Thank You | `thank-you.html` | `370-560` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=370-560&m=dev) |

## User Flow

```
index.html (Kostenloses Hunde-Fotoshooting)
    │
    └──> quiz-1.html (Kennst du mich bereits?)
            │ 3 Optionen: "Ja, na klar!", "Ja, vom Hören", "Nein, noch nicht"
            │
            └──> quiz-2.html (Wer wird mit dabei sein?)
                    │ 3 Optionen: "Mein pelziger Freund", "Meine pelzige Freunde", "Die ganze Familie"
                    │
                    └──> quiz-3.html (Wie alt ist dein Hund?)
                            │ 4 Optionen: "Unter 1 Jahr", "1–3 Jahre", "4–7 Jahre", "Über 7 Jahre"
                            │
                            └──> quiz-4.html (Welche Eigenschaften beschreiben deinen Hund?)
                                    │ 4 Optionen (multiline): "Ruhig und gelassen", "Verspielt und energiegeladen",
                                    │                         "Schüchtern oder ängstlich", "Neugierig und aufgeschlossen"
                                    │
                                    └──> quiz-form.html (kostenloses Hunde-Fotoshooting)
                                            │
                                            └──> thank-you.html (Herzlichen Glückwunsch!)
```

## Quiz Progress Text

| Page | Progress Text |
|------|---------------|
| quiz-1 | "Weiter zum Gutschein" |
| quiz-2 | "Noch 3 Fragen bis zum Gutschein" |
| quiz-3 | "Noch 2 Fragen bis zum Gutschein" |
| quiz-4 | "Noch 1 Fragen bis zum Gutschein" |
| quiz-form | "Klasse, jetzt zum Gutschein" |

## Sections Used

### index.html
1. hero (with "Kostenloses" highlight in gold)
2. promotional ("Warum kostenlos?")
3. benefits (3 cards - Hunde-Fotoshooting descriptions)
4. gallery
5. features (CTA block - "Sichert euch jetzt einen Gutschein...")
6. process (4 steps)
7. benefits (4 icons - advantages)
8. fullwidth-image
9. faq-cards (4 questions)
10. services (4 cards)
11. about ("Willkommen bei Möst Fotografie" - Maren Möst)
12. footer (Ansbach map)
13. legal-footer (3 links)

### quiz-*.html (all quiz pages)
1. quiz-header
2. quiz-question
3. legal-footer

### quiz-form.html
1. quiz-header
2. quiz-form (kostenloses Hunde-Fotoshooting)
3. footer (Ansbach map)
4. legal-footer

### thank-you.html
1. quiz-header
2. thank-you-hero
3. author-footer (placeholder data)
4. footer (Ansbach map)
5. legal-footer

## Design Tokens

- **Primary BG**: #F5EDE0
- **Secondary BG**: #EEE3D0
- **Accent**: #E2C08D
- **Text**: #3D3D3D / #000000
- **Font**: Inter (500 Medium, 700 Bold)

## Photographer Info (from Figma)

- **About Section**: Maren Möst – Möst Fotografie
- **Thank-you**: Yvonne Jadke – Fotograf Hannover (placeholder)
- **Location**: Ansbach (default)

## Build Command

```bash
node builder/builder.js hunde-fotoshooting
```

Output: `projects/hunde-fotoshooting/`
