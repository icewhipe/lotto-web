import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var email = ""
    @State private var password = ""
    @State private var showPassword = false
    @State private var isLoading = false
    
    var body: some View {
        ZStack {
            // Gradient background
            LinearGradient(
                colors: [Color.purple, Color.pink],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 32) {
                    Spacer()
                        .frame(height: 60)
                    
                    // Animated Logo with 3D Effect
                    VStack(spacing: 16) {
                        ZStack {
                            // Glow Effect
                            Circle()
                                .fill(
                                    RadialGradient(
                                        colors: [Color.purple.opacity(0.8), Color.clear],
                                        center: .center,
                                        startRadius: 0,
                                        endRadius: 60
                                    )
                                )
                                .frame(width: 120, height: 120)
                                .blur(radius: 20)
                                .scaleEffect(animateGradient ? 1.2 : 1.0)
                            
                            // Logo Icon with rotation and scale
                            Image(systemName: "graduationcap.circle.fill")
                                .font(.system(size: 80))
                                .foregroundStyle(
                                    LinearGradient(
                                        colors: [.white, .white.opacity(0.8)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .shadow(color: .purple.opacity(0.5), radius: 20, x: 0, y: 10)
                                .scaleEffect(logoScale)
                                .rotation3DEffect(
                                    .degrees(logoRotation),
                                    axis: (x: 1, y: 1, z: 0)
                                )
                        }
                        
                        // Title with shimmer effect
                        Text("ЛПТТ Дневник")
                            .font(.system(size: 38, weight: .bold))
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.white, .white.opacity(0.9), .white],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .shadow(color: .black.opacity(0.3), radius: 10, x: 0, y: 5)
                        
                        // Subtitle with fade
                        Text("Электронный дневник студента")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.95))
                            .shadow(color: .black.opacity(0.2), radius: 5)
                        
                        // Animated Badge
                        HStack(spacing: 4) {
                            Image(systemName: "star.fill")
                                .foregroundColor(.yellow)
                            Text("Лучший техникум 2024")
                                .font(.caption)
                                .fontWeight(.semibold)
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(
                            Capsule()
                                .fill(Color.white.opacity(0.2))
                                .overlay(
                                    Capsule()
                                        .stroke(Color.white.opacity(0.3), lineWidth: 1)
                                )
                        )
                        .foregroundColor(.white)
                    }
                    .padding(.bottom, 40)
                    .onAppear {
                        withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
                            logoScale = 1.0
                            logoRotation = 0
                        }
                    }
                    
                    // Login form
                    VStack(spacing: 20) {
                        // Email field
                        HStack {
                            Image(systemName: "envelope.fill")
                                .foregroundColor(.gray)
                            TextField("Email", text: $email)
                                .textContentType(.emailAddress)
                                .autocapitalization(.none)
                                .keyboardType(.emailAddress)
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(12)
                        .shadow(color: .black.opacity(0.1), radius: 5, x: 0, y: 2)
                        
                        // Password field
                        HStack {
                            Image(systemName: "lock.fill")
                                .foregroundColor(.gray)
                            
                            if showPassword {
                                TextField("Пароль", text: $password)
                            } else {
                                SecureField("Пароль", text: $password)
                            }
                            
                            Button(action: { showPassword.toggle() }) {
                                Image(systemName: showPassword ? "eye.slash.fill" : "eye.fill")
                                    .foregroundColor(.gray)
                            }
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(12)
                        .shadow(color: .black.opacity(0.1), radius: 5, x: 0, y: 2)
                        
                        // Login button
                        Button(action: handleLogin) {
                            HStack {
                                if isLoading {
                                    ProgressView()
                                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                } else {
                                    Text("Войти")
                                        .font(.headline)
                                }
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                LinearGradient(
                                    colors: [Color.blue, Color.cyan],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .foregroundColor(.white)
                            .cornerRadius(12)
                            .shadow(color: .black.opacity(0.2), radius: 8, x: 0, y: 4)
                        }
                        .disabled(isLoading)
                        
                        // Quick login buttons
                        VStack(spacing: 12) {
                            Text("Быстрый вход")
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.8))
                            
                            HStack(spacing: 12) {
                                QuickLoginButton(
                                    title: "Студент",
                                    icon: "person.fill",
                                    action: { quickLogin(role: .student) }
                                )
                                
                                QuickLoginButton(
                                    title: "Преподаватель",
                                    icon: "person.text.rectangle.fill",
                                    action: { quickLogin(role: .teacher) }
                                )
                            }
                        }
                        .padding(.top, 8)
                    }
                    .padding(.horizontal, 32)
                    
                    Spacer()
                }
            }
        }
    }
    
    private func handleLogin() {
        guard !email.isEmpty, !password.isEmpty else { return }
        
        isLoading = true
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            authViewModel.login(email: email, password: password)
            isLoading = false
        }
    }
    
    private func quickLogin(role: UserRole) {
        switch role {
        case .student:
            email = "student@lptt.ru"
            password = "123456"
        case .teacher:
            email = "teacher@lptt.ru"
            password = "123456"
        default:
            break
        }
        handleLogin()
    }
}

struct QuickLoginButton: View {
    let title: String
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)
                Text(title)
                    .font(.caption)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.white.opacity(0.2))
            .foregroundColor(.white)
            .cornerRadius(12)
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
            .environmentObject(AuthViewModel())
    }
}
