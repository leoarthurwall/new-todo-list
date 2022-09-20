import "./index.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    //take in current todos array and add the new todo to it.
    setTodos([...todos].concat(newTodo));
    //resets the input and makes it black
    setTodo("")
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
      {todos.map((todo) => <div>{todo.text}</div>)}
    </div>
  );
}

export default App;
