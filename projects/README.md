# Projects - Готовые лендинги

Сгенерированные лендинги для клиентов.

## Структура каждого лендинга

```
projects/landing-name/
├── index.html           # Главная страница
├── quiz-1.html          # Страницы квиза (опционально)
├── quiz-2.html
├── quiz-form.html
├── thank-you.html
├── css/
│   ├── bootstrap.min.css
│   ├── base-styles.css  # ← РЕДАКТИРОВАТЬ ЦВЕТА ЗДЕСЬ
│   ├── common.css
│   └── *.css            # Стили секций
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── common.js
│   └── quiz.js
└── assets/
    └── icons/
```

---

## Как изменить цвета (для клиента)

Откройте файл `css/base-styles.css` и измените значения в `:root`:

```css
:root {
  /* ====== ЦВЕТА - РЕДАКТИРУЙТЕ ЗДЕСЬ ====== */
  --brand-primary: #F5EDE0;    /* Основной фон секций */
  --brand-secondary: #EEE3D0;  /* Вторичный фон секций */
  --brand-accent: #E2C08D;     /* Кнопки, акценты */
  --brand-text: #3D3D3D;       /* Цвет текста */
}
```

### Пример: Изменить на розовую тему

```css
:root {
  --brand-primary: #FFF0F5;    /* Светло-розовый */
  --brand-secondary: #FFE4E9;  /* Розовый */
  --brand-accent: #FF69B4;     /* Ярко-розовый */
  --brand-text: #333333;       /* Темный текст */
}
```

Сохраните файл — все страницы лендинга обновятся!

---

## Что можно изменять

| Элемент | Как изменить | Файл |
|---------|--------------|------|
| **Цвета фонов** | Изменить `--brand-primary`, `--brand-secondary` | `css/base-styles.css` |
| **Цвет кнопок** | Изменить `--brand-accent` | `css/base-styles.css` |
| **Цвет текста** | Изменить `--brand-text` | `css/base-styles.css` |
| **Шрифт** | Изменить `--font-family` | `css/base-styles.css` |
| **Размер заголовков** | Изменить `--font-h1`, `--font-h2` | `css/base-styles.css` |
| **Тексты** | Найти и заменить в HTML | `*.html` |
| **Изображения** | Заменить URL в `src="..."` | `*.html` |

---

## Что нельзя изменять (сломается)

- Структуру HTML тегов
- Названия CSS классов
- JavaScript файлы
- Bootstrap файлы

---

## Типичные изменения

### Изменить текст кнопки

Найти в HTML:
```html
<a href="quiz-1.html" class="btn btn-primary-custom">
  Jetzt Gutschein sichern
</a>
```

Заменить текст между `>` и `</a>`.

### Изменить изображение

Найти в HTML:
```html
<img src="https://example.com/photo.jpg" alt="Описание">
```

Заменить URL в `src="..."`.

### Изменить ссылку

Найти `href="..."` и заменить URL.
