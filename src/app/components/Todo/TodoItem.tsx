"use client";
import { Todo } from "@/types";
import { Check, Pencil, Trash } from "lucide-react";
interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onInput: (id:string,value:string) => void;
}

import React, { useState } from "react";

export const TodoItem = ({ todo, onToggle, onDelete, onEdit,onInput }: Props) => {
  const [text, setText] = useState<string>(todo.text);
  return (
    <li className="flex items-center justify-between py-2 border-b">
      <label className="flex items-center gap-2">
        {todo.editable ? (
          <input
            type="text"
            value={todo.text}
            onInput={(event) => onInput(todo.id,event?.currentTarget.value)}
          />
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo.id)}
            />
            <span className={todo.done ? "line-through text-gray-500" : ""}>
              {todo.text}
            </span>
          </>
        )}
      </label>
      <div className="flex gap-1">
        {todo.editable ? (
          <button className="cursor-pointer" onClick={() => onEdit(todo.id)}>
            <Check size={20} />
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => onEdit(todo.id)}>
            <Pencil size={20} />
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 rounded p-1 cursor-pointer"
        >
          <Trash size={20} color="#ffffff" />
        </button>
      </div>
    </li>
  );
};
