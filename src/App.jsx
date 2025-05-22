import { useReducer, useState } from "react";
import "./App.css";

function App() {
  const initialState = [];
  const Reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "toggle":
        return state.map(item =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        );

      case "delete":
        return state.filter(todo => todo.id !== action.payload);

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() !== "") {
      const newTodo = {
        id: crypto.randomUUID(),
        text,
        completed: false
      };
      dispatch({
        type: "add",
        payload: newTodo
      });
    }
    setText("");
  };

  return (
    <>
      <h1> My Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new Todo"
        />
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {state.map((todo) => (
          <li key={todo.id}>
            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => dispatch({ type: "toggle", payload: todo.id })}
            >
              {todo.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => dispatch({ type: "delete", payload: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
