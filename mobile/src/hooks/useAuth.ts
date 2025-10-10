import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  group?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userName = await AsyncStorage.getItem('userName');
      const userRole = await AsyncStorage.getItem('userRole');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userGroup = await AsyncStorage.getItem('userGroup');

      if (token && userName && userRole) {
        setUser({
          id: '1',
          name: userName,
          email: userEmail || '',
          role: userRole as User['role'],
          group: userGroup || undefined,
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Mock login - в production заменить на реальный API
    try {
      await AsyncStorage.setItem('userToken', 'mock-token');
      await AsyncStorage.setItem('userName', 'Иван Иванов');
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userRole', 'student');
      await AsyncStorage.setItem('userGroup', 'ИС-21');
      
      await loadUser();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
