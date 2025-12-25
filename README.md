# Лендинг для фотографа Dorett Dornbusch

Пиксель-перфект лендинг, созданный на основе дизайна из Figma для рождественской акции на семейные фотосессии.

## Структура проекта

```
landing/
├── index.html      # HTML с точными позициями из Figma
├── style.css       # CSS с абсолютным позиционированием
├── script.js       # JavaScript для интерактивности FAQ
└── README.md       # Документация
```

## Особенности реализации

### Пиксель-перфект верстка
- Используется абсолютное позиционирование для точного соответствия дизайну
- Все элементы размещены по координатам из Figma
- Ширина лендинга: 1440px
- Высота: ~7359px

### Изображения из Figma MCP
Все SVG изображения загружаются с локального MCP сервера Figma:
- `http://localhost:3845/assets/*.svg`
- Линии-разделители
- Стрелки
- Иконки FAQ (плюс/минус)
- Галерея изображений

## Технологии

- **HTML5** - семантическая разметка с data-атрибутами
- **CSS3** - абсолютное позиционирование, calc() для адаптивных позиций
- **Vanilla JavaScript** - интерактивность FAQ
- **Google Fonts** - шрифт Inter (Medium 500, Bold 700)

## Дизайн-система из Figma

### Цветовая палитра
```css
--bg-primary: #F5EDE0;           /* Основной фон */
--bg-secondary: #EEE3D0;         /* Вторичный фон */
--text-color: #3D3D3D;           /* Основной текст */
--button-color: #E2C08D;         /* Цвет кнопок */
--gray: #7F7F7F;                 /* Серый для плейсхолдеров */
--black: #000000;                /* Чёрный текст */
--white: #FFFFFF;                /* Белый текст */
```

### Типографика
```
Header 1:           Inter Bold, 55px, line-height: 100%
Header 2:           Inter Bold, 45px, line-height: 100%
Text Bold Big:      Inter Bold, 28px, line-height: normal
Text Regular Big:   Inter Medium, 28px, line-height: normal
Text Bold Small:    Inter Bold, 22px, line-height: normal
Text Regular Small: Inter Medium, 22px, line-height: normal
```

## Секции лендинга (по порядку)

1. **Hero (0-634px)**
   - Логотип
   - Заголовок "Hello, i am a photographer"
   - Описание
   - Кнопка CTA
   - Две фото-плейсхолдера

2. **Christmas Action (634-1326px)**
   - Фото слева
   - Информация о рождественской акции справа
   - Цена: 39€ вместо 89€
   - Срок: до 06.12.25

3. **Family Memories (1326-2048px)**
   - Описание семейных фотосессий
   - Фото справа
   - Слоган: "– для dich, für dein Kind, für immer –"

4. **Group Gallery (2042-2681px)**
   - SVG галерея с несколькими изображениями

5. **Benefits (2681-3226px)**
   - 3 преимущества:
     - Viel Zeit & Raum
     - Professionelle Fotografin
     - Hohe Qualität

6. **Process (3226-4190px)**
   - "Wie genau komme ich zum Fotoshooting?"
   - 4 шага процесса:
     1. Eintragen
     2. Shootingzeit
     3. Wähle dein Lieblingsbild/er aus
     4. Ergebnis

7. **Gray Section (4189-4845px)**
   - Серый placeholder блок

8. **FAQ (4845-5565px)**
   - "Häufige Fragen zum Fotoshooting"
   - 3 вопроса с toggle (открыть/закрыть)

9. **Year Actions (5565-6600px)**
   - "Das ganze Jahr über finden..."
   - 4 карточки услуг:
     - Family Time
     - Kinder-Fotoshooting
     - Babybauch & Newborn
     - Portraitfotografie

10. **About (6599-7359px)**
    - Фото фотографа слева
    - "Willkommen bei Dorett Dornbusch"
    - Информация о фотографе

11. **Contact (7359px+)**
    - Placeholder для карты

## Интерактивность

- **FAQ Toggle** - клик на вопрос открывает/закрывает ответ
- **Smooth Scrolling** - плавная прокрутка к якорям
- **Button Hover** - эффекты при наведении на кнопки

## Запуск

### Простой способ
Откройте `index.html` в браузере.

**ВАЖНО**: Для корректного отображения изображений необходим запущенный Figma MCP сервер на `http://localhost:3845`

### С локальным сервером

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Откройте: http://localhost:8000

## Адаптивность

Реализовано масштабирование для разных разрешений:

- **>1440px** - оригинальный размер
- **<1440px** - пропорциональное масштабирование через CSS `transform: scale()`
- **<768px** - масштаб 0.5x

Для полноценной адаптивности потребуется переделка с flexbox/grid вместо абсолютного позиционирования.

## Figma MCP Server

Лендинг использует локальный MCP сервер Figma для изображений:

```
Проверка подключения:
claude mcp list

Должен показать:
✓ figma: http://127.0.0.1:3845/mcp (HTTP) - Connected
```

## Что использовано из Figma

- Точные координаты всех элементов
- Размеры блоков
- Цветовая схема
- Типографика (размеры, веса, семейства шрифтов)
- SVG изображения (линии, стрелки, иконки)
- Структура контента

## Production Checklist

Перед размещением на production:

- [ ] Заменить все `http://localhost:3845/assets/*` на реальные URL изображений
- [ ] Экспортировать SVG из Figma и разместить в `/assets/`
- [ ] Добавить реальные фотографии вместо серых плейсхолдеров
- [ ] Интегрировать Google Maps для секции контактов
- [ ] Добавить реальный текст вопросов/ответов в FAQ
- [ ] Настроить формы обратной связи
- [ ] Подключить аналитику
- [ ] Оптимизировать изображения (WebP, lazy loading)
- [ ] Добавить мета-теги (OpenGraph, Twitter Cards)
- [ ] Настроить SEO (title, description, schema.org)

## Возможные улучшения

1. **Адаптивная верстка** - переделать на flexbox/grid для мобильных
2. **Анимации** - добавить AOS или GSAP для эффектов при скролле
3. **Формы** - добавить форму записи на фотосессию
4. **Галерея** - добавить lightbox для просмотра работ
5. **Оптимизация** - минификация CSS/JS, сжатие изображений
6. **Доступность** - ARIA-атрибуты, навигация с клавиатуры

## Структура данных из Figma

Лендинг создан из node ID: `1:3` дизайн-файла Figma.

Использованы следующие стили:
- Hintergrundfarbe: #F5EDE0
- Scriftfarbe: #3D3D3D
- Buttonfarbe: #E2C08D
- Secundare Hintergrundfarbe: #EEE3D0
