# 🔧 Fix Info.plist Conflict

## ❌ ПРОБЛЕМА:

```
Target 'LPTTDiary' has process command with output Info.plist
Target 'LPTTDiary' has copy command from Info.plist to Info.plist
```

**Причина:** Info.plist добавлен в Build Phases дважды

---

## ✅ РЕШЕНИЕ (2 минуты):

### Шаг 1: Открыть Build Phases

1. В Xcode выбрать **LPTTDiary target** (синяя иконка)
2. Перейти на таб **Build Phases**

---

### Шаг 2: Удалить дубликат Info.plist

Найти секцию **"Copy Bundle Resources"**

Если там есть **Info.plist**:
1. Выбрать его
2. Нажать **`-`** (минус) внизу
3. Удалить

**Info.plist НЕ должен быть в Copy Bundle Resources!**

---

### Шаг 3: Проверить Build Settings

1. Перейти на таб **Build Settings**
2. Найти (через поиск): `Info.plist File`
3. Значение должно быть: **`LPTTDiary/Info.plist`**

Если пусто или неправильно:
- Кликнуть 2 раза
- Ввести: `LPTTDiary/Info.plist`

---

### Шаг 4: Clean & Build

```bash
⌘ + Shift + K  # Clean
⌘ + B          # Build
```

Должно скомпилироваться без ошибок! ✅

---

## 🎯 ЕСЛИ ВСЁ ЕЩЁ НЕ РАБОТАЕТ:

### Вариант A: Удалить и добавить заново

1. **Удалить Info.plist** из Project Navigator (правый клик → Delete → Remove Reference)
2. **Добавить обратно:**
   - File → Add Files to "LPTTDiary"...
   - Выбрать `Info.plist`
   - ⚠️ **НЕ ставить галочку** "Copy items if needed"
   - ✅ Поставить "Add to targets: LPTTDiary"
   - Add

---

### Вариант B: Проверить путь файла

В Project Navigator:
1. Выбрать **Info.plist**
2. Открыть **File Inspector** (⌥⌘1)
3. Проверить **Location**

Должно быть:
```
Relative to Group: Info.plist
Full Path: /Users/.../LPTTDiary/Info.plist
```

---

### Вариант C: Создать Info.plist заново

1. **Удалить старый** Info.plist
2. **Создать новый:**
   - File → New → File...
   - iOS → Resource → Property List
   - Name: `Info`
   - Create
3. **Скопировать содержимое** из `ios-native/LPTTDiary/Info.plist`

---

## 📋 ПРАВИЛЬНАЯ СТРУКТУРА:

```
Build Phases:
├── Dependencies          (пусто)
├── Compile Sources       (все .swift файлы)
├── Link Binary           (SwiftUI.framework и др.)
├── Copy Bundle Resources (Assets.xcassets, Preview Content)
└── Embed Frameworks      (если есть)

❌ Info.plist НЕ должен быть в Copy Bundle Resources!
```

```
Build Settings:
INFOPLIST_FILE = LPTTDiary/Info.plist ✅
```

---

## ⚡ БЫСТРОЕ РЕШЕНИЕ:

**В 90% случаев помогает:**

1. Build Phases → Copy Bundle Resources
2. Найти Info.plist
3. Удалить (минус)
4. Clean (⌘⇧K)
5. Build (⌘B)
6. Run (⌘R)

**Готово!** 🎉

---

## 🔍 ПРОВЕРКА:

После исправления:

```bash
⌘ + B  # Build
```

Должно показать:
```
✅ Build Succeeded
```

Без ошибок про Info.plist!

---

## 📱 ЗАПУСК:

```bash
⌘ + R
```

Приложение запустится на симуляторе! 🍎

---

**Время исправления:** 2 минуты  
**Сложность:** Лёгкая  
**Результат:** Работающий проект!
