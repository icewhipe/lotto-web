import SwiftUI

struct MeshGradientBackground: View {
    @Binding var animate: Bool
    @State private var positions: [CGPoint] = []
    
    let colors: [Color] = [
        .purple, .pink, .blue, .indigo, .cyan, .purple
    ]
    
    var body: some View {
        ZStack {
            // Base gradient
            LinearGradient(
                colors: [
                    Color(hex: "#1e1b4b"),
                    Color(hex: "#312e81"),
                    Color(hex: "#4c1d95")
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            // Animated gradient orbs
            ForEach(0..<5, id: \.self) { index in
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                colors[index].opacity(0.6),
                                colors[index].opacity(0.3),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 0,
                            endRadius: 200
                        )
                    )
                    .frame(width: 300, height: 300)
                    .blur(radius: 60)
                    .offset(
                        x: animate ? CGFloat.random(in: -100...100) : CGFloat.random(in: -200...200),
                        y: animate ? CGFloat.random(in: -100...100) : CGFloat.random(in: -200...200)
                    )
                    .animation(
                        .easeInOut(duration: Double.random(in: 3...6))
                            .repeatForever(autoreverses: true)
                            .delay(Double(index) * 0.2),
                        value: animate
                    )
            }
        }
        .onAppear {
            animate = true
        }
    }
}

// Floating Particles View (как на сайте)
struct FloatingParticlesView: View {
    @State private var particles: [Particle] = []
    
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ForEach(particles) { particle in
                    Circle()
                        .fill(
                            RadialGradient(
                                colors: [
                                    particle.color.opacity(0.8),
                                    particle.color.opacity(0.4),
                                    Color.clear
                                ],
                                center: .center,
                                startRadius: 0,
                                endRadius: particle.size / 2
                            )
                        )
                        .frame(width: particle.size, height: particle.size)
                        .position(particle.position)
                        .blur(radius: 2)
                }
            }
            .onAppear {
                createParticles(in: geometry.size)
                startAnimation()
            }
        }
    }
    
    private func createParticles(in size: CGSize) {
        particles = (0..<30).map { _ in
            Particle(
                position: CGPoint(
                    x: CGFloat.random(in: 0...size.width),
                    y: CGFloat.random(in: 0...size.height)
                ),
                size: CGFloat.random(in: 3...8),
                color: [Color.purple, .pink, .blue, .cyan].randomElement()!
            )
        }
    }
    
    private func startAnimation() {
        Timer.scheduledTimer(withTimeInterval: 0.05, repeats: true) { _ in
            for i in 0..<particles.count {
                particles[i].position.x += particles[i].velocity.dx
                particles[i].position.y += particles[i].velocity.dy
                
                // Bounce off edges
                if particles[i].position.x < 0 || particles[i].position.x > UIScreen.main.bounds.width {
                    particles[i].velocity.dx *= -1
                }
                if particles[i].position.y < 0 || particles[i].position.y > UIScreen.main.bounds.height {
                    particles[i].velocity.dy *= -1
                }
            }
        }
    }
}

struct Particle: Identifiable {
    let id = UUID()
    var position: CGPoint
    let size: CGFloat
    let color: Color
    var velocity = CGVector(
        dx: CGFloat.random(in: -0.5...0.5),
        dy: CGFloat.random(in: -0.5...0.5)
    )
}
