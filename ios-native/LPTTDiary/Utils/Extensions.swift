import SwiftUI

// MARK: - View Extensions

extension View {
    func cardStyle() -> some View {
        self
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
    }
    
    func gradientBackground(colors: [Color]) -> some View {
        self
            .background(
                LinearGradient(
                    colors: colors,
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
    }
}

// MARK: - Date Extensions

extension Date {
    func formatted(style: DateFormatter.Style = .medium) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = style
        formatter.locale = Locale(identifier: "ru_RU")
        return formatter.string(from: self)
    }
    
    var isToday: Bool {
        Calendar.current.isDateInToday(self)
    }
    
    var isYesterday: Bool {
        Calendar.current.isDateInYesterday(self)
    }
    
    func relativeDateString() -> String {
        if isToday {
            return "Сегодня"
        } else if isYesterday {
            return "Вчера"
        } else {
            return formatted()
        }
    }
}

// MARK: - String Extensions

extension String {
    var initials: String {
        let components = self.components(separatedBy: " ")
        let initials = components.compactMap { $0.first }.map { String($0) }
        return initials.prefix(2).joined().uppercased()
    }
}

// MARK: - Double Extensions

extension Double {
    func rounded(toPlaces places: Int) -> Double {
        let divisor = pow(10.0, Double(places))
        return (self * divisor).rounded() / divisor
    }
}
