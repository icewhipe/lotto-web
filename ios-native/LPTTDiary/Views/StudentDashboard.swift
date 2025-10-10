import SwiftUI

struct StudentDashboard: View {
    @StateObject private var gradesViewModel = GradesViewModel()
    @StateObject private var scheduleViewModel = ScheduleViewModel()
    @EnvironmentObject var authViewModel: AuthViewModel
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
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
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Главная")
        }
    }
    
    private var headerView: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Здравствуйте! 👋")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Text(authViewModel.user?.name ?? "Студент")
                .font(.title2.bold())
            
            Text("Группа: \(authViewModel.user?.group ?? "ИС-21")")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var statsSection: some View {
        HStack(spacing: 12) {
            StatCard(
                title: "Ср. балл",
                value: "4.5",
                icon: "star.fill",
                color: .green
            )
            
            StatCard(
                title: "Посещ.",
                value: "92%",
                icon: "checkmark.circle.fill",
                color: .blue
            )
            
            StatCard(
                title: "Заданий",
                value: "3",
                icon: "doc.text.fill",
                color: .orange
            )
        }
    }
    
    private var todayScheduleSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Расписание на сегодня")
                    .font(.headline)
                Spacer()
                NavigationLink("Все") {
                    ScheduleView()
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            
            VStack(spacing: 12) {
                ForEach(scheduleViewModel.todayLessons.prefix(3)) { lesson in
                    LessonCard(lesson: lesson, isCompact: true)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var recentGradesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Последние оценки")
                    .font(.headline)
                Spacer()
                NavigationLink("Все") {
                    GradesView()
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            
            VStack(spacing: 12) {
                ForEach(gradesViewModel.recentGrades.prefix(3)) { grade in
                    GradeRow(grade: grade)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Быстрые действия")
                .font(.headline)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                QuickActionButton(
                    title: "Конспекты",
                    icon: "doc.text.fill",
                    gradient: [.purple, .pink]
                ) {
                    // Navigate to notes
                }
                
                QuickActionButton(
                    title: "Чат группы",
                    icon: "message.fill",
                    gradient: [.blue, .cyan]
                ) {
                    // Navigate to chat
                }
                
                QuickActionButton(
                    title: "Прогресс",
                    icon: "chart.line.uptrend.xyaxis",
                    gradient: [.green, .mint]
                ) {
                    // Navigate to progress
                }
                
                QuickActionButton(
                    title: "Календарь",
                    icon: "calendar",
                    gradient: [.orange, .yellow]
                ) {
                    // Navigate to calendar
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

struct GradeRow: View {
    let grade: Grade
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(grade.subject)
                    .font(.subheadline.bold())
                Text(grade.date.formatted(date: .abbreviated, time: .omitted))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Text("\(grade.value)")
                .font(.title3.bold())
                .foregroundColor(grade.color)
                .frame(width: 40, height: 40)
                .background(grade.color.opacity(0.2))
                .clipShape(Circle())
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

struct QuickActionButton: View {
    let title: String
    let icon: String
    let gradient: [Color]
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(.white)
                
                Text(title)
                    .font(.subheadline.bold())
                    .foregroundColor(.white)
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
            .cornerRadius(16)
            .shadow(color: gradient[0].opacity(0.3), radius: 8, x: 0, y: 4)
        }
    }
}

#Preview {
    StudentDashboard()
        .environmentObject(AuthViewModel())
}
