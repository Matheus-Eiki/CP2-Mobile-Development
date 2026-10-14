import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TaskStackRoutes from './TaskStackRoutes';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import HomeScreen from '../screens/home/HomeScreen';

import { TabParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabRoutes() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskStackRoutes}
        options={{ title: 'Tarefas' }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}