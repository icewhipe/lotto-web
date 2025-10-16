# 📁 Структура проекта ЛПТТ

Подробное описание структуры проекта.

---

## 📂 Корневая директория

```
lotto-web/
├── README.md                    # Главная документация
├── QUICK_START.md              # Быстрый старт (5 минут)
├── package.json                # Frontend зависимости
├── .gitignore                  # Git исключения
│
├── backend/                    # Backend сервер
├── src/                        # Frontend приложение
├── docs/                       # Документация
├── public/                     # Статические файлы
│
└── ... (конфиг файлы)
```

---

## 🗄️ Backend (backend/)

```
backend/
├── prisma/
│   ├── schema.prisma           # Схема базы данных
│   └── seed.ts                 # Скрипт заполнения тестовыми данными
│
├── src/
│   ├── controllers/            # Контроллеры (бизнес-логика)
│   │   ├── admin.controller.ts         # Админ функции
│   │   ├── attendance.controller.ts    # Посещаемость
│   │   ├── auth.controller.ts          # Аутентификация
│   │   ├── director.controller.ts      # Функции директора
│   │   ├── grades.controller.ts        # Оценки
│   │   ├── parent.controller.ts        # Родительские функции
│   │   ├── registration.controller.ts  # Регистрация
│   │   ├── rfid.controller.ts          # RFID карты
│   │   ├── schedule.controller.ts      # Расписание
│   │   ├── teacher.controller.ts       # Функции преподавателя
│   │   └── turnstile.controller.ts     # Турникеты
│   │
│   ├── routes/                 # API маршруты
│   │   ├── admin.routes.ts             # /api/admin/*
│   │   ├── attendance.routes.ts        # /api/attendance/*
│   │   ├── auth.routes.ts              # /api/auth/*
│   │   ├── director.routes.ts          # /api/director/*
│   │   ├── grades.routes.ts            # /api/grades/*
│   │   ├── parent.routes.ts            # /api/parent/*
│   │   ├── registration.routes.ts      # /api/registration/*
│   │   ├── rfid.routes.ts              # /api/rfid/*
│   │   ├── schedule.routes.ts          # /api/schedule/*
│   │   ├── teacher.routes.ts           # /api/teacher/*
│   │   └── turnstile.routes.ts         # /api/turnstiles/*
│   │
│   ├── middleware/             # Middleware
│   │   ├── auth.ts                     # Базовая аутентификация
│   │   ├── authMiddleware.ts           # Расширенная auth
│   │   └── validation.ts               # Валидация запросов
│   │
│   ├── config/                 # Конфигурация
│   │   ├── database.ts                 # Prisma Client
│   │   ├── email.ts                    # Email сервис
│   │   ├── jwt.ts                      # JWT токены
│   │   ├── multer.ts                   # Загрузка файлов
│   │   ├── redis.ts                    # Redis кэш (опционально)
│   │   └── websocket.ts                # WebSocket
│   │
│   ├── types/                  # TypeScript типы
│   │   └── index.ts
│   │
│   ├── utils/                  # Утилиты
│   │   ├── seedDatabase.ts             # Старый seed
│   │   └── createTestInviteCode.ts     # Создание кодов
│   │
│   └── server.ts               # Точка входа
│
├── dist/                       # Скомпилированный код (git ignore)
├── node_modules/               # Зависимости (git ignore)
├── uploads/                    # Загруженные файлы (git ignore)
│
├── .env                        # Переменные окружения (git ignore)
├── .env.example                # Пример .env
├── package.json                # Backend зависимости
└── tsconfig.json               # TypeScript конфигурация
```

---

## 🎨 Frontend (src/)

```
src/
├── components/                 # React компоненты
│   ├── dashboard/              # Дашборды
│   │   ├── StudentDashboard.tsx        # Главная студента
│   │   ├── TeacherDashboard.tsx        # Главная преподавателя
│   │   ├── ParentDashboard.tsx         # Главная родителя
│   │   ├── DirectorDashboard.tsx       # Главная директора
│   │   ├── ZavuchDashboard.tsx         # Главная завуча
│   │   ├── GradesView.tsx              # Просмотр оценок
│   │   ├── AttendanceView.tsx          # Просмотр посещаемости
│   │   ├── ScheduleView.tsx            # Просмотр расписания
│   │   └── ...
│   │
│   ├── admin/                  # Админ панель
│   │   ├── AdminPanel.tsx              # Главная админа
│   │   ├── UsersManager.tsx            # Управление пользователями
│   │   └── ...
│   │
│   ├── layout/                 # Компоненты layout
│   │   ├── DashboardLayout.tsx         # Основной layout
│   │   ├── Navbar.tsx                  # Навигация
│   │   └── Sidebar.tsx                 # Боковое меню
│   │
│   ├── Dashboard.tsx           # Роутер дашбордов
│   ├── LoginPage.tsx           # Страница входа
│   ├── RegisterPage.tsx        # Страница регистрации
│   ├── UnderConstruction.tsx   # Заглушка сайта
│   └── ...
│
├── hooks/                      # Custom React hooks
│   ├── useGrades.ts                    # Работа с оценками
│   ├── useSchedule.ts                  # Работа с расписанием
│   └── ...
│
├── services/                   # API сервисы
│   └── api.ts                          # Axios instance + endpoints
│
├── contexts/                   # React Context
│   └── AuthContext.tsx                 # Контекст аутентификации
│
├── assets/                     # Статические ресурсы
│   └── ...
│
├── App.tsx                     # Главный компонент
├── main.tsx                    # Точка входа
├── index.css                   # Глобальные стили
└── vite-env.d.ts              # Vite типы
```

---

## 📚 Документация (docs/)

```
docs/
├── INDEX.md                    # Главная страница документации
├── STRUCTURE.md               # Этот файл
├── ARCHITECTURE.md            # Архитектура проекта
│
├── guides/                     # Руководства пользователей
│   ├── STUDENT_GUIDE.md               # Для студентов
│   ├── TEACHER_GUIDE.md               # Для преподавателей
│   ├── PARENT_GUIDE.md                # Для родителей
│   ├── ADMIN_GUIDE.md                 # Для администраторов
│   ├── DIRECTOR_GUIDE.md              # Для директора
│   └── ZAVUCH_GUIDE.md                # Для завуча
│
├── api/                        # API документация
│   ├── BACKEND_API_COMPLETE.md        # Полная документация API
│   ├── BACKEND_ГОТОВ_ТЕСТИРУЙ.md      # Тестирование API
│   └── BACKEND_INTEGRATION_COMPLETE.md # Отчёт интеграции
│
├── setup/                      # Установка и настройка
│   ├── ЗАПУСК_ВСЕГО_ПРОЕКТА.md        # Полная инструкция
│   ├── TROUBLESHOOTING.md              # Решение проблем
│   ├── ИСПРАВЛЕНИЕ_ESBUILD.md         # Исправление esbuild
│   └── РЕШЕНИЕ_NODE_MODULES.md        # Git проблемы
│
├── archive/                    # Архивные документы
│   └── ... (старые инструкции)
│
├── CHANGELOG.md               # История изменений
├── CONTRIBUTING.md            # Участие в разработке
├── GIT_КОМАНДЫ.md            # Git команды
└── RUN.md                    # Команды запуска
```

---

## 🔧 Конфигурационные файлы

```
Корень проекта:
├── package.json               # Frontend зависимости и скрипты
├── tsconfig.json             # TypeScript конфигурация
├── vite.config.ts            # Vite конфигурация
├── tailwind.config.js        # Tailwind CSS
├── postcss.config.js         # PostCSS
└── .gitignore                # Git исключения

Backend:
├── package.json              # Backend зависимости
├── tsconfig.json            # TypeScript конфигурация
├── .env.example             # Пример переменных окружения
└── .env                     # Переменные окружения (git ignore)
```

---

## 📊 Модели данных (Prisma Schema)

```
База данных PostgreSQL:

Основные модели:
├── User                      # Пользователи
├── Student                   # Студенты
├── Teacher                   # Преподаватели
├── Parent                    # Родители
├── Applicant                 # Абитуриенты
├── Group                     # Группы
├── Specialty                 # Специальности
├── Subject                   # Предметы
├── Grade                     # Оценки
├── Schedule                  # Расписание
├── Attendance               # Посещаемость
├── Note                     # Конспекты
├── ChatRoom                 # Чаты
├── ChatMessage              # Сообщения
├── Document                 # Документы
├── RFIDCard                 # RFID карты
├── Turnstile                # Турникеты
├── AccessLog                # Логи доступа
├── Event                    # События/новости
├── GalleryImage             # Галерея
├── Album                    # Альбомы
├── InviteCode               # Инвайт-коды
└── RegistrationRequest      # Заявки на регистрацию
```

---

## 🔌 API Endpoints

```
/api
├── /auth                     # Аутентификация
├── /registration            # Регистрация
├── /grades                  # Оценки
├── /schedule                # Расписание
├── /attendance              # Посещаемость
├── /teacher                 # Преподаватель
├── /parent                  # Родитель
├── /admin                   # Администратор
├── /director                # Директор
├── /rfid                    # RFID система
└── /turnstiles              # Турникеты
```

Подробно: [docs/api/BACKEND_API_COMPLETE.md](api/BACKEND_API_COMPLETE.md)

---

## 🎨 Дизайн система

### Технологии:
- **Tailwind CSS** - утилиты стилизации
- **Framer Motion** - анимации
- **Lucide React** - иконки
- **Chart.js** - графики

### Цветовая схема:

```
Роли:
- 👨‍🎓 Студент:      Фиолетовый (Violet → Purple)
- 👨‍🏫 Преподаватель: Синий (Blue → Cyan)
- 👨‍👩‍👧 Родитель:     Зелёный (Green → Emerald)
- 👨‍💼 Админ:        Красный (Rose → Pink)
- 👔 Директор:     Оранжевый (Orange → Red)
- 📋 Завуч:        Индиго (Indigo → Purple)

Оценки:
- 5: Зелёный (Green → Emerald)
- 4: Синий (Blue → Cyan)
- 3: Жёлтый (Yellow → Orange)
- 2: Красный (Red → Rose)

Статусы:
- ✅ Success: Зелёный
- ⚠️ Warning: Жёлтый
- ❌ Error: Красный
- ℹ️ Info: Синий
```

### Компоненты:

```
UI Components:
├── Glass Effect Cards        # Стеклянные карточки
├── Gradient Buttons          # Градиентные кнопки
├── Stat Cards               # Карточки статистики
├── Modal Windows            # Модальные окна
├── Animated Backgrounds     # Анимированные фоны
└── Charts                   # Графики
```

---

## 🔐 Система безопасности

### Аутентификация:
- **JWT токены** (7 дней)
- **bcryptjs** хеширование паролей
- **Middleware** проверка прав

### Роли и права:

```
STUDENT:
- ✅ Свои оценки
- ✅ Своё расписание
- ✅ Своя посещаемость
- ❌ Чужие данные

TEACHER:
- ✅ Расписание
- ✅ Свои студенты
- ✅ Выставление оценок
- ✅ Отметка посещаемости
- ❌ Другие преподаватели

PARENT:
- ✅ Данные своих детей
- ❌ Данные чужих детей

ADMIN:
- ✅ Всё (управление)

DIRECTOR:
- ✅ Просмотр всего
- ✅ Отчёты
- ❌ Прямое редактирование
```

---

## 📦 Зависимости

### Frontend (package.json):

**Основные:**
- react: ^18.3.1
- react-dom: ^18.3.1
- typescript: ^5.6.2
- vite: ^5.4.20

**UI/UX:**
- framer-motion: ^11.12.0
- tailwindcss: ^3.4.17
- lucide-react: ^0.469.0
- chart.js: ^4.4.7
- react-chartjs-2: ^5.3.0

**Утилиты:**
- axios: ^1.7.9
- react-hot-toast: ^2.4.1
- clsx: ^2.1.1

### Backend (backend/package.json):

**Основные:**
- express: ^4.18.2
- typescript: ^5.3.3
- tsx: ^4.7.0

**База данных:**
- @prisma/client: ^5.7.0
- prisma: ^5.7.0

**Безопасность:**
- bcryptjs: ^2.4.3
- jsonwebtoken: ^9.0.2
- helmet: ^7.1.0
- cors: ^2.8.5

**Утилиты:**
- dotenv: ^16.3.1
- socket.io: ^4.6.2
- nodemailer: ^6.9.7
- redis: ^4.6.11

---

## 🚀 NPM скрипты

### Frontend:

```bash
npm run dev          # Запуск dev сервера (Vite)
npm run build        # Сборка для production
npm run preview      # Просмотр production build
npm run lint         # Проверка ESLint
```

### Backend:

```bash
npm run dev          # Запуск dev сервера (tsx watch)
npm run build        # Сборка TypeScript
npm run start        # Запуск production
npm run seed         # Заполнение БД тестовыми данными
```

### Prisma:

```bash
npx prisma generate  # Генерация Prisma Client
npx prisma db push   # Применение схемы к БД
npx prisma studio    # GUI для работы с БД
npx prisma migrate   # Создание миграций
```

---

## 📊 База данных

### PostgreSQL Schema:

**Основные таблицы:**

```sql
users                 -- Пользователи системы
students              -- Студенты
teachers              -- Преподаватели
parents               -- Родители
applicants            -- Абитуриенты

groups                -- Группы
specialties           -- Специальности
subjects              -- Предметы

grades                -- Оценки
schedules             -- Расписание
attendance            -- Посещаемость

notes                 -- Конспекты
chat_rooms            -- Чаты
chat_messages         -- Сообщения

documents             -- Документы
rfid_cards            -- RFID карты
turnstiles            -- Турникеты
access_logs           -- Логи доступа

events                -- События/новости
gallery_images        -- Галерея
albums                -- Альбомы

invite_codes          -- Инвайт-коды
registration_requests -- Заявки на регистрацию
```

### Связи:

```
User 1──────→ * Student
User 1──────→ * Teacher
User 1──────→ * Parent
User 1──────→ * Applicant

Student *───→ 1 Group
Teacher *───→ * Subject
Group 1─────→ * Schedule

Grade *─────→ 1 Student
Grade *─────→ 1 Subject
Grade *─────→ 1 Teacher

Attendance *→ 1 Student
Schedule *──→ 1 Group
Schedule *──→ 1 Subject
Schedule *──→ 1 Teacher
```

---

## 🎯 Следующие шаги разработки

### Phase 1: Базовый функционал ✅
- ✅ Аутентификация
- ✅ Студенческий дневник
- ✅ Оценки, расписание, посещаемость
- ✅ Админ панель

### Phase 2: Расширенный функционал (В процессе)
- 🔄 Преподавательская панель
- 🔄 Родительский кабинет
- 🔄 Директор/Завуч панели
- 🔄 Отчёты и аналитика

### Phase 3: Дополнительные функции
- ⏳ Чат группы
- ⏳ Обмен конспектами
- ⏳ RFID система
- ⏳ Мобильное приложение

### Phase 4: Интеграция
- ⏳ 1C интеграция
- ⏳ Электронная библиотека
- ⏳ Электронная очередь
- ⏳ SMS уведомления

---

## 📞 Контакты команды

- **GitHub**: [icewhipe/lotto-web](https://github.com/icewhipe/lotto-web)
- **Email**: dev@lptt.ru
- **Support**: support@lptt.ru

---

**Документация обновлена: 14.10.2024**
