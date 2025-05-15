"use client";
import { Option, Todo } from "@/types";
import { useEffect, useState } from "react";
import { FilterList, TodoForm, TodoList } from "./components";
import { Trash } from "lucide-react";
const options: Option[] = [
  { id: "1", text: "Todos", checked: true },
  { id: "2", text: "Completadas", checked: false },
  { id: "3", text: "Pendientes", checked: false },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const selectedDefault = options.find((x) => x.checked);
    if (selectedDefault) {
      setSelected(selectedDefault.id);
    }
  }, [options]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSelected = (id: string) => {
    setSelected(id === selected ? null : id);
  };
  const existTodosDone = todos.some((todo) => todo.done);
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const todosFiltrados = todos.filter((todo) => {
    if (selected === "2") return todo.done;
    if (selected === "3") return !todo.done;
    return true;
  });

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mi To-do App</h1>
      <TodoForm onAdd={addTodo} />
      <FilterList
        options={options}
        selected={selected}
        onSelect={handleSelected}
      />
      <TodoList
        todos={todosFiltrados}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
      {existTodosDone && (
        <div className="flex justify-end mt-2">
          <button
            className="flex items-center gap-2 bg-red-500 rounded text-white cursor-pointer px-3 py-1"
            onClick={() => setTodos(todos.filter((todo) => !todo.done))}
          >
            <Trash />
            Eliminar completadas
          </button>
        </div>
      )}
    </main>
  );
}
