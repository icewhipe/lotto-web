# ⚡ БЫСТРОЕ ИСПРАВЛЕНИЕ - 2 МИНУТЫ

## 🔧 Твоя проблема: Preview Content отсутствует

---

## ✅ РЕШЕНИЕ (Копируй и выполняй):

### Шаг 1: Terminal (30 сек)
```bash
cd /Users/vasiliidyahenko/Documents/GitHub/LPTTDiary/LPTTDiary
mkdir -p "Preview Content"
```

### Шаг 2: В Xcode (1 минута)

**A) Создать Preview Assets:**
1. File → New → File...
2. Resource → Asset Catalog
3. Save As: `Preview Assets`
4. Where: Выбрать папку **Preview Content**
5. Create

**B) Добавить Preview Content в проект:**
1. В Finder найти папку `Preview Content`
2. Перетащить в Xcode Project Navigator
3. ✅ Create folder references (синяя папка)
4. ✅ Add to targets: LPTTDiary
5. Add

**C) Проверить Build Phases:**
1. Target → Build Phases
2. Copy Bundle Resources
3. Если есть `Info.plist` → Удалить (-)

### Шаг 3: Build (30 сек)
```
⌘ + Shift + K  (Clean)
⌘ + B          (Build)
⌘ + R          (Run)
```

---

## 🎯 Должно получиться:

```
LPTTDiary/
├── App/
├── Views/
├── Models/
├── ...
├── Assets.xcassets              ✅
├── Info.plist                   ✅
└── Preview Content/             ✅ Создали!
    └── Preview Assets.xcassets  ✅ Создали!
```

---

## 🚀 Готово!

```
⌘ + R
```

Войти: `student@lptt.ru` / `123456`

---

**Не работает?** → `FIX_ALL_BUGS.md` (детальная инструкция)
