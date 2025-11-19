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

const GuardSettings = () => {
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
      title: 'Scanner Settings',
      subtitle: 'Configure QR scanner preferences',
      icon: 'settings-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Scanner settings will be available soon'),
    },
    {
      title: 'Entry Logs',
      subtitle: 'View detailed entry/exit records',
      icon: 'list-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Entry logs will be available soon'),
    },
    {
      title: 'Notification Preferences',
      subtitle: 'Customize alert settings',
      icon: 'notifications-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
    },
    {
      title: 'Shift Management',
      subtitle: 'View and manage your work shifts',
      icon: 'time-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Shift management will be available soon'),
    },
    {
      title: 'Emergency Contacts',
      subtitle: 'Quick access to emergency numbers',
      icon: 'call-outline' as any,
      onPress: () => Alert.alert('Emergency Contacts', 'Security Office: 911\nAdmin Office: 555-0123\nMedical: 555-0911'),
    },
    {
      title: 'Reports & Analytics',
      subtitle: 'View attendance reports and statistics',
      icon: 'stats-chart-outline' as any,
      onPress: () => Alert.alert('Coming Soon', 'Reports will be available soon'),
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
      onPress: () => Alert.alert('Help', 'For support, contact security@college.edu'),
    },
  ];

  const currentShift = {
    start: '8:00 AM',
    end: '6:00 PM',
    status: 'On Duty',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Ionicons name="shield-checkmark" size={80} color="#FF9800" />
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userRole}>Security Guard • {user?.employeeId}</Text>
        
        <View style={styles.shiftInfo}>
          <View style={styles.shiftItem}>
            <Text style={styles.shiftLabel}>Current Shift</Text>
            <Text style={styles.shiftValue}>{currentShift.start} - {currentShift.end}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.statusText}>{currentShift.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="document-text-outline" size={24} color="#FF9800" />
          <Text style={styles.quickActionText}>Daily Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="call-outline" size={24} color="#F44336" />
          <Text style={styles.quickActionText}>Emergency</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="people-outline" size={24} color="#2196F3" />
          <Text style={styles.quickActionText}>Visitor Log</Text>
        </TouchableOpacity>
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
              <Ionicons name={option.icon} size={24} color="#FF9800" />
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
          <Text style={styles.logoutText}>End Shift & Logout</Text>
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
    color: '#FF9800',
    fontWeight: '600',
    marginBottom: 20,
  },
  shiftInfo: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shiftItem: {
    flex: 1,
  },
  shiftLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  shiftValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginTop: 0,
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

export default GuardSettings;