import "./index.css";
import React, { useState, useEffect } from "react";
//HEROICONS IMPORTS
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

function App() {
  //NOTE: use state returns an empty array if local storage returns null/undefined
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? []
  );
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null); //id of the todo we are editing
  const [editingText, setEditingText] = useState(""); //tracks the text of the todo we are editing

  //STORES DATA
  // runs every time the todos array changes
  // todos is turned into JSON string, data is then saved to local storage as key/value pair
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  //HANDLE SUBMIT FUNCTION
  // creates an object for each todo that is submitted
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

  //DELETE TODO FUNCTION
  const deleteTodo = (id) => {
    //new variable that copies array, and returns todos that do not match the id of the selected todo.
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    //sets the todos array to the updated todos
    setTodos(updatedTodos);
  };

  //TOGGLE COMPLETE FUNCTION
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
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="write a todo..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          autoFocus
          required
          className="todo-input"
        />
        <button type="submit" className="add-button">
          {" "}
          Add
        </button>
      </form>
      {todos
        .sort((a, b) => b.id - a.id)
        .map((todo) => (
          <div key={todo.id} className="todos-container">
            <div className="todo-text-edit-toggle-container">
              <input
                className="toggle-input"
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
              {todoEditing === todo.id ? (
                <input
                  className="edit-input"
                  placeholder="update todo..."
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <div className="todo-text">{todo.text}</div>
              )}
            </div>
            <div className="todo-button-container">
              {todoEditing === todo.id ? (
                <button
                  className="icon-button"
                  onClick={() => editTodo(todo.id)}
                >
                  <CheckCircleIcon width={20} height={20} color="white" />
                </button>
              ) : (
                <button
                  className="icon-button"
                  onClick={() => setTodoEditing(todo.id)}
                >
                  <PencilSquareIcon width={20} height={20} color="white" />
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                <TrashIcon width={20} height={20} color="white" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;

//FUTURE IMPLEMENTATIONS
// - number of todos remaining
// - line through text when text box is checked
// - option to cancel edit mode, so you're not forced to make a change when you click on the edit button
// - organisation of components and file structure