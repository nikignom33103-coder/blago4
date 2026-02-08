// Finance Module - Управление финансами
const FinanceModule = {
    currentTab: 'income',
    
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>📊 Управление финансами</h2>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="income">💰 Доход</button>
                    <button class="tab-button" data-tab="expense">📉 Расход</button>
                    <button class="tab-button" data-tab="transfer">🔄 Перевод</button>
                    <button class="tab-button" data-tab="report">📈 Отчет</button>
                </div>

                <!-- Income Tab -->
                <div id="income-tab" class="tab-content active">
                    <h3>Добавить доход</h3>
                    <form id="incomeForm" class="form-row">
                        <div class="form-group">
                            <label>Источник</label>
                            <select id="incomeSource" required>
                                <option value="">-- Выберите источник --</option>
                                <option value="wallet-tinkoff">💳 Т-Банк</option>
                                <option value="wallet-sber">💳 Сбербанк</option>
                                <option value="wallet-cash">💵 Наличные</option>
                                <option value="wallet-spasibo">🎁 Спасибо</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Благотворитель</label>
                            <select id="donorSelect" required>
                                <option value="">-- Выберите благотворителя --</option>
                                <option value="individual">👤 Физ. лицо</option>
                                <option value="org">🏢 Организация</option>
                                <option value="partner">🤝 Партнерская группа</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Целевой сбор</label>
                            <select id="targetCollection" required>
                                <option value="">-- Выберите сбор --</option>
                                <option value="general">📦 Общий кошелек</option>
                                <option value="trip">🚗 На рейс</option>
                                <option value="purchase">🛒 На закупку</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Сумма (₽)</label>
                            <input type="number" id="incomeAmount" placeholder="100000" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Описание</label>
                            <textarea id="incomeDescription" placeholder="Комментарий..." rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Дата</label>
                            <input type="date" id="incomeDate" required>
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить доход</button>
                    </form>

                    <!-- Income List -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 История доходов</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Источник</th>
                                    <th>Благотворитель</th>
                                    <th>Сумма</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="incomeList">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Доходы еще не добавлены</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Expense Tab -->
                <div id="expense-tab" class="tab-content">
                    <h3>Добавить расход</h3>
                    <form id="expenseForm" class="form-row">
                        <div class="form-group">
                            <label>Назначение расхода</label>
                            <select id="expenseType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="purchase">🛒 Закупка товара</option>
                                <option value="trip">🚗 Расход на рейс</option>
                                <option value="transport">🚛 Топливо</option>
                                <option value="order">📦 Выполнение заказа</option>
                                <option value="admin">⚙️ Административные</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Кошелек</label>
                            <select id="expenseWallet" required>
                                <option value="">-- Выберите кошелек --</option>
                                <option value="wallet-tinkoff">💳 Т-Банк</option>
                                <option value="wallet-sber">💳 Сбербанк</option>
                                <option value="wallet-cash">💵 Наличные</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Сумма (₽)</label>
                            <input type="number" id="expenseAmount" placeholder="50000" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Описание</label>
                            <textarea id="expenseDescription" placeholder="Описание расхода..." rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Дата</label>
                            <input type="date" id="expenseDate" required>
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить расход</button>
                    </form>

                    <!-- Expense List -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 История расходов</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Тип</th>
                                    <th>Описание</th>
                                    <th>Сумма</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="expenseList">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Расходы еще не добавлены</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Transfer Tab -->
                <div id="transfer-tab" class="tab-content">
                    <h3>Перевод средств</h3>
                    <form id="transferForm" class="form-row">
                        <div class="form-group">
                            <label>Из кошелька</label>
                            <select id="transferFrom" required>
                                <option value="">-- Выберите --</option>
                                <option value="wallet-tinkoff">💳 Т-Банк</option>
                                <option value="wallet-sber">💳 Сбербанк</option>
                                <option value="wallet-cash">💵 Наличные</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>В кошелек</label>
                            <select id="transferTo" required>
                                <option value="">-- Выберите --</option>
                                <option value="wallet-tinkoff">💳 Т-Банк</option>
                                <option value="wallet-sber">💳 Сбербанк</option>
                                <option value="wallet-cash">💵 Наличные</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Сумма (₽)</label>
                            <input type="number" id="transferAmount" placeholder="10000" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Дата</label>
                            <input type="date" id="transferDate" required>
                        </div>

                        <button type="submit" class="btn-success">✓ Выполнить перевод</button>
                    </form>
                </div>

                <!-- Report Tab -->
                <div id="report-tab" class="tab-content">
                    <h3>Финансовый отчет</h3>
                    <div class="filters-bar">
                        <div class="filter-group">
                            <label>Период:</label>
                            <select id="reportPeriod">
                                <option value="day">День</option>
                                <option value="week">Неделя</option>
                                <option value="month" selected>Месяц</option>
                                <option value="year">Год</option>
                                <option value="custom">Произвольный</option>
                            </select>
                        </div>
                        <button class="btn-primary" onclick="FinanceModule.generateReport()">📊 Создать отчет</button>
                        <button class="btn-secondary" onclick="FinanceModule.exportReport()">📥 Экспортировать</button>
                    </div>

                    <div id="reportContainer"></div>
                </div>
            </div>
        `;

        // Set today's date for date inputs
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('incomeDate').value = today;
        document.getElementById('expenseDate').value = today;
        document.getElementById('transferDate').value = today;

        this.loadIncomeList();
        this.loadExpenseList();
    },

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Form submissions
        document.getElementById('incomeForm')?.addEventListener('submit', (e) => this.handleIncomeSubmit(e));
        document.getElementById('expenseForm')?.addEventListener('submit', (e) => this.handleExpenseSubmit(e));
        document.getElementById('transferForm')?.addEventListener('submit', (e) => this.handleTransferSubmit(e));
    },

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        this.currentTab = tabName;
    },

    async handleIncomeSubmit(e) {
        e.preventDefault();
        
        const incomeData = {
            source: document.getElementById('incomeSource').value,
            donor: document.getElementById('donorSelect').value,
            collection: document.getElementById('targetCollection').value,
            amount: parseFloat(document.getElementById('incomeAmount').value),
            description: document.getElementById('incomeDescription').value,
            date: document.getElementById('incomeDate').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('finance/income').push();
            await newRef.set(incomeData);
            alert('✓ Доход добавлен успешно!');
            e.target.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('incomeDate').value = today;
            this.loadIncomeList();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleExpenseSubmit(e) {
        e.preventDefault();
        
        const expenseData = {
            type: document.getElementById('expenseType').value,
            wallet: document.getElementById('expenseWallet').value,
            amount: parseFloat(document.getElementById('expenseAmount').value),
            description: document.getElementById('expenseDescription').value,
            date: document.getElementById('expenseDate').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('finance/expenses').push();
            await newRef.set(expenseData);
            alert('✓ Расход добавлен успешно!');
            e.target.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('expenseDate').value = today;
            this.loadExpenseList();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleTransferSubmit(e) {
        e.preventDefault();
        
        const transferData = {
            from: document.getElementById('transferFrom').value,
            to: document.getElementById('transferTo').value,
            amount: parseFloat(document.getElementById('transferAmount').value),
            date: document.getElementById('transferDate').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('finance/transfers').push();
            await newRef.set(transferData);
            alert('✓ Перевод выполнен успешно!');
            e.target.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('transferDate').value = today;
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadIncomeList() {
        try {
            const snapshot = await database.ref('finance/income').once('value');
            const incomeList = document.getElementById('incomeList');
            const data = snapshot.val();

            if (!data) {
                incomeList.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Доходы еще не добавлены</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, item]) => {
                html += `
                    <tr>
                        <td>${App.formatDate(item.date)}</td>
                        <td>${item.source}</td>
                        <td>${item.donor}</td>
                        <td>${App.formatCurrency(item.amount)}</td>
                        <td>
                            <button class="btn-secondary" onclick="FinanceModule.deleteIncome('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            incomeList.innerHTML = html;
        } catch (error) {
            console.error('Error loading income:', error);
        }
    },

    async loadExpenseList() {
        try {
            const snapshot = await database.ref('finance/expenses').once('value');
            const expenseList = document.getElementById('expenseList');
            const data = snapshot.val();

            if (!data) {
                expenseList.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Расходы еще не добавлены</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, item]) => {
                html += `
                    <tr>
                        <td>${App.formatDate(item.date)}</td>
                        <td>${item.type}</td>
                        <td>${item.description}</td>
                        <td>${App.formatCurrency(item.amount)}</td>
                        <td>
                            <button class="btn-secondary" onclick="FinanceModule.deleteExpense('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            expenseList.innerHTML = html;
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    },

    async deleteIncome(key) {
        if (confirm('Вы уверены, что хотите удалить этот доход?')) {
            try {
                await database.ref(`finance/income/${key}`).remove();
                this.loadIncomeList();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async deleteExpense(key) {
        if (confirm('Вы уверены, что хотите удалить этот расход?')) {
            try {
                await database.ref(`finance/expenses/${key}`).remove();
                this.loadExpenseList();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    generateReport() {
        const period = document.getElementById('reportPeriod').value;
        const reportContainer = document.getElementById('reportContainer');
        reportContainer.innerHTML = '<p>Отчет генерируется...</p>';
        // TODO: Implement report generation
    },

    exportReport() {
        alert('Функция экспортирования будет реализована');
    }
};
