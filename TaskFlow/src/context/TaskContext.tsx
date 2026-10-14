import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { Task } from '../types/task';
import { useAuth } from '../hooks/useAuth';
import {
  getStoredTasks,
  saveStoredTasks,
} from '../services/taskStorage';

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);

interface TaskProviderProps {
  children: ReactNode;
}

function normalizeTask(task: Task, fallbackUserId: string): Task {
  return {
    ...task,
    userId: task.userId || fallbackUserId,
    priority: task.priority ?? 'Média',
    category: task.category ?? 'Outros',
    updatedAt: task.updatedAt ?? task.createdAt,
  };
}

export function TaskProvider({ children }: TaskProviderProps) {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await getStoredTasks();
        setAllTasks(
          savedTasks.map(task => normalizeTask(task, 'user-1'))
        );
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        setLoading(false);
      }
    }

    void loadTasks();
  }, []);

  const tasks = useMemo(
    () => (user ? allTasks.filter(task => task.userId === user.id) : []),
    [allTasks, user]
  );

  const persistTasks = useCallback(async (updatedTasks: Task[]) => {
    await saveStoredTasks(updatedTasks);
    setAllTasks(updatedTasks);
  }, []);

  const addTask = useCallback(
    async (task: Task) => {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const now = new Date().toISOString();
      const taskToSave: Task = {
        ...task,
        userId: user.id,
        createdAt: task.createdAt || now,
        updatedAt: now,
      };

      await persistTasks([...allTasks, taskToSave]);
    },
    [allTasks, persistTasks, user]
  );

  const updateTask = useCallback(
    async (updatedTask: Task) => {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const exists = allTasks.some(
        task => task.id === updatedTask.id && task.userId === user.id
      );

      if (!exists) {
        throw new Error('Tarefa não encontrada.');
      }

      const now = new Date().toISOString();
      const updatedTasks = allTasks.map(task =>
        task.id === updatedTask.id && task.userId === user.id
          ? {
              ...updatedTask,
              userId: user.id,
              createdAt: task.createdAt,
              updatedAt: now,
            }
          : task
      );

      await persistTasks(updatedTasks);
    },
    [allTasks, persistTasks, user]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const updatedTasks = allTasks.filter(
        task => !(task.id === id && task.userId === user.id)
      );

      await persistTasks(updatedTasks);
    },
    [allTasks, persistTasks, user]
  );

  const getTaskById = useCallback(
    (id: string) => tasks.find(task => task.id === id),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
