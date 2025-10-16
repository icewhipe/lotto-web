import SwiftUI

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
            
            Text(value)
                .font(.title.bold())
                .foregroundColor(.primary)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
    }
}

struct StatCard_Previews: PreviewProvider {
    static var previews: some View {
        HStack {
            StatCard(title: "Ср. балл", value: "4.5", icon: "star.fill", color: .green)
            StatCard(title: "Посещ.", value: "92%", icon: "checkmark.circle.fill", color: .blue)
        }
        .padding()
        .background(Color(.systemGroupedBackground))
    }
}
