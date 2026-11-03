"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { sql, sqlOne } from "@/lib/db";
import { createSession, deleteSession, requireUser } from "@/lib/session";
import {
  assumirConversa,
  encerrarConversa,
  responderComoAtendente,
} from "@/lib/atendimento";
import { STATUS_ENCOMENDA } from "@/lib/encomendas";

// ——— login ———

export type LoginState = { erro?: string } | undefined;

let hashFalso: Promise<string> | undefined;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const senha = String(formData.get("senha") ?? "");
  if (!email || !senha) return { erro: "Preencha e-mail e senha." };

  const usuario = await sqlOne<{ id: number; senha_hash: string }>(
    "SELECT id, senha_hash FROM usuarios WHERE email = $1",
    [email],
  );
  // Compara mesmo sem usuário (com um hash qualquer) para não revelar quais e-mails existem.
  hashFalso ??= bcrypt.hash("senha-inexistente", 12);
  const ok = await bcrypt.compare(senha, usuario?.senha_hash ?? (await hashFalso));
  if (!usuario || !ok) return { erro: "E-mail ou senha incorretos." };

  await createSession(usuario.id);
  redirect("/painel");
}

export async function logout() {
  await deleteSession();
  redirect("/painel/login");
}

// ——— conversas ———

const idSchema = z.coerce.number().int().positive();

export async function enviarResposta(conversaId: number, texto: string) {
  const user = await requireUser();
  const id = idSchema.parse(conversaId);
  const corpo = z.string().trim().min(1).max(4000).parse(texto);
  const envio = await responderComoAtendente(id, user.id, corpo);
  return { status: envio.status, erro: envio.erro };
}

export async function assumir(conversaId: number) {
  const user = await requireUser();
  await assumirConversa(idSchema.parse(conversaId), user.id);
}

export async function encerrar(conversaId: number) {
  await requireUser();
  await encerrarConversa(idSchema.parse(conversaId));
}

// ——— contatos e etiquetas ———

export async function salvarContato(formData: FormData) {
  await requireUser();
  const id = idSchema.parse(formData.get("id"));
  const nome = z.string().trim().max(120).parse(formData.get("nome") ?? "");
  const notas = z.string().max(4000).parse(formData.get("notas") ?? "");
  await sql("UPDATE contatos SET nome = $2, notas = $3, atualizado_em = now() WHERE id = $1", [
    id,
    nome || null,
    notas,
  ]);
  revalidatePath(`/painel/contatos/${id}`);
}

export async function adicionarEtiqueta(formData: FormData) {
  await requireUser();
  const contatoId = idSchema.parse(formData.get("contato_id"));
  const nome = z.string().trim().min(1).max(40).parse(formData.get("etiqueta"));
  const cor = z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .catch("#9C521B")
    .parse(formData.get("cor"));

  const etiqueta = await sqlOne<{ id: number }>(
    `INSERT INTO etiquetas (nome, cor) VALUES ($1, $2)
     ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome RETURNING id`,
    [nome, cor],
  );
  await sql(
    "INSERT INTO contato_etiquetas (contato_id, etiqueta_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [contatoId, etiqueta!.id],
  );
  revalidatePath(`/painel/contatos/${contatoId}`);
}

export async function removerEtiqueta(formData: FormData) {
  await requireUser();
  const contatoId = idSchema.parse(formData.get("contato_id"));
  const etiquetaId = idSchema.parse(formData.get("etiqueta_id"));
  await sql("DELETE FROM contato_etiquetas WHERE contato_id = $1 AND etiqueta_id = $2", [contatoId, etiquetaId]);
  revalidatePath(`/painel/contatos/${contatoId}`);
}

// ——— encomendas ———

export async function mudarStatusEncomenda(formData: FormData) {
  await requireUser();
  const id = idSchema.parse(formData.get("id"));
  const status = z.enum(STATUS_ENCOMENDA).parse(formData.get("status"));
  await sql("UPDATE encomendas SET status = $2, atualizado_em = now() WHERE id = $1", [id, status]);
  revalidatePath("/painel/encomendas");
}
