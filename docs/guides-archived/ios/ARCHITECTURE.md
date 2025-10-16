# 🏗️ iOS Architecture

Архитектура iOS приложения ЛПТТ Дневник.

---

## 📐 Паттерн: MVVM

**Model-View-ViewModel** — основной архитектурный паттерн.

```
┌─────────┐      ┌──────────────┐      ┌───────┐
│  View   │ ←──→ │  ViewModel   │ ←──→ │ Model │
│ (SwiftUI)│      │  (ObservableObject)│      │ (Struct)│
└─────────┘      └──────────────┘      └───────┘
                       ↓
                 ┌──────────┐
                 │ Services │
                 └──────────┘
```

---

## 🧩 Слои приложения

### 1. **Views** (Presentation Layer)

SwiftUI views, отображают UI и обрабатывают взаимодействие.

**Примеры:**
- `LoginView.swift` — Экран входа
- `StudentDashboard.swift` — Главная студента
- `GradesView.swift` — Экран оценок

**Ответственность:**
- ✅ Отображение данных из ViewModel
- ✅ Обработка пользовательского ввода
- ✅ Навигация между экранами
- ❌ Бизнес-логика
- ❌ Прямые вызовы API

```swift
struct StudentDashboard: View {
    @StateObject private var viewModel = GradesViewModel()
    
    var body: some View {
        List(viewModel.grades) { grade in
            GradeRow(grade: grade)
        }
    }
}
```

---

### 2. **ViewModels** (Business Logic Layer)

ObservableObject классы, содержат бизнес-логику и состояние.

**Примеры:**
- `AuthViewModel.swift` — Аутентификация
- `GradesViewModel.swift` — Логика оценок
- `ScheduleViewModel.swift` — Логика расписания

**Ответственность:**
- ✅ Бизнес-логика
- ✅ State management
- ✅ Вызовы сервисов
- ✅ Трансформация данных
- ❌ UI код
- ❌ Прямой доступ к UserDefaults/Keychain

```swift
class GradesViewModel: ObservableObject {
    @Published var grades: [Grade] = []
    @Published var isLoading = false
    
    private let apiService: APIService
    
    func fetchGrades() async {
        isLoading = true
        grades = await apiService.getGrades()
        isLoading = false
    }
}
```

---

### 3. **Models** (Data Layer)

Struct модели данных.

**Примеры:**
- `User.swift` — Модель пользователя
- `Grade.swift` — Модель оценки
- `Lesson.swift` — Модель урока

**Ответственность:**
- ✅ Определение структуры данных
- ✅ Codable для API
- ✅ Identifiable для списков
- ✅ Computed properties
- ❌ Бизнес-логика

```swift
struct Grade: Codable, Identifiable {
    let id: String
    let subject: String
    let value: Int
    let date: Date
    
    var color: Color {
        Color.gradeColor(value: value)
    }
}
```

---

### 4. **Services** (API Layer)

Сервисы для работы с данными.

**Примеры:**
- `AuthService.swift` — Аутентификация
- `APIService.swift` — API client

**Ответственность:**
- ✅ HTTP запросы
- ✅ Авторизация
- ✅ Error handling
- ✅ Кэширование
- ❌ Бизнес-логика
- ❌ UI updates

```swift
class APIService {
    func getGrades() async throws -> [Grade] {
        let url = URL(string: "\(baseURL)/grades")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([Grade].self, from: data)
    }
}
```

---

### 5. **Utils** (Helpers)

Утилиты и расширения.

**Файлы:**
- `Colors.swift` — Цвета и gradients
- `Typography.swift` — Система шрифтов
- `Animations.swift` — Анимации и transitions
- `Extensions.swift` — Swift extensions

---

## 🔄 Data Flow

### Пример: Загрузка оценок

```
1. User → GradesView
2. GradesView.onAppear()
3. → GradesViewModel.fetchGrades()
4. → APIService.getGrades()
5. → HTTP Request
6. ← Response (JSON)
7. ← Decoded [Grade]
8. → ViewModel.grades = [Grade]
9. → View updates (@Published)
10. → UI refreshes
```

---

## 🎯 State Management

### @State

Локальное состояние View.

```swift
@State private var isExpanded = false
```

**Используйте для:**
- UI состояния (показать/скрыть)
- Локальные флаги
- Анимации

---

### @StateObject

ViewModel, принадлежащий View.

```swift
@StateObject private var viewModel = GradesViewModel()
```

**Используйте для:**
- ViewModel создаваемый во View
- Гарантирует единственный экземпляр

---

### @ObservedObject

ViewModel, переданный извне.

```swift
@ObservedObject var viewModel: GradesViewModel
```

**Используйте для:**
- Shared ViewModel
- Передача между Views

---

### @EnvironmentObject

Глобальный shared state.

```swift
@EnvironmentObject var authViewModel: AuthViewModel
```

**Используйте для:**
- User session
- App-wide state
- Theme settings

---

## 🔐 Authentication Flow

```
1. App Launch
   ↓
2. LPTTDiaryApp
   - Создаёт AuthViewModel
   - Инъектирует .environmentObject()
   ↓
3. ContentView
   - Проверяет authViewModel.isAuthenticated
   ↓
4a. NOT authenticated     4b. Authenticated
    → LoginView               → TabView
                              ├─ Dashboard
                              ├─ Grades  
                              ├─ Schedule
                              ├─ Notes
                              └─ Profile
```

---

## 📱 Navigation

### NavigationStack

Используется для иерархической навигации.

```swift
NavigationStack {
    List {
        NavigationLink("Details") {
            DetailView()
        }
    }
    .navigationTitle("Title")
}
```

### TabView

Для главной навигации.

```swift
TabView {
    DashboardView()
        .tabItem {
            Label("Главная", systemImage: "house.fill")
        }
    
    GradesView()
        .tabItem {
            Label("Оценки", systemImage: "chart.bar.fill")
        }
}
```

### Sheet

Модальные окна.

```swift
.sheet(isPresented: $showSheet) {
    DetailSheet()
}
```

---

## 🎨 Design System Integration

### Colors

```swift
Color.appBackground      // #0a0a0f
Color.cardBackground     // #1a1a24
Color.brandPurple        // #8b5cf6
Color.textPrimary        // white
```

### Typography

```swift
Text("Title")
    .font(AppTypography.h2)
    
Text("Body")
    .font(AppTypography.body)
```

### Spacing

```swift
VStack(spacing: AppSpacing.md) {
    // 16px spacing
}
.padding(AppSpacing.lg)  // 24px padding
```

---

## ⚡ Performance Best Practices

### 1. Используйте LazyVStack/LazyHStack

```swift
// ✅ Хорошо
LazyVStack {
    ForEach(items) { item in
        ItemView(item)
    }
}

// ❌ Плохо (загружает все сразу)
VStack {
    ForEach(items) { item in
        ItemView(item)
    }
}
```

### 2. Delayed initialization

```swift
.onAppear {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
        // Тяжелые операции после загрузки UI
    }
}
```

### 3. Избегайте тяжелых эффектов

```swift
// ❌ CPU-heavy
.rotation3DEffect(...)

// ✅ Легкий
.scaleEffect(...)
.opacity(...)
```

### 4. Оптимизируйте particles

```swift
// ✅ Dashboard
FloatingParticlesView(particleCount: 8)

// ✅ Grades
FloatingParticlesView(particleCount: 6)
```

---

## 📚 Дальнейшее изучение

- [UI Компоненты](./COMPONENTS.md) — Библиотека компонентов
- [Оптимизация](./OPTIMIZATION.md) — Performance tips
- [Troubleshooting](./TROUBLESHOOTING.md) — Решение проблем

---

[← Назад](../README.md)
