import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const subjects = [
  {
    name: 'Математика',
    teacher: 'Иванова А.А.',
    grades: [5, 4, 5, 5, 4],
    average: 4.6,
    color: ['#10B981', '#059669'],
  },
  {
    name: 'Программирование',
    teacher: 'Петров В.В.',
    grades: [5, 5, 5, 4, 5],
    average: 4.8,
    color: ['#3B82F6', '#2563EB'],
  },
  {
    name: 'Базы данных',
    teacher: 'Сидорова М.М.',
    grades: [4, 5, 4, 5, 4],
    average: 4.4,
    color: ['#8B5CF6', '#7C3AED'],
  },
  {
    name: 'Английский язык',
    teacher: 'Козлова Е.И.',
    grades: [4, 4, 5, 4, 4],
    average: 4.2,
    color: ['#F59E0B', '#D97706'],
  },
];

export default function GradesScreen() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const overallAverage = (
    subjects.reduce((sum, s) => sum + s.average, 0) / subjects.length
  ).toFixed(1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Оценки</Text>
        <View style={styles.averageContainer}>
          <Text style={styles.averageLabel}>Средний балл</Text>
          <Text style={styles.averageValue}>{overallAverage}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.subjectCard}
            onPress={() => setSelectedSubject(index)}
            activeOpacity={0.7}
          >
            <View style={styles.subjectHeader}>
              <View style={styles.subjectLeft}>
                <LinearGradient
                  colors={subject.color}
                  style={styles.subjectIcon}
                >
                  <Icon name="book-outline" size={20} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectTeacher}>{subject.teacher}</Text>
                </View>
              </View>

              <View style={styles.subjectRight}>
                <Text style={styles.subjectAverage}>{subject.average.toFixed(1)}</Text>
                <Icon name="chevron-forward" size={20} color="#D1D5DB" />
              </View>
            </View>

            <View style={styles.gradesContainer}>
              {subject.grades.map((grade, i) => (
                <View
                  key={i}
                  style={[
                    styles.gradeChip,
                    { backgroundColor: grade === 5 ? '#10B98120' : grade === 4 ? '#3B82F620' : '#EF444420' }
                  ]}
                >
                  <Text
                    style={[
                      styles.gradeChipText,
                      { color: grade === 5 ? '#10B981' : grade === 4 ? '#3B82F6' : '#EF4444' }
                    ]}
                  >
                    {grade}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  averageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  averageValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  subjectCard: {
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
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  subjectTeacher: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  subjectRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subjectAverage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  gradesContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  gradeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gradeChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
