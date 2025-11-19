export type UserRole = 'student' | 'teacher' | 'guard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrollmentNumber?: string; // For students
  employeeId?: string; // For teachers and guards
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  timestamp: Date;
  type: 'in' | 'out';
  location?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subject: string;
  completed: boolean;
}

export interface Class {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  room: string;
  day: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'general' | 'assignment' | 'attendance' | 'announcement';
}

export type RootStackParamList = {
  Login: undefined;
  TeacherTabs: undefined;
  StudentTabs: undefined;
  GuardTabs: undefined;
};

export type TeacherTabParamList = {
  Dashboard: undefined;
  Timetable: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type StudentTabParamList = {
  Dashboard: undefined;
  Timetable: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type GuardTabParamList = {
  QRScanner: undefined;
  Settings: undefined;
};