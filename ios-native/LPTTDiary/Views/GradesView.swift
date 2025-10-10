import SwiftUI

struct GradesView: View {
    @StateObject private var viewModel = GradesViewModel()
    @State private var selectedSubject: Subject?
    @State private var animateCards = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Floating Particles Background (reduced)
                FloatingParticlesView(particleCount: 6)
                    .opacity(0.2)
                    .ignoresSafeArea()
                
                ScrollView {
                    LazyVStack(spacing: 20) {
                        // Overall average header with animation
                        overallAverageCard
                            .animateOnAppear()
                    
                        // Subjects list with stagger animation
                        ForEach(Array(viewModel.subjects.enumerated()), id: \.element.id) { index, subject in
                            InteractiveSubjectCard(subject: subject) {
                                selectedSubject = subject
                            }
                            .animateOnAppear(delay: Double(index) * 0.1)
                        }
                    }
                    .padding()
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Оценки")
        }
    }
    
    private var overallAverageCard: some View {
        ZStack {
            // Animated gradient background
            MeshGradientBackground(animate: .constant(true))
                .cornerRadius(24)
                .frame(height: 200)
            
            // Glass overlay
            RoundedRectangle(cornerRadius: 24)
                .fill(Color.white.opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 24)
                        .stroke(Color.white.opacity(0.3), lineWidth: 1)
                )
            
            VStack(spacing: 16) {
                HStack(spacing: 8) {
                    Image(systemName: "chart.bar.fill")
                        .font(.title3)
                    ShimmerText(text: "Общий средний балл")
                        .font(.headline)
                }
                .foregroundColor(.white.opacity(0.9))
                
                // Animated counter
                AnimatedCounterView(value: viewModel.overallAverage)
                    .font(.system(size: 56, weight: .bold))
                    .foregroundStyle(
                        LinearGradient(
                            colors: [.white, .white.opacity(0.9)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                
                HStack(spacing: 24) {
                    VStack(spacing: 4) {
                        Text("\(viewModel.subjects.count)")
                            .font(.title2.bold())
                            .foregroundColor(.white)
                        Text("Предметов")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    
                    Divider()
                        .background(Color.white.opacity(0.3))
                        .frame(height: 40)
                    
                    VStack(spacing: 4) {
                        Text("\(viewModel.recentGrades.count)")
                            .font(.title2.bold())
                            .foregroundColor(.white)
                        Text("Оценок")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
            }
            .padding()
        }
        .frame(height: 200)
        .shadow(color: .purple.opacity(0.4), radius: 20, x: 0, y: 10)
    }
}

struct SubjectCard: View {
    let subject: Subject
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
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
                
                VStack(alignment: .trailing, spacing: 4) {
                    Text(String(format: "%.1f", subject.average))
                        .font(.title2.bold())
                        .foregroundColor(getAverageColor(subject.average))
                    Text("средний")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            
            // Grades chips
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(subject.grades) { grade in
                        GradeChip(grade: grade)
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
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

struct GradeChip: View {
    let grade: Grade
    
    var body: some View {
        Text("\(grade.value)")
            .font(.callout.bold())
            .foregroundColor(.white)
            .frame(width: 36, height: 36)
            .background(grade.color)
            .clipShape(Circle())
            .overlay(
                Circle()
                    .stroke(grade.color.opacity(0.3), lineWidth: 2)
                    .padding(-4)
            )
    }
}

struct GradesView_Previews: PreviewProvider {
    static var previews: some View {
        GradesView()
    }
}
