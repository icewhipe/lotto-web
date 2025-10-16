# 🔧 Исправление Git конфликтов

## ❌ Проблема
```
error: Pulling is not possible because you have unmerged files.
```

У вас есть неразрешённые конфликты после merge или pull.

---

## ✅ Решение (шаг за шагом)

### Шаг 1: Проверьте статус
```bash
git status
```

Это покажет какие файлы в конфликте (отмечены как `unmerged`).

---

### Шаг 2: Посмотрите конфликтные файлы
```bash
# Покажет список файлов в конфликте
git diff --name-only --diff-filter=U
```

---

### Шаг 3: Выберите стратегию

#### Вариант А: Сохранить свои изменения (ваша версия)
```bash
# Для ВСЕХ файлов - взять вашу версию
git checkout --ours .
git add .
git commit -m "fix: resolve conflicts - keep local changes"
```

#### Вариант Б: Взять версию из ветки (их версия)
```bash
# Для ВСЕХ файлов - взять их версию
git checkout --theirs .
git add .
git commit -m "fix: resolve conflicts - accept remote changes"
```

#### Вариант В: Отменить текущий merge
```bash
# Вернуться к состоянию до merge
git merge --abort
```

---

### Шаг 4: После разрешения конфликтов

```bash
# Обновить информацию о ветках
git fetch origin

# Переключиться на новую ветку
git checkout liquid-glass-redesign-2025
```

Если ветка не видна, попробуйте:
```bash
git checkout -b liquid-glass-redesign-2025 origin/liquid-glass-redesign-2025
```

---

## 🚀 Быстрое решение (рекомендуется)

Если вы хотите просто получить новую ветку с редизайном:

```bash
# 1. Отменить текущий merge
git merge --abort

# 2. Сохранить ваши изменения (если нужны)
git stash

# 3. Обновить из remote
git fetch origin

# 4. Переключиться на новую ветку
git checkout -b liquid-glass-redesign-2025 origin/liquid-glass-redesign-2025

# 5. Если нужно вернуть ваши изменения
git stash pop
```

---

## 🆘 Если ничего не помогает

### Сбросить всё к чистому состоянию:

```bash
# ⚠️ ВНИМАНИЕ: Это удалит ВСЕ локальные изменения!
# Убедитесь что вы сохранили важные файлы

# 1. Отменить merge
git merge --abort

# 2. Сбросить всё
git reset --hard HEAD

# 3. Очистить неотслеживаемые файлы
git clean -fd

# 4. Обновить из remote
git fetch origin

# 5. Переключиться на новую ветку
git checkout -b liquid-glass-redesign-2025 origin/liquid-glass-redesign-2025
```

---

## 📋 Проверка после исправления

```bash
# Должно быть чисто
git status

# Должны быть на новой ветке
git branch

# Должны видеть новые файлы
ls -la | grep -E "(LIQUID|QA|НАЧАЛО|ФИНАЛЬНЫЙ)"
```

---

## 💡 Что делать дальше

После успешного переключения на `liquid-glass-redesign-2025`:

```bash
# 1. Установить зависимости (если нужно)
npm install
cd backend && npm install && cd ..

# 2. Запустить проект
npm run dev:all

# 3. Открыть в браузере
# http://localhost:5173
```

---

## 🔍 Понимание команд

### `git merge --abort`
- Отменяет текущий merge
- Возвращает к состоянию до merge
- **Безопасно** - не удаляет ваши файлы

### `git stash`
- Сохраняет ваши изменения во временное хранилище
- Очищает рабочую директорию
- `git stash pop` - вернуть изменения обратно

### `git reset --hard`
- ⚠️ **ОПАСНО** - удаляет все локальные изменения
- Возвращает к последнему commit
- Используйте только если уверены!

### `git fetch origin`
- Обновляет информацию о ветках с GitHub
- Не меняет ваши файлы
- **Безопасно**

---

## 📞 Нужна помощь?

Отправьте output этих команд:
```bash
git status
git log --oneline -5
git branch -a
```

---

_Создано: 2025-10-16_  
_Для: MacBook-Air--Yaroslav_
