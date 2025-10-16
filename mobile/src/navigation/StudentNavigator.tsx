import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import StudentDashboard from '../screens/student/Dashboard';
import GradesScreen from '../screens/student/GradesScreen';
import ScheduleScreen from '../screens/student/ScheduleScreen';
import NotesScreen from '../screens/student/NotesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function StudentNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Grades') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Notes') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowColor: '#000',
          shadowOffset: { height: -5, width: 0 },
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={StudentDashboard}
        options={{ tabBarLabel: 'Главная' }}
      />
      <Tab.Screen 
        name="Grades" 
        component={GradesScreen}
        options={{ tabBarLabel: 'Оценки' }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{ tabBarLabel: 'Расписание' }}
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen}
        options={{ tabBarLabel: 'Конспекты' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Профиль' }}
      />
    </Tab.Navigator>
  );
}
