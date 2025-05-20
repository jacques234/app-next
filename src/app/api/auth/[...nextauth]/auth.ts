// app/api/auth/[...nextauth]/auth.ts
import NextAuth from "next-auth";
import { authOptions } from "./route";

// Exporta utilidades de NextAuth v5 para Server Actions
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
