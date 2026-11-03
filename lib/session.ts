import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { sqlOne } from "./db";

// Sessão do painel: cookie httpOnly com um JWT assinado (HS256).

export const SESSION_COOKIE = "bendita_painel";
const DURACAO_MS = 7 * 24 * 60 * 60 * 1000;

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET não configurada.");
    }
    return new TextEncoder().encode("dev-somente-local-nao-usar-em-producao");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + DURACAO_MS);
  const token = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(secretKey());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function readSessionUserId(token: string | undefined): Promise<number | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return typeof payload.uid === "number" ? payload.uid : null;
  } catch {
    return null;
  }
}

export type Usuario = { id: number; nome: string; email: string };

// Usuário logado (ou null). Confere no banco, não só no cookie.
export const getUser = cache(async (): Promise<Usuario | null> => {
  const uid = await readSessionUserId((await cookies()).get(SESSION_COOKIE)?.value);
  if (!uid) return null;
  return (await sqlOne<Usuario>("SELECT id, nome, email FROM usuarios WHERE id = $1", [uid])) ?? null;
});

// Para páginas e ações do painel: redireciona ao login se não houver sessão.
export async function requireUser(): Promise<Usuario> {
  const user = await getUser();
  if (!user) redirect("/painel/login");
  return user;
}
