import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  updateUserProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) {
      throw new Error('No user is currently signed in');
    }
  
    try {
      await updateProfile(user, { displayName });
      
      await user.reload();
      const updatedUser = FIREBASE_AUTH.currentUser;
      
      if (updatedUser) {
        await updatedUser.getIdToken(true);
        setUser(updatedUser);
      } else {
        throw new Error('User not found after update');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);