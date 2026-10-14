import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_STORAGE_KEY = '@taskflow:tasks';

export async function getStoredTasks(): Promise<Task[]> {
  try {
    const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    return JSON.parse(savedTasks) as Task[];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    throw error;
  }
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
    throw error;
  }
}
