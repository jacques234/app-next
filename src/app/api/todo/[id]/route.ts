import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { findTodoOr404 } from "@/todos/helpers/utils";
import { Todo } from "@/types";


interface Segments {
  id: string;
}
export type paramsType = Promise<Segments>;
export async function GET(
  _req: Request,
  props: { params: paramsType }
) {
  const todo = await findTodoOr404(props);
  if ("status" in todo) return todo;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const task = await prisma.todo.findUnique({
    where: { id: todo.id },
  });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!task || task.userId !== user?.id) {
    return NextResponse.json(
      { error: "No autorizado o no encontrado" },
      { status: 403 }
    );
  }

  return NextResponse.json(task);
}

export async function PATCH(
  req: Request,
  props: { params: paramsType }
) {
  const todo = await findTodoOr404(props);
  if ("status" in todo) return todo;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { name, done } = await req.json();

  const updated = await prisma.todo.update({
    where: { id: todo.id },
    data: { name, done },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  props: { params: paramsType }
) {
  const todo = await findTodoOr404(props);
  if ("status" in todo) return todo;
  try {
    await prisma.todo.delete({
      where: { id:todo.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
