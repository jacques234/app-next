// app/api/auth/[...nextauth]/auth.ts
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Exporta utilidades de NextAuth v5 para Server Actions
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
