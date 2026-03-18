import { useState } from 'react';
import type { Task } from '../@types/task';
import type { TaskData } from '../components/TaskForm/TaskForm';

type TaskStateReturn = [Task[], { 
  handleAdd: (data : TaskData) => void , 
  handleComplete: (id: number) => void, 
  handleDelete: (id: number) => void
}];

export function useTaskState(initalState: Task[] = []): TaskStateReturn {

  const [tasks, setTasks] = useState<Task[]>(initalState);
  const [nextId, setNextId] = useState(1);

  const handleAdd = (data: TaskData) => {
    const dataToAdd = { ...data, id: nextId, isCompleted: false };

    setTasks(val => [...val, dataToAdd]);
    setNextId(id => id + 1);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks => tasks.filter(tasks => tasks.id !== id));
  };

  const handleComplete = (id: number) => {
    setTasks(tasks => tasks.map(task => (task.id !== id) ? task : { ...task, isCompleted: true }));
  };

  return [tasks, { handleAdd, handleComplete, handleDelete }];
}