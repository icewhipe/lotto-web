# 🗄️ Database Schema

Схема базы данных PostgreSQL с Prisma ORM.

---

## 📊 Entity Relationship Diagram

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│   User   │──────<│  Grade   │>──────│ Subject  │
└──────────┘       └──────────┘       └──────────┘
     │                                       │
     │                                       │
     │             ┌──────────┐              │
     └────────────<│ Schedule │>─────────────┘
                   └──────────┘
                   
┌──────────┐       ┌──────────┐       ┌──────────┐
│   Note   │       │ Message  │       │  Event   │
└──────────┘       └──────────┘       └──────────┘
     │                   │                   │
     └───────────────────┴───────────────────┘
                         │
                   ┌──────────┐
                   │   User   │
                   └──────────┘
```

---

## 📋 Models (15 моделей)

### 1. User

Пользователи системы.

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  role          UserRole
  group         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  grades        Grade[]
  notes         Note[]
  messages      Message[]
  teacherSchedules Schedule[] @relation("TeacherSchedules")
}
```

**Fields:**
- `id` — UUID primary key
- `email` — Уникальный email
- `password` — Bcrypt hash
- `role` — Enum (STUDENT, TEACHER, ADMIN, DIRECTOR)
- `group` — Группа (для студентов)

---

### 2. Grade

Оценки студентов.

```prisma
model Grade {
  id          String    @id @default(uuid())
  value       Int
  subject     String
  studentId   String
  teacherId   String
  date        DateTime  @default(now())
  comment     String?
  
  student     User      @relation(fields: [studentId], references: [id])
  
  @@index([studentId])
  @@index([date])
}
```

**Constraints:**
- `value` — 2-5 (двойка-пятёрка)
- `studentId` — Foreign key к User
- Индексы для быстрого поиска

---

### 3. Schedule

Расписание занятий.

```prisma
model Schedule {
  id          String      @id @default(uuid())
  dayOfWeek   Int
  time        String
  subject     String
  teacher     User        @relation("TeacherSchedules", fields: [teacherId], references: [id])
  teacherId   String
  room        String
  type        LessonType
  group       String
  
  @@index([dayOfWeek])
  @@index([group])
}
```

**LessonType enum:**
```prisma
enum LessonType {
  LECTURE
  PRACTICE
  LAB
  SEMINAR
}
```

---

### 4. Note

Конспекты студентов.

```prisma
model Note {
  id          String    @id @default(uuid())
  title       String
  description String    @db.Text
  subject     String
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  date        DateTime  @default(now())
  rating      Float     @default(0)
  downloads   Int       @default(0)
  size        String
  fileUrl     String
  
  @@index([authorId])
  @@index([subject])
  @@index([date])
}
```

---

### 5. Message

Сообщения в чатах.

```prisma
model Message {
  id          String    @id @default(uuid())
  content     String    @db.Text
  sender      User      @relation(fields: [senderId], references: [id])
  senderId    String
  chatId      String
  createdAt   DateTime  @default(now())
  isRead      Boolean   @default(false)
  
  @@index([chatId])
  @@index([senderId])
  @@index([createdAt])
}
```

---

### 6. Event

События и мероприятия.

```prisma
model Event {
  id          String    @id @default(uuid())
  title       String
  description String    @db.Text
  date        DateTime
  location    String
  imageUrl    String?
  category    String
  createdAt   DateTime  @default(now())
  
  @@index([date])
  @@index([category])
}
```

---

## 🔗 Связи

### One-to-Many

```
User (1) ──< Grade (Many)
User (1) ──< Note (Many)
User (1) ──< Message (Many)
```

### Many-to-Many (через промежуточную таблицу)

```
Subject (Many) ──< Grade >── Student (Many)
```

---

## 🔍 Индексы

Для оптимизации запросов:

```prisma
@@index([studentId])  // Оценки студента
@@index([date])       // По дате
@@index([subject])    // По предмету
@@index([group])      // По группе
```

---

## 🛠️ Migrations

### Создать миграцию

```bash
npx prisma migrate dev --name add_feature
```

### Применить миграции

```bash
npx prisma migrate deploy
```

### Сбросить БД

```bash
npx prisma migrate reset
```

---

## 🔧 Prisma Studio

Визуальный редактор БД.

```bash
npx prisma studio
```

Откроется: http://localhost:5555

---

## 📝 Запросы (примеры)

### Получить оценки студента

```typescript
const grades = await prisma.grade.findMany({
  where: { studentId: userId },
  orderBy: { date: 'desc' },
  include: { student: true }
});
```

### Расписание на день

```typescript
const schedule = await prisma.schedule.findMany({
  where: {
    dayOfWeek: 1, // Понедельник
    group: "ИС-21"
  },
  include: { teacher: true }
});
```

### Поиск конспектов

```typescript
const notes = await prisma.note.findMany({
  where: {
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { subject: { contains: query, mode: 'insensitive' } }
    ]
  },
  include: { author: true }
});
```

---

## 📚 Полная схема

См. файл [`backend/prisma/schema.prisma`](../../../backend/prisma/schema.prisma)

---

[← Назад](../README.md) | [API Reference →](./API.md)
