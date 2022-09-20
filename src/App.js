import './index.css';
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  return (
    <div className="App">
      <form>
        <input type="text" placeholder='Write a todo...' />
        <button type='submit' > Add Todo</button>
      </form>
    </div>
  );
}

export default App;
