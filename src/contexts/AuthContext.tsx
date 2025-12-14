import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export type UserRole = 'admin' | 'customer';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<AuthUser>;
  signup: (data: {
    fullName: string;
    email: string;
    username: string;
    password: string;
    phone?: string;
    experienceLevel?: string;
    remember?: boolean;
  }) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'mr1-auth-user-v1';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const save = (u: AuthUser | null, remember?: boolean) => {
    setUser(u);
    if (remember && u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const delay = () => new Promise((r) => setTimeout(r, 500));
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isStrong = (v: string) => v.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(v);

  const login = async (email: string, password: string, remember?: boolean): Promise<AuthUser> => {
    if (!email || !password) throw new Error('Email and password are required.');
    if (!isEmail(email)) throw new Error('Enter a valid email address.');
    if (!isStrong(password)) throw new Error('Password must be at least 8 characters and include a symbol.');
    setIsLoading(true);
    await delay();

    const lowered = email.toLowerCase();
    let role: UserRole = 'customer';
    let fullName = email.split('@')[0];
    if (lowered === 'admin@mr1dollar.com' && password === 'AdminSecure123!') {
      role = 'admin';
      fullName = 'Admin';
    }

    const u: AuthUser = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      email,
      fullName,
      role,
    };
    save(u, remember);
    setIsLoading(false);
    return u;
  };

  const signup: AuthContextValue['signup'] = async ({ fullName, email, username, password, phone, experienceLevel, remember }): Promise<AuthUser> => {
    if (!fullName || !email || !username || !password) throw new Error('All required fields must be filled.');
    if (!isEmail(email)) throw new Error('Enter a valid email address.');
    if (!isStrong(password)) throw new Error('Password must be at least 8 characters and include a symbol.');
    setIsLoading(true);
    await delay();

    const u: AuthUser = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      email,
      fullName,
      role: 'customer',
    };
    save(u, remember);
    setIsLoading(false);
    return u;
  };

  const logout = () => {
    save(null);
  };

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const RequireAuth = ({ role, children }: { role?: UserRole; children: React.ReactElement }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-slate-200 text-sm">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};
