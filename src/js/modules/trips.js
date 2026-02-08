// Trips Module - Учет рейсов
const TripsModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>🚗 Управление рейсами</h2>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="planning">📋 План рейсов</button>
                    <button class="tab-button" data-tab="active">🚗 Активные рейсы</button>
                    <button class="tab-button" data-tab="reports">📊 Отчеты</button>
                </div>

                <!-- Planning Tab -->
                <div id="planning-tab" class="tab-content active">
                    <h3>Планирование нового рейса</h3>
                    <form id="tripPlanForm" class="form-row">
                        <div class="form-group">
                            <label>Город доставки</label>
                            <input type="text" id="tripCity" placeholder="Введите город" required>
                        </div>

                        <div class="form-group">
                            <label>Дата выезда</label>
                            <input type="date" id="tripDate" required>
                        </div>

                        <div class="form-group">
                            <label>Тип рейса</label>
                            <select id="tripType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="planned">📅 Плановый</option>
                                <option value="emergency">⚠️ Внеплановый (срочный)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Водитель</label>
                            <select id="tripDriver" required>
                                <option value="">-- Выберите водителя --</option>
                                <option value="driver1">👤 Иван Петров</option>
                                <option value="driver2">👤 Мария Сидорова</option>
                                <option value="driver3">👤 Сергей Иванов</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Сопровождающие</label>
                            <select id="tripAccompany" multiple>
                                <option value="acc1">👤 Петр Викторович</option>
                                <option value="acc2">👤 Анна Федоровна</option>
                                <option value="acc3">👤 Дмитрий Сергеевич</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Машина (можно несколько)</label>
                            <select id="tripVehicle" multiple>
                                <option value="van1">🚐 Газель (ХХХ 111)</option>
                                <option value="van2">🚐 Газель (ХХХ 222)</option>
                                <option value="truck1">🚛 Камаз (ХХХ 333)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Ответственный за колонну</label>
                            <select id="tripResponsible" required>
                                <option value="">-- Выберите --</option>
                                <option value="resp1">👤 Александр Аркадьевич</option>
                                <option value="resp2">👤 Елена Петровна</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Примечание</label>
                            <textarea id="tripNote" placeholder="Дополнительная информация..." rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-success">✓ Создать план рейса</button>
                    </form>

                    <!-- Trips List -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 Запланированные рейсы</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Город</th>
                                    <th>Тип</th>
                                    <th>Водитель</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="tripsList">
                                <tr>
                                    <td colspan="6" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Рейсы еще не планируются</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Active Trips Tab -->
                <div id="active-tab" class="tab-content">
                    <h3>Карточка активного рейса</h3>
                    <div class="filters-bar">
                        <select id="activeTripSelect" onchange="TripsModule.loadActiveTripCard()">
                            <option value="">-- Выберите рейс --</option>
                        </select>
                    </div>

                    <div id="activeTripCard"></div>

                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">🎯 Распределение по подразделениям</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Подразделение</th>
                                    <th>Командир</th>
                                    <th>Что везем</th>
                                    <th>Сумма</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody id="distributionList">
                                <tr>
                                    <td colspan="5" class="empty-state">Выберите рейс для просмотра распределения</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Reports Tab -->
                <div id="reports-tab" class="tab-content">
                    <h3>Отчеты по рейсам</h3>
                    <div class="filters-bar">
                        <div class="filter-group">
                            <label>Период:</label>
                            <select id="tripReportPeriod">
                                <option value="week">Неделя</option>
                                <option value="month" selected>Месяц</option>
                                <option value="year">Год</option>
                            </select>
                        </div>
                        <button class="btn-primary" onclick="TripsModule.generateTripReport()">📊 Создать отчет</button>
                    </div>

                    <div id="tripReportContainer"></div>
                </div>
            </div>
        `;

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tripDate').value = today;

        this.loadTripsList();
    },

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Form submission
        document.getElementById('tripPlanForm')?.addEventListener('submit', (e) => this.handleTripSubmit(e));
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    },

    async handleTripSubmit(e) {
        e.preventDefault();

        const tripData = {
            city: document.getElementById('tripCity').value,
            date: document.getElementById('tripDate').value,
            type: document.getElementById('tripType').value,
            driver: document.getElementById('tripDriver').value,
            accompany: Array.from(document.getElementById('tripAccompany').selectedOptions, o => o.value),
            vehicle: Array.from(document.getElementById('tripVehicle').selectedOptions, o => o.value),
            responsible: document.getElementById('tripResponsible').value,
            note: document.getElementById('tripNote').value,
            status: 'planned',
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('trips').push();
            await newRef.set(tripData);
            alert('✓ Рейс успешно запланирован!');
            e.target.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('tripDate').value = today;
            this.loadTripsList();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadTripsList() {
        try {
            const snapshot = await database.ref('trips').once('value');
            const tripsList = document.getElementById('tripsList');
            const data = snapshot.val();

            if (!data) {
                tripsList.innerHTML = `
                    <tr>
                        <td colspan="6" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Рейсы еще не планируются</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, trip]) => {
                html += `
                    <tr>
                        <td>${App.formatDate(trip.date)}</td>
                        <td>${trip.city}</td>
                        <td><span class="badge badge-info">${trip.type === 'planned' ? '📅 Плановый' : '⚠️ Срочный'}</span></td>
                        <td>${trip.driver}</td>
                        <td><span class="badge badge-success">${trip.status}</span></td>
                        <td>
                            <button class="btn-secondary" onclick="TripsModule.editTrip('${key}')" style="padding: 5px 10px;">✏️</button>
                            <button class="btn-secondary" onclick="TripsModule.deleteTrip('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            tripsList.innerHTML = html;
        } catch (error) {
            console.error('Error loading trips:', error);
        }
    },

    async deleteTrip(key) {
        if (confirm('Удалить этот рейс?')) {
            try {
                await database.ref(`trips/${key}`).remove();
                this.loadTripsList();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    loadActiveTripCard() {
        const tripId = document.getElementById('activeTripSelect').value;
        if (!tripId) return;

        const cardContainer = document.getElementById('activeTripCard');
        cardContainer.innerHTML = `
            <div class="dashboard-card">
                <h4>📍 Подробная информация о рейсе</h4>
                <p><strong>Город:</strong> Запорожье</p>
                <p><strong>Дата:</strong> 15 февраля 2026</p>
                <p><strong>Водитель:</strong> Иван Петров</p>
                <p><strong>Ответственный:</strong> Александр Аркадьевич</p>
                <hr>
                <h5>💰 Финансирование</h5>
                <p><strong>Бюджет рейса:</strong> 50,000 ₽</p>
                <p><strong>Расходы:</strong> 35,000 ₽</p>
                <p><strong>Остаток:</strong> 15,000 ₽</p>
            </div>
        `;
    },

    generateTripReport() {
        alert('Функция генерирования отчетов будет реализована');
    }
};
