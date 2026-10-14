import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import EmptyState from '../../components/EmptyState';
import FilterBar, { TaskFilter } from '../../components/FilterBar';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { Task } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, loading, removeTask } = useTasks();
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<TaskFilter>('Todas');
  const filteredTasks = useMemo(
    () => selectedFilter === 'Todas' ? tasks : tasks.filter(task => task.status === selectedFilter),
    [tasks, selectedFilter]
  );

  async function deleteTask(task: Task) {
    try {
      await removeTask(task.id);
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
    }
  }

  function confirmDelete(task: Task) {
    if (Platform.OS === 'web') {
      if (globalThis.confirm(`Deseja excluir "${task.title}"?`)) void deleteTask(task);
      return;
    }

    Alert.alert('Excluir tarefa', `Deseja excluir "${task.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => void deleteTask(task) },
    ]);
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Minhas tarefas" />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TaskForm', {})}
        accessibilityRole="button"
        accessibilityLabel="Criar nova tarefa"
      >
        <Text style={styles.addText}>+ Nova tarefa</Text>
      </TouchableOpacity>
      <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={filteredTasks.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={
          <EmptyState
            title={tasks.length === 0 ? 'Nenhuma tarefa cadastrada' : 'Nenhuma tarefa neste status'}
            description={tasks.length === 0 ? 'Crie sua primeira tarefa para começar.' : 'Escolha outro status para ver suas tarefas.'}
          />
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            onEdit={() => navigation.navigate('TaskForm', { taskId: item.id })}
            onDelete={() => confirmDelete(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  addButton: { padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 18 },
  addText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
});
