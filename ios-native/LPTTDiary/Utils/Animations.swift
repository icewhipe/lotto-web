import SwiftUI

// Custom Transitions (как на сайте)
extension AnyTransition {
    static var slideAndFade: AnyTransition {
        .asymmetric(
            insertion: .move(edge: .trailing).combined(with: .opacity),
            removal: .move(edge: .leading).combined(with: .opacity)
        )
    }
    
    static var scaleAndFade: AnyTransition {
        .scale(scale: 0.8).combined(with: .opacity)
    }
    
    static var rotateIn: AnyTransition {
        .modifier(
            active: RotateModifier(angle: 90, opacity: 0),
            identity: RotateModifier(angle: 0, opacity: 1)
        )
    }
}

struct RotateModifier: ViewModifier {
    let angle: Double
    let opacity: Double
    
    func body(content: Content) -> some View {
        content
            .rotationEffect(.degrees(angle))
            .opacity(opacity)
    }
}

// Haptic Feedback Manager
class HapticManager {
    static let shared = HapticManager()
    
    func impact(style: UIImpactFeedbackGenerator.FeedbackStyle) {
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }
    
    func notification(type: UINotificationFeedbackGenerator.FeedbackType) {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(type)
    }
    
    func selection() {
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }
}

// Spring Animation Presets
extension Animation {
    static let springy = Animation.spring(response: 0.4, dampingFraction: 0.7)
    static let bouncy = Animation.spring(response: 0.5, dampingFraction: 0.6)
    static let smooth = Animation.easeInOut(duration: 0.3)
}

// View Extension for easier animations
extension View {
    func animateOnAppear(delay: Double = 0) -> some View {
        self.modifier(AnimateOnAppearModifier(delay: delay))
    }
    
    func pulseEffect() -> some View {
        self.modifier(PulseEffectModifier())
    }
    
    func shakeEffect(trigger: Binding<Bool>) -> some View {
        self.modifier(ShakeEffect(shakes: trigger.wrappedValue ? 2 : 0))
    }
}

struct AnimateOnAppearModifier: ViewModifier {
    let delay: Double
    @State private var isVisible = false
    
    func body(content: Content) -> some View {
        content
            .opacity(isVisible ? 1 : 0)
            .offset(y: isVisible ? 0 : 20)
            .onAppear {
                withAnimation(.springy.delay(delay)) {
                    isVisible = true
                }
            }
    }
}

struct PulseEffectModifier: ViewModifier {
    @State private var isPulsing = false
    
    func body(content: Content) -> some View {
        content
            .scaleEffect(isPulsing ? 1.05 : 1.0)
            .animation(
                .easeInOut(duration: 1).repeatForever(autoreverses: true),
                value: isPulsing
            )
            .onAppear {
                isPulsing = true
            }
    }
}

struct ShakeEffect: GeometryEffect {
    var shakes: CGFloat
    
    var animatableData: CGFloat {
        get { shakes }
        set { shakes = newValue }
    }
    
    func effectValue(size: CGSize) -> ProjectionTransform {
        ProjectionTransform(
            CGAffineTransform(
                translationX: 10 * sin(shakes * .pi * 2),
                y: 0
            )
        )
    }
}
