import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'group_leader' | 'laborer' | 'expert';
  phone: string;
  location: string;
  verified: boolean;
  rating?: number;
  specialization?: string;
  experience?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('agriconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      

      // Check if user exists in localStorage (registered users)
      const registeredUsers = JSON.parse(localStorage.getItem('agriconnect_registered_users') || '[]');
      let userData = registeredUsers.find((u: any) => u.email === email && u.password === password);
      
      // If role is specified, also check role match
      if (role && userData && userData.role !== role) {
        userData = null;
      }
      
      if (userData) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
        localStorage.setItem('agriconnect_user', JSON.stringify(userWithoutPassword));
      } else {
        throw new Error('Invalid email, password, or role. Please check your credentials or sign up for a new account.');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem('agriconnect_registered_users') || '[]');
      const existingUser = registeredUsers.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('An account with this email already exists. Please use a different email or try logging in.');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'farmer',
        phone: userData.phone || '',
        location: userData.location || '',
        verified: false,
        rating: 4.0,
        ...(userData.specialization && { specialization: userData.specialization }),
        ...(userData.experience && { experience: userData.experience })
      };
      
      // Store user with password in registered users list
      const userWithPassword = { ...newUser, password: userData.password };
      registeredUsers.push(userWithPassword);
      localStorage.setItem('agriconnect_registered_users', JSON.stringify(registeredUsers));
      
      // Set current user (without password)
      setUser(newUser);
      localStorage.setItem('agriconnect_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriconnect_user');
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};