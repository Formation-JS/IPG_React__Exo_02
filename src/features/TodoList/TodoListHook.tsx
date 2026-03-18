import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import { useTaskState } from '../../hooks/task.hook';


export default function TodoListHook() {

  const [tasks, action] = useTaskState();

  return (
    <>
      <h2>Ajouter une nouvelle tache</h2>
      <TaskForm onTaskSubmit={action.handleAdd} btnValidation='Ajouter' />
      <h2>Liste des taches</h2>
      <TaskList tasks={tasks}
        onTaskDelete={action.handleDelete}
        onTaskTerminate={action.handleComplete} />
    </>
  );
}