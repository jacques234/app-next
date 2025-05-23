"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { FormGasto } from "./FormGasto";
import { TableReact } from "../ui/TableReact";
import { TableColumn } from "react-data-table-component";
import { Gasto } from "@/types";
import { deleteGasto } from "@/gastos/gastos-actions";
import { Tooltip } from "@mui/material";

interface Props {
  gastos: Gasto[];
}

export const GastosClient = ({ gastos }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [gasto, setGasto] = useState<Gasto>()

  const handleEdit = (id:string) => {
    setOpenModalEdit(true);
    const gasto = gastos.filter(g => g.id === id)[0];
    setGasto(gasto)
  }
  const columns: TableColumn<Gasto>[] = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      reorder: true,
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
    {
      name: "Compartido",
      cell: (row) => <>{row.compartido ? <span>Si</span> : <span>No</span>}</>,
    },
    {
      name: "Usuarios",
      cell: (row) =>
        row.compartido ? (
          <div className="flex flex-wrap gap-1">
            {row.usuarios.map((u) => (
              <span
                key={u.id}
                className="bg-blue-100 text-blue-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
              >
                {u.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 text-xs">
            {row.usuarios[0]?.name || "No compartido"}
          </span>
        ),
    },

    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Tooltip title="Eliminar gasto" placement="top-end">
            <Trash
              size={20}
              className="cursor-pointer"
              key={row.id}
              onClick={() => deleteGasto(row.id)}
            />
          </Tooltip>
          <Tooltip title="Editar gasto" placement="top-start">
            <Pencil
              size={20}
              key={row.id}
              className="cursor-pointer"
              onClick={() => {handleEdit(row.id)}}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between mt-2 mx-2">
        <h1 className="text-3xl font-bold">Control de gastos</h1>
        <button
          type="button"
          className="flex gap-1 items-center bg-blue-500 p-3 rounded-2xl text-white"
          onClick={() => setOpenModal(!openModal)}
        >
          <PlusCircle size={20} />
          Agregar tarea
        </button>
      </div>
      <TableReact data={gastos} columns={columns} title="Gastos" />
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Nuevo gasto</h2>
            <FormGasto onSave={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
      {openModalEdit && (
        <Modal onClose={() => setOpenModalEdit(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Editar gasto</h2>
            <FormGasto onSave={() => setOpenModalEdit(false)} gasto={gasto}/>
          </div>
        </Modal>
      )}
    </>
  );
};
