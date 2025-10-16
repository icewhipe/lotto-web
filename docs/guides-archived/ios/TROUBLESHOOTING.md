# 🐛 iOS Troubleshooting

Решение частых проблем при разработке iOS приложения.

---

## 🔍 Частые ошибки

### 1. Preview Content не найден

**Ошибка:**
```
One of the paths in DEVELOPMENT_ASSET_PATHS does not exist: 
.../LPTTDiary/Preview Content
```

**Решение:**

```bash
cd LPTTDiary
mkdir -p "Preview Content"
```

Затем в Xcode:
1. File → New → File
2. Resource → Asset Catalog
3. Name: `Preview Assets`
4. Location: `Preview Content/`
5. Create

**Важно:** Добавить в проект с "Create folder references"!

---

### 2. Info.plist Duplicate

**Ошибка:**
```
Target has process command with output Info.plist
Target has copy command from Info.plist to Info.plist
```

**Решение:**

1. Target → Build Phases
2. Copy Bundle Resources
3. Найдите `Info.plist`
4. Нажмите `-` (удалить)

`Info.plist` должен быть только в **Build Settings**, НЕ в **Copy Bundle Resources**.

---

### 3. Cannot find 'X' in scope

**Ошибка:**
```
Cannot find 'AnimatedCard' in scope
Cannot find 'FloatingParticlesView' in scope
```

**Решение:**

Проверьте **Target Membership**:
1. Выберите файл (AnimatedCard.swift)
2. File Inspector (⌥⌘1)
3. Target Membership: ✅ LPTTDiary (одна галочка!)

**Проверка всех файлов:**
- App/ (2 файла) — ✅
- Views/ (7 файлов) — ✅
- Components/ (9 файлов) — ✅
- ViewModels/ (3 файла) — ✅
- Models/ (4 файла) — ✅
- Services/ (2 файла) — ✅
- Utils/ (5 файлов) — ✅

---

### 4. Switch must be exhaustive

**Ошибка:**
```
Switch must be exhaustive
```

**Причина:** Не все случаи enum обработаны.

**Решение:**

```swift
// ❌ Плохо
switch lessonType {
case .lecture: return "ЛК"
case .practice: return "ПР"
case .lab: return "ЛБ"
// Забыли .seminar!
}

// ✅ Хорошо
switch lessonType {
case .lecture: return "ЛК"
case .practice: return "ПР"
case .lab: return "ЛБ"
case .seminar: return "СМ"  // Все случаи!
}
```

---

### 5. No color named 'Primary' found

**Ошибка:**
```
No color named 'Primary' found in asset catalog
```

**Решение:**

В `Colors.swift`:
```swift
// ❌ Плохо
static let primary = Color("Primary", bundle: nil) ?? Color.purple

// ✅ Хорошо
static let primary = Color.purple
```

---

### 6. Build Succeeded но старые ошибки

**Проблема:** Xcode кэширует старые ошибки компиляции.

**Решение (поэтапно):**

**Шаг 1: Clean Build Folder**
```
⌘ + Shift + K
```

**Шаг 2: Restart Xcode**
```
⌘ + Q (закрыть)
Открыть заново
```

**Шаг 3: Delete DerivedData**
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

**Шаг 4: Build**
```
⌘ + B
```

---

### 7. Module X was created for incompatible target

**Ошибка:**
```
Module compiled with Swift 5.x cannot be imported by Swift 5.y
```

**Решение:**

1. Clean Build Folder (⌘ + Shift + K)
2. Delete DerivedData
3. Restart Xcode
4. Build

---

### 8. Circular reference expanding macro

**Ошибка:**
```
Circular reference expanding freestanding macro 'Preview'
```

**Причина:** `#Preview` macro не поддерживается в Swift 5.9

**Решение:**

```swift
// ❌ Swift 6.0+
#Preview {
    MyView()
}

// ✅ Swift 5.9
struct MyView_Previews: PreviewProvider {
    static var previews: some View {
        MyView()
    }
}
```

---

### 9. Extra/Missing arguments in call

**Ошибка:**
```
Extra argument 'pages' in call
Missing argument 'date'
```

**Решение:** Проверьте сигнатуру initializer

```swift
// Модель
struct Note {
    init(
        title: String,
        description: String,  // Порядок важен!
        subject: String,
        author: String,
        authorId: String,
        date: Date,           // Обязательный
        rating: Double,
        downloads: Int,
        size: String,
        fileUrl: String       // String, не String?
    )
}

// ✅ Правильный вызов
Note(
    title: "Title",
    description: "Desc",
    subject: "Math",
    author: "Author",
    authorId: "123",
    date: Date(),         // ✅
    rating: 0.0,
    downloads: 0,
    size: "1 MB",
    fileUrl: ""           // ✅ не nil
)
```

---

### 10. Simulator не запускается

**Проблема:** Симулятор висит на splash screen.

**Решение:**

1. Остановить (⌘ + .)
2. Simulator → Device → Erase All Content and Settings
3. Run снова (⌘ + R)

---

## 🔧 Общие решения

### Clean Build (всегда первое что пробовать!)

```
⌘ + Shift + K
```

### Restart Xcode

```
⌘ + Q
Открыть заново
```

### Delete DerivedData

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### Reset Package Cache

```
File → Packages → Reset Package Caches
```

### Check Git

```bash
# Убедитесь что код обновлён
git pull origin feature/electronic-diary-optimization

# Проверьте статус
git status
```

---

## 📋 Чеклист перед Build

### Файловая структура
- [ ] `LPTTDiary/` папка существует
- [ ] `Preview Content/` создана
- [ ] `Preview Assets.xcassets` внутри
- [ ] `Assets.xcassets` в корне
- [ ] `Info.plist` есть

### Build Settings
- [ ] `INFOPLIST_FILE = LPTTDiary/Info.plist`
- [ ] `DEVELOPMENT_ASSET_PATHS = "LPTTDiary/Preview Content"`
- [ ] `PRODUCT_BUNDLE_IDENTIFIER = ru.lptt.diary`
- [ ] `IPHONEOS_DEPLOYMENT_TARGET = 16.0`
- [ ] `SWIFT_VERSION = 5.0`

### Build Phases
- [ ] Compile Sources: 32 файла
- [ ] Copy Bundle Resources: `Assets.xcassets`, `Preview Content`
- [ ] Copy Bundle Resources: ❌ НЕТ `Info.plist`

### Target Membership
- [ ] Все `.swift` файлы с 1 галочкой
- [ ] Нет дублирующихся галочек

---

## 🚨 Emergency Fixes

### Nuclear Option (если ничего не помогает)

```bash
# 1. Закрыть Xcode
⌘ + Q

# 2. Удалить всё
rm -rf ~/Library/Developer/Xcode/DerivedData
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary
rm -rf build/

# 3. Git hard reset
git fetch origin
git reset --hard origin/feature/electronic-diary-optimization

# 4. Открыть Xcode
open LPTTDiary.xcodeproj

# 5. Triple clean
⌘ + Shift + K  (Clean Build Folder)
⌘ + Shift + K  (ещё раз!)
⌘ + Shift + K  (и ещё!)

# 6. Build
⌘ + B
```

**Это должно помочь в 99% случаев!**

---

## 💬 Получить помощь

### Если проблема не решена:

1. **Проверьте Issues:** [GitHub Issues](https://github.com/icewhipe/lotto-web/issues)
2. **Создайте Issue** с описанием:
   - Полный текст ошибки
   - Скриншот
   - Xcode версия
   - macOS версия
   - Что уже пробовали

3. **Telegram:** [@lptt_dev](https://t.me/lptt_dev)

---

## 📚 Дополнительно

- [Setup Guide](./SETUP.md)
- [Optimization Guide](./OPTIMIZATION.md)
- [Architecture](./ARCHITECTURE.md)

---

[← Назад](../README.md)
