import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../context/TaskContext';
import {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskFormErrors,
  hasTaskFormErrors,
  validateTaskForm,
} from '../../utils/validation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

export default function TaskFormScreen({ route, navigation }: Props) {
  const taskId = route.params?.taskId;
  const { user } = useAuth();
  const { addTask, updateTask, getTaskById, loading } = useTasks();

  const existingTask = taskId ? getTaskById(taskId) : undefined;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(
    existingTask?.description ?? ''
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate ?? '');
  const [status, setStatus] = useState<TaskStatus>(
    existingTask?.status ?? 'Pendente'
  );
  const [priority, setPriority] = useState<TaskPriority>(
    existingTask?.priority ?? 'Média'
  );
  const [category, setCategory] = useState<TaskCategory>(
    existingTask?.category ?? 'Pessoal'
  );
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!existingTask) {
      return;
    }

    setTitle(existingTask.title);
    setDescription(existingTask.description);
    setDueDate(existingTask.dueDate);
    setStatus(existingTask.status);
    setPriority(existingTask.priority);
    setCategory(existingTask.category);
  }, [existingTask?.id]);

  useEffect(() => {
    if (taskId && !loading && !existingTask) {
      Alert.alert('Aviso', 'Esta tarefa não foi encontrada.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [taskId, existingTask, loading, navigation]);

  async function handleSave() {
    const validationErrors = validateTaskForm({
      title,
      description,
      status,
      priority,
      category,
    });

    setErrors(validationErrors);

    if (hasTaskFormErrors(validationErrors)) {
      return;
    }

    if (taskId && !existingTask) return;

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const now = new Date().toISOString();

    const task: Task = {
      id: existingTask?.id ?? `${Date.now()}`,
      userId: user.id,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      status,
      priority,
      category,
      createdAt: existingTask?.createdAt ?? now,
      updatedAt: now,
    };

    try {
      setSaving(true);

      if (existingTask) {
        await updateTask(task);
      } else {
        await addTask(task);
      }

      Alert.alert(
        'Sucesso',
        existingTask
          ? 'Tarefa atualizada com sucesso.'
          : 'Tarefa cadastrada com sucesso.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Entregar trabalho"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
        accessibilityLabel="Título da tarefa"
        accessibilityHint="Informe o título da tarefa, com no mínimo 3 caracteres"
        accessibilityRole="text"
      />
      {errors.title ? (
        <Text style={styles.error}>{errors.title}</Text>
      ) : null}

      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Descreva a tarefa..."
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
        accessibilityLabel="Descrição da tarefa"
        accessibilityHint="Informe a descrição da tarefa, com no mínimo 5 caracteres"
        accessibilityRole="text"
      />
      {errors.description ? (
        <Text style={styles.error}>{errors.description}</Text>
      ) : null}

      <Text style={styles.label}>Prazo</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD (ex.: 2026-10-20)"
        value={dueDate}
        onChangeText={setDueDate}
        keyboardType="numbers-and-punctuation"
        accessibilityLabel="Prazo da tarefa"
        accessibilityHint="Informe a data de prazo no formato ano, mês e dia"
        accessibilityRole="text"
      />

      <Text style={styles.label}>Status *</Text>
      {TASK_STATUSES.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.statusOption,
            status === option && styles.selected,
          ]}
          onPress={() => setStatus(option)}
          accessibilityRole="button"
          accessibilityLabel={`Status ${option}`}
          accessibilityHint="Toque para selecionar este status"
          accessibilityState={{ selected: status === option }}
        >
          <Text
            style={[
              styles.statusText,
              status === option && styles.selectedText,
            ]}
          >
            {status === option ? '● ' : '○ '}
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      {errors.status ? (
        <Text style={styles.error}>{errors.status}</Text>
      ) : null}

      <Text style={styles.label}>Prioridade *</Text>
      {TASK_PRIORITIES.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.statusOption,
            priority === option && styles.selected,
          ]}
          onPress={() => setPriority(option)}
          accessibilityRole="button"
          accessibilityLabel={`Prioridade ${option}`}
          accessibilityHint="Toque para selecionar esta prioridade"
          accessibilityState={{ selected: priority === option }}
        >
          <Text
            style={[
              styles.statusText,
              priority === option && styles.selectedText,
            ]}
          >
            {priority === option ? '● ' : '○ '}
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      {errors.priority ? (
        <Text style={styles.error}>{errors.priority}</Text>
      ) : null}

      <Text style={styles.label}>Categoria *</Text>
      {TASK_CATEGORIES.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.statusOption,
            category === option && styles.selected,
          ]}
          onPress={() => setCategory(option)}
          accessibilityRole="button"
          accessibilityLabel={`Categoria ${option}`}
          accessibilityHint="Toque para selecionar esta categoria"
          accessibilityState={{ selected: category === option }}
        >
          <Text
            style={[
              styles.statusText,
              category === option && styles.selectedText,
            ]}
          >
            {category === option ? '● ' : '○ '}
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      {errors.category ? (
        <Text style={styles.error}>{errors.category}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, saving && styles.disabled]}
        onPress={() => void handleSave()}
        disabled={saving}
        accessibilityRole="button"
        accessibilityLabel={
          existingTask ? 'Salvar alterações' : 'Cadastrar tarefa'
        }
        accessibilityHint="Salva a tarefa após validar os campos"
      >
        {saving ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {existingTask ? 'Salvar alterações' : 'Cadastrar tarefa'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F3F4F6', flexGrow: 1 },
  label: { fontSize: 15, fontWeight: 'bold', marginBottom: 8, color: '#374151' },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
    fontSize: 15,
  },
  multiline: { minHeight: 100 },
  error: {
    color: '#DC2626',
    fontSize: 13,
    marginBottom: 14,
  },
  statusOption: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 8,
  },
  selected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  statusText: { color: '#374151' },
  selectedText: { color: '#2563EB', fontWeight: 'bold' },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  disabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
});
