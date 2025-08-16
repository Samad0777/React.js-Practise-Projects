import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //  1. Load todos from localStorage when app starts
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  //  2. Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg p-6 rounded-3xl sm:p-16">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
          React Todo List✅
        </h1>
        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a new todo"
            className="flex-grow px-3 sm:py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white p-2 sm:px-4 sm:py-2 rounded-r-lg hover:bg-blue-600 cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* list container */}
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex my-4 items-center p-3 rounded-lg bg-slate-100 border"
            >
              {/* checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id
                        ? { ...t, completed: !t.completed }
                        : t
                    )
                  );
                }}
                className="mr-2 h-5 w-5 text-blue-600"
              />

              {/* text */}
              <span
                className={`flex-1 break-all tracking-wider ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>

              {/* delete */}
              <button
                className="ml-2 cursor-pointer border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  setTodos(todos.filter((t) => t.id !== todo.id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
