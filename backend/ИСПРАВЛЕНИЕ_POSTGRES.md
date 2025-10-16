# 🔧 Исправление PostgreSQL на macOS

## ❌ Ошибка:
```
User `postgres` was denied access on the database `lptt_db.public`
```

---

## ✅ РЕШЕНИЕ:

### На macOS Homebrew PostgreSQL создаёт пользователя по имени вашего системного пользователя!

---

## 🚀 Что делать:

### 1. Обнови код из Git:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web/backend
git pull origin feature/electronic-diary-optimization
```

**Файл `.env` обновлён!** Теперь там:
```
DATABASE_URL="postgresql://vasiliidyahenko@localhost:5432/lptt_db"
```

---

### 2. Создай базу данных заново:

```bash
# Удали старую БД (если есть)
dropdb lptt_db 2>/dev/null

# Создай новую
createdb lptt_db

# Проверь подключение
psql lptt_db

# Если открылось - всё ОК! Выйди: \q
```

---

### 3. Запусти миграции:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

**Должно показать:**
```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema.
```

---

### 4. Запусти backend:

```bash
npm run dev
```

**Готово!** http://localhost:3000

---

## 🔍 Дополнительно:

### Проверить какой пользователь в PostgreSQL:

```bash
psql -c "SELECT current_user;"
```

**На macOS обычно:** Ваше имя пользователя (vasiliidyahenko)

---

### Если хочешь создать пользователя postgres:

```bash
# Подключись к PostgreSQL
psql postgres

# Создай пользователя
CREATE USER postgres WITH PASSWORD 'password' SUPERUSER;

# Выйди
\q

# Теперь можно использовать:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/lptt_db"
```

---

## 💡 ИТОГО:

На macOS Homebrew PostgreSQL:
- ✅ Пользователь = имя пользователя macOS
- ✅ Без пароля (localhost)
- ✅ DATABASE_URL="postgresql://vasiliidyahenko@localhost:5432/lptt_db"

**Всё работает!** 🎉
