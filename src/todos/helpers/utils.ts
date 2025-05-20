
import { paramsType } from "@/app/api/todo/[id]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function findTodoOr404(props: { params: paramsType }) {
  const { id } = await props.params;

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json({ message: "No encontrado" }, { status: 404 });
  }

  return todo;
}