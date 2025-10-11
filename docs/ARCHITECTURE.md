# 🏗 Архитектура проекта LPTT

> Техническая документация для опытных разработчиков

---

## 📋 Содержание

1. [Обзор архитектуры](#обзор-архитектуры)
2. [Frontend](#frontend-react--typescript)
3. [Backend](#backend-nodejs--express)
4. [База данных](#база-данных-postgresql--prisma)
5. [Аутентификация](#аутентификация-jwt)
6. [Real-time](#real-time-socketio)
7. [Производительность](#производительность)
8. [Безопасность](#безопасность)
9. [Deployment](#deployment)

---

## 🎯 Обзор архитектуры

### Стек технологий

#### Frontend:
- **React 18** с TypeScript
- **Vite** — сборщик
- **Tailwind CSS** — стилизация
- **Framer Motion** — анимации
- **Zustand** — state management

#### Backend:
- **Node.js 18+** с TypeScript
- **Express.js** — REST API
- **Prisma** — ORM
- **PostgreSQL** — СУБД
- **Socket.IO** — WebSocket
- **Redis** — кэширование (опционально)

#### iOS:
- **Swift** — язык программирования
- **SwiftUI** — UI framework
- **MVVM** — архитектурный паттерн

### Структура монорепозитория

```
lotto-web/
├── backend/          # Backend API (Express + TypeScript)
├── src/              # Frontend (React + TypeScript)
├── ios-native/       # iOS App (Swift + SwiftUI)
├── docs/             # Документация
└── scripts/          # Утилиты и скрипты
```

---

## ⚛️ Frontend (React + TypeScript)

### Архитектура компонентов

#### Иерархия:
```
App.tsx
├── Navbar (глобальный)
├── Hero (главная страница)
├── News
├── Gallery
├── History
├── LoginPage
├── Dashboard
│   ├── DashboardLayout
│   ├── StudentDashboard
│   ├── TeacherDashboard
│   └── DirectorDashboard
└── AdminPanel
    ├── NewsManager
    └── GalleryManager
```

### State Management

#### Context API
```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Используется для:
- Аутентификация
- Профиль пользователя
- Роли и permissions
```

#### Local State (useState)
```typescript
// Для локального состояния компонентов
const [selectedNews, setSelectedNews] = useState<News | null>(null)
const [activeTab, setActiveTab] = useState('all')
```

### Performance Optimizations

#### 1. **Lazy Loading**
```typescript
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'))

<Suspense fallback={<PageLoader />}>
  <AdminPanel />
</Suspense>
```

#### 2. **Memoization**
```typescript
const MemoizedComponent = memo(Component)

const memoizedValue = useMemo(
  () => expensiveCalculation(data),
  [data]
)

const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
)
```

#### 3. **Виртуализация**
```typescript
// Используется react-window для больших списков
import { FixedSizeList } from 'react-window'
```

#### 4. **Оптимизация анимаций**
```typescript
// Используется willChange для GPU acceleration
<motion.div style={{ willChange: 'transform' }}>
  
// Transitions минимизированы
transition={{ duration: 0.2 }}

// Частицы сокращены (25 вместо 50)
particleCount: 25
```

### Styling System

#### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { /* violet palette */ },
        secondary: { /* blue palette */ }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  }
}
```

#### Custom CSS
```css
/* src/index.css */
.glass-effect {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(150%);
}

.dark .glass-effect {
  background-color: rgba(17, 24, 39, 0.7);
}
```

### Routing

#### Основной роутинг (в App.tsx)
```typescript
const [currentPage, setCurrentPage] = useState('home')
const [showLogin, setShowLogin] = useState(false)
const [showAdminPanel, setShowAdminPanel] = useState(false)

// Переключение страниц через state
if (showLogin) return <LoginPage />
if (showAdminPanel) return <AdminPanel />
if (user) return <Dashboard />
```

#### Будущая миграция на React Router:
```typescript
// Планируется:
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  </Routes>
</BrowserRouter>
```

---

## 🔧 Backend (Node.js + Express)

### Архитектура MVC

```
backend/src/
├── controllers/      # Бизнес-логика
│   ├── auth.controller.ts
│   ├── grades.controller.ts
│   ├── schedule.controller.ts
│   ├── rfid.controller.ts
│   └── turnstile.controller.ts
├── routes/           # API маршруты
│   ├── auth.routes.ts
│   ├── grades.routes.ts
│   └── ...
├── middleware/       # Middleware
│   ├── authMiddleware.ts
│   ├── errorHandler.ts
│   └── validation.ts
├── config/           # Конфигурация
│   ├── jwt.ts
│   ├── redis.ts
│   ├── email.ts
│   ├── multer.ts
│   └── websocket.ts
├── types/            # TypeScript типы
│   └── index.ts
└── server.ts         # Entry point
```

### API Endpoints

#### Authentication
```typescript
POST   /api/auth/register     // Регистрация
POST   /api/auth/login        // Вход
GET    /api/auth/me           // Текущий пользователь (protected)
PUT    /api/auth/profile      // Обновить профиль (protected)
POST   /api/auth/change-password  // Сменить пароль (protected)
```

#### Grades
```typescript
POST   /api/grades             // Создать оценку (teacher, admin)
GET    /api/grades/student/:id // Получить оценки студента
GET    /api/grades/:id         // Получить оценку по ID
PUT    /api/grades/:id         // Обновить оценку (teacher, admin)
DELETE /api/grades/:id         // Удалить оценку (admin)
```

#### RFID System
```typescript
POST   /api/rfid/cards         // Создать карту (admin)
GET    /api/rfid/cards         // Получить все карты (admin)
GET    /api/rfid/cards/:id     // Получить карту по ID
PUT    /api/rfid/cards/:id     // Обновить карту (admin)
DELETE /api/rfid/cards/:id     // Удалить карту (admin)
POST   /api/rfid/scan          // Обработать скан (system)
```

### Middleware Chain

```typescript
// Пример защищённого роута
router.post('/grades',
  authenticate,           // JWT проверка
  authorize('teacher', 'admin'),  // Role check
  validateBody(gradeSchema),  // Валидация
  gradesController.create     // Контроллер
)
```

### Error Handling

```typescript
// Глобальный error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message)
  
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      error: 'Database error',
      code: err.code
    })
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})
```

### WebSocket Events

```typescript
// backend/src/config/websocket.ts
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  // Join room by user ID
  socket.on('join-room', (userId) => {
    socket.join(`user-${userId}`)
  })
  
  // RFID scan event
  socket.on('rfid-scan', async (data) => {
    const result = await processRFIDScan(data)
    io.emit('rfid-scan-result', result)
  })
  
  // Chat message
  socket.on('chat-message', (message) => {
    socket.broadcast.emit('chat-message', message)
  })
})
```

---

## 🗄 База данных (PostgreSQL + Prisma)

### Схема данных

#### Core Models:
```prisma
// User (основная модель пользователя)
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  student   Student?
  teacher   Teacher?
  // ...relations
}

// Student (профиль студента)
model Student {
  id        String   @id @default(uuid())
  userId    String   @unique
  groupId   String
  
  user      User     @relation(fields: [userId], references: [id])
  group     Group    @relation(fields: [groupId], references: [id])
  grades    Grade[]
  attendance Attendance[]
  // ...
}

// Grade (оценка)
model Grade {
  id        String    @id @default(uuid())
  studentId String
  subjectId String
  teacherId String
  value     Int
  type      GradeType // EXAM, TEST, HOMEWORK, PRACTICE
  date      DateTime  @default(now())
  comment   String?
  
  student   Student   @relation(fields: [studentId], references: [id])
  subject   Subject   @relation(fields: [subjectId], references: [id])
  teacher   Teacher   @relation(fields: [teacherId], references: [id])
  
  @@index([studentId, subjectId])
}
```

#### RFID System:
```prisma
model RFIDCard {
  id          String   @id @default(uuid())
  cardNumber  String   @unique
  studentId   String   @unique
  isActive    Boolean  @default(true)
  issuedDate  DateTime @default(now())
  expiryDate  DateTime?
  
  student     Student  @relation(fields: [studentId], references: [id])
  accessLogs  AccessLog[]
}

model Turnstile {
  id          String   @id @default(uuid())
  name        String
  location    String
  type        TurnstileType  // ENTRY, EXIT, BIDIRECTIONAL
  isActive    Boolean  @default(true)
  
  accessLogs  AccessLog[]
}

model AccessLog {
  id          String   @id @default(uuid())
  cardId      String
  turnstileId String
  timestamp   DateTime @default(now())
  action      AccessAction  // ENTRY, EXIT
  status      AccessStatus  // GRANTED, DENIED
  reason      String?
  
  card        RFIDCard  @relation(fields: [cardId], references: [id])
  turnstile   Turnstile @relation(fields: [turnstileId], references: [id])
  
  @@index([cardId, timestamp])
  @@index([turnstileId, timestamp])
}
```

### Prisma Queries

#### Оптимизированные запросы:
```typescript
// Получить оценки студента с агрегацией
const grades = await prisma.grade.findMany({
  where: {
    studentId,
    ...(subjectId && { subjectId }),
    ...(type && { type }),
    ...(startDate && endDate && {
      date: {
        gte: startDate,
        lte: endDate
      }
    })
  },
  include: {
    subject: true,
    teacher: { include: { user: true } }
  },
  orderBy: { date: 'desc' }
})

// Вычислить средний балл
const avgGrade = grades.reduce((sum, g) => sum + g.value, 0) / grades.length
```

#### Транзакции:
```typescript
// Atomic RFID scan + Attendance creation
const result = await prisma.$transaction(async (tx) => {
  // Create access log
  const log = await tx.accessLog.create({
    data: { cardId, turnstileId, action, status }
  })
  
  // Create attendance if student
  if (student && action === 'ENTRY') {
    await tx.attendance.create({
      data: {
        studentId: student.id,
        scheduleId: currentLesson.id,
        status: 'PRESENT',
        date: new Date()
      }
    })
  }
  
  return log
})
```

### Индексы для производительности

```prisma
@@index([studentId, subjectId])  // Быстрый поиск оценок
@@index([cardId, timestamp])      // RFID логи
@@index([groupId, dayOfWeek])     // Расписание
@@index([date, studentId])        // Посещаемость
```

---

## 🔐 Аутентификация (JWT)

### JWT Token Structure

```typescript
interface JWTPayload {
  userId: string
  email: string
  role: UserRole
  iat: number    // Issued at
  exp: number    // Expires at (24h)
}
```

### Login Flow

```typescript
// 1. Validate credentials
const user = await prisma.user.findUnique({ where: { email } })
if (!user || !await bcrypt.compare(password, user.password)) {
  throw new Error('Invalid credentials')
}

// 2. Generate JWT
const token = jwt.sign(
  { userId: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '24h' }
)

// 3. Return user + profile
const profile = await getProfileByRole(user.role, user.id)
return { success: true, token, user: { ...user, ...profile } }
```

### Auth Middleware

```typescript
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    
    // Attach user to request
    req.user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' })
  }
}
```

### Role-Based Access Control (RBAC)

```typescript
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' })
    }
    next()
  }
}

// Usage:
router.post('/grades', authenticate, authorize('TEACHER', 'ADMIN'), createGrade)
```

---

## ⚡ Real-time (Socket.IO)

### WebSocket Architecture

```typescript
// backend/src/config/websocket.ts
export const initializeWebSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL }
  })
  
  // JWT authentication for WS
  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
      socket.data.user = decoded
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  })
  
  io.on('connection', (socket) => {
    // Auto-join user's room
    socket.join(`user-${socket.data.user.userId}`)
    
    // Room management
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
    })
    
    // Events...
  })
  
  return io
}
```

### Event Types

| Event | Direction | Purpose |
|-------|-----------|---------|
| `rfid-scan` | Client → Server | RFID scan from device |
| `rfid-scan-result` | Server → All | Broadcast scan result |
| `turnstile-status` | Server → All | Turnstile status update |
| `chat-message` | Client ↔ Server | Chat messaging |
| `notification` | Server → User | User-specific notification |
| `typing` | Client → Room | Typing indicator |

### Client Integration

```typescript
// Frontend
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  auth: { token: localStorage.getItem('token') }
})

socket.on('connect', () => {
  console.log('Connected:', socket.id)
})

socket.on('rfid-scan-result', (data) => {
  // Update UI with scan result
  toast.success(`${data.studentName} вошёл`)
})

socket.emit('join-room', 'group-IS-21')
```

---

## 🚀 Производительность

### Backend Optimizations

#### 1. **Redis Caching**
```typescript
// Cache frequently accessed data
const cacheKey = `grades:${studentId}`
const cached = await redis.get(cacheKey)
if (cached) return JSON.parse(cached)

const grades = await prisma.grade.findMany({ where: { studentId } })
await redis.set(cacheKey, JSON.stringify(grades), 'EX', 3600)
return grades
```

#### 2. **Database Query Optimization**
```typescript
// ✅ Good: Select only needed fields
const students = await prisma.student.findMany({
  select: { id: true, name: true, groupId: true }
})

// ❌ Bad: Select all fields + relations
const students = await prisma.student.findMany({
  include: { user: true, grades: true, attendance: true }
})
```

#### 3. **Pagination**
```typescript
router.get('/grades', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 20
  const skip = (page - 1) * limit
  
  const [grades, total] = await Promise.all([
    prisma.grade.findMany({ skip, take: limit }),
    prisma.grade.count()
  ])
  
  res.json({
    data: grades,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})
```

### Frontend Optimizations

#### 1. **Code Splitting**
```typescript
// Lazy load heavy components
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'))
```

#### 2. **Image Optimization**
```typescript
// Use WebP + lazy loading
<img 
  src="image.webp" 
  loading="lazy" 
  alt="..." 
/>
```

#### 3. **Debouncing**
```typescript
// Debounce search input
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    performSearch(value)
  }, 300),
  []
)
```

---

## 🔒 Безопасность

### Backend Security

#### 1. **Helmet.js** (HTTP headers)
```typescript
app.use(helmet())
// Sets: X-Frame-Options, X-Content-Type-Options, etc.
```

#### 2. **Rate Limiting**
```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // limit each IP to 100 requests per windowMs
})

app.use('/api', limiter)
```

#### 3. **Input Validation**
```typescript
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

// Middleware
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (err) {
      res.status(400).json({ error: 'Validation error', details: err })
    }
  }
}
```

#### 4. **SQL Injection Protection**
```typescript
// ✅ Prisma автоматически защищает от SQL injection
await prisma.user.findMany({ where: { email: userInput } })

// ❌ Raw SQL требует параметров
await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`
```

### Frontend Security

#### 1. **XSS Protection**
```typescript
// ✅ React автоматически экранирует
<div>{userInput}</div>

// ❌ Опасно: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

#### 2. **CSRF Protection**
```typescript
// Backend: CSRF token middleware
app.use(csrf({ cookie: true }))

// Frontend: Include token in requests
axios.defaults.headers.common['X-CSRF-Token'] = getCsrfToken()
```

---

## 📦 Deployment

### Development
```bash
# Frontend
npm run dev            # Port 5173

# Backend
cd backend
npm run dev            # Port 3000

# Full stack
npm start              # Both
```

### Production Build

#### Frontend:
```bash
npm run build          # → dist/
npm run preview        # Test production build
```

#### Backend:
```bash
cd backend
npm run build          # → dist/
npm start              # Run production
```

### Environment Variables

#### Frontend (.env):
```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

#### Backend (.env):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/lptt_db
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=production
```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: lptt_db
      POSTGRES_USER: lptt
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
  
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://lptt:secret@postgres:5432/lptt_db
      REDIS_URL: redis://redis:6379
  
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          ssh user@server 'cd /app && git pull && docker-compose up -d --build'
```

---

## 📊 Мониторинг

### Logging
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### Error Tracking
```typescript
// Sentry integration
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
})

app.use(Sentry.Handlers.errorHandler())
```

---

## 🎯 Заключение

Этот проект демонстрирует современные практики full-stack разработки:
- **Типобезопасность** (TypeScript)
- **Production-ready** архитектура
- **Scalable** дизайн
- **Security-first** подход
- **Performance** оптимизации

**Следующие шаги:**
- Миграция на React Router
- Полная интеграция Redis
- Микросервисная архитектура
- Kubernetes deployment
- Comprehensive testing (Jest + Playwright)

---

**Вопросы?** → [GitHub Issues](https://github.com/icewhipe/lotto-web/issues)
