# Assets - Общие ресурсы

Общие CSS, JS, темы и иконки для всех лендингов.

## Структура

```
assets/
├── css/
│   ├── bootstrap.min.css    # Bootstrap 5
│   ├── base-styles.css      # CSS переменные (design tokens)
│   └── common.css           # Общие классы (.btn-*, .text-*)
├── js/
│   ├── bootstrap.bundle.min.js  # Bootstrap JS
│   ├── common.js            # Gallery slider, FAQ toggle
│   └── quiz.js              # Логика quiz-воронки
├── themes/
│   └── default.json         # Тема по умолчанию
└── icons/
    └── *.svg                # Глобальные иконки
```

## CSS

### base-styles.css

CSS переменные (Design Tokens):

```css
:root {
  /* Colors */
  --brand-primary: #F5EDE0;    /* Основной фон */
  --brand-secondary: #EEE3D0;  /* Вторичный фон */
  --brand-accent: #E2C08D;     /* Акцент (кнопки) */
  --brand-text: #3D3D3D;       /* Текст */

  /* Typography */
  --font-h1: 55px;
  --font-h2: 45px;
  --font-h3: 35px;
  --font-h4: 28px;
  --font-body: 22px;

  /* Spacing */
  --spacing-section: 80px;
  --spacing-section-mobile: 40px;
}
```

### common.css

Переиспользуемые классы:

| Класс | Описание |
|-------|----------|
| `.text-h1`, `.text-h2`, `.text-h3` | Заголовки |
| `.text-bold-big`, `.text-medium-big` | 28px текст |
| `.text-bold-small`, `.text-medium-small` | 22px текст |
| `.btn-primary-custom` | Кнопка с акцентом (#E2C08D) |
| `.btn-outline-custom` | Контурная кнопка |
| `.img-placeholder` | Плейсхолдер изображения |

## JavaScript

### common.js

Функциональность:
- **Gallery slider** - карусель с стрелками (1/2/3 слайда)
- **FAQ toggle** - аккордеон вопросов
- **Smooth scrolling** - якорные ссылки
- **Lazy loading** - отложенная загрузка изображений

### quiz.js

Логика quiz-воронки:
- Сохранение ответов в localStorage
- Валидация формы
- Отправка на Google Sheets

Конфигурация через data-атрибуты:
```html
<body
  data-quiz-storage-key="my_quiz"
  data-quiz-success-page="thank-you.html"
  data-quiz-google-script="https://script.google.com/...">
```

## Темы

### default.json

```json
{
  "name": "Default Photography Theme",
  "colors": {
    "primary": "#F5EDE0",
    "secondary": "#EEE3D0",
    "accent": "#E2C08D",
    "text": "#3D3D3D",
    "placeholder": "#7F7F7F"
  },
  "backgrounds": {
    "hero": "primary",
    "promotional": "secondary",
    "benefits": "primary",
    "process": "secondary",
    ...
  }
}
```

### Создание новой темы

1. Скопировать `default.json` → `my-theme.json`
2. Изменить цвета
3. В config.json указать `"theme": "my-theme"`

## Иконки

Глобальные SVG иконки копируются в `projects/*/assets/icons/`.

Использование в config.json:
```json
{
  "icon": "assets/icons/camera.svg"
}
```

## Автокопирование

Builder автоматически копирует:
- `bootstrap.min.css` → `css/`
- `base-styles.css` → `css/`
- `common.css` → `css/`
- `bootstrap.bundle.min.js` → `js/`
- `common.js` → `js/`
- `quiz.js` → `js/` (если есть в scripts)
- `icons/` → `assets/icons/`
