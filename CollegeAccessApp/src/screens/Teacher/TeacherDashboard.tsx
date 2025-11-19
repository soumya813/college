import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();

  const quickStats = [
    { title: 'Classes Today', value: '4', icon: 'school-outline', color: '#2196F3' },
    { title: 'Students Present', value: '85', icon: 'people-outline', color: '#4CAF50' },
    { title: 'Assignments Due', value: '3', icon: 'document-text-outline', color: '#FF9800' },
    { title: 'Notifications', value: '7', icon: 'notifications-outline', color: '#9C27B0' },
  ];

  const todayClasses = [
    { subject: 'Mathematics', time: '9:00 AM', room: 'Room 101' },
    { subject: 'Physics', time: '11:00 AM', room: 'Room 203' },
    { subject: 'Chemistry', time: '2:00 PM', room: 'Lab 1' },
    { subject: 'Biology', time: '4:00 PM', room: 'Lab 2' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>{user?.name}</Text>
        <Text style={styles.roleText}>Teacher • {user?.employeeId}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        {todayClasses.map((class_, index) => (
          <View key={index} style={styles.classCard}>
            <View style={styles.classInfo}>
              <Text style={styles.subjectText}>{class_.subject}</Text>
              <Text style={styles.timeText}>{class_.time}</Text>
              <Text style={styles.roomText}>{class_.room}</Text>
            </View>
            <TouchableOpacity style={styles.classAction}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.quickAction}>
          <Ionicons name="add-circle-outline" size={24} color="#2196F3" />
          <Text style={styles.quickActionText}>Create Assignment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Ionicons name="people-outline" size={24} color="#4CAF50" />
          <Text style={styles.quickActionText}>Mark Attendance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Ionicons name="document-outline" size={24} color="#FF9800" />
          <Text style={styles.quickActionText}>Grade Papers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  nameText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 4,
  },
  roomText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  classAction: {
    padding: 8,
  },
  quickAction: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
});

export default TeacherDashboard;