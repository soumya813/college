import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { accessEntryService, AccessEntry, AccessEntryInput } from '../../services/accessEntryService';

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
  const { user } = useAuth();
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [entryForm, setEntryForm] = useState({
    name: '',
    role: 'student' as 'student' | 'teacher',
    type: 'in' as 'in' | 'out',
    idNumber: '',
    notes: '',
  });
  const [todayEntries, setTodayEntries] = useState<AccessEntry[]>([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    studentsIn: 0,
    teachersIn: 0,
    studentsOut: 0,
    teachersOut: 0,
  });

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = accessEntryService.subscribeToTodayEntries((entries) => {
      setTodayEntries(entries);
      setLoading(false);
    });

    // Load statistics
    loadStats();

    return unsubscribe;
  }, [user]);

  const loadStats = async () => {
    try {
      const todayStats = await accessEntryService.getTodayStats();
      setStats(todayStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleManualEntry = async () => {
    if (!entryForm.name.trim() || !entryForm.idNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User information not available.');
      return;
    }

    setSubmitting(true);

    try {
      // Check current status of the person
      const currentStatus = await accessEntryService.getPersonStatus(entryForm.idNumber, entryForm.role);
      
      // Warn if trying to check in someone who is already in
      if (entryForm.type === 'in' && currentStatus === 'in') {
        Alert.alert(
          'Already Checked In',
          `${entryForm.name} appears to already be checked in. Continue anyway?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: () => submitEntry() }
          ]
        );
        return;
      }

      // Warn if trying to check out someone who is already out
      if (entryForm.type === 'out' && (currentStatus === 'out' || currentStatus === 'unknown')) {
        Alert.alert(
          'Not Checked In',
          `${entryForm.name} doesn't appear to be checked in. Continue anyway?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: () => submitEntry() }
          ]
        );
        return;
      }

      await submitEntry();
    } catch (error) {
      console.error('Error processing manual entry:', error);
      Alert.alert('Error', 'Failed to process entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitEntry = async () => {
    if (!user) return;

    const entryData: AccessEntryInput = {
      name: entryForm.name,
      role: entryForm.role,
      type: entryForm.type,
      idNumber: entryForm.idNumber,
      notes: entryForm.notes,
    };

    const success = await accessEntryService.createEntry(entryData, {
      id: user.id,
      name: user.name,
    });

    if (success) {
      Alert.alert(
        'Entry Recorded',
        `${entryForm.name} has been marked as ${entryForm.type.toUpperCase()} at ${new Date().toLocaleTimeString()}`,
        [{ text: 'OK' }]
      );

      // Reset form and close modal
      setEntryForm({
        name: '',
        role: 'student',
        type: 'in',
        idNumber: '',
        notes: '',
      });
      setManualEntryMode(false);
      
      // Refresh stats
      loadStats();
    } else {
      Alert.alert('Error', 'Failed to record entry. Please try again.');
    }
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

  const getRoleIcon = (role: 'student' | 'teacher' | 'guard') => {
    if (role === 'student') return 'school-outline';
    if (role === 'teacher') return 'person-outline';
    return 'shield-outline'; // for guard
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading entries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Access Control</Text>
          <Text style={styles.subtitle}>Manual entry tracking (QR scanner temporarily disabled)</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalEntries}</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.studentsIn}</Text>
            <Text style={styles.statLabel}>Students In</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.teachersIn}</Text>
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
                    {formatTime(entry.timestamp)}
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
            <TouchableOpacity 
              onPress={() => setManualEntryMode(false)}
              disabled={submitting}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.form}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={styles.input}
                value={entryForm.name}
                onChangeText={(text) => setEntryForm(prev => ({ ...prev, name: text }))}
                placeholder="Enter full name"
                editable={!submitting}
              />

              <Text style={styles.label}>Role *</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    entryForm.role === 'student' && styles.roleButtonActive
                  ]}
                  onPress={() => setEntryForm(prev => ({ ...prev, role: 'student' }))}
                  disabled={submitting}
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
                  disabled={submitting}
                >
                  <Text style={[
                    styles.roleButtonText,
                    entryForm.role === 'teacher' && styles.roleButtonTextActive
                  ]}>Teacher</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                {entryForm.role === 'student' ? 'Enrollment Number *' : 'Employee ID *'}
              </Text>
              <TextInput
                style={styles.input}
                value={entryForm.idNumber}
                onChangeText={(text) => setEntryForm(prev => ({ ...prev, idNumber: text }))}
                placeholder={entryForm.role === 'student' ? 'Enter enrollment number' : 'Enter employee ID'}
                editable={!submitting}
              />

              <Text style={styles.label}>Entry Type *</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    entryForm.type === 'in' && styles.roleButtonActive
                  ]}
                  onPress={() => setEntryForm(prev => ({ ...prev, type: 'in' }))}
                  disabled={submitting}
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
                  disabled={submitting}
                >
                  <Text style={[
                    styles.roleButtonText,
                    entryForm.type === 'out' && styles.roleButtonTextActive
                  ]}>Check Out</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={entryForm.notes}
                onChangeText={(text) => setEntryForm(prev => ({ ...prev, notes: text }))}
                placeholder="Add any additional notes..."
                multiline
                numberOfLines={3}
                editable={!submitting}
              />

              <TouchableOpacity 
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]} 
                onPress={handleManualEntry}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Record Entry</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
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
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
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
    backgroundColor: '#f9f9f9',
  },
  roleButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
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
    justifyContent: 'center',
    minHeight: 50,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuardQRScanner;