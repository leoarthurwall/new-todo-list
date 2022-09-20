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
    setTodo("");
  };

  const deleteTodo = (id) => {
    //new variable that copies array, and returns todos that do not match the id of the selected todo.
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    //sets the todos array to the updated todos
    setTodos(updatedTodos);
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
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.text}</div>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button>Edit</button>
          <input type="checkbox"></input>
        </div>
      ))}
    </div>
  );
}

export default App;
