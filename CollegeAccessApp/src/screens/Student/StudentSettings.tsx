import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const StudentSettings = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const settingsOptions = [
    {
      title: 'Profile Information',
      subtitle: 'Update your personal details',
      icon: 'person-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Profile settings will be available soon'),
    },
    {
      title: 'Academic Records',
      subtitle: 'View grades and transcripts',
      icon: 'school-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Academic records will be available soon'),
    },
    {
      title: 'Notification Preferences',
      subtitle: 'Customize your notification settings',
      icon: 'notifications-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
    },
    {
      title: 'Course Enrollment',
      subtitle: 'Manage your course registrations',
      icon: 'list-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Course enrollment will be available soon'),
    },
    {
      title: 'Attendance History',
      subtitle: 'View your attendance records',
      icon: 'calendar-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Attendance history will be available soon'),
    },
    {
      title: 'Library Account',
      subtitle: 'Manage borrowed books and dues',
      icon: 'library-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Library account will be available soon'),
    },
    {
      title: 'Security & Privacy',
      subtitle: 'Password and privacy settings',
      icon: 'shield-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Security settings will be available soon'),
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help-circle-outline' as any,
      onPress: () => Alert.alert('Help', 'For support, contact student-help@college.edu'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#4CAF50" />
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userRole}>Student • {user?.enrollmentNumber}</Text>
        
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8.5</Text>
            <Text style={styles.statLabel}>CGPA</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Semester</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={option.onPress}
          >
            <View style={styles.settingIcon}>
              <Ionicons name={option.icon} size={24} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{option.title}</Text>
              <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>College Access Management</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
  },
  appInfoText: {
    fontSize: 14,
    color: '#666',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default StudentSettings;