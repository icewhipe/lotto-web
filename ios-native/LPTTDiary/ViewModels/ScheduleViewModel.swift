import Foundation
import SwiftUI

@MainActor
class ScheduleViewModel: ObservableObject {
    @Published var schedule: [DaySchedule] = []
    @Published var selectedDay: Int = 0
    @Published var isLoading = false
    
    init() {
        loadSchedule()
        selectedDay = getCurrentDayOfWeek()
    }
    
    func loadSchedule() {
        // Mock data - replace with API call
        schedule = DaySchedule.mockSchedule
    }
    
    var todayLessons: [Lesson] {
        schedule.first(where: { $0.dayOfWeek == selectedDay })?.lessons ?? []
    }
    
    private func getCurrentDayOfWeek() -> Int {
        let calendar = Calendar.current
        let weekday = calendar.component(.weekday, from: Date())
        // Convert Sunday=1...Saturday=7 to Monday=0...Sunday=6
        return weekday == 1 ? 6 : weekday - 2
    }
}
