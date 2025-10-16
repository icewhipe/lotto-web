import SwiftUI

struct GradientButton: View {
    let title: String
    let icon: String?
    let gradient: [Color]
    let action: () -> Void
    
    init(title: String, icon: String? = nil, gradient: [Color] = [.purple, .pink], action: @escaping () -> Void) {
        self.title = title
        self.icon = icon
        self.gradient = gradient
        self.action = action
    }
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.body.bold())
                }
                
                Text(title)
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                LinearGradient(
                    colors: gradient,
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .foregroundColor(.white)
            .cornerRadius(12)
            .shadow(color: gradient[0].opacity(0.3), radius: 8, x: 0, y: 4)
        }
    }
}

struct GradientButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 16) {
            GradientButton(
                title: "Войти",
                icon: "arrow.right",
                gradient: [.blue, .cyan]
            ) {}
            
            GradientButton(
                title: "Выйти",
                icon: "rectangle.portrait.and.arrow.right",
                gradient: [.red, .pink]
            ) {}
        }
        .padding()
    }
}
