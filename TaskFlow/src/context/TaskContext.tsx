import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_STORAGE_KEY = '@taskflow:tasks';

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  findTask: (id: string) => Task | undefined;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega as tarefas salvas ao abrir o aplicativo.
  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

        if (savedTasks) {
          setTasks(JSON.parse(savedTasks) as Task[]);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  // Salva a lista atual no armazenamento do dispositivo.
  const saveTasks = useCallback(async (updatedTasks: Task[]) => {
    await AsyncStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(updatedTasks)
    );
  }, []);

  const addTask = useCallback(
    async (task: Task) => {
      const updatedTasks = [...tasks, task];

      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
    },
    [tasks, saveTasks]
  );

  const editTask = useCallback(
    async (updatedTask: Task) => {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
    },
    [tasks, saveTasks]
  );

  const removeTask = useCallback(
    async (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);

      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
    },
    [tasks, saveTasks]
  );

  const findTask = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        editTask,
        removeTask,
        findTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
