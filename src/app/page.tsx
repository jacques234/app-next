import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {


  redirect('/dashboard/home')
  // return (
  //   <main className="p-10">
  //     <Link href="/gastos/nuevo" scroll={false}>
  //       Abrir modal desde Home
  //     </Link>
  //   </main>
  // );
}
