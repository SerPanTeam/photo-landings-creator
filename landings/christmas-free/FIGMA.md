# Christmas Free - Figma Reference

## Figma File
**URL**: https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/

## Pages & Node IDs

| Page | File | Figma Node ID | Figma URL |
|------|------|---------------|-----------|
| Главная | `index.html` | `233-22` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=233-22&m=dev) |
| Quiz 1 | `quiz-1.html` | `137-51` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-51&m=dev) |
| Quiz 2 | `quiz-2.html` | `137-159` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-159&m=dev) |
| Quiz 3 | `quiz-3.html` | `137-71` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-71&m=dev) |
| Quiz 4 | `quiz-4.html` | `137-179` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-179&m=dev) |
| Quiz Form | `quiz-form.html` | `137-111` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-111&m=dev) |
| Thank You | `thank-you.html` | `137-84` | [Open](https://www.figma.com/design/Z3oVQjpn1llrZnkIFL5MGW/?node-id=137-84&m=dev) |

## User Flow

```
index.html (Kostenloses Fotoshooting)
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

### index.html (DIFFERENT from family-quiz!)
1. hero (with "Kostenloses" highlight in gold)
2. promotional (with "Warum kostenlos?" section)
3. features (with different tagline)
4. gallery
5. benefits ("Was dich erwartet" - WITH title!)
6. process (with PRIMARY CTA button 476x71 at bottom)
7. fullwidth-image
8. faq (4 questions - different content)
9. services ("Rund ums Jahr..." - different content)
10. about ("Hi, ich bin Jenni" - different person)
11. footer
12. legal-footer

### quiz-*.html (same as family-quiz)
1. quiz-header
2. quiz-question
3. legal-footer

### quiz-form.html (same as family-quiz)
1. quiz-header
2. quiz-form
3. footer
4. legal-footer

### thank-you.html (same as family-quiz)
1. quiz-header
2. thank-you-hero
3. author-footer
4. footer
5. legal-footer

## Key Differences from family-quiz

| Element | family-quiz | christmas-free |
|---------|-------------|----------------|
| Hero title | "Hello, i am a photographer" | "Kostenloses Familien und Kinder- Fotoshooting!" |
| Hero highlight | None | "Kostenloses" in gold #E2C08D |
| Promotional | "Weihnachts-Fotoshooting-Aktion" | "Liebe Familien, aufgepasst!" + "Warum kostenlos?" |
| Promotional line | After all text | BETWEEN description and description2 |
| Benefits title | (none) | "Was dich erwartet" |
| Process button | OUTLINE style (right) | **PRIMARY gold button 476x71 (centered)** |
| FAQ questions | 5 questions | 4 questions |
| About person | "Dorett Dornbusch" | "Jenni - dein Kameramädle" |
| About greeting | "Willkommen bei" | (empty - full title in name) |
| Services title | Different | "Rund ums Jahr warten spannende..." |
| Services last item | With description | "Und vieles mehr!" (NO description) |

## Design Tokens

- **Primary BG**: #F5EDE0
- **Secondary BG**: #EEE3D0
- **Accent**: #E2C08D
- **Text**: #3D3D3D / #000000
- **Font**: Inter (500 Medium, 700 Bold)

## Verified Elements (2026-01-05) ✅ ПОЛНАЯ ВЕРИФИКАЦИЯ

### Hero Section (233:138) ✅
- [x] Image 1: top=80px, right=0, 428x394px, z-index=1
- [x] Image 2: top=258px, right=230px, 306x290px, z-index=2
- [x] Button: 286x70px (btn-primary-custom)
- [x] Title highlight "Kostenloses" in #E2C08D
- [x] Description with bold "Familienbilder" and "Weihnachtsgeschenk"

### Promotional Section (233:137) ✅
- [x] Title: "Liebe Familien, aufgepasst!"
- [x] description: Текст до линии (Weihnachts-Familien-Fotoshooting bold)
- [x] **Линия-разделитель**: МЕЖДУ description и description2
- [x] description2: "Warum kostenlos?" + explanation
- [x] CTA со стрелкой

### Features Section (233:139) ✅
- [x] Title: "Für die schönsten Erinnerungen mit deinen Liebsten!"
- [x] Subtitle italic
- [x] Линия-разделитель перед CTA
- [x] Tagline: "Familienmomente, die das Herz berühren" в #E2C08D

### Gallery Section (233:140) ✅
- [x] 6 images slider
- [x] Arrows navigation

### Benefits Section (233:141) ✅
- [x] **Заголовок "Was dich erwartet"** (h2, text-h2)
- [x] 3 карточки с иконками 150x150
- [x] Линии под заголовками карточек
- [x] Тексты карточек сверены

### Process Section (233:142) ✅
- [x] Title: "Wie genau komme ich zum kostenlosen Fotoshooting?"
- [x] 4 шага с иконками 76x75
- [x] Линии под каждым шагом
- [x] **ctaCentered: true** → PRIMARY кнопка по центру
- [x] **PRIMARY CTA button: 476x71px** (btn-primary-custom с min-width/min-height)

### Fullwidth Image ✅
- [x] Height: 656px
- [x] Background: #7F7F7F

### FAQ Section (233:143) ✅
- [x] Title: "Häufige Fragen zum Fotoshooting"
- [x] **4 вопроса** (последние 2 дубликаты - так в Figma!)
- [x] Accordion с +/- иконками

### Services Section (233:144) ✅
- [x] Title: "Rund ums Jahr warten spannende Fotoshooting-Aktionen auf dich."
- [x] 4 карточки (последняя "Und vieles mehr!" БЕЗ описания)
- [x] Outline кнопка

### About Section (233:145) ✅
- [x] **greeting: ""** (пустой!)
- [x] **name: "Hi, ich bin Jenni – dein Kameramädle!"** (весь заголовок)
- [x] Линия-разделитель после name, перед bio
- [x] Bio текст сверен

### Quiz Pages ✅
- [x] Quiz-1 (137:51): 4 опции, `--4` класс, space-between
- [x] Quiz-2 (137:159): 4 опции, `--4` класс, простые цифры
- [x] Quiz-3 (137:71): 2 опции, `--2` класс, center
- [x] Quiz-4 (137:179): 3 опции, `--3` класс, center, multiline на последней
- [x] **FIX**: Горизонтальный скролл исправлен (calc вместо fixed 300px)

### Quiz Form (137:111) ✅
- [x] Форма слева: Name, Email, Phone, Availability
- [x] Checkbox Datenschutz
- [x] Button "Jetzt kostenloses Shooting sichern!"
- [x] Справа: изображение + WICHTIG блок

### Thank You (137:84) ✅
- [x] Title: "Herzlichen Glückwunsch!"
- [x] Primary CTA: "Jetzt Termin wählen & sichern!"
- [x] Secondary buttons: "Jetzt anrufen", "Mail uns!"
- [x] Author footer: "Jenni – dein Kameramädle"
- [x] Social icons: Facebook, Instagram, Website

## Build Command

```bash
node builder/builder.js christmas-free
```

Output: `projects/christmas-free/`
