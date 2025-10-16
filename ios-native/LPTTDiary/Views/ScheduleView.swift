import SwiftUI

struct ScheduleView: View {
    @StateObject private var viewModel = ScheduleViewModel()
    @State private var selectedDay: String = "ПН"
    @Namespace private var animation
    
    let weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Dark Background
                Color.appBackground
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Week selector
                    weekDaysSelector
                        .padding(.vertical, AppSpacing.md)
                        .background(Color.cardBackground)
                    
                    // Schedule list
                    ScrollView(.vertical, showsIndicators: false) {
                        if viewModel.todayLessons.isEmpty {
                            emptyStateView
                        } else {
                            LazyVStack(spacing: AppSpacing.md) {
                                ForEach(viewModel.todayLessons) { lesson in
                                    LessonCardView(lesson: lesson)
                                }
                            }
                            .padding(AppSpacing.md)
                            .padding(.bottom, AppSpacing.xl)
                        }
                    }
                }
            }
            .navigationTitle("Расписание")
            .navigationBarTitleDisplayMode(.large)
            .toolbarBackground(Color.appBackground, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
    }
    
    private var weekDaysSelector: some View {
        HStack(spacing: AppSpacing.sm) {
            ForEach(weekDays, id: \.self) { day in
                DayButton(
                    day: day,
                    isSelected: selectedDay == day,
                    namespace: animation
                ) {
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
                        selectedDay = day
                    }
                }
            }
        }
        .padding(.horizontal, AppSpacing.md)
    }
    
    private var emptyStateView: some View {
        VStack(spacing: AppSpacing.lg) {
            Spacer()
            
            Image(systemName: "calendar.badge.clock")
                .font(.system(size: 60))
                .foregroundColor(.textSecondary)
            
            Text("Нет занятий")
                .font(AppTypography.h3)
                .foregroundColor(.textPrimary)
            
            Text("На сегодня занятий не запланировано")
                .font(AppTypography.body)
                .foregroundColor(.textSecondary)
                .multilineTextAlignment(.center)
            
            Spacer()
        }
        .padding()
    }
}

struct DayButton: View {
    let day: String
    let isSelected: Bool
    let namespace: Namespace.ID
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text(day)
                    .font(AppTypography.labelLarge)
                    .fontWeight(isSelected ? .bold : .medium)
                    .foregroundColor(isSelected ? .white : .textSecondary)
                
                if isSelected {
                    Circle()
                        .fill(Color.brandPurple)
                        .frame(width: 4, height: 4)
                        .matchedGeometryEffect(id: "indicator", in: namespace)
                } else {
                    Circle()
                        .fill(Color.clear)
                        .frame(width: 4, height: 4)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, AppSpacing.sm)
            .background(
                RoundedRectangle(cornerRadius: AppRadius.md)
                    .fill(isSelected ? Color.brandPurple.opacity(0.2) : Color.clear)
            )
        }
    }
}

struct LessonCardView: View {
    let lesson: Lesson
    @State private var isExpanded = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            // Main info
            HStack(spacing: AppSpacing.md) {
                // Time
                VStack(alignment: .center, spacing: 2) {
                    let timeParts = lesson.time.components(separatedBy: "-")
                    Text(timeParts.first?.trimmingCharacters(in: .whitespaces) ?? lesson.time)
                        .font(AppTypography.h4)
                        .foregroundColor(.textPrimary)
                    
                    if timeParts.count > 1 {
                        Text(timeParts[1].trimmingCharacters(in: .whitespaces))
                            .font(AppTypography.caption)
                            .foregroundColor(.textSecondary)
                    }
                }
                .frame(width: 60)
                
                Rectangle()
                    .fill(lessonTypeColor)
                    .frame(width: 3)
                    .cornerRadius(1.5)
                
                // Lesson details
                VStack(alignment: .leading, spacing: 4) {
                    Text(lesson.subject)
                        .font(AppTypography.h4)
                        .foregroundColor(.textPrimary)
                    
                    HStack(spacing: AppSpacing.xs) {
                        Image(systemName: "person.fill")
                            .font(.caption)
                        Text(lesson.teacher)
                            .font(AppTypography.caption)
                    }
                    .foregroundColor(.textSecondary)
                    
                    HStack(spacing: AppSpacing.xs) {
                        Image(systemName: "location.fill")
                            .font(.caption)
                        Text(lesson.room)
                            .font(AppTypography.caption)
                    }
                    .foregroundColor(.textSecondary)
                }
                
                Spacer()
                
                // Type badge
                Text(lessonTypeText)
                    .font(AppTypography.captionBold)
                    .foregroundColor(lessonTypeColor)
                    .padding(.horizontal, AppSpacing.sm)
                    .padding(.vertical, 4)
                    .background(
                        Capsule()
                            .fill(lessonTypeColor.opacity(0.2))
                    )
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
    
    private var lessonTypeColor: Color {
        switch lesson.type {
        case .lecture: return Color.brandBlue
        case .practice: return Color(hex: "#10b981")
        case .lab: return Color.brandPurple
        case .seminar: return Color(hex: "#f59e0b")
        }
    }
    
    private var lessonTypeText: String {
        switch lesson.type {
        case .lecture: return "ЛК"
        case .practice: return "ПР"
        case .lab: return "ЛБ"
        case .seminar: return "СМ"
        }
    }
}

struct ScheduleView_Previews: PreviewProvider {
    static var previews: some View {
        ScheduleView()
    }
}
