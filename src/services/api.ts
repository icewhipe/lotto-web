import axios, { AxiosInstance, AxiosError } from 'axios';

// Base URL для API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Создание axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - добавляем JWT токен
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error: AxiosError) => {
    // ТОЛЬКО при 401 (Unauthorized) делаем logout
    // НЕ при ошибках входа! (403, 400, 500)
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      
      // НЕ редиректим если это login endpoint!
      if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
        // Токен истёк или невалиден - разлогиниваем
        console.warn('401 Unauthorized - auto logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// ============= AUTH API =============

export const authAPI = {
  // Вход
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Регистрация
  register: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Получить текущего пользователя
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Обновить профиль
  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // Сменить пароль
  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await api.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },
};

// ============= GRADES API =============

export const gradesAPI = {
  // Получить оценки студента
  getStudentGrades: async (
    studentId: string,
    filters?: {
      subjectId?: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }
  ) => {
    const response = await api.get(`/grades/student/${studentId}`, {
      params: filters,
    });
    return response.data;
  },

  // Создать оценку (teacher/admin)
  createGrade: async (data: {
    studentId: string;
    subjectId: string;
    value: number;
    type: string;
    comment?: string;
  }) => {
    const response = await api.post('/grades', data);
    return response.data;
  },

  // Обновить оценку
  updateGrade: async (gradeId: string, data: { value?: number; comment?: string }) => {
    const response = await api.put(`/grades/${gradeId}`, data);
    return response.data;
  },

  // Удалить оценку
  deleteGrade: async (gradeId: string) => {
    const response = await api.delete(`/grades/${gradeId}`);
    return response.data;
  },
};

// ============= SCHEDULE API =============

export const scheduleAPI = {
  // Получить расписание группы
  getGroupSchedule: async (groupId: string, dayOfWeek?: number) => {
    const response = await api.get(`/schedule/group/${groupId}`, {
      params: { dayOfWeek },
    });
    return response.data;
  },

  // Получить расписание преподавателя
  getTeacherSchedule: async (teacherId: string, dayOfWeek?: number) => {
    const response = await api.get(`/schedule/teacher/${teacherId}`, {
      params: { dayOfWeek },
    });
    return response.data;
  },

  // Создать расписание
  createSchedule: async (data: {
    groupId: string;
    subjectId: string;
    teacherId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    room: string;
    type: string;
  }) => {
    const response = await api.post('/schedule', data);
    return response.data;
  },

  // Обновить расписание
  updateSchedule: async (scheduleId: string, data: any) => {
    const response = await api.put(`/schedule/${scheduleId}`, data);
    return response.data;
  },

  // Удалить расписание
  deleteSchedule: async (scheduleId: string) => {
    const response = await api.delete(`/schedule/${scheduleId}`);
    return response.data;
  },
};

// ============= ATTENDANCE API (если есть) =============

export const attendanceAPI = {
  // Получить посещаемость студента
  getStudentAttendance: async (studentId: string, filters?: any) => {
    const response = await api.get(`/attendance/student/${studentId}`, {
      params: filters,
    });
    return response.data;
  },
};

// ============= NEWS API (для админа) =============

export const newsAPI = {
  // Получить все новости
  getAll: async () => {
    const response = await api.get('/news');
    return response.data;
  },

  // Создать новость
  create: async (data: {
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
  }) => {
    const response = await api.post('/news', data);
    return response.data;
  },

  // Обновить новость
  update: async (newsId: string, data: any) => {
    const response = await api.put(`/news/${newsId}`, data);
    return response.data;
  },

  // Удалить новость
  delete: async (newsId: string) => {
    const response = await api.delete(`/news/${newsId}`);
    return response.data;
  },
};

// ============= GALLERY API (для админа) =============

export const galleryAPI = {
  // Получить все изображения
  getAll: async () => {
    const response = await api.get('/gallery');
    return response.data;
  },

  // Загрузить изображение
  upload: async (formData: FormData) => {
    const response = await api.post('/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Удалить изображение
  delete: async (imageId: string) => {
    const response = await api.delete(`/gallery/${imageId}`);
    return response.data;
  },
};

// ============= USERS API (для админа) =============

export const usersAPI = {
  // Получить всех пользователей
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Создать пользователя
  create: async (data: any) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Обновить пользователя
  update: async (userId: string, data: any) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  // Удалить пользователя
  delete: async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

export default api;
