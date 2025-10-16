# 🚀 Быстрый старт

Запустите проект за 10 минут!

---

## 🎯 Выберите платформу

### 🌐 Web приложение

**Для:** Разработчиков веб-интерфейса

[→ Web Quick Start](../web/QUICK_START.md)

### 📱 iOS приложение

**Для:** iOS разработчиков

[→ iOS Setup](../ios/SETUP.md)

### 🔧 Backend

**Для:** Backend разработчиков

[→ Backend Setup](../backend/SETUP.md)

---

## 🌟 Полная установка (все платформы)

### Шаг 1: Клонируйте репозиторий

```bash
git clone https://github.com/icewhipe/lotto-web.git
cd lotto-web
```

---

### Шаг 2: Web приложение

```bash
# Установить зависимости
npm install

# Запустить dev server
npm run dev
```

**Откроется:** http://localhost:5173

---

### Шаг 3: Backend (опционально)

```bash
# Перейти в папку backend
cd backend

# Установить зависимости
npm install

# Настроить .env
cp .env.example .env
# Отредактировать .env с вашими настройками

# Запустить миграции
npx prisma migrate dev

# Запустить сервер
npm run dev
```

**Запущен на:** http://localhost:3000

---

### Шаг 4: iOS (опционально)

```bash
# Перейти в папку iOS
cd ios-native

# Открыть проект
open LPTTDiary.xcodeproj
```

В Xcode:
```
⌘ + R  (Build & Run)
```

---

## ✅ Проверка установки

### Web

- [ ] http://localhost:5173 открывается
- [ ] Главная страница загружается
- [ ] Можно войти в систему
- [ ] Dashboard работает

### Backend

- [ ] http://localhost:3000 отвечает
- [ ] База данных подключена
- [ ] API endpoints доступны

### iOS

- [ ] Проект компилируется (⌘ + B)
- [ ] Симулятор запускается
- [ ] Login screen отображается
- [ ] Можно войти

---

## 🎯 Тестовые данные

### Пользователи

| Роль | Email | Пароль |
|------|-------|--------|
| **Студент** | student@lptt.ru | 123456 |
| **Преподаватель** | teacher@lptt.ru | 123456 |
| **Директор** | director@lptt.ru | 123456 |
| **Администратор** | admin@lptt.ru | 123456 |

---

## 🛠️ Полезные команды

### Web
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # Линтинг
npm run type-check   # TypeScript check
```

### Backend
```bash
npm run dev          # Dev server с nodemon
npm start            # Production
npm run prisma:studio # Database UI
```

### iOS
```
⌘ + R          # Run
⌘ + B          # Build
⌘ + U          # Run tests
⌘ + Shift + K  # Clean
⌘ + .          # Stop
```

---

## 🐛 Проблемы?

### Web не запускается

```bash
rm -rf node_modules
npm install
npm run dev
```

### Backend ошибки БД

```bash
# Пересоздать БД
npx prisma migrate reset
npx prisma migrate dev
```

### iOS не компилируется

```
⌘ + Shift + K  (Clean)
⌘ + B          (Build)
```

Если не помогло: [iOS Troubleshooting](../ios/TROUBLESHOOTING.md)

---

## 📚 Дальнейшие шаги

### Изучить код

- [Web Components](../web/COMPONENTS.md)
- [iOS Architecture](../ios/ARCHITECTURE.md)
- [Backend API](../backend/API.md)

### Начать разработку

- [Contributing Guide](../../CONTRIBUTING.md)
- [Changelog](../../CHANGELOG.md)

---

**Готовы к разработке!** 🎉

[← Назад](../README.md)
