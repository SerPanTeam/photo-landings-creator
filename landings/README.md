# Landings - Конфигурации лендингов

Каждый лендинг - это папка с config.json, определяющая страницы и контент.

## Быстрый старт

### Создание нового лендинга

```bash
# Используя CLI (рекомендуется)
node builder/cli.js create my-landing

# С шаблоном
node builder/cli.js create my-landing --template quiz-funnel
node builder/cli.js create my-landing --template single-page
```

### Сборка

```bash
node builder/builder.js my-landing

# С автообновлением
node builder/cli.js build my-landing --watch
```

## Структура папки лендинга

```
landings/my-landing/
├── config.json    # Конфигурация страниц и контента
├── FIGMA.md       # Ссылки на Figma node IDs
├── js/            # Кастомные скрипты (опционально)
└── assets/        # Изображения лендинга (опционально)
```

## config.json

### Минимальный конфиг (single-page)

```json
{
  "name": "My Landing",
  "theme": "default",
  "lang": "de",
  "meta": {
    "title": "Page Title",
    "description": "SEO description",
    "keywords": "keywords"
  },
  "sections": [
    { "type": "hero", "content": { "title": "Hello" } },
    { "type": "footer", "content": {} }
  ]
}
```

### Multi-page конфиг (quiz)

```json
{
  "name": "Quiz Landing",
  "theme": "default",
  "lang": "de",
  "meta": { ... },
  "scripts": ["quiz.js"],
  "pages": [
    {
      "filename": "index.html",
      "title": "Главная",
      "sections": [ ... ]
    },
    {
      "filename": "quiz-1.html",
      "sections": [ ... ]
    }
  ]
}
```

## Поля config.json

| Поле | Тип | Описание |
|------|-----|----------|
| `name` | string | Название лендинга |
| `theme` | string | Тема (default) |
| `lang` | string | Язык (de, en, ru) |
| `meta.title` | string | SEO заголовок |
| `meta.description` | string | SEO описание |
| `meta.keywords` | string | SEO ключевые слова |
| `scripts` | array | JS файлы для подключения |
| `sections` | array | Секции (single-page) |
| `pages` | array | Страницы (multi-page) |

## Темы

Тема определяет цвета по умолчанию для секций:

```json
{
  "theme": "default"  // Использует assets/themes/default.json
}
```

Цвета темы:
- `primary`: #F5EDE0 (основной фон)
- `secondary`: #EEE3D0 (вторичный фон)
- `accent`: #E2C08D (акцент, кнопки)
- `text`: #3D3D3D (текст)

## FIGMA.md

Храните ссылки на Figma для сравнения:

```markdown
| Page | Figma Node ID |
|------|---------------|
| index.html | 369-256 |
| quiz-1.html | 370-441 |
```

## Готовые лендинги

| Название | Страниц | Описание |
|----------|---------|----------|
| family-quiz | 7 | Семейная фотосессия |
| christmas-free | 7 | Рождественская акция |
| hunde-fotoshooting | 7 | Фотосессия собак |

## Команды

```bash
# Список всех лендингов
node builder/cli.js list

# Валидация конфига
node builder/cli.js validate my-landing

# Создать скриншоты
node builder/screenshot.js projects/my-landing/index.html screenshots/desktop.png
```
