import SwiftUI

struct AnimatedStatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    let delay: Double
    
    @State private var animateValue = false
    @State private var animateIcon = false
    @State private var displayValue: Double = 0
    
    var body: some View {
        VStack(spacing: 12) {
            // Animated Icon with glow
            ZStack {
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [color.opacity(0.3), Color.clear],
                            center: .center,
                            startRadius: 0,
                            endRadius: 30
                        )
                    )
                    .frame(width: 50, height: 50)
                    .scaleEffect(animateIcon ? 1.2 : 1.0)
                
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)
                    .scaleEffect(animateIcon ? 1.1 : 1.0)
                    .rotationEffect(.degrees(animateIcon ? 360 : 0))
            }
            
            // Animated Value with counter
            Text(value)
                .font(.title.bold())
                .foregroundStyle(
                    LinearGradient(
                        colors: [color, color.opacity(0.7)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .scaleEffect(animateValue ? 1.0 : 0.5)
                .opacity(animateValue ? 1.0 : 0.0)
            
            // Title
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
                .opacity(animateValue ? 1.0 : 0.0)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .onAppear {
            withAnimation(
                .spring(response: 0.6, dampingFraction: 0.7)
                    .delay(delay)
            ) {
                animateValue = true
            }
            
            withAnimation(
                .easeInOut(duration: 1)
                    .repeatForever(autoreverses: true)
                    .delay(delay)
            ) {
                animateIcon = true
            }
        }
    }
}

// Enhanced Quick Action Button with hover effect
struct EnhancedQuickActionButton: View {
    let title: String
    let icon: String
    let gradient: [Color]
    let action: () -> Void
    
    @State private var isPressed = false
    @State private var rotation: Double = 0
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                ZStack {
                    // Glow effect
                    Circle()
                        .fill(
                            RadialGradient(
                                colors: [gradient[0].opacity(0.5), Color.clear],
                                center: .center,
                                startRadius: 0,
                                endRadius: 40
                            )
                        )
                        .frame(width: 60, height: 60)
                        .blur(radius: 10)
                    
                    Image(systemName: icon)
                        .font(.title2)
                        .foregroundColor(.white)
                        .rotationEffect(.degrees(rotation))
                }
                
                Text(title)
                    .font(.subheadline.bold())
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 120)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(
                        LinearGradient(
                            colors: gradient,
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
            )
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(Color.white.opacity(0.3), lineWidth: 1)
            )
            .shadow(
                color: gradient[0].opacity(isPressed ? 0.6 : 0.4),
                radius: isPressed ? 20 : 12,
                x: 0,
                y: isPressed ? 8 : 6
            )
            .scaleEffect(isPressed ? 0.95 : 1.0)
        }
        .buttonStyle(PlainButtonStyle())
        .onLongPressGesture(minimumDuration: 0.1) {
            // Action
        } onPressingChanged: { pressing in
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                isPressed = pressing
            }
        }
        .onAppear {
            withAnimation(
                .linear(duration: 3)
                    .repeatForever(autoreverses: false)
            ) {
                rotation = 360
            }
        }
    }
}
