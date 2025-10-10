import SwiftUI

struct StudentDashboard: View {
    @StateObject private var gradesViewModel = GradesViewModel()
    @StateObject private var scheduleViewModel = ScheduleViewModel()
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showParticles = false
    @State private var showNotifications = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Dark Background
                Color.appBackground
                    .ignoresSafeArea()
                
                // Floating Particles (reduced count)
                if showParticles {
                    FloatingParticlesView(particleCount: 8)
                        .opacity(0.2)
                        .ignoresSafeArea()
                }
                
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVStack(spacing: AppSpacing.lg) {
                        // Header with gradient
                        headerView
                        
                        // Stats cards
                        statsSection
                        
                        // Today's schedule
                        todayScheduleSection
                        
                        // Recent grades
                        recentGradesSection
                        
                        // Quick actions
                        quickActionsSection
                    }
                    .padding(AppSpacing.md)
                    .padding(.bottom, AppSpacing.xl)
                }
            }
            .navigationTitle("Главная")
            .navigationBarTitleDisplayMode(.large)
            .toolbarBackground(Color.appBackground, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    notificationButton
                }
            }
            .sheet(isPresented: $showNotifications) {
                NotificationsSheet()
            }
            .onAppear {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    withAnimation {
                        showParticles = true
                    }
                }
            }
        }
    }
    
    private var notificationButton: some View {
        Button(action: { showNotifications = true }) {
            ZStack(alignment: .topTrailing) {
                Image(systemName: "bell.fill")
                    .font(.title3)
                    .foregroundColor(.textPrimary)
                
                // Badge
                Circle()
                    .fill(Color.error)
                    .frame(width: 8, height: 8)
                    .offset(x: 4, y: -4)
            }
        }
    }
    
    private var headerView: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Здравствуйте! 👋")
                        .font(AppTypography.body)
                        .foregroundColor(.textSecondary)
                    
                    Text(authViewModel.user?.name ?? "Студент")
                        .font(AppTypography.h2)
                        .foregroundStyle(
                            LinearGradient(
                                colors: [Color.brandPurple, Color.brandPink],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                    
                    HStack(spacing: 4) {
                        Image(systemName: "person.3.fill")
                            .font(.caption)
                        Text("Группа: \(authViewModel.user?.group ?? "ИС-21")")
                            .font(AppTypography.caption)
                    }
                    .foregroundColor(.textSecondary)
                }
                
                Spacer()
                
                // Quick stats
                VStack(alignment: .trailing, spacing: 4) {
                    Text("4.5")
                        .font(AppTypography.h2)
                        .foregroundColor(.textPrimary)
                    Text("Средний балл")
                        .font(AppTypography.caption)
                        .foregroundColor(.textSecondary)
                }
            }
        }
        .padding(AppSpacing.lg)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
    
    private var statsSection: some View {
        HStack(spacing: AppSpacing.md) {
            DashboardStatCard(
                title: "Посещ.",
                value: "92%",
                icon: "checkmark.circle.fill",
                color: Color(hex: "#10b981")
            )
            
            DashboardStatCard(
                title: "Заданий",
                value: "3",
                icon: "doc.text.fill",
                color: Color(hex: "#f59e0b")
            )
            
            DashboardStatCard(
                title: "Конспектов",
                value: "12",
                icon: "note.text",
                color: Color.brandPurple
            )
        }
    }
    
    private var todayScheduleSection: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            HStack {
                Text("Расписание на сегодня")
                    .font(AppTypography.h4)
                    .foregroundColor(.textPrimary)
                
                Spacer()
                
                NavigationLink {
                    ScheduleView()
                } label: {
                    Text("Все")
                        .font(AppTypography.labelLarge)
                        .foregroundColor(.brandPurple)
                }
            }
            
            if scheduleViewModel.todayLessons.isEmpty {
                Text("Нет занятий")
                    .font(AppTypography.body)
                    .foregroundColor(.textSecondary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, AppSpacing.lg)
            } else {
                VStack(spacing: AppSpacing.sm) {
                    ForEach(scheduleViewModel.todayLessons.prefix(3)) { lesson in
                        CompactLessonCard(lesson: lesson)
                    }
                }
            }
        }
        .padding(AppSpacing.md)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
    
    private var recentGradesSection: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            HStack {
                Text("Последние оценки")
                    .font(AppTypography.h4)
                    .foregroundColor(.textPrimary)
                
                Spacer()
                
                NavigationLink {
                    GradesView()
                } label: {
                    Text("Все")
                        .font(AppTypography.labelLarge)
                        .foregroundColor(.brandPurple)
                }
            }
            
            VStack(spacing: AppSpacing.sm) {
                ForEach(gradesViewModel.recentGrades.prefix(3)) { grade in
                    CompactGradeRow(grade: grade)
                }
            }
        }
        .padding(AppSpacing.md)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
    
    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            Text("Быстрые действия")
                .font(AppTypography.h4)
                .foregroundColor(.textPrimary)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: AppSpacing.md) {
                NavigationLink {
                    NotesView()
                } label: {
                    QuickActionCard(
                        title: "Конспекты",
                        icon: "doc.text.fill",
                        gradient: [Color.brandPurple, Color.brandPink]
                    )
                }
                
                QuickActionCard(
                    title: "Чат группы",
                    icon: "message.fill",
                    gradient: [Color.brandBlue, Color(hex: "#06b6d4")]
                )
                
                QuickActionCard(
                    title: "Прогресс",
                    icon: "chart.line.uptrend.xyaxis",
                    gradient: [Color(hex: "#10b981"), Color(hex: "#059669")]
                )
                
                QuickActionCard(
                    title: "Календарь",
                    icon: "calendar",
                    gradient: [Color(hex: "#f59e0b"), Color(hex: "#d97706")]
                )
            }
        }
    }
}

struct DashboardStatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: AppSpacing.sm) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
            
            Text(value)
                .font(AppTypography.h3)
                .foregroundColor(.textPrimary)
            
            Text(title)
                .font(AppTypography.caption)
                .foregroundColor(.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, AppSpacing.md)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
}

struct CompactLessonCard: View {
    let lesson: Lesson
    
    var body: some View {
        HStack(spacing: AppSpacing.md) {
            // Time
            Text(lesson.time.components(separatedBy: "-").first ?? lesson.time)
                .font(AppTypography.labelLarge)
                .foregroundColor(.textPrimary)
                .frame(width: 50, alignment: .leading)
            
            // Info
            VStack(alignment: .leading, spacing: 2) {
                Text(lesson.subject)
                    .font(AppTypography.body)
                    .foregroundColor(.textPrimary)
                
                Text(lesson.room)
                    .font(AppTypography.caption)
                    .foregroundColor(.textSecondary)
            }
            
            Spacer()
            
            // Type badge
            Text(lessonTypeText)
                .font(AppTypography.captionBold)
                .foregroundColor(lessonColor)
                .padding(.horizontal, AppSpacing.sm)
                .padding(.vertical, 2)
                .background(
                    Capsule()
                        .fill(lessonColor.opacity(0.2))
                )
        }
        .padding(AppSpacing.sm)
        .background(Color.surfaceBackground)
        .cornerRadius(AppRadius.md)
    }
    
    private var lessonTypeText: String {
        switch lesson.type {
        case .lecture: return "ЛК"
        case .practice: return "ПР"
        case .lab: return "ЛБ"
        }
    }
    
    private var lessonColor: Color {
        switch lesson.type {
        case .lecture: return Color.brandBlue
        case .practice: return Color(hex: "#10b981")
        case .lab: return Color.brandPurple
        }
    }
}

struct CompactGradeRow: View {
    let grade: Grade
    
    var body: some View {
        HStack(spacing: AppSpacing.md) {
            // Grade value
            Text("\(grade.value)")
                .font(AppTypography.h4)
                .foregroundColor(Color.gradeColor(value: grade.value))
                .frame(width: 40, height: 40)
                .background(
                    Circle()
                        .fill(Color.gradeColor(value: grade.value).opacity(0.2))
                )
            
            // Info
            VStack(alignment: .leading, spacing: 2) {
                Text(grade.subject)
                    .font(AppTypography.body)
                    .foregroundColor(.textPrimary)
                
                Text(grade.date.formatted(date: .abbreviated, time: .omitted))
                    .font(AppTypography.caption)
                    .foregroundColor(.textSecondary)
            }
            
            Spacer()
        }
        .padding(AppSpacing.sm)
        .background(Color.surfaceBackground)
        .cornerRadius(AppRadius.md)
    }
}

struct QuickActionCard: View {
    let title: String
    let icon: String
    let gradient: [Color]
    
    var body: some View {
        VStack(spacing: AppSpacing.md) {
            Image(systemName: icon)
                .font(.title)
                .foregroundColor(.white)
            
            Text(title)
                .font(AppTypography.labelLarge)
                .foregroundColor(.white)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 100)
        .background(
            LinearGradient(
                colors: gradient,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .cornerRadius(AppRadius.lg)
        .shadow(color: gradient[0].opacity(0.3), radius: 8, x: 0, y: 4)
    }
}

struct NotificationsSheet: View {
    @Environment(\.dismiss) private var dismiss
    
    let notifications: [(icon: String, title: String, message: String, time: String, color: Color)] = [
        ("bell.badge.fill", "Новое задание", "Математика: Решить задачи 1-10", "10 мин назад", Color.brandBlue),
        ("calendar.badge.exclamationmark", "Напоминание", "Завтра лекция в 9:00", "1 час назад", Color(hex: "#f59e0b")),
        ("star.fill", "Новая оценка", "Программирование: 5", "2 часа назад", Color(hex: "#10b981")),
        ("message.fill", "Новое сообщение", "Иванов И.И.: Привет!", "3 часа назад", Color.brandPurple)
    ]
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.appBackground
                    .ignoresSafeArea()
                
                ScrollView {
                    LazyVStack(spacing: AppSpacing.md) {
                        ForEach(notifications.indices, id: \.self) { index in
                            NotificationRow(
                                icon: notifications[index].icon,
                                title: notifications[index].title,
                                message: notifications[index].message,
                                time: notifications[index].time,
                                color: notifications[index].color
                            )
                        }
                    }
                    .padding(AppSpacing.md)
                }
            }
            .navigationTitle("Уведомления")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Готово") {
                        dismiss()
                    }
                    .foregroundColor(.brandPurple)
                }
            }
        }
    }
}

struct NotificationRow: View {
    let icon: String
    let title: String
    let message: String
    let time: String
    let color: Color
    
    var body: some View {
        HStack(spacing: AppSpacing.md) {
            // Icon
            ZStack {
                Circle()
                    .fill(color.opacity(0.2))
                    .frame(width: 48, height: 48)
                
                Image(systemName: icon)
                    .foregroundColor(color)
            }
            
            // Content
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(AppTypography.labelLarge)
                    .foregroundColor(.textPrimary)
                
                Text(message)
                    .font(AppTypography.body)
                    .foregroundColor(.textSecondary)
                    .lineLimit(2)
                
                Text(time)
                    .font(AppTypography.caption)
                    .foregroundColor(.textTertiary)
            }
            
            Spacer()
        }
        .padding(AppSpacing.md)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
}

struct StudentDashboard_Previews: PreviewProvider {
    static var previews: some View {
        StudentDashboard()
            .environmentObject(AuthViewModel())
    }
}
