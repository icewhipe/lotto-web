# 🍎 Инструкция по установке и запуску на macOS

Подробная инструкция для компиляции и запуска сайта ЛПТТ на вашем Mac.

---

## 📋 Шаг 1: Установка необходимых программ

### 1.1 Установите Homebrew (если ещё не установлен)

Откройте **Terminal** (Терминал) и выполните:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

После установки проверьте:
```bash
brew --version
```

### 1.2 Установите Node.js и npm

```bash
# Установка через Homebrew
brew install node

# Проверка установки
node --version   # Должно быть >= 18.0.0
npm --version    # Должно быть >= 9.0.0
```

**Альтернативный способ** - скачать с официального сайта:
- Перейдите на [nodejs.org](https://nodejs.org)
- Скачайте LTS версию для macOS
- Установите .pkg файл

### 1.3 Установите Git (если нужно)

```bash
# Проверьте, установлен ли Git
git --version

# Если нет, установите через Homebrew
brew install git
```

---

## 📥 Шаг 2: Скачивание проекта

### Вариант A: Если проект в Git репозитории

```bash
# Клонируйте репозиторий
git clone <URL_РЕПОЗИТОРИЯ>
cd lptt-website
```

### Вариант B: Если проект уже у вас на компьютере

```bash
# Откройте Terminal и перейдите в папку проекта
cd ~/Desktop/lptt-website  # Если проект на рабочем столе
# или
cd ~/Downloads/lptt-website  # Если в загрузках
```

**Совет для новичков:**
- Откройте папку проекта в Finder
- Перетащите папку в окно Terminal
- Путь вставится автоматически

---

## 🔧 Шаг 3: Установка зависимостей

Находясь в папке проекта, выполните:

```bash
# Установка всех npm пакетов
npm install
```

**Это займёт 2-5 минут** в зависимости от скорости интернета.

Вы увидите:
```
added 245 packages in 3m
```

### ⚠️ Если возникла ошибка:

**Ошибка с правами доступа:**
```bash
# НЕ используйте sudo!
# Исправьте права:
sudo chown -R $(whoami) ~/.npm
npm install
```

**Ошибка "EACCES":**
```bash
# Очистите кэш npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Шаг 4: Запуск development сервера

```bash
npm run dev
```

Вы увидите:

```
  VITE v5.3.1  ready in 320 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
  ➜  press h + enter to show help
```

**Браузер откроется автоматически** на `http://localhost:3000`

### Если браузер не открылся:

1. Скопируйте `http://localhost:3000`
2. Откройте Safari, Chrome или Firefox
3. Вставьте адрес в адресную строку

---

## 🔨 Шаг 5: Сборка для продакшена

Когда всё готово к публикации:

```bash
# Остановите dev сервер (Ctrl + C в Terminal)

# Создайте production сборку
npm run build
```

Процесс займёт 10-30 секунд:

```
vite v5.3.1 building for production...
✓ 345 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-a3b4c5d6.css   12.34 kB │ gzip:  3.21 kB
dist/assets/index-e7f8g9h0.js   145.67 kB │ gzip: 47.89 kB
✓ built in 2.45s
```

Готовые файлы будут в папке **`dist/`**

### Предпросмотр production сборки:

```bash
npm run preview
```

Откроется на `http://localhost:4173`

---

## 🎨 Шаг 6: Работа с проектом

### Структура файлов для редактирования:

```
src/
├── components/          ← Редактируйте компоненты здесь
│   ├── Hero.tsx        ← Главная секция
│   ├── About.tsx       ← О нас
│   ├── Programs.tsx    ← Специальности
│   └── ...
├── index.css           ← Глобальные стили
└── App.tsx             ← Главный компонент
```

### Как редактировать:

1. **Откройте проект в редакторе кода:**

```bash
# Если у вас VSCode:
code .

# Или откройте вручную в любом редакторе
```

2. **Внесите изменения** в нужные файлы

3. **Сохраните** (⌘ + S)

4. **Браузер обновится автоматически!** (Hot Module Replacement)

### Рекомендуемые редакторы для Mac:

- **VS Code** (лучший выбор): [code.visualstudio.com](https://code.visualstudio.com)
- **WebStorm**: платный, очень мощный
- **Sublime Text**: легкий и быстрый

---

## 🛠️ Полезные команды для macOS

### Управление Terminal:

```bash
# Остановить dev сервер
Ctrl + C

# Очистить экран Terminal
clear
# или
⌘ + K

# Выйти из папки
cd ..

# Посмотреть содержимое папки
ls -la
```

### Управление проектом:

```bash
# Запустить dev сервер
npm run dev

# Собрать проект
npm run build

# Проверить код линтером
npm run lint

# Посмотреть все доступные команды
npm run
```

---

## 🐛 Решение проблем на macOS

### Проблема 1: "command not found: npm"

**Решение:**
```bash
# Переустановите Node.js
brew reinstall node

# Или скачайте с nodejs.org
```

### Проблема 2: Порт 3000 занят

**Решение A - Остановить процесс:**
```bash
# Найти процесс на порту 3000
lsof -ti:3000

# Убить процесс (замените PID на номер из предыдущей команды)
kill -9 <PID>
```

**Решение B - Изменить порт:**

Отредактируйте `vite.config.ts`:
```typescript
server: {
  port: 3001,  // Используйте другой порт
}
```

### Проблема 3: "EACCES: permission denied"

**Решение:**
```bash
# Исправьте права доступа
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /workspace

# Попробуйте снова
npm install
```

### Проблема 4: Браузер не открывается

**Решение:**

Отредактируйте `vite.config.ts`:
```typescript
server: {
  port: 3000,
  open: true,  // Уже должно быть
  host: true,  // Добавьте эту строку
}
```

### Проблема 5: Медленная установка пакетов

**Решение:**
```bash
# Используйте зеркало npm (для России/СНГ)
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install
```

---

## 📱 Тестирование на разных устройствах

### Открыть на iPhone/iPad в той же Wi-Fi сети:

1. Запустите dev сервер:
```bash
npm run dev
```

2. Найдите строку:
```
➜  Network: http://192.168.1.100:3000/
```

3. Откройте этот адрес на iPhone/iPad в Safari

### Эмуляция мобильных устройств:

В Chrome/Safari:
- **Chrome**: ⌘ + ⌥ + I → Toggle Device Toolbar
- **Safari**: Develop → Enter Responsive Design Mode (⌘ + ⌥ + R)

---

## 🚀 Деплой (публикация сайта)

### Вариант 1: Vercel (Рекомендуется, бесплатно)

```bash
# 1. Установите Vercel CLI
npm install -g vercel

# 2. Деплой
vercel

# Следуйте инструкциям:
# - Set up and deploy? [Y/n] → Y
# - Which scope? → Your account
# - Link to existing project? [y/N] → N
# - What's your project's name? → lptt-website
# - In which directory is your code located? → ./
```

Готово! Получите ссылку типа: `https://lptt-website.vercel.app`

### Вариант 2: Netlify (тоже бесплатно)

```bash
# 1. Соберите проект
npm run build

# 2. Установите Netlify CLI
npm install -g netlify-cli

# 3. Деплой
netlify deploy --prod

# Укажите папку для деплоя: dist
```

### Вариант 3: GitHub Pages

```bash
# 1. Добавьте в package.json:
"homepage": "https://yourusername.github.io/lptt-website",

# 2. Установите gh-pages
npm install --save-dev gh-pages

# 3. Добавьте в scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# 4. Деплой
npm run deploy
```

---

## 💡 Советы для работы на Mac

### 1. Используйте iTerm2 вместо Terminal

```bash
brew install --cask iterm2
```

### 2. Установите Oh My Zsh для красивого Terminal

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 3. Полезные расширения VS Code:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Hero**
- **Prettier - Code formatter**
- **Auto Import**

Установка:
```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
```

### 4. Горячие клавиши для разработки:

- **⌘ + S** - Сохранить
- **⌘ + /** - Закомментировать
- **⌘ + B** - Скрыть/показать sidebar
- **⌘ + P** - Быстрый поиск файлов
- **⌘ + Shift + P** - Command Palette
- **⌥ + ↑/↓** - Переместить строку
- **⌘ + D** - Выбрать следующее вхождение

---

## 📊 Проверка производительности

### Откройте Chrome DevTools:

```
⌘ + ⌥ + I
```

### Lighthouse аудит:

1. Откройте DevTools
2. Вкладка "Lighthouse"
3. Нажмите "Generate report"

Цель: **90+ баллов** по всем показателям!

---

## 🎓 Дополнительные ресурсы

### Обучение:

- [React документация](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS курс](https://tailwindcss.com/docs)
- [Framer Motion примеры](https://www.framer.com/motion/examples/)

### Сообщества:

- [React Discord](https://discord.gg/react)
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)

---

## ✅ Checklist перед запуском

- [ ] Node.js установлен (v18+)
- [ ] npm установлен (v9+)
- [ ] Проект скачан/клонирован
- [ ] Terminal открыт в папке проекта
- [ ] `npm install` выполнен успешно
- [ ] `npm run dev` запущен
- [ ] Браузер открыт на localhost:3000
- [ ] Сайт загружается корректно

---

## 🎉 Готово!

Теперь вы можете:

1. ✅ **Редактировать** компоненты в `src/components/`
2. ✅ **Видеть изменения** в реальном времени
3. ✅ **Собирать** проект командой `npm run build`
4. ✅ **Деплоить** на Vercel/Netlify

---

## 📞 Нужна помощь?

Если что-то не работает:

1. Проверьте версии: `node --version` и `npm --version`
2. Удалите и переустановите: `rm -rf node_modules && npm install`
3. Перезапустите Terminal
4. Перезагрузите Mac 😊

---

**Успехов в разработке на вашем Mac! 🍎✨**

---

## 🔥 Быстрый старт (TL;DR)

```bash
# 1. Установите Node.js
brew install node

# 2. Перейдите в папку проекта
cd /path/to/lptt-website

# 3. Установите зависимости
npm install

# 4. Запустите dev сервер
npm run dev

# 5. Откройте http://localhost:3000 в браузере

# 6. Для сборки:
npm run build
```

**Вот и всё! 🚀**
