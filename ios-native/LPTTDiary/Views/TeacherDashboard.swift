import SwiftUI

struct TeacherDashboard: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    teacherHeader
                    
                    // Quick stats
                    statsGrid
                    
                    // Today's lessons
                    todayLessonsSection
                    
                    // My groups
                    myGroupsSection
                    
                    // Quick actions
                    quickActionsGrid
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Главная")
        }
    }
    
    private var teacherHeader: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Здравствуйте! 👋")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Text("Петров Владимир Викторович")
                .font(.title2.bold())
            
            Text("Преподаватель информатики")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var statsGrid: some View {
        HStack(spacing: 12) {
            TeacherStatCard(value: "3", label: "Группы", color: .blue)
            TeacherStatCard(value: "83", label: "Студенты", color: .green)
            TeacherStatCard(value: "18", label: "Пары/нед", color: .orange)
        }
    }
    
    private var todayLessonsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Занятия на сегодня")
                .font(.headline)
            
            VStack(spacing: 12) {
                TeacherLessonCard(
                    time: "09:00",
                    group: "ИС-21",
                    subject: "Программирование",
                    room: "205",
                    status: .completed
                )
                
                TeacherLessonCard(
                    time: "10:45",
                    group: "ИС-22",
                    subject: "Базы данных",
                    room: "301",
                    status: .completed
                )
                
                TeacherLessonCard(
                    time: "14:00",
                    group: "АТ-21",
                    subject: "Программирование",
                    room: "205",
                    status: .upcoming
                )
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
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
                GroupCard(
                    name: "ИС-21",
                    students: 28,
                    subject: "Программирование",
                    avgGrade: 4.5,
                    attendance: 94
                )
                
                GroupCard(
                    name: "ИС-22",
                    students: 25,
                    subject: "Базы данных",
                    avgGrade: 4.2,
                    attendance: 89
                )
                
                GroupCard(
                    name: "АТ-21",
                    students: 30,
                    subject: "Программирование",
                    avgGrade: 4.3,
                    attendance: 91
                )
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var quickActionsGrid: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Быстрые действия")
                .font(.headline)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                TeacherActionButton(
                    title: "Выставить оценки",
                    icon: "pencil.circle.fill",
                    gradient: [.purple, .pink]
                ) {}
                
                TeacherActionButton(
                    title: "Создать задание",
                    icon: "doc.badge.plus",
                    gradient: [.blue, .cyan]
                ) {}
                
                TeacherActionButton(
                    title: "Посещаемость",
                    icon: "checkmark.circle.fill",
                    gradient: [.green, .mint]
                ) {}
                
                TeacherActionButton(
                    title: "Отчёты",
                    icon: "chart.bar.fill",
                    gradient: [.orange, .yellow]
                ) {}
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

struct TeacherStatCard: View {
    let value: String
    let label: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Text(value)
                .font(.system(size: 32, weight: .bold))
                .foregroundColor(color)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

enum LessonStatus {
    case completed, upcoming
    
    var color: Color {
        switch self {
        case .completed: return .green
        case .upcoming: return .purple
        }
    }
    
    var icon: String {
        switch self {
        case .completed: return "checkmark"
        case .upcoming: return "clock"
        }
    }
}

struct TeacherLessonCard: View {
    let time: String
    let group: String
    let subject: String
    let room: String
    let status: LessonStatus
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: status.icon)
                .font(.title3)
                .foregroundColor(.white)
                .frame(width: 40, height: 40)
                .background(status.color)
                .cornerRadius(10)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(time)
                    .font(.caption.bold())
                    .foregroundColor(.blue)
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
            
            Button(action: {}) {
                Image(systemName: "doc.text")
                    .foregroundColor(.blue)
            }
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

struct GroupCard: View {
    let name: String
    let students: Int
    let subject: String
    let avgGrade: Double
    let attendance: Int
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(name)
                    .font(.title3.bold())
                    .foregroundColor(.white)
                    .frame(width: 48, height: 48)
                    .background(
                        LinearGradient(
                            colors: [.blue, .cyan],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .cornerRadius(12)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(subject)
                        .font(.subheadline.bold())
                    Text("\(students) студентов")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.secondary)
            }
            
            HStack(spacing: 16) {
                HStack(spacing: 4) {
                    Image(systemName: "star.fill")
                        .font(.caption)
                        .foregroundColor(.green)
                    Text("Ср. балл: \(String(format: "%.1f", avgGrade))")
                        .font(.caption.bold())
                }
                
                HStack(spacing: 4) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.caption)
                        .foregroundColor(.blue)
                    Text("Посещ.: \(attendance)%")
                        .font(.caption.bold())
                }
            }
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

struct TeacherActionButton: View {
    let title: String
    let icon: String
    let gradient: [Color]
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)
                Text(title)
                    .font(.caption.bold())
                    .multilineTextAlignment(.center)
            }
            .foregroundColor(.white)
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

struct TeacherDashboard_Previews: PreviewProvider {
    static var previews: some View {
        TeacherDashboard()
    }
}
