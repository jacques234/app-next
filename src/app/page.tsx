import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-10">
      <Link href="/gastos/nuevo" scroll={false}>
        Abrir modal desde Home
      </Link>
    </main>
  );
}
