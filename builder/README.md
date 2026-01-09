# Builder - Система сборки

Инструменты для создания, сборки и тестирования лендингов.

## Файлы

| Файл | Назначение |
|------|-----------|
| `builder.js` | Основной builder (Handlebars → HTML) |
| `cli.js` | CLI утилиты (create, build, validate) |
| `screenshot.js` | Создание скриншотов |

## CLI команды

### Создание лендинга

```bash
# Из шаблона quiz-funnel (7 страниц)
node builder/cli.js create my-landing

# Из шаблона single-page
node builder/cli.js create my-landing --template single-page
```

Шаблоны:
- `quiz-funnel` - 7 страниц: index, quiz-1..4, quiz-form, thank-you
- `single-page` - 1 страница: index

### Сборка

```bash
# Одноразовая сборка
node builder/builder.js my-landing

# Или через CLI
node builder/cli.js build my-landing

# С автообновлением (watch mode)
node builder/cli.js build my-landing --watch
```

### Валидация

```bash
# Проверка конфига и изображений
node builder/cli.js validate my-landing
```

### Список лендингов

```bash
node builder/cli.js list
```

### Скриншоты

```bash
# Desktop (1440px)
node builder/screenshot.js projects/my-landing/index.html screenshots/desktop.png

# Mobile (375px)
node builder/screenshot.js projects/my-landing/index.html screenshots/mobile.png 375

# Tablet (768px)
node builder/screenshot.js projects/my-landing/index.html screenshots/tablet.png 768
```

## builder.js - Архитектура

### Класс LandingBuilder

```javascript
const builder = new LandingBuilder('my-landing');
await builder.build();
```

### Процесс сборки

```
1. loadConfig()        → Чтение config.json
2. loadTheme()         → Загрузка темы
3. validateConfig()    → Валидация
4. buildMultiPageHTML() или buildHTML()
   └── loadSection()   → Для каждой секции:
       ├── Загрузка шаблона (.html)
       ├── Загрузка defaults (variables.json)
       ├── Применение темы
       └── Компиляция Handlebars
5. wrapLayout()        → Обертка в HTML документ
6. copyAssets()        → Копирование CSS/JS/icons
7. writeFile()         → Запись в projects/
```

### Безопасность

Builder включает защиту:
- **Path traversal** - санитизация имени лендинга
- **XSS** - санитизация HTML контента
- **URL validation** - проверка URL схем
- **CSP** - Content Security Policy в output

### Handlebars хелперы

| Хелпер | Описание |
|--------|----------|
| `{{#ifEquals a b}}` | Сравнение |
| `{{#unlessEquals a b}}` | Не равно |
| `{{{safeHtml content}}}` | Безопасный HTML |
| `{{safeUrl url}}` | Безопасный URL |
| `{{safeCss value}}` | Безопасный CSS |

## Output

Результат сборки в `projects/my-landing/`:

```
projects/my-landing/
├── index.html
├── quiz-1.html
├── quiz-2.html
├── ...
├── css/
│   ├── bootstrap.min.css
│   ├── base-styles.css
│   ├── common.css
│   └── *.css (секции)
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── common.js
│   └── quiz.js
└── assets/
    └── icons/
```

## Зависимости

```json
{
  "fs-extra": "^11.x",
  "handlebars": "^4.x",
  "puppeteer": "^21.x"  // для скриншотов
}
```

## Примеры

### Создать и собрать новый лендинг

```bash
node builder/cli.js create dog-photos
# Редактируем landings/dog-photos/config.json
node builder/builder.js dog-photos
# Открываем projects/dog-photos/index.html
```

### Разработка с автообновлением

```bash
node builder/cli.js build my-landing --watch
# Редактируем config.json или секции
# Builder автоматически пересобирает
```

### Проверка перед деплоем

```bash
node builder/cli.js validate my-landing
node builder/screenshot.js projects/my-landing/index.html screenshots/check.png
```
