import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null); //id of the todo we are editing
  const [editingText, setEditingText] = useState(""); //tracks the text of the todo we are editing
  
  //RETRIEVES DATA
  //runs once when page is loaded
  //access local storage with getItem method, accessing the "todos" string saved above
  //parses JSON string back to JSON object
  //only setTodos if loaded todos exist
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  //STORES DATA
  // runs every time the todos array changes
  // todos is turned into JSON string, data is then saved to local storage as key/value pair
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);


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

  //EDIT TODO - map over the todos array, if todo.id is matched, then todo.text = editingTest state. SetTodos is updated and states are reset.
  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
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
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />
          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>Confirm</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
