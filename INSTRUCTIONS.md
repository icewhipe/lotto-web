# 🚀 Инструкция по запуску проекта ЛПТТ

## Что было сделано?

Я полностью переделал сайт ЛПТТ с использованием **современного стека веб-разработки 2025-2026**:

### 🛠️ Технологический стек

- ⚡ **Vite 5** - сверхбыстрый сборщик (в 10-100 раз быстрее Webpack)
- ⚛️ **React 18** - библиотека для UI с новейшими возможностями
- 📘 **TypeScript** - типизация для надежного кода
- 🎨 **Tailwind CSS 3** - utility-first CSS фреймворк
- ✨ **Framer Motion 11** - продвинутые анимации
- 🎯 **Lucide React** - современные иконки
- 🔧 **ESLint** - линтер кода

### 🎨 Дизайн-тренды 2025-2026

✅ **Гласморфизм** (Glassmorphism) - эффект матового стекла  
✅ **Яркие градиенты** - современная цветовая палитра  
✅ **Микроанимации** - плавные переходы с Framer Motion  
✅ **Dark Mode** - переключение темной/светлой темы  
✅ **3D Hover эффекты** - интерактивные карточки  
✅ **Адаптивный дизайн** - Mobile-first подход  
✅ **Оптимизация** - Code splitting, lazy loading  

---

## 📦 Установка и запуск

### Шаг 1: Установите зависимости

```bash
npm install
```

Это установит все необходимые пакеты (~200MB):
- React и React DOM
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- И другие зависимости

### Шаг 2: Запустите dev-сервер

```bash
npm run dev
```

После запуска откроется браузер на `http://localhost:3000`

**Преимущества Vite:**
- Мгновенный старт сервера (< 1 секунды)
- Hot Module Replacement (HMR) - изменения видны моментально
- Оптимизированная сборка

### Шаг 3: Разработка

Теперь вы можете:
- Редактировать файлы в `/src`
- Изменения будут отображаться моментально
- Проверить адаптивность на разных устройствах

### Шаг 4: Сборка для продакшена

```bash
npm run build
```

Создаст оптимизированную сборку в папке `dist/`:
- Минификация кода
- Оптимизация изображений
- Code splitting
- Tree shaking

### Шаг 5: Предпросмотр production-сборки

```bash
npm run preview
```

---

## 📁 Структура проекта

```
lptt-website/
│
├── src/
│   ├── components/          # React компоненты
│   │   ├── Navbar.tsx       # Навигация с анимацией
│   │   ├── Hero.tsx         # Главный экран
│   │   ├── About.tsx        # О техникуме
│   │   ├── Programs.tsx     # Специальности
│   │   ├── News.tsx         # Новости
│   │   ├── Admissions.tsx   # Поступление
│   │   ├── Contacts.tsx     # Контакты
│   │   ├── Footer.tsx       # Подвал
│   │   ├── BackToTop.tsx    # Кнопка вверх
│   │   └── ThemeToggle.tsx  # Переключатель темы
│   │
│   ├── hooks/              # Кастомные хуки
│   │   ├── useScrollPosition.ts
│   │   └── useInView.ts
│   │
│   ├── utils/              # Утилиты
│   │   └── cn.ts
│   │
│   ├── App.tsx             # Главный компонент
│   ├── main.tsx            # Точка входа
│   └── index.css           # Глобальные стили
│
├── public/                 # Статические файлы
├── index.html             # HTML шаблон
├── package.json           # Зависимости
├── tsconfig.json          # TypeScript конфиг
├── tailwind.config.js     # Tailwind конфиг
├── vite.config.ts         # Vite конфиг
└── README.md             # Документация
```

---

## 🎯 Основные возможности

### 1. Компонентная архитектура
Каждая секция сайта - отдельный React компонент:
- Легко поддерживать
- Переиспользуемый код
- Типобезопасность с TypeScript

### 2. Адаптивный дизайн
```css
Mobile First подход:
- sm: 640px   (телефоны)
- md: 768px   (планшеты)
- lg: 1024px  (ноутбуки)
- xl: 1280px  (десктопы)
```

### 3. Темная тема
- Автоопределение системной темы
- Сохранение в localStorage
- Плавный переход между темами

### 4. Анимации Framer Motion
```tsx
// Пример использования
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
/>
```

### 5. Производительность
- Code splitting - загрузка по требованию
- Tree shaking - удаление неиспользуемого кода
- Lazy loading - отложенная загрузка
- Оптимизация изображений

---

## 🔧 Кастомизация

### Изменение цветов

Отредактируйте `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#667eea',  // Основной цвет
    600: '#5568d3',
  },
}
```

### Изменение шрифтов

Отредактируйте `index.html` и `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  display: ['Montserrat', 'sans-serif'],
}
```

### Добавление новых компонентов

```bash
# Создайте файл в src/components/
touch src/components/NewComponent.tsx
```

```tsx
import { motion } from 'framer-motion'

export default function NewComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Новый компонент
    </motion.div>
  )
}
```

---

## 🐛 Устранение проблем

### Проблема: npm install не работает

**Решение:**
```bash
# Очистите кэш
npm cache clean --force

# Удалите node_modules
rm -rf node_modules package-lock.json

# Установите заново
npm install
```

### Проблема: Порт 3000 занят

**Решение:**
Измените порт в `vite.config.ts`:
```typescript
server: {
  port: 3001,  // Используйте другой порт
}
```

### Проблема: TypeScript ошибки

**Решение:**
```bash
# Перезапустите TypeScript сервер
# В VSCode: Ctrl+Shift+P -> "Restart TS Server"
```

---

## 📚 Дополнительные ресурсы

- [React документация](https://react.dev)
- [TypeScript документация](https://www.typescriptlang.org)
- [Vite документация](https://vitejs.dev)
- [Tailwind CSS документация](https://tailwindcss.com)
- [Framer Motion документация](https://www.framer.com/motion)

---

## 🎓 Что дальше?

1. **Добавьте контент** - замените placeholder данные на реальные
2. **Добавьте изображения** - поместите их в `/public`
3. **Интеграция с бэкендом** - добавьте API вызовы
4. **Форма обратной связи** - создайте компонент формы
5. **SEO оптимизация** - добавьте метатеги
6. **Деплой** - разверните на Vercel/Netlify

---

## 🚀 Деплой

### Vercel (Рекомендуется)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Netlify

```bash
# Соберите проект
npm run build

# Загрузите папку dist на Netlify
```

---

## 📞 Поддержка

Если возникли вопросы:
1. Проверьте README.md
2. Посмотрите документацию технологий
3. Проверьте консоль браузера на ошибки

---

**Удачи в разработке! 🎉**

Создано с ❤️ для ЛПТТ
