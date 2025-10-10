# 🍎 Как создать Xcode проект для ЛПТТ Дневник

## ⚠️ ВАЖНО: `.xcodeproj` файл поврежден!

**Проблема:** Xcode не может открыть `.pbxproj` файл из-за неправильного формата.

**Решение:** Создать проект вручную в Xcode (5 минут!)

---

## 🚀 СОЗДАНИЕ ПРОЕКТА В XCODE (ШАГ ЗА ШАГОМ)

### **Шаг 1: Создать новый проект**

1. Открыть **Xcode**
2. **File → New → Project...**
3. Выбрать **iOS → App**
4. Нажать **Next**

---

### **Шаг 2: Настроить проект**

**Project Name:** `LPTTDiary`  
**Team:** Ваш Apple Developer Team (или оставить None)  
**Organization Identifier:** `ru.lptt`  
**Bundle Identifier:** `ru.lptt.diary`  
**Interface:** **SwiftUI** ✅  
**Language:** **Swift** ✅  
**Storage:** None  
**Include Tests:** ❌ (снять галочку)

Нажать **Next**

---

### **Шаг 3: Выбрать место сохранения**

1. Выбрать папку: `/Users/vasiliidyahenko/Documents/GitHub/lotto-web/ios-native/`
2. **Create Git repository:** ❌ (снять галочку, т.к. уже есть)
3. Нажать **Create**

---

### **Шаг 4: Добавить все Swift файлы**

#### 4.1. Удалить дефолтные файлы:
- Удалить `ContentView.swift` (мы заменим его)
- Удалить `LPTTDiaryApp.swift` (тоже заменим)

#### 4.2. Добавить наши файлы:

**Метод 1: Через Finder (проще)**
1. В Finder открыть: `ios-native/LPTTDiary/`
2. Перетащить **все папки** в Xcode Project Navigator:
   - App/
   - Views/
   - Models/
   - ViewModels/
   - Services/
   - Components/
   - Utils/

3. В диалоге выбрать:
   - ✅ **Copy items if needed**
   - ✅ **Create groups**
   - ✅ **Add to targets: LPTTDiary**

**Метод 2: Через Xcode**
1. В Xcode: **File → Add Files to "LPTTDiary"...**
2. Выбрать папку `ios-native/LPTTDiary/`
3. Отметить все папки (App, Views, Models, etc.)
4. Options:
   - ✅ **Copy items if needed**
   - ✅ **Create groups**
   - ✅ **Add to targets: LPTTDiary**
5. Нажать **Add**

---

### **Шаг 5: Настроить Target**

1. Выбрать **LPTTDiary target** в Project Navigator
2. **General tab:**
   - **Display Name:** `ЛПТТ Дневник`
   - **Bundle Identifier:** `ru.lptt.diary`
   - **Version:** `1.0`
   - **Build:** `1`
   - **Minimum Deployments:** `iOS 16.0`

3. **Signing & Capabilities:**
   - **Automatically manage signing:** ✅
   - **Team:** Ваш team

---

### **Шаг 6: Настроить Info.plist**

1. В Project Navigator найти `Info.plist`
2. Заменить содержимое на наш файл:
   - Удалить старый `Info.plist`
   - Перетащить наш `Info.plist` из `ios-native/LPTTDiary/`

Или скопировать эти ключи:
```xml
CFBundleDisplayName = ЛПТТ Дневник
UIApplicationSceneManifest → UIApplicationSupportsMultipleScenes = YES
UISupportedInterfaceOrientations = [UIInterfaceOrientationPortrait]
```

---

### **Шаг 7: Проверить структуру**

Ваш Project Navigator должен выглядеть так:

```
LPTTDiary/
├── App/
│   ├── LPTTDiaryApp.swift
│   └── ContentView.swift
├── Views/
│   ├── LoginView.swift
│   ├── StudentDashboard.swift
│   ├── GradesView.swift
│   ├── ScheduleView.swift
│   ├── NotesView.swift
│   ├── ProfileView.swift
│   └── TeacherDashboard.swift
├── Models/
│   ├── User.swift
│   ├── Grade.swift
│   ├── Schedule.swift
│   └── Note.swift
├── ViewModels/
│   ├── AuthViewModel.swift
│   ├── GradesViewModel.swift
│   └── ScheduleViewModel.swift
├── Services/
│   ├── AuthService.swift
│   └── APIService.swift
├── Components/
│   ├── StatCard.swift
│   ├── LessonCard.swift
│   └── GradientButton.swift
├── Utils/
│   ├── Colors.swift
│   ├── Gradients.swift
│   └── Extensions.swift
├── Assets.xcassets
├── Preview Content/
└── Info.plist
```

---

### **Шаг 8: Запустить!**

1. Выбрать симулятор: **iPhone 15 Pro**
2. Нажать **⌘R** или **Play ▶️**
3. Дождаться компиляции (первый раз ~30 сек)
4. Войти:
   - `student@lptt.ru` / `123456`
   - `teacher@lptt.ru` / `123456`

---

## 🎯 АЛЬТЕРНАТИВНЫЙ СПОСОБ (CLI)

Если не хотите создавать вручную, можно через терминал:

```bash
cd ios-native

# Создать проект через xcodegen (если установлен)
xcodegen generate

# Или через Swift Package Manager
swift package init --type executable
```

**Но проще через GUI Xcode!** ☝️

---

## 🔧 ЕСЛИ ЕСТЬ ОШИБКИ КОМПИЛЯЦИИ

### Ошибка 1: "Cannot find 'X' in scope"
**Решение:** Проверить, что все файлы добавлены в target (галочка в Inspector)

### Ошибка 2: "No such module 'SwiftUI'"
**Решение:** Проверить Deployment Target (должен быть iOS 16.0+)

### Ошибка 3: Duplicate symbols
**Решение:** Убедиться, что файлы не дублируются (каждый файл 1 раз)

---

## 📝 ВАЖНЫЕ НАСТРОЙКИ

### Build Settings:
```
SWIFT_VERSION = 5.9
IPHONEOS_DEPLOYMENT_TARGET = 16.0
PRODUCT_BUNDLE_IDENTIFIER = ru.lptt.diary
PRODUCT_NAME = $(TARGET_NAME)
```

### Capabilities (опционально):
- Push Notifications (для будущего)
- Background Modes (для будущего)
- Sign In with Apple (для будущего)

---

## ✅ ПРОВЕРКА РАБОТОСПОСОБНОСТИ

После создания проекта:

1. **⌘B** - Build (должен пройти успешно)
2. **⌘R** - Run (запустить на симуляторе)
3. Увидеть Login screen с фиолетовым градиентом
4. Войти и увидеть Dashboard

---

## 🎉 ГОТОВО!

Теперь у вас есть **рабочий Xcode проект**!

**Всё работает:**
- ✅ 7 экранов SwiftUI
- ✅ MVVM архитектура
- ✅ Navigation
- ✅ Mock данные
- ✅ Gradient дизайн

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- **Swift Guide:** `ios-native/SWIFT_APP_GUIDE.md`
- **README:** `ios-native/README.md`
- **Project Structure:** Все файлы в `ios-native/LPTTDiary/`

---

**Время создания:** 5-10 минут  
**Сложность:** Лёгкая  
**Результат:** Полноценный Swift проект! 🍎
