"use client";

import { Todo } from "@/types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onUpdate: (id: string, updates: { name?: string; done?: boolean }) => void;
  onDelete:(id: string) => void;
}

export const TodoList = ({
  todos,
  onUpdate,
  onDelete
}: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
