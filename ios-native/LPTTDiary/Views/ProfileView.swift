import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showLogoutAlert = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header with avatar
                    profileHeader
                    
                    // Stats
                    statsSection
                    
                    // Settings menu
                    settingsMenu
                    
                    // Logout button
                    logoutButton
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Профиль")
        }
        .alert("Выход", isPresented: $showLogoutAlert) {
            Button("Отмена", role: .cancel) {}
            Button("Выйти", role: .destructive) {
                authViewModel.logout()
            }
        } message: {
            Text("Вы уверены, что хотите выйти?")
        }
    }
    
    private var profileHeader: some View {
        VStack(spacing: 16) {
            // Avatar
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.purple, .pink],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 100, height: 100)
                
                Text(authViewModel.user?.name.initials ?? "ИИ")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(.white)
            }
            .shadow(color: .purple.opacity(0.3), radius: 10, x: 0, y: 5)
            
            // Name and info
            VStack(spacing: 4) {
                Text(authViewModel.user?.name ?? "Иван Иванов")
                    .font(.title2.bold())
                
                if let group = authViewModel.user?.group {
                    Text("Группа: \(group)")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                
                Text(authViewModel.user?.email ?? "")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(20)
    }
    
    private var statsSection: some View {
        HStack(spacing: 16) {
            StatItem(title: "Ср. балл", value: "4.5")
            Divider().frame(height: 40)
            StatItem(title: "Посещ.", value: "92%")
            Divider().frame(height: 40)
            StatItem(title: "Семестр", value: "3")
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var settingsMenu: some View {
        VStack(spacing: 0) {
            SettingsRow(icon: "person.fill", title: "Личные данные", iconColor: .purple) {}
            Divider().padding(.leading, 60)
            
            SettingsRow(icon: "bell.fill", title: "Уведомления", iconColor: .blue) {}
            Divider().padding(.leading, 60)
            
            SettingsRow(icon: "moon.fill", title: "Темная тема", iconColor: .indigo, hasToggle: true) {}
            Divider().padding(.leading, 60)
            
            SettingsRow(icon: "globe", title: "Язык", iconColor: .green) {}
            Divider().padding(.leading, 60)
            
            SettingsRow(icon: "info.circle.fill", title: "О приложении", iconColor: .orange) {}
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private var logoutButton: some View {
        Button(action: { showLogoutAlert = true }) {
            HStack {
                Image(systemName: "rectangle.portrait.and.arrow.right")
                    .font(.headline)
                Text("Выйти")
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                LinearGradient(
                    colors: [.red, .pink],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .foregroundColor(.white)
            .cornerRadius(12)
        }
    }
}

struct StatItem: View {
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2.bold())
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}

struct SettingsRow: View {
    let icon: String
    let title: String
    let iconColor: Color
    var hasToggle: Bool = false
    let action: () -> Void
    
    @State private var isToggled = false
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(.white)
                    .frame(width: 36, height: 36)
                    .background(iconColor)
                    .cornerRadius(8)
                
                Text(title)
                    .font(.body)
                    .foregroundColor(.primary)
                
                Spacer()
                
                if hasToggle {
                    Toggle("", isOn: $isToggled)
                        .labelsHidden()
                } else {
                    Image(systemName: "chevron.right")
                        .font(.caption.bold())
                        .foregroundColor(.secondary)
                }
            }
            .padding()
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
            .environmentObject(AuthViewModel())
    }
}
