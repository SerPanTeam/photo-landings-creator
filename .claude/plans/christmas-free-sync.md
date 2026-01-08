# План синхронизации christmas-free с Figma

## Страницы и их Figma Node IDs

| Страница | Figma Node | Статус |
|----------|------------|--------|
| index.html | 233:22 | Проверить |
| quiz-1.html | 313:26 | ❌ Расхождения |
| quiz-2.html | 313:82 | ❌ ПОЛНАЯ ЗАМЕНА |
| quiz-3.html | 313:47 | ❌ ПОЛНАЯ ЗАМЕНА |
| quiz-4.html | 313:68 | ❌ ПОЛНАЯ ЗАМЕНА |
| quiz-form.html | 313:100 | ❌ Расхождения |
| thank-you.html | 313:135 | ❌ Расхождения |

---

## КРИТИЧЕСКИЕ РАСХОЖДЕНИЯ

### Quiz Flow - ПОЛНОСТЬЮ ДРУГОЙ!

Текущий config использует quiz flow от **family-quiz** (Yvonne Jadke), а Figma показывает **другой quiz flow** для christmas-free (Jenni/Kameramädle).

| Страница | Figma (christmas-free) | Config (скопирован из family-quiz) |
|----------|------------------------|-------------------------------------|
| quiz-1 | "Kennst du mich bereits?" | "Kennst du mich bereits?" ✅ |
| quiz-2 | "Gibt es bei euch auch tierische Familienmitglieder?" | "Welches Bild gefällt dir am Besten?" ❌ |
| quiz-3 | "Wie groß ist eure Familie?" | "Schon mal ein Familien-Fotoshooting gehabt?" ❌ |
| quiz-4 | "Schon mal ein Familien-Fotoshooting gehabt?" | "Wer wird mit dabei sein?" ❌ |

---

## Детальное сравнение по страницам

### 1. quiz-1.html (Figma: 313:26)

**Figma:**
- Header: "Logo"
- Progress: **"3 Fragen bis zum Gutschein"**
- Question: "Kennst du mich bereits?"
- 4 варианта: "Ja, vom Hören", "Ja, na klar!", "Schon sehr lang", "Nein, noch nicht"

**Наш config:**
- Progress: **"Weiter zum Gutschein"** ❌

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| progress | "3 Fragen bis zum Gutschein" | "Weiter zum Gutschein" | **ИЗМЕНИТЬ** |
| question | ✅ | ✅ | - |
| options | ✅ | ✅ | - |

---

### 2. quiz-2.html (Figma: 313:82) - ПОЛНАЯ ЗАМЕНА!

**Figma:**
- Progress: **"2 Fragen bis zum Gutschein"**
- Question: **"Gibt es bei euch auch tierische Familienmitglieder?"**
- **3 варианта**:
  1. "Ja, unbedingt!"
  2. "Nein"
  3. "Vielleicht – sind noch unsicher" (multiline)

**Наш config:**
- Progress: "4 Fragen bis zum Gutschein"
- Question: "Welches Bild gefällt dir am Besten?"
- **4 варианта**: "1", "2", "3", "4"

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| progress | "2 Fragen bis zum Gutschein" | "4 Fragen bis zum Gutschein" | **ИЗМЕНИТЬ** |
| question | "Gibt es bei euch auch tierische Familienmitglieder?" | "Welches Bild gefällt dir am Besten?" | **ИЗМЕНИТЬ** |
| optionsCount | 3 | 4 | **ИЗМЕНИТЬ** |
| options[0] | "Ja, unbedingt!" | "1" | **ИЗМЕНИТЬ** |
| options[1] | "Nein" | "2" | **ИЗМЕНИТЬ** |
| options[2] | "Vielleicht – sind noch unsicher" | "3" | **ИЗМЕНИТЬ** |
| options[3] | (нет) | "4" | **УДАЛИТЬ** |

---

### 3. quiz-3.html (Figma: 313:47) - ПОЛНАЯ ЗАМЕНА!

**Figma:**
- Progress: **"1 Fragen bis zum Gutschein"**
- Question: **"Wie groß ist eure Familie?"**
- **4 варианта**:
  1. "2 Personen"
  2. "3–4 Personen"
  3. "5 oder mehr Personen"
  4. "Noch unklar – wir entscheiden spontan" (multiline)

**Наш config:**
- Progress: "3 Fragen bis zum Gutschein"
- Question: "Schon mal ein Familien-Fotoshooting gehabt?"
- **2 варианта**: "Ja, das war der Hammer!", "Nein, bisher noch nicht!"

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| progress | "1 Fragen bis zum Gutschein" | "3 Fragen bis zum Gutschein" | **ИЗМЕНИТЬ** |
| question | "Wie groß ist eure Familie?" | "Schon mal ein Familien-Fotoshooting gehabt?" | **ИЗМЕНИТЬ** |
| optionsCount | 4 | 2 | **ИЗМЕНИТЬ** |
| options | Полностью другие | Полностью другие | **ЗАМЕНИТЬ ВСЁ** |

---

### 4. quiz-4.html (Figma: 313:68) - ПОЛНАЯ ЗАМЕНА!

**Figma:**
- Progress: **"Fast geschafft!"**
- Question: **"Schon mal ein Familien - Fotoshooting gehabt?"**
- **2 варианта**:
  1. "Ja, das war der Hammer!"
  2. "Nein, bisher noch nicht!"

**Наш config:**
- Progress: "2 Fragen bis zum Gutschein"
- Question: "Wer wird mit dabei sein?"
- **3 варианта**: "Nur wir als Elternpaar", "Eltern und die Kinder", "Wir nehmen auch unser Haustier mit"

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| progress | "Fast geschafft!" | "2 Fragen bis zum Gutschein" | **ИЗМЕНИТЬ** |
| question | "Schon mal ein Familien - Fotoshooting gehabt?" | "Wer wird mit dabei sein?" | **ИЗМЕНИТЬ** |
| optionsCount | 2 | 3 | **ИЗМЕНИТЬ** |
| options | Полностью другие | Полностью другие | **ЗАМЕНИТЬ ВСЁ** |

---

### 5. quiz-form.html (Figma: 313:100)

**Figma:**
- Progress: "Klasse, jetzt zum Gutschein" ✅
- Title: **"Special-Gutschein:\nFamilien-Fotoshooting\nKOSTENLOS"** (3 строки, 28px Bold)
- Subtitle: **"Nur für kurze Zeit"**
- Button: **"Sende mir den Gutschein zu!"**
- Privacy: "Ich akzeptiere die Datenschutzbestimmungen" ✅
- Side text: "Deine Sicherheit ist unser größtes Anliegen – Vertraue uns und schütze deine Privatsphäre!"
- **НЕТ блока WICHTIG!**
- **НЕТ deadline текста!**

**Наш config:**
- Title: "Kostenloses Familien-Fotoshooting zu Weihnachten!"
- Subtitle: "Trage dich jetzt ein und sichere dir dein Platz für ein"
- Button: "Jetzt kostenloses Shooting sichern!"
- Deadline: "Die kostenlosen Fotoshootings sind nur bis zum 20.11.25 verfügbar."
- WICHTIG блок: есть

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| title | "Special-Gutschein:\nFamilien-Fotoshooting\nKOSTENLOS" | "Kostenloses Familien-Fotoshooting zu Weihnachten!" | **ИЗМЕНИТЬ** |
| subtitle | "Nur für kurze Zeit" | "Trage dich jetzt ein..." | **ИЗМЕНИТЬ** |
| submitText | "Sende mir den Gutschein zu!" | "Jetzt kostenloses Shooting sichern!" | **ИЗМЕНИТЬ** |
| sideText | "Deine Sicherheit ist unser größtes Anliegen – Vertraue uns und schütze deine Privatsphäre!" | "Deine Privatsphäre ist bei mir sicher..." | **ИЗМЕНИТЬ** |
| deadline | (нет) | есть | **УДАЛИТЬ** |
| importantTitle | (нет) | есть | **УДАЛИТЬ** |
| importantText | (нет) | есть | **УДАЛИТЬ** |

---

### 6. thank-you.html (Figma: 313:135)

**Figma:**
- Title: "Herzlichen Glückwunsch!" ✅
- Subtitle: "Deine Anfrage ist bei uns eingegangen!" ✅
- Description: ✅
- CTA Primary: "Jetzt Termin wählen & sichern!" ✅
- Additional text: ✅
- Secondary buttons: "Jetzt anrufen", "Mail uns!" ✅
- Author name: **"Yvonne Jadke – Fotograf Hannover"**
- Specialization: **"Familienfotos, Businessportraits & Hochzeitsfotografie"**

**Наш config:**
- Author name: "Jenni – dein Kameramädle"
- Specialization: "Familienfotos, Kinderfotos & Weihnachtsfotografie"

| Элемент | Figma | Config | Действие |
|---------|-------|--------|----------|
| author-footer.name | "Yvonne Jadke – Fotograf Hannover" | "Jenni – dein Kameramädle" | **ИЗМЕНИТЬ** |
| author-footer.specialization | "Familienfotos, Businessportraits & Hochzeitsfotografie" | "Familienfotos, Kinderfotos & Weihnachtsfotografie" | **ИЗМЕНИТЬ** |
| author-footer.description | О Yvonne Jadke | О Jenni | **ИЗМЕНИТЬ** |

---

## Итог расхождений

### ❌ Критические (ПОЛНАЯ ЗАМЕНА):
1. **quiz-2.html** - другой вопрос, другие варианты, другое количество
2. **quiz-3.html** - другой вопрос, другие варианты, другое количество
3. **quiz-4.html** - другой вопрос, другие варианты, другое количество

### ⚠️ Значительные:
4. **quiz-1.html** - progress text
5. **quiz-form.html** - title, subtitle, button, удалить deadline и WICHTIG блоки
6. **thank-you.html** - author name и specialization (Yvonne vs Jenni)

### ✅ Соответствует:
- index.html - структура совпадает (нужно проверить детали)

---

## План исправлений

### Порядок внесения изменений:

1. **quiz-1.html**
   - `progress`: "Weiter zum Gutschein" → "3 Fragen bis zum Gutschein"

2. **quiz-2.html** - ПОЛНАЯ ЗАМЕНА
   - `progress`: → "2 Fragen bis zum Gutschein"
   - `question`: → "Gibt es bei euch auch tierische Familienmitglieder?"
   - `optionsCount`: 4 → 3
   - `options`: заменить все 3 варианта

3. **quiz-3.html** - ПОЛНАЯ ЗАМЕНА
   - `progress`: → "1 Fragen bis zum Gutschein"
   - `question`: → "Wie groß ist eure Familie?"
   - `optionsCount`: 2 → 4
   - `options`: заменить все 4 варианта

4. **quiz-4.html** - ПОЛНАЯ ЗАМЕНА
   - `progress`: → "Fast geschafft!"
   - `question`: → "Schon mal ein Familien - Fotoshooting gehabt?"
   - `optionsCount`: 3 → 2
   - `options`: заменить 2 варианта

5. **quiz-form.html**
   - `subtitle`: → "Nur für kurze Zeit"
   - `title`: → "Special-Gutschein:\nFamilien-Fotoshooting\nKOSTENLOS"
   - `submitText`: → "Sende mir den Gutschein zu!"
   - `sideText`: → "Deine Sicherheit ist unser größtes Anliegen – Vertraue uns und schütze deine Privatsphäre!"
   - Удалить: `deadline`, `importantTitle`, `importantText`

6. **thank-you.html**
   - `author-footer.name`: → "Yvonne Jadke – Fotograf Hannover"
   - `author-footer.specialization`: → "Familienfotos, Businessportraits & Hochzeitsfotografie"
   - `author-footer.description`: → текст про Yvonne Jadke

---

## ВОПРОС К ЗАКАЗЧИКУ

**Кто является фотографом для christmas-free лендинга?**

- **Figma показывает:** Yvonne Jadke – Fotograf Hannover
- **Config сейчас:** Jenni – dein Kameramädle (Aalen)

Это разные фотографы с разными городами. Нужно уточнить:
1. Должен ли christmas-free использовать данные Yvonne Jadke (как в Figma)?
2. Или оставить Jenni (как сейчас в config)?

Также нужно обновить:
- Контактные данные (телефон, email)
- Ссылки на социальные сети
- Координаты карты (Hannover vs Aalen)
