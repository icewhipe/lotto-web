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

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const schedule = {
  0: [ // Понедельник
    { time: '09:00', subject: 'Математика', teacher: 'Иванова А.А.', room: '205', type: 'Лекция' },
    { time: '10:45', subject: 'Программирование', teacher: 'Петров В.В.', room: '301', type: 'Практика' },
    { time: '12:30', subject: 'Физкультура', teacher: 'Сидоров И.И.', room: 'Спортзал', type: 'Практика' },
  ],
  1: [ // Вторник
    { time: '09:00', subject: 'Базы данных', teacher: 'Сидорова М.М.', room: '302', type: 'Лекция' },
    { time: '10:45', subject: 'Английский язык', teacher: 'Козлова Е.И.', room: '105', type: 'Практика' },
    { time: '12:30', subject: 'Математика', teacher: 'Иванова А.А.', room: '205', type: 'Семинар' },
  ],
  2: [ // Среда
    { time: '09:00', subject: 'Программирование', teacher: 'Петров В.В.', room: '301', type: 'Лекция' },
    { time: '10:45', subject: 'Базы данных', teacher: 'Сидорова М.М.', room: '302', type: 'Практика' },
  ],
  3: [ // Четверг
    { time: '09:00', subject: 'Английский язык', teacher: 'Козлова Е.И.', room: '105', type: 'Практика' },
    { time: '10:45', subject: 'Математика', teacher: 'Иванова А.А.', room: '205', type: 'Практика' },
    { time: '12:30', subject: 'Программирование', teacher: 'Петров В.В.', room: '301', type: 'Лаб. работа' },
  ],
  4: [ // Пятница
    { time: '09:00', subject: 'Базы данных', teacher: 'Сидорова М.М.', room: '302', type: 'Лекция' },
    { time: '10:45', subject: 'Физкультура', teacher: 'Сидоров И.И.', room: 'Спортзал', type: 'Практика' },
  ],
  5: [ // Суббота
    { time: '09:00', subject: 'Доп. занятия', teacher: 'Различные', room: '—', type: 'Консультация' },
  ],
};

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(0);

  const currentSchedule = schedule[selectedDay] || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Расписание</Text>
        
        {/* Week Days */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
          contentContainerStyle={styles.daysContent}
        >
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                selectedDay === index && styles.dayButtonActive
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text style={[
                styles.dayText,
                selectedDay === index && styles.dayTextActive
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentSchedule.length > 0 ? (
          currentSchedule.map((lesson, index) => (
            <View key={index} style={styles.lessonCard}>
              <View style={styles.lessonTime}>
                <Icon name="time-outline" size={20} color="#3B82F6" />
                <Text style={styles.lessonTimeText}>{lesson.time}</Text>
              </View>

              <View style={styles.lessonContent}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                  <View style={[
                    styles.lessonType,
                    { backgroundColor: getLessonTypeColor(lesson.type) }
                  ]}>
                    <Text style={styles.lessonTypeText}>{lesson.type}</Text>
                  </View>
                </View>

                <View style={styles.lessonDetails}>
                  <View style={styles.lessonDetail}>
                    <Icon name="person-outline" size={16} color="#6B7280" />
                    <Text style={styles.lessonDetailText}>{lesson.teacher}</Text>
                  </View>
                  <View style={styles.lessonDetail}>
                    <Icon name="location-outline" size={16} color="#6B7280" />
                    <Text style={styles.lessonDetailText}>{lesson.room}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>Занятий нет</Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function getLessonTypeColor(type: string) {
  switch (type) {
    case 'Лекция':
      return '#DBEAFE';
    case 'Практика':
      return '#F3E8FF';
    case 'Лаб. работа':
      return '#D1FAE5';
    case 'Семинар':
      return '#FEF3C7';
    default:
      return '#F3F4F6';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
  daysScroll: {
    marginHorizontal: -20,
  },
  daysContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
  },
  dayButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dayTextActive: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  lessonCard: {
    flexDirection: 'row',
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
  lessonTime: {
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 4,
  },
  lessonTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 4,
  },
  lessonContent: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  lessonType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lessonTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B82F6',
  },
  lessonDetails: {
    gap: 6,
  },
  lessonDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lessonDetailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
