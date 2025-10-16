import SwiftUI

struct Gradients {
    static let primary = LinearGradient(
        colors: [Color.purple, Color.pink],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let blue = LinearGradient(
        colors: [Color.blue, Color.cyan],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let green = LinearGradient(
        colors: [Color.green, Color.mint],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let orange = LinearGradient(
        colors: [Color.orange, Color.yellow],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static func gradient(colors: [Color]) -> LinearGradient {
        LinearGradient(
            colors: colors,
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}
