import { getCurrentUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { OptionSelect } from "@/types/gastos/optionSelect";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" });
  }

  const usuarios: User[] = await prisma.user.findMany({
    where:{
        email:{
            not:user.email
        }
    }
  });

  const returnUsuarios: OptionSelect[] = usuarios.map((usuario) => ({
    id: usuario.id,
    name: usuario.name ?? "Sin nombre",
  }));

  return NextResponse.json(returnUsuarios);
}
