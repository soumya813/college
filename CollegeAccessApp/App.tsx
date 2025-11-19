import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppNavigator, TeacherTabNavigator, StudentTabNavigator, GuardTabNavigator } from './src/navigation/AppNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (!user) {
    return <AppNavigator />;
  }

  // Navigate based on user role
  switch (user.role) {
    case 'teacher':
      return <TeacherTabNavigator />;
    case 'student':
      return <StudentTabNavigator />;
    case 'guard':
      return <GuardTabNavigator />;
    default:
      return <AppNavigator />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#2196F3" />
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
