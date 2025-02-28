// Ждем загрузку DOM
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем загрузку переводов
    if (typeof window.translations === 'undefined') {
        console.error('Translations object not found! Make sure translations.js is loaded first.');
        return;
    }

    // Функция смены языка
    function switchLanguage(lang) {
        // Проверяем наличие переводов для выбранного языка
        if (!window.translations[lang]) {
            console.error(`No translations found for language: ${lang}`);
            return;
        }

        // Обновляем класс активной кнопки
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Обновляем язык страницы
        document.documentElement.lang = lang;

        // Сохраняем выбор в localStorage
        localStorage.setItem('language', lang);

        // Обновляем все переводимые элементы
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            let translation = window.translations[lang];
            
            // Получаем перевод по ключу
            key.split('.').forEach(k => {
                if (translation) {
                    translation = translation[k];
                }
            });

            // Применяем перевод если он найден
            if (translation) {
                element.textContent = translation;
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });
    }

    // Добавляем обработчики на кнопки переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            console.log('Switching language to:', lang);
            switchLanguage(lang);
        });
    });

    // Устанавливаем начальный язык
    const savedLang = localStorage.getItem('language') || 'en';
    console.log('Initial language:', savedLang);
    switchLanguage(savedLang);
}); 