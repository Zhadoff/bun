class I18n {
    constructor() {
        this.currentLang = this.getBrowserLanguage();
        this.init();
    }

    getBrowserLanguage() {
        // Изменим порядок проверки - сначала проверяем английский
        const defaultLang = 'en';
        const browserLang = navigator.language.split('-')[0];
        
        // Возвращаем 'ru' только если язык браузера русский, 
        // в остальных случаях возвращаем английский
        return browserLang === 'ru' ? 'ru' : defaultLang;
    }

    init() {
        // Инициализация переключателей языка
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });

        // Установка начального языка
        this.setLanguage(this.currentLang);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Обновляем активную кнопку
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Обновляем все переводимые элементы
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = translations[lang][key];
        });

        // Обновляем списки
        this.updateLists();
    }

    updateLists() {
        // Обновление списков и других сложных элементов
        const aboutList = document.querySelector('.about-list');
        if (aboutList) {
            aboutList.innerHTML = translations[this.currentLang].about_list
                .map(item => `<li>${item}</li>`)
                .join('');
        }

        // Обновление элементов геймплея
        const gameplaySteps = document.querySelectorAll('.gameplay-step');
        if (gameplaySteps.length) {
            translations[this.currentLang].gameplay_steps.forEach((step, index) => {
                const stepElement = gameplaySteps[index];
                if (stepElement) {
                    stepElement.querySelector('h3').textContent = step.title;
                    stepElement.querySelector('p').textContent = step.description;
                }
            });
        }

        // Обновление требований для повышения уровня
        const requirements = document.querySelectorAll('.requirement-item p[data-i18n^="requirements."]');
        requirements.forEach(req => {
            const index = req.dataset.i18n.split('.')[1];
            if (translations[this.currentLang].requirements[index]) {
                req.textContent = translations[this.currentLang].requirements[index];
            }
        });

        // Обновление заголовков таблицы
        const tableHeaders = document.querySelectorAll('th[data-i18n-key]');
        tableHeaders.forEach(header => {
            const key = header.dataset.i18nKey;
            if (translations[this.currentLang].table_headers[key]) {
                header.textContent = translations[this.currentLang].table_headers[key];
            }
        });

        // Обновление ежедневных заданий
        const dailyTasks = document.querySelectorAll('.task-item[data-task-key]');
        dailyTasks.forEach(task => {
            const key = task.dataset.taskKey;
            task.querySelector('p').textContent = translations[this.currentLang].daily_tasks_items[key];
        });

        // Обновление списка пассивного дохода
        const earningsList = document.querySelectorAll('.earnings-list li[data-i18n^="earnings_description."]');
        earningsList.forEach(item => {
            const index = item.dataset.i18n.split('.')[1];
            if (translations[this.currentLang].earnings_description[index]) {
                item.textContent = translations[this.currentLang].earnings_description[index];
            }
        });

        // Обновление реферальной программы
        const referralList = document.querySelectorAll('.referral-list li[data-i18n^="referral_description."]');
        referralList.forEach(item => {
            const index = item.dataset.i18n.split('.')[1];
            if (translations[this.currentLang].referral_description[index]) {
                item.textContent = translations[this.currentLang].referral_description[index];
            }
        });

        // Обновление заданий
        document.querySelectorAll('.task-item[data-task-key]').forEach(task => {
            const key = task.dataset.taskKey;
            const link = task.querySelector('a');
            if (link) {
                link.textContent = translations[this.currentLang].affiliate_items[key];
            } else {
                const p = task.querySelector('p');
                if (p) {
                    if (key === 'youtube' || key === 'telegram') {
                        p.textContent = translations[this.currentLang].daily_tasks_items[key];
                    } else {
                        p.textContent = translations[this.currentLang].affiliate_items[key];
                    }
                }
            }
        });

        // Обновление значений бустов
        document.querySelectorAll('[data-i18n^="boost_values."]').forEach(element => {
            const key = element.dataset.i18n;
            if (translations[this.currentLang][key]) {
                element.textContent = translations[this.currentLang][key];
            }
        });

        // Обновление элементов features
        document.querySelectorAll('.feature-item p[data-i18n^="features_items."]').forEach(element => {
            const index = element.dataset.i18n.split('.')[1];
            if (translations[this.currentLang].features_items[index]) {
                element.textContent = translations[this.currentLang].features_items[index];
            }
        });

        // Обновление текстов социальных сетей
        document.querySelectorAll('.social-link span[data-i18n^="social_links."]').forEach(element => {
            const key = element.dataset.i18n.split('.')[1];
            if (translations[this.currentLang].social_links[key]) {
                element.textContent = translations[this.currentLang].social_links[key];
            }
        });
    }
} 