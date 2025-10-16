import Foundation

class APIService {
    static let shared = APIService()
    
    private let baseURL = "https://api.lptt.ru/api"
    private let session: URLSession
    
    private init() {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 30
        self.session = URLSession(configuration: configuration)
    }
    
    // MARK: - Generic Request
    
    private func request<T: Decodable>(
        endpoint: String,
        method: String = "GET",
        body: Data? = nil
    ) async throws -> T {
        guard let url = URL(string: "\(baseURL)\(endpoint)") else {
            throw APIError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Add auth token if available
        if let token = getAuthToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        if let body = body {
            request.httpBody = body
        }
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        
        guard (200...299).contains(httpResponse.statusCode) else {
            throw APIError.serverError(httpResponse.statusCode)
        }
        
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        
        return try decoder.decode(T.self, from: data)
    }
    
    // MARK: - Grades
    
    func getGrades() async throws -> [Grade] {
        // Mock implementation
        return Grade.mockGrades
    }
    
    func getSubjects() async throws -> [Subject] {
        // Mock implementation
        return Subject.mockSubjects
    }
    
    // MARK: - Schedule
    
    func getSchedule() async throws -> [DaySchedule] {
        // Mock implementation
        return DaySchedule.mockSchedule
    }
    
    // MARK: - Notes
    
    func getNotes() async throws -> [Note] {
        // Mock implementation
        return Note.mockNotes
    }
    
    func downloadNote(id: String) async throws {
        // Implementation
    }
    
    // MARK: - Helpers
    
    private func getAuthToken() -> String? {
        // Get token from Keychain or UserDefaults
        return nil
    }
}

enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case serverError(Int)
    case decodingError
    case networkError
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Неверный URL"
        case .invalidResponse:
            return "Неверный ответ сервера"
        case .serverError(let code):
            return "Ошибка сервера: \(code)"
        case .decodingError:
            return "Ошибка обработки данных"
        case .networkError:
            return "Ошибка сети"
        }
    }
}
