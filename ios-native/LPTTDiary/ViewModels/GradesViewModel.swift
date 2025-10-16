import Foundation
import SwiftUI

@MainActor
class GradesViewModel: ObservableObject {
    @Published var subjects: [Subject] = []
    @Published var recentGrades: [Grade] = []
    @Published var isLoading = false
    
    init() {
        loadGrades()
    }
    
    func loadGrades() {
        // Mock data - replace with API call
        subjects = Subject.mockSubjects
        recentGrades = Grade.mockGrades
    }
    
    var overallAverage: Double {
        guard !subjects.isEmpty else { return 0 }
        let sum = subjects.reduce(0.0) { $0 + $1.average }
        return sum / Double(subjects.count)
    }
}
