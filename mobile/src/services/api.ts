import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL - изменить на production URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api'
  : 'https://api.lptt.ru/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - добавляем токен
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - обработка ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired - logout
      await AsyncStorage.clear();
      // Navigate to login - handled by App.tsx
    }
    return Promise.reject(error);
  }
);

// ============= AUTH API =============

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// ============= STUDENT API =============

export const studentAPI = {
  getDashboard: async () => {
    const response = await api.get('/student/dashboard');
    return response.data;
  },
  
  getGrades: async () => {
    const response = await api.get('/student/grades');
    return response.data;
  },
  
  getSchedule: async (weekOffset = 0) => {
    const response = await api.get(`/student/schedule?week=${weekOffset}`);
    return response.data;
  },
  
  getAttendance: async () => {
    const response = await api.get('/student/attendance');
    return response.data;
  },
  
  getProgress: async () => {
    const response = await api.get('/student/progress');
    return response.data;
  },
};

// ============= NOTES API =============

export const notesAPI = {
  getAll: async (filters?: { subject?: string; search?: string }) => {
    const response = await api.get('/notes', { params: filters });
    return response.data;
  },
  
  download: async (noteId: string) => {
    const response = await api.post(`/notes/${noteId}/download`);
    return response.data;
  },
  
  rate: async (noteId: string, rating: number) => {
    const response = await api.post(`/notes/${noteId}/rate`, { rating });
    return response.data;
  },
  
  upload: async (formData: FormData) => {
    const response = await api.post('/notes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

// ============= TEACHER API =============

export const teacherAPI = {
  getDashboard: async () => {
    const response = await api.get('/teacher/dashboard');
    return response.data;
  },
  
  getGroups: async () => {
    const response = await api.get('/teacher/groups');
    return response.data;
  },
  
  getJournal: async (groupId: string) => {
    const response = await api.get(`/teacher/journal/${groupId}`);
    return response.data;
  },
  
  setGrade: async (studentId: string, data: any) => {
    const response = await api.post('/teacher/grades', { studentId, ...data });
    return response.data;
  },
};

// ============= CHAT API =============

export const chatAPI = {
  getMessages: async (groupId: string) => {
    const response = await api.get(`/chat/messages/${groupId}`);
    return response.data;
  },
  
  sendMessage: async (groupId: string, message: string) => {
    const response = await api.post('/chat/messages', { groupId, message });
    return response.data;
  },
};

export default api;
