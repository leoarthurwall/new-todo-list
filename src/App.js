import "./index.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

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

  const toggleComplete = (id) => {
    // new variable copies array and maps through the individual todo.
    const updatedTodos = [...todos].map((todo) => {
      //ifstatement to see if todo's id matches the id of the checkbox - set todo completed status to opposite
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = () => {
    
  }

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
        {todoEditing === todo.id ? ( <input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
            value={todo}
          />) : (<div>{todo.text}</div>)}
          
         
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />
          <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
          <button onClick={() => editTodo(todo.id) }>Confirm</button>
        </div>
      ))}
    </div>
  );
}

export default App;
