import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  {
    title: 'Личные данные',
    icon: 'person-outline',
    color: '#8B5CF6',
  },
  {
    title: 'Уведомления',
    icon: 'notifications-outline',
    color: '#3B82F6',
  },
  {
    title: 'Темная тема',
    icon: 'moon-outline',
    color: '#6B7280',
    toggle: true,
  },
  {
    title: 'Язык',
    icon: 'language-outline',
    color: '#10B981',
  },
  {
    title: 'О приложении',
    icon: 'information-circle-outline',
    color: '#F59E0B',
  },
];

export default function ProfileScreen({ navigation }: any) {
  const handleLogout = async () => {
    Alert.alert(
      'Выход',
      'Вы действительно хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            // Reset to login screen - handled by App.tsx
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ИИ</Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Иван Иванов</Text>
            <Text style={styles.userGroup}>Группа ИС-21</Text>
            <Text style={styles.userEmail}>student@lptt.ru</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.5</Text>
            <Text style={styles.statLabel}>Средний балл</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Посещаемость</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Семестр</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            
            {item.toggle ? (
              <View style={styles.toggle}>
                <View style={styles.toggleTrack}>
                  <View style={styles.toggleThumb} />
                </View>
              </View>
            ) : (
              <Icon name="chevron-forward" size={20} color="#D1D5DB" />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Версия 1.0.0</Text>

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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userGroup: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  menuItem: {
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  toggle: {
    marginLeft: 12,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1D5DB',
    padding: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },
});
