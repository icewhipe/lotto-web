import SwiftUI

struct GradesView: View {
    @StateObject private var viewModel = GradesViewModel()
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Overall average header
                    VStack(spacing: 8) {
                        Text(String(format: "%.1f", viewModel.overallAverage))
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(.white)
                        
                        Text("Средний балл")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.9))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 32)
                    .gradientBackground(colors: AppColors.primaryGradient)
                    .cornerRadius(20)
                    .padding()
                    
                    // Subjects list
                    ForEach(viewModel.subjects) { subject in
                        SubjectCard(subject: subject)
                    }
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Оценки")
        }
    }
}

struct SubjectCard: View {
    let subject: Subject
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(subject.name)
                        .font(.headline)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "person.fill")
                            .font(.caption2)
                        Text(subject.teacher)
                            .font(.caption)
                    }
                    .foregroundColor(.secondary)
                }
                
                Spacer()
                
                // Average badge
                VStack(spacing: 2) {
                    Text(String(format: "%.1f", subject.average))
                        .font(.title2.bold())
                        .foregroundColor(gradeColor(subject.average))
                    Text("ср.")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                .frame(width: 60, height: 60)
                .background(gradeColor(subject.average).opacity(0.1))
                .clipShape(Circle())
            }
            
            // Grades chips
            FlowLayout(spacing: 8) {
                ForEach(subject.grades) { grade in
                    GradeChip(grade: grade)
                }
            }
        }
        .padding()
        .cardStyle()
        .padding(.horizontal)
    }
    
    private func gradeColor(_ average: Double) -> Color {
        switch average {
        case 4.5...: return .green
        case 3.5..<4.5: return .blue
        case 2.5..<3.5: return .orange
        default: return .red
        }
    }
}

struct GradeChip: View {
    let grade: Grade
    
    var body: some View {
        Text("\(grade.value)")
            .font(.caption.bold())
            .foregroundColor(.white)
            .frame(width: 32, height: 32)
            .background(grade.color)
            .clipShape(Circle())
    }
}

// Simple flow layout for chips
struct FlowLayout: Layout {
    var spacing: CGFloat = 8
    
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = FlowResult(in: proposal.replacingUnspecifiedDimensions().width, subviews: subviews, spacing: spacing)
        return result.size
    }
    
    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = FlowResult(in: bounds.width, subviews: subviews, spacing: spacing)
        for (index, subview) in subviews.enumerated() {
            subview.place(at: CGPoint(x: bounds.minX + result.positions[index].x, y: bounds.minY + result.positions[index].y), proposal: .unspecified)
        }
    }
    
    struct FlowResult {
        var size: CGSize = .zero
        var positions: [CGPoint] = []
        
        init(in maxWidth: CGFloat, subviews: Subviews, spacing: CGFloat) {
            var x: CGFloat = 0
            var y: CGFloat = 0
            var lineHeight: CGFloat = 0
            
            for subview in subviews {
                let size = subview.sizeThatFits(.unspecified)
                
                if x + size.width > maxWidth {
                    x = 0
                    y += lineHeight + spacing
                    lineHeight = 0
                }
                
                positions.append(CGPoint(x: x, y: y))
                lineHeight = max(lineHeight, size.height)
                x += size.width + spacing
            }
            
            self.size = CGSize(width: maxWidth, height: y + lineHeight)
        }
    }
}

#Preview {
    GradesView()
}
