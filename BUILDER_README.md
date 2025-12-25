# Landing Builder System

Компонентная система для сборки лендингов из переиспользуемых секций, извлеченных из Figma.

## Что реализовано

### ✅ Базовая инфраструктура
- Структура папок для модульной системы
- Bootstrap 5 для адаптивности
- Handlebars для шаблонизации
- CSS переменные из дизайна Figma
- Автоматическая сборка через CLI

### ✅ Готовые секции (4 из 10)

1. **Hero** - Заголовок, описание, CTA кнопка, изображения
2. **Promotional** - Рекламная секция (Weihnachts-Aktion)
3. **Benefits** - 3 карточки преимуществ
4. **FAQ** - Интерактивные вопросы/ответы с toggle

### ✅ Система сборки
- `builder/builder.js` - CLI для сборки лендингов
- Автоматическое копирование assets (CSS, JS, изображения)
- JSON конфигурация для управления контентом
- Handlebars шаблоны с переменными

## Структура проекта

```
landing/
├── sections/              # Переиспользуемые секции
│   ├── hero/
│   │   ├── hero.html      # Bootstrap шаблон
│   │   ├── hero.css       # Стили секции
│   │   └── variables.json # Дефолтные переменные
│   ├── promotional/
│   ├── benefits/
│   └── faq/
│
├── assets/                # Общие ресурсы
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── variables.css  # CSS переменные из Figma
│   │   └── common.css     # Общие стили
│   └── js/
│       ├── bootstrap.bundle.min.js
│       └── common.js      # FAQ toggle, smooth scroll
│
├── landings/              # Конфигурации лендингов
│   └── photographer/
│       ├── config.json    # Конфиг: секции, контент, мета
│       └── assets/        # Специфичные изображения
│
├── projects/              # Собранные лендинги (output)
│   └── photographer/
│       ├── index.html     # Готовая страница
│       ├── css/           # Все необходимые CSS
│       ├── js/            # Все необходимые JS
│       └── assets/        # Изображения
│
├── builder/               # Система сборки
│   └── builder.js         # CLI для сборки
│
├── package.json
└── README.md
```

## Быстрый старт

### 1. Сборка существующего лендинга

```bash
# Собрать photographer лендинг
node builder/builder.js photographer

# Открыть результат
open projects/photographer/index.html
```

### 2. Создание нового лендинга

#### Шаг 1: Создать config.json

```bash
mkdir -p landings/my-landing
```

Создать `landings/my-landing/config.json`:

```json
{
  "name": "My Landing",
  "lang": "de",
  "meta": {
    "title": "My Landing Page Title",
    "description": "Description for SEO",
    "keywords": "keyword1, keyword2"
  },
  "sections": [
    {
      "type": "hero",
      "content": {
        "logo": "My Logo",
        "title": "My Title",
        "description": "My description",
        "cta": {
          "text": "Button Text",
          "link": "#contact"
        }
      }
    },
    {
      "type": "benefits",
      "content": {
        "items": [
          {
            "title": "Benefit 1",
            "description": "Description 1"
          }
        ]
      }
    }
  ]
}
```

#### Шаг 2: Собрать

```bash
node builder/builder.js my-landing
```

#### Шаг 3: Открыть

```
projects/my-landing/index.html
```

## Доступные секции

### Hero
**Использование:**
```json
{
  "type": "hero",
  "content": {
    "logo": "Logo Text",
    "title": "Main Heading",
    "description": "Subtitle",
    "cta": {
      "text": "Button",
      "link": "#contact"
    },
    "images": [...]
  }
}
```

**Параметры:**
- `backgroundColor` - Цвет фона (default: #F5EDE0)
- `logo` - Текст логотипа
- `title` - Заголовок H1
- `description` - Описание
- `cta.text` - Текст кнопки
- `cta.link` - Ссылка кнопки
- `images[]` - Массив изображений

### Promotional
**Использование:**
```json
{
  "type": "promotional",
  "content": {
    "title": "Promo Title",
    "description": "<p>HTML content</p>",
    "image": "path/to/image.jpg",
    "cta": {
      "text": "Link text",
      "link": "#",
      "showArrow": true
    }
  }
}
```

### Benefits
**Использование:**
```json
{
  "type": "benefits",
  "content": {
    "items": [
      {
        "icon": "path/to/icon.svg",
        "title": "Benefit Title",
        "description": "Benefit description"
      }
    ]
  }
}
```

### FAQ
**Использование:**
```json
{
  "type": "faq",
  "content": {
    "title": "FAQ Title",
    "items": [
      {
        "q": "Question?",
        "a": "Answer"
      }
    ]
  }
}
```

## Дизайн-система (Figma)

### Цвета
```css
--color-primary: #F5EDE0;       /* Основной фон */
--color-secondary: #EEE3D0;     /* Вторичный фон */
--color-text: #3D3D3D;          /* Текст */
--color-accent: #E2C08D;        /* Кнопки */
--color-white: #FFFFFF;
```

### Типографика
```css
--font-h1: 55px;    /* Header 1 */
--font-h2: 45px;    /* Header 2 */
--font-h3: 35px;    /* Header 3 */
--font-h4: 28px;    /* Text Bold/Regular Big */
--font-body: 22px;  /* Text Bold/Regular Small */
```

### Классы типографики
- `.text-h1` - Заголовок 1 (55px, bold)
- `.text-h2` - Заголовок 2 (45px, bold)
- `.text-h3` - Заголовок 3 (35px, bold)
- `.text-bold-big` - Жирный большой текст (28px)
- `.text-medium-big` - Средний большой текст (28px)
- `.text-bold-small` - Жирный маленький текст (22px)
- `.text-medium-small` - Средний маленький текст (22px)

### Кнопки
- `.btn-primary-custom` - Основная кнопка (акцентный цвет)
- `.btn-outline-custom` - Outlined кнопка

## CLI Команды

### Сборка лендинга
```bash
node builder/builder.js <landing-name>
```

Примеры:
```bash
node builder/builder.js photographer
node builder/builder.js my-landing
```

## Добавление новой секции

### 1. Создать папку секции
```bash
mkdir -p sections/my-section
```

### 2. Создать шаблон HTML

`sections/my-section/my-section.html`:
```html
<section class="my-section section-padding" style="background-color: {{backgroundColor}};">
  <div class="container">
    <h2>{{title}}</h2>
    <p>{{description}}</p>
  </div>
</section>
```

### 3. Создать стили

`sections/my-section/my-section.css`:
```css
.my-section {
  position: relative;
}

/* Responsive */
@media (max-width: 768px) {
  .my-section {
    padding: 40px 0 !important;
  }
}
```

### 4. Создать дефолтные переменные

`sections/my-section/variables.json`:
```json
{
  "backgroundColor": "#F5EDE0",
  "title": "Default Title",
  "description": "Default description"
}
```

### 5. Использовать в config.json
```json
{
  "sections": [
    {
      "type": "my-section",
      "content": {
        "title": "Custom Title",
        "description": "Custom description"
      }
    }
  ]
}
```

## Что дальше (TODO)

### Оставшиеся секции для извлечения
- [ ] Features/Family Memories - текст слева, изображение справа
- [ ] Gallery - галерея изображений (3 в ряд)
- [ ] Process - 4 шага процесса (2×2 grid)
- [ ] Services - 4 карточки услуг
- [ ] About - био фотографа
- [ ] Footer - контакты, карта

### Дополнительные инструменты
- [ ] `builder/figma-sync.js` - автоматическое извлечение секций из Figma
- [ ] `builder/validator.js` - валидация config.json

### Улучшения
- [ ] Hot reload для разработки
- [ ] Минификация CSS/JS для production
- [ ] Image optimization
- [ ] Lighthouse optimization

## Production Checklist

Перед размещением на production:

- [ ] Заменить `http://localhost:3845/assets/*` на реальные URL
- [ ] Добавить реальные изображения вместо плейсхолдеров
- [ ] Заполнить все тексты в config.json
- [ ] Протестировать на всех разрешениях
- [ ] Проверить SEO мета-теги
- [ ] Добавить Google Analytics
- [ ] Настроить формы обратной связи
- [ ] Оптимизировать изображения (WebP, lazy loading)

## Техническая информация

- **Bootstrap**: 5.3.2
- **Handlebars**: 4.7.8
- **Node.js**: требуется для сборки
- **Браузеры**: все современные браузеры

## Поддержка

Для добавления новых секций или модификации существующих, см. раздел "Добавление новой секции" выше.
