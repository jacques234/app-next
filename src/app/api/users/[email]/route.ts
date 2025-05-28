import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface Segments {
  email: string;
}
export type paramsType = Promise<Segments>;
export async function GET(_req: Request, props: { params: paramsType }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { email } = await props.params;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return NextResponse.json(user);
}
