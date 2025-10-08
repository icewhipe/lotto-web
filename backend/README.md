# 🚀 Backend Структура для ЛПТТ

## 📋 Обзор

Backend для сайта Лискинского промышленно-транспортного техникума будет построен на современном стеке технологий для обеспечения масштабируемости, безопасности и производительности.

## 🛠️ Технологический стек

### Основные технологии:
- **Node.js** (v20+) - Runtime environment
- **TypeScript** - Type safety
- **Express.js** - Web framework
- **PostgreSQL** - Основная база данных
- **Redis** - Кэширование и сессии
- **Socket.IO** - Real-time для чата
- **Prisma** - ORM

### Дополнительные инструменты:
- **JWT** - Аутентификация
- **Bcrypt** - Хеширование паролей
- **Multer** - Загрузка файлов
- **Nodemailer** - Email уведомления
- **PM2** - Process manager
- **Nginx** - Reverse proxy

## 📁 Структура проекта

```
backend/
├── src/
│   ├── config/           # Конфигурации
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── auth.ts
│   │
│   ├── models/           # Prisma models
│   │   ├── user.ts
│   │   ├── student.ts
│   │   ├── grade.ts
│   │   ├── schedule.ts
│   │   └── note.ts
│   │
│   ├── controllers/      # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── student.controller.ts
│   │   ├── grades.controller.ts
│   │   ├── schedule.controller.ts
│   │   ├── notes.controller.ts
│   │   └── chat.controller.ts
│   │
│   ├── services/         # Business logic
│   │   ├── auth.service.ts
│   │   ├── student.service.ts
│   │   ├── grades.service.ts
│   │   └── notes.service.ts
│   │
│   ├── middleware/       # Middlewares
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── routes/           # API routes
│   │   ├── auth.routes.ts
│   │   ├── student.routes.ts
│   │   ├── grades.routes.ts
│   │   ├── schedule.routes.ts
│   │   ├── notes.routes.ts
│   │   └── chat.routes.ts
│   │
│   ├── utils/            # Utilities
│   │   ├── jwt.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   │
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   │
│   ├── sockets/          # Socket.IO handlers
│   │   └── chat.socket.ts
│   │
│   └── app.ts            # Express app
│   └── server.ts         # Server entry point
│
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # DB migrations
│   └── seed.ts          # Seed data
│
├── uploads/              # Uploaded files
│   ├── notes/
│   ├── documents/
│   └── avatars/
│
├── tests/                # Tests
│   ├── unit/
│   └── integration/
│
├── .env.example          # Environment variables example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema (Prisma)

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  student   Student?
  teacher   Teacher?
  parent    Parent?
}

enum UserRole {
  STUDENT
  TEACHER
  PARENT
  APPLICANT
  ADMIN
}
```

### Student Model
```prisma
model Student {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  groupId   String
  group     Group    @relation(fields: [groupId], references: [id])
  
  grades    Grade[]
  attendance Attendance[]
  notes     Note[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Grade Model
```prisma
model Grade {
  id         String   @id @default(uuid())
  studentId  String
  student    Student  @relation(fields: [studentId], references: [id])
  subjectId  String
  subject    Subject  @relation(fields: [subjectId], references: [id])
  teacherId  String
  teacher    Teacher  @relation(fields: [teacherId], references: [id])
  
  value      Int
  type       GradeType
  date       DateTime
  comment    String?
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum GradeType {
  EXAM
  TEST
  HOMEWORK
  CLASSWORK
  QUIZ
}
```

### Schedule Model
```prisma
model Schedule {
  id        String   @id @default(uuid())
  groupId   String
  group     Group    @relation(fields: [groupId], references: [id])
  subjectId String
  subject   Subject  @relation(fields: [subjectId], references: [id])
  teacherId String
  teacher   Teacher  @relation(fields: [teacherId], references: [id])
  
  dayOfWeek Int      // 1-6 (Пн-Сб)
  startTime String   // "09:00"
  endTime   String   // "10:30"
  room      String
  type      LessonType
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum LessonType {
  LECTURE
  PRACTICE
  LAB
  SEMINAR
}
```

### Note Model (Конспекты)
```prisma
model Note {
  id          String   @id @default(uuid())
  title       String
  description String
  filePath    String
  authorId    String
  author      Student  @relation(fields: [authorId], references: [id])
  subjectId   String
  subject     Subject  @relation(fields: [subjectId], references: [id])
  
  rating      Float    @default(0)
  downloads   Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Регистрация
POST   /api/auth/login       - Вход
POST   /api/auth/logout      - Выход
POST   /api/auth/refresh     - Обновить токен
GET    /api/auth/me          - Текущий пользователь
```

### Students
```
GET    /api/students         - Список студентов
GET    /api/students/:id     - Студент по ID
PUT    /api/students/:id     - Обновить студента
DELETE /api/students/:id     - Удалить студента
```

### Grades (Оценки)
```
GET    /api/grades/student/:id        - Оценки студента
POST   /api/grades                    - Добавить оценку
PUT    /api/grades/:id                - Обновить оценку
DELETE /api/grades/:id                - Удалить оценку
GET    /api/grades/subject/:subjectId - Оценки по предмету
GET    /api/grades/stats/:studentId   - Статистика оценок
```

### Schedule (Расписание)
```
GET    /api/schedule/group/:groupId   - Расписание группы
GET    /api/schedule/teacher/:id      - Расписание преподавателя
POST   /api/schedule                  - Создать занятие
PUT    /api/schedule/:id              - Обновить занятие
DELETE /api/schedule/:id              - Удалить занятие
```

### Notes (Конспекты)
```
GET    /api/notes                     - Список конспектов
GET    /api/notes/:id                 - Конспект по ID
POST   /api/notes                     - Загрузить конспект
PUT    /api/notes/:id                 - Обновить конспект
DELETE /api/notes/:id                 - Удалить конспект
POST   /api/notes/:id/download        - Скачать конспект
POST   /api/notes/:id/rate            - Оценить конспект
GET    /api/notes/search              - Поиск конспектов
```

### Attendance (Посещаемость)
```
GET    /api/attendance/student/:id    - Посещаемость студента
POST   /api/attendance                - Отметить посещаемость
PUT    /api/attendance/:id            - Обновить запись
GET    /api/attendance/stats/:id      - Статистика посещаемости
```

### Chat (Чат)
```
GET    /api/chat/messages/:groupId    - Сообщения группы
POST   /api/chat/messages             - Отправить сообщение
WS     /socket/chat                   - WebSocket для чата
```

### Progress Tracker
```
GET    /api/progress/student/:id      - Прогресс студента
GET    /api/progress/stats/:id        - Статистика прогресса
GET    /api/progress/chart/:id        - Данные для графика
```

## 🔐 Аутентификация

### JWT Token Structure
```typescript
interface JWTPayload {
  userId: string
  role: UserRole
  email: string
  iat: number
  exp: number
}
```

### Token Flow
1. User логинится → получает Access Token (15 мин) и Refresh Token (7 дней)
2. Access Token в Authorization header для запросов
3. Refresh Token для обновления Access Token
4. Tokens хранятся в httpOnly cookies

## 📡 Real-time (Socket.IO)

### Chat Events
```typescript
// Client → Server
socket.emit('join_room', { groupId: string })
socket.emit('send_message', { groupId: string, message: string })
socket.emit('typing', { groupId: string, userId: string })

// Server → Client
socket.on('new_message', { message: Message })
socket.on('user_typing', { userId: string, userName: string })
socket.on('user_online', { userId: string })
socket.on('user_offline', { userId: string })
```

## 🔒 Безопасность

### Middleware Stack
1. **Helmet** - Security headers
2. **CORS** - Cross-origin control
3. **Rate Limiting** - DDoS protection
4. **Input Validation** - Joi/Zod
5. **SQL Injection** - Prisma параметризация
6. **XSS Protection** - Sanitization

### Environment Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/lptt
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=https://lptt.ru
```

## 📊 Мониторинг и логирование

### Tools
- **Winston** - Logging
- **Morgan** - HTTP logging
- **PM2** - Process monitoring
- **Sentry** - Error tracking (опционально)

## 🚀 Деплой

### Production Stack
```
[Nginx] → [PM2] → [Node.js App]
                     ↓
                [PostgreSQL]
                     ↓
                  [Redis]
```

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Tests
npm run test

# Migrations
npm run migrate
npm run seed
```

## 📝 Следующие шаги

1. ✅ Создать structure папок
2. ⏳ Настроить Prisma schema
3. ⏳ Реализовать auth endpoints
4. ⏳ Добавить API endpoints
5. ⏳ Настроить Socket.IO для чата
6. ⏳ Добавить файловую систему для конспектов
7. ⏳ Настроить деплой

---

**Дата создания:** 8 октября 2025  
**Статус:** 📋 План готов, начинаем реализацию
