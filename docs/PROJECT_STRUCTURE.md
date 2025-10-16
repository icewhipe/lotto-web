# 📁 Структура проекта ЛПТТ

## Обзор

Проект организован в монорепозитории с четким разделением frontend, backend и мобильных приложений.

---

## 🗂️ Детальная структура

### Frontend (`/src`)

```
src/
├── components/              # React компоненты
│   ├── admin/              # Административная панель
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── GalleryManager.tsx
│   │   ├── GroupsManager.tsx
│   │   ├── InviteCodesManager.tsx
│   │   ├── NewsManager.tsx
│   │   ├── ScheduleManager.tsx
│   │   ├── SpecialtiesManager.tsx
│   │   ├── StudentsManager.tsx
│   │   ├── SubjectsManager.tsx
│   │   └── UsersManager.tsx
│   │
│   ├── common/             # Общие переиспользуемые компоненты
│   │   └── LazyImage.tsx
│   │
│   ├── dashboard/          # Дашборды для разных ролей
│   │   ├── DashboardLayout.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── DirectorDashboard.tsx
│   │   ├── ZavuchDashboard.tsx
│   │   ├── ParentDashboard.tsx
│   │   ├── GradesView.tsx
│   │   ├── ScheduleView.tsx
│   │   └── AttendanceView.tsx
│   │
│   ├── site/               # Публичный сайт
│   │   ├── LiquidGlassTransition.tsx  # Splash screen
│   │   └── sections/       # Секции публичного сайта
│   │       ├── Achievements.tsx
│   │       ├── ApplicationScreen.tsx
│   │       ├── ContactsSection.tsx
│   │       ├── EducationalProjects.tsx
│   │       ├── EventsSection.tsx
│   │       ├── HomeSection.tsx
│   │       ├── NewsSection.tsx
│   │       ├── PhotoGallerySection.tsx
│   │       ├── PhotoVideoGallery.tsx
│   │       ├── ScheduleSection.tsx
│   │       ├── SpecialtiesSection.tsx
│   │       └── VideoGallerySection.tsx
│   │
│   ├── student/            # Студенческие модули
│   │   ├── NotesExchange.tsx
│   │   ├── ProgressTracker.tsx
│   │   └── StudentChat.tsx
│   │
│   ├── FinalMainSite.tsx  # 🌟 Главный компонент сайта
│   ├── Dashboard.tsx       # 🌟 Главный дашборд
│   ├── LoginPage.tsx       # 🌟 Вход
│   ├── RegisterPage.tsx    # 🌟 Регистрация
│   ├── NotFound.tsx        # 🌟 404 страница
│   └── UnderDevelopment.tsx # Заглушка для разделов
│
├── contexts/               # React Context API
│   └── AuthContext.tsx     # Аутентификация и авторизация
│
├── data/                   # Статические данные
│   └── navigationStructure.ts  # Структура навигации сайта
│
├── services/               # API сервисы
│   ├── api.ts             # Axios клиент + API методы
│   └── mockData.ts        # Mock данные для разработки
│
├── styles/                 # Глобальные стили
│   └── index.css          # Tailwind + кастомные стили
│
├── utils/                  # Утилиты и хелперы
│   ├── lazyLoadComponent.tsx  # Динамические импорты
│   └── performance.ts         # Performance оптимизации
│
├── App.tsx                 # 🌟 Root компонент приложения
└── main.tsx                # 🌟 Entry point
```

---

### Backend (`/backend`)

```
backend/
├── src/
│   ├── routes/            # API endpoints
│   │   ├── auth.ts       # Аутентификация
│   │   ├── users.ts      # Пользователи
│   │   ├── students.ts   # Студенты
│   │   ├── teachers.ts   # Преподаватели
│   │   ├── groups.ts     # Группы
│   │   ├── subjects.ts   # Предметы
│   │   ├── grades.ts     # Оценки
│   │   ├── attendance.ts # Посещаемость
│   │   ├── schedule.ts   # Расписание
│   │   ├── news.ts       # Новости
│   │   ├── gallery.ts    # Галерея
│   │   └── public.ts     # Публичные данные
│   │
│   ├── middleware/        # Middleware
│   │   ├── auth.ts       # JWT проверка
│   │   ├── roles.ts      # Проверка ролей
│   │   └── validation.ts # Валидация данных
│   │
│   ├── services/          # Business logic
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── gradeService.ts
│   │   └── ...
│   │
│   ├── types/             # TypeScript типы
│   │   └── index.ts
│   │
│   ├── utils/             # Утилиты
│   │   ├── jwt.ts
│   │   ├── hash.ts
│   │   └── validation.ts
│   │
│   └── server.ts          # 🌟 Express server
│
├── prisma/
│   ├── schema.prisma      # 🌟 Database schema
│   ├── seed.ts            # Seed данные
│   └── migrations/        # История миграций
│
├── dist/                  # Compiled JavaScript
├── docs/                  # Backend документация
│   └── API_PUBLIC_ENDPOINTS.md
│
├── package.json
└── tsconfig.json
```

---

### Public Files (`/public`)

```
public/
├── robots.txt            # SEO конфигурация
└── vite.svg             # Favicon
```

---

### Documentation (`/docs`)

```
docs/
├── ARCHITECTURE.md       # Архитектура системы
├── BEGINNER_GUIDE.md     # Гайд для новичков
├── CHANGELOG.md          # История изменений
├── CONTRIBUTING.md       # Правила контрибуции
├── FINAL_SUMMARY.md      # Финальный summary
├── INDEX.md              # Индекс документации
├── RUN.md                # Как запустить
├── STRUCTURE.md          # Структура (детальная)
├── TESTING.md            # Тестирование
├── PROJECT_STRUCTURE.md  # Этот файл
│
├── guides-archived/      # Архивированные гайды
│   ├── admin-guides/
│   ├── api/
│   ├── backend/
│   ├── guides/
│   ├── ios/
│   ├── setup/
│   └── web/
│
└── GIT_КОМАНДЫ.md        # Git команды
└── ВНЕДРЕНИЕ_В_ТЕХНИКУМ.md  # План внедрения
```

---

### Configuration Files

```
Root/
├── package.json           # Frontend dependencies & scripts
├── tsconfig.json          # TypeScript config (frontend)
├── tsconfig.node.json     # TypeScript config (Vite)
├── vite.config.ts         # Vite bundler config
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── .gitignore             # Git ignore rules
└── README.md              # 🌟 Main documentation
```

---

## 🎯 Ключевые компоненты

### Frontend

| Компонент | Описание | Путь |
|-----------|----------|------|
| **FinalMainSite** | Главная страница сайта | `src/components/FinalMainSite.tsx` |
| **Dashboard** | Основной дашборд | `src/components/Dashboard.tsx` |
| **LoginPage** | Страница входа | `src/components/LoginPage.tsx` |
| **RegisterPage** | Регистрация | `src/components/RegisterPage.tsx` |
| **NotFound** | 404 страница | `src/components/NotFound.tsx` |
| **LiquidGlassTransition** | Splash screen | `src/components/site/LiquidGlassTransition.tsx` |
| **AdminPanel** | Админ панель | `src/components/admin/AdminPanel.tsx` |

### Backend

| Модуль | Описание | Путь |
|--------|----------|------|
| **server.ts** | Express server | `backend/src/server.ts` |
| **auth routes** | Аутентификация | `backend/src/routes/auth.ts` |
| **Prisma schema** | Database схема | `backend/prisma/schema.prisma` |

---

## 📦 Зависимости

### Frontend (основные)

```json
{
  "react": "^18.3.1",
  "framer-motion": "^11.14.4",
  "tailwindcss": "^3.4.17",
  "vite": "^5.4.20",
  "axios": "^1.7.9",
  "react-router-dom": "^7.1.1",
  "lucide-react": "^0.469.0"
}
```

### Backend (основные)

```json
{
  "express": "^4.21.2",
  "prisma": "^6.1.0",
  "@prisma/client": "^6.1.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "socket.io": "^4.8.1",
  "joi": "^17.13.3"
}
```

---

## 🔄 Data Flow

```
User → Frontend → API Request → Backend → Database
  ↓                                 ↓
Response ← UI Update ← API Response ← Query Result
```

### Authentication Flow

```
1. User login → POST /api/auth/login
2. Backend validates → JWT token issued
3. Token stored → localStorage
4. Subsequent requests → Authorization header
5. Middleware validates → Access granted
```

---

## 🎨 Naming Conventions

### Files
- **Components:** PascalCase (`FinalMainSite.tsx`)
- **Utils:** camelCase (`performance.ts`)
- **Styles:** kebab-case (`index.css`)
- **Types:** PascalCase with `.types.ts` suffix

### Code
- **Variables:** camelCase (`isDark`, `currentBanner`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Functions:** camelCase (`handleNavigate`)
- **Components:** PascalCase (`FinalMainSite`)

---

## 🚀 Development Workflow

```
1. Create feature branch
   git checkout -b feature/new-feature

2. Develop with hot reload
   npm run dev:all

3. Test changes
   npm run build

4. Commit with conventional commits
   git commit -m "feat: add new feature"

5. Push and create PR
   git push origin feature/new-feature
```

---

**Этот файл обновляется при изменении структуры проекта.**

_Последнее обновление: 16.10.2025_
