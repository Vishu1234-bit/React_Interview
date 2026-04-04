import "./styles.css";
import { useState } from "react";
export default function App() {
  const [todo, setTodo] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const handleTasks = (query) => {
    if (query.trim() === "") {
      return;
    }
    setTodo((prev) => [
      ...prev,
      { id: Date.now(), text: query, completed: false },
    ]);
    setQuery("");
  };
  const deleteTask = (index) => {
    setTodo(todo?.filter((t) => t.id !== index));
  };
  const editTask = (id, newText) => {
    setTodo((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };
  const completeTask = (id) => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const filteredTodo = todo?.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });
  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter Todo"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleTasks(query)}>Submit</button>
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>
      {filteredTodo?.length > 0 && (
        <ul>
          {filteredTodo.map((todoTasks) => (
            <li key={todoTasks.id}>
              <span>{todoTasks.text}</span>
              <button onClick={() => deleteTask(todoTasks.id)}>Delete</button>
              <button onClick={() => completeTask(todoTasks.id)}>
                Mark Completed
              </button>
              <button
                onClick={() => {
                  const newtext = prompt("editTodo", todoTasks.text);
                  if (newtext.trim() !== "") editTask(todoTasks.id, newtext);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
