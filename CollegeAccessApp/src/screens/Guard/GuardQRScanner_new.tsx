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
                <Text style={styles.entryTime}>
                  {entry.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Manual Entry Modal */}
      <Modal
        visible={manualEntryMode}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Manual Entry</Text>
            <TouchableOpacity onPress={() => setManualEntryMode(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={entryForm.name}
              onChangeText={(text) => setEntryForm(prev => ({ ...prev, name: text }))}
              placeholder="Enter full name"
            />

            <Text style={styles.label}>Role</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  entryForm.role === 'student' && styles.roleButtonActive
                ]}
                onPress={() => setEntryForm(prev => ({ ...prev, role: 'student' }))}
              >
                <Text style={[
                  styles.roleButtonText,
                  entryForm.role === 'student' && styles.roleButtonTextActive
                ]}>Student</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  entryForm.role === 'teacher' && styles.roleButtonActive
                ]}
                onPress={() => setEntryForm(prev => ({ ...prev, role: 'teacher' }))}
              >
                <Text style={[
                  styles.roleButtonText,
                  entryForm.role === 'teacher' && styles.roleButtonTextActive
                ]}>Teacher</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>
              {entryForm.role === 'student' ? 'Enrollment Number' : 'Employee ID'}
            </Text>
            <TextInput
              style={styles.input}
              value={entryForm.idNumber}
              onChangeText={(text) => setEntryForm(prev => ({ ...prev, idNumber: text }))}
              placeholder={entryForm.role === 'student' ? 'Enter enrollment number' : 'Enter employee ID'}
            />

            <Text style={styles.label}>Entry Type</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  entryForm.type === 'in' && styles.roleButtonActive
                ]}
                onPress={() => setEntryForm(prev => ({ ...prev, type: 'in' }))}
              >
                <Text style={[
                  styles.roleButtonText,
                  entryForm.type === 'in' && styles.roleButtonTextActive
                ]}>Check In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  entryForm.type === 'out' && styles.roleButtonActive
                ]}
                onPress={() => setEntryForm(prev => ({ ...prev, type: 'out' }))}
              >
                <Text style={[
                  styles.roleButtonText,
                  entryForm.type === 'out' && styles.roleButtonTextActive
                ]}>Check Out</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleManualEntry}>
              <Text style={styles.submitButtonText}>Record Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  entriesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  entryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 12,
    marginBottom: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  entryTime: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuardQRScanner;