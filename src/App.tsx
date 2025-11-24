import './App.css'
import TaskList from './components/TaskList/TaskList';
import Header from './ui/header/header';

import taskMockup from './data/task-mockup.json';
import type { Task } from './@types/task';

function App() {

  return (
    <>
      <Header />
      <main>
        <h2>Correction !</h2>
        <TaskList tasks={taskMockup as Task[]} />
      </main>
    </>
  )
}

export default App
