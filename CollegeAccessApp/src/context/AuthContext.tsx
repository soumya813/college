import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser({ ...userData, id: firebaseUser.uid });
          } else {
            // User document doesn't exist in Firestore
            console.log('User document not found in Firestore');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('Firebase login successful for user:', firebaseUser.uid);
      
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser({ ...userData, id: firebaseUser.uid });
        console.log('User data loaded successfully:', userData.role);
        return true;
      } else {
        console.error('User data not found in Firestore for UID:', firebaseUser.uid);
        console.log('This means the user exists in Authentication but not in Firestore database');
        await signOut(auth);
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      if (error.code === 'auth/invalid-credential') {
        console.log('🔴 Invalid credentials - user may not exist or password is wrong');
      } else if (error.code === 'auth/user-not-found') {
        console.log('🔴 User not found - need to create this user first');
      } else if (error.code === 'auth/wrong-password') {
        console.log('🔴 Wrong password');
      } else if (error.code === 'auth/too-many-requests') {
        console.log('🔴 Too many failed attempts - try again later');
      }
      
      return false;
    }
  };

  const register = async (email: string, password: string, userData: Partial<User>): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user document in Firestore
      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: userData.name!,
        role: userData.role!,
        enrollmentNumber: userData.enrollmentNumber,
        employeeId: userData.employeeId,
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};