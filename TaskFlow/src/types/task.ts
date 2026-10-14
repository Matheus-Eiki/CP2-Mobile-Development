export type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';

export type TaskPriority = 'Baixa' | 'Média' | 'Alta';

export type TaskCategory = 'Pessoal' | 'Trabalho' | 'Estudos' | 'Outros';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
