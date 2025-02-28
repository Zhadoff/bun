document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Функция для установки языка
    function setLanguage(lang) {
        // Обновляем активную кнопку
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Обновляем все тексты на странице
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            let translation = translations[lang];
            
            // Получаем значение по вложенному ключу
            const keys = key.split('.');
            for (const k of keys) {
                if (translation) {
                    translation = translation[k];
                }
            }
            
            if (translation) {
                // Проверяем тип элемента
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = translation;
                } else if (element.tagName === 'A') {
                    // Для ссылок сохраняем href атрибут
                    const href = element.getAttribute('href');
                    element.textContent = translation;
                    if (href) element.setAttribute('href', href);
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Обновляем заголовки таблицы
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[lang].table_headers && translations[lang].table_headers[key]) {
                element.textContent = translations[lang].table_headers[key];
            }
        });

        // Обновляем язык документа
        document.documentElement.lang = lang;

        // Сохраняем выбранный язык
        localStorage.setItem('selectedLanguage', lang);
    }

    // Обработчики кликов по кнопкам языка
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });

    // Устанавливаем язык при загрузке страницы
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
}); 