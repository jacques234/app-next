import { Sidebar } from "./components";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "To-do App",
  description: "App para gestionar tus tareas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex bg-gray-100 min-h-screen text-gray-900">
        <Providers>
          <Sidebar />
          <div className="ml-64 lg:w-[100%] xl:w-[100%] 2xl:w-[100%] min-h-screen">
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
