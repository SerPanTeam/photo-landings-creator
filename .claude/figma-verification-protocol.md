# Протокол проверки соответствия Figma

**ОБЯЗАТЕЛЬНО читать перед любой работой с Figma!**

---

## Алгоритм проверки

### Шаг 1: Получить данные из Figma
```javascript
mcp__figma__get_design_context({ nodeId: "XXX:YYY" })
mcp__figma__get_screenshot({ nodeId: "XXX:YYY" })
mcp__figma__get_metadata({ nodeId: "XXX:YYY" })
```

### Шаг 2: Извлечь ВСЕ значения
- Позиции: `top`, `left`, `right`, `bottom`
- Размеры: `width`, `height`, `min-width`, `min-height`
- Цвета, шрифты, border-radius

### Шаг 3: Определить layout строк
**КЛЮЧЕВОЕ ПРАВИЛО:** Элементы с близкими Y-координатами (±50px) = одна строка в Bootstrap!

| Элемент | Y (top) | X (left) | Позиция |
|---------|---------|----------|---------|
| Title | 2984 | 102 | LEFT |
| Button | 3046 | 1018 | RIGHT |
| Subtitle | 3175 | 102 | LEFT |

→ Title и Button близки по Y → **одна строка**: текст слева, кнопка справа!

### Шаг 4: Сравнить с HTML
```bash
grep -A 30 'class="section-name' output.html | grep -E "col-|text-|row"
```

### Шаг 5: Исправить расхождения
1. Обновить config.json
2. Если нужно - обновить шаблон секции
3. Пересобрать: `node builder/builder.js landing-name`
4. Повторить проверку

---

## 1. ПОЗИЦИОНИРОВАНИЕ ЭЛЕМЕНТОВ

### Определение выравнивания по X
- `x ≈ 100-150` → LEFT aligned
- `x ≈ width/2` → CENTER aligned
- `x > width*0.6` → RIGHT aligned

### В HTML (Bootstrap)
- Left: без класса или `text-start`
- Center: `text-center`
- Right: `text-end`

### Частая ошибка: Вертикальный layout вместо горизонтального
```
НЕПРАВИЛЬНО:          ПРАВИЛЬНО (по Figma):
[Заголовок]           [Заголовок]
[Кнопка]              [Текст слева] [Кнопка справа]
[Текст]
```

**Решение:** Использовать `row` с `col-md-6` для элементов в одной строке.

---

## 2. РАЗМЕРЫ ЭЛЕМЕНТОВ

### Обязательно проверять
- [ ] **Button dimensions** - BOTH width AND height!
- [ ] **Image dimensions** - Exact width × height in pixels
- [ ] **Container min-height** - Section minimum heights

### Button Size Reference
| Context | Width | Height |
|---------|-------|--------|
| Hero CTA | 286px | 70px |
| Quiz option | **300px fixed** | 66px (or 92px multiline) |
| Outline button | auto | 60px |
| Process/Services CTA | auto | 70px |

### Image Overlap (Hero)
```css
/* Image 1 (larger, back): */
top: 80px;      /* NOT 0px! */
right: 0;
width: 428px;
height: 394px;
z-index: 1;

/* Image 2 (smaller, front, overlaps from bottom-left): */
top: 258px;     /* NOT 178px! */
right: 230px;   /* Overlaps from LEFT side */
width: 306px;
height: 290px;
z-index: 2;
```

---

## 3. BORDER-RADIUS Reference

| Element | Figma | CSS Value |
|---------|-------|-----------|
| **CTA Buttons** | **30px** | `border-radius: 30px` |
| **Quiz option buttons** | **bottom only** | `border-radius: 0 0 30px 30px` |
| **Quiz option images** | **top only** | `border-radius: 30px 30px 0 0` |
| **Form inputs** | **0 (square!)** | `border-radius: 0` |
| **Quiz/Thank-you sidebar** | **40px** | `border-radius: 40px` |
| Hero image | 50px | `border-radius: 50px` |
| Gallery images | 50px | `border-radius: 50px` |
| Benefits images | 35px | `border-radius: 35px` |
| Process cards | 20px | `border-radius: 20px` |
| Services images | 25px | `border-radius: 25px` |
| FAQ cards | 30px | `border-radius: 30px` |
| Fullwidth main image | 50px | `border-radius: 50px` |
| About photo | 30px | `border-radius: 30px` |

**КРИТИЧНО:**
- Quiz buttons: ТОЛЬКО нижние углы (`0 0 30px 30px`)
- Quiz images: ТОЛЬКО верхние углы (`30px 30px 0 0`)
- Form inputs: КВАДРАТНЫЕ, без border-radius!
- Quiz card: НЕТ gap между image и button

---

## 4. LINE DIVIDERS

Проверять ТОЧНУЮ позицию линий-разделителей:

| Section | Line Position |
|---------|---------------|
| promotional | BETWEEN `description` and `description2` |
| features | After description, BEFORE CTA |
| about | After name/title, BEFORE bio |
| benefits | Under each card title (built-in) |

**Ошибка:** Считать что линия всегда перед CTA. ПРОВЕРЯТЬ в Figma!

---

## 5. ИКОНКИ

```bash
# Скачивать из Figma MCP (localhost URLs)
curl -o assets/icons/icon-name.svg "http://localhost:3845/assets/xxx.svg"
curl -o assets/icons/icon-name.png "http://localhost:3845/assets/xxx.png"
```

- Хранятся в: `assets/icons/`
- Builder копирует в: `projects/<landing>/assets/icons/`
- **НИКОГДА не создавать иконки вручную** - только скачивать из Figma!

---

## 6. ЧЕК-ЛИСТ ПО СЕКЦИЯМ

### Hero / Hero-fullwidth
- [ ] Logo позиция
- [ ] Заголовок: выделенные слова (titleHighlight)
- [ ] Описание: форматирование (абзацы)
- [ ] CTA кнопка: текст, размер (286×70px)
- [ ] Изображения: размеры, позиции, overlap direction
- [ ] z-index order

### Promotional
- [ ] Центрирование текста
- [ ] Line divider: между description и description2?
- [ ] CTA: есть/нет, тип кнопки

### Features (КРИТИЧНО!)
- [ ] **ctaAfterTitle** - кнопка после заголовка в одной строке с description?
- [ ] centeredTitle + centeredTitleHighlight
- [ ] Позиция description относительно CTA
- [ ] Line divider позиция

### Benefits
- [ ] Layout: `3col` / `4col` / `2x2`
- [ ] cardStyle: `plain` / `boxed`
- [ ] Иконки: размеры (iconSize)

### Process
- [ ] Layout: `vertical` / `horizontal`
- [ ] cardStyle: `plain` / `boxed`
- [ ] CTA: есть/нет, позиция (`ctaCentered`)
- [ ] titleBackgroundColor (если отличается)

### Gallery
- [ ] Стрелки навигации (showArrows)
- [ ] Количество видимых изображений

### FAQ / FAQ-cards
- [ ] Layout: accordion / 2x2 grid
- [ ] Заголовок центрирован?

### Services
- [ ] Layout: `grid` / `flat`
- [ ] CTA: есть/нет, позиция (ctaCentered)

### About
- [ ] Фото: `left` / `right` (photoPosition)
- [ ] Линия-разделитель (hideLineDivider)

### Quiz sections
- [ ] Кнопки: фиксированная ширина 300px
- [ ] border-radius: только нижние углы
- [ ] Нет gap между image и button

---

## 7. COMMON MISTAKES

| Mistake | How to Fix |
|---------|------------|
| Only checking height, not width | Always verify BOTH dimensions |
| Assuming image positions | Extract `top`, `left` from Figma |
| Wrong overlap direction | Check z-index AND position |
| Elements vertical instead of horizontal | Check Y coordinates - similar Y = same row! |
| Missing section elements | Count ALL elements in Figma |
| Wrong field name in config | Match template `{{fieldName}}` EXACTLY |
| `subtitle` vs `description` | Hero uses `description`, NOT `subtitle` |
| `slogan` vs `tagline` | Use `tagline` + `taglineColor` |
| Quiz buttons different widths | Use fixed `width: 300px`, NOT `min-width` |
| Custom SVG instead of Figma | DOWNLOAD icons, don't create manually |
| Line divider wrong position | Check WHERE in Figma - between which elements? |
| Quiz buttons fully rounded | Only BOTTOM corners: `0 0 30px 30px` |
| Form inputs rounded | SQUARE, no border-radius! |
| Quiz card with gap | NO gap between image and button |

---

## 8. НАЙДЕННЫЕ И ИСПРАВЛЕННЫЕ ОШИБКИ

### 2026-01-09: Features секция - ctaAfterTitle (v2)

**Проблема:** Кнопка была под заголовком, а в Figma - справа от заголовка на одной строке.

**Figma координаты:**
- Title: y=2984, x=102 (left), height=166px → до y=3150
- Button: y=3046, x=1018 (right) ← **внутри высоты заголовка!**
- Description: y=3175, x=102 (left) ← ниже

**Ключевое наблюдение:** Кнопка (y=3046) находится ВНУТРИ вертикального диапазона заголовка (2984-3150), значит они на одной строке!

**Решение:** Опция `ctaAfterTitle: true` - кнопка РЯДОМ с заголовком:
```json
{
  "type": "features",
  "content": {
    "ctaAfterTitle": true,
    "centeredTitle": "...",
    "description": "...",
    "cta": { "text": "...", "isButton": true }
  }
}
```

**Результат:**
```
[centeredTitle - col-md-8] [CTA - col-md-4 справа]
[description - col-12]
```

**НЕ путать с:**
```
[centeredTitle - col-12]
[description - col-6] [CTA - col-6]  ← НЕПРАВИЛЬНО!
```

### 2026-01-09: Benefits - квадратные иконки

**Проблема:** Маленькие иконки (75×75px) были круглыми, а в Figma - квадратные.

**Причина:** CSS применяет `border-radius: 35px` по умолчанию (для обратной совместимости).

**Решение:** Для квадратных иконок добавить `imageBorderRadius: 0` в config:
```json
// Скруглённые углы (по умолчанию или явно)
{ "imageBorderRadius": 35 }

// Квадратные иконки
{ "iconSize": 75, "imageBorderRadius": 0 }
```

**Важно:** Добавлен helper `{{#ifDefined}}` в builder для корректной обработки значения 0.

### 2026-01-09: Services - layout flat vs cascade

**Проблема:** Картинки Services были "лесенкой" (cascade), а в Figma - на одном уровне.

**Figma координаты - проверить Y всех изображений:**
```
Image 1: top-[6148px]
Image 2: top-[6148px]  ← Все Y одинаковые = flat
Image 3: top-[6148px]
Image 4: top-[6148px]
```

**Решение:** Добавить `layout: "flat"` в config:
```json
{
  "type": "services",
  "content": {
    "layout": "flat"  // убирает лесенку
  }
}
```

**Варианты layout:**
- По умолчанию: cascade/лесенка (+26px, +56px, +86px)
- `"layout": "flat"`: все карточки на одном уровне

---

## 9. QUIZ BUTTONS CSS

```css
/* ALL quiz buttons MUST have SAME fixed width */
.quiz-question__option {
  flex: 0 0 300px;
  width: 300px;
  max-width: 300px;  /* Prevent expansion! */
  height: 66px;
  border-radius: 0 0 30px 30px;  /* Only bottom corners! */
}

/* Multiline buttons: same width, taller height */
.quiz-question__option--multiline {
  height: 92px;
}
```

---

## Принципы

1. **Всегда проверять X/Y координаты** - не доверять визуальному сравнению
2. **Элементы с близкими Y = одна строка** в Bootstrap
3. **При сомнениях - смотреть metadata**, не только screenshot
4. **После исправлений - пересобрать и проверить снова**
5. **Документировать найденные ошибки** в секции 8 этого файла
