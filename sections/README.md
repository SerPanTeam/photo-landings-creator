# Sections - Переиспользуемые компоненты

Каждая секция - это самостоятельный компонент с HTML шаблоном, CSS стилями и переменными по умолчанию.

## Структура секции

```
sections/<name>/
├── <name>.html       # Handlebars шаблон
├── <name>.css        # Стили секции
└── variables.json    # Значения по умолчанию
```

## Доступные секции (22)

### Основные страницы
| Секция | Назначение |
|--------|-----------|
| `hero` | Главная секция с логотипом, заголовком, CTA, 2 изображения |
| `hero-dark` | Темная версия hero |
| `hero-centered` | Центрированный layout с несколькими изображениями |
| `hero-fullwidth` | Hero с полноширинным фоновым изображением |
| `footer` | Google Maps embed |
| `legal-footer` | Ссылки Impressum/Datenschutz |

### Контентные секции
| Секция | Назначение |
|--------|-----------|
| `promotional` | Промо-блок с изображением + текст |
| `features` | Описание + изображение + tagline |
| `benefits` | 3 карточки с иконками |
| `process` | 4 шага процесса с иконками |
| `services` | 4 карточки услуг |
| `about` | Bio секция с фото |
| `gallery` | Слайдер изображений со стрелками |
| `fullwidth-image` | Полноширинное изображение |
| `faq` | Аккордеон вопросов-ответов |
| `faq-cards` | Q&A в виде карточек |
| `testimonials` | Слайдер отзывов |

### Quiz секции
| Секция | Назначение |
|--------|-----------|
| `quiz-header` | Логотип + прогресс текст |
| `quiz-question` | Вопрос с вариантами ответов (2-4) |
| `quiz-form` | Форма регистрации |
| `thank-you-hero` | Страница благодарности |
| `author-footer` | Информация об авторе + соцсети |

## Использование в config.json

```json
{
  "sections": [
    {
      "type": "hero",
      "content": {
        "backgroundColor": "#F5EDE0",
        "title": "Заголовок",
        "cta": { "text": "Кнопка", "link": "#" }
      }
    }
  ]
}
```

## Создание новой секции

1. Создать папку: `sections/my-section/`
2. Создать `my-section.html` (Handlebars шаблон)
3. Создать `my-section.css` (стили)
4. Создать `variables.json` (значения по умолчанию)

### Пример шаблона

```html
<section class="my-section" style="background-color: {{backgroundColor}};">
  <div class="container">
    <h2>{{title}}</h2>
    {{#if items}}
    <div class="my-section__items">
      {{#each items}}
      <div class="my-section__item">{{this.text}}</div>
      {{/each}}
    </div>
    {{/if}}
  </div>
</section>
```

### Пример variables.json

```json
{
  "backgroundColor": "#F5EDE0",
  "title": "Default Title",
  "items": []
}
```

## Handlebars хелперы

- `{{#if condition}}` - условие
- `{{#each array}}` - цикл
- `{{{safeHtml content}}}` - HTML контент (санитизация)
- `{{safeUrl url}}` - безопасный URL
- `{{#ifEquals a b}}` - сравнение
