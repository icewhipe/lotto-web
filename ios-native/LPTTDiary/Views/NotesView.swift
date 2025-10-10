import SwiftUI

struct NotesView: View {
    @State private var searchText = ""
    @State private var notes = Note.mockNotes
    
    var filteredNotes: [Note] {
        if searchText.isEmpty {
            return notes
        } else {
            return notes.filter {
                $0.title.localizedCaseInsensitiveContains(searchText) ||
                $0.subject.localizedCaseInsensitiveContains(searchText)
            }
        }
    }
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Search bar
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.gray)
                        
                        TextField("Поиск конспектов...", text: $searchText)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding(.horizontal)
                    .padding(.top)
                    
                    // Notes list
                    ForEach(filteredNotes) { note in
                        NoteCard(note: note)
                    }
                }
                .padding(.bottom)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Конспекты")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        // Upload action
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                            .foregroundColor(.purple)
                    }
                }
            }
        }
    }
}

struct NoteCard: View {
    let note: Note
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            // Icon
            Image(systemName: "doc.text.fill")
                .font(.title)
                .foregroundColor(.white)
                .frame(width: 60, height: 60)
                .background(
                    LinearGradient(colors: AppColors.greenGradient, startPoint: .topLeading, endPoint: .bottomTrailing)
                )
                .cornerRadius(12)
            
            // Info
            VStack(alignment: .leading, spacing: 8) {
                Text(note.title)
                    .font(.subheadline.bold())
                    .lineLimit(2)
                
                HStack(spacing: 12) {
                    Label(note.author, systemImage: "person.fill")
                    Label(note.date.relativeDateString(), systemImage: "calendar")
                }
                .font(.caption)
                .foregroundColor(.secondary)
                
                HStack {
                    Text(note.subject)
                        .font(.caption)
                        .foregroundColor(.blue)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(6)
                    
                    Spacer()
                    
                    HStack(spacing: 4) {
                        Image(systemName: "star.fill")
                            .foregroundColor(.yellow)
                        Text(String(format: "%.1f", note.rating))
                    }
                    .font(.caption)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.down.circle.fill")
                            .foregroundColor(.green)
                        Text("\(note.downloads)")
                    }
                    .font(.caption)
                }
                
                HStack {
                    Text(note.size)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    Button {
                        // Download action
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "arrow.down.circle.fill")
                            Text("Скачать")
                        }
                        .font(.caption.bold())
                        .foregroundColor(.white)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(
                            LinearGradient(colors: AppColors.primaryGradient, startPoint: .leading, endPoint: .trailing)
                        )
                        .cornerRadius(8)
                    }
                }
            }
        }
        .padding()
        .cardStyle()
        .padding(.horizontal)
    }
}

#Preview {
    NotesView()
}
