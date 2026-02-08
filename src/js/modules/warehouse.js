// Warehouse Module - Управление складом
const WarehouseModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>📦 Управление складом</h2>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="inventory">📊 Остатки</button>
                    <button class="tab-button" data-tab="incoming">📥 Приход</button>
                    <button class="tab-button" data-tab="outgoing">📤 Расход</button>
                    <button class="tab-button" data-tab="reports">📈 Отчеты</button>
                </div>

                <!-- Inventory Tab -->
                <div id="inventory-tab" class="tab-content active">
                    <h3>📊 Остатки на складе</h3>
                    <div class="filters-bar">
                        <input type="text" id="warehouseSearch" placeholder="Поиск товара..." style="max-width: 300px;">
                        <button class="btn-primary" onclick="WarehouseModule.updateInventory()">🔄 Обновить</button>
                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Товар</th>
                                    <th>Категория</th>
                                    <th>Количество</th>
                                    <th>Единица</th>
                                    <th>Стоимость (₽)</th>
                                    <th>Итого (₽)</th>
                                    <th>Последнее движение</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="inventoryList">
                                <tr>
                                    <td colspan="8" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>Товары на складе отсутствуют</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Summary Stats -->
                    <div class="dashboard-grid" style="margin-top: 30px;">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Видов товаров</span>
                                <span class="card-icon">📦</span>
                            </div>
                            <div class="card-value" id="totalItems">0</div>
                            <div class="card-label">Уникальных позиций</div>
                        </div>

                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">Общая стоимость</span>
                                <span class="card-icon">💰</span>
                            </div>
                            <div class="card-value" id="totalValue">₽0</div>
                            <div class="card-label">Оценка запасов</div>
                        </div>

                        <div class="dashboard-card">
                            <div class="card-header">
                                <span class="card-title">На низком уровне</span>
                                <span class="card-icon">⚠️</span>
                            </div>
                            <div class="card-value" id="lowStock">0</div>
                            <div class="card-label">Требуют пополнения</div>
                        </div>
                    </div>
                </div>

                <!-- Incoming Tab -->
                <div id="incoming-tab" class="tab-content">
                    <h3>📥 Приход товара на склад</h3>
                    <form id="incomingForm" class="form-row">
                        <div class="form-group">
                            <label>Товар</label>
                            <input type="text" id="itemName" placeholder="Название товара" required>
                        </div>

                        <div class="form-group">
                            <label>Категория</label>
                            <select id="itemCategory" required>
                                <option value="">-- Выберите категорию --</option>
                                <option value="medical">🏥 Медикаменты</option>
                                <option value="clothes">👕 Одежда</option>
                                <option value="food">🍞 Продукты</option>
                                <option value="equipment">🔧 Оборудование</option>
                                <option value="other">📦 Прочее</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Источник (благотворитель)</label>
                            <select id="donorSource" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="individual">👤 Физ. лицо</option>
                                <option value="org">🏢 Организация</option>
                                <option value="purchase">🛒 Наш закуп</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" id="itemQuantity" placeholder="100" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Единица измерения</label>
                            <select id="itemUnit" required>
                                <option value="шт">шт (штука)</option>
                                <option value="кг">кг (килограмм)</option>
                                <option value="л">л (литр)</option>
                                <option value="уп">уп (упаковка)</option>
                                <option value="компл">компл (комплект)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Стоимость за единицу (₽)</label>
                            <input type="number" id="itemPrice" placeholder="100" step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Связь с заказом/рейсом</label>
                            <select id="warehouseRelation">
                                <option value="">-- Не связано --</option>
                                <option value="collection1">Сбор на рейс</option>
                                <option value="order1">Заказ для подразделения</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Примечание</label>
                            <textarea id="itemNote" placeholder="Дополнительная информация..." rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить товар</button>
                    </form>
                </div>

                <!-- Outgoing Tab -->
                <div id="outgoing-tab" class="tab-content">
                    <h3>📤 Расход товара со склада</h3>
                    <form id="outgoingForm" class="form-row">
                        <div class="form-group">
                            <label>Товар</label>
                            <select id="outgoingItem" required>
                                <option value="">-- Выберите товар --</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" id="outgoingQuantity" placeholder="50" required step="0.01">
                        </div>

                        <div class="form-group">
                            <label>Куда отправляется</label>
                            <select id="outgoingTo" required>
                                <option value="">-- Выберите место --</option>
                                <option value="trip1">🚗 Рейс в Донецк</option>
                                <option value="unit1">🪖 128 ОТБр</option>
                                <option value="other">📦 Другое</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Дата</label>
                            <input type="date" id="outgoingDate" required>
                        </div>

                        <div class="form-group">
                            <label>Примечание</label>
                            <textarea id="outgoingNote" placeholder="Комментарий..." rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-success">✓ Списать товар</button>
                    </form>

                    <!-- Outgoing History -->
                    <div class="table-container" style="margin-top: 30px;">
                        <h3 style="padding: 20px 20px 0 20px; margin: 0;">📋 История расходов</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Товар</th>
                                    <th>Количество</th>
                                    <th>Куда</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="outgoingList">
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <div class="empty-state-icon">📭</div>
                                        <div>История расходов пуста</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Reports Tab -->
                <div id="reports-tab" class="tab-content">
                    <h3>📈 Отчеты по складу</h3>
                    <div class="filters-bar">
                        <div class="filter-group">
                            <label>Период:</label>
                            <select id="warehouseReportPeriod">
                                <option value="week">Неделя</option>
                                <option value="month" selected>Месяц</option>
                                <option value="year">Год</option>
                            </select>
                        </div>
                        <button class="btn-primary" onclick="WarehouseModule.generateWarehouseReport()">📊 Создать отчет</button>
                    </div>

                    <div id="warehouseReportContainer"></div>
                </div>
            </div>
        `;

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('outgoingDate').value = today;

        this.loadInventory();
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
        document.getElementById('incomingForm')?.addEventListener('submit', (e) => this.handleIncomingSubmit(e));
        document.getElementById('outgoingForm')?.addEventListener('submit', (e) => this.handleOutgoingSubmit(e));

        // Search
        document.getElementById('warehouseSearch')?.addEventListener('keyup', (e) => this.filterInventory(e.target.value));
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    },

    async handleIncomingSubmit(e) {
        e.preventDefault();

        const incomingData = {
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            source: document.getElementById('donorSource').value,
            quantity: parseFloat(document.getElementById('itemQuantity').value),
            unit: document.getElementById('itemUnit').value,
            price: parseFloat(document.getElementById('itemPrice').value) || 0,
            relation: document.getElementById('warehouseRelation').value,
            note: document.getElementById('itemNote').value,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('warehouse/inventory').push();
            await newRef.set(incomingData);
            alert('✓ Товар успешно добавлен!');
            e.target.reset();
            this.loadInventory();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleOutgoingSubmit(e) {
        e.preventDefault();

        const outgoingData = {
            item: document.getElementById('outgoingItem').value,
            quantity: parseFloat(document.getElementById('outgoingQuantity').value),
            to: document.getElementById('outgoingTo').value,
            date: document.getElementById('outgoingDate').value,
            note: document.getElementById('outgoingNote').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('warehouse/outgoing').push();
            await newRef.set(outgoingData);
            alert('✓ Товар списан со склада!');
            e.target.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('outgoingDate').value = today;
            this.loadInventory();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadInventory() {
        try {
            const snapshot = await database.ref('warehouse/inventory').once('value');
            const inventoryList = document.getElementById('inventoryList');
            const data = snapshot.val();

            if (!data) {
                inventoryList.innerHTML = `
                    <tr>
                        <td colspan="8" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div>Товары на складе отсутствуют</div>
                        </td>
                    </tr>
                `;
                return;
            }

            let totalItems = 0;
            let totalValue = 0;
            let lowStock = 0;

            let html = '';
            Object.entries(data).reverse().forEach(([key, item]) => {
                totalItems++;
                const total = item.quantity * item.price;
                totalValue += total;

                if (item.quantity < 10) lowStock++;

                html += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>${item.quantity}</td>
                        <td>${item.unit}</td>
                        <td>${App.formatCurrency(item.price)}</td>
                        <td>${App.formatCurrency(total)}</td>
                        <td>${App.formatDate(item.date)}</td>
                        <td>
                            <button class="btn-secondary" onclick="WarehouseModule.deleteItem('${key}')" style="padding: 5px 10px;">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            inventoryList.innerHTML = html;
            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('totalValue').textContent = App.formatCurrency(totalValue);
            document.getElementById('lowStock').textContent = lowStock;
        } catch (error) {
            console.error('Error loading inventory:', error);
        }
    },

    async deleteItem(key) {
        if (confirm('Удалить этот товар?')) {
            try {
                await database.ref(`warehouse/inventory/${key}`).remove();
                this.loadInventory();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    filterInventory(query) {
        const rows = document.querySelectorAll('#inventoryList tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
        });
    },

    updateInventory() {
        alert('Инвентаризация выполнена');
        this.loadInventory();
    },

    generateWarehouseReport() {
        alert('Функция генерирования отчетов будет реализована');
    }
};
