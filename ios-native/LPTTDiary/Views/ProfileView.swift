import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showLogoutAlert = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
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
            .alert("Выход", isPresented: $showLogoutAlert) {
                Button("Отмена", role: .cancel) {}
                Button("Выйти", role: .destructive) {
                    authViewModel.logout()
                }
            } message: {
                Text("Вы уверены, что хотите выйти из аккаунта?")
            }
        }
    }
    
    private var profileHeader: some View {
        VStack(spacing: 16) {
            // Avatar
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: AppColors.primaryGradient,
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 100, height: 100)
                
                Text(authViewModel.user?.name.initials ?? "??")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(.white)
            }
            
            VStack(spacing: 4) {
                Text(authViewModel.user?.name ?? "Пользователь")
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
        .cardStyle()
    }
    
    private var statsSection: some View {
        HStack(spacing: 16) {
            ProfileStatItem(title: "Средний балл", value: "4.5")
            ProfileStatItem(title: "Посещаемость", value: "92%")
            ProfileStatItem(title: "Семестр", value: "3")
        }
        .padding()
        .cardStyle()
    }
    
    private var settingsMenu: some View {
        VStack(spacing: 0) {
            SettingsMenuItem(
                icon: "person.fill",
                title: "Личные данные",
                color: .purple
            ) {}
            
            Divider().padding(.leading, 52)
            
            SettingsMenuItem(
                icon: "bell.fill",
                title: "Уведомления",
                color: .blue
            ) {}
            
            Divider().padding(.leading, 52)
            
            SettingsMenuToggle(
                icon: "moon.fill",
                title: "Темная тема",
                color: .gray
            )
            
            Divider().padding(.leading, 52)
            
            SettingsMenuItem(
                icon: "globe",
                title: "Язык",
                color: .green,
                trailing: "Русский"
            ) {}
            
            Divider().padding(.leading, 52)
            
            SettingsMenuItem(
                icon: "info.circle.fill",
                title: "О приложении",
                color: .orange,
                trailing: "v1.0.0"
            ) {}
        }
        .cardStyle()
    }
    
    private var logoutButton: some View {
        Button {
            showLogoutAlert = true
        } label: {
            HStack {
                Image(systemName: "rectangle.portrait.and.arrow.right")
                Text("Выйти из аккаунта")
            }
            .font(.headline)
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                LinearGradient(
                    colors: [Color.red, Color.pink],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .cornerRadius(12)
        }
    }
}

struct ProfileStatItem: View {
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2.bold())
                .foregroundColor(.purple)
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
    }
}

struct SettingsMenuItem: View {
    let icon: String
    let title: String
    let color: Color
    var trailing: String? = nil
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .foregroundColor(color)
                    .frame(width: 24)
                
                Text(title)
                    .foregroundColor(.primary)
                
                Spacer()
                
                if let trailing = trailing {
                    Text(trailing)
                        .foregroundColor(.secondary)
                }
                
                Image(systemName: "chevron.right")
                    .font(.caption.bold())
                    .foregroundColor(.secondary)
            }
            .padding()
        }
    }
}

struct SettingsMenuToggle: View {
    let icon: String
    let title: String
    let color: Color
    @State private var isOn = false
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: 24)
            
            Text(title)
            
            Spacer()
            
            Toggle("", isOn: $isOn)
                .labelsHidden()
        }
        .padding()
    }
}

#Preview {
    ProfileView()
        .environmentObject(AuthViewModel())
}
