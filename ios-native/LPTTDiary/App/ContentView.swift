import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    var body: some View {
        Group {
            if authViewModel.isAuthenticated {
                MainTabView()
            } else {
                LoginView()
            }
        }
        .animation(.easeInOut, value: authViewModel.isAuthenticated)
    }
}

struct MainTabView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    var body: some View {
        TabView {
            if authViewModel.user?.role == .student {
                // Student tabs
                StudentDashboard()
                    .tabItem {
                        Label("Главная", systemImage: "house.fill")
                    }
                
                GradesView()
                    .tabItem {
                        Label("Оценки", systemImage: "graduationcap.fill")
                    }
                
                ScheduleView()
                    .tabItem {
                        Label("Расписание", systemImage: "calendar")
                    }
                
                NotesView()
                    .tabItem {
                        Label("Конспекты", systemImage: "doc.text.fill")
                    }
                
                ProfileView()
                    .tabItem {
                        Label("Профиль", systemImage: "person.fill")
                    }
            } else if authViewModel.user?.role == .teacher {
                // Teacher tabs
                TeacherDashboard()
                    .tabItem {
                        Label("Главная", systemImage: "house.fill")
                    }
                
                ProfileView()
                    .tabItem {
                        Label("Профиль", systemImage: "person.fill")
                    }
            }
        }
        .accentColor(.primary)
    }
}
