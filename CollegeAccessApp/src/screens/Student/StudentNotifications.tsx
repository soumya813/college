import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Assignment Due Tomorrow',
      message: 'Mathematics calculus problem set is due tomorrow at 11:59 PM',
      timestamp: new Date(2024, 10, 18, 15, 30),
      read: false,
      type: 'assignment',
    },
    {
      id: '2',
      title: 'Class Cancelled',
      message: 'Physics class scheduled for 11:00 AM has been cancelled due to lab maintenance',
      timestamp: new Date(2024, 10, 18, 8, 45),
      read: true,
      type: 'class',
    },
    {
      id: '3',
      title: 'New Grade Posted',
      message: 'Your Chemistry lab report grade has been posted - Grade: A-',
      timestamp: new Date(2024, 10, 17, 14, 20),
      read: false,
      type: 'grade',
    },
    {
      id: '4',
      title: 'Exam Schedule Released',
      message: 'Mid-semester exam schedule for all subjects has been published',
      timestamp: new Date(2024, 10, 17, 10, 0),
      read: true,
      type: 'exam',
    },
    {
      id: '5',
      title: 'Library Book Due',
      message: 'Your library book "Advanced Calculus" is due in 3 days',
      timestamp: new Date(2024, 10, 16, 16, 15),
      read: false,
      type: 'library',
    },
    {
      id: '6',
      title: 'Parent-Teacher Meeting',
      message: 'Parent-teacher meeting scheduled for Friday at 3:00 PM',
      timestamp: new Date(2024, 10, 16, 9, 30),
      read: true,
      type: 'meeting',
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
      case 'assignment':
        return 'document-text';
      case 'class':
        return 'school';
      case 'grade':
        return 'trophy';
      case 'exam':
        return 'clipboard';
      case 'library':
        return 'library';
      case 'meeting':
        return 'people';
      default:
        return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return '#FF9800';
      case 'class':
        return '#2196F3';
      case 'grade':
        return '#4CAF50';
      case 'exam':
        return '#F44336';
      case 'library':
        return '#9C27B0';
      case 'meeting':
        return '#607D8B';
      default:
        return '#666';
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
                <View style={[styles.iconBackground, { backgroundColor: getTypeColor(notification.type) + '20' }]}>
                  <Ionicons
                    name={getNotificationIcon(notification.type)}
                    size={24}
                    color={getTypeColor(notification.type)}
                  />
                </View>
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
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#f8fff8',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#4CAF50',
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

export default StudentNotifications;