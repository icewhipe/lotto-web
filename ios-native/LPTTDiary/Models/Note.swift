import Foundation

struct Note: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let subject: String
    let author: String
    let authorId: String
    let date: Date
    let rating: Double
    let downloads: Int
    let size: String
    let fileUrl: String
    
    init(id: String = UUID().uuidString, title: String, description: String, subject: String, author: String, authorId: String, date: Date = Date(), rating: Double, downloads: Int, size: String, fileUrl: String) {
        self.id = id
        self.title = title
        self.description = description
        self.subject = subject
        self.author = author
        self.authorId = authorId
        self.date = date
        self.rating = rating
        self.downloads = downloads
        self.size = size
        self.fileUrl = fileUrl
    }
}

// Mock data
extension Note {
    static let mockNotes: [Note] = [
        Note(
            title: "Основы ООП в Swift",
            description: "Полный конспект лекций по объектно-ориентированному программированию",
            subject: "Программирование",
            author: "Петров Иван",
            authorId: "1",
            date: Date().addingTimeInterval(-86400),
            rating: 4.8,
            downloads: 127,
            size: "2.4 MB",
            fileUrl: "https://example.com/notes/1"
        ),
        Note(
            title: "SQL Queries Шпаргалка",
            description: "Основные SQL запросы с примерами",
            subject: "Базы данных",
            author: "Сидорова Мария",
            authorId: "2",
            date: Date().addingTimeInterval(-172800),
            rating: 4.5,
            downloads: 89,
            size: "1.2 MB",
            fileUrl: "https://example.com/notes/2"
        ),
        Note(
            title: "Теория вероятностей",
            description: "Конспект лекций + решение задач",
            subject: "Математика",
            author: "Иванов Алексей",
            authorId: "3",
            date: Date().addingTimeInterval(-259200),
            rating: 4.9,
            downloads: 156,
            size: "3.8 MB",
            fileUrl: "https://example.com/notes/3"
        ),
    ]
}
