# 📱 ЛПТТ - Электронный дневник для iOS

Мобильное приложение электронного дневника для Лискинского промышленно-транспортного техникума.

## 🚀 Технологии

- **React Native** - Кроссплатформенная разработка
- **Expo** - Быстрая разработка и деплой
- **TypeScript** - Type safety
- **React Navigation** - Нативная навигация
- **Expo Linear Gradient** - Градиенты
- **React Native Animatable** - Анимации
- **AsyncStorage** - Локальное хранилище
- **React Native Vector Icons** - Иконки

## 📦 Установка

### Prerequisites
```bash
npm install -g expo-cli
```

### Установка зависимостей
```bash
cd mobile
npm install
```

## 🏃 Запуск

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web (для разработки)
```bash
npm run web
```

### Expo Go (на реальном устройстве)
```bash
npm start
```
Затем отсканируйте QR-код в приложении Expo Go

## 📱 Структура приложения

```
mobile/
├── src/
│   ├── screens/          # Экраны приложения
│   │   ├── LoginScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── student/
│   │       ├── Dashboard.tsx
│   │       ├── GradesScreen.tsx
│   │       ├── ScheduleScreen.tsx
│   │       └── NotesScreen.tsx
│   │
│   ├── components/       # Переиспользуемые компоненты
│   ├── navigation/       # Навигация
│   ├── services/         # API сервисы
│   ├── utils/           # Утилиты
│   └── types/           # TypeScript типы
│
├── assets/              # Изображения, шрифты
├── App.tsx             # Главный компонент
├── app.json            # Expo конфигурация
└── package.json        # Зависимости
```

## 🎨 Дизайн

### Цветовая палитра
- **Primary**: `#8B5CF6` (Violet)
- **Secondary**: `#7C3AED` (Purple)
- **Success**: `#10B981` (Green)
- **Info**: `#3B82F6` (Blue)
- **Warning**: `#F59E0B` (Amber)

### Компоненты UI
- Glass morphism карточки
- Linear градиенты
- iOS-нативные анимации
- Bottom Tab Navigation
- Pull-to-refresh
- Touch feedback

## 📱 Экраны

### 1. Login Screen
- Email/Password форма
- Быстрый вход (Студент/Преподаватель)
- Forgot password
- Регистрация
- Градиентный фон
- Animated logo

### 2. Student Dashboard
- Статистика (Ср. балл, Посещаемость, Задания)
- Расписание на сегодня
- Последние оценки
- Быстрые действия
- Push notifications badge

### 3. Grades Screen
- Список предметов
- Оценки по датам
- Средний балл по предмету
- Фильтры и сортировка
- Графики успеваемости

### 4. Schedule Screen
- Расписание по дням
- Текущая неделя
- Детали занятия
- Преподаватель и кабинет
- Тип занятия

### 5. Notes Screen
- Обмен конспектами
- Upload/Download
- Категории
- Рейтинг
- Поиск

### 6. Profile Screen
- Личные данные
- Настройки
- Статистика
- Logout

## 🔐 Аутентификация

### Mock Users
```
Студент:
  Email: student@lptt.ru
  Password: 123456

Преподаватель:
  Email: teacher@lptt.ru
  Password: 123456
```

### AsyncStorage Keys
- `userToken` - JWT токен
- `userRole` - Роль пользователя
- `userName` - Имя пользователя
- `userGroup` - Группа студента

## 📊 Features

### Реализовано ✅
- ✅ Login screen с анимациями
- ✅ Bottom Tab Navigation
- ✅ Student Dashboard
- ✅ Profile Screen
- ✅ Mock данные
- ✅ AsyncStorage auth
- ✅ iOS-style UI

### В разработке 🚧
- 🚧 Grades Screen (полная версия)
- 🚧 Schedule Screen (полная версия)
- 🚧 Notes Exchange
- 🚧 Chat
- 🚧 Progress Tracker
- 🚧 Push Notifications
- 🚧 API Integration
- 🚧 Offline mode

## 🎯 Оптимизация для iOS

### Performance
- **FlatList** для больших списков
- **Memo** компоненты
- **useMemo/useCallback** хуки
- **Lazy loading** изображений
- **Animated API** для плавных анимаций

### iOS-специфичные фичи
- **Safe Area** поддержка
- **Haptic Feedback**
- **Face ID / Touch ID** (планируется)
- **Share Sheet** интеграция
- **Deep Linking**
- **Universal Links**

### UI/UX
- iOS Human Interface Guidelines
- Native-like transitions
- Bottom Tab Bar (iOS style)
- Swipe gestures
- Pull-to-refresh
- Modal presentations

## 📦 Build & Deploy

### Development Build
```bash
expo build:ios -t simulator
```

### Production Build
```bash
expo build:ios -t archive
```

### App Store
```bash
expo upload:ios
```

## 🧪 Тестирование

### Запуск тестов
```bash
npm test
```

### E2E тесты
```bash
npm run test:e2e
```

## 📝 Документация API

### Endpoints (планируется)
```
POST /api/auth/login
GET  /api/student/dashboard
GET  /api/student/grades
GET  /api/student/schedule
GET  /api/student/notes
POST /api/student/notes/upload
```

## 🔄 Обновления

### v1.0.0 (Current)
- ✅ Базовая структура приложения
- ✅ Login screen
- ✅ Student Dashboard
- ✅ Navigation
- ✅ Mock данные

### v1.1.0 (Planned)
- 🎯 Полные Grades Screen
- 🎯 Полные Schedule Screen
- 🎯 Notes Exchange
- 🎯 API интеграция

### v1.2.0 (Future)
- 🔮 Push Notifications
- 🔮 Offline mode
- 🔮 Chat
- 🔮 Progress Tracker
- 🔮 Face ID

## 📱 Системные требования

- **iOS**: 13.0+
- **iPhone**: 6s и новее
- **iPad**: Supported
- **iPhone SE**: Supported

## 🎨 Дизайн файлы

- Logo: `assets/icon.png` (1024x1024)
- Splash: `assets/splash.png` (1284x2778)
- Adaptive Icon: `assets/adaptive-icon.png` (1024x1024)

## 👥 Команда

- Frontend: React Native
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Design: iOS Human Interface Guidelines

## 📄 Лицензия

MIT License - ЛПТТ 2024

---

**Статус:** 🚀 В разработке  
**Версия:** 1.0.0  
**Последнее обновление:** 9 октября 2025
