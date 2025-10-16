import SwiftUI

struct MeshGradientBackground: View {
    @Binding var animate: Bool
    let colors: [Color] = [.purple, .pink, .blue]
    
    var body: some View {
        ZStack {
            // Base gradient (static, no animation)
            LinearGradient(
                colors: [
                    Color(hex: "#1e1b4b"),
                    Color(hex: "#312e81"),
                    Color(hex: "#4c1d95")
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            // Reduced orbs (3 instead of 5)
            ForEach(0..<3, id: \.self) { index in
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                colors[index].opacity(0.4),
                                colors[index].opacity(0.2),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 0,
                            endRadius: 150
                        )
                    )
                    .frame(width: 250, height: 250)
                    .blur(radius: 40)
                    .offset(
                        x: animate ? CGFloat.random(in: -80...80) : CGFloat.random(in: -150...150),
                        y: animate ? CGFloat.random(in: -80...80) : CGFloat.random(in: -150...150)
                    )
                    .animation(
                        .easeInOut(duration: 5)
                            .repeatForever(autoreverses: true)
                            .delay(Double(index) * 0.3),
                        value: animate
                    )
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                animate = true
            }
        }
    }
}

// Optimized Floating Particles View
struct FloatingParticlesView: View {
    @State private var particles: [Particle] = []
    @State private var timer: Timer?
    let particleCount: Int
    
    init(particleCount: Int = 12) {
        self.particleCount = particleCount
    }
    
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ForEach(particles) { particle in
                    Circle()
                        .fill(particle.color)
                        .frame(width: particle.size, height: particle.size)
                        .blur(radius: particle.blur)
                        .opacity(particle.opacity)
                        .offset(x: particle.x, y: particle.y)
                }
            }
            .onAppear {
                // Delayed particle generation
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    generateParticles(in: geometry.size)
                    startAnimation()
                }
            }
            .onDisappear {
                timer?.invalidate()
            }
        }
    }
    
    private func generateParticles(in size: CGSize) {
        particles = (0..<particleCount).map { _ in
            Particle(
                x: CGFloat.random(in: 0...size.width),
                y: CGFloat.random(in: 0...size.height),
                size: CGFloat.random(in: 2...6),
                color: [Color.purple, Color.pink, Color.blue].randomElement()!.opacity(0.5),
                opacity: Double.random(in: 0.2...0.6),
                blur: CGFloat.random(in: 2...4)
            )
        }
    }
    
    private func startAnimation() {
        timer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { _ in
            for index in particles.indices {
                particles[index].y -= CGFloat.random(in: 0.3...1)
                particles[index].x += CGFloat.random(in: -0.5...0.5)
                
                if particles[index].y < -20 {
                    particles[index].y = UIScreen.main.bounds.height + 20
                    particles[index].x = CGFloat.random(in: 0...UIScreen.main.bounds.width)
                }
            }
        }
    }
}

struct Particle: Identifiable {
    let id = UUID()
    var x: CGFloat
    var y: CGFloat
    let size: CGFloat
    let color: Color
    let opacity: Double
    let blur: CGFloat
}
