import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { createTestUsers } from '../utils/testHelpers';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Starting login process...');
      const success = await login(email.trim(), password);
      
      if (!success) {
        Alert.alert(
          'Login Failed', 
          'Check the console for detailed error information. Common issues:\n\n' +
          '• User account may not exist\n' +
          '• Incorrect password\n' +
          '• Firestore permissions\n' +
          '• Network connectivity\n\n' +
          'Try creating test users first or check Firebase Console.'
        );
      } else {
        console.log('Login successful!');
      }
    } catch (error) {
      console.error('Login error in component:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestUsers = async () => {
    setLoading(true);
    try {
      Alert.alert(
        'Create Test Users',
        'This will create test accounts for development. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Create',
            onPress: async () => {
              const results = await createTestUsers();
              const successCount = results.filter(r => r.success).length;
              const failCount = results.filter(r => !r.success).length;
              
              Alert.alert(
                'Test Users Creation',
                `Created: ${successCount}\nFailed: ${failCount}\n\nCheck console for details.`
              );
            }
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>College Access</Text>
          <Text style={styles.subtitle}>Management System</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Test Login Buttons for Development */}
          <View style={styles.testSection}>
            <Text style={styles.testTitle}>Test Accounts (Development)</Text>
            
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => {
                setEmail('student@test.com');
                setPassword('test123');
              }}
              disabled={loading}
            >
              <Text style={styles.testButtonText}>Fill Student Test Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testButton}
              onPress={() => {
                setEmail('teacher@test.com');
                setPassword('test123');
              }}
              disabled={loading}
            >
              <Text style={styles.testButtonText}>Fill Teacher Test Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testButton}
              onPress={() => {
                setEmail('guard@test.com');
                setPassword('test123');
              }}
              disabled={loading}
            >
              <Text style={styles.testButtonText}>Fill Guard Test Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#28a745' }]}
              onPress={handleCreateTestUsers}
              disabled={loading}
            >
              <Text style={styles.testButtonText}>Create Test Users in Firebase</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Demo Accounts:</Text>
            <Text style={styles.demoText}>Teacher: john.doe@college.edu</Text>
            <Text style={styles.demoText}>Student: jane.smith@college.edu</Text>
            <Text style={styles.demoText}>Guard: bob.wilson@college.edu</Text>
            <Text style={styles.demoText}>Password: password123</Text>
            <Text style={styles.demoNote}>
              Note: You'll need to set up Firebase and create these accounts
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  form: {
    width: '100%',
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  demoInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  demoNote: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  testSection: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#6c757d',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 4,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default LoginScreen;