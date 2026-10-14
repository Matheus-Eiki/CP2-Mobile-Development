import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import EmptyState from '../../components/EmptyState';
import FilterBar, { TaskFilter } from '../../components/FilterBar';
import Header from '../../components/Header';

import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

import { Task } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, loading, deleteTask } = useTasks();
  const { colors } = useTheme();
  const { logout } = useAuth();

  const [selectedFilter, setSelectedFilter] =
    useState<TaskFilter>('Todas');

  const filteredTasks = useMemo(
    () =>
      selectedFilter === 'Todas'
        ? tasks
        : tasks.filter(task => task.status === selectedFilter),
    [tasks, selectedFilter]
  );

  async function handleDeleteTask(task: Task) {
    try {
      await deleteTask(task.id);
    } catch {
      if (Platform.OS === 'web') {
        globalThis.alert('Não foi possível excluir a tarefa.');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
      }
    }
  }

  function confirmDelete(task: Task) {
    if (Platform.OS === 'web') {
      const confirmed = globalThis.confirm(
        `Deseja excluir "${task.title}"?`
      );

      if (confirmed) {
        void handleDeleteTask(task);
      }

      return;
    }

    Alert.alert(
      'Excluir tarefa',
      `Deseja excluir "${task.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => void handleDeleteTask(task),
        },
      ]
    );
  }

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Header title="Minhas tarefas" />
        </View>

        <TouchableOpacity
          onPress={() => void logout()}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          accessibilityHint="Encerra a sessão e volta para a tela de login"
        >
          <Text style={[styles.logout, { color: colors.danger }]}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: colors.primary },
        ]}
        onPress={() => navigation.navigate('TaskForm', {})}
        accessibilityRole="button"
        accessibilityLabel="Criar nova tarefa"
        accessibilityHint="Abre o formulário para cadastrar uma nova tarefa"
      >
        <Text style={styles.addText}>+ Nova tarefa</Text>
      </TouchableOpacity>

      <FilterBar
        selected={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={
          filteredTasks.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <EmptyState
            title={
              tasks.length === 0
                ? 'Nenhuma tarefa cadastrada'
                : 'Nenhuma tarefa neste status'
            }
            description={
              tasks.length === 0
                ? 'Crie sua primeira tarefa para começar.'
                : 'Escolha outro status para ver suas tarefas.'
            }
          />
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskItem,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.taskInfo}
              onPress={() =>
                navigation.navigate('TaskDetail', {
                  taskId: item.id,
                })
              }
              accessibilityRole="button"
              accessibilityLabel={`Ver tarefa ${item.title}`}
              accessibilityHint="Abre os detalhes da tarefa"
            >
              <Text
                style={[styles.taskTitle, { color: colors.text }]}
              >
                {item.title}
              </Text>

              <Text style={{ color: colors.mutedText }}>
                Status: {item.status}
              </Text>
            </TouchableOpacity>

            <View style={styles.taskActions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskForm', {
                    taskId: item.id,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={`Editar tarefa ${item.title}`}
                accessibilityHint="Abre o formulário para editar esta tarefa"
              >
                <Text style={{ color: colors.primary }}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => confirmDelete(item)}
                accessibilityRole="button"
                accessibilityLabel={`Excluir tarefa ${item.title}`}
                accessibilityHint="Remove esta tarefa após confirmação"
              >
                <Text style={{ color: colors.danger }}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
  },
  logout: {
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  addText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  taskItem: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  taskInfo: {
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});