import SwiftUI

struct TeacherDashboard: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    let groups = [
        ("ИС-21", 28, "Программирование", 4.5, 94),
        ("ИС-22", 25, "Базы данных", 4.2, 89),
        ("АТ-21", 30, "Программирование", 4.3, 91),
    ]
    
    let todayLessons = [
        ("09:00", "ИС-21", "Программирование", "205", true),
        ("10:45", "ИС-22", "Базы данных", "301", true),
        ("14:00", "АТ-21", "Программирование", "205", false),
    ]
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    headerView
                    
                    // Quick stats
                    statsSection
                    
                    // Today's lessons
                    todayLessonsSection
                    
                    // My groups
                    myGroupsSection
                    
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
            
            Text(authViewModel.user?.name ?? "Преподаватель")
                .font(.title2.bold())
            
            Text("Преподаватель информатики")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .cardStyle()
    }
    
    private var statsSection: some View {
        HStack(spacing: 12) {
            StatCard(title: "Группы", value: "3", icon: "person.3.fill", color: .blue)
            StatCard(title: "Студенты", value: "83", icon: "graduationcap.fill", color: .green)
            StatCard(title: "Пары/нед", value: "18", icon: "calendar", color: .orange)
        }
    }
    
    private var todayLessonsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Занятия на сегодня")
                .font(.headline)
            
            VStack(spacing: 12) {
                ForEach(todayLessons, id: \.0) { lesson in
                    TeacherLessonCard(
                        time: lesson.0,
                        group: lesson.1,
                        subject: lesson.2,
                        room: lesson.3,
                        isCompleted: lesson.4
                    )
                }
            }
        }
        .padding()
        .cardStyle()
    }
    
    private var myGroupsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Мои группы")
                    .font(.headline)
                Spacer()
                Button("Все →") {}
                    .font(.subheadline)
                    .foregroundColor(.blue)
            }
            
            VStack(spacing: 12) {
                ForEach(groups, id: \.0) { group in
                    TeacherGroupCard(
                        name: group.0,
                        students: group.1,
                        subject: group.2,
                        avgGrade: group.3,
                        attendance: group.4
                    )
                }
            }
        }
        .padding()
        .cardStyle()
    }
    
    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Быстрые действия")
                .font(.headline)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                QuickActionButton(title: "Выставить оценки", icon: "pencil", gradient: [.purple, .pink]) {}
                QuickActionButton(title: "Создать задание", icon: "doc.badge.plus", gradient: [.blue, .cyan]) {}
                QuickActionButton(title: "Посещаемость", icon: "checkmark.circle", gradient: [.green, .mint]) {}
                QuickActionButton(title: "Отчёты", icon: "chart.bar", gradient: [.orange, .yellow]) {}
            }
        }
        .padding()
        .cardStyle()
    }
}

struct TeacherLessonCard: View {
    let time: String
    let group: String
    let subject: String
    let room: String
    let isCompleted: Bool
    
    var body: some View {
        HStack {
            Circle()
                .fill(isCompleted ? Color.green : Color.purple)
                .frame(width: 40, height: 40)
                .overlay(
                    Image(systemName: isCompleted ? "checkmark" : "clock.fill")
                        .foregroundColor(.white)
                        .font(.caption)
                )
            
            VStack(alignment: .leading, spacing: 4) {
                Text(time)
                    .font(.caption.bold())
                    .foregroundColor(isCompleted ? .green : .purple)
                Text("Группа \(group)")
                    .font(.subheadline.bold())
                Text(subject)
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text("Каб. \(room)")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

struct TeacherGroupCard: View {
    let name: String
    let students: Int
    let subject: String
    let avgGrade: Double
    let attendance: Int
    
    var body: some View {
        HStack {
            Circle()
                .fill(LinearGradient(colors: AppColors.blueGradient, startPoint: .topLeading, endPoint: .bottomTrailing))
                .frame(width: 48, height: 48)
                .overlay(
                    Text(name)
                        .font(.caption.bold())
                        .foregroundColor(.white)
                )
            
            VStack(alignment: .leading, spacing: 4) {
                Text(subject)
                    .font(.subheadline.bold())
                Text("\(students) студентов")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                HStack(spacing: 16) {
                    Label("Ср. балл: \(String(format: "%.1f", avgGrade))", systemImage: "star.fill")
                    Label("Посещ.: \(attendance)%", systemImage: "checkmark.circle.fill")
                }
                .font(.caption2.bold())
                .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

#Preview {
    TeacherDashboard()
        .environmentObject(AuthViewModel())
}
