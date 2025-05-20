"use client";

import { Todo } from "@/types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { name?: string; done?: boolean }) => void;
}

export const TodoList = ({
  todos,
  onDelete,
  onUpdate,
}: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};
