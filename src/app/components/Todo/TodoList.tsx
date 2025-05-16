import { Todo } from "@/types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id:string) => void;
  onInput: (id:string,value:string) => void;
}

export const TodoList = ({ todos,onToggle, onDelete, onEdit,onInput }: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onInput={onInput}
            // isEditing={true}
          />
        ))}
    </ul>
  );
};
