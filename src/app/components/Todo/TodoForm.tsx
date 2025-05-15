"use client";
import React, { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export const TodoForm = ({ onAdd }: Props) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAdd(input.trim());
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Agregar
      </button>
    </form>
  );
};
