import SwiftUI

extension Color {
    // Primary colors
    static let primary = Color("Primary", bundle: nil) ?? Color.purple
    static let secondary = Color("Secondary", bundle: nil) ?? Color.blue
    
    // Semantic colors
    static let success = Color.green
    static let warning = Color.orange
    static let error = Color.red
    static let info = Color.blue
    
    // Custom hex initializer
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

// Predefined gradients
struct AppColors {
    static let primaryGradient = [Color(hex: "#8B5CF6"), Color(hex: "#7C3AED")]
    static let blueGradient = [Color(hex: "#3B82F6"), Color(hex: "#2563EB")]
    static let greenGradient = [Color(hex: "#10B981"), Color(hex: "#059669")]
    static let orangeGradient = [Color(hex: "#F59E0B"), Color(hex: "#D97706")]
    static let pinkGradient = [Color(hex: "#EC4899"), Color(hex: "#BE185D")]
    static let cyanGradient = [Color(hex: "#06B6D4"), Color(hex: "#0891B2")]
}
