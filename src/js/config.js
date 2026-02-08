// ============================================
// Firebase Configuration для "Благо дарить!"
// Версия: 1.4.0
// Дата последнего обновления: 8 февраля 2026
// Местоположение: г. Санкт-Петербург
// База данных: https://blago-a6270-default-rtdb.firebaseio.com/
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyDwQ_gQ_K-s8l-s9H-mQ1k2L3m4N5o6P7q8",
    authDomain: "blago-a6270.firebaseapp.com",
    databaseURL: "https://blago-a6270-default-rtdb.firebaseio.com",
    projectId: "blago-a6270",
    storageBucket: "blago-a6270.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Информация о версии приложения
const APP_VERSION = "1.4.0";
const APP_BUILD_DATE = "2026-02-08";
const APP_ORGANIZATION = "Благо дарить!";
const APP_CITY = "г. Санкт-Петербург";
const APP_WAREHOUSES = [
    { id: "warehouse_1", name: "Склад на Софийской ул.", city: "Санкт-Петербург" },
    { id: "warehouse_2", name: "Склад п. Песочный", city: "Санкт-Петербург" }
];

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to database and auth
const database = firebase.database();
const auth = firebase.auth();

// Global app state с информацией о версии
const appState = {
    currentUser: null,
    currentPage: 'dashboard',
    appVersion: "1.4.0",
    appBuildDate: "2026-02-08",
    organization: "Благо дарить!",
    city: "г. Санкт-Петербург",
    filters: {
        startDate: null,
        endDate: null,
        type: 'all'
    },
    selectedWarehouse: "warehouse_1",
    userSignature: null
};

console.log(`%c"Благо дарить!" v${appState.appVersion}`, 'color: #2563eb; font-size: 14px; font-weight: bold;');
console.log(`%cБаза данных инициализирована: ${firebaseConfig.databaseURL}`, 'color: #16a34a;');
