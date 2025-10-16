# 📱 iOS Setup — Настройка и запуск

Полное руководство по настройке iOS приложения.

---

## ✅ Требования

### Системные требования

- **macOS** 13.0 (Ventura) или выше
- **Xcode** 15.0 или выше
- **iOS Simulator** или физическое устройство с iOS 16.0+

### Установка Xcode

1. Откройте **App Store**
2. Найдите **Xcode**
3. Нажмите **Установить** (бесплатно)
4. Подождите ~15 ГБ загрузки

[Скачать Xcode →](https://apps.apple.com/us/app/xcode/id497799835)

---

## 🚀 Быстрый старт

### 1. Перейдите в папку iOS

```bash
cd lotto-web/ios-native
```

### 2. Откройте проект в Xcode

```bash
open LPTTDiary.xcodeproj
```

### 3. Выберите симулятор

В Xcode toolbar:
- Нажмите на схему устройства
- Выберите **iPhone 15 Pro** (или любой другой)

### 4. Build & Run

```
⌘ + R
```

**Или:**
- Product → Run
- Кнопка ▶️ (Play)

---

## 📂 Структура проекта

```
LPTTDiary/
├── App/                    # Entry point
│   ├── LPTTDiaryApp.swift # @main
│   └── ContentView.swift  # Root view
│
├── Views/                  # Экраны (7 файлов)
│   ├── SplashScreen.swift # Загрузка
│   ├── LoginView.swift    # Вход
│   ├── StudentDashboard.swift
│   ├── GradesView.swift
│   ├── ScheduleView.swift
│   ├── NotesView.swift
│   ├── ProfileView.swift
│   └── TeacherDashboard.swift
│
├── Components/             # UI компоненты (9 файлов)
│   ├── MeshGradientBackground.swift
│   ├── FloatingParticlesView.swift
│   ├── AnimatedCard.swift
│   ├── GlassMorphismCard.swift
│   └── ...
│
├── ViewModels/             # Бизнес-логика (3 файла)
│   ├── AuthViewModel.swift
│   ├── GradesViewModel.swift
│   └── ScheduleViewModel.swift
│
├── Models/                 # Модели данных (4 файла)
│   ├── User.swift
│   ├── Grade.swift
│   ├── Schedule.swift
│   └── Note.swift
│
├── Services/               # Сервисы (2 файла)
│   ├── AuthService.swift
│   └── APIService.swift
│
└── Utils/                  # Утилиты (5 файлов)
    ├── Colors.swift       # Цвета и gradients
    ├── Typography.swift   # Система шрифтов
    ├── Animations.swift   # Анимации и transitions
    ├── Extensions.swift   # Расширения
    └── Gradients.swift    # Predefined gradients
```

---

## ⚙️ Конфигурация

### Build Settings

В Xcode перейдите: **Target → Build Settings**

**Основные настройки:**

| Setting | Value |
|---------|-------|
| **Bundle Identifier** | `ru.lptt.diary` |
| **Deployment Target** | `iOS 16.0` |
| **Swift Version** | `5.0` |
| **Build Configuration** | `Debug` / `Release` |

### Info.plist

Расположение: `LPTTDiary/Info.plist`

Основные ключи:
- `CFBundleName` — ЛПТТ Дневник
- `CFBundleDisplayName` — ЛПТТ Дневник
- `CFBundleIdentifier` — ru.lptt.diary
- `UILaunchScreen` — Launch screen config

---

## 🔧 Build Phases

### Compile Sources (24 файла)

Все `.swift` файлы должны быть добавлены.

**Проверка:** Target → Build Phases → Compile Sources

### Copy Bundle Resources

Должны быть:
- ✅ `Assets.xcassets`
- ✅ `Preview Content`
- ❌ **НЕ** `Info.plist` (частая ошибка!)

### Link Binary With Libraries

SwiftUI frameworks автоматически связываются.

---

## 🎨 Assets

### Assets.xcassets

Содержит:
- App Icon (1024x1024)
- Accent Color
- Colors (опционально)

### Preview Content

Для Xcode Previews:
```
Preview Content/
└── Preview Assets.xcassets
```

**Создание:**
1. File → New → File
2. Resource → Asset Catalog
3. Name: `Preview Assets`
4. Location: `Preview Content/`

---

## 🐛 Troubleshooting

### Ошибка: "Preview Content не найден"

```bash
cd LPTTDiary
mkdir -p "Preview Content"
```

Затем в Xcode создайте `Preview Assets.xcassets` внутри.

### Ошибка: "Info.plist duplicate"

**Build Phases → Copy Bundle Resources**

Удалите `Info.plist` из списка.

### Ошибка: "Cannot find X in scope"

Проверьте **Target Membership** файла:
1. Выберите файл
2. File Inspector (⌥⌘1)
3. Target Membership: ✅ LPTTDiary

### Проект не компилируется

**Clean Build:**
```
⌘ + Shift + K  (Clean Build Folder)
⌘ + B          (Build)
```

**Nuclear option:**
```bash
# Удалить DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData

# Restart Xcode
```

📖 **Полный список:** [Troubleshooting Guide](./TROUBLESHOOTING.md)

---

## 🧪 Тестирование

### Запуск тестов

```
⌘ + U
```

### Симуляторы

Рекомендуемые:
- iPhone 15 Pro (iOS 17)
- iPhone 14 Pro Max (iOS 16)
- iPad Pro 12.9" (iOS 16)

### Физическое устройство

1. Подключите iPhone через USB
2. В Xcode выберите ваше устройство
3. Может потребоваться Developer Certificate

---

## ⚡ Оптимизация

### Режим Release

Build Configuration → Release для максимальной производительности.

### Optimizations

Автоматически включены:
- Swift Optimization Level: `-O` (Optimize for Speed)
- Whole Module Optimization: Yes
- Dead Code Stripping: Yes

---

## 📖 Следующие шаги

- [Архитектура](./ARCHITECTURE.md) — Понять структуру
- [Компоненты](./COMPONENTS.md) — UI библиотека
- [Оптимизация](./OPTIMIZATION.md) — Performance tips

---

**Всё готово к разработке!** 🎉

[← Назад](../README.md)
