import SwiftUI

struct AnimatedDayButton: View {
    let dayNumber: Int
    let isSelected: Bool
    let dayName: String
    let namespace: Namespace.ID
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Text(dayName)
                    .font(.caption.bold())
                    .foregroundColor(isSelected ? .white : .primary)
                
                Text("\(dayNumber + 1)")
                    .font(.title3.bold())
                    .foregroundColor(isSelected ? .white : .primary)
            }
            .frame(width: 60, height: 80)
            .background(
                ZStack {
                    if isSelected {
                        RoundedRectangle(cornerRadius: 16)
                            .fill(
                                LinearGradient(
                                    colors: [.blue, .cyan],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .matchedGeometryEffect(id: "selectedDay", in: namespace)
                            .shadow(color: .blue.opacity(0.5), radius: 12, x: 0, y: 6)
                    } else {
                        RoundedRectangle(cornerRadius: 16)
                            .fill(Color(.systemGray6))
                    }
                }
            )
            .scaleEffect(isSelected ? 1.05 : 1.0)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// Enhanced Lesson Card with interaction
struct EnhancedLessonCard: View {
    let lesson: Lesson
    @State private var isExpanded = false
    @State private var isPressed = false
    
    var body: some View {
        Button(action: {
            HapticManager.shared.impact(style: .light)
            withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                isExpanded.toggle()
            }
        }) {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 12) {
                    // Time badge with glow
                    ZStack {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(lesson.type.color.opacity(0.2))
                        
                        VStack(spacing: 4) {
                            Image(systemName: "clock.fill")
                                .font(.caption)
                            Text(lesson.time)
                                .font(.caption2.bold())
                        }
                        .foregroundColor(lesson.type.color)
                    }
                    .frame(width: 60, height: 70)
                    
                    // Lesson info
                    VStack(alignment: .leading, spacing: 6) {
                        HStack {
                            Text(lesson.subject)
                                .font(.subheadline.bold())
                                .foregroundColor(.primary)
                            
                            Spacer()
                            
                            // Type badge
                            Text(lesson.type.rawValue)
                                .font(.caption)
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(
                                    Capsule()
                                        .fill(lesson.type.color)
                                )
                        }
                        
                        if isExpanded {
                            VStack(alignment: .leading, spacing: 4) {
                                HStack(spacing: 4) {
                                    Image(systemName: "person.fill")
                                        .font(.caption2)
                                    Text(lesson.teacher)
                                        .font(.caption)
                                }
                                
                                HStack(spacing: 4) {
                                    Image(systemName: "mappin.circle.fill")
                                        .font(.caption2)
                                    Text("Каб. \(lesson.room)")
                                        .font(.caption)
                                }
                            }
                            .foregroundColor(.secondary)
                            .transition(.move(edge: .top).combined(with: .opacity))
                        }
                    }
                    
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color(.systemBackground))
                    .shadow(
                        color: lesson.type.color.opacity(isPressed ? 0.3 : 0.1),
                        radius: isPressed ? 12 : 6,
                        x: 0,
                        y: isPressed ? 6 : 3
                    )
            )
            .scaleEffect(isPressed ? 0.98 : 1.0)
        }
        .buttonStyle(PlainButtonStyle())
        .onLongPressGesture(minimumDuration: 0.1) {
            // Action
        } onPressingChanged: { pressing in
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                isPressed = pressing
            }
        }
    }
}
