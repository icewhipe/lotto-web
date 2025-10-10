import Foundation
import SwiftUI

enum LessonType: String, Codable {
    case lecture = "Лекция"
    case practice = "Практика"
    case lab = "Лаборатор работа"
    case seminar = "Семинар"
    
    var color: Color {
        switch self {
        case .lecture: return .blue
        case .practice: return .green
        case .lab: return .purple
        case .seminar: return .orange
        }
    }
}

struct Lesson: Codable, Identifiable {
    let id: String
    let time: String
    let subject: String
    let teacher: String
    let room: String
    let type: LessonType
    let group: String?
    
    init(id: String = UUID().uuidString, time: String, subject: String, teacher: String, room: String, type: LessonType, group: String? = nil) {
        self.id = id
        self.time = time
        self.subject = subject
        self.teacher = teacher
        self.room = room
        self.type = type
        self.group = group
    }
}

struct DaySchedule: Identifiable {
    let id = UUID()
    let dayOfWeek: Int // 0 = Monday, 6 = Sunday
    let lessons: [Lesson]
    
    var dayName: String {
        let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
        return dayOfWeek < days.count ? days[dayOfWeek] : ""
    }
    
    var shortDayName: String {
        let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
        return dayOfWeek < days.count ? days[dayOfWeek] : ""
    }
}

// Mock data
extension Lesson {
    static let mockLessons: [Lesson] = [
        Lesson(time: "09:00", subject: "Математика", teacher: "Иванова А.В.", room: "205", type: .lecture),
        Lesson(time: "10:45", subject: "Программирование", teacher: "Петров В.В.", room: "301", type: .practice),
        Lesson(time: "12:30", subject: "Физкультура", teacher: "Кузнецов С.А.", room: "Спортзал", type: .practice),
    ]
}

extension DaySchedule {
    static let mockSchedule: [DaySchedule] = [
        DaySchedule(dayOfWeek: 0, lessons: [
            Lesson(time: "09:00", subject: "Математика", teacher: "Иванова А.В.", room: "205", type: .lecture),
            Lesson(time: "10:45", subject: "Программирование", teacher: "Петров В.В.", room: "301", type: .practice),
            Lesson(time: "12:30", subject: "Физкультура", teacher: "Кузнецов С.А.", room: "Спортзал", type: .practice),
        ]),
        DaySchedule(dayOfWeek: 1, lessons: [
            Lesson(time: "09:00", subject: "Базы данных", teacher: "Сидорова М.И.", room: "302", type: .lecture),
            Lesson(time: "10:45", subject: "Английский язык", teacher: "Смирнов К.П.", room: "105", type: .practice),
            Lesson(time: "12:30", subject: "Программирование", teacher: "Петров В.В.", room: "301", type: .lab),
        ]),
        DaySchedule(dayOfWeek: 2, lessons: [
            Lesson(time: "09:00", subject: "Математика", teacher: "Иванова А.В.", room: "205", type: .practice),
            Lesson(time: "10:45", subject: "Базы данных", teacher: "Сидорова М.И.", room: "302", type: .lab),
        ]),
        DaySchedule(dayOfWeek: 3, lessons: [
            Lesson(time: "09:00", subject: "Английский язык", teacher: "Смирнов К.П.", room: "105", type: .lecture),
            Lesson(time: "10:45", subject: "Программирование", teacher: "Петров В.В.", room: "301", type: .practice),
            Lesson(time: "12:30", subject: "Физкультура", teacher: "Кузнецов С.А.", room: "Спортзал", type: .practice),
        ]),
        DaySchedule(dayOfWeek: 4, lessons: [
            Lesson(time: "09:00", subject: "Базы данных", teacher: "Сидорова М.И.", room: "302", type: .practice),
            Lesson(time: "10:45", subject: "Математика", teacher: "Иванова А.В.", room: "205", type: .lecture),
        ]),
        DaySchedule(dayOfWeek: 5, lessons: []),
    ]
}
