"use client";

import { Gasto } from "@/types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "../ui/Dropdown";
import { OptionSelect } from "@/types/gastos/optionSelect";
import { Categoria } from "@prisma/client";
import { addGasto, updateGasto } from "@/gastos/gastos-actions";
import { DropdownUser } from "./DropdownUser";
import { Switch } from "@mui/material";
import { useSession } from "next-auth/react";

interface PropsFormGasto {
  onSave: () => void;
  gasto?: Gasto;
}
export const FormGasto = ({ onSave, gasto }: PropsFormGasto) => {
  const { data: session } = useSession();
  const [openSelect, setOpenSelect] = useState(false);
  const [categorias, setCategorias] = useState<OptionSelect[]>([]);
  const [compartido, setcompartido] = useState(false);
  const [usuarios, setUsuarios] = useState<OptionSelect[]>([]);
  const [user, setUser] = useState<OptionSelect>();
  useEffect(() => {
    const fetchCategorias = async () => {
      const result = await fetch("/api/categorias");
      if (!result.ok) {
        return;
      }
      const data: Categoria[] = await result.json();
      const options: OptionSelect[] = data.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }));
      setCategorias(options);
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch(`/api/users/${session?.user?.email}`);
      if (!result.ok) {
        return;
      }
      const data: OptionSelect = await result.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  type Inputs = {
    nombre: string;
    monto: number;
    categoria: string;
    descripcion: string;
    usuarios?: OptionSelect[];
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: gasto ? gasto.nombre : "",
      monto: gasto ? gasto.monto : 0,
      categoria: gasto ? gasto.categoria : "",
      descripcion: gasto ? gasto.descripcion : "",
      usuarios: gasto ? gasto.usuarios : [],
    },
  });
  const label = { inputProps: { "aria-label": "Switch" } };

  const onClickCompartido = async () => {
    const nuevoValor = !compartido;
    setcompartido(nuevoValor);
    const response = await fetch("/api/users");
    if (!response.ok) return;
    const data: OptionSelect[] = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    if (gasto?.usuarios && gasto.usuarios.length > 1) {
      setcompartido(true);
      onClickCompartido();
    }
  }, []);

  const onSubmit = async (data: Inputs) => {
    const usuariosSeleccionados = data.usuarios || [];

    const nuevoGasto: Gasto = {
      id: crypto.randomUUID(),
      nombre: data.nombre,
      monto: data.monto,
      categoria: data.categoria,
      descripcion: data.descripcion,
      fecha: new Date().toISOString().split("T")[0],
      compartido: false,
      usuarios: usuariosSeleccionados,
    };
    if (gasto) {
      await updateGasto(gasto.id, nuevoGasto, compartido);
    } else {
      await addGasto(nuevoGasto);
    }
    reset();
    onSave();
  };

  const handleOpenSelect = () => {
    setOpenSelect(!openSelect);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center space-y-3"
    >
      <label>{user?.name}</label>
      <label>
        Nombre
        <input
          placeholder="nombre"
          className="w-full border p-2 rounded"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && (
          <span className="text-red-600">This field is required</span>
        )}
      </label>

      <label>
        Monto
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
      </label>

      <Controller
        name="categoria"
        control={control}
        rules={{ required: "La categoría es obligatoria" }}
        render={({ field }) => (
          <>
            <label>Categoria</label>
            <Dropdown
              opciones={categorias}
              selectOption={field.value}
              onClick={handleOpenSelect}
              open={openSelect}
              onSelected={(val) => {
                field.onChange(val.name);
                setOpenSelect(false);
              }}
            />
            {errors.categoria && (
              <span className="text-red-600">{errors.categoria.message}</span>
            )}
          </>
        )}
      />

      <label>
        Descripcion
        <input
          placeholder="descripcion"
          className="w-full border p-2 rounded"
          {...register("descripcion", { required: true })}
        />
        {errors.descripcion && (
          <span className="text-red-600">This field is required</span>
        )}
      </label>

      <label className="flex flex-col">
        Compartido
        <Switch
          {...label}
          checked={compartido}
          onChange={() => onClickCompartido()}
        />
      </label>

      {compartido && (
        <>
          <Controller
            name="usuarios"
            control={control}
            rules={{ required: "Seleccione almenos un usuario" }}
            render={({ field }) => (
              <>
                <label>Usuarios</label>
                <DropdownUser
                  users={usuarios}
                  onSelect={(usuarios) => {
                    field.onChange(usuarios);
                  }}
                  selectUsers={gasto?.usuarios}
                />
                {errors.usuarios && (
                  <span className="text-red-600">
                    {errors.usuarios.message}
                  </span>
                )}
              </>
            )}
          />
        </>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
};
