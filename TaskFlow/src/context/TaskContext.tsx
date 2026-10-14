import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Task } from '../types/task';

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
  const [loading] = useState(false);

  const addTask = useCallback(async (task: Task) => {
    setTasks(currentTasks => [...currentTasks, task]);
  }, []);

  const editTask = useCallback(async (updatedTask: Task) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }, []);

  const removeTask = useCallback(async (id: string) => {
    setTasks(currentTasks =>
      currentTasks.filter(task => task.id !== id)
    );
  }, []);

  const findTask = useCallback(
    (id: string) => tasks.find(task => task.id === id),
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