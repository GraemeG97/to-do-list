"use client";

import { ListTodo } from "lucide-react";
import TodoList from "./components/form";

interface TodoTasks {
  id: number;
  task: string;
  status: boolean;
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold">
            Welcome to Graeme&#39;s To-Do-List
          </h1>
          <ListTodo className="w-8 h-8 text-gray-700" />
        </div>
        <TodoList />
      </div>
    </>
  );
}
