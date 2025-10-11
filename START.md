# 🚀 Быстрый запуск ЛПТТ проекта

## ✅ Вариант 1: Запустить ВСЁ одной командой (рекомендуется)

```bash
# Перейди в корень проекта
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Запусти backend + frontend одновременно
npm run dev:all
```

**Откроются:**
- 🎨 **Frontend:** http://localhost:5173
- 🔧 **Backend API:** http://localhost:3000

---

## ✅ Вариант 2: Запустить раздельно (в разных терминалах)

### Terminal 1 — Backend

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend

# Запусти backend
npm run dev
```

**Должно показать:**
```
╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник API        ║
║   ✅ Server:   http://localhost:3000     ║
╚════════════════════════════════════════════╝
```

---

### Terminal 2 — Frontend

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Запусти frontend
npm run dev
```

**Должно показать:**
```
  ➜  Local:   http://localhost:5173/
```

---

## 🛠️ Если порты заняты

```bash
# Освободить порты
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:5000 | xargs kill -9  # Старый backend
lsof -ti:5173 | xargs kill -9  # Frontend

# Теперь запускай снова
npm run dev:all
```

---

## 📦 Redis (опционально, для кэша)

Backend работает **БЕЗ Redis**, но для кэширования можешь установить:

```bash
# Установить Redis
brew install redis

# Запустить Redis
brew services start redis

# Проверить
redis-cli ping
# Должно вернуть: PONG

# Остановить Redis (если нужно)
brew services stop redis
```

---

## ✅ Проверка что всё работает

### 1. Backend

```bash
curl http://localhost:3000/api/health
```

**Должно вернуть:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-..."
}
```

### 2. Frontend

Открой в браузере: http://localhost:5173

---

## 📱 Запуск iOS приложения (Xcode)

```bash
# Открой проект
open ios-native/LPTTDiary.xcodeproj

# В Xcode:
# 1. Выбери симулятор (iPhone 15 Pro)
# 2. Нажми ⌘ + R (Run)
```

---

## 🔄 Первый запуск проекта (только один раз)

Если запускаешь проект впервые:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# 1. Установить все зависимости
npm run install:all

# 2. Настроить базу данных
cd backend
createdb lptt_db
npx prisma generate
npx prisma migrate dev --name init

# 3. Запустить всё
cd ..
npm run dev:all
```

---

## 📋 Полезные команды

```bash
# Остановить всё (Ctrl + C в терминале)

# Посмотреть запущенные процессы
lsof -i :3000   # Backend
lsof -i :5173   # Frontend

# Очистить кэш npm
npm cache clean --force

# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
```

---

## 🐛 Troubleshooting

### ❌ "EADDRINUSE: port already in use"

```bash
# Убить процесс на порту
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### ❌ "Redis connection refused"

Это нормально! Backend работает без Redis.

Если хочешь включить Redis:
```bash
brew services start redis
```

### ❌ "Cannot find module"

```bash
cd backend
npm install
```

### ❌ PostgreSQL ошибки

```bash
# Проверь что PostgreSQL запущен
brew services list | grep postgresql

# Запусти если не запущен
brew services start postgresql@14

# Пересоздай БД
dropdb lptt_db
createdb lptt_db
npx prisma migrate dev
```

---

## 🎯 Что должно работать

✅ **Frontend** (localhost:5173)
- Главная страница
- Навигация
- Все секции сайта

✅ **Backend** (localhost:3000)
- API endpoints
- WebSocket (real-time)
- PostgreSQL (база данных)
- Redis (опционально, для кэша)

✅ **iOS App** (Xcode Simulator)
- Логин
- Дашборд
- Оценки, Расписание, Конспекты, Профиль

---

## 🚀 Готово!

```bash
# Запусти одной командой:
npm run dev:all

# Открой в браузере:
http://localhost:5173 (Frontend)
http://localhost:3000/api (Backend)
```

**Всё работает! 🎉**
