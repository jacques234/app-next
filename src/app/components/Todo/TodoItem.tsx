"use client";
import { Todo } from "@/types";
import { Check, Pencil, Trash } from "lucide-react";
import { useState } from "react";
interface Props {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { name?: string; done?: boolean }) => void;
}

const updateTodo = async (
  id: string,
  updates: { name?: string; done?: boolean }
) => {
  try {
    const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al actualizar la tarea");
    }

    const updated = await res.json();
    return updated;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteTodo = async (id: string) => {
  try {
    const res = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al eliminar la tarea");
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const TodoItem = ({ todo, onDelete, onUpdate }: Props) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(todo.name);
  const handleEdit = () => {
    setEditable(!editable);
  };
  const handleUpdate = async () => {
    const updated = await updateTodo(todo.id, { name });
    if (updated) {
      onUpdate(todo.id, { name });
      handleEdit();
    }
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };
  return (
    <li className="flex items-center justify-between py-2 border-b">
      <label className="flex items-center gap-2">
        {editable ? (
          <input
            type="text"
            value={name}
            onInput={(event) => setName(event?.currentTarget.value)}
          />
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => updateTodo(todo.id, { done: !todo.done })}
            />
            <span className={todo.done ? "line-through text-gray-500" : ""}>
              {todo.name}
            </span>
          </>
        )}
      </label>
      <div className="flex gap-1">
        {!todo.done &&
          (editable ? (
            <button className="cursor-pointer" onClick={handleUpdate}>
              <Check size={20} />
            </button>
          ) : (
            <button className="cursor-pointer" onClick={handleEdit}>
              <Pencil size={20} />
            </button>
          ))}

        <button
          onClick={handleDelete}
          className="bg-red-500 rounded p-1 cursor-pointer"
        >
          <Trash size={20} color="#ffffff" />
        </button>
      </div>
    </li>
  );
};
