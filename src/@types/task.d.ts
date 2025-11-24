export type TaskPriority = 'low' | 'normal' | 'urgent';

export type Task = {
  id: number;
  name: string;
  desc: string;
  priority: TaskPriority;
  isCompleted: boolean;
};