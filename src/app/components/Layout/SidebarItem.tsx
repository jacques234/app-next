import Link from "next/link";
import React from "react";

interface Props {
    option:string;
    icon: React.JSX.Element;
    path: string
}

export const SidebarItem = ({option,icon,path}:Props) => {
  return (
    <li>
      <Link
        href={path}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ms-3">{option}</span>
      </Link>
    </li>
  );
};
