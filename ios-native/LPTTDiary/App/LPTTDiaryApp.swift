import SwiftUI

@main
struct LPTTDiaryApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    
    var body: some Scene {
        WindowGroup {
            SplashScreen()
                .environmentObject(authViewModel)
        }
    }
}
