# 🚀 ДЕТАЛЬНЫЙ ПЛАН ИНТЕГРАЦИИ BACKEND

## 📅 ROADMAP: 3-4 НЕДЕЛИ ДО ПОЛНОГО ЗАПУСКА

---

## 🎯 ТЕКУЩЕЕ СОСТОЯНИЕ:

### ✅ ЧТО ГОТОВО (Frontend):
- Электронный дневник для всех ролей
- Панели: Студент, Преподаватель, Родитель, Директор, Завуч, Админ
- Менеджер пользователей (локальный)
- Графики и статистика (демо-данные)
- Заглушка для главного сайта

### ⚠️ ЧТО НУЖНО:
- Подключить backend
- Реальные данные из БД
- API интеграция
- Авторизация через backend
- Синхронизация данных

---

## 📊 ЭТАПЫ ИНТЕГРАЦИИ:

### **НЕДЕЛЯ 1: BACKEND SETUP + АВТОРИЗАЦИЯ**

#### День 1-2: Настройка Backend
```bash
# 1. Проверить backend
cd backend
npm install

# 2. Настроить PostgreSQL
# Убедиться что БД запущена

# 3. Обновить Prisma схему
# Добавить роли DIRECTOR и ZAVUCH
npx prisma migrate dev --name add_director_zavuch

# 4. Обновить seed скрипт
npm run seed

# 5. Запустить backend
npm run dev
```

**Задачи:**
- [ ] Установить все зависимости
- [ ] Настроить PostgreSQL
- [ ] Добавить роли DIRECTOR и ZAVUCH в schema.prisma
- [ ] Обновить seed скрипт с директором и завучем
- [ ] Запустить миграцию
- [ ] Запустить seed
- [ ] Проверить что backend работает на :3001

#### День 3-4: API Авторизации
**Обновить endpoints:**
- `/api/auth/login` - вход
- `/api/auth/register` - регистрация
- `/api/auth/me` - проверка сессии
- `/api/auth/logout` - выход

**Обновить Frontend:**
```typescript
// src/services/api.ts
export const authAPI = {
  login: async (email: string, password: string) => {
    // Убрать локальные credentials
    // Использовать ТОЛЬКО backend
  },
  
  getMe: async () => {
    // Проверка токена через backend
  }
}
```

**Задачи:**
- [ ] Убрать локальные credentials из AuthContext
- [ ] Подключить реальный API для входа
- [ ] Протестировать вход студентом
- [ ] Протестировать вход преподавателем
- [ ] Протестировать вход директором
- [ ] Протестировать вход завучем

#### День 5-7: Тестирование Авторизации
- [ ] Вход работает для всех ролей
- [ ] Токены сохраняются правильно
- [ ] Refresh tokens работают
- [ ] Выход работает
- [ ] Восстановление сессии работает

---

### **НЕДЕЛЯ 2: ПОДКЛЮЧЕНИЕ ДАННЫХ СТУДЕНТА**

#### День 8-10: Оценки
**Backend endpoints:**
```typescript
GET /api/grades/student/:id  // Все оценки студента
GET /api/grades/recent       // Последние оценки
GET /api/grades/stats        // Статистика (средний балл, количество)
```

**Frontend:**
```typescript
// src/hooks/useGrades.ts
export function useGrades() {
  const [grades, setGrades] = useState([])
  
  useEffect(() => {
    // Загрузка оценок с backend
    fetch('/api/grades/student/...')
  }, [])
  
  return { grades, avgGrade, ... }
}
```

**Задачи:**
- [ ] Создать API endpoints для оценок
- [ ] Подключить в StudentDashboard
- [ ] Обновить графики (реальные данные)
- [ ] Обновить статистику
- [ ] Протестировать

#### День 11-12: Расписание
**Backend endpoints:**
```typescript
GET /api/schedule/student/:id  // Расписание студента
GET /api/schedule/today        // На сегодня
GET /api/schedule/week         // На неделю
```

**Задачи:**
- [ ] Создать API endpoints
- [ ] Подключить в ScheduleView
- [ ] Добавить фильтры (сегодня/неделя)
- [ ] Протестировать

#### День 13-14: Посещаемость
**Backend endpoints:**
```typescript
GET /api/attendance/student/:id  // Вся посещаемость
GET /api/attendance/stats        // Статистика
```

**Задачи:**
- [ ] Создать API endpoints
- [ ] Подключить в AttendanceView
- [ ] Обновить графики
- [ ] Протестировать

---

### **НЕДЕЛЯ 3: ПОДКЛЮЧЕНИЕ ПРЕПОДАВАТЕЛЯ И РОДИТЕЛЯ**

#### День 15-17: Панель Преподавателя
**Backend endpoints:**
```typescript
GET /api/teacher/groups        // Группы преподавателя
GET /api/teacher/schedule      // Расписание
POST /api/grades               // Выставить оценку
PUT /api/grades/:id            // Изменить оценку
GET /api/teacher/stats         // Статистика
```

**Задачи:**
- [ ] Создать endpoints
- [ ] Подключить в TeacherDashboard
- [ ] Добавить выставление оценок
- [ ] Добавить список групп
- [ ] Протестировать

#### День 18-19: Панель Родителя
**Backend endpoints:**
```typescript
GET /api/parent/children       // Дети родителя
GET /api/grades/student/:id    // Оценки ребёнка
GET /api/schedule/student/:id  // Расписание ребёнка
```

**Задачи:**
- [ ] Создать endpoints
- [ ] Подключить в ParentDashboard
- [ ] Выбор ребёнка (если детей несколько)
- [ ] Протестировать

#### День 20-21: Админ Панель (Пользователи)
**Backend endpoints:**
```typescript
GET /api/admin/users           // Все пользователи
POST /api/admin/users          // Создать пользователя
PUT /api/admin/users/:id       // Обновить
DELETE /api/admin/users/:id    // Удалить
```

**Задачи:**
- [ ] Создать endpoints
- [ ] Подключить UsersManager к backend
- [ ] Убрать localStorage
- [ ] Протестировать создание всех ролей

---

### **НЕДЕЛЯ 4: ДИРЕКТОР, ЗАВУЧ, ФИНАЛ**

#### День 22-24: Панель Директора
**Backend endpoints:**
```typescript
GET /api/director/stats        // Общая статистика техникума
GET /api/director/top-groups   // Топ-5 групп
GET /api/director/top-students // Топ-10 студентов
GET /api/director/problems     // Проблемные зоны
GET /api/director/dynamics     // Динамика показателей
```

**Задачи:**
- [ ] Создать endpoints
- [ ] Подключить в DirectorDashboard
- [ ] Обновить все графики
- [ ] Реальные топы и статистика
- [ ] Протестировать

#### День 25-26: Панель Завуча
**Backend endpoints:**
```typescript
GET /api/zavuch/replacements   // Замены преподавателей
POST /api/zavuch/replacements  // Создать замену
GET /api/zavuch/problems       // Проблемные группы
GET /api/zavuch/teacher-load   // Нагрузка преподавателей
GET /api/zavuch/schedule       // Управление расписанием
```

**Задачи:**
- [ ] Создать endpoints
- [ ] Подключить в ZavuchDashboard
- [ ] Создание замен
- [ ] Управление нагрузкой
- [ ] Протестировать

#### День 27-28: Финальное Тестирование
**Проверить ВСЁ:**
- [ ] Студент - оценки, расписание, посещаемость
- [ ] Преподаватель - группы, выставление оценок, расписание
- [ ] Родитель - данные ребёнка
- [ ] Директор - аналитика, топы, статистика
- [ ] Завуч - замены, нагрузка, контроль
- [ ] Админ - управление пользователями

**Баги и доработки:**
- [ ] Исправить все найденные баги
- [ ] Оптимизация запросов
- [ ] Добавить loading состояния
- [ ] Обработка ошибок

---

## 🛠 ТЕХНИЧЕСКИЕ ДЕТАЛИ:

### Backend Stack:
```
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT авторизация
- bcrypt для паролей
```

### Frontend Integration:
```typescript
// Структура API service
src/services/
  ├── api.ts              // Базовый API client
  ├── auth.ts             // Авторизация
  ├── grades.ts           // Оценки
  ├── schedule.ts         // Расписание
  ├── attendance.ts       // Посещаемость
  ├── teacher.ts          // Преподаватель
  ├── parent.ts           // Родитель
  ├── admin.ts            // Админ
  ├── director.ts         // Директор
  └── zavuch.ts           // Завуч
```

### Хуки для данных:
```typescript
src/hooks/
  ├── useGrades.ts        // Оценки
  ├── useSchedule.ts      // Расписание
  ├── useAttendance.ts    // Посещаемость
  ├── useStats.ts         // Статистика
  └── useRealtime.ts      // WebSocket для real-time
```

---

## 🔐 БЕЗОПАСНОСТЬ:

### Обязательно:
- [ ] Хеширование паролей (bcrypt)
- [ ] JWT токены с expiration
- [ ] Refresh tokens
- [ ] CORS настройка
- [ ] Rate limiting
- [ ] Валидация всех входных данных
- [ ] SQL injection защита (Prisma ORM)
- [ ] XSS защита

---

## 📊 ДАННЫЕ ДЛЯ SEED:

### Нужно создать:
```typescript
// backend/src/utils/seedDatabase.ts

// 1. Пользователи всех ролей
- 50 студентов
- 10 преподавателей
- 5 родителей
- 1 директор
- 1 завуч
- 1 админ

// 2. Группы и специальности
- 10 групп разных курсов
- 5 специальностей

// 3. Предметы
- 15 предметов

// 4. Оценки
- 500+ оценок (реалистичные)
- Разброс от 2 до 5
- За последние 3 месяца

// 5. Расписание
- На всю неделю
- Для всех групп
- Реальные кабинеты

// 6. Посещаемость
- За последний месяц
- Реалистичные данные

// 7. Замены
- 10-15 замен на ближайшую неделю
```

---

## 🚀 ЗАПУСК:

### Development:
```bash
# Terminal 1: Backend
cd backend
npm run dev  # Порт 3001

# Terminal 2: Frontend
npm run dev  # Порт 5173

# Открыть: http://localhost:5173
```

### Production:
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
npm run build
# Залить dist/ на хостинг
```

---

## 📝 ЧЕКЛИСТ ГОТОВНОСТИ:

### Backend:
- [ ] PostgreSQL настроен
- [ ] Prisma schema обновлена
- [ ] Миграции выполнены
- [ ] Seed данные загружены
- [ ] Все endpoints работают
- [ ] JWT авторизация работает
- [ ] Тесты пройдены

### Frontend:
- [ ] Все компоненты подключены к API
- [ ] Loading состояния добавлены
- [ ] Ошибки обрабатываются
- [ ] Графики показывают реальные данные
- [ ] Все роли работают
- [ ] Билд проходит без ошибок

### Тестирование:
- [ ] Вход для всех ролей
- [ ] CRUD операции
- [ ] Графики и статистика
- [ ] Responsive дизайн
- [ ] Кроссбраузерность
- [ ] Производительность

---

## 🎯 ПРИОРИТЕТЫ:

### Критично (Неделя 1):
1. ✅ Backend запущен
2. ✅ Авторизация работает
3. ✅ Данные в БД

### Важно (Неделя 2-3):
1. Студент видит реальные оценки
2. Преподаватель может ставить оценки
3. Админ может управлять пользователями

### Желательно (Неделя 4):
1. Директор видит аналитику
2. Завуч управляет заменами
3. Real-time обновления

---

## 📞 КОГО ПРИВЛЕЧЬ:

### Нужны:
- **Backend разработчик** - API, БД, оптимизация
- **Тестировщик** - тестирование всех ролей
- **DevOps** - деплой и настройка сервера

### Можно сделать самому:
- Frontend интеграция
- UI/UX доработки
- Документация

---

## 🔥 QUICK START (ДЛЯ НАЧАЛА):

```bash
# 1. Клонируй и обнови
git pull

# 2. Backend
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev

# 3. Frontend (новый терминал)
npm run dev

# 4. Открой браузер
http://localhost:5173

# 5. Войди как студент
Email: student@lptt.ru
Password: 123456
```

---

## ✅ ГОТОВО К СТАРТУ!

**План детальный, задачи расписаны!**
**Теперь ГАЗ ДО КОНЦА! 🚀🔥**
