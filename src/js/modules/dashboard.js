// Dashboard Module
const Dashboard = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        // Fetch data from Firebase
        const financeData = await this.getFinanceStats();
        const tripsData = await this.getTripsStats();
        const collectionsData = await this.getCollectionsStats();

        contentElement.innerHTML = `
            <div class="dashboard-grid">
                <!-- Finance Cards -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Общий доход</span>
                        <span class="card-icon">💰</span>
                    </div>
                    <div class="card-value">${App.formatCurrency(financeData.totalIncome)}</div>
                    <div class="card-label">Все источники</div>
                    <div class="card-change change-positive">↑ 12% от прошлого месяца</div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Расходы</span>
                        <span class="card-icon">📉</span>
                    </div>
                    <div class="card-value">${App.formatCurrency(financeData.totalExpenses)}</div>
                    <div class="card-label">В этом месяце</div>
                    <div class="card-change change-negative">↑ 5% от прошлого месяца</div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Баланс</span>
                        <span class="card-icon">💳</span>
                    </div>
                    <div class="card-value">${App.formatCurrency(financeData.balance)}</div>
                    <div class="card-label">Остаток средств</div>
                    <div class="card-change change-positive">Активно</div>
                </div>

                <!-- Trips Cards -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Рейсы</span>
                        <span class="card-icon">🚗</span>
                    </div>
                    <div class="card-value">${tripsData.totalTrips}</div>
                    <div class="card-label">Всего совершено</div>
                    <div class="card-change change-positive">В этом месяце</div>
                </div>

                <!-- Collections Cards -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Сборы</span>
                        <span class="card-icon">🎯</span>
                    </div>
                    <div class="card-value">${collectionsData.activeCollections}</div>
                    <div class="card-label">Активных сборов</div>
                    <div class="card-change change-positive">Идут сейчас</div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <span class="card-title">Сумма сборов</span>
                        <span class="card-icon">📊</span>
                    </div>
                    <div class="card-value">${App.formatCurrency(collectionsData.totalCollected)}</div>
                    <div class="card-label">Собрано в сборах</div>
                    <div class="card-change change-positive">От целевого +30%</div>
                </div>
            </div>

            <!-- Charts -->
            <div class="chart-container">
                <h3 class="chart-title">🎯 Статистика по периодам</h3>
                <div class="filters-bar">
                    <button class="btn-secondary" data-period="day">День</button>
                    <button class="btn-secondary" data-period="week">Неделя</button>
                    <button class="btn-secondary active" data-period="month">Месяц</button>
                    <button class="btn-secondary" data-period="year">Год</button>
                </div>
                <canvas id="dashboardChart"></canvas>
            </div>

            <!-- Recent Activities -->
            <div class="table-container">
                <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 Последние операции</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Тип</th>
                            <th>Описание</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody id="recentActivities">
                        <tr>
                            <td colspan="5" class="empty-state">
                                <div class="empty-state-icon">📭</div>
                                <div class="empty-state-title">Нет активности</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Quick Actions -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 30px;">
                <button class="btn-primary" onclick="navigationManager.navigateTo('finance')">
                    💰 Добавить операцию
                </button>
                <button class="btn-primary" onclick="navigationManager.navigateTo('trips')">
                    🚗 Планировать рейс
                </button>
                <button class="btn-primary" onclick="navigationManager.navigateTo('collections')">
                    🎯 Создать сбор
                </button>
                <button class="btn-primary" onclick="navigationManager.navigateTo('presscenter')">
                    📢 Генерировать пост
                </button>
            </div>
        `;
    },

    async getFinanceStats() {
        try {
            const snapshot = await database.ref('finance').once('value');
            const data = snapshot.val() || {};
            
            let totalIncome = 0;
            let totalExpenses = 0;

            if (data.income) {
                Object.values(data.income).forEach(item => {
                    totalIncome += parseFloat(item.amount) || 0;
                });
            }

            if (data.expenses) {
                Object.values(data.expenses).forEach(item => {
                    totalExpenses += parseFloat(item.amount) || 0;
                });
            }

            return {
                totalIncome,
                totalExpenses,
                balance: totalIncome - totalExpenses
            };
        } catch (error) {
            console.error('Error fetching finance stats:', error);
            return { totalIncome: 0, totalExpenses: 0, balance: 0 };
        }
    },

    async getTripsStats() {
        try {
            const snapshot = await database.ref('trips').once('value');
            const data = snapshot.val() || {};
            return {
                totalTrips: Object.keys(data).length
            };
        } catch (error) {
            console.error('Error fetching trips stats:', error);
            return { totalTrips: 0 };
        }
    },

    async getCollectionsStats() {
        try {
            const snapshot = await database.ref('collections').once('value');
            const data = snapshot.val() || {};
            
            let activeCollections = 0;
            let totalCollected = 0;

            Object.values(data).forEach(collection => {
                if (collection.status === 'active') activeCollections++;
                totalCollected += parseFloat(collection.collected) || 0;
            });

            return {
                activeCollections,
                totalCollected
            };
        } catch (error) {
            console.error('Error fetching collections stats:', error);
            return { activeCollections: 0, totalCollected: 0 };
        }
    },

    setupEventListeners() {
        // Period filter buttons
        document.querySelectorAll('[data-period]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-period]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
};
