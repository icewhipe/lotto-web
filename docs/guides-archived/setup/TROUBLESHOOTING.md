# 🔧 Решение проблем (Troubleshooting)

Руководство по решению типичных проблем в системе ЛПТТ.

---

## 🚨 Проблемы с запуском

### Backend не запускается

**Ошибка:** `Cannot start service: Host version does not match binary version`

**Решение:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npx prisma generate
npm run dev
```

---

**Ошибка:** `Can't reach database server at localhost:5432`

**Решение:**
```bash
# Проверь что PostgreSQL запущен
brew services list | grep postgresql

# Запусти PostgreSQL
brew services start postgresql@14

# Или через Docker
docker start lptt-postgres
```

---

**Ошибка:** `Port 3000 is already in use`

**Решение:**
```bash
# Найди процесс на порту 3000
lsof -i :3000

# Убей процесс
kill -9 PID

# Или измени порт в .env
PORT=3001
```

---

### Frontend не запускается

**Ошибка:** `Failed to fetch dynamically imported module`

**Решение:**
```bash
# Очисти кэш
rm -rf node_modules/.vite
rm -rf dist

# Пересобери
npm run build
npm run dev
```

---

**Ошибка:** `Port 5173 is already in use`

**Решение:**
```bash
# Найди процесс
lsof -i :5173

# Убей процесс
kill -9 PID
```

---

## 🔑 Проблемы с аутентификацией

### Не могу войти в систему

**Проверь:**
1. ✅ Правильность email
2. ✅ Правильность пароля (регистр важен!)
3. ✅ Backend запущен
4. ✅ База данных доступна

**Сброс пароля:**
```bash
# Через админ панель
# Или через Prisma Studio
npx prisma studio
```

---

### Токен истёк

**Решение:**
- Просто перелогинься
- Токен обновится автоматически

---

### CORS ошибки

**Ошибка:** `Access to fetch blocked by CORS policy`

**Решение:**
```bash
# Проверь backend/.env
CORS_ORIGIN="http://localhost:5173"

# Перезапусти backend
```

---

## 💾 Проблемы с базой данных

### База данных не создаётся

**Решение:**
```bash
# Создай вручную
createdb lptt_db

# Или через psql
psql postgres
CREATE DATABASE lptt_db;
\q
```

---

### Ошибки миграций

**Ошибка:** `Migration failed`

**Решение:**
```bash
cd backend

# Сброс миграций
npx prisma migrate reset

# Или принудительное применение
npx prisma db push --force-reset
```

---

### Данные не загружаются

**Проверь:**
```bash
# Запусти Prisma Studio
cd backend
npx prisma studio

# Открой http://localhost:5555
# Проверь что данные есть в таблицах
```

**Если данных нет:**
```bash
npm run seed
```

---

## 🌐 Проблемы с подключением

### API не отвечает

**Проверка:**
```bash
# Проверь health endpoint
curl http://localhost:3000/api/health

# Если не отвечает:
# 1. Backend не запущен
# 2. Неправильный порт
# 3. Firewall блокирует
```

**Решение:**
```bash
# Перезапусти backend
cd backend
npm run dev

# Проверь порт в .env
cat .env | grep PORT
```

---

### Frontend не видит backend

**Проверь:**
```bash
# src/services/api.ts должен указывать на :3000
grep "localhost:3000" src/services/api.ts

# Если нет - исправь
```

**Решение:**
```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:3000/api';
```

---

## 🔐 Проблемы с правами доступа

### "Access denied"

**Причины:**
1. Неправильная роль пользователя
2. Не авторизован
3. Токен истёк

**Решение:**
- Перелогинься
- Проверь роль в админ панели
- Проверь что токен валиден

---

### "Forbidden"

**Причина:**
У пользователя нет прав на это действие

**Решение:**
- Проверь роль пользователя
- Запроси права у администратора

---

## 📱 Проблемы с интерфейсом

### Белый экран

**Решение:**
```bash
# Очисти кэш браузера
Cmd + Shift + Delete

# Пересобери frontend
npm run build
npm run dev
```

---

### Элементы не кликабельны

**Решение:**
- Обнови страницу (Cmd + R)
- Очисти кэш
- Проверь консоль браузера (F12)

---

### Данные не обновляются

**Решение:**
```bash
# Hard reload
Cmd + Shift + R

# Или очисти localStorage
# F12 → Application → Local Storage → Clear
```

---

## 🐛 Отладка

### Включение debug режима

**Backend:**
```bash
# .env
NODE_ENV=development
DEBUG=true
```

**Frontend:**
```typescript
// Открой консоль браузера (F12)
// Смотри логи
```

### Логи backend

**Просмотр логов:**
```bash
# Логи выводятся в терминал
npm run dev

# Для production логов
pm2 logs
```

### Логи базы данных

**Включить логи Prisma:**
```typescript
// backend/src/config/database.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## 📞 Получение помощи

### Последовательность действий:

1. **Проверь документацию**
   - README.md
   - Соответствующее руководство
   - Этот файл

2. **Проверь логи**
   - Backend терминал
   - Browser console (F12)
   - Database logs

3. **Попробуй базовые решения**
   - Перезапуск
   - Очистка кэша
   - Переустановка зависимостей

4. **Обратись в поддержку**
   - 📧 it@lptt.ru
   - 📱 +7 (XXX) XXX-XX-XX
   - 💬 GitHub Issues

### Информация для поддержки:

Приготовь:
- 💻 Версия Node.js (`node --version`)
- 🗄️ Версия PostgreSQL (`postgres --version`)
- 📝 Текст ошибки (полностью)
- 📸 Скриншот проблемы
- 🔍 Что пытался сделать
- ✅ Что уже пробовал

---

## 🔄 Полный сброс

**Если ничего не помогает:**

```bash
# ВНИМАНИЕ: Удалит ВСЕ данные!

# 1. Останови всё
# Ctrl+C в backend
# Ctrl+C в frontend

# 2. Удали node_modules
rm -rf node_modules backend/node_modules

# 3. Удали базу
dropdb lptt_db

# 4. Пересоздай базу
createdb lptt_db

# 5. Установи зависимости
npm install
cd backend && npm install && cd ..

# 6. Примени схему
cd backend && npx prisma db push

# 7. Запусти seed
npm run seed

# 8. Запусти всё
npm run dev # frontend
cd backend && npm run dev # backend
```

---

**ПРОБЛЕМА РЕШЕНА? ОТЛИЧНО! 🎉**

**НЕ РЕШЕНА? ПИШИ В ПОДДЕРЖКУ! 📞**
