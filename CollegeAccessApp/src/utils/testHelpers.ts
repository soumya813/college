// Test user creation utility
// This is for development purposes only

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const createTestUsers = async () => {
  const testUsers = [
    {
      email: 'student@test.com',
      password: 'test123',
      userData: {
        name: 'Test Student',
        role: 'student' as const,
        enrollmentNumber: 'STU001',
      }
    },
    {
      email: 'teacher@test.com',
      password: 'test123',
      userData: {
        name: 'Test Teacher',
        role: 'teacher' as const,
        employeeId: 'TCH001',
      }
    },
    {
      email: 'guard@test.com',
      password: 'test123',
      userData: {
        name: 'Test Guard',
        role: 'guard' as const,
        employeeId: 'GRD001',
      }
    }
  ];

  const results = [];

  for (const testUser of testUsers) {
    try {
      console.log(`Creating test user: ${testUser.email}`);
      
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        testUser.email, 
        testUser.password
      );
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        id: userCredential.user.uid,
        email: testUser.email,
        ...testUser.userData,
      });
      
      console.log(`✅ Successfully created: ${testUser.email}`);
      results.push({ email: testUser.email, success: true });
      
    } catch (error: any) {
      console.log(`❌ Failed to create ${testUser.email}:`, error.message);
      results.push({ email: testUser.email, success: false, error: error.message });
    }
  }

  return results;
};

// Alternative simple login for testing
export const testLogin = async (email: string, password: string) => {
  try {
    console.log('Testing login for:', email);
    console.log('Firebase config loaded:', !!auth);
    
    // This will help debug Firebase connection
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login test successful:', result.user.uid);
    return true;
  } catch (error: any) {
    console.log('Login test failed:', error.code, error.message);
    return false;
  }
};