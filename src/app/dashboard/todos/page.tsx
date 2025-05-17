"use client";
import { Option, Todo } from "@/types";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { FilterList, TodoForm, TodoList } from "@/app/components";
const options: Option[] = [
  { id: "1", text: "Todos", checked: true },
  { id: "2", text: "Completadas", checked: false },
  { id: "3", text: "Pendientes", checked: false },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const selectedDefault = options.find((x) => x.checked);
    if (selectedDefault) {
      setSelected(selectedDefault.id);
    }
  }, [options]);
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSelected = (id: string) => {
    setSelected(id === selected ? null : id);
  };
  const existTodosDone = todos.some((todo) => todo.done);
  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, done: false, editable: false },
    ]);
  };
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handlerEdit = (id: string) => {
    const todoEdit = todos.find((t) => t.id === id);
    if (todoEdit) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, editable: !todo.editable } : todo
        )
      );
    }
  };
  const handlerInput = (id:string,value:string) =>{
    const todoEdit = todos.find((t) => t.id === id);
    if (todoEdit) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: value } : todo
        )
      );
    }
  }

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
        onEdit={handlerEdit}
        onInput={handlerInput}
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
