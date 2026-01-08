# Christmas Free - Figma Reference

## Figma File
**URL**: https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/

## Pages & Node IDs

| Page | File | Figma Node ID | Figma URL |
|------|------|---------------|-----------|
| Главная | `index.html` | `233-22` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=233-22&m=dev) |
| Quiz 1 | `quiz-1.html` | `313-26` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-26&m=dev) |
| Quiz 2 | `quiz-2.html` | `313-82` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-82&m=dev) |
| Quiz 3 | `quiz-3.html` | `313-47` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-47&m=dev) |
| Quiz 4 | `quiz-4.html` | `313-68` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-68&m=dev) |
| Quiz Form | `quiz-form.html` | `313-100` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-100&m=dev) |
| Thank You | `thank-you.html` | `313-135` | [Open](https://www.figma.com/design/DjKTrzgiaX1i8Ug47Xm8WD/?node-id=313-135&m=dev) |

## User Flow

```
index.html (Kostenloses Fotoshooting)
    │
    └──> quiz-1.html (Kennst du mich bereits?)
            │ 4 варианта: "Ja, vom Hören", "Ja, na klar!", "Schon sehr lang", "Nein, noch nicht"
            │
            └──> quiz-2.html (Gibt es bei euch auch tierische Familienmitglieder?)
                    │ 3 варианта: "Ja, unbedingt!", "Nein", "Vielleicht – sind noch unsicher"
                    │
                    └──> quiz-3.html (Wie groß ist eure Familie?)
                            │ 4 варианта: "2 Personen", "3–4 Personen", "5 oder mehr", "Noch unklar"
                            │
                            └──> quiz-4.html (Schon mal ein Familien-Fotoshooting gehabt?)
                                    │ 2 варианта: "Ja, das war der Hammer!", "Nein, bisher noch nicht!"
                                    │
                                    └──> quiz-form.html (Special-Gutschein)
                                            │
                                            └──> thank-you.html (Herzlichen Glückwunsch!)
```

## Quiz Progress Text

| Page | Progress Text |
|------|---------------|
| quiz-1 | "3 Fragen bis zum Gutschein" |
| quiz-2 | "2 Fragen bis zum Gutschein" |
| quiz-3 | "1 Fragen bis zum Gutschein" |
| quiz-4 | "Fast geschafft!" |
| quiz-form | "Klasse, jetzt zum Gutschein" |

## Sections Used

### index.html
1. hero (with "Kostenloses" highlight in gold)
2. promotional (with "Warum kostenlos?" section)
3. features (with different tagline)
4. gallery
5. benefits ("Was dich erwartet" - WITH title!)
6. process (with PRIMARY CTA button centered)
7. fullwidth-image
8. faq (4 questions)
9. services ("Rund ums Jahr...")
10. about ("Hi, ich bin Yvonne Jadke – Fotograf Hannover!")
11. footer (Hannover map)
12. legal-footer

### quiz-*.html (all quiz pages)
1. quiz-header
2. quiz-question
3. legal-footer

### quiz-form.html
1. quiz-header
2. quiz-form (Special-Gutschein: KOSTENLOS)
3. footer (Hannover map)
4. legal-footer

### thank-you.html
1. quiz-header
2. thank-you-hero
3. author-footer (Yvonne Jadke – Fotograf Hannover)
4. footer (Hannover map)
5. legal-footer

## Design Tokens

- **Primary BG**: #F5EDE0
- **Secondary BG**: #EEE3D0
- **Accent**: #E2C08D
- **Text**: #3D3D3D / #000000
- **Font**: Inter (500 Medium, 700 Bold)

## Photographer Info

- **Name**: Yvonne Jadke
- **Location**: Hannover
- **Specialization**: Familienfotos, Businessportraits & Hochzeitsfotografie

## Key Differences from family-quiz

| Element | family-quiz | christmas-free |
|---------|-------------|----------------|
| Figma File | Z3oVQjpn1llrZnkIFL5MGW | DjKTrzgiaX1i8Ug47Xm8WD |
| Quiz-2 question | "Welches Bild gefällt dir?" (4 opts) | "Gibt es tierische Familienmitglieder?" (3 opts) |
| Quiz-3 question | "Familien-Fotoshooting gehabt?" (2 opts) | "Wie groß ist eure Familie?" (4 opts) |
| Quiz-4 question | "Wer wird dabei sein?" (3 opts) | "Familien-Fotoshooting gehabt?" (2 opts) |
| Quiz-4 progress | "2 Fragen bis zum Gutschein" | "Fast geschafft!" |
| Quiz-form title | "Familien-Fotoshooting zu Weihnachten!" | "Special-Gutschein: KOSTENLOS" |
| Quiz-form blocks | Has deadline + WICHTIG | No deadline, no WICHTIG |
| About person | "Dorett Dornbusch" | "Yvonne Jadke – Fotograf Hannover" |
| Map location | Ansbach | Hannover |

## Verified (2026-01-08)

- [x] All 7 pages synced with Figma
- [x] Quiz flow matches Figma exactly
- [x] Progress texts updated
- [x] Quiz-form simplified (no deadline/WICHTIG)
- [x] Author footer: Yvonne Jadke
- [x] Maps: Hannover
- [x] Images: Unsplash family/Christmas themed

## Build Command

```bash
node builder/builder.js christmas-free
```

Output: `projects/christmas-free/`
