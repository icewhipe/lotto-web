# ✅ ЧЕКЛИСТ ДЛЯ УСПЕШНОЙ СБОРКИ

## 📋 ПЕРЕД ЗАПУСКОМ

### 1. Структура файлов ✅
```
LPTTDiary/
├── App/
│   ├── LPTTDiaryApp.swift
│   └── ContentView.swift
├── Views/ (7 файлов)
├── Models/ (4 файла)
├── ViewModels/ (3 файла)
├── Services/ (2 файла)
├── Components/ (9 файлов)
├── Utils/ (4 файла)
├── Assets.xcassets
├── Preview Content/
│   └── Preview Assets.xcassets
└── Info.plist
```

### 2. Создать Preview Content
```bash
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary/LPTTDiary
mkdir -p "Preview Content"
```

В Xcode:
- File → New → File → Asset Catalog
- Name: Preview Assets
- Location: Preview Content/
- Create

### 3. Проверить Build Phases

Target → Build Phases:

**Compile Sources (24 файла):**
- ✅ Все .swift файлы

**Copy Bundle Resources:**
- ✅ Assets.xcassets
- ✅ Preview Content
- ❌ НЕТ Info.plist!

### 4. Проверить Build Settings

```
INFOPLIST_FILE = LPTTDiary/Info.plist
DEVELOPMENT_ASSET_PATHS = "LPTTDiary/Preview Content"
PRODUCT_BUNDLE_IDENTIFIER = ru.lptt.diary
IPHONEOS_DEPLOYMENT_TARGET = 16.0
SWIFT_VERSION = 5.0
```

### 5. Target Membership

Для КАЖДОГО .swift файла:
- File Inspector (⌥⌘1)
- Target Membership: ✅ LPTTDiary (1 галочка)

---

## 🔧 ЕСЛИ ОШИБКИ

### Error: Preview Content не существует
```bash
mkdir -p "Preview Content"
# Создать Preview Assets.xcassets через Xcode
```

### Error: Info.plist duplicate
```
Build Phases → Copy Bundle Resources
Удалить Info.plist
```

### Error: Cannot find 'X' in scope
```
Проверить Target Membership файла
Должна быть 1 галочка LPTTDiary
```

### Error: Duplicate symbols
```
Файл добавлен 2 раза
Убрать лишние галочки в Target Membership
```

---

## ⚡ QUICK FIX (Nuclear Option)

```bash
# 1. Закрыть Xcode
# 2. Удалить DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData

# 3. Создать Preview Content
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary/LPTTDiary
mkdir -p "Preview Content"

# 4. Открыть Xcode
# 5. Clean Build Folder (⌘⌥⇧K)
# 6. Build (⌘B)
```

---

## ✅ BUILD SUCCESS

Должно показать:
```
✅ Build Succeeded
```

Затем:
```
⌘ + R  (Run)
```

Приложение запустится! 🍎

---

## 📱 ТЕСТ

1. Запуск приложения
2. Login screen появился
3. Войти: student@lptt.ru / 123456
4. Dashboard загрузился
5. Все анимации работают
6. Particles летают
7. Карточки с glow
8. Все экраны открываются

---

## 🎯 ФИНАЛЬНАЯ ПРОВЕРКА

- [ ] Preview Content создан
- [ ] Preview Assets.xcassets внутри
- [ ] Assets.xcassets в корне
- [ ] Info.plist не в Copy Bundle Resources
- [ ] Все файлы с 1 галочкой Target
- [ ] Build Settings правильные
- [ ] Clean выполнен
- [ ] Build успешен
- [ ] Run работает
- [ ] Login screen показывается
- [ ] Можно войти
- [ ] Dashboard работает

---

**Все чеки ✅ → Готово к использованию!** 🎉
