import { GastosClient } from "@/app/components/Gastos/GastosClient";
import { getGastosUser } from "@/gastos/gastos-actions";
import { Gasto } from "@/types";

export const metadata = {
  title: "Gastos",
  description: "Gastos",
};
export default async function GastosPage() {
  const gastosPrisma = await getGastosUser();
  const gastos: Gasto[] = gastosPrisma.map((g) => ({
    id: g.id,
    nombre: g.nombre,
    monto: g.monto.toNumber(),
    categoria: g.categoria,
    descripcion: g.descripcion,
    fecha: g.fecha.toISOString().split("T")[0],
    compartido: g.usuarios.length > 1,
    usuarios: g.usuarios.map((u) => ({
      id: u.id,
      name: u.name ?? "Sin nombre",
    })),
  }));

  return (
    <>
      <GastosClient gastos={gastos} />
    </>
  );
}
