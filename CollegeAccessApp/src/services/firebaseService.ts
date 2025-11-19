import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, AttendanceRecord, Assignment, Class, Notification } from '../types';

// User operations
export const createUser = async (userData: User) => {
  try {
    const userDoc = doc(db, 'users', userData.id);
    await updateDoc(userDoc, userData);
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Attendance operations
export const recordAttendance = async (attendanceData: Omit<AttendanceRecord, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'attendance'), {
      ...attendanceData,
      timestamp: Timestamp.fromDate(attendanceData.timestamp),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error recording attendance:', error);
    return null;
  }
};

export const getAttendanceRecords = async (userId: string, limit_num: number = 10): Promise<AttendanceRecord[]> => {
  try {
    const q = query(
      collection(db, 'attendance'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limit_num)
    );
    
    const querySnapshot = await getDocs(q);
    const records: AttendanceRecord[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        userId: data.userId,
        timestamp: data.timestamp.toDate(),
        type: data.type,
        location: data.location,
      });
    });
    
    return records;
  } catch (error) {
    console.error('Error getting attendance records:', error);
    return [];
  }
};

export const getTodayAttendance = async (): Promise<AttendanceRecord[]> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const q = query(
      collection(db, 'attendance'),
      where('timestamp', '>=', Timestamp.fromDate(today)),
      where('timestamp', '<', Timestamp.fromDate(tomorrow)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const records: AttendanceRecord[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        userId: data.userId,
        timestamp: data.timestamp.toDate(),
        type: data.type,
        location: data.location,
      });
    });
    
    return records;
  } catch (error) {
    console.error('Error getting today\'s attendance:', error);
    return [];
  }
};

// Assignment operations
export const createAssignment = async (assignmentData: Omit<Assignment, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'assignments'), {
      ...assignmentData,
      dueDate: Timestamp.fromDate(assignmentData.dueDate),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating assignment:', error);
    return null;
  }
};

export const getAssignments = async (userId: string): Promise<Assignment[]> => {
  try {
    const q = query(
      collection(db, 'assignments'),
      where('studentIds', 'array-contains', userId),
      orderBy('dueDate', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const assignments: Assignment[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      assignments.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate.toDate(),
        subject: data.subject,
        completed: data.completed || false,
      });
    });
    
    return assignments;
  } catch (error) {
    console.error('Error getting assignments:', error);
    return [];
  }
};

// Class operations
export const getClasses = async (userId: string, role: 'student' | 'teacher'): Promise<Class[]> => {
  try {
    const fieldName = role === 'student' ? 'studentIds' : 'teacherId';
    const q = query(
      collection(db, 'classes'),
      where(fieldName, role === 'student' ? 'array-contains' : '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const classes: Class[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      classes.push({
        id: doc.id,
        subject: data.subject,
        teacher: data.teacher,
        time: data.time,
        room: data.room,
        day: data.day,
      });
    });
    
    return classes;
  } catch (error) {
    console.error('Error getting classes:', error);
    return [];
  }
};

// Notification operations
export const createNotification = async (notificationData: Omit<Notification, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notificationData,
      timestamp: Timestamp.fromDate(notificationData.timestamp),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('recipientIds', 'array-contains', userId),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    
    const querySnapshot = await getDocs(q);
    const notifications: Notification[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notifications.push({
        id: doc.id,
        title: data.title,
        message: data.message,
        timestamp: data.timestamp.toDate(),
        read: data.read || false,
        type: data.type,
      });
    });
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { read: true });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};