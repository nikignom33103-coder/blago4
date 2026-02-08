// Collections Module - Сборы и заказы
const CollectionsModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>🎯 Сборы и Заказы</h2>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="collections">💰 Целевые сборы</button>
                    <button class="tab-button" data-tab="orders">📦 Заказы</button>
                    <button class="tab-button" data-tab="dashboard">📊 Дашборд</button>
                </div>

                <!-- Collections Tab -->
                <div id="collections-tab" class="tab-content active">
                    <h3>Создать новый целевой сбор</h3>
                    <form id="collectionForm" class="form-row">
                        <div class="form-group">
                            <label>Название сбора</label>
                            <input type="text" id="collectionName" placeholder="Например: Сбор на рейс в Донецк" required>
                        </div>

                        <div class="form-group">
                            <label>Тип сбора</label>
                            <select id="collectionType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="trip">🚗 Финансирование рейса</option>
                                <option value="purchase">🛒 Закупка товаров</option>
                                <option value="general">📦 Общий кошелек</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Целевая сумма (₽)</label>
                            <input type="number" id="collectionTarget" placeholder="100000" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Описание</label>
                            <textarea id="collectionDescription" placeholder="Подробное описание причины сбора..." rows="3" required></textarea>
                        </div>

                        <div class="form-group">
                            <label>Срок сбора (дата)</label>
                            <input type="date" id="collectionDeadline" required>
                        </div>

                        <div class="form-group">
                            <label>Связанное подразделение/командир</label>
                            <input type="text" id="collectionLinked" placeholder="Введите название подразделения">
                        </div>

                        <div class="form-group">
                            <label>Приоритет</label>
                            <select id="collectionPriority">
                                <option value="low">🟢 Обычный</option>
                                <option value="medium">🟡 Важный</option>
                                <option value="high">🔴 Срочный</option>
                            </select>
                        </div>

                        <button type="submit" class="btn-success">✓ Создать сбор</button>
                    </form>

                    <!-- Collections List -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 Активные сборы</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Цель / Собрано</th>
                                    <th>Прогресс</th>
                                    <th>Срок</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="collectionsList">
                                <tr>
                                    <td colspan="6" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Сборы еще не созданы</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Orders Tab -->
                <div id="orders-tab" class="tab-content">
                    <h3>Создать новый заказ</h3>
                    <form id="orderForm" class="form-row">
                        <div class="form-group">
                            <label>Название заказа</label>
                            <input type="text" id="orderName" placeholder="Например: Заказ для 128 ОТБр" required>
                        </div>

                        <div class="form-group">
                            <label>Подразделение</label>
                            <select id="orderUnit" required>
                                <option value="">-- Выберите подразделение --</option>
                                <option value="unit1">🪖 128 ОТБр</option>
                                <option value="unit2">🪖 95 ОМБр</option>
                                <option value="unit3">🪖 92 ОМБр</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Командир</label>
                            <select id="orderCommander" required>
                                <option value="">-- Выберите командира --</option>
                                <option value="cmd1">👤 Иван Сидоров</option>
                                <option value="cmd2">👤 Петр Иванов</option>
                                <option value="cmd3">👤 Сергей Петров</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Список товаров (маркетплейсы)</label>
                            <textarea id="orderItems" placeholder="Ссылки на товары:\nhttps://wildberries.ru/...\nhttps://ozon.ru/..." rows="4" required></textarea>
                        </div>

                        <div class="form-group">
                            <label>Смета (₽)</label>
                            <input type="number" id="orderBudget" placeholder="50000" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Связанный сбор</label>
                            <select id="orderRelatedCollection">
                                <option value="">-- Не связан --</option>
                                <option value="collection1">Сбор на рейс в Донецк</option>
                            </select>
                        </div>

                        <button type="submit" class="btn-success">✓ Создать заказ</button>
                    </form>

                    <!-- Orders List -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📦 Активные заказы</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Подразделение</th>
                                    <th>Смета</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="ordersList">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Заказы еще не созданы</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Dashboard Tab -->
                <div id="dashboard-tab" class="tab-content">
                    <h3>📊 Дашборд сборов и заказов</h3>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Активных сборов</span>
                                <span class="card-icon">🎯</span>
                            </div>
                            <div class="card-value" id="activeCollectionsCount">0</div>
                            <div class="card-label">В процессе</div>
                        </div>

                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Собрано всего</span>
                                <span class="card-icon">💰</span>
                            </div>
                            <div class="card-value" id="totalCollected">₽0</div>
                            <div class="card-label">Во всех сборах</div>
                        </div>

                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Активные заказы</span>
                                <span class="card-icon">📦</span>
                            </div>
                            <div class="card-value" id="activeOrdersCount">0</div>
                            <div class="card-label">В процессе</div>
                        </div>

                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Сумма заказов</span>
                                <span class="card-icon">💸</span>
                            </div>
                            <div class="card-value" id="totalOrdersSum">₽0</div>
                            <div class="card-label">На все заказы</div>
                        </div>
                    </div>

                    <!-- Collections Progress -->
                    <div class="chart-container">
                        <h4>🎯 Прогресс по сборам</h4>
                        <div id="collectionsProgress"></div>
                    </div>
                </div>
            </div>
        `;

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        document.getElementById('collectionDeadline').value = deadline.toISOString().split('T')[0];
        document.getElementById('orderRelatedCollection').value = today;

        this.loadCollectionsList();
        this.loadOrdersList();
        this.updateDashboard();
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
        document.getElementById('collectionForm')?.addEventListener('submit', (e) => this.handleCollectionSubmit(e));
        document.getElementById('orderForm')?.addEventListener('submit', (e) => this.handleOrderSubmit(e));
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    },

    async handleCollectionSubmit(e) {
        e.preventDefault();

        const collectionData = {
            name: document.getElementById('collectionName').value,
            type: document.getElementById('collectionType').value,
            target: parseFloat(document.getElementById('collectionTarget').value),
            collected: 0,
            description: document.getElementById('collectionDescription').value,
            deadline: document.getElementById('collectionDeadline').value,
            linked: document.getElementById('collectionLinked').value,
            priority: document.getElementById('collectionPriority').value,
            status: 'active',
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('collections').push();
            await newRef.set(collectionData);
            alert('✓ Сбор успешно создан!');
            e.target.reset();
            this.loadCollectionsList();
            this.updateDashboard();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleOrderSubmit(e) {
        e.preventDefault();

        const orderData = {
            name: document.getElementById('orderName').value,
            unit: document.getElementById('orderUnit').value,
            commander: document.getElementById('orderCommander').value,
            items: document.getElementById('orderItems').value,
            budget: parseFloat(document.getElementById('orderBudget').value),
            relatedCollection: document.getElementById('orderRelatedCollection').value,
            status: 'active',
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('orders').push();
            await newRef.set(orderData);
            alert('✓ Заказ успешно создан!');
            e.target.reset();
            this.loadOrdersList();
            this.updateDashboard();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadCollectionsList() {
        try {
            const snapshot = await database.ref('collections').once('value');
            const collectionsList = document.getElementById('collectionsList');
            const data = snapshot.val();

            if (!data) {
                collectionsList.innerHTML = `
                    <tr>
                        <td colspan="6" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Сборы еще не созданы</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, collection]) => {
                const progress = (collection.collected / collection.target * 100).toFixed(1);
                html += `
                    <tr>
                        <td>${collection.name}</td>
                        <td>${collection.type === 'trip' ? '🚗 Рейс' : collection.type === 'purchase' ? '🛒 Закупка' : '📦 Общее'}</td>
                        <td>${App.formatCurrency(collection.target)} / ${App.formatCurrency(collection.collected)}</td>
                        <td>
                            <div style="background-color: #e5e7eb; height: 20px; border-radius: 4px; overflow: hidden;">
                                <div style="background-color: #3b82f6; height: 100%; width: ${progress}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8em;">
                                    ${progress}%
                                </div>
                            </div>
                        </td>
                        <td>${App.formatDate(collection.deadline)}</td>
                        <td>
                            <button class="btn-secondary" onclick="CollectionsModule.deleteCollection('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            collectionsList.innerHTML = html;
        } catch (error) {
            console.error('Error loading collections:', error);
        }
    },

    async loadOrdersList() {
        try {
            const snapshot = await database.ref('orders').once('value');
            const ordersList = document.getElementById('ordersList');
            const data = snapshot.val();

            if (!data) {
                ordersList.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Заказы еще не созданы</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let html = '';
            Object.entries(data).reverse().forEach(([key, order]) => {
                html += `
                    <tr>
                        <td>${order.name}</td>
                        <td>${order.unit}</td>
                        <td>${App.formatCurrency(order.budget)}</td>
                        <td><span class="badge badge-success">${order.status}</span></td>
                        <td>
                            <button class="btn-secondary" onclick="CollectionsModule.deleteOrder('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            ordersList.innerHTML = html;
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    },

    async deleteCollection(key) {
        if (confirm('Удалить сбор?')) {
            try {
                await database.ref(`collections/${key}`).remove();
                this.loadCollectionsList();
                this.updateDashboard();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async deleteOrder(key) {
        if (confirm('Удалить заказ?')) {
            try {
                await database.ref(`orders/${key}`).remove();
                this.loadOrdersList();
                this.updateDashboard();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async updateDashboard() {
        try {
            const collectionsSnapshot = await database.ref('collections').once('value');
            const ordersSnapshot = await database.ref('orders').once('value');

            const collections = collectionsSnapshot.val() || {};
            const orders = ordersSnapshot.val() || {};

            let activeCollections = 0;
            let totalCollected = 0;

            Object.values(collections).forEach(c => {
                if (c.status === 'active') activeCollections++;
                totalCollected += parseFloat(c.collected) || 0;
            });

            let totalOrdersSum = 0;
            Object.values(orders).forEach(o => {
                totalOrdersSum += parseFloat(o.budget) || 0;
            });

            document.getElementById('activeCollectionsCount').textContent = activeCollections;
            document.getElementById('totalCollected').textContent = App.formatCurrency(totalCollected);
            document.getElementById('activeOrdersCount').textContent = Object.keys(orders).length;
            document.getElementById('totalOrdersSum').textContent = App.formatCurrency(totalOrdersSum);
        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }
};
