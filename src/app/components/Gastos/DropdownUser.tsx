"use client";
import { useEffect, useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { OptionSelect } from "@/types/gastos/optionSelect";
import { X } from "lucide-react";
interface Props {
  users: OptionSelect[];
  onSelect: (selectUser: OptionSelect[]) => void;
  selectUsers?: OptionSelect[];
}

export const DropdownUser = ({ users, onSelect, selectUsers }: Props) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [selectedUser, setSelectedUser] = useState<OptionSelect[]>([]);

  useEffect(() => {
    if (selectUsers) {
      setSelectedUser(selectUsers);
    }
  }, []);

  const handleSelect = (optionSelect: OptionSelect) => {
    const exists = selectedUser.some((u) => u.id === optionSelect.id);

    let newArray: OptionSelect[];
    if (exists) {
      newArray = selectedUser.filter((u) => u.id !== optionSelect.id);
    } else {
      const user = users.find((u) => u.id === optionSelect.id);
      if (!user) return;
      newArray = [...selectedUser, user];
    }

    setSelectedUser(newArray);
    onSelect(newArray);
    setOpenDrop(false);
  };

  const onDeleteSelect = (user: OptionSelect) => {
    const newArray = selectedUser.filter((u) => u.id !== user.id);
    setSelectedUser(newArray);
    onSelect(newArray);
  };

  return (
    <>
      <div>
        {selectedUser.map((user) => (
          <span
            key={user.id}
            className="inline-flex items-center gap-1 bg-gray-300 rounded text-[10px] px-2 py-0.5 m-1.5"
          >
            {user.name}
            <X
              className="cursor-pointer"
              size={10}
              onClick={() => onDeleteSelect(user)}
            />
          </span>
        ))}
      </div>

      <Dropdown
        open={openDrop}
        selectOption={""}
        opciones={users}
        onClick={() => setOpenDrop(!openDrop)}
        onSelected={(val) => handleSelect(val)}
      />
    </>
  );
};
