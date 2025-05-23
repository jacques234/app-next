"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Gasto } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getGastosUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return [];
    }
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: { gastos: {
        include:{
            usuarios:true
        }
      } },
    });
    if (!user) {
      return [];
    }
    return user.gastos || [];
  } catch {
    return [];
  }
};

export const addGasto = async (gasto: Gasto) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { message: "Usuario no autenticado" };
    }

    // Agregar siempre al usuario actual
    const usuariosConectados = [
      { id: user.id },
      ...(gasto.usuarios?.filter((u) => u.id !== user.id) || []),
    ];

    const newGasto = await prisma.gasto.create({
      data: {
        nombre: gasto.nombre,
        monto: gasto.monto,
        categoria: gasto.categoria,
        descripcion: gasto.descripcion,
        fecha: new Date(gasto.fecha),
        usuarios: {
          connect: usuariosConectados,
        },
      },
    });

    revalidatePath("/dashboard/gastosSSR");

    return {
      ...newGasto,
      monto: newGasto.monto.toNumber(),
    };
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    return { message: "Error al crear gasto" };
  }
};
export const deleteGasto = async (id: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        message: "Usuario no encontrado",
      };
    }

    await prisma.gasto.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/gastosSSR");
  } catch {
    return {
      message: "Error al eliminar el gasto",
    };
  }
};
