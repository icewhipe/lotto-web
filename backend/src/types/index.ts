// ============= REQUEST TYPES =============

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// ============= AUTH =============

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// ============= RFID =============

export interface RFIDCardDTO {
  cardNumber: string;
  userId: string;
  isActive?: boolean;
  expiryDate?: Date;
}

export interface RFIDScanEvent {
  cardNumber: string;
  turnstileId: string;
  direction: 'IN' | 'OUT';
  timestamp: Date;
}

// ============= TURNSTILE =============

export interface TurnstileDTO {
  name: string;
  location: string;
  deviceId: string;
  ipAddress?: string;
  direction: 'ENTRY' | 'EXIT' | 'BOTH';
}

export interface TurnstileStatus {
  id: string;
  name: string;
  isActive: boolean;
  lastActivity?: Date;
}

// ============= ACCESS LOG =============

export interface AccessLogDTO {
  rfidCardId: string;
  turnstileId: string;
  direction: 'IN' | 'OUT';
  status: 'GRANTED' | 'DENIED' | 'ERROR';
  reason?: string;
}

export interface AccessLogQuery {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  turnstileId?: string;
  status?: string;
}

// ============= GRADES =============

export interface GradeDTO {
  studentId: string;
  subjectId: string;
  teacherId: string;
  value: number;
  type: 'EXAM' | 'TEST' | 'HOMEWORK' | 'CLASSWORK' | 'QUIZ' | 'PROJECT';
  comment?: string;
}

// ============= SCHEDULE =============

export interface ScheduleDTO {
  groupId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
  type: 'LECTURE' | 'PRACTICE' | 'LAB' | 'SEMINAR';
}

// ============= ATTENDANCE =============

export interface AttendanceDTO {
  studentId: string;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  reason?: string;
}

// ============= NOTES =============

export interface NoteDTO {
  title: string;
  description: string;
  authorId: string;
  subjectId: string;
  filePath: string;
  fileSize: number;
}

// ============= EVENTS =============

export interface EventDTO {
  title: string;
  description: string;
  date: Date;
  location?: string;
  imageUrl?: string;
  category: 'NEWS' | 'ANNOUNCEMENT' | 'HOLIDAY' | 'COMPETITION' | 'CONFERENCE' | 'OTHER';
}

// ============= WEBSOCKET =============

export interface WebSocketMessage {
  type: 'RFID_SCAN' | 'TURNSTILE_STATUS' | 'ATTENDANCE_UPDATE' | 'NOTIFICATION';
  payload: any;
  timestamp: Date;
}

export interface TurnstileEvent {
  type: 'access' | 'status' | 'error';
  data: {
    turnstileId: string;
    userId?: string;
    cardNumber?: string;
    status: string;
    message?: string;
  };
}
