import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'To-do App',
  description: 'App para gestionar tus tareas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}
