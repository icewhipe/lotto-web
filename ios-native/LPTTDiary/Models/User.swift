import Foundation

enum UserRole: String, Codable {
    case student = "student"
    case teacher = "teacher"
    case parent = "parent"
    case admin = "admin"
    case applicant = "applicant"
}

struct User: Codable, Identifiable {
    let id: String
    let name: String
    let email: String
    let role: UserRole
    let group: String?
    let avatar: String?
    
    init(id: String = UUID().uuidString, name: String, email: String, role: UserRole, group: String? = nil, avatar: String? = nil) {
        self.id = id
        self.name = name
        self.email = email
        self.role = role
        self.group = group
        self.avatar = avatar
    }
}

// Mock data
extension User {
    static let student = User(
        name: "Иван Иванов",
        email: "student@lptt.ru",
        role: .student,
        group: "ИС-21"
    )
    
    static let teacher = User(
        name: "Петров Владимир Викторович",
        email: "teacher@lptt.ru",
        role: .teacher
    )
}
