# План синхронизации family-quiz с Figma

## Страницы и их Figma Node IDs

| Страница | Figma Node | Статус |
|----------|------------|--------|
| index.html | 1:3 | Проверить |
| quiz-1.html | 137:51 | OK |
| quiz-2.html | 137:159 | OK |
| quiz-3.html | 137:71 | OK |
| quiz-4.html | 137:179 | OK |
| quiz-form.html | 137:111 | Проверить |
| thank-you.html | 137:84 | OK |

---

## Детальное сравнение

### 1. index.html (Figma: 1:3)

**Figma показывает:**
- Hero: "Hello, i am a photographer"
- Promotional: "Weihnachts-Fotoshooting-Aktion"
- Features, Gallery, Benefits, Process, FAQ, Services, About, Footer

**Наш config:** ✅ Соответствует

---

### 2. quiz-1.html (Figma: 137:51)

**Figma:**
- Header: "Logo" + "Weiter zum Gutschein"
- Question: "Kennst du mich bereits?"
- 4 варианта: "Ja, vom Hören", "Ja, na klar!", "Schon sehr lang", "Nein, noch nicht"

**Наш config:** ✅ Полностью соответствует

---

### 3. quiz-2.html (Figma: 137:159)

**Figma:**
- Header: "Logo" + "4 Fragen bis zum Gutschein"
- Question: "Welches Bild gefällt dir am Besten?"
- 4 варианта с цифрами: "1", "2", "3", "4"

**Наш config:** ✅ Полностью соответствует

---

### 4. quiz-3.html (Figma: 137:71)

**Figma:**
- Header: "Logo" + "3 Fragen bis zum Gutschein"
- Question: "Schon mal ein Familien- Fotoshooting gehabt?"
- 2 варианта: "Ja, das war der Hammer!", "Nein, bisher noch nicht!"

**Наш config:** ✅ Полностью соответствует

---

### 5. quiz-4.html (Figma: 137:179)

**Figma:**
- Header: "Logo" + "2 Fragen bis zum Gutschein"
- Question: "Wer wird mit dabei sein?"
- 3 варианта: "Nur wir als Elternpaar", "Eltern und die Kinder", "Wir nehmen auch unser Haustier mit"

**Наш config:** ✅ Полностью соответствует

---

### 6. quiz-form.html (Figma: 137:111)

**Figma:**
- Header: "Logo" + "Klasse, jetzt zum Gutschein"
- Subtitle: "Trage dich jetzt ein und sichere dir dein Platz für ein"
- Title: "Familien-Fotoshooting zu Weihnachten!"
- ⚠️ Красный текст в Figma: "(красное тут надо удалить)" - это заметка дизайнера, НЕ контент
- Deadline: "Diese Aktion gilt nur bis zum 06.12.25."
- Форма: Name, Email, Phone, Availability dropdown
- Checkbox: "Ich akzeptiere die Datenschutzbestimmungen"
- Button: "Jetzt Gutschein sichern!"
- Справа: изображение + текст о приватности
- WICHTIG блок
- Footer с картой
- Legal footer

**Наш config:** ✅ Соответствует (красный текст - заметка дизайнера)

---

### 7. thank-you.html (Figma: 137:84)

**Figma:**
- Header: "Logo" (без progress текста)
- Title: "Herzlichen Glückwunsch!"
- Subtitle: "Deine Anfrage ist bei uns eingegangen!"
- Description: "Wir melden uns bald bei dir. Du hast die Möglichkeit..."
- Primary CTA: "Jetzt Termin wählen & sichern!"
- Additional text
- Secondary buttons: "Jetzt anrufen", "Mail uns!"
- Author footer: "Yvonne Jadke – Fotograf Hannover"
- Specialization: "Familienfotos, Businessportraits & Hochzeitsfotografie"
- Social icons: Facebook, Instagram, Website
- Map footer
- Legal footer

**Наш config:** ✅ Полностью соответствует

---

## Итог

### ✅ Всё соответствует Figma:
- Все 7 страниц структурно идентичны
- Тексты совпадают
- Порядок секций правильный

### ⚠️ Замечания:
1. **Figma 137:111** (quiz-form): Красный текст "jetzt ein und sichere dir dein Platz für ein (красное тут надо удалить)" - это заметка дизайнера для удаления, а не реальный контент. В нашем config этого красного текста нет - ✅ правильно.

2. **Placeholder изображения**: Сейчас используются picsum.photos - это тестовые изображения. В продакшене нужно заменить на реальные фото.

---

## Возможные улучшения (опционально)

1. Заменить placeholder изображения на реальные
2. Обновить ссылки tel: и mailto: на реальные контакты
3. Настроить Google Apps Script для формы
