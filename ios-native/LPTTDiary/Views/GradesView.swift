import SwiftUI

struct GradesView: View {
    @StateObject private var viewModel = GradesViewModel()
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Overall average header
                    overallAverageCard
                    
                    // Subjects list
                    ForEach(viewModel.subjects) { subject in
                        SubjectCard(subject: subject)
                    }
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Оценки")
        }
    }
    
    private var overallAverageCard: some View {
        VStack(spacing: 12) {
            Text("Общий средний балл")
                .font(.headline)
                .foregroundColor(.secondary)
            
            Text(String(format: "%.2f", viewModel.overallAverage))
                .font(.system(size: 48, weight: .bold))
                .foregroundColor(.primary)
            
            HStack(spacing: 16) {
                VStack {
                    Text("\(viewModel.subjects.count)")
                        .font(.title3.bold())
                    Text("Предметов")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Divider()
                    .frame(height: 30)
                
                VStack {
                    Text("\(viewModel.recentGrades.count)")
                        .font(.title3.bold())
                    Text("Оценок")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(
            LinearGradient(
                colors: [.purple, .pink],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .foregroundColor(.white)
        .cornerRadius(20)
        .shadow(color: .purple.opacity(0.3), radius: 10, x: 0, y: 5)
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

#Preview {
    GradesView()
}
