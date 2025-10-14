# 🚀 Запуск ЛПТТ проекта

## ✅ ОДИН СКРИПТ — ВСЁ ЗАПУСКАЕТСЯ!

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Вариант 1: Умный запуск с проверками (РЕКОМЕНДУЕТСЯ)
npm start
```

**Что делает:**
- ✅ Проверяет все зависимости
- ✅ Проверяет PostgreSQL
- ✅ Проверяет Redis (опционально)
- ✅ Убивает процессы на занятых портах
- ✅ Запускает Backend + Frontend
- ✅ Красивые логи с цветами
- ✅ Ctrl+C останавливает всё

---

## 🎯 Альтернатива: Concurrently (быстрый запуск)

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Вариант 2: Быстрый запуск без проверок
npm run dev:all
```

**Что делает:**
- 🚀 Просто запускает Backend + Frontend
- 📊 Красивые логи в две колонки
- ⚡ Быстрее чем `npm start`

---

## 🛠️ Если порты заняты

```bash
# Убить все процессы на портах
npm run kill:ports

# Теперь запускай
npm start
```

---

## 📋 Что должно показать

### npm start (умный запуск):

```
🚀 ЛПТТ PROJECT LAUNCHER

ℹ Checking dependencies...
✅ Dependencies OK
ℹ Checking environment...
✅ Environment OK
ℹ Checking PostgreSQL...
✅ PostgreSQL OK
ℹ Checking Redis...
⚠️  Redis not running (cache disabled)
ℹ Optional: brew services start redis
ℹ Checking ports...
✅ All ports free

🎯 STARTING SERVICES

╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник             ║
║                                            ║
║   🔧 Backend:  http://localhost:3000      ║
║   🎨 Frontend: http://localhost:5173      ║
║                                            ║
║   Press Ctrl+C to stop all services       ║
╚════════════════════════════════════════════╝

 BACKEND  ╔════════════════════════════════════════════╗
 BACKEND  ║   🎓 ЛПТТ Электронный Дневник API        ║
 BACKEND  ║   ✅ Server:   http://localhost:3000     ║
 BACKEND  ╚════════════════════════════════════════════╝

 FRONTEND   VITE v5.3.1  ready in 823 ms
 FRONTEND   ➜  Local:   http://localhost:5173/
```

---

### npm run dev:all (быстрый запуск):

```
[BACKEND]  
[BACKEND]  ╔════════════════════════════════════════════╗
[BACKEND]  ║   🎓 ЛПТТ Электронный Дневник API        ║
[BACKEND]  ║   ✅ Server:   http://localhost:3000     ║
[BACKEND]  ╚════════════════════════════════════════════╝

[FRONTEND]   VITE v5.3.1  ready in 823 ms
[FRONTEND]   ➜  Local:   http://localhost:5173/
```

---

## ✅ Проверка что всё работает

### В новом терминале (⌘ + T):

```bash
# Проверь Backend
curl http://localhost:3000/api/health

# Должно вернуть:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-08..."
}
```

### В браузере:

Открой: http://localhost:5173

---

## 🛑 Остановка

### В терминале где запущен проект:

```
Нажми: Ctrl + C
```

**Оба сервиса остановятся автоматически!**

---

## 🐛 Troubleshooting

### ❌ "EADDRINUSE: port already in use"

```bash
# Убей все процессы
npm run kill:ports

# Запускай снова
npm start
```

---

### ❌ "PostgreSQL is not running"

```bash
# Проверь статус
brew services list | grep postgresql

# Запусти PostgreSQL
brew services start postgresql@14

# Создай БД если нужно
createdb lptt_db

# Примени миграции
cd backend
npx prisma migrate dev --name init
```

---

### ❌ "Backend dependencies not installed"

```bash
# Установи всё сразу
npm run install:all

# Или раздельно
npm install
cd backend && npm install
```

---

### ❌ "Backend .env file not found"

```bash
cd backend

# Скопируй пример
cp .env.example .env

# Отредактируй если нужно
nano .env

# Должна быть строка:
# DATABASE_URL="postgresql://vasiliidyahenko@localhost:5432/lptt_db"
```

---

### ⚠️ "Redis not running"

Это **НЕ ошибка**! Redis опционален.

Backend работает без Redis (просто нет кэша).

Если хочешь включить Redis:
```bash
brew install redis
brew services start redis
```

---

## 📦 Полезные команды

```bash
# Запустить всё (с проверками)
npm start

# Запустить всё (быстро)
npm run dev:all

# Только Backend
npm run dev:backend

# Только Frontend
npm run dev:frontend

# Убить процессы на портах
npm run kill:ports

# Установить все зависимости
npm run install:all

# Посмотреть логи Backend
# (в отдельном терминале)
tail -f backend/logs/*.log
```

---

## 🎯 Рекомендации

### Для разработки:

```bash
# Используй умный запуск
npm start
```

**Плюсы:**
- ✅ Проверяет всё перед запуском
- ✅ Автоматически убивает процессы на портах
- ✅ Показывает ошибки конфигурации
- ✅ Красивые цветные логи

---

### Если нужно быстро:

```bash
# Используй concurrently
npm run dev:all
```

**Плюсы:**
- ⚡ Быстрее на 2-3 секунды
- 📊 Компактный вывод
- 🚀 Меньше проверок

---

## 🔄 Первый запуск проекта

Если запускаешь проект **первый раз**:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# 1. Установить зависимости
npm run install:all

# 2. Настроить .env
cd backend
cp .env.example .env
# Отредактируй DATABASE_URL если нужно

# 3. Создать БД
createdb lptt_db

# 4. Применить миграции
npx prisma generate
npx prisma migrate dev --name init

# 5. Вернуться в корень
cd ..

# 6. Запустить всё
npm start
```

---

## 🎨 Что должно работать

### ✅ Backend (http://localhost:3000)

**Endpoints:**
- `GET /api/health` — Health check
- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Логин
- `GET /api/grades/student/:id` — Оценки
- `GET /api/schedule/group/:id` — Расписание
- `GET /api/rfid/cards` — RFID карты
- `GET /api/turnstiles` — Турникеты

**WebSocket:**
- `ws://localhost:3000` — Real-time updates

---

### ✅ Frontend (http://localhost:5173)

**Страницы:**
- `/` — Главная
- `/login` — Вход
- `/dashboard` — Дашборд студента
- `/grades` — Оценки
- `/schedule` — Расписание
- `/notes` — Конспекты
- `/profile` — Профиль
- `/admin` — Админ панель

---

## 📱 iOS приложение (опционально)

```bash
# Открой проект в Xcode
open ios-native/LPTTDiary.xcodeproj

# В Xcode:
# 1. Выбери симулятор (iPhone 15 Pro)
# 2. ⌘ + R (Run)
```

---

## ✅ ИТОГО

```bash
# ОДНА КОМАНДА — ВСЁ РАБОТАЕТ:
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web
npm start

# Открывай в браузере:
http://localhost:5173 (Frontend)
http://localhost:3000/api (Backend)
```

**Ctrl+C чтобы остановить всё!** 🎉
