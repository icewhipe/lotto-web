# 🤝 Contributing to ЛПТТ Электронный Дневник

Спасибо за интерес к проекту! Мы рады любому вкладу.

---

## 📋 Содержание

- [Code of Conduct](#code-of-conduct)
- [Как помочь проекту](#как-помочь-проекту)
- [Процесс разработки](#процесс-разработки)
- [Стиль кода](#стиль-кода)
- [Коммиты](#коммиты)
- [Pull Requests](#pull-requests)

---

## 📜 Code of Conduct

Участвуя в проекте, вы соглашаетесь соблюдать наш [Code of Conduct](./CODE_OF_CONDUCT.md).

**Основные принципы:**
- Будьте уважительны
- Будьте конструктивны
- Помогайте другим
- Пишите качественный код

---

## 💡 Как помочь проекту

### 🐛 Сообщить о баге

1. Проверьте [Issues](https://github.com/icewhipe/lotto-web/issues), может баг уже известен
2. Создайте новый Issue с тегом `bug`
3. Опишите:
   - Что произошло
   - Что ожидалось
   - Шаги для воспроизведения
   - Скриншоты (если применимо)
   - Версия ОС/браузера

### ✨ Предложить улучшение

1. Создайте Issue с тегом `enhancement`
2. Опишите:
   - Какую проблему решает
   - Предложенное решение
   - Альтернативы
   - Дополнительный контекст

### 📝 Улучшить документацию

- Исправление опечаток
- Добавление примеров
- Перевод на другие языки
- Улучшение объяснений

### 💻 Написать код

- Исправить баг
- Реализовать feature
- Улучшить производительность
- Написать тесты

---

## 🔄 Процесс разработки

### 1. Fork репозитория

Нажмите кнопку "Fork" в правом верхнем углу.

### 2. Клонируйте fork

```bash
git clone https://github.com/YOUR_USERNAME/lotto-web.git
cd lotto-web
```

### 3. Добавьте upstream

```bash
git remote add upstream https://github.com/icewhipe/lotto-web.git
```

### 4. Создайте feature branch

```bash
git checkout -b feature/amazing-feature
```

**Naming conventions:**
- `feature/` — новая функция
- `fix/` — исправление бага
- `docs/` — документация
- `refactor/` — рефакторинг
- `perf/` — оптимизация
- `test/` — тесты

### 5. Внесите изменения

Следуйте [стилю кода](#стиль-кода).

### 6. Запустите тесты

```bash
# Web
npm run lint
npm run type-check
npm run test

# iOS
⌘ + U (в Xcode)
```

### 7. Commit изменения

```bash
git add .
git commit -m "feat: добавлена amazing feature"
```

См. [Коммиты](#коммиты) для правил.

### 8. Push в fork

```bash
git push origin feature/amazing-feature
```

### 9. Создайте Pull Request

Перейдите на GitHub и создайте Pull Request.

---

## 🎨 Стиль кода

### TypeScript/React

**Следуйте:**
- ESLint правилам проекта
- Prettier formatting
- TypeScript strict mode

**Conventions:**
```typescript
// ✅ Хорошо
const MyComponent: React.FC<Props> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex items-center gap-4">
      <h1>{title}</h1>
    </div>
  );
};

// ❌ Плохо
function MyComponent(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  return <div><h1>{props.title}</h1></div>
}
```

### Swift/SwiftUI

**Следуйте:**
- Swift Style Guide
- SwiftUI best practices
- MVVM pattern

**Conventions:**
```swift
// ✅ Хорошо
struct MyView: View {
    @State private var isVisible = false
    
    var body: some View {
        VStack(spacing: AppSpacing.md) {
            Text("Hello")
                .font(AppTypography.h2)
        }
    }
}

// ❌ Плохо
struct MyView: View {
    @State var isVisible = false
    var body: some View {
        VStack(spacing:16){Text("Hello").font(.title)}
    }
}
```

### Общие правила

- ✅ Осмысленные имена переменных
- ✅ Комментарии для сложной логики
- ✅ Разбивайте большие функции
- ✅ DRY (Don't Repeat Yourself)
- ✅ SOLID principles
- ❌ Magic numbers
- ❌ Nested ternary operators
- ❌ Глубокая вложенность (max 3-4 уровня)

---

## 📝 Коммиты

### Формат

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` — Новая функция
- `fix` — Исправление бага
- `docs` — Документация
- `style` — Форматирование
- `refactor` — Рефакторинг
- `perf` — Оптимизация
- `test` — Тесты
- `chore` — Maintenance

### Scope (опционально)

- `web` — Веб-приложение
- `ios` — iOS приложение
- `backend` — Backend
- `docs` — Документация

### Примеры

```bash
# Хорошо ✅
feat(ios): добавлен dark mode toggle
fix(web): исправлен баг с modal positioning
docs: обновлён README
perf(ios): оптимизированы particles (-60% CPU)

# Плохо ❌
update
fixed bug
changes
asdfgh
```

### Emoji (опционально)

```
✨ feat: — новая функция
🐛 fix: — исправление
📝 docs: — документация
🎨 style: — стиль
♻️ refactor: — рефакторинг
⚡ perf: — производительность
✅ test: — тесты
🔧 chore: — maintenance
```

---

## 🔀 Pull Requests

### Требования

1. **Описание**
   - Что изменено и почему
   - Ссылка на Issue (если есть)
   - Скриншоты (для UI изменений)
   - Breaking changes (если есть)

2. **Тесты**
   - Добавьте тесты для новой функциональности
   - Убедитесь что все тесты проходят
   - Проверьте линтинг

3. **Документация**
   - Обновите README если нужно
   - Добавьте JSDoc/комментарии
   - Обновите CHANGELOG

4. **Code Review**
   - Ответьте на комментарии
   - Внесите запрошенные изменения
   - Будьте открыты к обратной связи

### Template

```markdown
## Описание
Краткое описание изменений.

## Тип изменения
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Связанные Issues
Closes #123

## Чеклист
- [ ] Код следует стилю проекта
- [ ] Тесты добавлены/обновлены
- [ ] Документация обновлена
- [ ] Все тесты проходят
- [ ] Линтинг проходит

## Скриншоты (если UI)
![Screenshot](url)

## Дополнительно
Любая дополнительная информация.
```

---

## 🧪 Тестирование

### Web

```bash
# Линтинг
npm run lint

# Type checking
npm run type-check

# Unit tests (when available)
npm run test

# E2E tests (when available)
npm run test:e2e
```

### iOS

```bash
# В Xcode
⌘ + U  # Run tests
```

---

## 📂 Структура проекта

### Web
```
src/
├── components/     # React компоненты
├── styles/        # CSS и анимации
├── assets/        # Изображения, иконки
├── hooks/         # Custom hooks
├── utils/         # Утилиты
└── types/         # TypeScript типы
```

### iOS
```
LPTTDiary/
├── App/           # Entry point
├── Views/         # SwiftUI views
├── Components/    # Reusable components
├── ViewModels/    # Business logic
├── Models/        # Data models
├── Services/      # API, Auth
└── Utils/         # Helpers
```

---

## 🎯 Приоритеты

### Высокий приоритет
- 🐛 Критические баги
- 🔒 Уязвимости безопасности
- ⚡ Проблемы производительности

### Средний приоритет
- ✨ Новые функции
- 🎨 UI/UX улучшения
- 📝 Документация

### Низкий приоритет
- ♻️ Рефакторинг
- 🧪 Дополнительные тесты
- 🌐 Переводы

---

## 💬 Вопросы?

- 📧 Email: dev@lptt.ru
- 💬 Telegram: [@lptt_dev](https://t.me/lptt_dev)
- 🐛 [GitHub Issues](https://github.com/icewhipe/lotto-web/issues)

---

## 🙏 Спасибо!

Каждый вклад делает проект лучше!

<div align="center">

⭐ Не забудьте поставить звезду проекту!

</div>
