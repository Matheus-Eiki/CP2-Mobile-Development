
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTasks } from '../../context/TaskContext';
import { Task, TaskStatus } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

const statuses: TaskStatus[] = [
  'Pendente',
  'Em andamento',
  'Concluída',
];

export default function TaskFormScreen({ route, navigation }: Props) {
  const taskId = route.params.taskId;
  const { tasks, addTask, editTask } = useTasks();

  const existingTask = tasks.find(task => task.id === taskId);

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(
    existingTask?.description ?? ''
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate ?? '');
  const [status, setStatus] = useState<TaskStatus>(
    existingTask?.status ?? 'Pendente'
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (taskId && !existingTask) {
      Alert.alert('Aviso', 'Esta tarefa não foi encontrada.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [taskId, existingTask, navigation]);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Atenção', 'O título é obrigatório.');
      return;
    }

    if (taskId && !existingTask) return;

    const now = new Date().toISOString();

    const task: Task = {
      id: existingTask?.id ?? `${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      status,
      createdAt: existingTask?.createdAt ?? now,
    };

    try {
      setSaving(true);

      if (existingTask) {
        await editTask(task);
      } else {
        await addTask(task);
      }

      navigation.goBack();
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
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Descreva a tarefa..."
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Prazo</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD (ex.: 2026-10-20)"
        value={dueDate}
        onChangeText={setDueDate}
        keyboardType="numbers-and-punctuation"
      />

      <Text style={styles.label}>Status</Text>
      {statuses.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.statusOption,
            status === option && styles.selected,
          ]}
          onPress={() => setStatus(option)}
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

      <TouchableOpacity
        style={[styles.button, saving && styles.disabled]}
        onPress={() => void handleSave()}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Salvando...' : existingTask ? 'Salvar alterações' : 'Cadastrar tarefa'}
        </Text>
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
    marginBottom: 18,
    fontSize: 15,
  },
  multiline: { minHeight: 100 },
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
