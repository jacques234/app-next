"use server";
import { authOptions } from "@/lib/auth";
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
      include: {
        gastos: {
          include: {
            usuarios: true,
          },
        },
      },
    });
    if (!user) {
      return [];
    }
    return user.gastos || [];
  } catch {
    return [];
  }
};
export const updateGasto = async (
  id: string,
  gasto: Gasto,
  compartido: boolean
) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { message: "Usuario no autenticado" };
    }

    const otrosUsuarios = gasto.usuarios?.filter((u) =>
      compartido ? u.id !== user.id : u.id === user.id
    ) || [];

    const usuariosConectados = [
      { id: user.id },
      ...otrosUsuarios.map((u) => ({ id: u.id })),
    ];
    const updatedGasto = await prisma.gasto.update({
      where: { id },
      data: {
        nombre: gasto.nombre,
        monto: gasto.monto,
        categoria: gasto.categoria,
        descripcion: gasto.descripcion,
        usuarios: {
          set: [], // limpia las relaciones actuales (si deseas reiniciar)
          connect: usuariosConectados,
        },
      },
    });

    revalidatePath("/dashboard/gastosSSR");

    return {
      ...updatedGasto,
      monto: updatedGasto.monto.toNumber(), // si es Decimal
    };
  } catch (error) {
    console.error("Error actualizando gasto:", error);
    return { message: "Error al actualizar gasto" };
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
