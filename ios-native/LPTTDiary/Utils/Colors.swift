import SwiftUI

extension Color {
    // MARK: - Theme Colors (Dark Theme like Web)
    
    // Background
    static let appBackground = Color(hex: "#0a0a0f")
    static let cardBackground = Color(hex: "#1a1a24")
    static let surfaceBackground = Color(hex: "#14141f")
    
    // Primary Brand
    static let brandPurple = Color(hex: "#8b5cf6")
    static let brandPink = Color(hex: "#ec4899")
    static let brandBlue = Color(hex: "#3b82f6")
    
    // Semantic
    static let success = Color(hex: "#10b981")
    static let warning = Color(hex: "#f59e0b")
    static let error = Color(hex: "#ef4444")
    static let info = Color(hex: "#3b82f6")
    
    // Text
    static let textPrimary = Color.white
    static let textSecondary = Color(hex: "#a0a0b0")
    static let textTertiary = Color(hex: "#707080")
    
    // Border
    static let border = Color(hex: "#2a2a3a")
    static let borderLight = Color(hex: "#3a3a4a")
    
    // MARK: - Gradients
    static let primaryGradient = LinearGradient(
        colors: [Color(hex: "#8b5cf6"), Color(hex: "#7c3aed")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let pinkGradient = LinearGradient(
        colors: [Color(hex: "#ec4899"), Color(hex: "#db2777")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let blueGradient = LinearGradient(
        colors: [Color(hex: "#3b82f6"), Color(hex: "#2563eb")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let greenGradient = LinearGradient(
        colors: [Color(hex: "#10b981"), Color(hex: "#059669")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let orangeGradient = LinearGradient(
        colors: [Color(hex: "#f59e0b"), Color(hex: "#d97706")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // MARK: - Custom Hex Initializer
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// Grade Colors (Consistent)
extension Color {
    static func gradeColor(value: Int) -> Color {
        switch value {
        case 5: return Color(hex: "#10b981") // Green
        case 4: return Color(hex: "#3b82f6") // Blue
        case 3: return Color(hex: "#f59e0b") // Orange
        default: return Color(hex: "#ef4444") // Red
        }
    }
    
    static func averageColor(average: Double) -> Color {
        switch average {
        case 4.5...: return Color(hex: "#10b981")
        case 3.5..<4.5: return Color(hex: "#3b82f6")
        case 2.5..<3.5: return Color(hex: "#f59e0b")
        default: return Color(hex: "#ef4444")
        }
    }
}
