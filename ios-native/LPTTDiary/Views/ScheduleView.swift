import SwiftUI

struct ScheduleView: View {
    @StateObject private var viewModel = ScheduleViewModel()
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Week days selector
                weekDaysSelector
                
                // Schedule list
                ScrollView {
                    if viewModel.todayLessons.isEmpty {
                        emptyStateView
                    } else {
                        VStack(spacing: 12) {
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
    
    private var weekDaysSelector: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 12) {
                ForEach(0..<6) { day in
                    DayButton(
                        dayNumber: day,
                        isSelected: viewModel.selectedDay == day,
                        dayName: getDayName(day)
                    ) {
                        withAnimation(.spring(response: 0.3)) {
                            viewModel.selectedDay = day
                        }
                    }
                }
            }
            .padding()
        }
        .background(Color(.systemBackground))
    }
    
    private var emptyStateView: some View {
        VStack(spacing: 16) {
            Image(systemName: "calendar.badge.exclamationmark")
                .font(.system(size: 60))
                .foregroundColor(.gray)
            
            Text("Занятий нет")
                .font(.title3.bold())
            
            Text("В этот день нет запланированных занятий")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 60)
    }
    
    private func getDayName(_ day: Int) -> String {
        let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
        return day < days.count ? days[day] : ""
    }
}

struct DayButton: View {
    let dayNumber: Int
    let isSelected: Bool
    let dayName: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Text(dayName)
                    .font(.caption.bold())
                
                Text("\(dayNumber + 1)")
                    .font(.title3.bold())
            }
            .frame(width: 50, height: 70)
            .foregroundColor(isSelected ? .white : .primary)
            .background(
                isSelected ?
                LinearGradient(
                    colors: [.blue, .cyan],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ) :
                LinearGradient(
                    colors: [Color(.systemGray6), Color(.systemGray6)],
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
            .cornerRadius(12)
            .shadow(
                color: isSelected ? .blue.opacity(0.3) : .clear,
                radius: 8,
                x: 0,
                y: 4
            )
        }
    }
}

#Preview {
    ScheduleView()
}
