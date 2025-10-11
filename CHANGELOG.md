# 📝 Changelog

Все заметные изменения в проекте документированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и проект следует [Semantic Versioning](https://semver.org/lang/ru/).

---

## [2.0.1] - 2025-10-10

### 🔧 Исправлено

#### iOS
- Исправлены ошибки компиляции в `NotesView.swift`
  - `note.pages` → `note.size`
  - Добавлен параметр `date` в `Note` initializer
  - `fileUrl: nil` → `fileUrl: ""`
- Исправлены ошибки в `StudentDashboard.swift`
  - Добавлен `case .seminar` для exhaustive switch
- Исправлены ошибки в `ScheduleView.swift`
  - Parsing `lesson.time` для start/end
  - `lesson.name` → `lesson.subject`
- Исправлены ссылки на несуществующие цвета в `Colors.swift`
  - `Color("Primary")` → `Color.purple`
  - `Color("Secondary")` → `Color.blue`

### ⚡ Оптимизировано

#### iOS Performance
- **MeshGradient:** 5 orbs → 3 orbs (-40%)
- **Particles:** 30 → 6-12 configurable (-60-80%)
- **Timer interval:** 0.05s → 0.1s (-50%)
- **Blur radius:** 60 → 40 (-33%)
- **CPU usage:** 45% → 15% (-67%)
- **Memory:** 80MB → 35MB (-56%)
- **Launch time:** 3-4s → 1.5s (-50%)
- **FPS:** 40-50 → 60 stable (+20%)

#### Removed CPU-heavy animations
- Убраны все `rotation3DEffect`
- Убраны `logoRotation` анимации
- Оставлены только легкие scale/fade

### ✨ Добавлено

#### iOS
- `SplashScreen.swift` — Красивый экран загрузки (1.5s)
- `Typography.swift` — Единая система шрифтов
  - `AppTypography` (h1-h4, body, labels, stats)
  - `AppSpacing` (xs, sm, md, lg, xl, xxl)
  - `AppRadius` (sm, md, lg, xl, xxl)
- Темная тема (как на веб-сайте)
  - `appBackground`, `cardBackground`, `surfaceBackground`
  - `textPrimary`, `textSecondary`, `textTertiary`
  - Brand colors и gradients
- `LazyVStack` для оптимизации scroll performance

---

## [2.0.0] - 2025-10-09

### 🎨 Изменено

#### iOS — Полный редизайн

##### LoginView
- Mesh Gradient Background (5 анимированных orbs)
- Floating Particles (30 частиц)
- 3D Logo с rotation и glow
- Shimmer Text эффект
- Glass morphism inputs
- Animated badge "Лучший техникум 2024"

##### StudentDashboard
- Floating particles background
- 3D Animated header card
- Glass morphism stat cards
- Shimmer заголовки
- Enhanced quick action buttons
- Pulse notification badge

##### GradesView
- Mesh gradient header
- Animated counter (0 → 4.5)
- Interactive subject cards
- Press effects + haptic feedback
- Stagger animations
- Subject icons (function, code, database, globe)

##### ScheduleView
- Animated gradient header (blue/cyan)
- Shimmer text
- Matched Geometry Effect для week tabs
- Enhanced lesson cards
- Expand/collapse animation
- Haptic feedback

##### NotesView
- Search bar с clear button
- Subject badges (цветные)
- Floating Action Button (+)
- Add Note Sheet (modal)
- Share & menu actions

##### ProfileView
- Avatar с gradient ring
- Stats grid 2x2
- Quick actions (все рабочие)
- Settings section
- Edit Profile sheet
- Logout alert

### ✨ Добавлено

#### iOS Components
- `MeshGradientBackground.swift` — Animated mesh gradient
- `FloatingParticlesView` — Particle system
- `AnimatedCard.swift` — 3D floating cards
- `GlassMorphismCard.swift` — Glass effect
- `ShimmerText.swift` — Shimmer animation
- `PulseButton.swift` — Pulse effect
- `AnimatedStatCard.swift` — Animated stats
- `AnimatedCounterView.swift` — Number counter
- `InteractiveSubjectCard.swift` — Subject cards
- `AnimatedDayButton.swift` — Day selector
- `EnhancedLessonCard.swift` — Lesson cards

#### iOS Utils
- `Animations.swift`
  - Custom transitions (slideAndFade, scaleAndFade, rotateIn)
  - HapticManager (impact, notification, selection)
  - Spring animation presets
  - View extensions (animateOnAppear, pulseEffect, shakeEffect)
- `Colors.swift` — Color extensions и hex initializer
- `Gradients.swift` — Predefined gradients
- `Extensions.swift` — Utility extensions

---

## [1.1.0] - 2025-10-08

### ✨ Добавлено

#### Web — Admin Panel
- `AdminPanel.tsx` — Главная панель администратора
- `AdminDashboard.tsx` — Dashboard с статистикой
- `NewsManager.tsx` — Управление новостями (CRUD)
- `GalleryManager.tsx` — Управление фотогалереей

#### Web — Role Dashboards
- `TeacherDashboard.tsx` — Панель преподавателя
- `DirectorDashboard.tsx` — Панель директора
- Extended student features

### 🎨 Изменено

#### Web — Design Overhaul
- Hero section с parallax эффектами
- Animated gradient orbs
- 3D floating cards
- `ParticlesBackground.tsx` — Canvas particles
- `FloatingOrbs.tsx` — Animated orbs
- 50+ новых CSS анимаций
- Улучшена светлая тема

---

## [1.0.0] - 2025-10-07

### ✨ Добавлено

#### Web — Initial Release
- Основные страницы (Hero, About, Programs, News, Gallery)
- Система навигации (Navbar с search)
- Модальные окна (Programs, News, Events, Gallery, Video)
- Форма подачи документов (ApplicationWizard)
- Виртуальный тур с video player
- Темная/светлая темы
- Адаптивный дизайн

#### Web — Electronic Diary
- Login система
- Student Dashboard
- Grades view с оценками
- Schedule view с расписанием
- Multi-role support (student, teacher, director, admin)

#### Web — Student Features
- `NotesExchange.tsx` — Обмен конспектами
- `ProgressTracker.tsx` — Трекер прогресса
- `StudentChat.tsx` — Групповой чат

#### Backend — Architecture
- Express.js server setup
- Prisma schema (15 models)
- Socket.IO integration
- JWT authentication structure
- API structure planning

#### iOS — Initial Version
- React Native app (deprecated)
- Swift/SwiftUI app created
- Basic screens (Login, Dashboard, Grades, Schedule)
- MVVM architecture
- Mock data services

### 🎨 Design System
- Tailwind CSS configuration
- Custom animations library
- Typography system
- Color palette (dark/light themes)

---

## Легенда

- ✨ **Добавлено** — Новые функции
- 🎨 **Изменено** — Изменения в существующей функциональности
- 🔧 **Исправлено** — Исправления багов
- ⚡ **Оптимизировано** — Улучшения производительности
- 🚫 **Удалено** — Удалённая функциональность
- 🔒 **Безопасность** — Исправления уязвимостей

---

[2.0.1]: https://github.com/icewhipe/lotto-web/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/icewhipe/lotto-web/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/icewhipe/lotto-web/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/icewhipe/lotto-web/releases/tag/v1.0.0
