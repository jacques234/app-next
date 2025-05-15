import { FilterItem } from "./FilterItem";
import { Option } from "@/types";

interface Props {
  options: Option[];
  selected:string | null;
  onSelect: (id:string) => void;
}

export const FilterList = ({ options,selected, onSelect }: Props) => {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <FilterItem
          key={option.id}
          id={option.id}
          text={option.text}
          onChange={() => onSelect(option.id)}
          checked={selected === option.id}
        />
      ))}
    </div>
  );
};
