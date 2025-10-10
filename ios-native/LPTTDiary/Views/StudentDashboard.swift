import SwiftUI

struct StudentDashboard: View {
    @StateObject private var gradesViewModel = GradesViewModel()
    @StateObject private var scheduleViewModel = ScheduleViewModel()
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var animateCards = false
    @State private var showParticles = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Animated Background
                Color(.systemGroupedBackground)
                    .ignoresSafeArea()
                
                // Floating Particles (reduced count)
                if showParticles {
                    FloatingParticlesView(particleCount: 8)
                        .opacity(0.3)
                        .ignoresSafeArea()
                }
                
                ScrollView {
                    VStack(spacing: 24) {
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
                    .padding()
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Главная")
        }
    }
    
    private var headerView: some View {
        AnimatedCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    VStack(alignment: .leading, spacing: 6) {
                        ShimmerText(text: "Здравствуйте! 👋")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        
                        Text(authViewModel.user?.name ?? "Студент")
                            .font(.title2.bold())
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.purple, .pink],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                        
                        HStack(spacing: 4) {
                            Image(systemName: "person.3.fill")
                                .font(.caption)
                            Text("Группа: \(authViewModel.user?.group ?? "ИС-21")")
                                .font(.subheadline)
                        }
                        .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    // Notification Badge with pulse
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.purple, .pink],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 50, height: 50)
                        
                        Image(systemName: "bell.fill")
                            .foregroundColor(.white)
                        
                        // Badge counter
                        Text("3")
                            .font(.caption2.bold())
                            .foregroundColor(.white)
                            .padding(6)
                            .background(Circle().fill(Color.red))
                            .offset(x: 15, y: -15)
                    }
                }
            }
            .padding()
        }
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.systemBackground))
                .shadow(color: .purple.opacity(0.2), radius: 15, x: 0, y: 10)
        )
    }
    
    private var statsSection: some View {
        HStack(spacing: 12) {
            GlassMorphismCard(gradient: [.green, .mint]) {
                AnimatedStatCard(
                    title: "Ср. балл",
                    value: "4.5",
                    icon: "star.fill",
                    color: .green,
                    delay: 0.1
                )
            }
            
            GlassMorphismCard(gradient: [.blue, .cyan]) {
                AnimatedStatCard(
                    title: "Посещ.",
                    value: "92%",
                    icon: "checkmark.circle.fill",
                    color: .blue,
                    delay: 0.2
                )
            }
            
            GlassMorphismCard(gradient: [.orange, .yellow]) {
                AnimatedStatCard(
                    title: "Заданий",
                    value: "3",
                    icon: "doc.text.fill",
                    color: .orange,
                    delay: 0.3
                )
            }
        }
        .padding(.horizontal, 4)
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
            HStack {
                ShimmerText(text: "Быстрые действия")
                    .font(.title3.bold())
                
                Spacer()
                
                Image(systemName: "sparkles")
                    .foregroundStyle(
                        LinearGradient(
                            colors: [.purple, .pink],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
            }
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                EnhancedQuickActionButton(
                    title: "Конспекты",
                    icon: "doc.text.fill",
                    gradient: [.purple, .pink]
                ) {
                    // Navigate to notes
                }
                
                EnhancedQuickActionButton(
                    title: "Чат группы",
                    icon: "message.fill",
                    gradient: [.blue, .cyan]
                ) {
                    // Navigate to chat
                }
                
                EnhancedQuickActionButton(
                    title: "Прогресс",
                    icon: "chart.line.uptrend.xyaxis",
                    gradient: [.green, .mint]
                ) {
                    // Navigate to progress
                }
                
                EnhancedQuickActionButton(
                    title: "Календарь",
                    icon: "calendar",
                    gradient: [.orange, .yellow]
                ) {
                    // Navigate to calendar
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.systemBackground))
                .shadow(color: .purple.opacity(0.1), radius: 15, x: 0, y: 8)
        )
        .onAppear {
            withAnimation(.easeInOut(duration: 0.5).delay(0.3)) {
                showParticles = true
            }
        }
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
            .cornerRadius(16)
            .shadow(color: gradient[0].opacity(0.3), radius: 8, x: 0, y: 4)
        }
    }
}

struct StudentDashboard_Previews: PreviewProvider {
    static var previews: some View {
        StudentDashboard()
            .environmentObject(AuthViewModel())
    }
}
