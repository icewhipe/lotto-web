import SwiftUI

// Unified Typography System (like Web)
struct AppTypography {
    // Headers
    static let h1 = Font.system(size: 32, weight: .bold, design: .rounded)
    static let h2 = Font.system(size: 28, weight: .bold, design: .rounded)
    static let h3 = Font.system(size: 24, weight: .semibold, design: .rounded)
    static let h4 = Font.system(size: 20, weight: .semibold, design: .rounded)
    
    // Body
    static let bodyLarge = Font.system(size: 17, weight: .regular, design: .default)
    static let body = Font.system(size: 15, weight: .regular, design: .default)
    static let bodySmall = Font.system(size: 13, weight: .regular, design: .default)
    
    // Labels
    static let labelLarge = Font.system(size: 15, weight: .medium, design: .default)
    static let label = Font.system(size: 13, weight: .medium, design: .default)
    static let labelSmall = Font.system(size: 11, weight: .medium, design: .default)
    
    // Numbers & Stats
    static let displayLarge = Font.system(size: 48, weight: .bold, design: .rounded)
    static let display = Font.system(size: 36, weight: .bold, design: .rounded)
    static let stat = Font.system(size: 24, weight: .bold, design: .rounded)
    
    // Buttons
    static let button = Font.system(size: 16, weight: .semibold, design: .rounded)
    static let buttonSmall = Font.system(size: 14, weight: .semibold, design: .rounded)
    
    // Caption
    static let caption = Font.system(size: 12, weight: .regular, design: .default)
    static let captionBold = Font.system(size: 12, weight: .semibold, design: .default)
}

// Spacing System
struct AppSpacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}

// Corner Radius
struct AppRadius {
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 20
    static let xxl: CGFloat = 24
    static let full: CGFloat = 999
}
