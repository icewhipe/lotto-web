# ⚡ БЫСТРЫЙ СТАРТ BACKEND - ПЕРВЫЕ ШАГИ

**Цель:** Запустить backend и подключить frontend за 30 минут!

---

## 🚀 ШАГ 1: Установка PostgreSQL (5 минут)

### Windows:
```bash
# Скачай и установи:
https://www.postgresql.org/download/windows/

# Или через Chocolatey:
choco install postgresql

# После установки открой pgAdmin
# Создай базу данных: lptt_db
```

### Linux:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql

# В psql:
CREATE DATABASE lptt_db;
CREATE USER lptt_user WITH PASSWORD 'lptt_password';
GRANT ALL PRIVILEGES ON DATABASE lptt_db TO lptt_user;
\q
```

### macOS:
```bash
brew install postgresql
brew services start postgresql
createdb lptt_db
```

---

## 🔧 ШАГ 2: Настройка Backend (5 минут)

```bash
# Перейди в папку backend
cd backend

# Установи зависимости
npm install

# Создай .env файл
touch .env
```

**Открой `.env` и добавь:**
```env
# Database
DATABASE_URL="postgresql://lptt_user:lptt_password@localhost:5432/lptt_db"

# JWT
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV=development

# Email (опционально, для регистрации)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Redis (опционально)
REDIS_URL=redis://localhost:6379
```

---

## 💾 ШАГ 3: Миграции и Seed (5 минут)

```bash
# Примени миграции (создаст таблицы)
npx prisma migrate dev --name init

# Сгенерируй Prisma Client
npx prisma generate

# Загрузи тестовые данные (если есть seed скрипт)
npm run seed
# ИЛИ вручную:
npx ts-node src/utils/seedDatabase.ts
```

**Если seed скрипта нет - создай простой:**

Создай файл `backend/src/utils/quickSeed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Создаём специальности
  const specialty = await prisma.specialty.create({
    data: {
      name: 'Программирование в компьютерных системах',
      code: 'ПКС',
      duration: '3 года 10 месяцев',
      description: 'Подготовка программистов'
    }
  })

  // Создаём группу
  const group = await prisma.group.create({
    data: {
      name: 'ПТ-21',
      year: 2021,
      specialtyId: specialty.id
    }
  })

  // Создаём админа
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@lptt.ru',
      password: adminPassword,
      name: 'Администратор',
      role: 'ADMIN'
    }
  })

  // Создаём студента
  const studentPassword = await bcrypt.hash('student123', 10)
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@lptt.ru',
      password: studentPassword,
      name: 'Иван Иванов',
      role: 'STUDENT',
      student: {
        create: {
          groupId: group.id,
          studentNumber: 'ST-2021-001',
          enrollmentDate: new Date('2021-09-01')
        }
      }
    },
    include: { student: true }
  })

  // Создаём преподавателя
  const teacherPassword = await bcrypt.hash('teacher123', 10)
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@lptt.ru',
      password: teacherPassword,
      name: 'Мария Петровна',
      role: 'TEACHER',
      teacher: {
        create: {
          position: 'Преподаватель информатики',
          department: 'Кафедра ИТ'
        }
      }
    },
    include: { teacher: true }
  })

  // Создаём предмет
  const subject = await prisma.subject.create({
    data: {
      name: 'Основы программирования',
      code: 'ОП-101',
      specialtyId: specialty.id,
      teacherId: teacherUser.teacher!.id
    }
  })

  // Создаём расписание
  await prisma.schedule.createMany({
    data: [
      {
        groupId: group.id,
        subjectId: subject.id,
        teacherId: teacherUser.teacher!.id,
        dayOfWeek: 1, // Понедельник
        startTime: '09:00',
        endTime: '10:30',
        room: '205',
        type: 'LECTURE'
      },
      {
        groupId: group.id,
        subjectId: subject.id,
        teacherId: teacherUser.teacher!.id,
        dayOfWeek: 1,
        startTime: '10:45',
        endTime: '12:15',
        room: '305',
        type: 'PRACTICE'
      }
    ]
  })

  // Создаём оценки
  await prisma.grade.createMany({
    data: [
      {
        studentId: studentUser.student!.id,
        subjectId: subject.id,
        teacherId: teacherUser.teacher!.id,
        value: 5,
        type: 'EXAM',
        date: new Date('2024-01-15')
      },
      {
        studentId: studentUser.student!.id,
        subjectId: subject.id,
        teacherId: teacherUser.teacher!.id,
        value: 4,
        type: 'TEST',
        date: new Date('2024-01-20')
      },
      {
        studentId: studentUser.student!.id,
        subjectId: subject.id,
        teacherId: teacherUser.teacher!.id,
        value: 5,
        type: 'HOMEWORK',
        date: new Date('2024-01-25')
      }
    ]
  })

  console.log('✅ Seeding completed!')
  console.log('📧 Тестовые пользователи:')
  console.log('   Админ: admin@lptt.ru / admin123')
  console.log('   Студент: student@lptt.ru / student123')
  console.log('   Преподаватель: teacher@lptt.ru / teacher123')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Запусти:**
```bash
npx ts-node src/utils/quickSeed.ts
```

---

## 🚀 ШАГ 4: Запуск Backend (1 минута)

```bash
# В папке backend/
npm run dev

# Должно вывести:
# ✅ Server running on port 3001
# ✅ Database connected
```

**Проверь в браузере:**
```
http://localhost:3001/api/health
```

Должно вернуть: `{"status":"ok"}`

---

## 🎨 ШАГ 5: Подключение Frontend (5 минут)

```bash
# В корне проекта (НЕ в backend!)
cd ..

# Создай .env файл
touch .env.local
```

**Добавь в `.env.local`:**
```env
VITE_API_URL=http://localhost:3001/api
```

**Обнови `src/services/api.ts`:**

```typescript
import axios from 'axios'

// Читаем URL из .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

console.log('🔗 API URL:', API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Добавляем токен к каждому запросу
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  }
}

export const gradesAPI = {
  getStudentGrades: async (studentId: string) => {
    const response = await api.get(`/grades/student/${studentId}`)
    return response.data
  }
}

export const scheduleAPI = {
  getGroupSchedule: async (groupId: string, day?: number) => {
    const url = day !== undefined 
      ? `/schedule/group/${groupId}/day/${day}`
      : `/schedule/group/${groupId}`
    const response = await api.get(url)
    return response.data
  }
}

export default api
```

---

## 🧪 ШАГ 6: ТЕСТ! (5 минут)

```bash
# Запусти frontend (в корне проекта)
npm run dev
```

**Открой:** `http://localhost:5173`

**Тест 1: Логин**
1. Нажми "Войти"
2. Введи: `student@lptt.ru` / `student123`
3. Нажми "Войти"
4. ✅ Должно перекинуть в дашборд!

**Тест 2: Консоль**
Открой консоль (F12) и посмотри логи:
```
🔗 API URL: http://localhost:3001/api
✅ Login successful
✅ User loaded from API
```

**Тест 3: Оценки**
1. Нажми "Оценки" в меню
2. ✅ Должны загрузиться реальные оценки из БД!

**Тест 4: Расписание**
1. Нажми "Расписание"
2. Выбери "Понедельник"
3. ✅ Должны показаться занятия!

---

## ✅ ГОТОВО!

Если всё работает - backend подключен! 🎉

**Что делать дальше:**
1. Открой `ПЛАН_BACKEND_ИНТЕГРАЦИИ.md`
2. Начни с ЭТАПА 2 - подключение остальных разделов

---

## 🐛 Проблемы?

### Backend не запускается:
```bash
# Проверь логи
npm run dev

# Частые ошибки:
# - PostgreSQL не запущен
# - Неправильный DATABASE_URL в .env
# - Порт 3001 занят
```

### CORS ошибка:
```typescript
// backend/src/server.ts
import cors from 'cors'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
```

### Токен не сохраняется:
```javascript
// Проверь в консоли:
console.log(localStorage.getItem('token'))

// Должен быть JWT токен вида:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### API не отвечает:
```bash
# Проверь что backend запущен:
curl http://localhost:3001/api/health

# Проверь что .env.local существует:
cat .env.local

# Проверь что Vite подхватил .env:
# Перезапусти npm run dev
```

---

**Готов? Погнали дальше! 🚀**
