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
import * as Animatable from 'react-native-animatable';

const myGroups = [
  { name: 'ИС-21', students: 28, subject: 'Программирование', avgGrade: 4.5, attendance: 94 },
  { name: 'ИС-22', students: 25, subject: 'Базы данных', avgGrade: 4.2, attendance: 89 },
  { name: 'АТ-21', students: 30, subject: 'Программирование', avgGrade: 4.3, attendance: 91 },
];

const todayLessons = [
  { time: '09:00', group: 'ИС-21', subject: 'Программирование', room: '205', status: 'completed' },
  { time: '10:45', group: 'ИС-22', subject: 'Базы данных', room: '301', status: 'completed' },
  { time: '14:00', group: 'АТ-21', subject: 'Программирование', room: '205', status: 'upcoming' },
];

export default function TeacherDashboard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Здравствуйте! 👋</Text>
            <Text style={styles.userName}>Петров Владимир Викторович</Text>
            <Text style={styles.userRole}>Преподаватель информатики</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <Animatable.View animation="fadeInUp" style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Группы</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>83</Text>
            <Text style={styles.statLabel}>Студенты</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Пары/нед</Text>
          </View>
        </Animatable.View>

        {/* Today's Lessons */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
          <Text style={styles.sectionTitle}>Занятия на сегодня</Text>
          
          {todayLessons.map((lesson, index) => (
            <View key={index} style={styles.lessonCard}>
              <View style={styles.lessonLeft}>
                <View style={[
                  styles.lessonStatus,
                  { backgroundColor: lesson.status === 'completed' ? '#10B981' : '#8B5CF6' }
                ]}>
                  <Icon 
                    name={lesson.status === 'completed' ? 'checkmark' : 'time-outline'} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </View>
                
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTime}>{lesson.time}</Text>
                  <Text style={styles.lessonGroup}>Группа {lesson.group}</Text>
                  <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                  <Text style={styles.lessonRoom}>Каб. {lesson.room}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.lessonAction}>
                <Icon name="document-text-outline" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          ))}
        </Animatable.View>

        {/* My Groups */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Мои группы</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Все →</Text>
            </TouchableOpacity>
          </View>

          {myGroups.map((group, index) => (
            <TouchableOpacity key={index} style={styles.groupCard} activeOpacity={0.7}>
              <View style={styles.groupHeader}>
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.groupIcon}
                >
                  <Text style={styles.groupIconText}>{group.name}</Text>
                </LinearGradient>
                
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.subject}</Text>
                  <Text style={styles.groupStudents}>{group.students} студентов</Text>
                </View>

                <Icon name="chevron-forward" size={20} color="#D1D5DB" />
              </View>

              <View style={styles.groupStats}>
                <View style={styles.groupStat}>
                  <Icon name="school-outline" size={16} color="#10B981" />
                  <Text style={styles.groupStatText}>Ср. балл: {group.avgGrade}</Text>
                </View>
                <View style={styles.groupStat}>
                  <Icon name="checkmark-circle-outline" size={16} color="#3B82F6" />
                  <Text style={styles.groupStatText}>Посещ.: {group.attendance}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animatable.View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.actionGradient}
              >
                <Icon name="create-outline" size={28} color="#FFFFFF" />
                <Text style={styles.actionText}>Выставить оценки</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.actionGradient}
              >
                <Icon name="document-attach-outline" size={28} color="#FFFFFF" />
                <Text style={styles.actionText}>Создать задание</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.actionGradient}
              >
                <Icon name="checkmark-done-outline" size={28} color="#FFFFFF" />
                <Text style={styles.actionText}>Посещаемость</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.actionGradient}
              >
                <Icon name="bar-chart-outline" size={28} color="#FFFFFF" />
                <Text style={styles.actionText}>Отчёты</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

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
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  sectionLink: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonStatus: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 2,
  },
  lessonGroup: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  lessonSubject: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  lessonRoom: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  lessonAction: {
    padding: 8,
  },
  groupCard: {
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
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupIconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  groupStudents: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  groupStats: {
    flexDirection: 'row',
    gap: 16,
  },
  groupStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupStatText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
