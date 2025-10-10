import SwiftUI

struct LessonCard: View {
    let lesson: Lesson
    var isCompact: Bool = false
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            // Time badge
            VStack(spacing: 4) {
                Image(systemName: "clock.fill")
                    .font(.caption)
                Text(lesson.time)
                    .font(.caption2.bold())
            }
            .foregroundColor(lesson.type.color)
            .frame(width: 60)
            .padding(8)
            .background(lesson.type.color.opacity(0.1))
            .cornerRadius(8)
            
            // Lesson info
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(lesson.subject)
                        .font(.subheadline.bold())
                    
                    Spacer()
                    
                    Text(lesson.type.rawValue)
                        .font(.caption)
                        .foregroundColor(lesson.type.color)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(lesson.type.color.opacity(0.2))
                        .cornerRadius(6)
                }
                
                if !isCompact {
                    HStack(spacing: 4) {
                        Image(systemName: "person.fill")
                            .font(.caption2)
                        Text(lesson.teacher)
                            .font(.caption)
                    }
                    .foregroundColor(.secondary)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "mappin.circle.fill")
                            .font(.caption2)
                        Text("Каб. \(lesson.room)")
                            .font(.caption)
                    }
                    .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(12)
    }
}

struct LessonCard_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            LessonCard(lesson: Lesson.mockLessons[0])
            LessonCard(lesson: Lesson.mockLessons[1], isCompact: true)
        }
        .padding()
        .background(Color(.systemGroupedBackground))
    }
}
