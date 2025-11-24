import { useState } from 'react';
import TaskForm, { type TaskData } from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import type { Task } from '../../@types/task';

let lastTaskId = 0;


export default function TodoList() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleNewTask = (data: TaskData) => {

    const taskToAdd: Task = {
      ...data,
      id: ++lastTaskId,
      isCompleted: false
    };

    setTasks(tasks => [taskToAdd, ...tasks]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks => tasks.filter(t => t.id === id));
  };

  const handleTerminateTask = (id: number) => {

    // Version avec une fonction « procedural »
    setTasks(tasks => {
      const copy = structuredClone(tasks);

      for (const elem of copy) {
        if (elem.id === id) {
          elem.isCompleted = true;
        }
      }

      return copy;
    });

    // Version utilisant la fonction « map »
    /*
    setTask(tasks => tasks.map(task => (task.id !== id) ? task : { ...task, isCompleted: true }));
    */
  };

  return (
    <>
      <h2>Ajouter une nouvelle tache</h2>
      <TaskForm onTaskSubmit={handleNewTask} btnValidation='Ajouter' />
      <h2>Liste des taches</h2>
      <TaskList tasks={tasks}
        onTaskDelete={handleDeleteTask}
        onTaskTerminate={handleTerminateTask} />
    </>
  );
}