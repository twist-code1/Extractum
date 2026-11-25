import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiClient } from '../../api/client.ts';

export interface User {
  id: number;
  email: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await apiClient.get<User>('/auth/me');
      setUser(data);
    } catch {
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();

    const handleForceLogout = () => setUser(null);
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  const loginWithGoogle = async (idToken: string) => {
    const { data } = await apiClient.post<{ accessToken: string }>('/auth/google', {
      idToken,
    });

    localStorage.setItem('accessToken', data.accessToken);
    await fetchMe();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}