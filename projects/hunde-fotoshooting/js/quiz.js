/**
 * ============================================================================
 * QUIZ.JS - Логика квиза с localStorage и Google Sheets
 * ============================================================================
 *
 * Функции:
 * - Сохранение ответов в localStorage
 * - Отправка данных на Google Sheets через Apps Script
 * - Валидация формы
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const QUIZ_CONFIG = {
  // Google Apps Script Web App URL (заменить на реальный после настройки)
  googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',

  // Ключ для localStorage
  storageKey: 'family_quiz_data',

  // Страница успеха
  successPage: 'thank-you.html'
};

// ============================================================================
// QUIZ DATA MANAGEMENT
// ============================================================================

/**
 * Инициализация данных квиза
 */
function initQuizData() {
  const existingData = getQuizData();
  if (!existingData) {
    const initialData = {
      answers: {},
      startTime: new Date().toISOString(),
      currentStep: 1
    };
    saveQuizDataToStorage(initialData);
  }
}

/**
 * Получение данных квиза из localStorage
 */
function getQuizData() {
  try {
    const data = localStorage.getItem(QUIZ_CONFIG.storageKey);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading quiz data:', e);
    return null;
  }
}

/**
 * Сохранение данных квиза в localStorage
 */
function saveQuizDataToStorage(data) {
  try {
    localStorage.setItem(QUIZ_CONFIG.storageKey, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving quiz data:', e);
  }
}

/**
 * Сохранение ответа на вопрос
 * @param {string} questionId - ID вопроса (q1, q2, q3, q4)
 * @param {string} answer - Ответ пользователя
 */
function saveQuizAnswer(questionId, answer) {
  const data = getQuizData() || { answers: {}, startTime: new Date().toISOString() };
  data.answers[questionId] = answer;
  data.lastUpdated = new Date().toISOString();
  saveQuizDataToStorage(data);
  console.log(`Saved answer for ${questionId}: ${answer}`);
}

/**
 * Очистка данных квиза
 */
function clearQuizData() {
  try {
    localStorage.removeItem(QUIZ_CONFIG.storageKey);
  } catch (e) {
    console.error('Error clearing quiz data:', e);
  }
}

// ============================================================================
// FORM SUBMISSION
// ============================================================================

/**
 * Обработка отправки формы
 * @param {Event} event - Событие submit
 * @returns {boolean} false для предотвращения стандартной отправки
 */
function submitQuizForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  // Валидация
  if (!validateForm(form)) {
    return false;
  }

  // Показать состояние загрузки
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';
  }

  // Собрать данные формы
  const formData = {
    name: form.querySelector('#form-name')?.value || '',
    email: form.querySelector('#form-email')?.value || '',
    phone: form.querySelector('#form-phone')?.value || '',
    availability: form.querySelector('#form-availability')?.value || '',
    privacy: form.querySelector('#form-privacy')?.checked || false,
    timestamp: new Date().toISOString()
  };

  // Добавить ответы квиза
  const quizData = getQuizData();
  if (quizData && quizData.answers) {
    formData.quizAnswers = quizData.answers;
    formData.quizStartTime = quizData.startTime;
  }

  // Отправить на Google Sheets
  submitToGoogleSheets(formData)
    .then(() => {
      console.log('Form submitted successfully');
      clearQuizData();
      window.location.href = QUIZ_CONFIG.successPage;
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Jetzt Gutschein sichern!';
      }
    });

  return false;
}

/**
 * Отправка данных на Google Sheets
 * @param {Object} data - Данные для отправки
 * @returns {Promise}
 */
async function submitToGoogleSheets(data) {
  // Если URL не настроен, просто логируем данные и переходим на страницу успеха
  if (QUIZ_CONFIG.googleScriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.log('Google Script URL not configured. Form data:', data);
    console.log('Quiz answers:', data.quizAnswers);
    return Promise.resolve();
  }

  // Подготовка данных для Google Sheets
  const payload = {
    timestamp: data.timestamp,
    name: data.name,
    email: data.email,
    phone: data.phone,
    availability: data.availability,
    privacy_accepted: data.privacy ? 'Ja' : 'Nein',
    q1_kennst: data.quizAnswers?.q1 || '',
    q2_bild: data.quizAnswers?.q2 || '',
    q3_experience: data.quizAnswers?.q3 || '',
    q4_wer: data.quizAnswers?.q4 || '',
    quiz_start_time: data.quizStartTime || ''
  };

  // Отправка через fetch
  const response = await fetch(QUIZ_CONFIG.googleScriptUrl, {
    method: 'POST',
    mode: 'no-cors', // Google Apps Script требует no-cors
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  // При no-cors мы не можем читать ответ, но если fetch не выбросил ошибку,
  // считаем что отправка прошла успешно
  return response;
}

// ============================================================================
// FORM VALIDATION
// ============================================================================

/**
 * Валидация формы
 * @param {HTMLFormElement} form - Элемент формы
 * @returns {boolean} true если форма валидна
 */
function validateForm(form) {
  let isValid = true;

  // Проверка обязательных полей
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        highlightError(field);
      } else {
        removeError(field);
      }
    } else if (!field.value.trim()) {
      isValid = false;
      highlightError(field);
    } else {
      removeError(field);
    }
  });

  // Проверка email
  const emailField = form.querySelector('#form-email');
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
      isValid = false;
      highlightError(emailField);
    }
  }

  return isValid;
}

/**
 * Подсветка ошибки поля
 * @param {HTMLElement} field - Поле с ошибкой
 */
function highlightError(field) {
  field.style.borderColor = '#ff4444';
  field.style.boxShadow = '0 0 0 2px rgba(255, 68, 68, 0.2)';
}

/**
 * Удаление подсветки ошибки
 * @param {HTMLElement} field - Поле
 */
function removeError(field) {
  field.style.borderColor = '';
  field.style.boxShadow = '';
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initQuizData();

  // Добавить обработчики для снятия ошибок при вводе
  const formInputs = document.querySelectorAll('.quiz-form__input, .quiz-form__checkbox');
  formInputs.forEach(input => {
    input.addEventListener('input', () => removeError(input));
    input.addEventListener('change', () => removeError(input));
  });
});

// Экспорт функций для использования в HTML
window.saveQuizAnswer = saveQuizAnswer;
window.submitQuizForm = submitQuizForm;
window.getQuizData = getQuizData;
window.clearQuizData = clearQuizData;
