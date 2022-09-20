import "./index.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const newTodo = {
    id: new Date().getTime(),
    text: todo,
    complete: false,
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a todo..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit"> Add Todo</button>
      </form>
    </div>
  );
}

export default App;
