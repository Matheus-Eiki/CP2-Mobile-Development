import { TaskCategory, TaskPriority, TaskStatus } from '../types/task';

export const TASK_STATUSES: TaskStatus[] = [
  'Pendente',
  'Em andamento',
  'Concluída',
];

export const TASK_PRIORITIES: TaskPriority[] = ['Baixa', 'Média', 'Alta'];

export const TASK_CATEGORIES: TaskCategory[] = [
  'Pessoal',
  'Trabalho',
  'Estudos',
  'Outros',
];

export interface TaskFormValues {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
}

function isValidOption(options: readonly string[], value: string): boolean {
  return options.includes(value);
}

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = 'O título é obrigatório.';
  } else if (title.length < 3) {
    errors.title = 'O título deve ter no mínimo 3 caracteres.';
  }

  if (!description) {
    errors.description = 'A descrição é obrigatória.';
  } else if (description.length < 5) {
    errors.description = 'A descrição deve ter no mínimo 5 caracteres.';
  }

  if (!isValidOption(TASK_STATUSES, values.status)) {
    errors.status = 'Selecione um status válido.';
  }

  if (!isValidOption(TASK_PRIORITIES, values.priority)) {
    errors.priority = 'Selecione uma prioridade válida.';
  }

  if (!isValidOption(TASK_CATEGORIES, values.category)) {
    errors.category = 'Selecione uma categoria válida.';
  }

  return errors;
}

export function hasTaskFormErrors(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
