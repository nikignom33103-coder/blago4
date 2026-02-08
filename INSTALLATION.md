# 📥 Инструкция по установке и развертыванию

## 🚀 Быстрый старт (5 минут)

### Вариант 1: Локальное desarrollo

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/nikignom33103-coder/blago4.git
cd blago4

# 2. Запустите локальный сервер (Python)
python -m http.server 8000

# 3. Откройте в браузере
# http://localhost:8000
```

### Вариант 2: Открыть напрямую

Просто откройте файл `index.html` в браузере двойным кликом.

---

## 🔧 Полная установка

### Требования

- **Python 3.6+** (для локального сервера)
- **Git** (для клонирования репозитория)
- **Node.js 14+** (опционально, для npm)
- **Современный браузер** (Chrome, Firefox, Safari, Edge)

### Шаг 1: Клонирование репозитория

```bash
# Используя HTTPS (рекомендуется)
git clone https://github.com/nikignom33103-coder/blago4.git
cd blago4

# Или используя SSH (если настроен SSH ключ)
git clone git@github.com:nikignom33103-coder/blago4.git
cd blago4
```

### Шаг 2: Установка локального сервера

#### Windows (Python)
```bash
# Откройте PowerShell или CMD в папке проекта
python -m http.server 8000

# Проверен на Python 3.7, 3.8, 3.9, 3.10, 3.11
```

#### macOS (Python)
```bash
# Откройте Terminal в папке проекта
python3 -m http.server 8000
```

#### Linux (Python)
```bash
# Откройте терминал в папке проекта
python3 -m http.server 8000
```

#### Альтернатива: Node.js
```bash
# Установите глобально http-server
npm install -g http-server

# Запустите сервер
http-server .
```

#### Альтернатива: Live Server (VS Code)
```bash
# 1. Установите расширение "Live Server" в VS Code
# 2. Нажмите правой кнопкой на index.html
# 3. Выберите "Open with Live Server"
```

### Шаг 3: Откройте в браузере

После запуска сервера откройте в браузере:
```
http://localhost:8000
```

---

## 🔐 Конфигурация Firebase

### Получение ключей Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект (или используйте существующий)
3. Перейдите в Project Settings (значок шестеренки)
4. В разделе YOUR APPS найдите веб-приложение
5. Скопируйте код конфигурации

### Обновление конфигурации

Откройте файл `src/js/config.js` и обновите данные:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Правила безопасности Firebase

Для development добавьте правила:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "finance": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "trips": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "collections": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "warehouse": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "presscenter": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "settings": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

**⚠️ Важно:** Для production используйте более строгие правила!

---

## 📱 Первый запуск

### Создание аккаунта

1. Откройте приложение в браузере
2. Нажмите "Зарегистрироваться"
3. Введите email и пароль
4. Подтвердите регистрацию
5. Войдите в систему

### Первые действия

После входа:

1. **Справочники** → Добавьте кошельки, благотворителей, подразделения
2. **Финансы** → Добавьте первое пожертвование
3. **Рейсы** → Создайте пробный рейс
4. **Сборы** → Создайте целевой сбор

---

## 🌐 Развертывание на Интернет

### Вариант 1: GitHub Pages (РАСПРОСТРАНЕННЫЙ)

```bash
# 1. Убедитесь, что код закомичен
git add .
git commit -m "Ready for deployment"

# 2. Создайте ветку gh-pages
git subtree push --prefix . origin gh-pages

# Или через GitHub Actions:
# Добавьте .github/workflows/deploy.yml
```

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

Приложение будет доступно по адресу:
```
https://nikignom33103-coder.github.io/blago4
```

### Вариант 2: Netlify (РЕКОМЕНДУЕТСЯ)

#### Через веб-интерфейс

1. Перейдите на [Netlify.com](https://www.netlify.com/)
2. Нажмите "New site from Git"
3. Выберите GitHub и авторизуйтесь
4. Выберите репозиторий `blago4`
5. Оставьте значения по умолчанию
6. Нажмите "Deploy site"

#### Через Netlify CLI

```bash
# 1. Установите Netlify CLI
npm install -g netlify-cli

# 2. Авторизуйтесь
netlify login

# 3. Создайте новый сайт
netlify init

# 4. Разверните
netlify deploy --prod
```

### Вариант 3: Vercel

```bash
# 1. Установите Vercel CLI
npm install -g vercel

# 2. Разверните
vercel

# Следуйте инструкциям на экране
```

### Вариант 4: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - .:/app
```

Запуск:
```bash
docker-compose up
```

---

## 🔍 Проверка установки

### Тестовый чедлист

- [ ] Приложение загружается без ошибок
- [ ] Можно открыть форму входа
- [ ] Можно создать аккаунт
- [ ] Можно войти в систему
- [ ] Все иконки отображаются правильно
- [ ] Навигация работает корректно
- [ ] Данные сохраняются в Firebase
- [ ] Мобильная версия выглядит хорошо
- [ ] Нет ошибок в консоли браузера

### Проверка консоли

Откройте DevTools (F12) → Console и проверьте:
- Нет красных ошибок
- Firebase инициализирован (должно быть сообщение)

---

## 🐛 Решение проблем

### Ошибка: "Cannot GET /"

**Решение:** Убедитесь, что вы находитесь в папке `blago4` и сервер запущен:
```bash
cd blago4
python -m http.server 8000
```

### Firebase скажет: "Unexpected token < in JSON"

**Решение:** Проверьте правильность конфигурационных данных в `src/js/config.js`

### Приложение не загружает данные

**Решение:**
1. Проверьте интернет-соединение
2. Проверьте Firebase Rules
3. Проверьте в консоли точные ошибки
4. Убедитесь, что Firestore включен в Firebase

### "localhost:8000 отказывает в доступе"

**Решение:** Порт 8000 может быть занят. Используйте другой порт:
```bash
python -m http.server 8080
```

---

## 🔒 Security

### В разработке (development)

Используйте тестовые данные Firebase. Правила можно быть более свободными.

### В production

1. **Обновите Firebase Rules:**
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "root.child('users').child(auth.uid).exists()"
      }
    }
  }
}
```

2. **Включите HTTPS** на вашем сайте

3. **Используйте окружающие переменные:**
```javascript
// Не коммитьте конфиги с реальными ключами!
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    // ...
};
```

4. **Подпишитесь на Security Advisories** на GitHub

---

## 📊 Структура после установки

```
blago4/
├── index.html              ✅ Главная страница
├── src/
│   ├── js/
│   │   ├── config.js      ✅ Конфиг Firebase (отредактируйте!)
│   │   ├── auth.js        ✅ Аутентификация
│   │   ├── app.js         ✅ Основное приложение
│   │   ├── navigation.js  ✅ Навигация
│   │   └── modules/       ✅ Все модули
│   └── css/               ✅ Стили
├── package.json           ✅ Зависимости
├── README.md              ✅ Документация
├── PROMPT.md              ✅ AI Prompt
├── CONTRIBUTING.md        ✅ Вклад
├── LICENSE                ✅ Лицензия
└── .gitignore            ✅ Git ignore
```

---

## 📞 Нужна помощь?

- 📖 Читайте [README.md](README.md)
- 💬 Откройте GitHub Issue
- 📧 Email: dev@blagoopodarit.org
- 🤖 Используйте PROMPT.md для AI помощников

---

**Поздравляем! Приложение установлено и готово к использованию!** 🎉

*Спасибо что помогаете волонтерской группе "Благо дарить!"*
