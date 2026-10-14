import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTasks } from '../../context/TaskContext';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || 'Não informado';
  }

  return date.toLocaleString('pt-BR');
}

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { getTaskById, deleteTask } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const taskId = route.params.taskId;
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        {deleting ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <Text>Esta tarefa não foi encontrada.</Text>
        )}
      </View>
    );
  }

  function handleDelete() {
    Alert.alert(
      'Excluir tarefa',
      `Deseja realmente excluir "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => void confirmDelete(),
        },
      ]
    );
  }

  async function confirmDelete() {
    try {
      setDeleting(true);
      await deleteTask(taskId);
      Alert.alert('Sucesso', 'Tarefa excluída com sucesso.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Descrição</Text>
      <Text style={styles.value}>{task.description}</Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>{task.status}</Text>

      <Text style={styles.label}>Prioridade</Text>
      <Text style={styles.value}>{task.priority}</Text>

      <Text style={styles.label}>Categoria</Text>
      <Text style={styles.value}>{task.category}</Text>

      <Text style={styles.label}>Criada em</Text>
      <Text style={styles.value}>{formatDate(task.createdAt)}</Text>

      <Text style={styles.label}>Atualizada em</Text>
      <Text style={styles.value}>{formatDate(task.updatedAt)}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('TaskForm', { taskId })}
        disabled={deleting}
        accessibilityRole="button"
        accessibilityLabel="Editar tarefa"
        accessibilityHint="Abre o formulário para alterar esta tarefa"
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={deleting}
        accessibilityRole="button"
        accessibilityLabel="Excluir tarefa"
        accessibilityHint="Remove esta tarefa após confirmação"
      >
        {deleting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Excluir</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
