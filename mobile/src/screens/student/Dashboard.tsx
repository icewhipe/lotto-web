import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const stats = [
  { title: 'Ср. балл', value: '4.5', icon: 'trending-up', color: ['#10B981', '#059669'] },
  { title: 'Посещаемость', value: '92%', icon: 'checkmark-circle', color: ['#3B82F6', '#2563EB'] },
  { title: 'Заданий', value: '3', icon: 'document-text', color: ['#F59E0B', '#D97706'] },
];

const recentGrades = [
  { subject: 'Математика', grade: 5, date: 'Сегодня', color: '#10B981' },
  { subject: 'Программирование', grade: 5, date: 'Вчера', color: '#3B82F6' },
  { subject: 'Базы данных', grade: 4, date: '2 дня назад', color: '#8B5CF6' },
];

const todaySchedule = [
  { time: '09:00', subject: 'Математика', room: 'Каб. 205', teacher: 'Иванова А.А.', type: 'Лекция' },
  { time: '10:45', subject: 'Программирование', room: 'Каб. 301', teacher: 'Петров В.В.', type: 'Практика' },
  { time: '12:30', subject: 'Физкультура', room: 'Спортзал', teacher: 'Сидоров И.И.', type: 'Практика' },
];

export default function Dashboard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Добрый день! 👋</Text>
            <Text style={styles.userName}>Иван Иванов</Text>
            <Text style={styles.userGroup}>Группа ИС-21</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Animatable.View
              key={stat.title}
              animation="fadeInUp"
              delay={index * 100}
              style={styles.statCard}
            >
              <LinearGradient
                colors={stat.color}
                style={styles.statGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={stat.icon} size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </LinearGradient>
            </Animatable.View>
          ))}
        </View>

        {/* Today's Schedule */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Расписание на сегодня</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Все →</Text>
            </TouchableOpacity>
          </View>

          {todaySchedule.map((lesson, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View style={styles.scheduleTime}>
                <Icon name="time-outline" size={16} color="#8B5CF6" />
                <Text style={styles.scheduleTimeText}>{lesson.time}</Text>
              </View>
              
              <View style={styles.scheduleContent}>
                <View style={styles.scheduleHeader}>
                  <Text style={styles.scheduleSubject}>{lesson.subject}</Text>
                  <View style={[styles.scheduleType, { backgroundColor: index % 2 === 0 ? '#DBEAFE' : '#F3E8FF' }]}>
                    <Text style={[styles.scheduleTypeText, { color: index % 2 === 0 ? '#3B82F6' : '#8B5CF6' }]}>
                      {lesson.type}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.scheduleDetails}>
                  <View style={styles.scheduleDetail}>
                    <Icon name="location-outline" size={14} color="#9CA3AF" />
                    <Text style={styles.scheduleDetailText}>{lesson.room}</Text>
                  </View>
                  <View style={styles.scheduleDetail}>
                    <Icon name="person-outline" size={14} color="#9CA3AF" />
                    <Text style={styles.scheduleDetailText}>{lesson.teacher}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animatable.View>

        {/* Recent Grades */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Последние оценки</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Все →</Text>
            </TouchableOpacity>
          </View>

          {recentGrades.map((item, index) => (
            <View key={index} style={styles.gradeCard}>
              <View style={styles.gradeLeft}>
                <View style={[styles.gradeCircle, { backgroundColor: `${item.color}20` }]}>
                  <Text style={[styles.gradeValue, { color: item.color }]}>{item.grade}</Text>
                </View>
                <View style={styles.gradeInfo}>
                  <Text style={styles.gradeSubject}>{item.subject}</Text>
                  <Text style={styles.gradeDate}>{item.date}</Text>
                </View>
              </View>
              
              <Icon name="chevron-forward" size={20} color="#D1D5DB" />
            </View>
          ))}
        </Animatable.View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.quickActionGradient}
              >
                <Icon name="document-text-outline" size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Конспекты</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.quickActionGradient}
              >
                <Icon name="chatbubbles-outline" size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Чат группы</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.quickActionGradient}
              >
                <Icon name="stats-chart-outline" size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Прогресс</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.quickActionGradient}
              >
                <Icon name="calendar-outline" size={28} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Календарь</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Bottom Padding */}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userGroup: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
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
  },
  sectionLink: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 4,
  },
  scheduleTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
    marginTop: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  scheduleType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scheduleTypeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  scheduleDetails: {
    gap: 6,
  },
  scheduleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scheduleDetailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  gradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gradeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  gradeValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gradeInfo: {
    flex: 1,
  },
  gradeSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  gradeDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
