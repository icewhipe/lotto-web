import SwiftUI

struct NotesView: View {
    @State private var notes: [Note] = Note.mockNotes
    @State private var showAddNote = false
    @State private var searchText = ""
    
    var body: some View {
        NavigationStack {
            ZStack {
                // Dark Background
                Color.appBackground
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Search bar
                    searchBar
                        .padding(AppSpacing.md)
                    
                    // Notes list
                    ScrollView(.vertical, showsIndicators: false) {
                        if filteredNotes.isEmpty {
                            emptyStateView
                        } else {
                            LazyVStack(spacing: AppSpacing.md) {
                                ForEach(filteredNotes) { note in
                                    NoteCardView(note: note)
                                }
                            }
                            .padding(.horizontal, AppSpacing.md)
                            .padding(.bottom, 80) // Space for FAB
                        }
                    }
                }
                
                // Floating Action Button
                VStack {
                    Spacer()
                    HStack {
                        Spacer()
                        FloatingActionButton {
                            showAddNote = true
                        }
                        .padding(AppSpacing.lg)
                    }
                }
            }
            .navigationTitle("Конспекты")
            .navigationBarTitleDisplayMode(.large)
            .toolbarBackground(Color.appBackground, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .sheet(isPresented: $showAddNote) {
                AddNoteSheet(notes: $notes)
            }
        }
    }
    
    private var searchBar: some View {
        HStack(spacing: AppSpacing.sm) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.textSecondary)
            
            TextField("Поиск конспектов...", text: $searchText)
                .font(AppTypography.body)
                .foregroundColor(.textPrimary)
            
            if !searchText.isEmpty {
                Button(action: { searchText = "" }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.textSecondary)
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
    }
    
    private var emptyStateView: some View {
        VStack(spacing: AppSpacing.lg) {
            Spacer()
            
            Image(systemName: "doc.text.fill")
                .font(.system(size: 60))
                .foregroundColor(.textSecondary)
            
            Text("Нет конспектов")
                .font(AppTypography.h3)
                .foregroundColor(.textPrimary)
            
            Text("Нажмите + чтобы добавить конспект")
                .font(AppTypography.body)
                .foregroundColor(.textSecondary)
                .multilineTextAlignment(.center)
            
            Spacer()
        }
        .padding()
    }
    
    private var filteredNotes: [Note] {
        if searchText.isEmpty {
            return notes
        }
        return notes.filter {
            $0.title.localizedCaseInsensitiveContains(searchText) ||
            $0.subject.localizedCaseInsensitiveContains(searchText)
        }
    }
}

struct NoteCardView: View {
    let note: Note
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.md) {
            // Header
            HStack {
                // Subject badge
                Text(note.subject)
                    .font(AppTypography.captionBold)
                    .foregroundColor(subjectColor)
                    .padding(.horizontal, AppSpacing.sm)
                    .padding(.vertical, 4)
                    .background(
                        Capsule()
                            .fill(subjectColor.opacity(0.2))
                    )
                
                Spacer()
                
                // Date
                Text(note.date.formatted(date: .abbreviated, time: .omitted))
                    .font(AppTypography.caption)
                    .foregroundColor(.textSecondary)
            }
            
            // Title
            Text(note.title)
                .font(AppTypography.h4)
                .foregroundColor(.textPrimary)
            
            // Preview
            if !note.description.isEmpty {
                Text(note.description)
                    .font(AppTypography.body)
                    .foregroundColor(.textSecondary)
                    .lineLimit(2)
            }
            
            // Footer
            HStack {
                Label("\(note.pages) стр.", systemImage: "doc.text")
                    .font(AppTypography.caption)
                    .foregroundColor(.textSecondary)
                
                Spacer()
                
                // Actions
                HStack(spacing: AppSpacing.md) {
                    Button(action: {}) {
                        Image(systemName: "square.and.arrow.up")
                            .font(.caption)
                            .foregroundColor(.brandBlue)
                    }
                    
                    Button(action: {}) {
                        Image(systemName: "ellipsis")
                            .font(.caption)
                            .foregroundColor(.textSecondary)
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
    }
    
    private var subjectColor: Color {
        switch note.subject.lowercased() {
        case let s where s.contains("математика"):
            return Color.brandBlue
        case let s where s.contains("программирование"):
            return Color.brandPurple
        case let s where s.contains("базы"):
            return Color(hex: "#10b981")
        case let s where s.contains("английский"):
            return Color(hex: "#f59e0b")
        default:
            return Color.brandPink
        }
    }
}

struct FloatingActionButton: View {
    let action: () -> Void
    @State private var isPressed = false
    
    var body: some View {
        Button(action: action) {
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [Color.brandPurple, Color.brandPink],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 60, height: 60)
                    .shadow(color: Color.brandPurple.opacity(0.5), radius: 15, x: 0, y: 8)
                
                Image(systemName: "plus")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
            }
        }
        .scaleEffect(isPressed ? 0.9 : 1.0)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }
}

struct AddNoteSheet: View {
    @Binding var notes: [Note]
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var subject = ""
    @State private var content = ""
    @State private var pages = 1
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.appBackground
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: AppSpacing.lg) {
                        // Title field
                        VStack(alignment: .leading, spacing: AppSpacing.sm) {
                            Text("Название")
                                .font(AppTypography.labelLarge)
                                .foregroundColor(.textSecondary)
                            
                            TextField("Введите название...", text: $title)
                                .font(AppTypography.body)
                                .foregroundColor(.textPrimary)
                                .padding(AppSpacing.md)
                                .background(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .fill(Color.cardBackground)
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .stroke(Color.borderLight, lineWidth: 1)
                                )
                        }
                        
                        // Subject field
                        VStack(alignment: .leading, spacing: AppSpacing.sm) {
                            Text("Предмет")
                                .font(AppTypography.labelLarge)
                                .foregroundColor(.textSecondary)
                            
                            TextField("Введите предмет...", text: $subject)
                                .font(AppTypography.body)
                                .foregroundColor(.textPrimary)
                                .padding(AppSpacing.md)
                                .background(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .fill(Color.cardBackground)
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .stroke(Color.borderLight, lineWidth: 1)
                                )
                        }
                        
                        // Content field
                        VStack(alignment: .leading, spacing: AppSpacing.sm) {
                            Text("Содержание")
                                .font(AppTypography.labelLarge)
                                .foregroundColor(.textSecondary)
                            
                            TextEditor(text: $content)
                                .font(AppTypography.body)
                                .foregroundColor(.textPrimary)
                                .frame(height: 150)
                                .padding(AppSpacing.sm)
                                .background(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .fill(Color.cardBackground)
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: AppRadius.md)
                                        .stroke(Color.borderLight, lineWidth: 1)
                                )
                        }
                        
                        // Pages stepper
                        VStack(alignment: .leading, spacing: AppSpacing.sm) {
                            Text("Количество страниц")
                                .font(AppTypography.labelLarge)
                                .foregroundColor(.textSecondary)
                            
                            HStack {
                                Button(action: { if pages > 1 { pages -= 1 } }) {
                                    Image(systemName: "minus.circle.fill")
                                        .font(.title2)
                                        .foregroundColor(.brandPurple)
                                }
                                
                                Spacer()
                                
                                Text("\(pages)")
                                    .font(AppTypography.h3)
                                    .foregroundColor(.textPrimary)
                                
                                Spacer()
                                
                                Button(action: { pages += 1 }) {
                                    Image(systemName: "plus.circle.fill")
                                        .font(.title2)
                                        .foregroundColor(.brandPurple)
                                }
                            }
                            .padding(AppSpacing.md)
                            .background(
                                RoundedRectangle(cornerRadius: AppRadius.md)
                                    .fill(Color.cardBackground)
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: AppRadius.md)
                                    .stroke(Color.borderLight, lineWidth: 1)
                            )
                        }
                        
                        // Save button
                        Button(action: saveNote) {
                            Text("Сохранить конспект")
                                .font(AppTypography.button)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding(AppSpacing.md)
                                .background(
                                    LinearGradient(
                                        colors: [Color.brandPurple, Color.brandPink],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .cornerRadius(AppRadius.lg)
                        }
                        .disabled(title.isEmpty || subject.isEmpty)
                        .opacity(title.isEmpty || subject.isEmpty ? 0.5 : 1.0)
                    }
                    .padding(AppSpacing.md)
                }
            }
            .navigationTitle("Новый конспект")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Отмена") {
                        dismiss()
                    }
                    .foregroundColor(.textSecondary)
                }
            }
        }
    }
    
    private func saveNote() {
        let newNote = Note(
            title: title,
            description: content,
            subject: subject,
            author: "Студент",
            authorId: "current-user",
            date: Date(),
            rating: 0.0,
            downloads: 0,
            size: "\(pages) стр.",
            fileUrl: ""
        )
        notes.insert(newNote, at: 0)
        dismiss()
    }
}

struct NotesView_Previews: PreviewProvider {
    static var previews: some View {
        NotesView()
    }
}
