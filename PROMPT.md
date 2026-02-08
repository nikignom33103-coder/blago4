# 📝 AI Prompt для расширения проекта "Благо дарить!"

## Полное описание проекта для AI помощников

### 🎯 Контекст проекта

**Название:** Портал "Благо дарить!" - Система управления волонтерской помощью  
**Язык:** Русский (Русский интерфейс)  
**Платформа:** Веб-приложение (HTML5, CSS3, JavaScript)  
**Backend:** Firebase Realtime Database + Firebase Authentication  
**Цель:** Помощь волонтерской группе в управлении гуманитарной помощью и доставкой её на фронт

### 📋 Описание волонтерской группы

**Благо дарить!** - волонтерская организация, которая:
- Собирает гуманитарную помощь и денежные средства
- Организует рейсы доставки помощи участникам СВО
- Закупает необходимые товары для военных подразделений
- Ведет прозрачный учет всех операций
- Координирует волонтеров, водителей, благотворителей
- Публикует отчеты и просит постов в социальные сети

### 🏗️ Текущая архитектура

#### Frontend структура
```
index.html - точка входа с навигацией
src/
  ├── js/
  │ ├── config.js - конфиг Firebase
  │ ├── auth.js - аутентификация (email/password)
  │ ├── app.js - утилиты приложения
  │ ├── navigation.js - управление страницами
  │ └── modules/
  │   ├── dashboard.js - дашборд с KPI
  │   ├── finance.js - финансы (доход/расход/переводы)
  │   ├── trips.js - управление рейсами
  │   ├── collections.js - целевые сборы и заказы
  │   ├── warehouse.js - управление складом
  │   ├── presscenter.js - генераторы постов и отчетов
  │   └── settings.js - справочники и настройки
  └── css/
    ├── styles.css - глобальные стили
    └── dashboard.css - стили компонентов
```

#### Firebase структура данных
```
|- users/
|  └── {uid}/ { name, email, role, createdAt }
|
|- finance/
|  ├── income/ { source, donor, collection, amount, date }
|  ├── expenses/ { type, wallet, amount, date }
|  └── transfers/ { from, to, amount, date }
|
|- trips/ { city, date, type, driver, status }
|
|- collections/ { name, type, target, collected, status }
|
|- orders/ { name, unit, budget, items, status }
|
|- warehouse/
|  ├── inventory/ { name, quantity, price, category }
|  └── outgoing/ { item, quantity, to, date }
|
|- settings/
|  ├── wallets/ { name, type, details, responsible }
|  ├── donors/ { name, type, phone, email, address }
|  ├── units/ { name, commander, location, phone }
|  └── vehicles/ { number, model, capacity, driver, condition }
```

### 💻 Технологический стек

- **HTML5** - семантическая разметка
- **CSS3** - флексбокс, гриды, переходы, анимации
- **JavaScript ES6+** - классы, стрелочные функции, async/await
- **Firebase SDK v10.7.0** - реальная БД и аутентификация
- **Responsive Design** - мобильная оптимизация

### 🎨 Дизайн-система

- **Цветовая схема:** Gradients (фиолетово-синие), светлый фон
- **Компоненты:** Cards, buttons, tables, forms, modals, tabs
- **Иконки:** Emoji для визуального разнообразия
- **Typography:** Segoe UI, различные веса
- **Spacing:** Единая система отступов (CSS переменные)

### ✨ Существующие функции

#### 💰 Финансы
✅ Добавление доходов с выбором источника и благотворителя  
✅ Добавление расходов по категориям  
✅ Переводы между кошельками  
✅ Список доходов и расходов с удалением  
✅ Базовая статистика  

#### 🚗 Рейсы
✅ Планирование рейсов с выбором водителя и транспорта  
✅ Список запланированных рейсов  
✅ Удаление рейсов  
✅ Статус рейса  

#### 🎯 Сборы и заказы
✅ Создание целевых сборов с целевой суммой  
✅ Создание заказов для подразделений  
✅ Список сборов и заказов  
✅ Дашборд с кол-вом активных и собранных суммой  
✅ Progress-bars для отслеживания прогресса  

#### 📦 Склад
✅ Добавление товара на склад  
✅ Категоризация товаров  
✅ Списание товара со склада  
✅ История расходов  
✅ Общая стоимость и кол-во товаров  

#### 📢 Пресс-центр
✅ Генератор утренних постов  
✅ Генератор обеденных постов  
✅ Генератор "Магазин на диване"  
✅ Генератор финотчетов  
✅ Предпросмотр текстов  
✅ Копирование в буфер обмена  
✅ Архив черновиков  

#### ⚙️ Справочники
✅ Управление кошельками  
✅ Управление благотворителями  
✅ Управление подразделениями  
✅ Управление транспортом  
✅ Список пользователей  

### 🚀 Возможные улучшения и расширения

#### 1. **Платежи и интеграции** (высокий приоритет)
```
- Интеграция с Т-Банк API для прямых платежей
- Интеграция с Яндекс.Касса
- Интеграция с PayPal (для международных донаций)
- QR-коды для быстрого пожертвования
- Уведомления о поступлении платежей
```

#### 2. **Экспорт и отчетность** (высокий приоритет)
```
- Экспорт в PDF (финотчеты, накладные, чек-листы)
- Экспорт в Excel (для анализа в BI-системах)
- Экспорт в Word (для печати и рассылки)
- Генерация квитанций для благотворителей
- Печать накладных и чек-листов для рейсов
```

#### 3. **Коммуникация** (средний приоритет)
```
- Telegram Bot для уведомлений о новых сборах
- SMS-уведомления о срочных рейсах
- WhatsApp интеграция для группы волонтеров
- Email-рассылки для благотворителей
- Push-уведомления в браузере
```

#### 4. **Аналитика и BI** (средний приоритет)
```
- Дашборд с графиками в реальном времени
- Анализ эффективности рейсов
- ROI анализ по сборам
- Тепловые карты активности волонтеров
- Предсказание тенденций (ML)
```

#### 5. **Мобильное приложение** (средний приоритет)
```
- React Native приложение для iOS/Android
- Работа в offline режиме
- Синхронизация с облаком
- Мобильные уведомления
- Сканирование QR-кодов для быстрого добавления товара
```

#### 6. **Управление волонтерами** (низкий приоритет)
```
- Профили волонтеров с рейтингами
- Система заданий и назначений
- График работы волонтеров
- Учет часов работы
- Система вознаграждений и бонусов
```

#### 7. **Локализация и многоязычность** (низкий приоритет)
```
- Поддержка английского, украинского языков
- Локализация валют
- Локализация формата дат и чисел
```

#### 8. **Расширенная безопасность** (высокий приоритет)
```
- OAuth 2.0 аутентификация
- Двухфакторная аутентификация (2FA)
- Шифрование конфиденциальных данных
- Логирование всех действий
- Резервное копирование данных
```

### 🛠️ Инструкции для расширения

#### Добавление нового модуля

```javascript
// 1. Создайте файл src/js/modules/newmodule.js
const NewModule = {
    async init() {
        await this.render();
        this.setupEventListeners();
    },

    async render() {
        const contentElement = document.getElementById('pageContent');
        contentElement.innerHTML = `
            <!-- Ваша разметка -->
        `;
    },

    setupEventListeners() {
        // Слушатели событий
    }
};

// 2. Добавьте в index.html перед закрытием body:
// <script src="src/js/modules/newmodule.js"></script>

// 3. Добавьте навигационный элемент в боковое меню:
// <li class="nav-item">
//     <a href="#newpage" class="nav-link" data-page="newpage">
//         <span class="icon">🆕</span>
//         <span>Новый модуль</span>
//     </a>
// </li>

// 4. Добавьте в navigation.js в switch/case:
// case 'newpage':
//     if (typeof NewModule !== 'undefined') NewModule.init();
//     break;
```

#### Использование Firebase

```javascript
// Чтение данных
database.ref('путь/к/данным').once('value', (snapshot) => {
    const data = snapshot.val();
});

// Прослушивание изменений
database.ref('путь/к/данным').on('value', (snapshot) => {
    const data = snapshot.val();
});

// Добавление данных
database.ref('путь/к/данным').push().set(data);

// Обновление данных
database.ref('путь/к/данным/id').update(data);

// Удаление данных
database.ref('путь/к/данным/id').remove();
```

#### Форматирование и утилиты

```javascript
// Форматирование валюты
App.formatCurrency(1000); // → "1 000,00 ₽"

// Форматирование даты
App.formatDate('2026-02-08'); // → "8 февраля 2026 г."

// Создание элемента
const div = App.createElement('div', 'class-name', '<p>Content</p>');

// Получение диапазона дат
const range = App.getDateRange('month'); // {start, end}
```

### 📊 Примеры использования

#### Добавление платежной интеграции

```javascript
// В finance.js добавить:
async handlePaymentAPI(amount, description) {
    try {
        const response = await fetch('https://api.tinkoff.ru/v2/Init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TerminalKey: 'YOUR_TERMINAL_KEY',
                Amount: amount * 100, // в копейках
                OrderId: Date.now(),
                Description: description
            })
        });
        
        const data = await response.json();
        window.location.href = data.PaymentURL;
    } catch (error) {
        console.error('Payment error:', error);
    }
}
```

#### Добавление Telegram Bot

```javascript
// Создайте файл functions/telegramNotifier.js
const admin = require('firebase-admin');

exports.notifyOnNewCollection = functions.database
    .ref('collections/{collectionId}')
    .onCreate((snapshot, context) => {
        const collection = snapshot.val();
        const message = `🎯 Новый сбор: ${collection.name}\n💰 Целевая сумма: ${collection.target}₽`;
        
        // Отправить сообщение в Telegram
        sendTelegramMessage(message);
    });
```

#### Добавление экспорта в PDF

```javascript
// Установите: npm install jspdf html2canvas

// В finance.js добавить:
async exportReportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const element = document.getElementById('financeReport');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('финотчет.pdf');
}
```

### 🎯 Рекомендации для AI помощников

При работе с этим проектом:

1. **Сохраняйте структуру:** Не меняйте базовую архитектуру проекта
2. **Следуйте стилю кода:** Используйте тот же стиль (классы модулей, структура)
3. **Добавляйте комментарии:** Документируйте новый код на русском
4. **Проверяйте совместимость:** Убедитесь, что новый код работает с Firebase
5. **Тестируйте:** Проверяйте все новые функции перед коммитом
6. **Обновляйте README:** Добавляйте новые функции в документацию
7. **Улучшайте UX:** Сохраняйте единообразный дизайн
8. **Соблюдайте приватность:** Не сохраняйте конфиденциальные данные в коде

### 📞 Полезные ресурсы

- [Firebase Documentation](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

**Этот prompt может быть использован для:**
- Обучения новых разработчиков
- Расширения функционала AI помощниками
- Документирования проекта
- Планирования новых фич
- Интеграции с другими сервисами

**Версия:** 1.0  
**Последнее обновление:** февраль 2026  
**Автор:** Волонтерская группа "Благо дарить!"
