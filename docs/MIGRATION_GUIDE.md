# 🔄 Гайд по миграции на новую структуру

## Для пользователей, клонировавших старую версию

**Дата рефакторинга:** 16.10.2025  
**Ветка:** liquid-glass-redesign-2025

---

## ⚠️ Что изменилось

### 1. Удалено ~161 файл
- 40+ .md файлов из корня
- 73 файла из docs/archive/
- 40 неиспользуемых компонентов
- 5 старых версий site компонентов

### 2. Структура документации
- Старые гайды перемещены в `docs/guides-archived/`
- Создан профессиональный `README.md`
- Добавлен `docs/PROJECT_STRUCTURE.md`

### 3. Компоненты
- Активных компонентов: 43 (было 90+)
- Удалены дубликаты: MainSite, EnhancedMainSite, FullMainSite, etc.
- Текущий активный: `FinalMainSite.tsx`

---

## 🚀 Как обновиться

### Вариант 1: Свежее клонирование (рекомендуется)

```bash
# 1. Сделать backup текущей версии (если есть локальные изменения)
cp -r lotto-web lotto-web-backup

# 2. Удалить старую версию
rm -rf lotto-web

# 3. Клонировать заново
git clone https://github.com/icewhipe/lotto-web.git
cd lotto-web

# 4. Checkout нужной ветки
git checkout liquid-glass-redesign-2025

# 5. Установить зависимости
npm install
cd backend && npm install && cd ..

# 6. Запустить
npm run dev:all
```

### Вариант 2: Обновление существующего репозитория

```bash
# 1. Сохранить локальные изменения
git stash

# 2. Получить изменения
git fetch origin

# 3. Checkout ветки
git checkout liquid-glass-redesign-2025

# 4. Pull изменения
git pull origin liquid-glass-redesign-2025

# 5. Удалить node_modules
rm -rf node_modules backend/node_modules

# 6. Переустановить зависимости
npm install
cd backend && npm install && cd ..

# 7. Rebuild
npm run build

# 8. Восстановить локальные изменения (если нужно)
git stash pop
```

### Вариант 3: Только pull

```bash
# Если нет локальных изменений
git pull origin liquid-glass-redesign-2025

# Переустановить (на всякий случай)
npm install
cd backend && npm install && cd ..

# Rebuild
npm run build
```

---

## 🔍 Проверка после миграции

### 1. Структура файлов

```bash
# Должен быть только 1 .md в корне
ls -1 *.md
# Вывод: README.md

# Проверить компоненты
ls src/components/*.tsx
# Должно быть: FinalMainSite.tsx, Dashboard.tsx, LoginPage.tsx, etc.
# НЕ должно быть: MainSite.tsx, Hero.tsx, About.tsx, etc.
```

### 2. Build работает

```bash
npm run build
# Должно пройти успешно за ~8-9 секунд
```

### 3. Dev server запускается

```bash
npm run dev:all
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

---

## 🐛 Troubleshooting

### Проблема: "Module not found"

```bash
# Решение: Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
```

### Проблема: Build fails

```bash
# Решение: Очистить кэш
rm -rf dist node_modules/.vite
npm install
npm run build
```

### Проблема: Конфликты при pull

```bash
# Вариант 1: Сбросить к origin
git reset --hard origin/liquid-glass-redesign-2025

# Вариант 2: Разрешить конфликты вручную
git merge --abort
git pull --rebase origin liquid-glass-redesign-2025
```

### Проблема: Старые файлы остались

```bash
# Убедитесь что на правильной ветке
git branch
# Должно быть: * liquid-glass-redesign-2025

# Если нет, переключитесь
git checkout liquid-glass-redesign-2025
git pull origin liquid-glass-redesign-2025
```

---

## 📋 Checklist миграции

### Перед миграцией
- [ ] Сделан backup важных данных
- [ ] Закоммичены локальные изменения
- [ ] Записаны .env переменные

### Во время миграции
- [ ] Pull выполнен успешно
- [ ] node_modules переустановлены
- [ ] Build проходит без ошибок
- [ ] Dev server запускается

### После миграции
- [ ] Только README.md в корне
- [ ] FinalMainSite.tsx используется
- [ ] Все страницы открываются
- [ ] Нет консольных ошибок
- [ ] CSS уменьшился до ~83 KB

---

## 📊 Сравнение версий

### Старая структура

```
Root/
├── README.md
├── 1.md
├── COMPLETE_FINAL_REPORT.md
├── VISUAL_QA_COMPLETE.md
├── + 37 other .md files
├── src/
│   └── components/
│       ├── MainSite.tsx
│       ├── EnhancedMainSite.tsx
│       ├── FullMainSite.tsx
│       ├── ImprovedMainSite.tsx
│       ├── FinalMainSite.tsx
│       └── + 85 other components
└── docs/
    └── archive/ (73 files)
```

### Новая структура

```
Root/
├── README.md ✅
├── src/
│   └── components/
│       ├── FinalMainSite.tsx ✅
│       ├── Dashboard.tsx
│       ├── NotFound.tsx
│       └── + 40 active components only
└── docs/
    ├── PROJECT_STRUCTURE.md ✅
    ├── REFACTOR_COMPLETE.md ✅
    └── guides-archived/ (archived)
```

---

## 🔗 Полезные ссылки

- **README:** [README.md](../README.md)
- **Структура:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Отчёт о рефакторинге:** [REFACTOR_COMPLETE.md](REFACTOR_COMPLETE.md)
- **GitHub:** https://github.com/icewhipe/lotto-web

---

## 💡 FAQ

**Q: Куда делись старые инструкции?**  
A: Перемещены в `docs/guides-archived/` для истории.

**Q: Можно ли восстановить старые компоненты?**  
A: Да, через git history: `git show <commit>:path/to/file.tsx`

**Q: Почему удалено так много файлов?**  
A: Это были временные отчёты, статусы, дубликаты. Активный код сохранён.

**Q: Нужно ли что-то менять в коде?**  
A: Нет, импорты уже обновлены автоматически.

---

**💙 Миграция проста и безопасна!**

_Если проблемы - смотрите Troubleshooting или создайте Issue._

_Дата: 16.10.2025_
