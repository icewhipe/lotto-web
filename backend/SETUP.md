# 🚀 Backend Setup - Инструкция

## ⚠️ Перед запуском

### 1. PostgreSQL

**Вариант A: Docker (рекомендуется)**
```bash
docker run --name lptt-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=lptt_db \
  -p 5432:5432 \
  -d postgres:16
```

**Вариант B: Установить PostgreSQL**
- macOS: `brew install postgresql@16`
- Ubuntu: `sudo apt-get install postgresql-16`

**Вариант C: Облачная БД (самый простой!)**
- [Supabase](https://supabase.com) — бесплатно
- [Railway](https://railway.app) — бесплатно
- [Neon](https://neon.tech) — бесплатно

Скопируй connection string в `.env`:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

---

### 2. Redis (опционально)

**Вариант A: Docker**
```bash
docker run --name lptt-redis \
  -p 6379:6379 \
  -d redis:7
```

**Вариант B: Установить**
- macOS: `brew install redis`
- Ubuntu: `sudo apt-get install redis`

**Если Redis не нужен:**
Закомментируй в `.env`:
```bash
# REDIS_URL="redis://localhost:6379"
```

И в `server.ts` закомментируй:
```typescript
// await connectRedis();
```

---

## 🔧 Настройка

### 1. Установка

```bash
cd backend
npm install
```

### 2. Настройка .env

Файл уже создан! Отредактируй:

```bash
# Главное - DATABASE_URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/lptt_db"
```

### 3. База данных

```bash
# Создать миграции
npx prisma generate
npx prisma migrate dev --name init

# Посмотреть БД в браузере
npx prisma studio
```

### 4. Запуск

```bash
# Development (hot reload)
npm run dev

# Production
npm run build
npm start
```

**Сервер:** http://localhost:3000

---

## ✅ Проверка

```bash
# Проверь health
curl http://localhost:3000/api/health

# Должно вернуть:
# {"success":true,"message":"Server is running"...}
```

---

## 🐛 Troubleshooting

### "Can't reach database server"

**PostgreSQL не запущен:**
```bash
# Docker
docker ps | grep postgres

# Если нет, запусти:
docker start lptt-postgres

# Или создай новый (см. выше)
```

**Проверь connection string:**
```bash
psql "postgresql://postgres:password@localhost:5432/lptt_db"
```

---

### "Port already in use"

**Убей процесс:**
```bash
# Найди PID
lsof -i :3000

# Убей
kill -9 <PID>

# Или одной командой
lsof -ti:3000 | xargs kill -9
```

---

### Redis не подключается

**Закомментируй в server.ts:**
```typescript
// await connectRedis();
```

Или запусти Redis:
```bash
docker start lptt-redis
# или
redis-server
```

---

## 🎯 Быстрый старт БЕЗ PostgreSQL

Используй Supabase (бесплатно):

1. Зарегистрируйся: https://supabase.com
2. Создай проект
3. Скопируй Connection String (Settings → Database)
4. Вставь в `.env`:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require"
```
5. Запусти:
```bash
npx prisma migrate dev
npm run dev
```

**Готово!** 🎉

---

## 📦 Docker Compose (всё сразу)

```bash
# Создай docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: lptt_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOF

# Запусти
docker-compose up -d

# Готово! PostgreSQL + Redis работают
```

---

## 🚀 Полная последовательность

```bash
# 1. Запусти PostgreSQL (Docker)
docker run --name lptt-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=lptt_db \
  -p 5432:5432 -d postgres:16

# 2. Настрой .env (уже есть!)
# DATABASE_URL="postgresql://postgres:password@localhost:5432/lptt_db"

# 3. Установи зависимости
npm install

# 4. Создай БД
npx prisma generate
npx prisma migrate dev

# 5. Запусти
npm run dev

# ✅ Готово! http://localhost:3000
```

---

## 📚 Что дальше?

- [API Documentation](../docs/backend/API.md)
- [WebSocket Guide](../docs/backend/WEBSOCKETS.md)
- [Database Schema](../docs/backend/DATABASE.md)

---

**Вопросы?** Пиши в Issues! 🔥
