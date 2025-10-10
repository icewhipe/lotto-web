# 🔧 Частые проблемы Xcode и решения

## 1️⃣ Info.plist Conflict ❌

**Ошибка:**
```
has process command with output Info.plist
has copy command from Info.plist to Info.plist
```

**Решение:**
- Build Phases → Copy Bundle Resources
- Удалить Info.plist (если есть)
- Clean (⌘⇧K) + Build (⌘B)

📖 **Детально:** FIX_INFO_PLIST.md

---

## 2️⃣ Duplicate Symbols ❌

**Ошибка:**
```
duplicate symbol '_$s10LPTTDiary...'
```

**Причина:** Файл добавлен в target 2 раза

**Решение:**
1. Project Navigator → выбрать дублирующийся файл
2. File Inspector (⌥⌘1)
3. Target Membership → убрать лишнюю галочку

---

## 3️⃣ Cannot find 'X' in scope ❌

**Ошибка:**
```
Cannot find 'User' in scope
```

**Причина:** Файл не добавлен в target

**Решение:**
1. Выбрать файл (например User.swift)
2. File Inspector (⌥⌘1)
3. Target Membership → ✅ LPTTDiary

---

## 4️⃣ No such module 'SwiftUI' ❌

**Ошибка:**
```
No such module 'SwiftUI'
```

**Причина:** Deployment Target < iOS 13

**Решение:**
- Target → General
- Minimum Deployments → **iOS 16.0** ✅

---

## 5️⃣ Signing Error ❌

**Ошибка:**
```
Signing for "LPTTDiary" requires a development team
```

**Решение:**
- Target → Signing & Capabilities
- Team → Выбрать свой Apple ID
- или ✅ Automatically manage signing

---

## 6️⃣ Simulator не запускается ❌

**Проблема:** Серый экран или краш

**Решение:**
```
1. Xcode → Window → Devices and Simulators
2. Удалить симулятор
3. Создать новый iPhone 15 Pro
4. Или: sudo killall -9 com.apple.CoreSimulator.CoreSimulatorService
```

---

## 7️⃣ DerivedData проблемы ❌

**Симптомы:** Странные ошибки компиляции

**Решение:**
```bash
# Закрыть Xcode
rm -rf ~/Library/Developer/Xcode/DerivedData

# Открыть Xcode
# Clean Build Folder (⌘⇧K)
# Build (⌘B)
```

---

## 8️⃣ Assets.xcassets отсутствует ❌

**Ошибка:**
```
Could not find resource 'Assets.xcassets'
```

**Решение:**
```
1. File → New → File...
2. Resource → Asset Catalog
3. Name: Assets
4. Create
```

---

## 9️⃣ Preview не работает ❌

**Проблема:** "#Preview" показывает ошибку

**Решение:**
- Editor → Canvas → ✅ Show Canvas
- Или заменить на:
```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

---

## 🔟 Медленная компиляция ❌

**Проблема:** Build занимает >1 минуты

**Решение:**
```
1. Build Settings → Build Options
   - Compilation Mode → Incremental
   - Debug Information Format → DWARF

2. Build Settings → Swift Compiler
   - Optimization Level → No Optimization [-Onone]
```

---

## 💡 ОБЩИЕ СОВЕТЫ:

### Всегда помогает:
1. **Clean Build Folder** (⌘⇧K)
2. **Quit Xcode** полностью
3. **Delete DerivedData**
4. **Restart Xcode**

### Проверь:
- ✅ Все файлы в target
- ✅ Deployment Target = iOS 16.0
- ✅ Swift Language Version = Swift 5
- ✅ Bundle Identifier уникален

### Debug:
- Открыть Report Navigator (⌘9)
- Последний build → Show
- Читать полный лог ошибки

---

**Нужна помощь?**
1. FIX_INFO_PLIST.md - Info.plist проблемы
2. БЫСТРЫЙ_СТАРТ.md - Создание проекта
3. КАК_СОЗДАТЬ_XCODE_ПРОЕКТ.md - Детальная инструкция
