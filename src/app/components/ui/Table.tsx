import { Gasto } from "@/types";


interface Props {
  titles: string[];
  data: Gasto[];
}

export const Table = ({ titles, data }: Props) => {
  return (
    <div className="relative overflow-x-auto mx-2 my-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {titles.map((title) => (
              <th key={title} scope="col" className="px-6 py-3">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="bg-white border-b border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {d.nombre}
              </th>
              <td className="px-6 py-4">{d.categoria}</td>
              <td className="px-6 py-4">{d.fecha}</td>
              <td className="px-6 py-4">${d.monto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
