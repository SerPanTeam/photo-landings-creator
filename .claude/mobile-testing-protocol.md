# Протокол тестирования мобильных версий

**ОБЯЗАТЕЛЬНО запускать перед финальной сдачей лендинга!**

---

## Быстрый старт

```bash
# Запустить тест мобильных версий
node tools/mobile-test.js <landing-name>

# Пример
node tools/mobile-test.js hunde-fotoshooting

# Тест конкретной страницы
node tools/mobile-test.js hunde-fotoshooting quiz-1.html
```

**Результат:** `tests/mobile/<landing>/<timestamp>/report.html`

---

## Тестируемые разрешения

### Мобильные устройства (Portrait)
| Устройство | Разрешение | Breakpoint |
|------------|------------|------------|
| iPhone SE | 375 x 667 | < 576px |
| iPhone 12/13/14 | 390 x 844 | < 576px |
| iPhone 14 Pro Max | 430 x 932 | < 576px |
| Android Small | 360 x 800 | < 576px |
| Android Large | 412 x 915 | < 576px |

### Планшеты
| Устройство | Разрешение | Breakpoint |
|------------|------------|------------|
| iPad Mini | 768 x 1024 | 768px - 991px |
| iPad Pro | 1024 x 1366 | 992px - 1199px |

### Desktop
| Устройство | Разрешение | Breakpoint |
|------------|------------|------------|
| Desktop HD | 1440 x 900 | >= 1200px |
| Desktop Full HD | 1920 x 1080 | >= 1200px |

---

## Bootstrap Breakpoints

```css
/* Extra small (xs) - Mobile */
@media (max-width: 575.98px) { }

/* Small (sm) - Large phones */
@media (min-width: 576px) and (max-width: 767.98px) { }

/* Medium (md) - Tablets */
@media (min-width: 768px) and (max-width: 991.98px) { }

/* Large (lg) - Small desktops */
@media (min-width: 992px) and (max-width: 1199.98px) { }

/* Extra large (xl) - Desktops */
@media (min-width: 1200px) { }
```

---

## Чеклист проверки

### 1. Горизонтальный скролл
- [ ] **НЕ должно быть горизонтального скролла** на любом разрешении
- Если есть скролл → проверить `overflow-x: hidden` на body
- Найти элемент с `width > 100vw`

### 2. Изображения
- [ ] Все изображения **на полную ширину** на мобильных (< 768px)
- [ ] Изображения **не обрезаны** и не искажены
- [ ] `object-fit: cover` для сохранения пропорций
- [ ] `border-radius` уменьшен на мобильных (10-15px вместо 50px)

### 3. Текст
- [ ] Текст **на полную ширину** (минимальные отступы container)
- [ ] Шрифты **читаемые** без зума (min 16px для body)
- [ ] Заголовки уменьшены пропорционально

### 4. Кнопки
- [ ] Кнопки **на полную ширину** на мобильных
- [ ] Минимальная высота **44px** (touch target)
- [ ] Текст кнопки **не обрезан**

### 5. Формы
- [ ] Input поля **на полную ширину**
- [ ] Достаточный размер для тапа
- [ ] Плейсхолдеры видны

### 6. Layout
- [ ] Колонки **стекаются вертикально** на мобильных
- [ ] Правильный порядок элементов при стеке
- [ ] Нет перекрытий элементов

### 7. Spacing
- [ ] Отступы **уменьшены** на мобильных
- [ ] Достаточное расстояние между элементами
- [ ] Нет слипания элементов

---

## Типичные проблемы и решения

### Проблема: Горизонтальный скролл

**Причины:**
1. Элемент с фиксированной шириной > viewport
2. Padding/margin выходит за границы
3. Inline стили переопределяют CSS

**Решение:**
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

.element {
  max-width: 100%;
  box-sizing: border-box;
}
```

### Проблема: Изображения не на полную ширину

**Причины:**
1. Inline `width` и `height` атрибуты
2. `max-width` ограничивает размер
3. CSS не использует `!important`

**Решение:**
```css
@media (max-width: 768px) {
  .image-class img {
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
  }
}
```

### Проблема: Текст с большими отступами

**Причины:**
1. Bootstrap `.container` padding
2. Дополнительные отступы в секциях

**Решение:**
```css
@media (max-width: 576px) {
  .container {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
```

### Проблема: Кнопки не на полную ширину

**Причины:**
1. `display: inline-flex` без `width: 100%`
2. `min-width` фиксирован

**Решение:**
```css
@media (max-width: 576px) {
  .btn-primary-custom {
    width: 100%;
    max-width: 100%;
    min-width: auto;
  }
}
```

### Проблема: Inline стили переопределяют CSS

**Причины:**
1. Handlebars template генерирует inline style
2. CSS правила без `!important`

**Решение:**
```css
/* !important переопределяет inline стили */
@media (max-width: 768px) {
  .element {
    width: 100% !important;
  }
}
```

---

## CSS правила для мобильных

### Обязательные правила в base-styles.css

```css
/* Prevent horizontal scroll */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Mobile container */
@media (max-width: 768px) {
  .container {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
```

### Обязательные правила для секций

```css
@media (max-width: 768px) {
  /* Images full width */
  .section-name img {
    width: 100% !important;
    height: auto !important;
  }

  /* Buttons full width */
  .section-name .btn-primary-custom {
    width: 100%;
  }

  /* Reduced border-radius */
  .section-name .rounded-element {
    border-radius: 15px !important;
  }
}

@media (max-width: 576px) {
  /* Even smaller radius */
  .section-name .rounded-element {
    border-radius: 10px !important;
  }
}
```

---

## Процесс тестирования

### Шаг 1: Запустить автотест
```bash
node tools/mobile-test.js <landing-name>
```

### Шаг 2: Открыть HTML отчет
```
tests/mobile/<landing>/<timestamp>/report.html
```

### Шаг 3: Проверить каждое разрешение
- Визуально проверить скриншоты
- Отметить проблемы в чеклисте

### Шаг 4: Исправить найденные проблемы
- Обновить CSS секций
- Пересобрать лендинг: `node builder/builder.js <landing>`

### Шаг 5: Повторить тест
- Убедиться что все проблемы исправлены
- Сохранить финальный отчет

---

## Структура тестовых файлов

```
tests/
└── mobile/
    └── <landing-name>/
        └── <timestamp>/
            ├── index-375x667-iphone-se.png
            ├── index-390x844-iphone-12.png
            ├── index-430x932-iphone-14-pro-max.png
            ├── index-360x800-android-small.png
            ├── index-412x915-android-large.png
            ├── index-768x1024-ipad-mini.png
            ├── index-1024x1366-ipad-pro.png
            ├── index-1440x900-desktop-hd.png
            ├── index-1920x1080-desktop-full.png
            └── report.html
```

---

## Интеграция с Figma проверкой

После мобильного тестирования, если нужно сравнить с Figma:

```bash
# Сначала мобильный тест
node tools/mobile-test.js hunde-fotoshooting

# Затем Figma сравнение (через Claude)
/figma-compare hunde-fotoshooting 369-256
```

---

## Автоматические проверки

Скрипт `mobile-test.js` автоматически проверяет:

1. **Horizontal scroll** - `scrollWidth > clientWidth`
2. **Screenshot capture** - успешность создания скриншота
3. **Page metrics** - размеры страницы

### Что НЕ проверяется автоматически (ручная проверка):

1. Визуальное качество
2. Читаемость текста
3. Правильность layout
4. Соответствие дизайну
5. Touch targets размеры

---

## Критерии приемки

Лендинг **готов к сдаче** если:

- [ ] Все 9 разрешений протестированы
- [ ] Нет горизонтального скролла
- [ ] Изображения корректно отображаются
- [ ] Текст читаемый на всех устройствах
- [ ] Кнопки тапабельные (min 44px)
- [ ] Формы юзабельные
- [ ] Отчет сохранен в `tests/mobile/`

---

## Команды

```bash
# Тест главной страницы
node tools/mobile-test.js <landing>

# Тест конкретной страницы
node tools/mobile-test.js <landing> quiz-1.html

# Быстрый скриншот (один размер)
node temp-screenshot.js
```
