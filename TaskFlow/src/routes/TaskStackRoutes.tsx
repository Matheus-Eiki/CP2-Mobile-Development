
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from '../screens/tasks/TaskListScreen';
import TaskFormScreen from '../screens/tasks/TaskFormScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import { TaskStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TaskStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ title: 'Minhas tarefas' }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={({ route }) => ({
          title: route.params?.taskId ? 'Editar tarefa' : 'Nova tarefa',
        })}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalhes da tarefa' }}
      />
    </Stack.Navigator>
  );
}
