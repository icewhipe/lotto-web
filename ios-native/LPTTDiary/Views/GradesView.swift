import SwiftUI

struct GradesView: View {
    @StateObject private var viewModel = GradesViewModel()
    @State private var selectedSubject: Subject?
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Dark Background
                Color.appBackground
                    .ignoresSafeArea()
                
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVStack(spacing: AppSpacing.lg) {
                        // Overall average header
                        overallAverageCard
                        
                        // Subjects list
                        ForEach(viewModel.subjects) { subject in
                            SubjectGradeCard(subject: subject) {
                                selectedSubject = subject
                            }
                        }
                    }
                    .padding(AppSpacing.md)
                    .padding(.bottom, AppSpacing.xl)
                }
            }
            .navigationTitle("Оценки")
            .navigationBarTitleDisplayMode(.large)
            .toolbarBackground(Color.appBackground, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
    }
    
    private var overallAverageCard: some View {
        VStack(spacing: AppSpacing.md) {
            // Header
            HStack {
                Image(systemName: "chart.bar.fill")
                    .font(AppTypography.h4)
                    .foregroundColor(.white)
                
                Text("Общий средний балл")
                    .font(AppTypography.h4)
                    .foregroundColor(.white)
                
                Spacer()
            }
            
            // Average Value
            Text(String(format: "%.2f", viewModel.overallAverage))
                .font(AppTypography.displayLarge)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            // Stats
            HStack(spacing: AppSpacing.xl) {
                VStack(spacing: AppSpacing.xs) {
                    Text("\(viewModel.subjects.count)")
                        .font(AppTypography.h3)
                        .foregroundColor(.white)
                    Text("Предметов")
                        .font(AppTypography.caption)
                        .foregroundColor(.textSecondary)
                }
                
                Rectangle()
                    .fill(Color.border)
                    .frame(width: 1, height: 40)
                
                VStack(spacing: AppSpacing.xs) {
                    Text("\(viewModel.recentGrades.count)")
                        .font(AppTypography.h3)
                        .foregroundColor(.white)
                    Text("Оценок")
                        .font(AppTypography.caption)
                        .foregroundColor(.textSecondary)
                }
            }
        }
        .padding(AppSpacing.lg)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.xl)
                .stroke(Color.borderLight, lineWidth: 1)
        )
    }
}

struct SubjectGradeCard: View {
    let subject: Subject
    let action: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            // Subject header
            HStack(spacing: AppSpacing.md) {
                // Subject icon
                ZStack {
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [
                                    subjectColor.opacity(0.3),
                                    subjectColor.opacity(0.1)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 48, height: 48)
                    
                    Image(systemName: subjectIcon)
                        .font(.title3)
                        .foregroundColor(subjectColor)
                }
                
                // Subject info
                VStack(alignment: .leading, spacing: 4) {
                    Text(subject.name)
                        .font(AppTypography.h4)
                        .foregroundColor(.textPrimary)
                    
                    Text(subject.teacher)
                        .font(AppTypography.caption)
                        .foregroundColor(.textSecondary)
                }
                
                Spacer()
                
                // Average grade
                VStack(spacing: 2) {
                    Text(String(format: "%.1f", subject.average))
                        .font(AppTypography.stat)
                        .foregroundColor(Color.averageColor(average: subject.average))
                    
                    Text("средний")
                        .font(AppTypography.captionBold)
                        .foregroundColor(.textSecondary)
                }
            }
            
            // Grades chips
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: AppSpacing.sm) {
                    ForEach(subject.grades) { grade in
                        GradeChip(grade: grade)
                    }
                }
            }
        }
        .padding(AppSpacing.md)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .fill(Color.cardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: AppRadius.lg)
                .stroke(Color.borderLight, lineWidth: 1)
        )
        .onTapGesture {
            action()
        }
    }
    
    private var subjectIcon: String {
        switch subject.name.lowercased() {
        case let name where name.contains("математика"):
            return "function"
        case let name where name.contains("программирование"):
            return "chevron.left.forwardslash.chevron.right"
        case let name where name.contains("базы данных"):
            return "cylinder.split.1x2"
        case let name where name.contains("английский"):
            return "globe"
        default:
            return "book.fill"
        }
    }
    
    private var subjectColor: Color {
        switch subject.name.lowercased() {
        case let name where name.contains("математика"):
            return Color.brandBlue
        case let name where name.contains("программирование"):
            return Color.brandPurple
        case let name where name.contains("базы данных"):
            return Color(hex: "#10b981")
        case let name where name.contains("английский"):
            return Color(hex: "#f59e0b")
        default:
            return Color.brandPink
        }
    }
}

struct GradeChip: View {
    let grade: Grade
    
    var body: some View {
        Text("\(grade.value)")
            .font(AppTypography.labelLarge)
            .fontWeight(.bold)
            .foregroundColor(.white)
            .frame(width: 36, height: 36)
            .background(
                Circle()
                    .fill(Color.gradeColor(value: grade.value))
            )
            .overlay(
                Circle()
                    .stroke(Color.gradeColor(value: grade.value).opacity(0.3), lineWidth: 2)
                    .padding(-2)
            )
    }
}

struct GradesView_Previews: PreviewProvider {
    static var previews: some View {
        GradesView()
    }
}
