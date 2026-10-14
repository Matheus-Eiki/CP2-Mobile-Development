
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { User } from '../types/user';
import {
  clearSession,
  getSession,
  saveSession,
} from '../services/authStorage';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const savedUser = await getSession();
        setUser(savedUser);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();

      if (
        normalizedEmail !== 'demo@taskapp.com' ||
        password !== '123456'
      ) {
        throw new Error('E-mail ou senha inválidos.');
      }

      const authenticatedUser: User = {
        id: 'user-1',
        name: 'Usuário Demo',
        email: normalizedEmail,
      };

      await saveSession(authenticatedUser);
      setUser(authenticatedUser);
    },
    []
  );

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
