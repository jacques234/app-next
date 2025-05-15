interface Props {
  id: string;
  text: string;
  checked: boolean;
  onChange: () => void;
}
export const FilterItem = ({ id, text, checked, onChange }: Props) => {
  return (
    <label className="inline-flex items-center gap-3">
      <input
        type="checkbox"
        className="size-5 rounded border-gray-300 shadow-sm"
        id={id}
        checked={checked}
        onChange={onChange}
      />

      <span className="font-medium text-gray-700"> {text} </span>
    </label>
  );
};
