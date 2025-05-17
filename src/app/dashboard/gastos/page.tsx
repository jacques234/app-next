"use client";

import { Dropdown, Table } from "@/app/components";
import Modal from "@/app/components/ui/Modal";
import { Gasto } from "@/types";
import { OptionSelect } from "@/types/gastos/optionSelect";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const gastoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio."),
  monto: z
    .number({
      required_error: "El monto es obligatorio",
      invalid_type_error: "Debe ser un numero",
    })
    .positive("El monto debe de ser mayor a cero"),
  categoria: z.string().min(1, "La categoria es obligatoria"),
  fecha: z.string().min(1, "La fecha es requerida"),
  descripcion: z.string().min(1, "La descripcion es requerida"),
});

export default function GastosPage() {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  const [categoria, setCategoria] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [openSelect, setOpenSelect] = useState(false);
  const [errors, setErrors] = useState<{
    nombre?: string;
    monto?: string;
    categoria?: string;
    descripcion?: string;
    fecha?: string;
  }>({});

  const [gastos, setGastos] = useState<Gasto[]>([]);

  const optionSelect: OptionSelect[] = [
    {
      id: crypto.randomUUID(),
      value: "Servicios",
    },
    {
      id: crypto.randomUUID(),
      value: "Vivienda",
    },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gasto: Gasto = {
      id: crypto.randomUUID(),
      nombre: nombre,
      monto: monto,
      categoria: categoria,
      fecha: new Date().toISOString().split("T")[0],
      descripcion: descripcion,
    };

    const parsed = gastoSchema.safeParse({
      ...gasto,
    });

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const err of parsed.error.errors) {
        fieldErrors[err.path[0] as keyof typeof errors] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    console.log("Datos válidos:", parsed.data);
    setShowModal(false);
    setNombre("");
    setMonto(0);
    setCategoria("");
    setDescripcion("");
    setErrors({});
    setGastos([
      ...gastos,
      {...gasto}
    ])
  };
  const handleOpenSelect = () => {
    setOpenSelect(!openSelect);
  };
  const handleSelectItem = (item: string) => {
    setCategoria(item);
    setOpenSelect(false);
  };

  const titles = ["Nombre","Categoria","Fecha","Monto"]
  return (
    <>
      <div className="mx-5 mt-3 flex justify-between">
        <h1 className="text-3xl font-bold">Control de gastos</h1>
        <button
          type="button"
          className="flex gap-1 items-center bg-blue-500 p-3 rounded-2xl text-white"
          onClick={() => setShowModal(true)}
        >
          <PlusCircle size={20} />
          Agregar tarea
        </button>
      </div>

      <Table titles={titles} data={gastos}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Nuevo gasto</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full border p-2 rounded"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="number"
                placeholder="Monto"
                className="w-full border p-2 rounded"
                value={monto}
                onChange={(e) => setMonto(+e.target.value)}
              />
              <Dropdown
                opciones={optionSelect}
                selectOption={categoria}
                onClick={handleOpenSelect}
                open={openSelect}
                onSelected={handleSelectItem}
              />
              <input
                type="text"
                placeholder="Descripcion"
                className="w-full border p-2 rounded"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
