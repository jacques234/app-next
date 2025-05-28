"use client";
import { DollarSign, Home, ListTodo, LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import Image from "next/image";
import Link from "next/link";
import { useSession,signOut } from "next-auth/react";

const options = [
  {
    option: "Home",
    icon: <Home size={20} />,
    path: "/dashboard/home",
  },
  {
    option: "To-do",
    icon: <ListTodo size={20} />,
    path: "/dashboard/todos",
  },
  {
    option: "Gestor de gastos",
    icon: <DollarSign size={20} />,
    path: "/dashboard/gastos",
  },
  {
    option: "Gestor de gastos SSR",
    icon: <DollarSign size={20} />,
    path: "/dashboard/gastosSSR",
  },
];

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user;
  const imgAvatar = user
    ? user.image
    : "https://flowbite.com/docs/images/logo.svg";
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open sidebar</span>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-11/12 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link href="/" className="flex items-center ps-2.5 mb-5">
            <Image
              src={imgAvatar!}
              className="me-3 rounded-full"
              alt="Flowbite Logo"
              width={40}
              height={40}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {user?.name ?? "App"}
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {options.map((option) => (
              <SidebarItem
                key={option.option}
                option={option.option}
                icon={option.icon}
                path={option.path}
              />
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center h-1/12 gap-3 mx-4 text-white"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </aside>
    </>
  );
};
