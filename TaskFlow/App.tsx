
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppRoutes } from './src/routes/AppRoutes';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <StatusBar style="auto" />
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
