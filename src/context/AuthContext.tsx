'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock persistent session
    const savedUser = localStorage.getItem('vibhava_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Simulation
    await new Promise(r => setTimeout(r, 1000));
    const mockUser = { id: 'u1', name: 'John Doe', email };
    setUser(mockUser);
    localStorage.setItem('vibhava_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const mockUser = { id: 'u1', name, email };
    setUser(mockUser);
    localStorage.setItem('vibhava_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibhava_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
