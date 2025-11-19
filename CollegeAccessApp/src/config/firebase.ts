import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPU_8qYfR6SHMwE-ewlSBjBGjCz1EevXA",
  authDomain: "college-71a25.firebaseapp.com",
  projectId: "college-71a25",
  storageBucket: "college-71a25.firebasestorage.app",
  messagingSenderId: "378595300056",
  appId: "1:378595300056:web:11581839e5c5650fd77dad",
  measurementId: "G-C13987VT3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
export default app;