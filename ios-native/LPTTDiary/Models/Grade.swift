import Foundation
import SwiftUI

enum GradeType: String, Codable {
    case exam = "exam"
    case test = "test"
    case homework = "homework"
    case classwork = "classwork"
}

struct Grade: Codable, Identifiable {
    let id: String
    let subject: String
    let value: Int
    let type: GradeType
    let date: Date
    let teacher: String
    let comment: String?
    
    init(id: String = UUID().uuidString, subject: String, value: Int, type: GradeType, date: Date = Date(), teacher: String, comment: String? = nil) {
        self.id = id
        self.subject = subject
        self.value = value
        self.type = type
        self.date = date
        self.teacher = teacher
        self.comment = comment
    }
    
    var color: Color {
        switch value {
        case 5: return .green
        case 4: return .blue
        case 3: return .orange
        default: return .red
        }
    }
}

struct Subject: Identifiable {
    let id = UUID()
    let name: String
    let teacher: String
    let grades: [Grade]
    
    var average: Double {
        guard !grades.isEmpty else { return 0 }
        let sum = grades.reduce(0) { $0 + $1.value }
        return Double(sum) / Double(grades.count)
    }
    
    var gradientColors: [Color] {
        switch name {
        case "Математика": return [.blue, .cyan]
        case "Программирование": return [.purple, .pink]
        case "Базы данных": return [.green, .mint]
        case "Английский язык": return [.orange, .yellow]
        default: return [.gray, .gray.opacity(0.5)]
        }
    }
}

// Mock data
extension Grade {
    static let mockGrades: [Grade] = [
        Grade(subject: "Математика", value: 5, type: .exam, date: Date(), teacher: "Иванова А.В."),
        Grade(subject: "Программирование", value: 5, type: .homework, date: Date().addingTimeInterval(-86400), teacher: "Петров В.В."),
        Grade(subject: "Базы данных", value: 4, type: .test, date: Date().addingTimeInterval(-172800), teacher: "Сидорова М.И."),
        Grade(subject: "Английский язык", value: 4, type: .classwork, date: Date().addingTimeInterval(-259200), teacher: "Смирнов К.П."),
    ]
}

extension Subject {
    static let mockSubjects: [Subject] = [
        Subject(
            name: "Математика",
            teacher: "Иванова А.В.",
            grades: [
                Grade(subject: "Математика", value: 5, type: .exam, date: Date(), teacher: "Иванова А.В."),
                Grade(subject: "Математика", value: 4, type: .test, date: Date().addingTimeInterval(-86400), teacher: "Иванова А.В."),
                Grade(subject: "Математика", value: 5, type: .homework, date: Date().addingTimeInterval(-172800), teacher: "Иванова А.В."),
                Grade(subject: "Математика", value: 5, type: .classwork, date: Date().addingTimeInterval(-259200), teacher: "Иванова А.В."),
                Grade(subject: "Математика", value: 4, type: .test, date: Date().addingTimeInterval(-345600), teacher: "Иванова А.В."),
            ]
        ),
        Subject(
            name: "Программирование",
            teacher: "Петров В.В.",
            grades: [
                Grade(subject: "Программирование", value: 5, type: .homework, date: Date(), teacher: "Петров В.В."),
                Grade(subject: "Программирование", value: 5, type: .exam, date: Date().addingTimeInterval(-86400), teacher: "Петров В.В."),
                Grade(subject: "Программирование", value: 5, type: .classwork, date: Date().addingTimeInterval(-172800), teacher: "Петров В.В."),
                Grade(subject: "Программирование", value: 4, type: .homework, date: Date().addingTimeInterval(-259200), teacher: "Петров В.В."),
                Grade(subject: "Программирование", value: 5, type: .test, date: Date().addingTimeInterval(-345600), teacher: "Петров В.В."),
            ]
        ),
        Subject(
            name: "Базы данных",
            teacher: "Сидорова М.И.",
            grades: [
                Grade(subject: "Базы данных", value: 4, type: .test, date: Date(), teacher: "Сидорова М.И."),
                Grade(subject: "Базы данных", value: 5, type: .homework, date: Date().addingTimeInterval(-86400), teacher: "Сидорова М.И."),
                Grade(subject: "Базы данных", value: 4, type: .classwork, date: Date().addingTimeInterval(-172800), teacher: "Сидорова М.И."),
                Grade(subject: "Базы данных", value: 5, type: .exam, date: Date().addingTimeInterval(-259200), teacher: "Сидорова М.И."),
                Grade(subject: "Базы данных", value: 4, type: .homework, date: Date().addingTimeInterval(-345600), teacher: "Сидорова М.И."),
            ]
        ),
        Subject(
            name: "Английский язык",
            teacher: "Смирнов К.П.",
            grades: [
                Grade(subject: "Английский язык", value: 4, type: .classwork, date: Date(), teacher: "Смирнов К.П."),
                Grade(subject: "Английский язык", value: 4, type: .test, date: Date().addingTimeInterval(-86400), teacher: "Смирнов К.П."),
                Grade(subject: "Английский язык", value: 5, type: .homework, date: Date().addingTimeInterval(-172800), teacher: "Смирнов К.П."),
                Grade(subject: "Английский язык", value: 4, type: .exam, date: Date().addingTimeInterval(-259200), teacher: "Смирнов К.П."),
                Grade(subject: "Английский язык", value: 4, type: .classwork, date: Date().addingTimeInterval(-345600), teacher: "Смирнов К.П."),
            ]
        ),
    ]
}
