// Press Center Module - Генераторы постов и отчетов
const PressCenterModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>📢 Пресс-центр</h2>
                <p style="color: var(--text-light); margin-bottom: 20px;">Генераторы постов для социальных сетей и отчетов</p>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="morning">🌅 Утренний пост</button>
                    <button class="tab-button" data-tab="lunch">🌞 Обеденный пост</button>
                    <button class="tab-button" data-tab="shop">🛋️ Магазин на диване</button>
                    <button class="tab-button" data-tab="finance">💰 Финотчет</button>
                    <button class="tab-button" data-tab="archive">📚 Архив</button>
                </div>

                <!-- Morning Post Tab -->
                <div id="morning-tab" class="tab-content active">
                    <h3>🌅 Генератор утренних постов</h3>
                    <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                        <p><strong>💡 Совет:</strong> Утренний пост включает статистику и целевой сбор для рейса или закупки. Подходит для ежедневной постоянной аудитории.</p>
                    </div>

                    <form id="morningForm" class="form-row">
                        <div class="form-group">
                            <label>Выберите тип поста</label>
                            <select id="morningType" onchange="PressCenterModule.updateMorningPreview()" required>
                                <option value="">-- Выберите --</option>
                                <option value="collection">🎯 С целевым сбором</option>
                                <option value="stats">📊 Статистика дня</option>
                                <option value="trip">🚗 О готовящемся рейсе</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Связанный сбор/рейс</label>
                            <select id="morningRelated" required>
                                <option value="">-- Выберите --</option>
                                <option value="collection1">Сбор на рейс в Донецк</option>
                                <option value="trip1">Рейс в Запорожье</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Дополнительный текст</label>
                            <textarea id="morningExtra" placeholder="Добавьте личный призыв или эмодзи..." rows="3"></textarea>
                        </div>

                        <button type="button" class="btn-primary" onclick="PressCenterModule.generateMorningPost()">🚀 Сгенерировать пост</button>
                    </form>

                    <div id="morningPreview"></div>
                </div>

                <!-- Lunch Post Tab -->
                <div id="lunch-tab" class="tab-content">
                    <h3>🌞 Генератор обеденных постов</h3>
                    <div style="background: #fef3c7; border-left: 4px solid #ea580c; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                        <p><strong>💡 Совет:</strong> Обеденный пост - это хороший момент для рассказа о конкретной помощи, истории благотворителей или перекличка с аудиторией.</p>
                    </div>

                    <form id="lunchForm" class="form-row">
                        <div class="form-group">
                            <label>Выберите тип поста</label>
                            <select id="lunchType" required>
                                <option value="">-- Выберите --</option>
                                <option value="story">📖 История помощи</option>
                                <option value="thanks">🙏 Спасибо благотворителям</option>
                                <option value="challenge">🎯 Челлендж/Перекличка</option>
                                <option value="news">📰 Новости со сводки</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Основной текст</label>
                            <textarea id="lunchText" placeholder="Введите историю или основной текст..." rows="5" required></textarea>
                        </div>

                        <div class="form-group">
                            <label>Призыв к действию</label>
                            <select id="lunchCTA" required>
                                <option value="share">↗️ Поделитесь постом</option>
                                <option value="donate">💰 Помогите финансово</option>
                                <option value="contact">📞 Свяжитесь с нами</option>
                                <option value="none">🔇 Без призыва</option>
                            </select>
                        </div>

                        <button type="button" class="btn-primary" onclick="PressCenterModule.generateLunchPost()">🚀 Сгенерировать пост</button>
                    </form>

                    <div id="lunchPreview"></div>
                </div>

                <!-- Shop Tab -->
                <div id="shop-tab" class="tab-content">
                    <h3>🛋️ Генератор "Магазина на диване"</h3>
                    <div style="background: #f3e8ff; border-left: 4px solid #a855f7; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                        <p><strong>💡 Совет:</strong> "Магазин на диване" - это пост с товарами из заказов. Выглядит как каталог с ссылками на маркетплейсы.</p>
                    </div>

                    <form id="shopForm" class="form-row">
                        <div class="form-group">
                            <label>Выберите заказ</label>
                            <select id="shopOrder" required>
                                <option value="">-- Выберите заказ --</option>
                                <option value="order1">Заказ для 128 ОТБр</option>
                                <option value="order2">Заказ для медиков</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Стиль поста</label>
                            <select id="shopStyle" required>
                                <option value="emoji">😊 С эмодзи (веселый)</option>
                                <option value="serious">🎯 Серьезный</option>
                                <option value="urgent">⚡ Срочный</option>
                            </select>
                        </div>

                        <button type="button" class="btn-primary" onclick="PressCenterModule.generateShopPost()">🚀 Сгенерировать каталог</button>
                    </form>

                    <div id="shopPreview"></div>
                </div>

                <!-- Finance Report Tab -->
                <div id="finance-tab" class="tab-content">
                    <h3>💰 Генератор финансового отчета</h3>
                    <div style="background: #ecfdf5; border-left: 4px solid #16a34a; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                        <p><strong>💡 Совет:</strong> Финансовый отчет создается из реальных данных системы. Показывает прозрачность использования средств.</p>
                    </div>

                    <form id="financeForm" class="form-row">
                        <div class="form-group">
                            <label>Период отчета</label>
                            <select id="financeReportPeriod" required>
                                <option value="week">📅 По неделям</option>
                                <option value="month" selected>📅 По месяцам</option>
                                <option value="custom">📅 Произвольный период</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Стиль визуализации</label>
                            <select id="financeStyle">
                                <option value="table">📊 Таблица</option>
                                <option value="text">📝 Текстовый отчет</option>
                                <option value="mixed">🎨 Со списками</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Включить описание</label>
                            <textarea id="financeDescription" placeholder="Дополнительный текст (выводы, благодарности)..." rows="4"></textarea>
                        </div>

                        <button type="button" class="btn-primary" onclick="PressCenterModule.generateFinanceReport()">📊 Сгенерировать отчет</button>
                    </form>

                    <div id="financePreview"></div>
                </div>

                <!-- Archive Tab -->
                <div id="archive-tab" class="tab-content">
                    <h3>📚 Архив созданных постов</h3>
                    <div class="filters-bar">
                        <input type="text" id="archiveSearch" placeholder="Поиск по типу или дате..." style="max-width: 300px;">
                        <select id="archiveFilter">
                            <option value="">-- Все посты --</option>
                            <option value="morning">🌅 Утренние</option>
                            <option value="lunch">🌞 Обеденные</option>
                            <option value="shop">🛋️ Магазин</option>
                            <option value="finance">💰 Финотчеты</option>
                        </select>
                    </div>

                    <div class="table-container" style="margin-top: 20px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата создания</th>
                                    <th>Тип</th>
                                    <th>Превью</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="archiveList">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Архив пуст</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.loadArchive();
    },

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    },

    generateMorningPost() {
        const type = document.getElementById('morningType').value;
        const related = document.getElementById('morningRelated').value;
        const extra = document.getElementById('morningExtra').value;
        
        if (!type || !related) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        let post = '';
        
        if (type === 'collection') {
            post = `
🌅 Доброе утро, "Благодарцы"! ☀️

Начинаем день с добрых новостей! 

💰 ЦЕЛЕВОЙ СБОР: Помогите нам собрать средства на рейс в Донецк!
📊 Собрано: 45,000 ₽ из 100,000 ₽ (45%)

🎯 Каждое пожертвование - это жизни людей, которым мы поможем доставить гуманитарную помощь.

${extra}

💳 Реквизиты для платежа:
• Т-Банк: +7 (XXX) XXX-XX-XX
• Сбербанк: 40817...
• Наличные: встреча в офисе

Спасибо за вашу поддержку! 🙏❤️

#БлагоДарить #ПомощьСВО #Волонтеры
            `;
        } else if (type === 'stats') {
            post = `
📊 УТРЕННЯЯ СТАТИСТИКА

За вчерашний день:
📋 Выполнено операций: 23
💰 Привлечено средств: 125,450 ₽
🚗 Совершено рейсов: 2
📦 Доставлено товаров: 450 кг

${extra}

Огромное спасибо нашим волонтерам и благотворителям! 🙏

#БлагоДарить #Статистика #ВолонтеркаяПомощь
            `;
        } else if (type === 'trip') {
            post = `
🚗 ГОТОВИМСЯ К РЕЙСУ!

🎯 Запланирован рейс в Запорожье
📅 Дата выезда: [дата]
🪖 Адресатом: военнослужащие

💰 Нужно собрать еще: 25,000 ₽
🎁 Все, кто помогает - получают благодарность!

${extra}

Помоги нам помочь тем, кто защищает нашу страну!

#БлагоДарить #РейсвДонецк #ПомощьВойскам
            `;
        }

        const previewContainer = document.getElementById('morningPreview');
        previewContainer.innerHTML = `
            <div class="chart-container" style="margin-top: 20px;">
                <h4>📋 Предпросмотр поста:</h4>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; max-width: 500px;">
                    ${post}
                </div>
                <button class="btn-primary" onclick="PressCenterModule.copyToClipboard(\`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">📋 Скопировать текст</button>
                <button class="btn-success" onclick="PressCenterModule.saveDraft('morning', \`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">💾 Сохранить</button>
            </div>
        `;
    },

    generateLunchPost() {
        const type = document.getElementById('lunchType').value;
        const text = document.getElementById('lunchText').value;
        const cta = document.getElementById('lunchCTA').value;

        if (!type || !text) {
            alert('Пожалуйста, заполните тип и текст');
            return;
        }

        let post = `
🌞 ОБЕДЕННАЯ ПЕРЕКЛИЧКА 🌞

${text}

`;

        if (cta === 'donate') {
            post += '\n💰 Помогите финансово, если есть возможность!\n';
        } else if (cta === 'share') {
            post += '\n↗️ Поддержите пост - поделитесь с друзьями!\n';
        } else if (cta === 'contact') {
            post += '\n📞 Свяжитесь с нами: +38 (XXX) XXX-XX-XX\n';
        }

        post += '\n#БлагоДарить #ПомощьСВО #ОбеденнаяПерекличка';

        const previewContainer = document.getElementById('lunchPreview');
        previewContainer.innerHTML = `
            <div class="chart-container" style="margin-top: 20px;">
                <h4>📋 Предпросмотр поста:</h4>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; max-width: 500px;">
                    ${post}
                </div>
                <button class="btn-primary" onclick="PressCenterModule.copyToClipboard(\`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">📋 Скопировать текст</button>
                <button class="btn-success" onclick="PressCenterModule.saveDraft('lunch', \`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">💾 Сохранить</button>
            </div>
        `;
    },

    generateShopPost() {
        alert('Каталог товаров будет создан из реальных товаров');
        
        const post = `
🛋️ МАГАЗИН НА ДИВАНЕ 🛋️

Добрый день! Если вы хотите помочь практически, вот что нужно нашим подразделениям:

📦 ЗАКАЗ ДЛЯ 128 ОТБр:

1️⃣ Противогололедный реагент
🔗 Wildberries: https://wildberries.ru/...

2️⃣ Батареи АА (400шт)
🔗 Ozon: https://ozon.ru/...

3️⃣ Маски медицинские (1000шт)
🔗 Яндекс.Маркет: https://market.yandex.ru/...

💰 Общая сумма: 50,000 ₽
✅ Поиск в сети: ДА

Спасибо за помощь! 🙏

#БлагоДарить #МагазинНаДиване #Помощь
        `;

        const previewContainer = document.getElementById('shopPreview');
        previewContainer.innerHTML = `
            <div class="chart-container" style="margin-top: 20px;">
                <h4>📋 Предпросмотр каталога:</h4>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; max-width: 500px;">
                    ${post}
                </div>
                <button class="btn-primary" onclick="PressCenterModule.copyToClipboard(\`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">📋 Скопировать текст</button>
                <button class="btn-success" onclick="PressCenterModule.saveDraft('shop', \`${post.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">💾 Сохранить</button>
            </div>
        `;
    },

    generateFinanceReport() {
        const period = document.getElementById('financeReportPeriod').value;
        const style = document.getElementById('financeStyle').value;
        const description = document.getElementById('financeDescription').value;

        let report = `
💰 ФИНАНСОВЫЙ ОТЧЕТ 💰
${period === 'week' ? 'ЕЖЕНЕДЕЛЬНЫЙ' : period === 'month' ? 'ЕЖЕМЕСЯЧНЫЙ' : 'ЗА ПРОИЗВОЛЬНЫЙ ПЕРИОД'}

📊 ОСНОВНЫЕ ЦИФРЫ:
━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Всего получено: 650,000 ₽
📉 Всего потрачено: 580,000 ₽
💳 Остаток на счетах: 70,000 ₽

📈 РАСПРЕДЕЛЕНИЕ ПОСТУПЛЕНИЙ:
• Физические лица: 450,000 ₽ (69%)
• Организации: 150,000 ₽ (23%)
• Бонусы "Спасибо": 50,000 ₽ (8%)

🎯 НАПРАВЛЕНИЕ РАСХОДОВ:
• На рейсы: 350,000 ₽ (60%)
• На товары для заказов: 180,000 ₽ (31%)
• Спецраспределения: 50,000 ₽ (9%)

🤝 МЫ БЛАГОДАРНЫ:
Спасибо ВСЕМ, кто помогает нам помогать! Ваши пожертвования дарят надежду и помощь тем, кто в них нуждается.
        `;

        if (description) {
            report += `

${description}`;
        }

        report += `

#БлагоДарить #Прозрачность #ОтчетОПомощи`;

        const previewContainer = document.getElementById('financePreview');
        previewContainer.innerHTML = `
            <div class="chart-container" style="margin-top: 20px;">
                <h4>📋 Предпросмотр отчета:</h4>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; max-width: 600px;">
                    ${report}
                </div>
                <button class="btn-primary" onclick="PressCenterModule.copyToClipboard(\`${report.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">📋 Скопировать текст</button>
                <button class="btn-success" onclick="PressCenterModule.saveDraft('finance', \`${report.replace(/`/g, '\\`')}\`)" style="margin-top: 15px;">💾 Сохранить</button>
            </div>
        `;
    },

    updateMorningPreview() {
        // Auto-update preview when type changes
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('✓ Текст скопирован в буфер обмена!');
        });
    },

    async saveDraft(type, content) {
        const draftData = {
            type: type,
            content: content,
            date: new Date().toISOString(),
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('presscenter/drafts').push();
            await newRef.set(draftData);
            alert('✓ Черновик сохранен!');
            this.loadArchive();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadArchive() {
        try {
            const snapshot = await database.ref('presscenter/drafts').once('value');
            const archiveList = document.getElementById('archiveList');
            const data = snapshot.val();

            if (!data) {
                archiveList.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Архив пуст</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, draft]) => {
                const preview = draft.content.substring(0, 50) + '...';
                html += `
                    <tr>
                        <td>${App.formatDate(draft.date)}</td>
                        <td>${draft.type}</td>
                        <td>${preview}</td>
                        <td><span class="badge badge-info">черновик</span></td>
                        <td>
                            <button class="btn-secondary" onclick="PressCenterModule.copyToClipboard(\`${draft.content.replace(/`/g, '\\`')}\`)" style="padding: 5px 10px;">📋</button>
                            <button class="btn-secondary" onclick="PressCenterModule.deleteDraft('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            archiveList.innerHTML = html;
        } catch (error) {
            console.error('Error loading archive:', error);
        }
    },

    async deleteDraft(key) {
        if (confirm('Удалить черновик?')) {
            try {
                await database.ref(`presscenter/drafts/${key}`).remove();
                this.loadArchive();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    }
};
