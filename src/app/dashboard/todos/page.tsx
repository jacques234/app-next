"use client";
import { Option, Todo } from "@/types";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { FilterList, TodoForm, TodoList } from "@/app/components";
import { ClipLoader, MoonLoader } from "react-spinners";
const options: Option[] = [
  { id: "1", text: "Todos", checked: true },
  { id: "2", text: "Completadas", checked: false },
  { id: "3", text: "Pendientes", checked: false },
];

const getAllTodos = async () => {
  const response = await fetch("/api/todo");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error obtener las tareas");
  }

  const todos: Todo[] = await response.json();

  return todos;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddTodo = async (text: string) => {
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear la tarea");
      }

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        const todos = await getAllTodos();
        console.log(todos);
        setTodos(todos);
        setLoading(false)
      } catch (err) {
        console.error("Error al cargar tareas:", err);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    setSelected(options.find((x) => x.checked)?.id || null);
  }, []);

  const handleSelected = (id: string) => {
    setSelected(id === selected ? null : id);
  };
  const handleUpdate = (
    id: string,
    updates: { name?: string; done?: boolean }
  ) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((t) => t.id != id));
  };

  const existTodosDone = todos.some((todo) => todo.done);
  const todosFiltrados = todos.filter((todo) => {
    if (selected === "2") return todo.done;
    if (selected === "3") return !todo.done;
    return true;
  });

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mi To-do App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <FilterList
        options={options}
        selected={selected}
        onSelect={handleSelected}
      />
      <div className="flex justify-center">
        <MoonLoader size={20} loading={loading} />
      </div>
      <TodoList
        todos={todosFiltrados}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
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
