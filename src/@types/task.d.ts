export type TaskPriority = 'low' | 'normal' | 'urgent';

export type Task = {
  id: number;
  name: string;
  desc: string | null;
  priority: TaskPriority;
  isCompleted: boolean;
};