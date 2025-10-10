// ============= DATE HELPERS =============

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (d.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  }
};

export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeekDay = (date: Date): number => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
};

// ============= GRADE HELPERS =============

export const calculateAverage = (grades: number[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return parseFloat((sum / grades.length).toFixed(2));
};

export const getGradeColor = (grade: number): string => {
  if (grade >= 4.5) return '#10B981'; // Green
  if (grade >= 3.5) return '#3B82F6'; // Blue
  if (grade >= 2.5) return '#F59E0B'; // Orange
  return '#EF4444'; // Red
};

export const getGradeEmoji = (grade: number): string => {
  if (grade >= 4.5) return '🌟';
  if (grade >= 3.5) return '✨';
  if (grade >= 2.5) return '⭐';
  return '📚';
};

// ============= ATTENDANCE HELPERS =============

export const calculateAttendancePercentage = (
  present: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};

export const getAttendanceColor = (percentage: number): string => {
  if (percentage >= 90) return '#10B981'; // Green
  if (percentage >= 75) return '#3B82F6'; // Blue
  if (percentage >= 60) return '#F59E0B'; // Orange
  return '#EF4444'; // Red
};

// ============= FILE HELPERS =============

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isImageFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
};

// ============= VALIDATION HELPERS =============

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// ============= STRING HELPERS =============

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

// ============= NUMBER HELPERS =============

export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
