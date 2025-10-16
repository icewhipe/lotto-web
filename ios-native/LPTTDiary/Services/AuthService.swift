import Foundation

class AuthService {
    static let shared = AuthService()
    
    private let userDefaultsKey = "currentUser"
    
    private init() {}
    
    func login(email: String, password: String) async throws -> User {
        // Mock authentication - replace with real API call
        try await Task.sleep(nanoseconds: 1_000_000_000) // 1 second delay
        
        let user: User
        
        if email == "student@lptt.ru" && password == "123456" {
            user = User.student
        } else if email == "teacher@lptt.ru" && password == "123456" {
            user = User.teacher
        } else {
            throw AuthError.invalidCredentials
        }
        
        saveUser(user)
        return user
    }
    
    func getCurrentUser() -> User? {
        guard let data = UserDefaults.standard.data(forKey: userDefaultsKey),
              let user = try? JSONDecoder().decode(User.self, from: data) else {
            return nil
        }
        return user
    }
    
    func saveUser(_ user: User) {
        if let encoded = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(encoded, forKey: userDefaultsKey)
        }
    }
    
    func logout() {
        UserDefaults.standard.removeObject(forKey: userDefaultsKey)
    }
}

enum AuthError: LocalizedError {
    case invalidCredentials
    case networkError
    case unknownError
    
    var errorDescription: String? {
        switch self {
        case .invalidCredentials:
            return "Неверный email или пароль"
        case .networkError:
            return "Ошибка сети. Проверьте подключение к интернету"
        case .unknownError:
            return "Произошла неизвестная ошибка"
        }
    }
}
