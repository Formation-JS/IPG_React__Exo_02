import './App.css'
import TodoList from './features/TodoList/TodoList';
import Header from './ui/header/header';


function App() {

  return (
    <>
      <Header />
      <main>
        <TodoList />
      </main>
    </>
  )
}

export default App
