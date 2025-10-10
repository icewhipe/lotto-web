import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const notes = [
  {
    title: 'Математический анализ - Лекция 1',
    author: 'Иванов А.',
    subject: 'Математика',
    date: 'Сегодня',
    rating: 4.8,
    downloads: 142,
    size: '2.4 MB',
  },
  {
    title: 'ООП в Java - Конспект',
    author: 'Петров Б.',
    subject: 'Программирование',
    date: 'Вчера',
    rating: 4.9,
    downloads: 218,
    size: '1.8 MB',
  },
  {
    title: 'SQL запросы - Практика',
    author: 'Сидорова М.',
    subject: 'Базы данных',
    date: '2 дня назад',
    rating: 4.7,
    downloads: 98,
    size: '3.2 MB',
  },
];

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Конспекты</Text>
            <Text style={styles.headerSubtitle}>Обмен материалами</Text>
          </View>
          
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="cloud-upload-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Поиск конспектов...</Text>
        </View>

        {/* Notes List */}
        {notes.map((note, index) => (
          <View key={index} style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <View style={styles.noteIcon}>
                <Icon name="document-text-outline" size={24} color="#10B981" />
              </View>
              
              <View style={styles.noteInfo}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <View style={styles.noteMeta}>
                  <Icon name="person-outline" size={12} color="#9CA3AF" />
                  <Text style={styles.noteMetaText}>{note.author}</Text>
                  <Text style={styles.noteSeparator}>•</Text>
                  <Text style={styles.noteMetaText}>{note.date}</Text>
                </View>
              </View>
            </View>

            <View style={styles.noteDetails}>
              <View style={styles.noteTag}>
                <Text style={styles.noteTagText}>{note.subject}</Text>
              </View>

              <View style={styles.noteStats}>
                <View style={styles.noteStat}>
                  <Icon name="star" size={14} color="#F59E0B" />
                  <Text style={styles.noteStatText}>{note.rating}</Text>
                </View>
                
                <View style={styles.noteStat}>
                  <Icon name="download-outline" size={14} color="#6B7280" />
                  <Text style={styles.noteStatText}>{note.downloads}</Text>
                </View>
                
                <Text style={styles.noteSize}>{note.size}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.downloadGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon name="download-outline" size={18} color="#FFFFFF" />
                <Text style={styles.downloadText}>Скачать</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  uploadButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  noteIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  noteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteMetaText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  noteSeparator: {
    color: '#D1D5DB',
    marginHorizontal: 4,
  },
  noteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#DBEAFE',
    borderRadius: 6,
  },
  noteTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  noteStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noteStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteStatText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  noteSize: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  downloadButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  downloadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
