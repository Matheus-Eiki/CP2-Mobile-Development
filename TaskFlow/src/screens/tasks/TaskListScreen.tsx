import React from 'react';
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

import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../hooks/useAuth';
import { Task } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, loading, removeTask } = useTasks();
  const { logout } = useAuth();

  async function confirmDelete(task: Task) {
    if (Platform.OS === 'web') {
      const confirmed = globalThis.confirm(
        `Deseja excluir "${task.title}"?`
      );

      if (!confirmed) return;

      try {
        await removeTask(task.id);
      } catch {
        globalThis.alert('Não foi possível excluir a tarefa.');
      }

      return;
    }

    Alert.alert(
      'Excluir tarefa',
      `Deseja excluir "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void removeTask(task.id).catch(() => {
              Alert.alert(
                'Erro',
                'Não foi possível excluir a tarefa.'
              );
            });
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas tarefas</Text>

        <TouchableOpacity onPress={() => void logout()}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TaskForm', {})}
      >
        <Text style={styles.addText}>+ Nova tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhuma tarefa cadastrada. Crie sua primeira tarefa!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.taskInfo}
              onPress={() =>
                navigation.navigate('TaskDetail', {
                  taskId: item.id,
                })
              }
            >
              <Text style={styles.taskTitle}>{item.title}</Text>

              <Text style={styles.description} numberOfLines={2}>
                {item.description || 'Sem descrição'}
              </Text>

              <Text style={styles.status}>
                Status: {item.status}
              </Text>

              <Text style={styles.date}>
                Prazo: {item.dueDate || 'Não definido'}
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskForm', {
                    taskId: item.id,
                  })
                }
              >
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => void confirmDelete(item)}
              >
                <Text style={styles.delete}>Excluir</Text>
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
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
  },
  logout: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  addText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  taskInfo: {
    gap: 6,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
  },
  status: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 14,
  },
  edit: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  delete: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});