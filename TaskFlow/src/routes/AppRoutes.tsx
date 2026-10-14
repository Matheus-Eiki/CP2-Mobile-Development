import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

  const { user, loading } = useAuth();
  const { theme, colors, loading: themeLoading } = useTheme();

  if (loading || themeLoading) {
    return (
  return (
    <NavigationContainer
      theme={{
        ...(theme === 'dark' ? DarkTheme : DefaultTheme),
        colors: {
          ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>