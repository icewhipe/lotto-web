# 🔌 API Reference

Полная документация REST API для ЛПТТ Электронный Дневник.

---

## 📋 Содержание

- [Базовая информация](#базовая-информация)
- [Аутентификация](#аутентификация)
- [RFID Карты](#rfid-карты)
- [Турникеты](#турникеты)
- [Оценки](#оценки)
- [Расписание](#расписание)
- [Конспекты](#конспекты)
- [События](#события)
- [Галерея](#галерея)
- [Ошибки](#ошибки)

---

## 📡 Базовая информация

### Base URL

```
Production:  https://api.lptt.ru/api
Development: http://localhost:3000/api
```

### Headers

```http
Content-Type: application/json
Authorization: Bearer <token>
```

### Response Format

```json
{
  "success": true | false,
  "message": "Success message",
  "data": { ... }
}
```

---

## 🔐 Аутентификация

### Регистрация

```http
POST /auth/register
```

**Body:**
```json
{
  "email": "student@lptt.ru",
  "password": "password123",
  "name": "Иван Иванов",
  "role": "STUDENT"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@lptt.ru",
      "name": "Иван Иванов",
      "role": "STUDENT"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Вход

```http
POST /auth/login
```

**Body:**
```json
{
  "email": "student@lptt.ru",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@lptt.ru",
      "name": "Иван Иванов",
      "role": "STUDENT"
    },
    "profile": {
      "studentNumber": "2024001",
      "group": {
        "name": "ИС-21",
        "specialty": {
          "name": "Информационные системы"
        }
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Получить текущего пользователя

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@lptt.ru",
      "name": "Иван Иванов",
      "role": "STUDENT"
    },
    "profile": { ... }
  }
}
```

---

### Обновить профиль

```http
PUT /auth/profile
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Иван Петрович Иванов"
}
```

---

### Изменить пароль

```http
POST /auth/change-password
Authorization: Bearer <token>
```

**Body:**
```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

---

## 💳 RFID Карты

### Создать RFID карту

```http
POST /rfid/cards
Authorization: Bearer <token>
Access: Admin
```

**Body:**
```json
{
  "cardNumber": "1234567890",
  "userId": "user-uuid",
  "isActive": true,
  "expiryDate": "2025-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "RFID card created successfully",
  "data": {
    "id": "uuid",
    "cardNumber": "1234567890",
    "userId": "user-uuid",
    "isActive": true,
    "issuedDate": "2025-01-01T00:00:00Z",
    "expiryDate": "2025-12-31T23:59:59Z",
    "user": {
      "id": "uuid",
      "name": "Иван Иванов",
      "email": "student@lptt.ru",
      "role": "STUDENT"
    }
  }
}
```

---

### Получить все RFID карты

```http
GET /rfid/cards?page=1&limit=20&isActive=true
Authorization: Bearer <token>
Access: Admin
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "uuid",
        "cardNumber": "1234567890",
        "isActive": true,
        "user": { ... }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

---

### Получить RFID карту по ID

```http
GET /rfid/cards/:id
Authorization: Bearer <token>
Access: Admin
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "cardNumber": "1234567890",
    "user": { ... },
    "accessLogs": [
      {
        "id": "log-uuid",
        "timestamp": "2025-01-15T08:30:00Z",
        "direction": "IN",
        "status": "GRANTED",
        "turnstile": {
          "name": "Главный вход"
        }
      }
    ]
  }
}
```

---

### Обновить RFID карту

```http
PUT /rfid/cards/:id
Authorization: Bearer <token>
Access: Admin
```

**Body:**
```json
{
  "isActive": false
}
```

---

### Удалить RFID карту

```http
DELETE /rfid/cards/:id
Authorization: Bearer <token>
Access: Admin
```

---

### Обработать сканирование

```http
POST /rfid/scan
Authorization: Bearer <token>
Access: System
```

**Body:**
```json
{
  "cardNumber": "1234567890",
  "turnstileId": "turnstile-uuid",
  "direction": "IN"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Access granted",
  "status": "GRANTED",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Иван Иванов",
      "role": "STUDENT"
    },
    "accessLog": {
      "id": "log-uuid",
      "timestamp": "2025-01-15T08:30:00Z",
      "direction": "IN",
      "status": "GRANTED"
    }
  }
}
```

**Response (Denied):**
```json
{
  "success": false,
  "message": "Card is inactive",
  "status": "DENIED"
}
```

---

## 🚪 Турникеты

### Создать турникет

```http
POST /turnstiles
Authorization: Bearer <token>
Access: Admin
```

**Body:**
```json
{
  "name": "Главный вход",
  "location": "Корпус А, 1 этаж",
  "deviceId": "TURNSTILE-001",
  "ipAddress": "192.168.1.100",
  "direction": "BOTH"
}
```

---

### Получить все турникеты

```http
GET /turnstiles?isActive=true
Authorization: Bearer <token>
Access: Admin
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Главный вход",
      "location": "Корпус А, 1 этаж",
      "deviceId": "TURNSTILE-001",
      "isActive": true,
      "direction": "BOTH",
      "stats": {
        "todayAccess": 245,
        "lastActivity": "2025-01-15T14:30:00Z"
      }
    }
  ]
}
```

---

### Получить турникет по ID

```http
GET /turnstiles/:id
Authorization: Bearer <token>
Access: Admin
```

---

### Получить логи турникета

```http
GET /turnstiles/:id/logs?page=1&limit=50&startDate=2025-01-01&status=GRANTED
Authorization: Bearer <token>
Access: Admin
```

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "timestamp": "2025-01-15T08:30:00Z",
        "direction": "IN",
        "status": "GRANTED",
        "rfidCard": {
          "cardNumber": "1234567890",
          "user": {
            "name": "Иван Иванов"
          }
        }
      }
    ],
    "pagination": { ... }
  }
}
```

---

### Получить статистику турникета

```http
GET /turnstiles/:id/stats?period=7d
Authorization: Bearer <token>
Access: Admin
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 1245,
    "granted": 1200,
    "denied": 40,
    "error": 5,
    "in": 620,
    "out": 625
  }
}
```

---

## 📊 Оценки

### Создать оценку

```http
POST /grades
Authorization: Bearer <token>
Access: Teacher, Admin
```

**Body:**
```json
{
  "studentId": "student-uuid",
  "subjectId": "subject-uuid",
  "teacherId": "teacher-uuid",
  "value": 5,
  "type": "EXAM",
  "comment": "Отлично!"
}
```

**Types:** `EXAM`, `TEST`, `HOMEWORK`, `CLASSWORK`, `QUIZ`, `PROJECT`

---

### Получить оценки студента

```http
GET /grades/student/:studentId?subjectId=xxx&type=EXAM&startDate=2025-01-01
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "grades": [
      {
        "id": "uuid",
        "value": 5,
        "type": "EXAM",
        "date": "2025-01-15T00:00:00Z",
        "comment": "Отлично!",
        "subject": {
          "name": "Математика",
          "code": "MATH-101"
        },
        "teacher": {
          "user": {
            "name": "Петрова А.И."
          }
        }
      }
    ],
    "stats": {
      "total": 25,
      "average": 4.52
    }
  }
}
```

---

### Обновить оценку

```http
PUT /grades/:id
Authorization: Bearer <token>
Access: Teacher, Admin
```

**Body:**
```json
{
  "value": 4,
  "comment": "Исправлено"
}
```

---

### Удалить оценку

```http
DELETE /grades/:id
Authorization: Bearer <token>
Access: Admin
```

---

## 📅 Расписание

### Создать расписание

```http
POST /schedule
Authorization: Bearer <token>
Access: Admin
```

**Body:**
```json
{
  "groupId": "group-uuid",
  "subjectId": "subject-uuid",
  "teacherId": "teacher-uuid",
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "10:30",
  "room": "А-205",
  "type": "LECTURE"
}
```

**dayOfWeek:** `1` (Пн) - `6` (Сб)  
**Types:** `LECTURE`, `PRACTICE`, `LAB`, `SEMINAR`

---

### Получить расписание группы

```http
GET /schedule/group/:groupId?dayOfWeek=1
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "id": "uuid",
        "dayOfWeek": 1,
        "startTime": "09:00",
        "endTime": "10:30",
        "room": "А-205",
        "type": "LECTURE",
        "subject": {
          "name": "Математика"
        },
        "teacher": {
          "user": {
            "name": "Петрова А.И."
          }
        }
      }
    ],
    "byDay": {
      "1": [ ... ],
      "2": [ ... ]
    }
  }
}
```

---

### Получить расписание преподавателя

```http
GET /schedule/teacher/:teacherId
Authorization: Bearer <token>
```

---

## 📝 Конспекты

(В разработке)

---

## 📰 События

(В разработке)

---

## 🖼️ Галерея

(В разработке)

---

## ❌ Ошибки

### Коды ошибок

| Код | Описание |
|-----|----------|
| `400` | Bad Request — Неверные данные |
| `401` | Unauthorized — Требуется авторизация |
| `403` | Forbidden — Недостаточно прав |
| `404` | Not Found — Ресурс не найден |
| `500` | Internal Server Error — Ошибка сервера |

### Формат ошибки

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 📚 Примеры использования

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@lptt.ru","password":"123456"}'

# Get grades
curl -X GET http://localhost:3000/api/grades/student/student-uuid \
  -H "Authorization: Bearer <token>"
```

### JavaScript (Fetch)

```javascript
// Login
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'student@lptt.ru',
    password: '123456',
  }),
});

const data = await response.json();
const token = data.data.token;

// Get grades
const gradesResponse = await fetch(
  'http://localhost:3000/api/grades/student/student-uuid',
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
);

const grades = await gradesResponse.json();
```

---

## 🔄 Rate Limiting

- **Лимит:** 100 запросов / 15 минут
- **Header:** `X-RateLimit-Remaining`

---

## 🔐 Безопасность

- JWT токены с истечением через 7 дней
- Bcrypt для хеширования паролей (10 раундов)
- CORS настроен только для домена приложения
- Helmet.js для security headers
- Rate limiting для защиты от DDoS

---

[← Назад](../README.md) | [Database Schema](./DATABASE.md) | [WebSockets →](./WEBSOCKETS.md)
