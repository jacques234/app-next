"use client";

import { Dropdown } from "@/app/components";
import Modal from "@/app/components/ui/Modal";
import { TableReact } from "@/app/components/ui/TableReact";
import { Gasto } from "@/types";
import { OptionSelect } from "@/types/gastos/optionSelect";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Controller, useForm } from "react-hook-form";

export default function GastosPage() {
  const [showModal, setShowModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  // const { data: session, status } = useSession();
  // const router = useRouter();
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
  const handleOpenSelect = () => {
    setOpenSelect(!openSelect);
  };

  const columns: TableColumn<Gasto>[] = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Monto",
      selector: (row) => `$${row.monto.toFixed(2)}`,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
  ];
  type Inputs = {
    nombre: string;
    monto: number;
    categoria: string;
    descripcion: string;
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: "",
      monto: 0,
      categoria: "",
      descripcion: "",
    },
  });

  const onSubmit = (data: Inputs) => {
    const nuevoGasto: Gasto = {
      id: crypto.randomUUID(),
      ...data,
      fecha: new Date().toISOString().split("T")[0],
    };

    setGastos([...gastos, nuevoGasto]);
    reset();
    setShowModal(false);
  };
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/api/auth/signin"); // o alguna página como "/login"
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return <p className="p-5 text-gray-700">Verificando sesión...</p>;
  // }

  // if (status === "unauthenticated") {
  //   return null;
  // }

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

      <TableReact data={gastos} columns={columns} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Nuevo gasto</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center space-y-3"
            >
              <label htmlFor=""></label>
              <input
                placeholder="nombre"
                className="w-full border p-2 rounded"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <span className="text-red-600">This field is required</span>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Monto"
                className="w-full border p-2 rounded"
                {...register("monto", {
                  required: "El monto es obligatorio",
                  valueAsNumber: true,
                  min: {
                    value: 0.01,
                    message: "El monto debe ser mayor a cero",
                  },
                })}
              />
              {errors.monto && (
                <span className="text-red-600">{errors.monto.message}</span>
              )}
              <Controller
                name="categoria"
                control={control}
                rules={{ required: "La categoría es obligatoria" }}
                render={({ field }) => (
                  <>
                    <Dropdown
                      opciones={optionSelect}
                      selectOption={field.value}
                      onClick={handleOpenSelect}
                      open={openSelect}
                      onSelected={(val) => {
                        field.onChange(val);
                        setOpenSelect(false);
                      }}
                    />
                    {errors.categoria && (
                      <span className="text-red-600">
                        {errors.categoria.message}
                      </span>
                    )}
                  </>
                )}
              />
              <input
                placeholder="descripcion"
                className="w-full border p-2 rounded"
                {...register("descripcion", { required: true })}
              />
              {errors.descripcion && (
                <span className="text-red-600">This field is required</span>
              )}

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
