
import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "./auth";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return await prisma.user.findUnique({ where: { email: session.user.email } });
};
