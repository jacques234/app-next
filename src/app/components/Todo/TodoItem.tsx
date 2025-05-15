import { Todo } from "@/types";
import { Pencil, Trash } from "lucide-react";
interface Props {
  todo: Todo;
  isEditing:boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit:(id:number, newText:string) => void;
}

import React from "react";

export const TodoItem = ({ todo, onToggle, onDelete,isEditing }: Props) => {
  return (
    <li className="flex items-center justify-between py-2 border-b">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        {/* {
          isEditing ? (

          )
        } */}
        <span className={todo.done ? "line-through text-gray-500" : ""}>
          {todo.text}
        </span>
      </label>
      <div className="flex gap-1">
        <button className="cursor-pointer">
          <Pencil size={20} />
        </button>
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
