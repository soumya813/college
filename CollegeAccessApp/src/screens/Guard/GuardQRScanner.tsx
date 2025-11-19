import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScannedEntry {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  time: Date;
  type: 'in' | 'out';
  enrollmentNumber?: string;
  employeeId?: string;
}

const GuardQRScanner = () => {
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [entryForm, setEntryForm] = useState({
    name: '',
    role: 'student' as 'student' | 'teacher',
    type: 'in' as 'in' | 'out',
    idNumber: '',
  });
  const [todayEntries, setTodayEntries] = useState<ScannedEntry[]>([
    // Mock data for demo
    {
      id: '1',
      name: 'Jane Smith',
      role: 'student',
      time: new Date(2024, 10, 19, 9, 15),
      type: 'in',
      enrollmentNumber: 'S001',
    },
    {
      id: '2',
      name: 'John Doe',
      role: 'teacher',
      time: new Date(2024, 10, 19, 8, 30),
      type: 'in',
      employeeId: 'T001',
    },
  ]);

  const handleManualEntry = () => {
    if (!entryForm.name || !entryForm.idNumber) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const newEntry: ScannedEntry = {
      id: Date.now().toString(),
      name: entryForm.name,
      role: entryForm.role,
      time: new Date(),
      type: entryForm.type,
      ...(entryForm.role === 'student' 
        ? { enrollmentNumber: entryForm.idNumber }
        : { employeeId: entryForm.idNumber }
      ),
    };
    
    setTodayEntries(prev => [newEntry, ...prev]);
    
    Alert.alert(
      'Entry Recorded',
      `${entryForm.name} has been marked as ${entryForm.type.toUpperCase()} at ${newEntry.time.toLocaleTimeString()}`,
      [{ text: 'OK' }]
    );

    // Reset form
    setEntryForm({
      name: '',
      role: 'student',
      type: 'in',
      idNumber: '',
    });
    setManualEntryMode(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getEntryIcon = (type: 'in' | 'out') => {
    return type === 'in' ? 'enter-outline' : 'exit-outline';
  };

  const getEntryColor = (type: 'in' | 'out') => {
    return type === 'in' ? '#4CAF50' : '#FF9800';
  };

  const getRoleIcon = (role: 'student' | 'teacher') => {
    return role === 'student' ? 'school-outline' : 'person-outline';
  };

  const todayStats = {
    totalEntries: todayEntries.length,
    studentsIn: todayEntries.filter(e => e.role === 'student' && e.type === 'in').length,
    teachersIn: todayEntries.filter(e => e.role === 'teacher' && e.type === 'in').length,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Access Control</Text>
          <Text style={styles.subtitle}>Manual entry tracking (QR scanner temporarily disabled)</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todayStats.totalEntries}</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todayStats.studentsIn}</Text>
            <Text style={styles.statLabel}>Students In</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todayStats.teachersIn}</Text>
            <Text style={styles.statLabel}>Teachers In</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.scanButton} 
          onPress={() => setManualEntryMode(true)}
        >
          <Ionicons name="add-circle-outline" size={32} color="#fff" />
          <Text style={styles.scanButtonText}>Manual Entry</Text>
        </TouchableOpacity>

          <View style={styles.entriesSection}>
            <Text style={styles.sectionTitle}>Today's Entries</Text>
            {todayEntries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryIcon}>
                  <Ionicons
                    name={getRoleIcon(entry.role)}
                    size={20}
                    color="#666"
                  />
                </View>
                <View style={styles.entryInfo}>
                  <Text style={styles.entryName}>{entry.name}</Text>
                  <Text style={styles.entryDetails}>
                    {entry.role.charAt(0).toUpperCase() + entry.role.slice(1)} • {entry.enrollmentNumber || entry.employeeId}
                  </Text>
                </View>
                <View style={styles.entryStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getEntryColor(entry.type) }]}>
                    <Ionicons
                      name={getEntryIcon(entry.type)}
                      size={16}
                      color="#fff"
                    />
                    <Text style={styles.statusText}>{entry.type.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.entryTime}>{formatTime(entry.time)}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF9800',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  entriesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  entryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  entryDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  entryStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  entryTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  scannerContainer: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FF9800',
    backgroundColor: 'transparent',
  },
  scannerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  stopButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noPermissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  noPermissionSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default GuardQRScanner;