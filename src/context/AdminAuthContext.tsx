import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AdminRole = 'Super Admin' | 'Store Manager' | 'Product Manager' | 'Order Manager' | 'Content Editor' | 'Customer Support';

export interface AdminSession {
  name: string;
  email: string;
  role: AdminRole;
}

interface AdminAuthContextType {
  admin: AdminSession | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const adminUsers: Array<AdminSession & { password: string }> = [
  { name: 'Nada Hassan', email: 'admin@glowskin.com', password: 'admin123', role: 'Super Admin' },
  { name: 'Maya Brooks', email: 'manager@glowskin.com', password: 'manager123', role: 'Store Manager' },
];

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('glowskinAdminSession') || sessionStorage.getItem('glowskinAdminSession');
    if (saved) setAdmin(JSON.parse(saved));
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    await new Promise(resolve => window.setTimeout(resolve, 350));
    const found = adminUsers.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
    if (!found) throw new Error('Invalid admin email or password.');
    const session: AdminSession = { name: found.name, email: found.email, role: found.role };
    setAdmin(session);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('glowskinAdminSession', JSON.stringify(session));
  };

  const logout = () => {
    localStorage.removeItem('glowskinAdminSession');
    sessionStorage.removeItem('glowskinAdminSession');
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, login, logout, isAuthenticated: Boolean(admin) }), [admin]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};
