# 🔧 ИСПРАВЛЕНИЕ ОШИБКИ PRISMA

## ❌ Проблема:

```
Error: Cannot find module '@prisma/engines-version/index.js'
```

Это происходит из-за повреждённых node_modules в backend.

---

## ✅ РЕШЕНИЕ (выполни по порядку):

### Шаг 1: Полная очистка

```bash
cd ~/Documents/GitHub/lotto-web/backend

# Удали node_modules и lock файлы
rm -rf node_modules
rm -rf package-lock.json
rm -rf .prisma

# Очисти npm cache
npm cache clean --force
```

### Шаг 2: Переустановка зависимостей

```bash
# Установи заново
npm install

# Это займёт 1-2 минуты
```

### Шаг 3: Генерация Prisma Client

```bash
# Сгенерируй Prisma Client
npx prisma generate
```

### Шаг 4: Применение схемы

```bash
# Теперь push должен работать
npx prisma db push
```

**Ожидаемый вывод:**
```
✅ Your database is now in sync with your Prisma schema.
```

### Шаг 5: Заполнение данными

```bash
# Расширенный seed (125 студентов)
npm run seed:full
```

---

## 🚀 Полная последовательность команд:

Скопируй и выполни всё разом:

```bash
cd ~/Documents/GitHub/lotto-web/backend
rm -rf node_modules package-lock.json .prisma
npm cache clean --force
npm install
npx prisma generate
npx prisma db push
npm run seed:full
```

---

## ✅ После этого запусти:

```bash
# Backend
npm run dev
```

В новом терминале:

```bash
# Frontend (из корня проекта)
cd ~/Documents/GitHub/lotto-web
npm run dev
```

---

## 📞 Если всё равно не работает:

### Проверь версию Node.js:

```bash
node --version
```

Должно быть: `v22.15.0` ✅ (у тебя правильная версия)

### Проверь что PostgreSQL запущен:

```bash
brew services list | grep postgresql
```

Должно быть: `postgresql@14  started` ✅

### Проверь что база существует:

```bash
psql -l | grep lptt_db
```

Если базы нет:

```bash
createdb lptt_db
```

---

## 🎯 Причина проблемы:

Git не добавляет node_modules в репозиторий (правильно!), но когда ты делал `git pull`, у тебя могли остаться старые/повреждённые файлы в node_modules.

**Полная переустановка всегда решает эту проблему!**

---

**ВЫПОЛНИ КОМАНДЫ ВЫШЕ И ВСЁ ЗАРАБОТАЕТ! 🚀**
