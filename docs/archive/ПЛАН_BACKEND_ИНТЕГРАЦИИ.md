# 🚀 ПЛАН BACKEND ИНТЕГРАЦИИ - ГАЗ ДО КОНЦА!

**Статус:** Директору и преподам понравилось! Теперь доделываем до production! 🔥

---

## 📋 ТЕКУЩИЙ СТАТУС

### ✅ ЧТО УЖЕ ЕСТЬ:

**Frontend:**
- ✅ Полный дизайн сайта (все секции)
- ✅ Электронный дневник (все разделы работают с mock)
- ✅ Регистрация/Авторизация UI
- ✅ Админ-панель UI
- ✅ Адаптивный дизайн
- ✅ Тёмная тема

**Backend:**
- ✅ Node.js/Express сервер
- ✅ PostgreSQL база данных
- ✅ Prisma ORM (полная схема)
- ✅ JWT авторизация
- ✅ API контроллеры: auth, grades, schedule, registration, rfid, turnstile
- ✅ WebSocket для чата
- ✅ Email сервис
- ✅ Redis (опционально)

**Частично подключено:**
- 🟡 useGrades hook (пытается подключиться к API)
- 🟡 useSchedule hook (пытается подключиться к API)
- 🟡 AuthContext (с fallback на mock)

---

## 🎯 ПЛАН ИНТЕГРАЦИИ (3 ЭТАПА)

---

## 📊 ЭТАП 1: ОСНОВА (1-2 дня)
### Приоритет: КРИТИЧЕСКИЙ 🔥

Цель: Запустить backend, подключить базу, сделать базовую авторизацию

### 1.1 Настройка окружения

**Задачи:**
- [ ] Установить PostgreSQL (если нет)
- [ ] Создать базу данных `lptt_db`
- [ ] Настроить `.env` файл в backend/
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/lptt_db"
  JWT_SECRET="your-secret-key-here"
  PORT=3001
  ```
- [ ] Запустить миграции Prisma
  ```bash
  cd backend
  npm install
  npx prisma migrate dev
  npx prisma generate
  ```

**Проверка:**
```bash
cd backend
npm run dev
# Должно вывести: Server running on port 3001
```

---

### 1.2 Seed данных (Тестовые данные)

**Задачи:**
- [ ] Создать seed скрипт или использовать существующий `seedDatabase.ts`
- [ ] Добавить тестовых пользователей:
  - Админ: admin@lptt.ru / admin123
  - Студент: student@lptt.ru / student123
  - Преподаватель: teacher@lptt.ru / teacher123
  - Родитель: parent@lptt.ru / parent123
- [ ] Добавить группы (ПТ-21, ПТ-22, ИТ-31, и т.д.)
- [ ] Добавить специальности
- [ ] Добавить предметы
- [ ] Добавить расписание для каждой группы
- [ ] Добавить оценки для студентов
- [ ] Добавить посещаемость

**Файл:** `backend/src/utils/seedDatabase.ts`

**Проверка:**
```bash
npx prisma studio
# Открыть браузер → посмотреть таблицы
```

---

### 1.3 Подключение авторизации

**Задачи:**
- [ ] Проверить API endpoints в `backend/src/routes/auth.routes.ts`
- [ ] Обновить `src/services/api.ts` (frontend) - указать правильный URL backend
  ```typescript
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
  ```
- [ ] Добавить `.env` в корень проекта (frontend):
  ```env
  VITE_API_URL=http://localhost:3001/api
  ```
- [ ] Тестировать авторизацию через реальный API

**Файлы:**
- `src/services/api.ts` (frontend)
- `src/contexts/AuthContext.tsx` (frontend)
- `backend/src/controllers/auth.controller.ts`

**Тесты:**
1. Логин → должен вернуть токен
2. getMe → должен вернуть данные пользователя
3. Logout → должен удалить токен

**Проверка:**
```bash
# В консоли браузера после логина:
console.log(localStorage.getItem('token'))
# Должен быть настоящий JWT токен
```

---

### 1.4 CORS и прокси

**Задачи:**
- [ ] Настроить CORS в backend
  ```typescript
  // backend/src/server.ts
  app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
  }))
  ```
- [ ] Настроить прокси в Vite (опционально)
  ```typescript
  // vite.config.ts
  export default defineConfig({
    server: {
      proxy: {
        '/api': 'http://localhost:3001'
      }
    }
  })
  ```

**Проверка:**
- Запустить frontend: `npm run dev`
- Запустить backend: `cd backend && npm run dev`
- Залогиниться → должно работать без ошибок CORS

---

## 📚 ЭТАП 2: ЭЛЕКТРОННЫЙ ДНЕВНИК (2-3 дня)
### Приоритет: ВЫСОКИЙ 🔥

Цель: Подключить все разделы дневника к реальному API

### 2.1 Оценки (Grades)

**Задачи:**
- [ ] Проверить `backend/src/controllers/grades.controller.ts`
- [ ] Обновить `src/hooks/useGrades.ts` для работы с API
- [ ] Обновить `src/components/dashboard/GradesView.tsx`
  - Убрать fallback на mock данные (или оставить для демо)
  - Добавить обработку ошибок
  - Добавить loading state
  - Добавить фильтры (по предмету, дате)
- [ ] Добавить API endpoints:
  - `GET /api/grades/student/:studentId` - все оценки студента
  - `GET /api/grades/student/:studentId/average` - средний балл
  - `GET /api/grades/subject/:subjectId` - оценки по предмету

**Компоненты:**
- `src/hooks/useGrades.ts`
- `src/components/dashboard/GradesView.tsx`
- `src/components/dashboard/StudentDashboard.tsx`

**Тесты:**
1. Открыть "Оценки" → должен загрузить реальные оценки из БД
2. Средний балл должен считаться корректно
3. Фильтр по предмету работает

---

### 2.2 Расписание (Schedule)

**Задачи:**
- [ ] Проверить `backend/src/controllers/schedule.controller.ts`
- [ ] Обновить `src/hooks/useSchedule.ts`
- [ ] Обновить `src/components/dashboard/ScheduleView.tsx`
  - Убрать fallback на mock
  - Добавить выбор недели
  - Добавить цветовую кодировку типов занятий
- [ ] API endpoints:
  - `GET /api/schedule/group/:groupId` - расписание группы
  - `GET /api/schedule/group/:groupId/day/:day` - расписание на день
  - `GET /api/schedule/teacher/:teacherId` - расписание преподавателя

**Компоненты:**
- `src/hooks/useSchedule.ts`
- `src/components/dashboard/ScheduleView.tsx`
- `src/components/dashboard/StudentDashboard.tsx` (today's lessons)

**Тесты:**
1. Выбрать день недели → показать расписание
2. Преподаватели и кабинеты корректны
3. Типы занятий отображаются

---

### 2.3 Посещаемость (Attendance)

**Задачи:**
- [ ] Создать `backend/src/controllers/attendance.controller.ts`
- [ ] Создать `backend/src/routes/attendance.routes.ts`
- [ ] Создать `src/hooks/useAttendance.ts` (новый!)
- [ ] Обновить `src/components/dashboard/AttendanceView.tsx`
  - Подключить к API
  - Добавить статистику (% посещаемости)
  - Добавить календарь с отметками
  - Фильтр по периоду
- [ ] API endpoints:
  - `GET /api/attendance/student/:studentId` - вся посещаемость
  - `GET /api/attendance/student/:studentId/stats` - статистика
  - `GET /api/attendance/group/:groupId` - посещаемость группы

**Новые файлы:**
- `backend/src/controllers/attendance.controller.ts`
- `backend/src/routes/attendance.routes.ts`
- `src/hooks/useAttendance.ts`

**Тесты:**
1. Открыть "Посещаемость" → список всех дней
2. Статистика считается корректно
3. Фильтр по месяцу работает

---

### 2.4 Главная панель (StudentDashboard)

**Задачи:**
- [ ] Обновить статистику на главной (использовать реальные данные)
- [ ] "Расписание на сегодня" - из API
- [ ] "Последние оценки" - из API
- [ ] Добавить виджет "Ближайшие экзамены"
- [ ] Добавить виджет "Объявления"

**Компонент:**
- `src/components/dashboard/StudentDashboard.tsx`

---

## 🎓 ЭТАП 3: ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ (3-4 дня)
### Приоритет: СРЕДНИЙ

### 3.1 Конспекты (Notes Exchange)

**Задачи:**
- [ ] Создать `backend/src/controllers/notes.controller.ts`
- [ ] Создать `backend/src/routes/notes.routes.ts`
- [ ] Настроить загрузку файлов (Multer уже есть в config/)
- [ ] Создать `src/hooks/useNotes.ts`
- [ ] Обновить `src/components/student/NotesExchange.tsx`
  - Загрузка конспектов
  - Скачивание
  - Рейтинг
  - Поиск по предмету
- [ ] API endpoints:
  - `GET /api/notes` - все конспекты
  - `GET /api/notes/subject/:subjectId` - по предмету
  - `POST /api/notes/upload` - загрузить конспект
  - `GET /api/notes/:id/download` - скачать
  - `POST /api/notes/:id/rate` - оценить

**Новые файлы:**
- `backend/src/controllers/notes.controller.ts`
- `backend/src/routes/notes.routes.ts`
- `src/hooks/useNotes.ts`

---

### 3.2 Чат (Student Chat)

**Задачи:**
- [ ] Проверить WebSocket настройки в `backend/src/config/websocket.ts`
- [ ] Создать `backend/src/controllers/chat.controller.ts`
- [ ] Создать Socket.io события для чата
- [ ] Обновить `src/components/student/StudentChat.tsx`
  - WebSocket подключение
  - Отправка/получение сообщений
  - История сообщений
  - Онлайн статус
- [ ] API/Socket events:
  - `socket.emit('join-room', groupId)` - войти в чат группы
  - `socket.emit('send-message', message)` - отправить сообщение
  - `socket.on('new-message', callback)` - получить сообщение
  - `GET /api/chat/room/:groupId/messages` - история

**Новые файлы:**
- `backend/src/controllers/chat.controller.ts`
- `backend/src/routes/chat.routes.ts`
- `src/hooks/useChat.ts`

---

### 3.3 Прогресс (Progress Tracker)

**Задачи:**
- [ ] Создать API для получения статистики прогресса
- [ ] Обновить `src/components/student/ProgressTracker.tsx`
  - График оценок за семестр
  - Динамика посещаемости
  - Сравнение со средним по группе
  - Прогноз итоговой оценки
- [ ] API endpoints:
  - `GET /api/progress/student/:studentId` - общий прогресс
  - `GET /api/progress/student/:studentId/subject/:subjectId` - по предмету
  - `GET /api/progress/student/:studentId/trends` - тренды

**Библиотеки:**
- Chart.js (уже установлен)
- react-chartjs-2 (уже установлен)

---

### 3.4 Регистрация студентов

**Задачи:**
- [ ] Проверить `backend/src/controllers/registration.controller.ts`
- [ ] Обновить `src/components/RegisterPage.tsx`
  - Валидация инвайт-кода
  - Выбор специальности
  - Загрузка документов
- [ ] Админ-панель: управление инвайт-кодами
  - Создание кодов
  - Просмотр использованных
  - Деактивация
- [ ] API endpoints:
  - `POST /api/registration/validate-code` - проверить код
  - `POST /api/registration/submit` - отправить заявку
  - `GET /api/registration/requests` - (admin) все заявки
  - `POST /api/registration/approve/:id` - (admin) одобрить

**Компоненты:**
- `src/components/RegisterPage.tsx`
- `src/components/admin/InviteCodesManager.tsx`

---

### 3.5 Админ панель

**Задачи:**
- [ ] Создать контроллеры для админки:
  - `backend/src/controllers/admin/users.controller.ts`
  - `backend/src/controllers/admin/groups.controller.ts`
  - `backend/src/controllers/admin/schedule.controller.ts`
- [ ] Обновить компоненты админки:
  - `src/components/admin/AdminPanel.tsx`
  - `src/components/admin/NewsManager.tsx`
  - `src/components/admin/GalleryManager.tsx`
- [ ] Функции админа:
  - Управление пользователями (CRUD)
  - Управление группами
  - Управление расписанием
  - Публикация новостей
  - Управление галереей
  - Просмотр статистики

**API endpoints:**
- `GET /api/admin/users` - все пользователи
- `POST /api/admin/users` - создать пользователя
- `PUT /api/admin/users/:id` - обновить
- `DELETE /api/admin/users/:id` - удалить
- (аналогично для groups, schedule, news, gallery)

---

## 🔒 ЭТАП 4: БЕЗОПАСНОСТЬ И PRODUCTION (2-3 дня)
### Приоритет: КРИТИЧЕСКИЙ перед запуском

### 4.1 Безопасность

**Задачи:**
- [ ] Добавить rate limiting (express-rate-limit)
- [ ] Добавить helmet.js для HTTP headers
- [ ] Валидация всех входных данных
- [ ] SQL injection защита (Prisma уже защищает)
- [ ] XSS защита
- [ ] CSRF токены
- [ ] Безопасное хранение паролей (bcrypt - должен быть уже)
- [ ] HTTPS в production
- [ ] Environment variables защита

**Файлы:**
- `backend/src/middleware/security.ts` (создать)
- `backend/src/server.ts`

---

### 4.2 Обработка ошибок

**Задачи:**
- [ ] Единый обработчик ошибок в backend
- [ ] Логирование ошибок (Winston или Pino)
- [ ] Красивые сообщения об ошибках в frontend
- [ ] Toast уведомления для пользователя
- [ ] Error boundary в React

**Файлы:**
- `backend/src/middleware/errorHandler.ts`
- `src/components/ErrorBoundary.tsx` (создать)

---

### 4.3 Тестирование

**Задачи:**
- [ ] Unit тесты для критичных функций
- [ ] Integration тесты для API
- [ ] E2E тесты для основных сценариев
- [ ] Тестирование на разных устройствах

**Библиотеки:**
- Jest (backend)
- React Testing Library (frontend)
- Cypress или Playwright (E2E)

---

### 4.4 Деплой

**Задачи:**
- [ ] Подготовить production build
  ```bash
  npm run build
  ```
- [ ] Настроить Nginx
- [ ] SSL сертификаты (Let's Encrypt)
- [ ] Настроить PM2 для backend
- [ ] Настроить PostgreSQL для production
- [ ] Backup стратегия
- [ ] Мониторинг (опционально: Grafana)

**Хостинг опции:**
- VPS (Digital Ocean, Hetzner, Timeweb)
- Vercel (frontend) + Railway (backend+DB)
- Heroku
- AWS / Azure / Google Cloud

---

## 📊 ПРИОРИТИЗАЦИЯ ЗАДАЧ

### 🔥 СЕЙЧАС (НЕДЕЛЯ 1):
1. **День 1-2:** ЭТАП 1 - Основа
   - Запустить backend
   - Seed данные
   - Подключить авторизацию
   - CORS настроить

2. **День 3-4:** ЭТАП 2.1-2.2
   - Оценки подключить
   - Расписание подключить

3. **День 5-7:** ЭТАП 2.3-2.4
   - Посещаемость
   - Главная панель доделать

### 🎯 ПОТОМ (НЕДЕЛЯ 2):
4. **День 8-10:** ЭТАП 3.1-3.2
   - Конспекты
   - Чат

5. **День 11-12:** ЭТАП 3.3-3.4
   - Прогресс
   - Регистрация

6. **День 13-14:** ЭТАП 3.5
   - Админ панель

### 🚀 ФИНАЛ (НЕДЕЛЯ 3):
7. **День 15-17:** ЭТАП 4
   - Безопасность
   - Тестирование
   - Деплой

---

## ✅ ЧЕКЛИСТ ГОТОВНОСТИ К PRODUCTION

**Backend:**
- [ ] PostgreSQL настроен и работает
- [ ] Все миграции применены
- [ ] Seed данные загружены
- [ ] API endpoints работают
- [ ] JWT авторизация работает
- [ ] CORS настроен
- [ ] Rate limiting включен
- [ ] Helmet.js подключен
- [ ] Логирование работает
- [ ] Error handling везде
- [ ] WebSocket работает (для чата)
- [ ] File upload работает (для конспектов)

**Frontend:**
- [ ] Авторизация через API
- [ ] Оценки из API
- [ ] Расписание из API
- [ ] Посещаемость из API
- [ ] Конспекты работают
- [ ] Чат работает
- [ ] Регистрация работает
- [ ] Админ панель работает
- [ ] Production build без ошибок
- [ ] SEO оптимизация
- [ ] Метатеги настроены
- [ ] Favicon установлен

**DevOps:**
- [ ] Nginx настроен
- [ ] SSL сертификаты установлены
- [ ] PM2 запущен
- [ ] Backup настроен
- [ ] Мониторинг настроен
- [ ] Логи пишутся
- [ ] Домен куплен и настроен

---

## 🛠️ ТЕХНИЧЕСКИЙ СТЕК

**Frontend:**
- ✅ React 18 + TypeScript
- ✅ Vite
- ✅ Tailwind CSS
- ✅ Framer Motion
- ✅ React Router DOM
- ✅ Axios
- ✅ Chart.js
- ✅ React Hot Toast

**Backend:**
- ✅ Node.js + Express
- ✅ TypeScript
- ✅ Prisma ORM
- ✅ PostgreSQL
- ✅ JWT
- ✅ bcrypt
- ✅ Socket.io
- ✅ Multer
- ⚠️ Redis (опционально)

**DevOps:**
- Nginx
- PM2
- Let's Encrypt
- Git/GitHub

---

## 📞 КОНТАКТЫ ДЛЯ ПОМОЩИ

Если застрял на каком-то этапе - пиши! Помогу разобраться! 💪

---

## 🎊 ФИНАЛЬНАЯ ЦЕЛЬ

**К концу интеграции должно быть:**

1. ✅ Полностью рабочий сайт ЛПТТ
2. ✅ Электронный дневник с реальными данными
3. ✅ Авторизация студентов/преподавателей/родителей
4. ✅ Регистрация новых студентов через инвайт-коды
5. ✅ Админ панель для управления
6. ✅ Чат между студентами группы
7. ✅ Обмен конспектами
8. ✅ Статистика и аналитика
9. ✅ RFID система учёта (бонус)
10. ✅ Production ready проект

---

**ГАЗ ДО КОНЦА! 🚀🔥**

Начинаем с ЭТАПА 1! Готов помогать на каждом шаге! 💪
