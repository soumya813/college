import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../context/AuthContext';

interface QRCodeGeneratorProps {
  visible: boolean;
  onClose: () => void;
  type: 'in' | 'out';
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ visible, onClose, type }) => {
  const { user } = useAuth();
  
  if (!user) return null;

  const qrData = {
    userId: user.id,
    name: user.name,
    role: user.role,
    type: type,
    timestamp: new Date().toISOString(),
    enrollmentNumber: user.enrollmentNumber,
    employeeId: user.employeeId,
  };

  const qrValue = JSON.stringify(qrData);

  const getTypeColor = () => {
    return type === 'in' ? '#4CAF50' : '#FF9800';
  };

  const getTypeIcon = () => {
    return type === 'in' ? 'enter-outline' : 'exit-outline';
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.title}>QR Code for Entry</Text>
          </View>

          <View style={styles.qrContainer}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor() }]}>
              <Ionicons name={getTypeIcon()} size={20} color="#fff" />
              <Text style={styles.typeText}>
                {type === 'in' ? 'CHECK IN' : 'CHECK OUT'}
              </Text>
            </View>

            <View style={styles.qrCodeWrapper}>
              <QRCode
                value={qrValue}
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userRole}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.enrollmentNumber || user.employeeId}
              </Text>
            </View>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Instructions:</Text>
            <Text style={styles.instructionText}>
              • Show this QR code to the security guard
            </Text>
            <Text style={styles.instructionText}>
              • Keep the code steady while scanning
            </Text>
            <Text style={styles.instructionText}>
              • QR code expires in 5 minutes
            </Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  instructions: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  doneButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRCodeGenerator;