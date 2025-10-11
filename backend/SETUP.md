# 🍎 Backend Setup - MacBook (macOS)

Подробная инструкция по установке и запуску backend на macOS.

---

## 📋 Содержание

1. [Требования](#требования)
2. [Установка PostgreSQL](#установка-postgresql)
3. [Установка Redis](#установка-redis-опционально)
4. [Настройка Backend](#настройка-backend)
5. [Запуск](#запуск)
6. [Troubleshooting](#troubleshooting)

---

## ⚙️ Требования

- **macOS** 12.0 (Monterey) или выше
- **Node.js** 20.x или выше
- **Homebrew** (пакетный менеджер)
- **Terminal** (или iTerm2)

---

## 🔧 Шаг 1: Установка Homebrew

Если Homebrew не установлен:

```bash
# Открой Terminal (⌘ + Space → "Terminal")
# Установи Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Проверь установку
brew --version
```

**Должно показать:** `Homebrew 4.x.x`

---

## 🐘 Шаг 2: Установка PostgreSQL

### Вариант A: Homebrew (рекомендуется для macOS)

```bash
# 1. Установить PostgreSQL
brew install postgresql@16

# 2. Запустить PostgreSQL как сервис (автостарт)
brew services start postgresql@16

# 3. Проверить статус
brew services list | grep postgresql
# Должно показать: postgresql@16  started

# 4. Создать базу данных
createdb lptt_db

# 5. Проверить подключение
psql lptt_db
# Если открылся psql, значит работает!
# Выйти: \q
```

**Готово!** PostgreSQL установлен и запущен.

---

### Вариант B: Docker (если есть Docker Desktop)

```bash
# 1. Установи Docker Desktop для Mac (если нет)
# https://www.docker.com/products/docker-desktop

# 2. Запусти PostgreSQL контейнер
docker run --name lptt-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=lptt_db \
  -p 5432:5432 \
  -d postgres:16

# 3. Проверь статус
docker ps | grep postgres

# 4. Проверь логи
docker logs lptt-postgres

# Остановить: docker stop lptt-postgres
# Запустить: docker start lptt-postgres
# Удалить: docker rm -f lptt-postgres
```

---

### Вариант C: Supabase (облачная БД, самый простой!)

**Плюсы:**
- ✅ Не нужно ничего устанавливать
- ✅ Бесплатно 500MB
- ✅ Автобэкапы
- ✅ UI для управления

**Шаги:**

1. Зарегистрируйся: https://supabase.com
2. Создай новый проект (New Project)
3. Дождись создания (2-3 минуты)
4. Перейди в **Settings → Database**
5. Найди **Connection String** (URI)
6. Скопируй и замени `[YOUR-PASSWORD]` на свой пароль

**Пример:**
```
postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

7. Вставь в `.env` (шаг 4)

---

## 🔴 Шаг 3: Установка Redis (опционально)

Redis нужен для кэширования. Можно пропустить для начала.

### Вариант A: Homebrew

```bash
# 1. Установить Redis
brew install redis

# 2. Запустить как сервис
brew services start redis

# 3. Проверить
redis-cli ping
# Должно вернуть: PONG

# Остановить: brew services stop redis
```

---

### Вариант B: Docker

```bash
docker run --name lptt-redis \
  -p 6379:6379 \
  -d redis:7

# Проверка
docker ps | grep redis
```

---

### Без Redis

Если не нужен Redis:

1. Открой `backend/src/server.ts`
2. Закомментируй строку:
```typescript
// await connectRedis(); // <-- добавь //
```

3. В `.env` закомментируй:
```bash
# REDIS_URL="redis://localhost:6379"
```

---

## 📦 Шаг 4: Настройка Backend

```bash
# 1. Открой Terminal
# 2. Перейди в папку backend
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend

# 3. Обнови код из Git
git pull origin feature/electronic-diary-optimization

# 4. Установи зависимости
npm install

# Должно установиться ~500 пакетов за 1-2 минуты
```

---

## ⚙️ Шаг 5: Настройка .env

Файл `.env` уже создан! Проверь его:

```bash
# Открой .env в редакторе
open -a TextEdit .env
# или
nano .env
```

**Основные настройки:**

```bash
# === PostgreSQL ===

# Если используешь Homebrew PostgreSQL:
DATABASE_URL="postgresql://postgres@localhost:5432/lptt_db"

# Если используешь Docker:
DATABASE_URL="postgresql://postgres:password@localhost:5432/lptt_db"

# Если используешь Supabase:
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require"

# === JWT (оставь как есть) ===
JWT_SECRET="super-secret-key-change-in-production-123456"
JWT_EXPIRES_IN="7d"

# === Server (оставь как есть) ===
PORT=3000
NODE_ENV=development

# === Redis (если не используешь - закомментируй) ===
# REDIS_URL="redis://localhost:6379"
```

**Сохрани файл:** `⌘ + S`

---

## 🗄️ Шаг 6: Создание базы данных

```bash
# 1. Генерация Prisma Client
npx prisma generate

# Должно показать: ✔ Generated Prisma Client

# 2. Создание миграций (создаёт таблицы в БД)
npx prisma migrate dev --name init

# Что происходит:
# - Создаются все таблицы (User, Student, Grade, etc.)
# - Применяются индексы
# - Создаются связи

# Должно показать:
# ✔ Your database is now in sync with your schema.
```

**Если ошибка "Can't reach database":**
- PostgreSQL не запущен: `brew services start postgresql@16`
- Неверный DATABASE_URL в `.env`
- Проверь подключение: `psql lptt_db`

---

## 🎨 Шаг 7: Prisma Studio (опционально)

Визуальный редактор БД:

```bash
npx prisma studio
```

Откроется: http://localhost:5555

Здесь можно:
- Смотреть таблицы
- Добавлять данные
- Редактировать записи

**Закрыть:** `Ctrl + C` в Terminal

---

## 🚀 Шаг 8: Запуск Backend

```bash
# Development mode (hot reload)
npm run dev

# Должно показать:
╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник API        ║
║                                            ║
║   ✅ Server running on port 3000         ║
║   🌐 http://localhost:3000               ║
║   📡 WebSocket ready                       ║
║   📦 Redis connected (если включен)       ║
╚════════════════════════════════════════════╝
```

**Оставь Terminal открытым!** Сервер работает.

---

## ✅ Шаг 9: Проверка

Открой **новый** Terminal (⌘ + T) и проверь:

```bash
# Health check
curl http://localhost:3000/api/health

# Должно вернуть:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-15T..."
}
```

**Также открой в браузере:**
- http://localhost:3000 — API info
- http://localhost:3000/api/health — Health check

---

## 🧪 Шаг 10: Тестовые данные (опционально)

Создай тестовых пользователей:

```bash
# В новом Terminal (⌘ + T)
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend

# Запусти seed (пока не работает, будет позже)
# npm run seed
```

---

## 🐛 Troubleshooting

### ❌ "Can't reach database server at localhost:5432"

**Причина:** PostgreSQL не запущен

**Решение:**

```bash
# Проверь статус
brew services list | grep postgresql

# Если stopped - запусти
brew services start postgresql@16

# Проверь логи
tail -f /opt/homebrew/var/log/postgresql@16.log

# Проверь порт 5432
lsof -i :5432
# Должен быть postgres
```

**Если порт 5432 занят:**

```bash
# Найди процесс
lsof -i :5432

# Убей процесс
kill -9 <PID>

# Перезапусти PostgreSQL
brew services restart postgresql@16
```

---

### ❌ "Error: listen EADDRINUSE: address already in use :::3000"

**Причина:** Порт 3000 занят

**Решение:**

```bash
# Найди процесс на порту 3000
lsof -i :3000

# Убей процесс
kill -9 <PID>

# Или измени порт в .env
PORT=3001
```

---

### ❌ "Environment variable not found: DATABASE_URL"

**Причина:** Файл `.env` не загружен

**Решение:**

```bash
# Проверь что .env существует
ls -la .env

# Проверь содержимое
cat .env | grep DATABASE_URL

# Если пустой - скопируй из примера
cp .env.example .env

# Отредактируй
nano .env
```

---

### ❌ "Prisma migrate error"

**Решение:**

```bash
# Сбрось БД и создай заново
npx prisma migrate reset

# Или создай БД вручную
dropdb lptt_db
createdb lptt_db

# Запусти миграции
npx prisma migrate dev
```

---

### ❌ "Redis connection refused"

**Если Redis НЕ нужен:**

1. Открой `backend/src/server.ts`
2. Найди строку: `await connectRedis();`
3. Закомментируй: `// await connectRedis();`
4. Перезапусти: `npm run dev`

**Если Redis нужен:**

```bash
# Проверь статус
brew services list | grep redis

# Запусти
brew services start redis

# Проверь
redis-cli ping
# Должно: PONG
```

---

### ❌ Homebrew команды не работают

**Причина:** Homebrew не в PATH

**Решение:**

```bash
# Для M1/M2/M3 Mac (Apple Silicon)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Для Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"

# Перезапусти Terminal
```

---

## 🔄 Остановка и перезапуск

### Остановить Backend

```bash
# В Terminal где запущен npm run dev
Ctrl + C
```

### Остановить PostgreSQL

```bash
brew services stop postgresql@16
```

### Остановить Redis

```bash
brew services stop redis
```

### Остановить всё (Docker)

```bash
docker stop lptt-postgres lptt-redis
```

---

## 🚀 Перезапуск

```bash
# 1. Убедись что PostgreSQL запущен
brew services start postgresql@16

# 2. Убедись что Redis запущен (если используешь)
brew services start redis

# 3. Перейди в папку backend
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend

# 4. Запусти
npm run dev
```

---

## 📝 Полезные команды

### PostgreSQL

```bash
# Запустить
brew services start postgresql@16

# Остановить
brew services stop postgresql@16

# Перезапустить
brew services restart postgresql@16

# Подключиться к БД
psql lptt_db

# Список БД
psql -l

# Создать БД
createdb lptt_db

# Удалить БД
dropdb lptt_db
```

### Redis

```bash
# Запустить
brew services start redis

# Остановить
brew services stop redis

# Проверить
redis-cli ping

# Очистить весь кэш
redis-cli FLUSHALL
```

### Prisma

```bash
# Сгенерировать клиент
npx prisma generate

# Создать миграцию
npx prisma migrate dev --name migration_name

# Применить миграции (production)
npx prisma migrate deploy

# Сбросить БД
npx prisma migrate reset

# Открыть Prisma Studio
npx prisma studio

# Форматировать schema.prisma
npx prisma format
```

### npm

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build

# Production start
npm start

# Установить зависимости
npm install

# Обновить зависимости
npm update
```

---

## 🎯 Быстрая установка (TL;DR)

```bash
# 1. Установить PostgreSQL
brew install postgresql@16
brew services start postgresql@16
createdb lptt_db

# 2. Настроить backend
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend
git pull origin feature/electronic-diary-optimization
npm install

# 3. Проверить .env (DATABASE_URL должен быть правильным)
cat .env

# 4. Создать БД
npx prisma generate
npx prisma migrate dev

# 5. Запустить
npm run dev

# ✅ http://localhost:3000
```

---

## 📚 Дополнительно

- **API Documentation:** [../docs/backend/API.md](../docs/backend/API.md)
- **WebSocket Guide:** [../docs/backend/WEBSOCKETS.md](../docs/backend/WEBSOCKETS.md)
- **Database Schema:** [../docs/backend/DATABASE.md](../docs/backend/DATABASE.md)
- **Backend README:** [README.md](README.md)

---

## 💡 Рекомендации

### Для разработки:

✅ **Supabase** — не нужно устанавливать PostgreSQL  
✅ **Docker Desktop** — изолированное окружение  
✅ **Homebrew** — простое управление сервисами

### Для production:

✅ **Railway** — автодеплой, PostgreSQL + Redis  
✅ **Fly.io** — глобальное развертывание  
✅ **AWS/DigitalOcean** — полный контроль

---

## 🆘 Помощь

**Если что-то не работает:**

1. Проверь [Troubleshooting](#troubleshooting)
2. Проверь логи: `tail -f /opt/homebrew/var/log/postgresql@16.log`
3. Открой Issue на GitHub
4. Пиши в Telegram: [@lptt_dev](https://t.me/lptt_dev)

---

**Создано с 🔥 для MacBook (Apple Silicon & Intel)**

**Дата:** 11 января 2025  
**Версия:** 1.0
