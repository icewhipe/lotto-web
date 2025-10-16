import axios, { AxiosInstance, AxiosError } from 'axios';

// Base URL для API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

// ============= PUBLIC API (для сайта) =============

export const publicAPI = {
  // Получить статистику
  getStats: async () => {
    try {
      const response = await api.get('/public/stats');
      return response.data;
    } catch (error) {
      // Fallback data if API unavailable
      return {
        success: true,
        data: {
          students: 532,
          specialties: 12,
          teachers: 48,
          employmentRate: 98,
          yearsOfExperience: 50
        }
      };
    }
  },

  // Получить новости
  getNews: async (params?: { page?: number; limit?: number; category?: string }) => {
    try {
      const response = await api.get('/public/news', { params });
      return response.data;
    } catch (error) {
      return { success: true, data: { items: [], pagination: { page: 1, limit: 10, total: 0 } } };
    }
  },

  // Получить одну новость
  getNewsById: async (id: string) => {
    try {
      const response = await api.get(`/public/news/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, error: 'Новость не найдена' };
    }
  },

  // Получить фотогалерею
  getPhotos: async (params?: { albumId?: string; page?: number; limit?: number }) => {
    try {
      const response = await api.get('/public/gallery/photos', { params });
      return response.data;
    } catch (error) {
      return { success: true, data: { items: [], pagination: { page: 1, limit: 20, total: 0 } } };
    }
  },

  // Получить альбомы
  getAlbums: async () => {
    try {
      const response = await api.get('/public/gallery/albums');
      return response.data;
    } catch (error) {
      return { success: true, data: [] };
    }
  },

  // Получить расписание
  getSchedule: async (params: { groupId?: string; date?: string }) => {
    try {
      const response = await api.get('/public/schedule', { params });
      return response.data;
    } catch (error) {
      return { success: true, data: { group: {}, date: params.date, lessons: [] } };
    }
  },

  // Получить специальности
  getSpecialties: async () => {
    try {
      const response = await api.get('/public/specialties');
      return response.data;
    } catch (error) {
      return { success: true, data: [] };
    }
  },

  // Подать заявление
  submitApplication: async (data: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    specialtyId: string;
    educationType: string;
  }) => {
    const response = await api.post('/public/applications', data);
    return response.data;
  },

  // Получить контакты
  getContacts: async () => {
    try {
      const response = await api.get('/public/contacts');
      return response.data;
    } catch (error) {
      return {
        success: true,
        data: {
          phone: '+7 (47391) 4-11-91',
          email: 'lptt@lptt.obrvrn.ru',
          address: 'г. Лиски, ул. Лысенко, 1А',
          workingHours: 'Пн-Пт: 8:00-17:00'
        }
      };
    }
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

// ============= ADMIN API =============

export const adminAPI = {
  // Пользователи
  getUsers: async (filters?: { role?: string; search?: string }) => {
    const response = await api.get('/admin/users', { params: filters });
    return response.data;
  },

  createUser: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    groupId?: string;
  }) => {
    const response = await api.post('/admin/user', data);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/user/${userId}`);
    return response.data;
  },

  // Группы
  getGroups: async () => {
    const response = await api.get('/admin/groups');
    return response.data;
  },

  createGroup: async (data: {
    name: string;
    specialtyId: string;
    year: number;
  }) => {
    const response = await api.post('/admin/group', data);
    return response.data;
  },

  // Предметы
  getSubjects: async () => {
    const response = await api.get('/admin/subjects');
    return response.data;
  },

  createSubject: async (data: {
    name: string;
    code: string;
    specialtyId: string;
    teacherId?: string; // Опционально
  }) => {
    const response = await api.post('/admin/subject', data);
    return response.data;
  },

  // Статистика
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};

// ============= TEACHER API =============

export const teacherAPI = {
  // Расписание преподавателя
  getSchedule: async () => {
    const response = await api.get('/teacher/schedule');
    return response.data;
  },

  // Студенты преподавателя
  getStudents: async () => {
    const response = await api.get('/teacher/students');
    return response.data;
  },

  // Группы преподавателя
  getGroups: async () => {
    const response = await api.get('/teacher/groups');
    return response.data;
  },

  // Выставить оценку
  createGrade: async (data: {
    studentId: string;
    subjectId: string;
    value: number;
    type: string;
    comment?: string;
  }) => {
    const response = await api.post('/teacher/grade', data);
    return response.data;
  },

  // Отметить посещаемость
  markAttendance: async (data: {
    studentId: string;
    date: string;
    status: string;
    reason?: string;
  }) => {
    const response = await api.post('/teacher/attendance', data);
    return response.data;
  },
};

// ============= PARENT API =============

export const parentAPI = {
  // Получить детей
  getChildren: async () => {
    const response = await api.get('/parent/children');
    return response.data;
  },

  // Оценки ребёнка
  getChildGrades: async (childId: string) => {
    const response = await api.get(`/parent/child/${childId}/grades`);
    return response.data;
  },

  // Посещаемость ребёнка
  getChildAttendance: async (childId: string) => {
    const response = await api.get(`/parent/child/${childId}/attendance`);
    return response.data;
  },

  // Расписание ребёнка
  getChildSchedule: async (childId: string) => {
    const response = await api.get(`/parent/child/${childId}/schedule`);
    return response.data;
  },
};

// ============= DIRECTOR API =============

export const directorAPI = {
  // Аналитика
  getAnalytics: async () => {
    const response = await api.get('/director/analytics');
    return response.data;
  },

  // Отчёт по успеваемости
  getPerformanceReport: async () => {
    const response = await api.get('/director/performance-report');
    return response.data;
  },

  // Отчёт по посещаемости
  getAttendanceReport: async () => {
    const response = await api.get('/director/attendance-report');
    return response.data;
  },

  // Обзор групп
  getGroupsOverview: async () => {
    const response = await api.get('/director/groups-overview');
    return response.data;
  },
};

export default api;
