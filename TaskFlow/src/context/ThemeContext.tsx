import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryMuted: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  danger: string;
  success: string;
  warning: string;
}

export interface ThemeContextData {
  theme: ThemeMode;
  colors: ThemeColors;
  loading: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const lightColors: ThemeColors = {
  primary: '#2563EB',
  primaryMuted: '#DBEAFE',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  text: '#111827',
  mutedText: '#6B7280',
  border: '#D1D5DB',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
};

const darkColors: ThemeColors = {
  primary: '#60A5FA',
  primaryMuted: '#1E3A5F',
  background: '#111827',
  surface: '#1F2937',
  text: '#F9FAFB',
  mutedText: '#9CA3AF',
  border: '#374151',
  danger: '#F87171',
  success: '#4ADE80',
  warning: '#FBBF24',
};

const THEME_STORAGE_KEY = '@taskflow:theme';

export const ThemeContext = createContext<
  ThemeContextData | undefined
>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(
          THEME_STORAGE_KEY
        );

        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.error('Erro ao carregar o tema:', error);
      } finally {
        setLoading(false);
      }
    }

    void loadTheme();
  }, []);

  function setTheme(newTheme: ThemeMode) {
    setThemeState(newTheme);

    void AsyncStorage.setItem(
      THEME_STORAGE_KEY,
      newTheme
    ).catch(error => {
      console.error('Erro ao salvar o tema:', error);
    });
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        loading,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}