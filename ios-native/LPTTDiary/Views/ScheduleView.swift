import SwiftUI

struct ScheduleView: View {
    @StateObject private var viewModel = ScheduleViewModel()
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Week days tabs
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(viewModel.schedule) { day in
                            WeekDayTab(
                                day: day,
                                isSelected: day.dayOfWeek == viewModel.selectedDay
                            ) {
                                withAnimation {
                                    viewModel.selectedDay = day.dayOfWeek
                                }
                            }
                        }
                    }
                    .padding()
                }
                .background(Color(.systemBackground))
                
                // Lessons list
                ScrollView {
                    if viewModel.todayLessons.isEmpty {
                        EmptyScheduleView()
                    } else {
                        LazyVStack(spacing: 12) {
                            ForEach(viewModel.todayLessons) { lesson in
                                LessonCard(lesson: lesson)
                            }
                        }
                        .padding()
                    }
                }
                .background(Color(.systemGroupedBackground))
            }
            .navigationTitle("Расписание")
        }
    }
}

struct WeekDayTab: View {
    let day: DaySchedule
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text(day.shortDayName)
                    .font(.caption.bold())
                
                Circle()
                    .frame(width: 6, height: 6)
                    .opacity(isSelected ? 1 : 0)
            }
            .foregroundColor(isSelected ? .white : .primary)
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(
                isSelected ?
                LinearGradient(colors: AppColors.primaryGradient, startPoint: .leading, endPoint: .trailing) :
                    LinearGradient(colors: [Color(.systemGray6), Color(.systemGray6)], startPoint: .leading, endPoint: .trailing)
            )
            .cornerRadius(12)
        }
    }
}

struct EmptyScheduleView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "calendar.badge.exclamationmark")
                .font(.system(size: 64))
                .foregroundColor(.gray)
            
            Text("Нет занятий")
                .font(.title3.bold())
            
            Text("На этот день занятия не запланированы")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .frame(minHeight: 400)
    }
}

#Preview {
    ScheduleView()
}
