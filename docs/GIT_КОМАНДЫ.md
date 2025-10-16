# 📦 Git команды вместо GitHub Desktop

## 🔄 Аналоги действий из GitHub Desktop

---

## 1️⃣ ЗАБРАТЬ ИЗМЕНЕНИЯ (Pull)

### GitHub Desktop:
- Нажать кнопку **"Fetch origin"**
- Потом **"Pull origin"**

### Terminal:
```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Забрать изменения с GitHub
git pull origin feature/electronic-diary-optimization
```

---

## 2️⃣ СБРОСИТЬ ЛОКАЛЬНЫЕ ИЗМЕНЕНИЯ (Discard changes)

### GitHub Desktop:
- Правый клик на файл → **"Discard changes"**
- Или **"Discard all changes"** для всех файлов

### Terminal:
```bash
# Сбросить ВСЕ локальные изменения
git reset --hard

# Сбросить изменения в конкретном файле
git checkout -- backend/src/server.ts
```

---

## 3️⃣ СДЕЛАТЬ КОММИТ (Commit)

### GitHub Desktop:
- Написать сообщение коммита внизу
- Нажать **"Commit to feature/electronic-diary-optimization"**

### Terminal:
```bash
# Добавить все изменения
git add .

# Или конкретный файл
git add backend/src/server.ts

# Сделать коммит
git commit -m "fix: исправил backend"
```

---

## 4️⃣ ОТПРАВИТЬ НА GITHUB (Push)

### GitHub Desktop:
- Нажать кнопку **"Push origin"**

### Terminal:
```bash
# Отправить изменения на GitHub
git push origin feature/electronic-diary-optimization
```

---

## 5️⃣ ПРОВЕРИТЬ СТАТУС (Changes)

### GitHub Desktop:
- Видишь список изменённых файлов слева

### Terminal:
```bash
# Посмотреть какие файлы изменились
git status

# Посмотреть ЧТО именно изменилось
git diff

# Посмотреть изменения в конкретном файле
git diff backend/src/server.ts
```

---

## 6️⃣ ПОСМОТРЕТЬ ИСТОРИЮ (History)

### GitHub Desktop:
- Вкладка **"History"** — видишь список коммитов

### Terminal:
```bash
# Посмотреть последние 10 коммитов
git log --oneline -10

# Посмотреть подробно
git log

# Посмотреть с графиком веток
git log --oneline --graph --all
```

---

## 7️⃣ ПЕРЕКЛЮЧИТЬ ВЕТКУ (Switch branch)

### GitHub Desktop:
- Вверху выбрать ветку из списка

### Terminal:
```bash
# Посмотреть все ветки
git branch -a

# Переключиться на ветку
git checkout feature/electronic-diary-optimization

# Создать новую ветку и переключиться
git checkout -b feature/new-feature
```

---

## 8️⃣ СИНХРОНИЗИРОВАТЬ ВСЁ (Fetch + Pull)

### GitHub Desktop:
- Нажать **"Fetch origin"** — проверить обновления
- Потом **"Pull origin"** — забрать обновления

### Terminal:
```bash
# Проверить есть ли обновления
git fetch origin

# Забрать обновления
git pull origin feature/electronic-diary-optimization
```

---

## 🎯 ТИПИЧНЫЕ СЦЕНАРИИ

### Сценарий 1: Забрать новые изменения из GitHub

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Проверить что изменилось на GitHub
git fetch origin

# Забрать изменения
git pull origin feature/electronic-diary-optimization
```

---

### Сценарий 2: Сбросить всё и забрать чистую версию с GitHub

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Сбросить все локальные изменения
git reset --hard

# Забрать чистую версию с GitHub
git pull origin feature/electronic-diary-optimization
```

---

### Сценарий 3: Сохранить свои изменения и отправить на GitHub

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Посмотреть что изменилось
git status

# Добавить все изменения
git add .

# Сделать коммит
git commit -m "fix: исправил backend"

# Отправить на GitHub
git push origin feature/electronic-diary-optimization
```

---

### Сценарий 4: Решить конфликт при Pull

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Попытка забрать изменения
git pull origin feature/electronic-diary-optimization

# Если конфликт — проще всего сбросить
git reset --hard
git pull origin feature/electronic-diary-optimization
```

---

## 🔧 ПОЛЕЗНЫЕ КОМАНДЫ

```bash
# Где я нахожусь?
pwd

# На какой ветке я?
git branch

# Какие файлы изменились?
git status

# ЧТО именно изменилось?
git diff

# История коммитов
git log --oneline -10

# Отменить последний коммит (вернуться на шаг назад)
git reset --soft HEAD~1

# Посмотреть удалённый репозиторий
git remote -v

# Посмотреть все ветки (включая удалённые)
git branch -a

# Очистить кэш git
git clean -fd
```

---

## 🚀 ТВой РАБОЧИЙ ПРОЦЕСС

### Каждый день перед работой:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Забрать последние изменения
git pull origin feature/electronic-diary-optimization

# Запустить проект
npm start
```

---

### Если я (AI) внёс изменения в GitHub:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Сбросить твои локальные изменения
git reset --hard

# Забрать мои изменения
git pull origin feature/electronic-diary-optimization

# Запустить
npm start
```

---

### Если хочешь сохранить свои изменения:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Посмотреть что изменил
git status

# Добавить всё
git add .

# Сделать коммит
git commit -m "описание что сделал"

# Отправить на GitHub
git push origin feature/electronic-diary-optimization
```

---

## 🎯 КРАТКАЯ ШПАРГАЛКА

| Действие | GitHub Desktop | Terminal |
|----------|----------------|----------|
| **Забрать изменения** | Fetch + Pull | `git pull origin feature/electronic-diary-optimization` |
| **Сбросить всё** | Discard all changes | `git reset --hard` |
| **Сохранить изменения** | Commit + Push | `git add . && git commit -m "..." && git push` |
| **Посмотреть статус** | Changes tab | `git status` |
| **История** | History tab | `git log --oneline -10` |
| **Переключить ветку** | Dropdown вверху | `git checkout branch-name` |

---

## 💡 РЕКОМЕНДАЦИЯ ДЛЯ ТЕБЯ

Когда я (AI) вношу изменения в твой проект:

```bash
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# 1. Сбрось свои локальные изменения
git reset --hard

# 2. Забери мои изменения
git pull origin feature/electronic-diary-optimization

# 3. Запусти проект
npm start
```

**Это эквивалент:**
- GitHub Desktop → **Discard all changes**
- GitHub Desktop → **Pull origin**

---

## ✅ ИТОГО

Вместо GitHub Desktop используй:

```bash
# Перейти в папку проекта
cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

# Забрать изменения
git pull origin feature/electronic-diary-optimization

# Запустить
npm start
```

**Вот и всё! Просто и быстро! 🚀**
