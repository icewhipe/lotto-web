import SwiftUI

// 3D Floating Card (как на сайте)
struct AnimatedCard<Content: View>: View {
    let content: Content
    @State private var rotation: Double = 0
    @State private var offset: CGFloat = 0
    @State private var scale: CGFloat = 1.0
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .rotation3DEffect(
                .degrees(rotation),
                axis: (x: 0.1, y: 0.2, z: 0),
                perspective: 0.5
            )
            .scaleEffect(scale)
            .offset(y: offset)
            .onAppear {
                withAnimation(
                    .easeInOut(duration: 3)
                        .repeatForever(autoreverses: true)
                ) {
                    rotation = 5
                    offset = -10
                    scale = 1.02
                }
            }
    }
}

// Glass Morphism Card
struct GlassMorphismCard<Content: View>: View {
    let content: Content
    let gradient: [Color]
    
    init(gradient: [Color] = [.purple, .pink], @ViewBuilder content: () -> Content) {
        self.gradient = gradient
        self.content = content()
    }
    
    var body: some View {
        content
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.white.opacity(0.1))
                    .background(
                        RoundedRectangle(cornerRadius: 20)
                            .fill(
                                LinearGradient(
                                    colors: gradient.map { $0.opacity(0.2) },
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(
                                LinearGradient(
                                    colors: [.white.opacity(0.3), .white.opacity(0.1)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
            )
            .shadow(color: gradient[0].opacity(0.3), radius: 20, x: 0, y: 10)
    }
}

// Shimmer Effect Text
struct ShimmerText: View {
    let text: String
    @State private var animate = false
    
    var body: some View {
        Text(text)
            .foregroundStyle(
                LinearGradient(
                    colors: [
                        .white,
                        .white.opacity(0.8),
                        .white,
                        .white.opacity(0.8),
                        .white
                    ],
                    startPoint: animate ? .leading : .trailing,
                    endPoint: animate ? .trailing : .leading
                )
            )
            .onAppear {
                withAnimation(
                    .linear(duration: 2)
                        .repeatForever(autoreverses: false)
                ) {
                    animate = true
                }
            }
    }
}

// Pulse Button Effect
struct PulseButton<Content: View>: View {
    let action: () -> Void
    let content: Content
    @State private var isPulsing = false
    
    init(action: @escaping () -> Void, @ViewBuilder content: () -> Content) {
        self.action = action
        self.content = content()
    }
    
    var body: some View {
        Button(action: action) {
            content
                .scaleEffect(isPulsing ? 1.05 : 1.0)
                .animation(
                    .easeInOut(duration: 1)
                        .repeatForever(autoreverses: true),
                    value: isPulsing
                )
        }
        .onAppear {
            isPulsing = true
        }
    }
}

// Gradient Border Card
struct GradientBorderCard<Content: View>: View {
    let content: Content
    let gradient: [Color]
    let lineWidth: CGFloat
    
    init(
        gradient: [Color] = [.purple, .pink, .blue],
        lineWidth: CGFloat = 2,
        @ViewBuilder content: () -> Content
    ) {
        self.gradient = gradient
        self.lineWidth = lineWidth
        self.content = content()
    }
    
    var body: some View {
        content
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(
                        AngularGradient(
                            colors: gradient,
                            center: .center,
                            angle: .degrees(0)
                        ),
                        lineWidth: lineWidth
                    )
            )
    }
}
