# 🔧 Xcode Clean Build - Если ошибки не уходят

## Проблема:
Xcode иногда кэширует старые ошибки компиляции, даже если код уже исправлен.

## Решение:

### **1. Clean Build Folder (Самое важное!):**
```
⌘ + Shift + K  (или Product → Clean Build Folder)
```

### **2. Удалить DerivedData:**
```bash
# Вариант 1: Через Xcode
Xcode → Preferences → Locations → DerivedData → стрелочка → удалить папку

# Вариант 2: Через Terminal
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### **3. Перезапустить Xcode:**
```
1. Закрыть Xcode (⌘ + Q)
2. Открыть заново
3. Open project
```

### **4. Build снова:**
```
⌘ + B
```

---

## Если ошибки про Switch must be exhaustive:

Проверьте файл `StudentDashboard.swift` строки 349-365:

```swift
private var lessonTypeText: String {
    switch lesson.type {
    case .lecture: return "ЛК"
    case .practice: return "ПР"
    case .lab: return "ЛБ"
    case .seminar: return "СМ"  // ✅ ДОЛЖЕН БЫТЬ!
    }
}

private var lessonColor: Color {
    switch lesson.type {
    case .lecture: return Color.brandBlue
    case .practice: return Color(hex: "#10b981")
    case .lab: return Color.brandPurple
    case .seminar: return Color(hex: "#f59e0b")  // ✅ ДОЛЖЕН БЫТЬ!
    }
}
```

### **Если case .seminar отсутствует:**
```bash
# Обновить из git:
git pull origin feature/electronic-diary-optimization
git checkout ios-native/LPTTDiary/Views/StudentDashboard.swift
```

---

## Nuclear Option (если ничего не помогает):

```bash
# 1. Закрыть Xcode
# 2. Удалить DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData

# 3. Удалить build artifacts
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary
rm -rf build/

# 4. Git pull
git pull origin feature/electronic-diary-optimization

# 5. Открыть Xcode
open LPTTDiary.xcodeproj

# 6. Clean Build Folder
⌘ + Shift + K

# 7. Build
⌘ + B
```

---

## Проверка что файл обновлён:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary
grep -n "case .seminar" Views/StudentDashboard.swift

# Должно показать:
# 354:        case .seminar: return "СМ"
# 363:        case .seminar: return Color(hex: "#f59e0b")
```

---

## ✅ После Clean Build:

Все ошибки должны исчезнуть!

```
⌘ + B  →  ✅ Build Succeeded
```

**Если всё равно не работает - напиши мне!**
