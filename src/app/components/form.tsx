import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

// Define the Todo interface
interface Todo {
  id: number;
  task: string;
  status: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (newTask.trim() === "") return;
    const newTodo: Todo = {
      id: todos.length + 1,
      task: newTask,
      status: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  const checkedTodoStatus = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w mx-auto p-4">
      <form onSubmit={addTodo} className="space-y-4">
        <div>
          <label
            htmlFor="task_input"
            className="block text-lg font-medium text-gray-700"
          ></label>
          <input
            type="text"
            id="task_input"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your task"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>
      </form>
      <div>
        <ul className="space-y-2 mt-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => checkedTodoStatus(todo.id)}
                  className="mr-4 cursor-pointer"
                />
                <span
                  className={todo.status ? "line-through text-gray-500" : ""}
                >
                  {todo.task}
                </span>
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="ml-auto">
                <Trash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
