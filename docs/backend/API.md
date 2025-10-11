# 🔌 API Reference

Полная документация Backend API для ЛПТТ Электронный Дневник.

---

## 📋 Содержание

- [Authentication](#-authentication)
- [RFID Cards](#-rfid-cards)
- [Turnstiles](#-turnstiles)
- [Grades](#-grades)
- [Schedule](#-schedule)
- [Notes](#-notes)
- [Events](#-events)
- [Gallery](#-gallery)
- [WebSocket](#-websocket)

---

## 🔐 Authentication

Base URL: `/api/auth`

### POST /api/auth/register

Регистрация нового пользователя.

**Request:**
```json
{
  "email": "student@lptt.ru",
  "password": "securePassword123",
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
      "role": "STUDENT",
      "createdAt": "2025-10-11T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `400` - User already exists
- `500` - Internal server error

---

### POST /api/auth/login

Вход в систему.

**Request:**
```json
{
  "email": "student@lptt.ru",
  "password": "securePassword123"
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
      "id": "uuid",
      "userId": "uuid",
      "groupId": "uuid",
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

**Errors:**
- `401` - Invalid credentials
- `403` - Account is inactive
- `500` - Internal server error

---

### GET /api/auth/me

Получить данные текущего пользователя.

**Headers:**
```
Authorization: Bearer {token}
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
      "role": "STUDENT",
      "isActive": true,
      "createdAt": "2025-10-11T...",
      "updatedAt": "2025-10-11T..."
    },
    "profile": {
      // Role-specific profile data
    }
  }
}
```

---

### PUT /api/auth/profile

Обновить профиль.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "name": "Иван Петров"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@lptt.ru",
      "name": "Иван Петров",
      "role": "STUDENT",
      "updatedAt": "2025-10-11T..."
    }
  }
}
```

---

### POST /api/auth/change-password

Изменить пароль.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Errors:**
- `401` - Current password is incorrect
- `404` - User not found

---

## 📇 RFID Cards

Base URL: `/api/rfid`

### POST /api/rfid/cards

Создать RFID карту.

**Access:** Admin

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "cardNumber": "1234567890ABCDEF",
  "userId": "uuid",
  "isActive": true,
  "expiryDate": "2026-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "RFID card created successfully",
  "data": {
    "id": "uuid",
    "cardNumber": "1234567890ABCDEF",
    "userId": "uuid",
    "isActive": true,
    "issuedDate": "2025-10-11T...",
    "expiryDate": "2026-12-31T...",
    "user": {
      "id": "uuid",
      "name": "Иван Иванов",
      "email": "student@lptt.ru",
      "role": "STUDENT"
    },
    "createdAt": "2025-10-11T...",
    "updatedAt": "2025-10-11T..."
  }
}
```

---

### GET /api/rfid/cards

Получить все RFID карты.

**Access:** Admin

**Query Parameters:**
- `page` (number, default: 1) - Номер страницы
- `limit` (number, default: 20) - Кол-во на странице
- `isActive` (boolean) - Фильтр по активности

**Example:**
```
GET /api/rfid/cards?page=1&limit=20&isActive=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "uuid",
        "cardNumber": "1234567890ABCDEF",
        "userId": "uuid",
        "isActive": true,
        "user": {
          "id": "uuid",
          "name": "Иван Иванов",
          "email": "student@lptt.ru",
          "role": "STUDENT"
        },
        "createdAt": "2025-10-11T..."
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

### GET /api/rfid/cards/:id

Получить RFID карту по ID.

**Access:** Admin

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "cardNumber": "1234567890ABCDEF",
    "userId": "uuid",
    "isActive": true,
    "user": {
      "id": "uuid",
      "name": "Иван Иванов",
      "email": "student@lptt.ru",
      "role": "STUDENT"
    },
    "accessLogs": [
      {
        "id": "uuid",
        "timestamp": "2025-10-11T09:15:00Z",
        "direction": "IN",
        "status": "GRANTED",
        "turnstile": {
          "name": "Главный вход",
          "location": "Корпус 1"
        }
      }
    ],
    "createdAt": "2025-10-11T...",
    "updatedAt": "2025-10-11T..."
  }
}
```

---

### PUT /api/rfid/cards/:id

Обновить RFID карту.

**Access:** Admin

**Request:**
```json
{
  "isActive": false,
  "expiryDate": "2025-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "RFID card updated successfully",
  "data": {
    // Updated card data
  }
}
```

---

### DELETE /api/rfid/cards/:id

Удалить RFID карту.

**Access:** Admin

**Response:**
```json
{
  "success": true,
  "message": "RFID card deleted successfully"
}
```

---

### POST /api/rfid/scan

Обработать сканирование RFID карты (от турникета).

**Access:** System

**Request:**
```json
{
  "cardNumber": "1234567890ABCDEF",
  "turnstileId": "uuid",
  "direction": "IN"
}
```

**Response (SUCCESS):**
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
      "id": "uuid",
      "timestamp": "2025-10-11T09:15:00Z",
      "direction": "IN",
      "status": "GRANTED"
    }
  }
}
```

**Response (DENIED):**
```json
{
  "success": false,
  "message": "Card is inactive",
  "status": "DENIED"
}
```

**Errors:**
- `404` - RFID card not found
- `403` - Access denied (inactive or expired)
- `500` - Internal server error

**Notes:**
- При успешном входе (direction: IN) автоматически создаётся запись посещаемости для студентов
- Все сканирования логируются в AccessLog

---

## 🚪 Turnstiles

Base URL: `/api/turnstiles`

### POST /api/turnstiles

Создать турникет.

**Access:** Admin

**Request:**
```json
{
  "name": "Главный вход",
  "location": "Корпус 1",
  "deviceId": "TURN-001",
  "ipAddress": "192.168.1.100",
  "direction": "BOTH"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Turnstile created successfully",
  "data": {
    "id": "uuid",
    "name": "Главный вход",
    "location": "Корпус 1",
    "deviceId": "TURN-001",
    "ipAddress": "192.168.1.100",
    "isActive": true,
    "direction": "BOTH",
    "createdAt": "2025-10-11T...",
    "updatedAt": "2025-10-11T..."
  }
}
```

---

### GET /api/turnstiles

Получить все турникеты.

**Access:** Admin

**Query Parameters:**
- `isActive` (boolean) - Фильтр по активности

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Главный вход",
      "location": "Корпус 1",
      "deviceId": "TURN-001",
      "ipAddress": "192.168.1.100",
      "isActive": true,
      "direction": "BOTH",
      "stats": {
        "todayAccess": 245,
        "lastActivity": "2025-10-11T14:30:00Z"
      },
      "createdAt": "2025-10-11T...",
      "updatedAt": "2025-10-11T..."
    }
  ]
}
```

---

### GET /api/turnstiles/:id

Получить турникет по ID.

**Access:** Admin

**Response:**
```json
{
  "success": true,
  "data": {
    "turnstile": {
      "id": "uuid",
      "name": "Главный вход",
      "location": "Корпус 1",
      "deviceId": "TURN-001",
      "isActive": true,
      "direction": "BOTH"
    },
    "recentLogs": [
      {
        "id": "uuid",
        "timestamp": "2025-10-11T14:30:00Z",
        "direction": "IN",
        "status": "GRANTED",
        "rfidCard": {
          "cardNumber": "1234567890ABCDEF",
          "user": {
            "name": "Иван Иванов",
            "role": "STUDENT"
          }
        }
      }
    ]
  }
}
```

---

### PUT /api/turnstiles/:id

Обновить турникет.

**Access:** Admin

**Request:**
```json
{
  "name": "Главный вход (обновлённый)",
  "location": "Корпус 1, этаж 1",
  "ipAddress": "192.168.1.101",
  "isActive": true,
  "direction": "ENTRY"
}
```

---

### DELETE /api/turnstiles/:id

Удалить турникет.

**Access:** Admin

---

### GET /api/turnstiles/:id/logs

Получить логи турникета.

**Access:** Admin

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 50)
- `startDate` (ISO string) - Начало периода
- `endDate` (ISO string) - Конец периода
- `status` (GRANTED | DENIED | ERROR) - Фильтр по статусу

**Example:**
```
GET /api/turnstiles/uuid/logs?page=1&limit=50&status=GRANTED&startDate=2025-10-01
```

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "timestamp": "2025-10-11T14:30:00Z",
        "direction": "IN",
        "status": "GRANTED",
        "reason": null,
        "rfidCard": {
          "cardNumber": "1234567890ABCDEF",
          "user": {
            "id": "uuid",
            "name": "Иван Иванов",
            "role": "STUDENT"
          }
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1245,
      "pages": 25
    }
  }
}
```

---

### GET /api/turnstiles/:id/stats

Получить статистику турникета.

**Access:** Admin

**Query Parameters:**
- `period` (1d | 7d | 30d, default: 7d) - Период

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 1750,
    "granted": 1720,
    "denied": 25,
    "error": 5,
    "in": 875,
    "out": 875
  }
}
```

---

## 📊 Grades

Base URL: `/api/grades`

### POST /api/grades

Создать оценку.

**Access:** Teacher, Admin

**Request:**
```json
{
  "studentId": "uuid",
  "subjectId": "uuid",
  "teacherId": "uuid",
  "value": 5,
  "type": "EXAM",
  "comment": "Отлично!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Grade created successfully",
  "data": {
    "id": "uuid",
    "studentId": "uuid",
    "subjectId": "uuid",
    "teacherId": "uuid",
    "value": 5,
    "type": "EXAM",
    "comment": "Отлично!",
    "date": "2025-10-11T...",
    "student": {
      "user": {
        "name": "Иван Иванов"
      }
    },
    "subject": {
      "name": "Математика"
    },
    "teacher": {
      "user": {
        "name": "Петр Петров"
      }
    }
  }
}
```

**Grade Types:**
- `EXAM` - Экзамен
- `TEST` - Тест
- `HOMEWORK` - Домашняя работа
- `CLASSWORK` - Классная работа
- `QUIZ` - Контрольная
- `PROJECT` - Проект

---

### GET /api/grades/student/:studentId

Получить оценки студента.

**Access:** Student (own), Teacher, Admin

**Query Parameters:**
- `subjectId` (uuid) - Фильтр по предмету
- `type` (GradeType) - Фильтр по типу
- `startDate` (ISO string) - Начало периода
- `endDate` (ISO string) - Конец периода

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
        "comment": "Отлично!",
        "date": "2025-10-11T...",
        "subject": {
          "name": "Математика"
        },
        "teacher": {
          "user": {
            "name": "Петр Петров"
          }
        }
      }
    ],
    "stats": {
      "total": 45,
      "average": 4.53
    }
  }
}
```

---

### GET /api/grades/:id

Получить оценку по ID.

---

### PUT /api/grades/:id

Обновить оценку.

**Access:** Teacher (own), Admin

---

### DELETE /api/grades/:id

Удалить оценку.

**Access:** Admin

---

## 📅 Schedule

Base URL: `/api/schedule`

### POST /api/schedule

Создать расписание.

**Access:** Admin

**Request:**
```json
{
  "groupId": "uuid",
  "subjectId": "uuid",
  "teacherId": "uuid",
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "10:30",
  "room": "301",
  "type": "LECTURE"
}
```

**Day of Week:**
- `1` - Понедельник
- `2` - Вторник
- `3` - Среда
- `4` - Четверг
- `5` - Пятница
- `6` - Суббота

**Lesson Types:**
- `LECTURE` - Лекция
- `PRACTICE` - Практика
- `LAB` - Лабораторная
- `SEMINAR` - Семинар

**Response:**
```json
{
  "success": true,
  "message": "Schedule created successfully",
  "data": {
    "id": "uuid",
    "groupId": "uuid",
    "subjectId": "uuid",
    "teacherId": "uuid",
    "dayOfWeek": 1,
    "startTime": "09:00",
    "endTime": "10:30",
    "room": "301",
    "type": "LECTURE",
    "group": {
      "name": "ИС-21"
    },
    "subject": {
      "name": "Математика"
    },
    "teacher": {
      "user": {
        "name": "Петр Петров"
      }
    }
  }
}
```

---

### GET /api/schedule/group/:groupId

Получить расписание группы.

**Access:** Authenticated

**Query Parameters:**
- `dayOfWeek` (number) - Фильтр по дню недели

**Example:**
```
GET /api/schedule/group/uuid?dayOfWeek=1
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
        "room": "301",
        "type": "LECTURE",
        "subject": {
          "name": "Математика"
        },
        "teacher": {
          "user": {
            "name": "Петр Петров"
          }
        }
      }
    ],
    "byDay": {
      "1": [/* Monday lessons */],
      "2": [/* Tuesday lessons */],
      // ...
    }
  }
}
```

---

### GET /api/schedule/teacher/:teacherId

Получить расписание преподавателя.

**Access:** Authenticated

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "dayOfWeek": 1,
      "startTime": "09:00",
      "endTime": "10:30",
      "room": "301",
      "type": "LECTURE",
      "group": {
        "name": "ИС-21"
      },
      "subject": {
        "name": "Математика"
      }
    }
  ]
}
```

---

### PUT /api/schedule/:id

Обновить расписание.

**Access:** Admin

---

### DELETE /api/schedule/:id

Удалить расписание.

**Access:** Admin

---

## 📝 Notes

Base URL: `/api/notes`

*(Coming soon - см. [Roadmap](../../README.md#roadmap))*

---

## 🎉 Events

Base URL: `/api/events`

*(Coming soon)*

---

## 🖼️ Gallery

Base URL: `/api/gallery`

*(Coming soon)*

---

## 🔌 WebSocket

Connection URL: `ws://localhost:3001`

### Events

**Client → Server:**

```typescript
// Подключение к комнате турникета
socket.emit('subscribe', { type: 'turnstile', id: 'turnstile-uuid' });

// Отключение от комнаты
socket.emit('unsubscribe', { type: 'turnstile', id: 'turnstile-uuid' });
```

**Server → Client:**

```typescript
// Событие сканирования RFID
socket.on('rfid-scan', (data) => {
  console.log(data);
  // {
  //   type: 'access',
  //   data: {
  //     turnstileId: 'uuid',
  //     userId: 'uuid',
  //     userName: 'Иван Иванов',
  //     cardNumber: '1234567890ABCDEF',
  //     status: 'GRANTED',
  //     timestamp: '2025-10-11T...'
  //   }
  // }
});

// Обновление статуса турникета
socket.on('turnstile-status', (data) => {
  // {
  //   type: 'status',
  //   data: {
  //     turnstileId: 'uuid',
  //     isActive: true,
  //     message: 'Online'
  //   }
  // }
});

// Ошибка турникета
socket.on('turnstile-error', (data) => {
  // {
  //   type: 'error',
  //   data: {
  //     turnstileId: 'uuid',
  //     error: 'Connection lost',
  //     timestamp: '2025-10-11T...'
  //   }
  // }
});
```

---

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🔒 Authentication

Все защищённые endpoints требуют JWT токен в header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Roles

- `STUDENT` - Студент
- `TEACHER` - Преподаватель
- `PARENT` - Родитель
- `APPLICANT` - Абитуриент
- `ADMIN` - Администратор

---

## 📄 Pagination

Endpoints с пагинацией возвращают:

```json
{
  "success": true,
  "data": {
    "items": [...],
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

## 🚨 Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## 📚 См. также

- [Database Schema](./DATABASE.md)
- [Authentication Guide](./AUTH.md)
- [WebSocket Guide](./WEBSOCKETS.md)

---

[← Назад](../README.md)
