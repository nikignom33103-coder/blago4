// Settings Module - Справочники и настройки
const SettingsModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        
        contentElement.innerHTML = `
            <div class="form-container">
                <h2>⚙️ Справочники и Настройки</h2>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" data-tab="wallets">💳 Кошельки</button>
                    <button class="tab-button" data-tab="donors">🤝 Благотворители</button>
                    <button class="tab-button" data-tab="units">🪖 Подразделения</button>
                    <button class="tab-button" data-tab="vehicles">🚗 Транспорт</button>
                    <button class="tab-button" data-tab="users">👥 Пользователи</button>
                </div>

                <!-- Wallets Tab -->
                <div id="wallets-tab" class="tab-content active">
                    <h3>💳 Управление кошельками</h3>
                    <form id="walletForm" class="form-row">
                        <div class="form-group">
                            <label>Название кошелька</label>
                            <input type="text" id="walletName" placeholder="Например: Т-Банк" required>
                        </div>

                        <div class="form-group">
                            <label>Тип</label>
                            <select id="walletType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="bank">🏦 Банковский счет</option>
                                <option value="card">💳 Карта</option>
                                <option value="cash">💵 Наличные</option>
                                <option value="wallet">💰 Е-кошелек</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Реквизиты</label>
                            <input type="text" id="walletDetails" placeholder="Номер счета, карты или кошелька">
                        </div>

                        <div class="form-group">
                            <label>Ответственное лицо</label>
                            <input type="text" id="walletResponsible" placeholder="ФИО">
                        </div>

                        <div class="form-group">
                            <label>Телефон</label>
                            <input type="tel" id="walletPhone" placeholder="+7 (XXX) XXX-XX-XX">
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить кошелек</button>
                    </form>

                    <div class="table-container" style="margin-top: 30px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Ответственный</th>
                                    <th>Контакт</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="walletsList">
                                <tr>
                                    <td colspan="5" class="empty-state">Кошельки еще не добавлены</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Donors Tab -->
                <div id="donors-tab" class="tab-content">
                    <h3>🤝 Справочник благотворителей</h3>
                    <form id="donorForm" class="form-row">
                        <div class="form-group">
                            <label>ФИО / Название организации</label>
                            <input type="text" id="donorName" placeholder="" required>
                        </div>

                        <div class="form-group">
                            <label>Тип</label>
                            <select id="donorType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="individual">👤 Физическое лицо</option>
                                <option value="org">🏢 Юридическое лицо</option>
                                <option value="group">🤝 Волонтерская группа</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Контактный телефон</label>
                            <input type="tel" id="donorPhone" placeholder="">
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="donorEmail" placeholder="">
                        </div>

                        <div class="form-group">
                            <label>Адрес</label>
                            <input type="text" id="donorAddress" placeholder="">
                        </div>

                        <div class="form-group">
                            <label>Все пожертвования</label>
                            <input type="number" id="donorTotal" placeholder="0" readonly step="0.01">
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить благотворителя</button>
                    </form>

                    <div class="table-container" style="margin-top: 30px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>ФИО / Организация</th>
                                    <th>Тип</th>
                                    <th>Телефон</th>
                                    <th>Email</th>
                                    <th>Всего пожертвовано</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="donorsList">
                                <tr>
                                    <td colspan="6" class="empty-state">Благотворители еще не добавлены</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Units Tab -->
                <div id="units-tab" class="tab-content">
                    <h3>🪖 Справочник подразделений</h3>
                    <form id="unitForm" class="form-row">
                        <div class="form-group">
                            <label>Название подразделения</label>
                            <input type="text" id="unitName" placeholder="Например: 128 ОТБр" required>
                        </div>

                        <div class="form-group">
                            <label>Командир</label>
                            <input type="text" id="unitCommander" placeholder="ФИО" required>
                        </div>

                        <div class="form-group">
                            <label>Контактный телефон</label>
                            <input type="tel" id="unitPhone" placeholder="">
                        </div>

                        <div class="form-group">
                            <label>Местоположение</label>
                            <input type="text" id="unitLocation" placeholder="Город, область" required>
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="unitEmail" placeholder="">
                        </div>

                        <div class="form-group">
                            <label>Примечание</label>
                            <textarea id="unitNote" placeholder="Особенности, потребности..." rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить подразделение</button>
                    </form>

                    <div class="table-container" style="margin-top: 30px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Подразделение</th>
                                    <th>Командир</th>
                                    <th>Местоположение</th>
                                    <th>Контакт</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="unitsList">
                                <tr>
                                    <td colspan="5" class="empty-state">Подразделения еще не добавлены</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Vehicles Tab -->
                <div id="vehicles-tab" class="tab-content">
                    <h3>🚗 Справочник транспорта</h3>
                    <form id="vehicleForm" class="form-row">
                        <div class="form-group">
                            <label>Номер автомобиля</label>
                            <input type="text" id="vehicleNumber" placeholder="XXX YYYY" required>
                        </div>

                        <div class="form-group">
                            <label>Марка и модель</label>
                            <input type="text" id="vehicleModel" placeholder="Газель, Камаз и т.д." required>
                        </div>

                        <div class="form-group">
                            <label>Тип</label>
                            <select id="vehicleType" required>
                                <option value="">-- Выберите тип --</option>
                                <option value="van">🚐 Фургон (Газель)</option>
                                <option value="truck">🚛 Грузовик (Камаз)</option>
                                <option value="minibus">🚌 Микроавтобус</option>
                                <option value="other">📦 Другое</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Грузоподъемность (тонн)</label>
                            <input type="number" id="vehicleCapacity" placeholder="5" step="0.1" required>
                        </div>

                        <div class="form-group">
                            <label>Основной водитель</label>
                            <input type="text" id="vehicleDriver" placeholder="ФИО">
                        </div>

                        <div class="form-group">
                            <label>Состояние</label>
                            <select id="vehicleCondition" required>
                                <option value="">-- Выберите --</option>
                                <option value="active">✅ Активен</option>
                                <option value="repair">🔧 На ремонте</option>
                                <option value="inactive">⛔ Неактивен</option>
                            </select>
                        </div>

                        <button type="submit" class="btn-success">✓ Добавить транспорт</button>
                    </form>

                    <div class="table-container" style="margin-top: 30px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Номер</th>
                                    <th>Модель</th>
                                    <th>Тип</th>
                                    <th>Грузоподъемность</th>
                                    <th>Водитель</th>
                                    <th>Состояние</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody id="vehiclesList">
                                <tr>
                                    <td colspan="7" class="empty-state">Транспорт еще не добавлен</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Users Tab -->
                <div id="users-tab" class="tab-content">
                    <h3>👥 Управление пользователями</h3>
                    <div style="background: #fef3c7; border-left: 4px solid #ea580c; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                        <p><strong>📌 Текущий пользователь:</strong> ${auth.currentUser?.email}</p>
                        <p><strong>🆔 ID:</strong> ${auth.currentUser?.uid}</p>
                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Имя</th>
                                    <th>Роль</th>
                                    <th>Статус</th>
                                    <th>Последний вход</th>
                                </tr>
                            </thead>
                            <tbody id="usersList">
                                <tr>
                                    <td colspan="5" class="empty-state">Пользователи еще не добавлены</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
                        <h4>🔐 Безопасность аккаунта</h4>
                        <button class="btn-secondary" onclick="SettingsModule.changePassword()" style="margin-right: 10px;">🔒 Изменить пароль</button>
                        <button class="btn-danger" onclick="SettingsModule.deleteAccount()">⚠️ Удалить аккаунт</button>
                    </div>
                </div>
            </div>
        `;

        this.loadWallets();
        this.loadDonors();
        this.loadUnits();
        this.loadVehicles();
        this.loadUsers();
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
        document.getElementById('walletForm')?.addEventListener('submit', (e) => this.handleWalletSubmit(e));
        document.getElementById('donorForm')?.addEventListener('submit', (e) => this.handleDonorSubmit(e));
        document.getElementById('unitForm')?.addEventListener('submit', (e) => this.handleUnitSubmit(e));
        document.getElementById('vehicleForm')?.addEventListener('submit', (e) => this.handleVehicleSubmit(e));
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    },

    async handleWalletSubmit(e) {
        e.preventDefault();

        const walletData = {
            name: document.getElementById('walletName').value,
            type: document.getElementById('walletType').value,
            details: document.getElementById('walletDetails').value,
            responsible: document.getElementById('walletResponsible').value,
            phone: document.getElementById('walletPhone').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('settings/wallets').push();
            await newRef.set(walletData);
            alert('✓ Кошелек добавлен!');
            e.target.reset();
            this.loadWallets();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleDonorSubmit(e) {
        e.preventDefault();

        const donorData = {
            name: document.getElementById('donorName').value,
            type: document.getElementById('donorType').value,
            phone: document.getElementById('donorPhone').value,
            email: document.getElementById('donorEmail').value,
            address: document.getElementById('donorAddress').value,
            total: 0,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('settings/donors').push();
            await newRef.set(donorData);
            alert('✓ Благотворитель добавлен!');
            e.target.reset();
            this.loadDonors();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleUnitSubmit(e) {
        e.preventDefault();

        const unitData = {
            name: document.getElementById('unitName').value,
            commander: document.getElementById('unitCommander').value,
            phone: document.getElementById('unitPhone').value,
            location: document.getElementById('unitLocation').value,
            email: document.getElementById('unitEmail').value,
            note: document.getElementById('unitNote').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('settings/units').push();
            await newRef.set(unitData);
            alert('✓ Подразделение добавлено!');
            e.target.reset();
            this.loadUnits();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async handleVehicleSubmit(e) {
        e.preventDefault();

        const vehicleData = {
            number: document.getElementById('vehicleNumber').value,
            model: document.getElementById('vehicleModel').value,
            type: document.getElementById('vehicleType').value,
            capacity: parseFloat(document.getElementById('vehicleCapacity').value),
            driver: document.getElementById('vehicleDriver').value,
            condition: document.getElementById('vehicleCondition').value,
            timestamp: new Date().getTime(),
            uid: auth.currentUser.uid
        };

        try {
            const newRef = database.ref('settings/vehicles').push();
            await newRef.set(vehicleData);
            alert('✓ Транспорт добавлен!');
            e.target.reset();
            this.loadVehicles();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    },

    async loadWallets() {
        try {
            const snapshot = await database.ref('settings/wallets').once('value');
            const walletsList = document.getElementById('walletsList');
            const data = snapshot.val();

            if (!data) {
                walletsList.innerHTML = `<tr><td colspan="5" class="empty-state">Кошельки еще не добавлены</td></tr>`;
                return;
            }

            let html = '';
            Object.entries(data).forEach(([key, wallet]) => {
                html += `
                    <tr>
                        <td>${wallet.name}</td>
                        <td>${wallet.type}</td>
                        <td>${wallet.responsible}</td>
                        <td>${wallet.phone}</td>
                        <td><button class="btn-secondary" onclick="SettingsModule.deleteWallet('${key}')" style="padding: 5px 10px;">🗑️</button></td>
                    </tr>
                `;
            });

            walletsList.innerHTML = html;
        } catch (error) {
            console.error('Error loading wallets:', error);
        }
    },

    async loadDonors() {
        try {
            const snapshot = await database.ref('settings/donors').once('value');
            const donorsList = document.getElementById('donorsList');
            const data = snapshot.val();

            if (!data) {
                donorsList.innerHTML = `<tr><td colspan="6" class="empty-state">Благотворители еще не добавлены</td></tr>`;
                return;
            }

            let html = '';
            Object.entries(data).forEach(([key, donor]) => {
                html += `
                    <tr>
                        <td>${donor.name}</td>
                        <td>${donor.type === 'individual' ? '👤' : '🏢'} ${donor.type}</td>
                        <td>${donor.phone || '-'}</td>
                        <td>${donor.email || '-'}</td>
                        <td>${App.formatCurrency(donor.total || 0)}</td>
                        <td><button class="btn-secondary" onclick="SettingsModule.deleteDonor('${key}')" style="padding: 5px 10px;">🗑️</button></td>
                    </tr>
                `;
            });

            donorsList.innerHTML = html;
        } catch (error) {
            console.error('Error loading donors:', error);
        }
    },

    async loadUnits() {
        try {
            const snapshot = await database.ref('settings/units').once('value');
            const unitsList = document.getElementById('unitsList');
            const data = snapshot.val();

            if (!data) {
                unitsList.innerHTML = `<tr><td colspan="5" class="empty-state">Подразделения еще не добавлены</td></tr>`;
                return;
            }

            let html = '';
            Object.entries(data).forEach(([key, unit]) => {
                html += `
                    <tr>
                        <td>${unit.name}</td>
                        <td>${unit.commander}</td>
                        <td>${unit.location}</td>
                        <td>${unit.phone || unit.email || '-'}</td>
                        <td><button class="btn-secondary" onclick="SettingsModule.deleteUnit('${key}')" style="padding: 5px 10px;">🗑️</button></td>
                    </tr>
                `;
            });

            unitsList.innerHTML = html;
        } catch (error) {
            console.error('Error loading units:', error);
        }
    },

    async loadVehicles() {
        try {
            const snapshot = await database.ref('settings/vehicles').once('value');
            const vehiclesList = document.getElementById('vehiclesList');
            const data = snapshot.val();

            if (!data) {
                vehiclesList.innerHTML = `<tr><td colspan="7" class="empty-state">Транспорт еще не добавлен</td></tr>`;
                return;
            }

            let html = '';
            Object.entries(data).forEach(([key, vehicle]) => {
                html += `
                    <tr>
                        <td>${vehicle.number}</td>
                        <td>${vehicle.model}</td>
                        <td>${vehicle.type}</td>
                        <td>${vehicle.capacity} т</td>
                        <td>${vehicle.driver || '-'}</td>
                        <td><span class="badge badge-${vehicle.condition === 'active' ? 'success' : 'warning'}">${vehicle.condition}</span></td>
                        <td><button class="btn-secondary" onclick="SettingsModule.deleteVehicle('${key}')" style="padding: 5px 10px;">🗑️</button></td>
                    </tr>
                `;
            });

            vehiclesList.innerHTML = html;
        } catch (error) {
            console.error('Error loading vehicles:', error);
        }
    },

    async loadUsers() {
        try {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = `
                <tr>
                    <td>${auth.currentUser?.email}</td>
                    <td>${auth.currentUser?.displayName || 'Не указано'}</td>
                    <td>Администратор</td>
                    <td><span class="badge badge-success">Активен</span></td>
                    <td>${App.formatDate(new Date())}</td>
                </tr>
            `;
        } catch (error) {
            console.error('Error loading users:', error);
        }
    },

    async deleteWallet(key) {
        if (confirm('Удалить кошелек?')) {
            try {
                await database.ref(`settings/wallets/${key}`).remove();
                this.loadWallets();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async deleteDonor(key) {
        if (confirm('Удалить благотворителя?')) {
            try {
                await database.ref(`settings/donors/${key}`).remove();
                this.loadDonors();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async deleteUnit(key) {
        if (confirm('Удалить подразделение?')) {
            try {
                await database.ref(`settings/units/${key}`).remove();
                this.loadUnits();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    async deleteVehicle(key) {
        if (confirm('Удалить транспорт?')) {
            try {
                await database.ref(`settings/vehicles/${key}`).remove();
                this.loadVehicles();
            } catch (error) {
                alert('Ошибка: ' + error.message);
            }
        }
    },

    changePassword() {
        prompt('Введите новый пароль:', '');
        // TODO: Implement password change
    },

    deleteAccount() {
        if (confirm('⚠️ Вы уверены? Это действие необратимо!')) {
            alert('Функция удаления аккаунта требует подтверждения');
            // TODO: Implement account deletion with confirmation
        }
    }
};
