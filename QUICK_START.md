# ⚡ Быстрый старт ЛПТТ

Запусти проект за 5 минут!

---

## 1️⃣ Установка (1 мин)

```bash
# Клонируй репозиторий
git clone https://github.com/icewhipe/lotto-web.git
cd lotto-web

# Установи зависимости
npm install
cd backend && npm install && cd ..
```

---

## 2️⃣ База данных (2 мин)

```bash
# Запусти PostgreSQL
brew services start postgresql@14

# Создай базу
createdb lptt_db

# Настрой backend
cd backend
cp .env.example .env
# Отредактируй DATABASE_URL в .env

# Примени схему
npx prisma db push

# Заполни тестовыми данными
npm run seed
```

---

## 3️⃣ Запуск (1 мин)

```bash
# Терминал 1: Backend
cd backend
npm run dev

# Терминал 2: Frontend
npm run dev
```

---

## 4️⃣ Вход (30 сек)

Открой: `http://localhost:5173`

**Тестовые аккаунты:**

| Роль | Email | Пароль |
|------|-------|--------|
| 👨‍🎓 Студент | student1@lptt.ru | 123456 |
| 👨‍🏫 Преподаватель | ivanova@lptt.ru | 123456 |
| 👨‍👩‍👧 Родитель | parent1@lptt.ru | 123456 |
| 👨‍💼 Админ | admin@lptt.ru | 123456 |

---

## ✅ Готово!

Подробная документация: [docs/INDEX.md](docs/INDEX.md)

Проблемы? → [Troubleshooting](docs/setup/TROUBLESHOOTING.md)

---

**Начни работу! 🚀**
