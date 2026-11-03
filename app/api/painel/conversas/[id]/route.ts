import type { NextRequest } from "next/server";
import { getUser } from "@/lib/session";
import { sqlOne } from "@/lib/db";
import { listarMensagens, marcarComoLida } from "@/lib/atendimento";

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await getUser())) return Response.json({ erro: "não autenticado" }, { status: 401 });

  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id) || id <= 0) return Response.json({ erro: "id inválido" }, { status: 400 });

  const conversa = await sqlOne(
    `SELECT cv.id, cv.status, cv.ultima_entrada_em,
       (cv.ultima_entrada_em IS NOT NULL AND cv.ultima_entrada_em < now() - interval '24 hours') AS fora_da_janela,
       ct.id AS contato_id, ct.nome, ct.telefone, ct.notas,
       u.nome AS atendente
     FROM conversas cv JOIN contatos ct ON ct.id = cv.contato_id
     LEFT JOIN usuarios u ON u.id = cv.atendente_id WHERE cv.id = $1`,
    [id],
  );
  if (!conversa) return Response.json({ erro: "não encontrada" }, { status: 404 });

  const depoisDe = Number(request.nextUrl.searchParams.get("depois") ?? 0) || 0;
  const mensagens = await listarMensagens(id, depoisDe);
  if (mensagens.some((m) => m.direcao === "entrada")) await marcarComoLida(id);

  return Response.json({ conversa, mensagens });
}
