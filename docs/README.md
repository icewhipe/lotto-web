# 📚 Документация LPTT

> Полная документация проекта **Липецкий Политехнический Техникум Технологий**

---

## 🎯 С чего начать?

### Для новичков
Если ты впервые работаешь с веб-разработкой:
- 📖 [**BEGINNER_GUIDE.md**](./BEGINNER_GUIDE.md) — пошаговое руководство для начинающих

### Для опытных разработчиков
Если ты знаешь React, Node.js и хочешь понять архитектуру:
- 🏗 [**ARCHITECTURE.md**](./ARCHITECTURE.md) — техническая документация

### Для тестировщиков
Если ты хочешь протестировать проект:
- 🧪 [**TESTING.md**](./TESTING.md) — полный чек-лист тестирования

---

## 📁 Структура документации

### Общая информация
- [README.md](../README.md) — главная страница проекта
- [CHANGELOG.md](../CHANGELOG.md) — история изменений
- [CONTRIBUTING.md](../CONTRIBUTING.md) — как помочь проекту
- [ПРОГРЕСС_СЕГОДНЯ.md](../ПРОГРЕСС_СЕГОДНЯ.md) — текущий прогресс

### Руководства
- [BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md) — для новичков
- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура проекта
- [TESTING.md](./TESTING.md) — тестирование
- [RUN.md](../RUN.md) — быстрый запуск

### Frontend (Web)
- [web/QUICK_START.md](./web/QUICK_START.md) — быстрый старт

### Backend (API)
- [backend/README.md](../backend/README.md) — обзор backend
- [backend/SETUP.md](../backend/SETUP.md) — установка и настройка
- [backend/DATABASE.md](./backend/DATABASE.md) — схема базы данных
- [backend/API.md](./backend/API.md) — REST API документация
- [backend/WEBSOCKETS.md](./backend/WEBSOCKETS.md) — WebSocket события
- [backend/REDIS_OPTIONAL.md](../backend/REDIS_OPTIONAL.md) — Redis кэширование

### iOS приложение
- [ios/SETUP.md](./ios/SETUP.md) — установка и настройка
- [ios/ARCHITECTURE.md](./ios/ARCHITECTURE.md) — архитектура iOS app
- [ios/OPTIMIZATION.md](./ios/OPTIMIZATION.md) — оптимизация производительности
- [ios/TROUBLESHOOTING.md](./ios/TROUBLESHOOTING.md) — решение проблем

### Руководства (Guides)
- [guides/QUICK_START.md](./guides/QUICK_START.md) — быстрый старт для всех платформ

### Git и разработка
- [GIT_КОМАНДЫ.md](../GIT_КОМАНДЫ.md) — полезные Git команды
- [ИСПРАВЛЕНИЕ_GIT.md](../ИСПРАВЛЕНИЕ_GIT.md) — решение Git проблем

---

## 🔍 Поиск по темам

| Тема | Документ |
|------|----------|
| Установка проекта | [BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md) |
| Запуск frontend | [RUN.md](../RUN.md), [web/QUICK_START.md](./web/QUICK_START.md) |
| Запуск backend | [backend/SETUP.md](../backend/SETUP.md) |
| Настройка БД | [backend/DATABASE.md](./backend/DATABASE.md) |
| REST API | [backend/API.md](./backend/API.md) |
| WebSocket | [backend/WEBSOCKETS.md](./backend/WEBSOCKETS.md) |
| iOS приложение | [ios/SETUP.md](./ios/SETUP.md) |
| Тестирование | [TESTING.md](./TESTING.md) |
| Архитектура | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Производительность | [ios/OPTIMIZATION.md](./ios/OPTIMIZATION.md) |
| Git команды | [GIT_КОМАНДЫ.md](../GIT_КОМАНДЫ.md) |
| Troubleshooting | [ios/TROUBLESHOOTING.md](./ios/TROUBLESHOOTING.md) |

---

## 📊 Статистика проекта

- **Документов:** 20+
- **Строк документации:** 5000+
- **Примеров кода:** 100+
- **Скриншотов:** 10+
- **API endpoints:** 30+

---

## 🎓 Как использовать документацию

### 1. Определи свой уровень
- **Новичок?** → Начни с [BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md)
- **Опытный?** → Сразу к [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Тестировщик?** → Открой [TESTING.md](./TESTING.md)

### 2. Следуй инструкциям
Все руководства написаны пошагово:
```bash
# Шаг 1
git clone https://github.com/icewhipe/lotto-web.git

# Шаг 2
cd lotto-web

# Шаг 3
npm install
```

### 3. Используй примеры
В документации много примеров кода:
```typescript
// Пример из ARCHITECTURE.md
const grades = await prisma.grade.findMany({
  where: { studentId },
  include: { subject: true }
})
```

### 4. Проверяй обновления
Документация постоянно обновляется. Смотри:
- [CHANGELOG.md](../CHANGELOG.md) — что изменилось
- [ПРОГРЕСС_СЕГОДНЯ.md](../ПРОГРЕСС_СЕГОДНЯ.md) — текущий статус

---

## 🛠 Полезные команды

### Установка и запуск
```bash
# Установить всё
npm install

# Запустить всё
npm start

# Только frontend
npm run dev

# Только backend
cd backend && npm run dev
```

### Git команды
```bash
# Скачать изменения
git pull origin feature/electronic-diary-optimization

# Отменить все изменения
git reset --hard

# Посмотреть статус
git status
```

### База данных
```bash
# Применить миграции
cd backend && npx prisma migrate dev

# Открыть Prisma Studio
npx prisma studio

# Заполнить тестовыми данными
npm run seed
```

---

## 📖 Внешние ресурсы

### Технологии
- [React](https://react.dev/) — frontend библиотека
- [TypeScript](https://www.typescriptlang.org/) — язык программирования
- [Tailwind CSS](https://tailwindcss.com/) — CSS framework
- [Node.js](https://nodejs.org/) — backend runtime
- [Express](https://expressjs.com/) — backend framework
- [Prisma](https://www.prisma.io/) — ORM
- [PostgreSQL](https://www.postgresql.org/) — база данных
- [Socket.IO](https://socket.io/) — WebSocket
- [Swift](https://swift.org/) — iOS язык
- [SwiftUI](https://developer.apple.com/swiftui/) — iOS framework

### Обучение
- [freeCodeCamp](https://www.freecodecamp.org/) — бесплатные курсы
- [MDN Web Docs](https://developer.mozilla.org/) — веб документация
- [Stack Overflow](https://stackoverflow.com/) — вопросы и ответы

---

## 💬 Связь

### GitHub
- **Issues:** [github.com/icewhipe/lotto-web/issues](https://github.com/icewhipe/lotto-web/issues)
- **Pull Requests:** [github.com/icewhipe/lotto-web/pulls](https://github.com/icewhipe/lotto-web/pulls)
- **Discussions:** [github.com/icewhipe/lotto-web/discussions](https://github.com/icewhipe/lotto-web/discussions)

### Email
- **Поддержка:** support@lptt.ru
- **Разработка:** dev@lptt.ru

### Telegram
- **Канал:** @lptt_official
- **Чат:** @lptt_chat
- **Поддержка:** @lptt_support

---

## ✨ Удачи в разработке!

Если у тебя есть вопросы — не стесняйся спрашивать в Issues!

**Хорошего кодинга! 🚀**
