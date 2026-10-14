
export type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}
