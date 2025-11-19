import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      message: 'Scheduled for Mathematics class students on Friday, 3:00 PM',
      timestamp: new Date(2024, 10, 18, 14, 30),
      read: false,
      type: 'meeting',
    },
    {
      id: '2',
      title: 'Assignment Submission',
      message: 'Physics assignment has been submitted by 25 students',
      timestamp: new Date(2024, 10, 18, 10, 15),
      read: true,
      type: 'assignment',
    },
    {
      id: '3',
      title: 'Faculty Meeting',
      message: 'Monthly faculty meeting tomorrow at 2:00 PM in Conference Room',
      timestamp: new Date(2024, 10, 17, 16, 45),
      read: false,
      type: 'meeting',
    },
    {
      id: '4',
      title: 'Grade Submission Deadline',
      message: 'Please submit semester grades by end of this week',
      timestamp: new Date(2024, 10, 17, 9, 0),
      read: true,
      type: 'deadline',
    },
    {
      id: '5',
      title: 'New Student Enrollment',
      message: '3 new students have been enrolled in your Chemistry class',
      timestamp: new Date(2024, 10, 16, 11, 20),
      read: false,
      type: 'enrollment',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'people';
      case 'assignment':
        return 'document-text';
      case 'deadline':
        return 'time';
      case 'enrollment':
        return 'person-add';
      default:
        return 'notifications';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {unreadCount > 0 && (
        <Text style={styles.unreadCount}>{unreadCount} unread notifications</Text>
      )}

      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadCard
            ]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.notificationContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getNotificationIcon(notification.type)}
                  size={24}
                  color={notification.read ? '#666' : '#2196F3'}
                />
                {!notification.read && <View style={styles.unreadIndicator} />}
              </View>
              
              <View style={styles.textContainer}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.timestamp}>
                  {formatTime(notification.timestamp)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  markAllText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  unreadCount: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationsList: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#f8f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  unreadIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#2196F3',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});

export default TeacherNotifications;