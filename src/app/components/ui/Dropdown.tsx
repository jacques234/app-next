import { OptionSelect } from "@/types/gastos/optionSelect";

interface Props {
  open: boolean;
  opciones: OptionSelect[];
  onClick: () => void;
  onSelected: (item:string) => void;
}

export const Dropdown = ({ open, opciones, onClick, onSelected }: Props) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Seleccionar
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
        >
          <div className="py-1">
            {opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => onSelected(opcion.value)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {opcion.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
