'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync or create user in Firestore
  const syncUserToFirestore = async (firebaseUser: any) => {
    console.log("👤 Syncing user to Firestore:", firebaseUser.uid);
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Guest User',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || '',
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (!userDoc.exists()) {
        console.log("📝 Creating new user document...");
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
        });
      } else {
        console.log("🔄 Updating existing user document...");
        await setDoc(userRef, userData, { merge: true });
      }

      setUser({
        id: firebaseUser.uid,
        name: userData.name,
        email: userData.email || '',
        photoURL: userData.photoURL,
      });
      console.log("✅ User sync complete.");
    } catch (error) {
      console.error("❌ User sync failed:", error);
      // Still set the user state so the UI isn't blocked, 
      // even if Firestore sync fails
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Guest User',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || '',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUserToFirestore(firebaseUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = userCredential.user;
      
      // Update profile
      await updateProfile(newUser, { displayName: name });
      
      // Initial sync handled by onAuthStateChanged
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
