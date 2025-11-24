import type { Task } from '../../@types/task';
import style from './TaskList.module.css';
import clsx from 'clsx';


type TaskListProps = {
  tasks: Task[];
  onTaskDelete?: (id: number) => void
  onTaskTerminate?: (id: number) => void
};
export default function TaskList({ tasks, onTaskTerminate = () => {}, onTaskDelete = () => {} }: TaskListProps) {

  return (
    <ul className={style['task-list']}>
      {tasks.map(task => (
        <TaskListItem key={task.id} {...task}
          onTeminate={onTaskTerminate}
          onDelete={onTaskDelete} />
      ))}
    </ul>
  );
}

type TaskListItemProps = Task & {
  onDelete: (id: number) => void;
  onTeminate: (id: number) => void;
};
function TaskListItem({ id, name, desc, priority, isCompleted, onTeminate, onDelete }: TaskListItemProps) {

  // Le package "clsx" permet de générer une className sur base de nom de classe et condition -> https://www.npmjs.com/package/clsx
  const taskItemClassName = clsx(
    style['task-list-item'],
    isCompleted && style['task-completed']
  );

  return (
    <li className={taskItemClassName}>
      <div>
        <p>{name} {priority === 'urgent' && (<span>(Urgent)</span>)}</p>
        <p>{desc}</p>
      </div>
      <div>
        <button onClick={() => onTeminate(id)} disabled={isCompleted}>Terminer</button>
        <button onClick={() => onDelete(id)}>Supprimer</button>
      </div>
    </li>
  );
}