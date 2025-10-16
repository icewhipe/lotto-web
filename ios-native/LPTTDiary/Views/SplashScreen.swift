import SwiftUI

struct SplashScreen: View {
    @State private var isActive = false
    @State private var logoScale: CGFloat = 0.5
    @State private var logoRotation: Double = 0
    @State private var opacity: Double = 0
    @State private var pulseScale: CGFloat = 1.0
    
    var body: some View {
        if isActive {
            ContentView()
        } else {
            ZStack {
                // Simple gradient (no animation for performance)
                LinearGradient(
                    colors: [
                        Color(hex: "#1e1b4b"),
                        Color(hex: "#312e81"),
                        Color(hex: "#4c1d95")
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()
                
                VStack(spacing: 24) {
                    // Animated Logo
                    ZStack {
                        // Pulse effect
                        Circle()
                            .fill(
                                RadialGradient(
                                    colors: [Color.purple.opacity(0.6), Color.clear],
                                    center: .center,
                                    startRadius: 0,
                                    endRadius: 60
                                )
                            )
                            .frame(width: 120, height: 120)
                            .scaleEffect(pulseScale)
                            .opacity(opacity)
                        
                        // Logo
                        Image(systemName: "graduationcap.circle.fill")
                            .font(.system(size: 80))
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.white, .white.opacity(0.9)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .scaleEffect(logoScale)
                            .rotationEffect(.degrees(logoRotation))
                            .opacity(opacity)
                    }
                    
                    // Title
                    VStack(spacing: 8) {
                        Text("ЛПТТ Дневник")
                            .font(.title.bold())
                            .foregroundColor(.white)
                            .opacity(opacity)
                        
                        Text("Загрузка...")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                            .opacity(opacity)
                    }
                    
                    // Simple progress indicator
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        .scaleEffect(1.2)
                        .opacity(opacity)
                }
            }
            .onAppear {
                // Simple, fast animations
                withAnimation(.easeOut(duration: 0.4)) {
                    opacity = 1
                    logoScale = 1.0
                }
                
                withAnimation(.easeInOut(duration: 1).repeatForever(autoreverses: true)) {
                    pulseScale = 1.3
                }
                
                // Quick transition to main app
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                    withAnimation(.easeInOut(duration: 0.3)) {
                        isActive = true
                    }
                }
            }
        }
    }
}

struct SplashScreen_Previews: PreviewProvider {
    static var previews: some View {
        SplashScreen()
    }
}
