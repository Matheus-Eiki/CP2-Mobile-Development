
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TaskStackRoutes from './TaskStackRoutes';
import SettingsScreen from '../screens/Settings/SettingsScreen'
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tarefas"
        component={TaskStackRoutes}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Configurações"
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}
