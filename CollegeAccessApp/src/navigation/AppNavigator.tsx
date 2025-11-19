import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, TeacherTabParamList, StudentTabParamList, GuardTabParamList } from '../types';

// Import screens (we'll create these next)
import LoginScreen from '../screens/LoginScreen';
import TeacherDashboard from '../screens/Teacher/TeacherDashboard';
import TeacherTimetable from '../screens/Teacher/TeacherTimetable';
import TeacherNotifications from '../screens/Teacher/TeacherNotifications';
import TeacherSettings from '../screens/Teacher/TeacherSettings';
import StudentDashboard from '../screens/Student/StudentDashboard';
import StudentTimetable from '../screens/Student/StudentTimetable';
import StudentNotifications from '../screens/Student/StudentNotifications';
import StudentSettings from '../screens/Student/StudentSettings';
import GuardQRScanner from '../screens/Guard/GuardQRScanner';
import GuardSettings from '../screens/Guard/GuardSettings';

const Stack = createStackNavigator<RootStackParamList>();
const TeacherTab = createBottomTabNavigator<TeacherTabParamList>();
const StudentTab = createBottomTabNavigator<StudentTabParamList>();
const GuardTab = createBottomTabNavigator<GuardTabParamList>();

// Teacher Tab Navigator
export const TeacherTabNavigator = () => {
  return (
    <TeacherTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Timetable') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <TeacherTab.Screen 
        name="Dashboard" 
        component={TeacherDashboard}
        options={{ title: 'Teacher Dashboard' }}
      />
      <TeacherTab.Screen 
        name="Timetable" 
        component={TeacherTimetable}
        options={{ title: 'Timetable' }}
      />
      <TeacherTab.Screen 
        name="Notifications" 
        component={TeacherNotifications}
        options={{ title: 'Notifications' }}
      />
      <TeacherTab.Screen 
        name="Settings" 
        component={TeacherSettings}
        options={{ title: 'Settings' }}
      />
    </TeacherTab.Navigator>
  );
};

// Student Tab Navigator
export const StudentTabNavigator = () => {
  return (
    <StudentTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Timetable') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <StudentTab.Screen 
        name="Dashboard" 
        component={StudentDashboard}
        options={{ title: 'Student Dashboard' }}
      />
      <StudentTab.Screen 
        name="Timetable" 
        component={StudentTimetable}
        options={{ title: 'Timetable' }}
      />
      <StudentTab.Screen 
        name="Notifications" 
        component={StudentNotifications}
        options={{ title: 'Notifications' }}
      />
      <StudentTab.Screen 
        name="Settings" 
        component={StudentSettings}
        options={{ title: 'Settings' }}
      />
    </StudentTab.Navigator>
  );
};

// Guard Tab Navigator
export const GuardTabNavigator = () => {
  return (
    <GuardTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'QRScanner') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9800',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <GuardTab.Screen 
        name="QRScanner" 
        component={GuardQRScanner}
        options={{ title: 'QR Scanner' }}
      />
      <GuardTab.Screen 
        name="Settings" 
        component={GuardSettings}
        options={{ title: 'Settings' }}
      />
    </GuardTab.Navigator>
  );
};

// Main Stack Navigator
export const AppNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TeacherTabs" component={TeacherTabNavigator} />
      <Stack.Screen name="StudentTabs" component={StudentTabNavigator} />
      <Stack.Screen name="GuardTabs" component={GuardTabNavigator} />
    </Stack.Navigator>
  );
};