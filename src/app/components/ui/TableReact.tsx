"use client";

import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";

type TableReactProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
};

// 👇 Esta es la forma correcta de declarar una función flecha genérica
export const TableReact = <T,>({
  data,
  columns,
  title,
}: TableReactProps<T>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-4">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};
