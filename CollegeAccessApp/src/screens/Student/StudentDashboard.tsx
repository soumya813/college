import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import QRCodeGenerator from '../../components/QRCodeGenerator';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrType, setQrType] = useState<'in' | 'out'>('in');

  const attendanceData = {
    lastCheckIn: '9:15 AM',
    lastCheckOut: '4:30 PM',
    totalHours: '7h 15m',
    weeklyAttendance: '85%',
  };

  const assignments = [
    { subject: 'Mathematics', title: 'Calculus Problem Set', dueDate: 'Tomorrow', status: 'pending' },
    { subject: 'Physics', title: 'Lab Report - Motion', dueDate: '2 days', status: 'in-progress' },
    { subject: 'Chemistry', title: 'Organic Compounds', dueDate: '1 week', status: 'completed' },
  ];

  const todayClasses = [
    { subject: 'Mathematics', time: '9:00 AM', room: 'Room 101', teacher: 'Prof. Johnson' },
    { subject: 'Physics', time: '11:00 AM', room: 'Room 203', teacher: 'Dr. Smith' },
    { subject: 'Chemistry', time: '2:00 PM', room: 'Lab 1', teacher: 'Prof. Brown' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'in-progress':
        return '#FF9800';
      case 'pending':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in-progress':
        return 'time';
      case 'pending':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>{user?.name}</Text>
        <Text style={styles.roleText}>Student • {user?.enrollmentNumber}</Text>
      </View>

      <View style={styles.attendanceCard}>
        <Text style={styles.cardTitle}>Today's Attendance</Text>
        <View style={styles.attendanceRow}>
          <View style={styles.timeCard}>
            <Ionicons name="enter-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>Check In</Text>
            <Text style={styles.timeValue}>{attendanceData.lastCheckIn}</Text>
          </View>
          <View style={styles.timeCard}>
            <Ionicons name="exit-outline" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>Check Out</Text>
            <Text style={styles.timeValue}>{attendanceData.lastCheckOut}</Text>
          </View>
        </View>
        <View style={styles.attendanceStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Hours</Text>
            <Text style={styles.statValue}>{attendanceData.totalHours}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Weekly Attendance</Text>
            <Text style={styles.statValue}>{attendanceData.weeklyAttendance}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.qrButton}
          onPress={() => {
            setQrType('in');
            setQrModalVisible(true);
          }}
        >
          <Ionicons name="qr-code-outline" size={24} color="#fff" />
          <Text style={styles.qrButtonText}>Show QR Code</Text>
        </TouchableOpacity>
      </View>

      <QRCodeGenerator 
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        type={qrType}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignments</Text>
        {assignments.map((assignment, index) => (
          <View key={index} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <Text style={styles.subjectTag}>{assignment.subject}</Text>
              <Ionicons
                name={getStatusIcon(assignment.status)}
                size={20}
                color={getStatusColor(assignment.status)}
              />
            </View>
            <Text style={styles.assignmentTitle}>{assignment.title}</Text>
            <View style={styles.assignmentFooter}>
              <Text style={styles.dueDate}>Due: {assignment.dueDate}</Text>
              <Text style={[styles.status, { color: getStatusColor(assignment.status) }]}>
                {assignment.status.toUpperCase()}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        {todayClasses.map((class_, index) => (
          <View key={index} style={styles.classCard}>
            <View style={styles.classTime}>
              <Text style={styles.timeText}>{class_.time}</Text>
            </View>
            <View style={styles.classInfo}>
              <Text style={styles.subjectText}>{class_.subject}</Text>
              <Text style={styles.teacherText}>{class_.teacher}</Text>
              <Text style={styles.roomText}>{class_.room}</Text>
            </View>
            <TouchableOpacity style={styles.classAction}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: '#4CAF50',
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
  attendanceCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  qrButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  assignmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
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
  classTime: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  classInfo: {
    flex: 1,
    marginLeft: 12,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  teacherText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  roomText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  classAction: {
    padding: 8,
  },
});

export default StudentDashboard;