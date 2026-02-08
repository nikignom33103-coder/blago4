// ============================================
// CRM Модуль для управления благотворителями
// Версия: 1.4.0
// г. Санкт-Петербург, 2026
// ============================================

const CRMModule = {
    
    init() {
        this.render();
        this.loadBenefactors();
    },

    // Рендерит интерфейс CRM
    render() {
        const pageDiv = document.getElementById('page-content');
        if (!pageDiv) return;

        pageDiv.innerHTML = `
            <div class="crm-container" style="padding: 20px;">
                <h1 style="color: #2563eb; margin-bottom: 20px;">🤝 CRM Платформа - Благотворители</h1>
                
                <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                    <strong>ℹ️ Информация:</strong> Управление благотворителями, история их вклада, анализ активности и рейтинг.
                </div>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
                    <button onclick="CRMModule.showAddBenefactor()" style="
                        padding: 15px;
                        background: #16a34a;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 14px;
                    ">➕ Добавить благ.</button>
                    
                    <button onclick="CRMModule.showStatistics()" style="
                        padding: 15px;
                        background: #2563eb;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 14px;
                    ">📊 Статистика</button>
                    
                    <button onclick="CRMModule.showRatings()" style="
                        padding: 15px;
                        background: #ea580c;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 14px;
                    ">⭐ Рейтинг</button>
                    
                    <button onclick="CRMModule.sendMassMailings()" style="
                        padding: 15px;
                        background: #7c3aed;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 14px;
                    ">📧 Массовая рассылка</button>
                </div>

                <div style="margin-top: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 15px;">📋 Список благотворителей</h2>
                    
                    <div style="margin-bottom: 15px;">
                        <input type="text" id="benefactor-search" placeholder="Поиск благотворителя..." style="
                            width: 300px;
                            padding: 10px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                        " onkeyup="CRMModule.filterBenefactors(this.value)">
                    </div>

                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f0f9ff; border-bottom: 2px solid #2563eb;">
                                <th style="padding: 10px; text-align: left;">ФИО / Название</th>
                                <th style="padding: 10px; text-align: left;">Тип</th>
                                <th style="padding: 10px; text-align: right;">Сумма помощи</th>
                                <th style="padding: 10px; text-align: center;">Кол-во вкладов</th>
                                <th style="padding: 10px; text-align: center;">⭐ Рейтинг</th>
                                <th style="padding: 10px; text-align: center;">Действия</th>
                            </tr>
                        </thead>
                        <tbody id="benefactors-table-body">
                            <tr><td colspan="6" style="padding: 20px; text-align: center; color: #999;">Загрузка...</td></tr>
                        </tbody>
                    </table>
                </div>

                <div id="crm-details" style="display: none; margin-top: 30px;"></div>
            </div>
        `;

        // Стили для таблицы
        const style = document.createElement('style');
        style.textContent = `
            .crm-container table tbody tr:hover {
                background-color: #f3f4f6;
            }
            .crm-container table tbody tr:nth-child(even) {
                background-color: #fafafa;
            }
            .crm-container table td {
                padding: 12px 10px;
                border-bottom: 1px solid #e5e7eb;
            }
        `;
        document.head.appendChild(style);
    },

    // Загружает благотворителей из базы
    async loadBenefactors() {
        try {
            const snapshot = await database.ref('settings/donors').once('value');
            const donors = snapshot.val() || {};
            
            const tbody = document.getElementById('benefactors-table-body');
            tbody.innerHTML = '';

            if (Object.keys(donors).length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: #999;">Нет благотворителей</td></tr>';
                return;
            }

            for (const [id, donor] of Object.entries(donors)) {
                const row = document.createElement('tr');
                
                // Рассчитываем рейтинг
                const rating = this.calculateRating(donor);
                const ratingStars = '⭐'.repeat(Math.ceil(rating));

                row.innerHTML = `
                    <td><strong style="color: #2563eb;">${donor.name || 'Неизвестно'}</strong></td>
                    <td>${donor.type === 'individual' ? '👤 Физ. лицо' : '🏢 Юр. лицо'}</td>
                    <td style="text-align: right; font-weight: bold; color: #16a34a;">${App.formatCurrency(donor.totalAmount || 0)}</td>
                    <td style="text-align: center;">${donor.contributionCount || 0}</td>
                    <td style="text-align: center;">${ratingStars}</td>
                    <td style="text-align: center;">
                        <button onclick="CRMModule.showDetails('${id}')" style="
                            padding: 5px 10px;
                            background: #2563eb;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 12px;
                        ">👁️ Просмотр</button>
                    </td>
                </tr>
                `;
                
                tbody.appendChild(row);
            }
        } catch (error) {
            console.error('❌ Ошибка при загрузке благотворителей:', error);
        }
    },

    // Рассчитывает рейтинг благотворителя
    calculateRating(donor) {
        let rating = 1;
        
        // Базовый рейтинг + за сумму
        if (donor.totalAmount) {
            if (donor.totalAmount >= 100000) rating = 5;
            else if (donor.totalAmount >= 50000) rating = 4;
            else if (donor.totalAmount >= 10000) rating = 3;
            else if (donor.totalAmount >= 1000) rating = 2;
        }
        
        // Бонус за количество вкладов
        if (donor.contributionCount && donor.contributionCount > 5) rating = Math.min(5, rating + 1);
        
        return rating;
    },

    // Показывает детальную информацию благотворителя
    async showDetails(donorId) {
        try {
            const snapshot = await database.ref(`settings/donors/${donorId}`).once('value');
            const donor = snapshot.val();

            if (!donor) {
                alert('❌ Благотворитель не найден');
                return;
            }

            const detailsDiv = document.getElementById('crm-details');
            
            detailsDiv.innerHTML = `
                <div style="
                    background: white;
                    border: 2px solid #2563eb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-top: 20px;
                ">
                    <h2 style="color: #2563eb; margin-bottom: 20px;">
                        ${donor.type === 'individual' ? '👤' : '🏢'} Карточка благотворителя: ${donor.name}
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div>
                            <div style="color: #666; font-size: 12px;">Тип:</div>
                            <div style="font-weight: bold; font-size: 16px; margin-bottom: 15px;">
                                ${donor.type === 'individual' ? '👤 Физическое лицо' : '🏢 Юридическое лицо'}
                            </div>
                            
                            <div style="color: #666; font-size: 12px;">Контакт:</div>
                            <div style="font-weight: bold; margin-bottom: 15px;">${donor.contact || 'Не указан'}</div>
                            
                            <div style="color: #666; font-size: 12px;">Телефон:</div>
                            <div style="font-weight: bold; margin-bottom: 15px;">${donor.phone || 'Не указан'}</div>
                        </div>
                        
                        <div>
                            <div style="color: #666; font-size: 12px;">Всего помощь:</div>
                            <div style="font-weight: bold; font-size: 18px; color: #16a34a; margin-bottom: 15px;">
                                ${App.formatCurrency(donor.totalAmount || 0)}
                            </div>
                            
                            <div style="color: #666; font-size: 12px;">Количество вкладов:</div>
                            <div style="font-weight: bold; margin-bottom: 15px;">${donor.contributionCount || 0}</div>
                            
                            <div style="color: #666; font-size: 12px;">Рейтинг:</div>
                            <div style="font-weight: bold; margin-bottom: 15px;">
                                ${'⭐'.repeat(this.calculateRating(donor))}
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 4px;">
                        <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">📝 История помощи:</h3>
                        <div>${donor.history ? JSON.stringify(donor.history, null, 2) : 'История не найдена'}</div>
                    </div>
                </div>
            `;
            
            detailsDiv.style.display = 'block';
        } catch (error) {
            console.error('❌ Ошибка:', error);
        }
    },

    // Добавляет нового благотворителя
    showAddBenefactor() {
        const name = prompt('Введите имя благотворителя:');
        if (!name) return;

        const type = confirm('Выберите: OK = Физ. лицо, Отмена = Юр. лицо') ? 'individual' : 'corporate';

        alert('✅ Нового благотворителя можно добавить через модуль "Справочники" → "Доноры"');
    },

    // Показывает статистику
    showStatistics() {
        alert('📊 Статистика благотворителей (функция в разработке)');
    },

    // Показывает рейтинги
    showRatings() {
        alert('⭐ Рейтинги благотворителей (функция в разработке)');
    },

    // Отправляет массовую рассылку
    sendMassMailings() {
        alert('📧 Массовая рассылка благодарственных писем (функция в разработке)');
    },

    // Фильтрует благотворителей по поиску
    filterBenefactors(searchText) {
        const tbody = document.getElementById('benefactors-table-body');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchText.toLowerCase()) ? '' : 'none';
        });
    }
};
