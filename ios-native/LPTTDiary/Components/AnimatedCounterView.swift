import SwiftUI

struct AnimatedCounterView: View {
    let value: Double
    @State private var displayValue: Double = 0
    
    var body: some View {
        Text(String(format: "%.2f", displayValue))
            .onAppear {
                withAnimation(.spring(response: 1.0, dampingFraction: 0.7)) {
                    displayValue = value
                }
            }
            .onChange(of: value) { newValue in
                withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                    displayValue = newValue
                }
            }
    }
}

// Interactive Subject Card with press animation
struct InteractiveSubjectCard: View {
    let subject: Subject
    let onTap: () -> Void
    @State private var isPressed = false
    
    var body: some View {
        Button(action: {
            HapticManager.shared.impact(style: .medium)
            onTap()
        }) {
            VStack(alignment: .leading, spacing: 16) {
                HStack {
                    // Subject icon with gradient
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: subject.gradientColors,
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 50, height: 50)
                        
                        Image(systemName: getSubjectIcon(subject.name))
                            .foregroundColor(.white)
                            .font(.title3)
                    }
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(subject.name)
                            .font(.headline)
                            .foregroundColor(.primary)
                        
                        HStack(spacing: 4) {
                            Image(systemName: "person.fill")
                                .font(.caption2)
                            Text(subject.teacher)
                                .font(.caption)
                        }
                        .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    // Average with animation
                    VStack(alignment: .trailing, spacing: 4) {
                        HStack(spacing: 4) {
                            Text(String(format: "%.1f", subject.average))
                                .font(.title2.bold())
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .foregroundColor(getAverageColor(subject.average))
                        
                        Text("средний")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                
                // Grades chips with stagger animation
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(Array(subject.grades.enumerated()), id: \.element.id) { index, grade in
                            GradeChip(grade: grade)
                                .transition(.scale.combined(with: .opacity))
                                .animation(
                                    .spring(response: 0.4, dampingFraction: 0.7)
                                        .delay(Double(index) * 0.05),
                                    value: subject.grades.count
                                )
                        }
                    }
                }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color(.systemBackground))
                    .shadow(
                        color: subject.gradientColors[0].opacity(isPressed ? 0.3 : 0.15),
                        radius: isPressed ? 15 : 8,
                        x: 0,
                        y: isPressed ? 8 : 4
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
    
    private func getSubjectIcon(_ name: String) -> String {
        switch name {
        case "Математика": return "function"
        case "Программирование": return "chevron.left.forwardslash.chevron.right"
        case "Базы данных": return "cylinder.fill"
        case "Английский язык": return "character.book.closed.fill"
        default: return "book.fill"
        }
    }
    
    private func getAverageColor(_ average: Double) -> Color {
        switch average {
        case 4.5...: return .green
        case 3.5..<4.5: return .blue
        case 2.5..<3.5: return .orange
        default: return .red
        }
    }
}
