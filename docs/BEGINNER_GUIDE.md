# 🎓 Руководство для начинающих

> Это пошаговое руководство для тех, кто впервые работает с веб-разработкой или хочет понять, как устроен проект LPTT.

---

## 📚 Содержание

1. [Что такое LPTT?](#что-такое-lptt)
2. [Что нужно знать?](#что-нужно-знать)
3. [Установка](#установка)
4. [Структура проекта](#структура-проекта)
5. [Первый запуск](#первый-запуск)
6. [Как это работает?](#как-это-работает)
7. [Частые вопросы](#частые-вопросы)

---

## 🎯 Что такое LPTT?

**LPTT** (Липецкий Политехнический Техникум Технологий) — это:
- 🌐 **Сайт техникума** с информацией и новостями
- 📱 **Электронный дневник** для студентов
- 👨‍💼 **Панель администратора** для управления
- 📊 **Backend API** для работы с данными

**Технологии:**
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **iOS:** Swift + SwiftUI (нативное приложение)

---

## 📖 Что нужно знать?

### Минимальные знания:
- **HTML/CSS** — основы вёрстки
- **JavaScript** — базовый синтаксис
- **Git** — как клонировать репозиторий
- **Terminal** — как запускать команды

### Если не знаешь:
1. **HTML/CSS** → [freeCodeCamp](https://www.freecodecamp.org/)
2. **JavaScript** → [Learn JavaScript](https://javascript.info/)
3. **React** → [React документация](https://react.dev/)
4. **Git** → [Git туториал](https://learngitbranching.js.org/)

---

## 🛠 Установка

### Шаг 1: Установи Node.js

#### macOS (Homebrew):
```bash
brew install node
```

#### Windows:
1. Скачай с [nodejs.org](https://nodejs.org/)
2. Запусти установщик
3. Перезагрузи компьютер

#### Проверь установку:
```bash
node --version  # должно быть v18+
npm --version   # должно быть v9+
```

---

### Шаг 2: Установи Git

#### macOS:
```bash
brew install git
```

#### Windows:
1. Скачай с [git-scm.com](https://git-scm.com/)
2. Запусти установщик

#### Проверь установку:
```bash
git --version
```

---

### Шаг 3: Склонируй репозиторий

```bash
# 1. Перейди в папку, где хочешь хранить проект
cd ~/Documents

# 2. Клонируй репозиторий
git clone https://github.com/icewhipe/lotto-web.git

# 3. Перейди в папку проекта
cd lotto-web
```

---

### Шаг 4: Установи зависимости

```bash
# Установи все зависимости (может занять 2-5 минут)
npm install

# Установи зависимости для backend
cd backend
npm install
cd ..

# Если нужно — установи зависимости для frontend
cd frontend
npm install
cd ..
```

---

## 📁 Структура проекта

```
lotto-web/
├── 📂 backend/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/       # Логика обработки запросов
│   │   ├── models/            # Модели данных (Prisma)
│   │   ├── routes/            # Маршруты API
│   │   ├── middleware/        # Middleware (auth, validation)
│   │   └── server.ts          # Главный файл сервера
│   ├── prisma/
│   │   └── schema.prisma      # Схема базы данных
│   └── package.json
│
├── 📂 src/                     # Frontend (React + TypeScript)
│   ├── components/            # React компоненты
│   │   ├── Hero.tsx           # Главный экран
│   │   ├── News.tsx           # Новости
│   │   ├── Gallery.tsx        # Галерея
│   │   ├── dashboard/         # Компоненты дневника
│   │   └── admin/             # Компоненты админ панели
│   ├── contexts/              # React Context (состояние)
│   ├── hooks/                 # Кастомные хуки
│   └── App.tsx                # Главный компонент
│
├── 📂 docs/                    # Документация
│   ├── BEGINNER_GUIDE.md      # 👈 Ты здесь!
│   ├── ARCHITECTURE.md        # Для опытных
│   ├── TESTING.md             # Тестирование
│   └── backend/               # Документация backend
│
├── 📂 ios-native/              # iOS приложение (Swift)
│   └── LPTTDiary/
│
├── package.json               # Конфигурация проекта
├── vite.config.ts             # Настройки Vite
├── tailwind.config.js         # Настройки Tailwind CSS
└── README.md                  # Основная информация
```

---

## 🚀 Первый запуск

### Вариант 1: Запусти всё одной командой (рекомендуется)

```bash
# В корне проекта
npm start
```

✅ Эта команда запустит:
- **Backend** на `http://localhost:3000`
- **Frontend** на `http://localhost:5173`

### Вариант 2: Запусти отдельно

**Backend:**
```bash
cd backend
npm run dev
# Backend запустится на порту 3000
```

**Frontend:**
```bash
# В новом терминале
npm run dev
# Frontend запустится на порту 5173
```

### Открой в браузере:
```
http://localhost:5173
```

---

## 🎨 Как это работает?

### 1. Frontend (React)

**React** — это библиотека для создания интерфейсов.

#### Простой пример компонента:
```tsx
// src/components/Hello.tsx
export default function Hello() {
  return (
    <div>
      <h1>Привет, мир!</h1>
      <p>Это мой первый компонент!</p>
    </div>
  )
}
```

#### Как использовать:
```tsx
// src/App.tsx
import Hello from './components/Hello'

function App() {
  return <Hello />
}
```

---

### 2. Backend (Node.js + Express)

**Express** — это фреймворк для создания API.

#### Простой пример API:
```typescript
// backend/src/routes/hello.ts
import { Router } from 'express'

const router = Router()

router.get('/hello', (req, res) => {
  res.json({ message: 'Привет из API!' })
})

export default router
```

#### Как проверить:
```bash
curl http://localhost:3000/api/hello
# Ответ: {"message": "Привет из API!"}
```

---

### 3. База данных (PostgreSQL + Prisma)

**Prisma** — это ORM (Object-Relational Mapping), который упрощает работу с БД.

#### Пример модели:
```prisma
// backend/prisma/schema.prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String
  role     UserRole @default(STUDENT)
}
```

#### Как создать пользователя:
```typescript
const user = await prisma.user.create({
  data: {
    email: 'student@lptt.ru',
    name: 'Иван Иванов',
    role: 'STUDENT'
  }
})
```

---

## 🔧 Основные команды

### Frontend:
```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка для production
npm run preview      # Превью production сборки
```

### Backend:
```bash
npm run dev          # Запуск с hot reload
npm run build        # Компиляция TypeScript
npm start            # Запуск production
npm run seed         # Заполнить БД тестовыми данными
```

### Git:
```bash
git status           # Проверить изменения
git add .            # Добавить все изменения
git commit -m "Описание"  # Сохранить изменения
git push             # Отправить на GitHub
git pull             # Скачать изменения
```

---

## ❓ Частые вопросы

### 1. Как изменить текст на главной странице?

Открой `src/components/Hero.tsx` и найди:
```tsx
<h1>ЛПТТ</h1>
<p>Ваше описание</p>
```

### 2. Как добавить новую страницу?

1. Создай компонент:
```tsx
// src/components/MyPage.tsx
export default function MyPage() {
  return <h1>Моя новая страница</h1>
}
```

2. Добавь в `App.tsx`:
```tsx
import MyPage from './components/MyPage'

// В функции App:
{showMyPage && <MyPage />}
```

### 3. Как изменить цвета?

Открой `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#8b5cf6',  // Фиолетовый
    600: '#7c3aed'
  }
}
```

### 4. Как добавить новую новость?

Открой `src/components/News.tsx` и добавь в массив `newsItems`:
```tsx
{
  id: 7,
  title: 'Моя новость',
  excerpt: 'Краткое описание',
  fullText: 'Полный текст...',
  date: '2025-10-08',
  author: 'Автор',
  category: 'События',
  gradient: 'from-blue-500 to-cyan-600',
  icon: Newspaper
}
```

### 5. Frontend не запускается!

**Ошибка:** `EADDRINUSE: address already in use`

**Решение:**
```bash
# Убей процессы на портах
npm run kill:ports

# Или вручную:
lsof -ti:5173 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### 6. Backend выдаёт ошибку БД!

**Ошибка:** `Can't reach database server`

**Решение:**
```bash
# Убедись что PostgreSQL запущен
brew services start postgresql@14

# Проверь .env файл
cat backend/.env
# DATABASE_URL должен быть правильным
```

### 7. Как обновить проект из GitHub?

```bash
# Сохрани свои изменения
git add .
git commit -m "Мои изменения"

# Скачай обновления
git pull origin feature/electronic-diary-optimization

# Установи новые зависимости
npm install
cd backend && npm install && cd ..

# Перезапусти
npm start
```

---

## 🎓 Что дальше?

### Изучи:
1. **React документацию** → [react.dev](https://react.dev/)
2. **TypeScript** → [typescriptlang.org](https://www.typescriptlang.org/)
3. **Tailwind CSS** → [tailwindcss.com](https://tailwindcss.com/)
4. **Express** → [expressjs.com](https://expressjs.com/)
5. **Prisma** → [prisma.io](https://www.prisma.io/)

### Попробуй:
1. Измени цвета на главной
2. Добавь свою новость
3. Создай новый компонент
4. Добавь новый API endpoint

### Когда будешь готов:
- Прочитай [ARCHITECTURE.md](./ARCHITECTURE.md) для углублённого понимания
- Изучи [backend/README.md](../backend/README.md) для работы с API
- Попробуй [TESTING.md](./TESTING.md) для тестирования

---

## 💬 Нужна помощь?

- **GitHub Issues:** [github.com/icewhipe/lotto-web/issues](https://github.com/icewhipe/lotto-web/issues)
- **Email:** support@lptt.ru
- **Telegram:** @lptt_support

---

## ✨ Удачи в разработке!

Не бойся экспериментировать! Всегда можно вернуть изменения:
```bash
git reset --hard
```

**Ты справишься! 🚀**
