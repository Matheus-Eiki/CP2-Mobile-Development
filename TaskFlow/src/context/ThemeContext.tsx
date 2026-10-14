import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  primaryMuted: string;
  danger: string;
  success: string;
  warning: string;
}

interface ThemeContextData {
  theme: ThemeMode;
  colors: ThemeColors;
  loading: boolean;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
}

const THEME_STORAGE_KEY = '@taskflow:theme';

const palettes: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    primary: '#2563EB',
    primaryMuted: '#EFF6FF',
    danger: '#DC2626',
    success: '#15803D',
    warning: '#B45309',
  },
  dark: {
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    mutedText: '#9CA3AF',
    border: '#374151',
    primary: '#60A5FA',
    primaryMuted: '#1E3A5F',
    danger: '#F87171',
    success: '#4ADE80',
    warning: '#FBBF24',
  },
};

export const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  colors: palettes.light,
  loading: true,
  toggleTheme: async () => undefined,
  setTheme: async () => undefined,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') setThemeState(savedTheme);
      } catch (error) {
        console.error('Não foi possível carregar o tema salvo.', error);
      } finally {
        setLoading(false);
      }
    }

    void loadTheme();
  }, []);

  const setTheme = useCallback(async (nextTheme: ThemeMode) => {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(async () => {
    await setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({ theme, colors: palettes[theme], loading, toggleTheme, setTheme }),
    [theme, loading, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
