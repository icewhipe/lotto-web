import Foundation
import SwiftUI

@MainActor
class AuthViewModel: ObservableObject {
    @Published var user: User?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let authService = AuthService.shared
    
    init() {
        checkAuthentication()
    }
    
    func checkAuthentication() {
        if let savedUser = authService.getCurrentUser() {
            self.user = savedUser
            self.isAuthenticated = true
        }
    }
    
    func login(email: String, password: String) {
        isLoading = true
        errorMessage = nil
        
        // Mock login - replace with real API call
        Task {
            do {
                let user = try await authService.login(email: email, password: password)
                self.user = user
                self.isAuthenticated = true
            } catch {
                self.errorMessage = error.localizedDescription
            }
            self.isLoading = false
        }
    }
    
    func logout() {
        authService.logout()
        self.user = nil
        self.isAuthenticated = false
    }
}
