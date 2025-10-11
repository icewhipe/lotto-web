# 🔧 Backend - ЛПТТ Электронный Дневник

Backend API на Node.js + Express + PostgreSQL + Prisma.

---

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lptt_db"
JWT_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
```

### 3. База данных

```bash
# Создать БД
npx prisma migrate dev

# Заполнить тестовыми данными
npm run seed
```

### 4. Запуск

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

**Сервер запущен:** http://localhost:3000

---

## 📚 Документация

- [API Reference](../docs/backend/API.md) — Все endpoints
- [Database Schema](../docs/backend/DATABASE.md) — Prisma схема
- [WebSockets](../docs/backend/WEBSOCKETS.md) — Real-time

---

## 🏗️ Архитектура

```
backend/
├── src/
│   ├── config/           # Конфигурации
│   │   ├── database.ts   # Prisma client
│   │   ├── jwt.ts        # JWT helpers
│   │   ├── websocket.ts  # Socket.IO
│   │   ├── multer.ts     # File upload
│   │   ├── email.ts      # Nodemailer
│   │   └── redis.ts      # Redis cache
│   │
│   ├── controllers/      # Контроллеры
│   │   ├── auth.controller.ts
│   │   ├── rfid.controller.ts
│   │   ├── turnstile.controller.ts
│   │   ├── grades.controller.ts
│   │   └── schedule.controller.ts
│   │
│   ├── middleware/       # Middleware
│   │   ├── authMiddleware.ts
│   │   └── validation.ts
│   │
│   ├── routes/           # Routes
│   │   ├── auth.routes.ts
│   │   ├── rfid.routes.ts
│   │   ├── turnstile.routes.ts
│   │   ├── grades.routes.ts
│   │   └── schedule.routes.ts
│   │
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   │
│   └── server.ts         # Entry point
│
├── prisma/
│   └── schema.prisma     # Database schema
│
└── uploads/              # File storage
    ├── notes/
    ├── images/
    └── documents/
```

---

## 🔌 API Endpoints

### Аутентификация
- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Вход
- `GET /api/auth/me` — Текущий пользователь

### RFID Система
- `POST /api/rfid/cards` — Создать карту
- `GET /api/rfid/cards` — Все карты
- `POST /api/rfid/scan` — Обработать сканирование

### Турникеты
- `POST /api/turnstiles` — Создать турникет
- `GET /api/turnstiles` — Все турникеты
- `GET /api/turnstiles/:id/stats` — Статистика

### Оценки
- `POST /api/grades` — Создать оценку
- `GET /api/grades/student/:id` — Оценки студента

### Расписание
- `POST /api/schedule` — Создать расписание
- `GET /api/schedule/group/:id` — Расписание группы

[Полная документация →](../docs/backend/API.md)

---

## 🛠️ Технологии

### Backend
- **Node.js** 20.x — JavaScript runtime
- **Express.js** 4.18 — Web framework
- **TypeScript** 5.3 — Type safety
- **Prisma** 5.7 — ORM

### Database
- **PostgreSQL** 16 — Relational DB
- **Redis** 7 — Caching

### Real-time
- **Socket.IO** 4.6 — WebSockets

### File Upload
- **Multer** 1.4 — Multipart/form-data

### Email
- **Nodemailer** 6.9 — Email sending

### Security
- **JWT** — Authentication
- **Bcrypt** — Password hashing
- **Helmet** — Security headers
- **express-rate-limit** — Rate limiting

---

## 📊 База данных

### Модели (15+)

- **User** — Пользователи
- **Student** — Студенты
- **Teacher** — Преподаватели
- **Grade** — Оценки
- **Schedule** — Расписание
- **Attendance** — Посещаемость
- **RFIDCard** — RFID карты
- **Turnstile** — Турникеты
- **AccessLog** — Логи доступа
- **Note** — Конспекты
- **ChatRoom** — Чаты
- **Event** — События
- **GalleryImage** — Галерея

[Схема БД →](../docs/backend/DATABASE.md)

---

## 🔐 Безопасность

- **JWT** токены с истечением 7 дней
- **Bcrypt** хеширование паролей (10 rounds)
- **CORS** настроен для фронтенда
- **Helmet.js** для security headers
- **Rate limiting** 100 запросов / 15 минут
- **Input validation** на всех endpoints

---

## 🧪 Тестирование

```bash
# Run tests
npm run test

# Coverage
npm run test:coverage
```

---

## 📦 Команды

```bash
# Development
npm run dev                # Start dev server with hot reload

# Production
npm run build              # Build TypeScript
npm start                  # Start production server

# Database
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Run migrations
npx prisma migrate deploy  # Deploy migrations
npx prisma studio          # Open Prisma Studio (DB UI)
npm run seed               # Seed database

# Testing
npm run test               # Run tests
npm run test:watch         # Watch mode
```

---

## 🌐 RFID + Турникеты

### Как это работает:

1. **Студент прикладывает RFID карту** к считывателю турникета
2. **Турникет отправляет запрос** на `POST /api/rfid/scan`
3. **Backend проверяет карту:**
   - Активна ли карта?
   - Не истёк ли срок действия?
4. **При успехе:**
   - Открывает турникет (response: `GRANTED`)
   - Создаёт лог доступа
   - **Автоматически создаёт посещаемость** если вход
   - Отправляет WebSocket событие `rfid-scan-update`
5. **При отказе:**
   - Турникет не открывается (response: `DENIED`)
   - Создаёт лог с причиной отказа

### Пример запроса от турникета:

```bash
curl -X POST http://localhost:3000/api/rfid/scan \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "1234567890",
    "turnstileId": "turnstile-uuid",
    "direction": "IN"
  }'
```

---

## 📡 WebSocket Events

### Real-time уведомления:

```javascript
// RFID scan
socket.on('rfid-scan-update', (data) => {
  // Новое сканирование в реальном времени
});

// Turnstile status
socket.on('turnstile-status-update', (data) => {
  // Обновление статуса турникета
});

// Chat messages
socket.on('chat-message-received', (msg) => {
  // Новое сообщение в чате
});
```

[WebSocket документация →](../docs/backend/WEBSOCKETS.md)

---

## 🔄 Redis Caching

```typescript
import { cacheService } from './config/redis';

// Get from cache
const data = await cacheService.get('key');

// Set with TTL
await cacheService.set('key', JSON.stringify(data), 3600);

// Cache middleware
router.get('/endpoint', cacheMiddleware(300), handler);
```

---

## 📧 Email Notifications

```typescript
import { sendGradeNotification } from './config/email';

// Отправить уведомление о новой оценке
await sendGradeNotification(
  'student@lptt.ru',
  'Иван Иванов',
  'Математика',
  5
);
```

---

## 📝 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="secret-key"
JWT_EXPIRES_IN="7d"

# Redis
REDIS_URL="redis://localhost:6379"

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:5173"

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# RFID
RFID_API_URL="http://rfid-controller.local"
RFID_API_KEY="api-key"

# Turnstile
TURNSTILE_WEBSOCKET_PORT=3001
TURNSTILE_SECRET="secret"
```

---

## 🐳 Docker (Planned)

```bash
docker-compose up -d
```

---

## 📈 Roadmap

- [x] Authentication (JWT)
- [x] RFID System
- [x] Turnstiles
- [x] Access Logs
- [x] Grades
- [x] Schedule
- [x] WebSocket
- [x] File Upload
- [x] Email
- [x] Redis Caching
- [ ] Notes
- [ ] Chat
- [ ] Events
- [ ] Gallery
- [ ] Tests
- [ ] Docker
- [ ] CI/CD

---

## 🤝 Contributing

См. [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 📄 License

MIT

---

**Created with 🔥 for ЛПТТ**
