import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import TabRoutes from './TabRoutes';

import { AppStackParamList } from '../types/navigation';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  const { user, loading } = useAuth();
  const { theme, colors, loading: themeLoading } = useTheme();

  // Aguarda o carregamento da autenticação e do tema.
  if (loading || themeLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  // Define as cores de acordo com o tema selecionado.
  const navigationTheme = {
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
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name="Principal"
            component={TabRoutes}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}