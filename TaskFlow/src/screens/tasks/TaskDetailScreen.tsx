
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTasks } from '../../context/TaskContext';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { findTask, removeTask } = useTasks();

  const taskId = route.params.taskId;
  const task = findTask(taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Esta tarefa não foi encontrada.</Text>
      </View>
    );
  }

  const taskTitle = task.title;
  const taskDescription = task.description;
  const taskStatus = task.status;
  const taskDueDate = task.dueDate;
  const taskCreatedAt = task.createdAt;

  function handleDelete() {
    Alert.alert(
      'Excluir tarefa',
      `Deseja realmente excluir "${taskTitle}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeTask(taskId);
              navigation.goBack();
            } catch {
              Alert.alert(
                'Erro',
                'Não foi possível excluir a tarefa.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{taskTitle}</Text>

      <Text style={styles.label}>Descrição</Text>
      <Text style={styles.value}>
        {taskDescription || 'Sem descrição'}
      </Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>{taskStatus}</Text>

      <Text style={styles.label}>Prazo</Text>
      <Text style={styles.value}>
        {taskDueDate || 'Não definido'}
      </Text>

      <Text style={styles.label}>Criada em</Text>
      <Text style={styles.value}>
        {new Date(taskCreatedAt).toLocaleString('pt-BR')}
      </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('TaskForm', { taskId })
        }
      >
        <Text style={styles.buttonText}>Editar tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Excluir tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
