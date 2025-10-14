# 🎓 ЛПТТ - Электронный Техникум

Полнофункциональная система управления образовательным процессом для Луганского политехнического техникума.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📋 Содержание

- [О проекте](#о-проекте)
- [Возможности](#возможности)
- [Технологии](#технологии)
- [Быстрый старт](#быстрый-старт)
- [Документация](#документация)
- [Структура проекта](#структура-проекта)
- [API Endpoints](#api-endpoints)
- [Контакты](#контакты)

---

## 🎯 О проекте

ЛПТТ Электронный Техникум - современная веб-платформа для управления образовательным процессом, включающая:

- 📚 **Электронный дневник** для студентов
- 👨‍🏫 **Панель преподавателя** для выставления оценок и отметок
- 👨‍👩‍👧 **Личный кабинет родителя** для контроля успеваемости
- 👔 **Административная панель** для управления учебным заведением
- 📊 **Аналитика и отчёты** для директора и завуча
- 🎓 **Система регистрации** с инвайт-кодами

---

## ✨ Возможности

### Для студентов:
- ✅ Просмотр оценок с фильтром по предметам
- ✅ Контроль посещаемости
- ✅ Расписание занятий на всю неделю
- ✅ Личная статистика и аналитика успеваемости
- ✅ Графики динамики обучения

### Для преподавателей:
- ✅ Выставление оценок студентам
- ✅ Отметка посещаемости
- ✅ Просмотр своего расписания
- ✅ Список студентов и групп
- ✅ Быстрый доступ к журналу

### Для родителей:
- ✅ Просмотр оценок детей
- ✅ Контроль посещаемости
- ✅ Расписание занятий ребёнка
- ✅ Полная информация об успеваемости

### Для администрации:
- ✅ Управление пользователями
- ✅ Создание групп и предметов
- ✅ Генерация инвайт-кодов
- ✅ Общая статистика

### Для директора и завуча:
- ✅ Аналитика по всему техникуму
- ✅ Отчёты по успеваемости групп
- ✅ Статистика посещаемости
- ✅ Обзор всех групп

---

## 🛠 Технологии

### Frontend:
- **React 18** + **TypeScript** - UI фреймворк
- **Vite** - сборщик и dev server
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации
- **Chart.js** - графики и визуализация
- **React Hot Toast** - уведомления
- **Axios** - HTTP клиент

### Backend:
- **Node.js** + **Express** - сервер
- **TypeScript** - типизация
- **Prisma ORM** - работа с БД
- **PostgreSQL** - база данных
- **JWT** - аутентификация
- **Socket.io** - WebSocket
- **bcryptjs** - хеширование паролей

### DevOps:
- **Git** - контроль версий
- **npm** - пакетный менеджер
- **ESLint** - линтер
- **Prisma Studio** - GUI для БД

---

## 🚀 Быстрый старт

### Требования:
- Node.js 18+
- PostgreSQL 14+
- npm или yarn

### 1. Клонирование репозитория:

```bash
git clone https://github.com/icewhipe/lotto-web.git
cd lotto-web
```

### 2. Установка зависимостей:

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. Настройка базы данных:

```bash
# Создать базу
createdb lptt_db

# Настроить .env
cd backend
cp .env.example .env
# Отредактируй DATABASE_URL в .env

# Применить схему
npx prisma db push

# Заполнить тестовыми данными
npm run seed
```

### 4. Запуск:

```bash
# Backend (терминал 1)
cd backend
npm run dev

# Frontend (терминал 2)
npm run dev
```

### 5. Открой браузер:

```
http://localhost:5173
```

### 6. Тестовые аккаунты:

| Роль | Email | Пароль |
|------|-------|--------|
| Студент | student1@lptt.ru | 123456 |
| Преподаватель | ivanova@lptt.ru | 123456 |
| Родитель | parent1@lptt.ru | 123456 |
| Админ | admin@lptt.ru | 123456 |

---

## 📚 Документация

### Для пользователей:
- [Руководство для студентов](docs/guides/STUDENT_GUIDE.md)
- [Руководство для преподавателей](docs/guides/TEACHER_GUIDE.md)
- [Руководство для родителей](docs/guides/PARENT_GUIDE.md)
- [Руководство для администраторов](docs/guides/ADMIN_GUIDE.md)
- [Руководство для директора](docs/guides/DIRECTOR_GUIDE.md)
- [Руководство для завуча](docs/guides/ZAVUCH_GUIDE.md)

### Для разработчиков:
- [Установка и настройка](docs/setup/ЗАПУСК_ВСЕГО_ПРОЕКТА.md)
- [API документация](docs/api/BACKEND_API_COMPLETE.md)
- [Решение проблем](docs/setup/TROUBLESHOOTING.md)
- [Архитектура](docs/ARCHITECTURE.md)

---

## 📁 Структура проекта

```
lotto-web/
├── backend/                  # Backend сервер
│   ├── prisma/              # Схема БД и миграции
│   │   ├── schema.prisma    # Prisma схема
│   │   └── seed.ts          # Тестовые данные
│   ├── src/
│   │   ├── controllers/     # Контроллеры
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Middleware
│   │   ├── config/          # Конфигурация
│   │   └── server.ts        # Точка входа
│   └── package.json
│
├── src/                     # Frontend приложение
│   ├── components/          # React компоненты
│   │   ├── dashboard/       # Дашборды для ролей
│   │   ├── admin/           # Админ панель
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API сервисы
│   ├── contexts/            # React Context
│   └── App.tsx              # Главный компонент
│
├── docs/                    # Документация
│   ├── guides/              # Руководства пользователей
│   ├── api/                 # API документация
│   ├── setup/               # Установка и настройка
│   └── archive/             # Архив старых файлов
│
├── public/                  # Статические файлы
└── package.json
```

---

## 🔌 API Endpoints

### Аутентификация:
```
POST   /api/auth/login       - Вход в систему
POST   /api/auth/register    - Регистрация
```

### Студенты:
```
GET    /api/grades/student/:id          - Оценки студента
GET    /api/schedule/group/:id          - Расписание группы
GET    /api/attendance/student/:id      - Посещаемость
```

### Преподаватели:
```
GET    /api/teacher/schedule             - Расписание преподавателя
GET    /api/teacher/students             - Список студентов
POST   /api/teacher/grade                - Выставить оценку
POST   /api/teacher/attendance           - Отметить посещаемость
```

### Родители:
```
GET    /api/parent/children              - Список детей
GET    /api/parent/child/:id/grades      - Оценки ребёнка
GET    /api/parent/child/:id/attendance  - Посещаемость
```

### Администраторы:
```
GET    /api/admin/users                  - Все пользователи
POST   /api/admin/user                   - Создать пользователя
GET    /api/admin/groups                 - Все группы
POST   /api/admin/group                  - Создать группу
```

### Директор:
```
GET    /api/director/analytics           - Общая аналитика
GET    /api/director/performance-report  - Отчёт по успеваемости
GET    /api/director/attendance-report   - Отчёт по посещаемости
```

Полная документация: [API Reference](docs/api/BACKEND_API_COMPLETE.md)

---

## 👥 Команда

- **Backend разработка** - Node.js, Express, Prisma
- **Frontend разработка** - React, TypeScript, Tailwind
- **Database** - PostgreSQL
- **Design** - Modern UI/UX

---

## 📄 Лицензия

MIT License

---

## 🤝 Контакты

- **GitHub**: [icewhipe/lotto-web](https://github.com/icewhipe/lotto-web)
- **Email**: support@lptt.ru

---

**Сделано с ❤️ для Луганского политехнического техникума**
