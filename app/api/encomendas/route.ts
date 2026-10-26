import * as z from "zod";
import { sql, sqlOne } from "@/lib/db";
import { normalizarTelefone, obterContato } from "@/lib/atendimento";

// Recebe as encomendas dos configuradores do site (tortas, cestas e eventos)
// e grava no painel. Chamado com navigator.sendBeacon ao clicar em "Enviar
// encomenda pelo WhatsApp" — o WhatsApp continua abrindo normalmente.

const Encomenda = z.object({
  tipo: z.enum(["torta", "cesta", "evento"]),
  nome: z.string().trim().min(1).max(120),
  telefone: z.string().trim().min(8).max(30),
  itens: z
    .array(z.object({ label: z.string().max(60), value: z.string().max(2000) }))
    .min(1)
    .max(30),
});

// Limite simples por IP para evitar abuso (por instância do servidor).
const tentativas = new Map<string, number[]>();
function limitado(ip: string) {
  const agora = Date.now();
  const recentes = (tentativas.get(ip) ?? []).filter((t) => agora - t < 10 * 60 * 1000);
  recentes.push(agora);
  tentativas.set(ip, recentes);
  return recentes.length > 10;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limitado(ip)) return Response.json({ erro: "muitas tentativas" }, { status: 429 });

  const corpo = await request.text();
  if (corpo.length > 20_000) return Response.json({ erro: "muito grande" }, { status: 413 });

  let dados;
  try {
    dados = Encomenda.parse(JSON.parse(corpo));
  } catch {
    return Response.json({ erro: "dados inválidos" }, { status: 400 });
  }

  const telefone = normalizarTelefone(dados.telefone);
  if (telefone.length < 12 || telefone.length > 13) {
    return Response.json({ erro: "telefone inválido" }, { status: 400 });
  }

  // Evita duplicar se o cliente clicar duas vezes no botão.
  const repetida = await sqlOne(
    `SELECT id FROM encomendas WHERE telefone = $1 AND tipo = $2 AND itens = $3::jsonb
     AND criado_em > now() - interval '30 minutes'`,
    [telefone, dados.tipo, JSON.stringify(dados.itens)],
  );
  if (repetida) return Response.json({ ok: true, repetida: true });

  const contato = await obterContato(telefone, dados.nome);
  const nova = await sqlOne<{ id: number }>(
    `INSERT INTO encomendas (tipo, contato_id, nome, telefone, itens) VALUES ($1, $2, $3, $4, $5::jsonb) RETURNING id`,
    [dados.tipo, contato.id, dados.nome, telefone, JSON.stringify(dados.itens)],
  );
  await sql("UPDATE contatos SET atualizado_em = now() WHERE id = $1", [contato.id]);

  return Response.json({ ok: true, id: nova?.id });
}
