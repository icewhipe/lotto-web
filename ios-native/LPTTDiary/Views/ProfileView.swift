import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showSettings = false
    @State private var showEditProfile = false
    @State private var showLogoutAlert = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Dark Background
                Color.appBackground
                    .ignoresSafeArea()
                
                ScrollView(.vertical, showsIndicators: false) {
                    VStack(spacing: AppSpacing.lg) {
                        // Profile Header
                        profileHeader
                        
                        // Stats Cards
                        statsGrid
                        
                        // Quick Actions
                        quickActionsSection
                        
                        // Settings Section
                        settingsSection
                        
                        // Logout Button
                        logoutButton
                    }
                    .padding(AppSpacing.md)
                    .padding(.bottom, AppSpacing.xl)
                }
            }
            .navigationTitle("Профиль")
            .navigationBarTitleDisplayMode(.large)
            .toolbarBackground(Color.appBackground, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showSettings = true }) {
                        Image(systemName: "gearshape.fill")
                            .foregroundColor(.textSecondary)
                    }
                }
            }
            .sheet(isPresented: $showSettings) {
                SettingsSheet()
            }
            .sheet(isPresented: $showEditProfile) {
                EditProfileSheet()
            }
            .alert("Выйти из аккаунта?", isPresented: $showLogoutAlert) {
                Button("Отмена", role: .cancel) {}
                Button("Выйти", role: .destructive) {
                    authViewModel.logout()
                }
            } message: {
                Text("Вы уверены, что хотите выйти?")
            }
        }
    }
    
    private var profileHeader: some View {
        VStack(spacing: AppSpacing.lg) {
            // Avatar with gradient ring
            ZStack {
                Circle()
                    .stroke(
                        LinearGradient(
                            colors: [Color.brandPurple, Color.brandPink],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 4
                    )
                    .frame(width: 120, height: 120)
                
                ZStack {
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [Color.brandPurple.opacity(0.3), Color.brandPink.opacity(0.3)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 112, height: 112)
                    
                    Text((authViewModel.user?.name ?? "S").prefix(1))
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(.white)
                }
            }
            
            // Name & Role
            VStack(spacing: AppSpacing.xs) {
                Text(authViewModel.user?.name ?? "Студент")
                    .font(AppTypography.h2)
                    .foregroundColor(.textPrimary)
                
                HStack(spacing: AppSpacing.xs) {
                    Image(systemName: "person.3.fill")
                        .font(.caption)
                    Text("Группа: \(authViewModel.user?.group ?? "ИС-21")")
                        .font(AppTypography.body)
                }
                .foregroundColor(.textSecondary)
                
                // Email
                HStack(spacing: AppSpacing.xs) {
                    Image(systemName: "envelope.fill")
                        .font(.caption)
                    Text(authViewModel.user?.email ?? "student@lptt.ru")
                        .font(AppTypography.caption)
                }
                .foregroundColor(.textTertiary)
            }
            
            // Edit Button
            Button(action: { showEditProfile = true }) {
                Text("Редактировать профиль")
                    .font(AppTypography.button)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, AppSpacing.md)
                    .background(
                        LinearGradient(
                            colors: [Color.brandPurple, Color.brandPink],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .cornerRadius(AppRadius.lg)
            }
        }
        .padding(AppSpacing.lg)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
    
    private var statsGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: AppSpacing.md) {
            ProfileStatCard(title: "Средний балл", value: "4.5", icon: "star.fill", color: .brandBlue)
            ProfileStatCard(title: "Посещаемость", value: "92%", icon: "checkmark.circle.fill", color: Color(hex: "#10b981"))
            ProfileStatCard(title: "Заданий сдано", value: "24", icon: "checkmark.square.fill", color: .brandPurple)
            ProfileStatCard(title: "Конспектов", value: "12", icon: "doc.text.fill", color: Color(hex: "#f59e0b"))
        }
    }
    
    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            Text("Быстрые действия")
                .font(AppTypography.h4)
                .foregroundColor(.textPrimary)
            
            VStack(spacing: 0) {
                ProfileActionRow(
                    icon: "calendar",
                    title: "Моё расписание",
                    subtitle: "Посмотреть расписание занятий"
                ) {}
                
                Divider()
                    .background(Color.border)
                
                ProfileActionRow(
                    icon: "chart.bar.fill",
                    title: "Успеваемость",
                    subtitle: "Детальная статистика по оценкам"
                ) {}
                
                Divider()
                    .background(Color.border)
                
                ProfileActionRow(
                    icon: "bell.fill",
                    title: "Уведомления",
                    subtitle: "Настроить уведомления"
                ) {}
                
                Divider()
                    .background(Color.border)
                
                ProfileActionRow(
                    icon: "questionmark.circle.fill",
                    title: "Помощь",
                    subtitle: "FAQ и поддержка"
                ) {}
            }
            .background(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .fill(Color.cardBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .stroke(Color.borderLight, lineWidth: 1)
            )
        }
    }
    
    private var settingsSection: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            Text("Настройки")
                .font(AppTypography.h4)
                .foregroundColor(.textPrimary)
            
            VStack(spacing: 0) {
                ProfileActionRow(
                    icon: "moon.fill",
                    title: "Тёмная тема",
                    subtitle: "Включена"
                ) {}
                
                Divider()
                    .background(Color.border)
                
                ProfileActionRow(
                    icon: "globe",
                    title: "Язык",
                    subtitle: "Русский"
                ) {}
                
                Divider()
                    .background(Color.border)
                
                ProfileActionRow(
                    icon: "lock.fill",
                    title: "Безопасность",
                    subtitle: "Пароль, биометрия"
                ) {}
            }
            .background(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .fill(Color.cardBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .stroke(Color.borderLight, lineWidth: 1)
            )
        }
    }
    
    private var logoutButton: some View {
        Button(action: { showLogoutAlert = true }) {
            HStack {
                Image(systemName: "rectangle.portrait.and.arrow.right")
                    .font(.title3)
                Text("Выйти из аккаунта")
                    .font(AppTypography.button)
            }
            .foregroundColor(.error)
            .frame(maxWidth: .infinity)
            .padding(.vertical, AppSpacing.md)
            .background(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .fill(Color.error.opacity(0.1))
            )
            .overlay(
                RoundedRectangle(cornerRadius: AppRadius.lg)
                    .stroke(Color.error.opacity(0.3), lineWidth: 1)
            )
        }
    }
}

struct ProfileStatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: AppSpacing.md) {
            // Icon with gradient circle
            ZStack {
                Circle()
                    .fill(color.opacity(0.2))
                    .frame(width: 56, height: 56)
                
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)
            }
            
            // Value
            Text(value)
                .font(AppTypography.stat)
                .foregroundColor(.textPrimary)
            
            // Title
            Text(title)
                .font(AppTypography.caption)
                .foregroundColor(.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, AppSpacing.lg)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
}

struct ProfileActionRow: View {
    let icon: String
    let title: String
    let subtitle: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: AppSpacing.md) {
                // Icon
                ZStack {
                    Circle()
                        .fill(Color.brandPurple.opacity(0.2))
                        .frame(width: 40, height: 40)
                    
                    Image(systemName: icon)
                        .font(.body)
                        .foregroundColor(.brandPurple)
                }
                
                // Text
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(AppTypography.labelLarge)
                        .foregroundColor(.textPrimary)
                    
                    Text(subtitle)
                        .font(AppTypography.caption)
                        .foregroundColor(.textSecondary)
                }
                
                Spacer()
                
                // Chevron
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.textTertiary)
            }
            .padding(AppSpacing.md)
        }
    }
}

struct SettingsSheet: View {
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.appBackground.ignoresSafeArea()
                
                Text("Settings Coming Soon")
                    .font(AppTypography.h3)
                    .foregroundColor(.textSecondary)
            }
            .navigationTitle("Настройки")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Готово") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct EditProfileSheet: View {
    @Environment(\.dismiss) private var dismiss
    @State private var name = "Иван Иванов"
    @State private var email = "student@lptt.ru"
    @State private var phone = "+7 999 123 45 67"
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.appBackground.ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: AppSpacing.lg) {
                        // Avatar edit
                        VStack(spacing: AppSpacing.md) {
                            ZStack {
                                Circle()
                                    .fill(Color.brandPurple.opacity(0.3))
                                    .frame(width: 100, height: 100)
                                
                                Text("И")
                                    .font(.system(size: 40, weight: .bold))
                                    .foregroundColor(.white)
                            }
                            
                            Button("Изменить фото") {
                                // Change photo
                            }
                            .font(AppTypography.buttonSmall)
                            .foregroundColor(.brandPurple)
                        }
                        
                        // Form fields
                        VStack(spacing: AppSpacing.md) {
                            FormField(label: "Имя", text: $name)
                            FormField(label: "Email", text: $email)
                            FormField(label: "Телефон", text: $phone)
                        }
                        
                        // Save button
                        Button(action: { dismiss() }) {
                            Text("Сохранить изменения")
                                .font(AppTypography.button)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, AppSpacing.md)
                                .background(
                                    LinearGradient(
                                        colors: [Color.brandPurple, Color.brandPink],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .cornerRadius(AppRadius.lg)
                        }
                    }
                    .padding(AppSpacing.md)
                }
            }
            .navigationTitle("Редактировать профиль")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Отмена") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct FormField: View {
    let label: String
    @Binding var text: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.sm) {
            Text(label)
                .font(AppTypography.labelLarge)
                .foregroundColor(.textSecondary)
            
            TextField("", text: $text)
                .font(AppTypography.body)
                .foregroundColor(.textPrimary)
                .padding(AppSpacing.md)
                .background(
                    RoundedRectangle(cornerRadius: AppRadius.md)
                        .fill(Color.cardBackground)
                )
                .overlay(
                    RoundedRectangle(cornerRadius: AppRadius.md)
                        .stroke(Color.borderLight, lineWidth: 1)
                )
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
            .environmentObject(AuthViewModel())
    }
}
