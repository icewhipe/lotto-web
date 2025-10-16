// ============= USER TYPES =============

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent' | 'applicant';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  group?: string;
  avatar?: string;
}

// ============= STUDENT TYPES =============

export interface Grade {
  id: string;
  subject: string;
  value: number;
  type: 'exam' | 'test' | 'homework' | 'classwork';
  date: string;
  teacher: string;
  comment?: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  grades: Grade[];
  average: number;
  color: string[];
}

export interface Schedule {
  dayOfWeek: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'practice' | 'lab' | 'seminar';
  group?: string;
}

export interface Attendance {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject: string;
  reason?: string;
}

// ============= NOTES TYPES =============

export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  author: string;
  authorId: string;
  date: string;
  rating: number;
  downloads: number;
  size: string;
  fileUrl: string;
}

// ============= TEACHER TYPES =============

export interface Group {
  id: string;
  name: string;
  students: number;
  subject: string;
  avgGrade: number;
  attendance: number;
  nextLesson?: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  group: string;
  avgGrade: number;
  attendance: number;
  avatar?: string;
}

// ============= CHAT TYPES =============

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
}

export interface ChatRoom {
  id: string;
  groupId: string;
  messages: ChatMessage[];
  onlineUsers: string[];
}

// ============= PROGRESS TYPES =============

export interface ProgressData {
  semester: number;
  avgGrade: number;
  trend: number;
  rank: number;
  totalStudents: number;
  subjects: {
    name: string;
    current: number;
    target: number;
  }[];
  history: {
    month: string;
    grade: number;
  }[];
}

// ============= NOTIFICATION TYPES =============

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'grade' | 'schedule' | 'homework' | 'announcement';
  read: boolean;
  timestamp: string;
}

// ============= API RESPONSE TYPES =============

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
