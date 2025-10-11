# 📦 Redis — опциональный кэш для Backend

## ✅ Backend работает БЕЗ Redis!

Redis используется **только для кэширования** и **НЕ обязателен** для работы.

Если Redis не запущен, backend будет работать **без кэша** (но все API будут работать).

---

## 🚀 Установка Redis (опционально)

### Вариант 1: Homebrew (рекомендуется для macOS)

```bash
# Установить Redis
brew install redis

# Запустить Redis как службу (автозапуск)
brew services start redis

# Проверить что работает
redis-cli ping
# Должно вернуть: PONG
```

**Redis будет запускаться автоматически при каждой загрузке Mac.**

---

### Вариант 2: Docker (если есть Docker)

```bash
# Запустить Redis контейнер
docker run -d \
  --name redis-lptt \
  -p 6379:6379 \
  redis:7-alpine

# Проверить что работает
docker exec -it redis-lptt redis-cli ping
# Должно вернуть: PONG
```

---

### Вариант 3: Без Redis (по умолчанию)

**Ничего не делай!** Backend уже работает без Redis.

---

## 🔄 Управление Redis

### Запустить Redis

```bash
# Homebrew
brew services start redis

# Docker
docker start redis-lptt

# Вручную (без автозапуска)
redis-server
```

---

### Остановить Redis

```bash
# Homebrew
brew services stop redis

# Docker
docker stop redis-lptt

# Вручную
redis-cli shutdown
```

---

### Проверить статус

```bash
# Homebrew
brew services list | grep redis

# Проверить подключение
redis-cli ping

# Посмотреть запущенные процессы
lsof -i :6379
```

---

## 📊 Что даёт Redis?

### С Redis (рекомендуется для production)

- ⚡ **Быстрое кэширование** — API отвечает мгновенно
- 🔄 **Меньше нагрузки** на PostgreSQL
- 📈 **Лучшая производительность** при большом числе запросов

**Пример:**
```bash
# Первый запрос (без кэша) — 150ms
curl http://localhost:3000/api/grades/student/123

# Последующие запросы (из кэша) — 5ms
curl http://localhost:3000/api/grades/student/123
```

---

### Без Redis (default)

- ✅ **Всё работает** как обычно
- 📦 Backend **не падает** если Redis не запущен
- 🐢 Немного медленнее (все запросы идут в PostgreSQL)

---

## 🔍 Проверка работы Redis в Backend

### Запусти backend

```bash
cd backend
npm run dev
```

### Если Redis **ЗАПУЩЕН**:

```
✅ Redis connected successfully

╔════════════════════════════════════════════╗
║   📦 Redis:     Optional (for cache)       ║
╚════════════════════════════════════════════╝
```

---

### Если Redis **НЕ ЗАПУЩЕН**:

```
⚠️  Redis unavailable - running without cache
   To enable Redis: brew services start redis

╔════════════════════════════════════════════╗
║   📦 Redis:     Optional (for cache)       ║
╚════════════════════════════════════════════╝
```

**Backend продолжит работать!**

---

## 🛠️ Настройка Redis в .env

```bash
# backend/.env

# Redis URL (необязательно)
REDIS_URL=redis://localhost:6379

# Если Redis на другом сервере
# REDIS_URL=redis://username:password@hostname:6379
```

---

## 🧪 Тестирование кэша

```bash
# Запусти backend
npm run dev

# Сделай запрос (первый раз — из БД)
curl http://localhost:3000/api/grades/student/550e8400-e29b-41d4-a716-446655440000

# Смотри в логах backend:
# ❌ Cache MISS: cache:/api/grades/student/...

# Сделай тот же запрос снова (из кэша)
curl http://localhost:3000/api/grades/student/550e8400-e29b-41d4-a716-446655440000

# Смотри в логах backend:
# ✅ Cache HIT: cache:/api/grades/student/...
```

---

## 📋 Полезные команды Redis

```bash
# Подключиться к Redis
redis-cli

# Посмотреть все ключи
keys *

# Посмотреть значение ключа
get cache:/api/grades/student/123

# Удалить все кэши
flushall

# Выйти
exit
```

---

## 🎯 Рекомендации

### Для разработки (development)

**Redis НЕ обязателен.** Можешь не запускать.

```bash
# Просто запусти backend
npm run dev
```

---

### Для продакшена (production)

**Установи Redis** для лучшей производительности.

```bash
brew install redis
brew services start redis
```

---

## ✅ Итого

| Компонент | Обязательность | Команда |
|-----------|----------------|---------|
| **PostgreSQL** | ✅ **Обязателен** | `brew services start postgresql@14` |
| **Redis** | ⚠️ Опционален | `brew services start redis` |
| **Node.js** | ✅ **Обязателен** | — |

---

## 🐛 Troubleshooting

### ❌ "Redis connection refused"

Это **нормально**! Backend работает без Redis.

Если хочешь включить Redis:
```bash
brew services start redis
```

---

### ❌ "Error: connect ECONNREFUSED ::1:6379"

Redis не запущен. **Это не ошибка!**

Backend продолжит работать без кэша.

---

### ✅ Всё хорошо!

```bash
⚠️  Redis unavailable - running without cache
```

Это **warning**, а не **error**. Backend работает корректно.

---

## 🚀 Готово!

Backend работает **с Redis или без него**!

```bash
# Без Redis (работает)
npm run dev

# С Redis (лучше производительность)
brew services start redis
npm run dev
```

**Выбирай что удобнее! 🎉**
