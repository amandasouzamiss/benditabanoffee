import "server-only";
import { sql, sqlOne } from "./db";
import { site } from "@/app/data/site";
import { enviarLista, enviarTexto, type OpcaoMenu, type ResultadoEnvio } from "./whatsapp";

// Regras do atendimento: contatos, conversas, mensagens e encomendas.

export type StatusConversa = "bot" | "aguardando" | "atendimento";

export type Conversa = {
  id: number;
  contato_id: number;
  status: StatusConversa;
  atendente_id: number | null;
  nao_lidas: number;
  ultima_mensagem_em: string;
  ultima_entrada_em: string | null;
};

// Telefone só com dígitos e DDI 55 (ex.: 5554999998888).
export function normalizarTelefone(valor: string): string {
  let digitos = valor.replace(/\D/g, "");
  if (digitos.startsWith("0")) digitos = digitos.replace(/^0+/, "");
  if (digitos.length === 10 || digitos.length === 11) digitos = `55${digitos}`;
  return digitos;
}

export async function obterContato(telefone: string, nome?: string) {
  const tel = normalizarTelefone(telefone);
  const contato = await sqlOne<{ id: number; nome: string | null }>(
    `INSERT INTO contatos (telefone, nome) VALUES ($1, $2)
     ON CONFLICT (telefone) DO UPDATE SET nome = COALESCE(contatos.nome, EXCLUDED.nome)
     RETURNING id, nome`,
    [tel, nome?.trim() || null],
  );
  return { id: contato!.id, telefone: tel, nome: contato!.nome };
}

export async function obterConversa(contatoId: number): Promise<Conversa> {
  return (await sqlOne<Conversa>(
    `INSERT INTO conversas (contato_id) VALUES ($1)
     ON CONFLICT (contato_id) DO UPDATE SET contato_id = EXCLUDED.contato_id
     RETURNING *`,
    [contatoId],
  ))!;
}

async function registrarSaida(
  conversaId: number,
  autor: "bot" | "atendente",
  texto: string,
  envio: ResultadoEnvio,
  usuarioId: number | null = null,
) {
  await sql(
    `INSERT INTO mensagens (conversa_id, direcao, autor, usuario_id, texto, wa_id, status)
     VALUES ($1, 'saida', $2, $3, $4, $5, $6)`,
    [conversaId, autor, usuarioId, envio.erro ? `${texto}\n\n⚠️ Não enviada: ${envio.erro}` : texto, envio.waId, envio.status],
  );
  await sql("UPDATE conversas SET ultima_mensagem_em = now() WHERE id = $1", [conversaId]);
}

// ——— robô ———

const SITE = "https://www.benditabanoffee.com.br";

export const MENU: OpcaoMenu[] = [
  { id: "cardapio", titulo: "Cardápio e pedidos", descricao: "Peça online para retirar ou receber" },
  { id: "horarios", titulo: "Horários e endereço", descricao: "Quando e onde estamos" },
  { id: "encomendas", titulo: "Encomendas", descricao: "Tortas inteiras e cestas" },
  { id: "eventos", titulo: "Eventos", descricao: "Festas no nosso espaço ou no seu" },
  { id: "atendente", titulo: "Falar com a equipe", descricao: "Uma pessoa vai te responder" },
];

const RESPOSTAS: Record<string, string> = {
  cardapio: `🧁 Nosso cardápio completo está aqui — é só escolher e pedir:\n${site.ordersUrl}\n\nToda segunda tem frete grátis nos pedidos acima de R$ 40,00!`,
  horarios: `🕐 Horários\n${site.hours.join("\n")}\n\n📍 Travessa Ângelo Lorencet, 27 · Centro · Nova Prata\n${site.mapsUrl}`,
  encomendas: `🎂 Encomende pelo nosso site, é rapidinho:\n\nTortas inteiras (3 dias de antecedência):\n${SITE}/tortas/encomendar\n\nCestas para presentear:\n${SITE}/cestas/encomendar`,
  eventos: `🎉 Fazemos eventos no nosso espaço ou levamos tudo até a sua festa.\nPeça seu orçamento:\n${SITE}/eventos/encomendar`,
};

const SAUDACAO = "Olá! Que bom ter você por aqui 💛\nSou o assistente da Bendita Banoffee. Como posso te ajudar?";
const RODAPE = "\n\nSe precisar de mais alguma coisa, é só mandar *menu*.";

function opcaoPorTexto(texto: string): string | undefined {
  const t = texto.trim().toLowerCase();
  const numero = Number.parseInt(t, 10);
  if (numero >= 1 && numero <= MENU.length && /^\d+$/.test(t)) return MENU[numero - 1].id;
  if (/atendente|pessoa|humano|equipe/.test(t)) return "atendente";
  return undefined;
}

async function enviarMenu(conversaId: number, telefone: string) {
  const textoLista = `${SAUDACAO}\n\n${MENU.map((o, i) => `${i + 1}. ${o.titulo}`).join("\n")}`;
  const envio = await enviarLista(telefone, SAUDACAO, "Ver opções", MENU);
  await registrarSaida(conversaId, "bot", textoLista, envio);
}

async function responderBot(conversa: Conversa, telefone: string, texto: string, opcaoId?: string) {
  const opcao = opcaoId ?? opcaoPorTexto(texto);

  if (opcao === "atendente") {
    await sql("UPDATE conversas SET status = 'aguardando' WHERE id = $1", [conversa.id]);
    const resposta =
      "Já chamei alguém da nossa equipe 💛 Em instantes você será atendido por aqui.\n\nNosso horário: seg, qua, qui e sex das 13h30 às 19h30; sáb e dom das 14h às 20h. Fora desse horário, respondemos assim que abrirmos.";
    await registrarSaida(conversa.id, "bot", resposta, await enviarTexto(telefone, resposta));
    return;
  }

  if (opcao && RESPOSTAS[opcao]) {
    const resposta = RESPOSTAS[opcao] + RODAPE;
    await registrarSaida(conversa.id, "bot", resposta, await enviarTexto(telefone, resposta));
    return;
  }

  await enviarMenu(conversa.id, telefone);
}

// Entrada de uma mensagem do cliente (chamado pelo webhook).
export async function receberMensagem(msg: {
  waId: string;
  de: string;
  nome?: string;
  texto: string;
  opcaoId?: string;
}) {
  const contato = await obterContato(msg.de, msg.nome);
  const conversa = await obterConversa(contato.id);

  const inserida = await sqlOne<{ id: number }>(
    `INSERT INTO mensagens (conversa_id, direcao, autor, texto, wa_id, status)
     VALUES ($1, 'entrada', 'cliente', $2, $3, 'recebida')
     ON CONFLICT (wa_id) DO NOTHING RETURNING id`,
    [conversa.id, msg.texto, msg.waId],
  );
  if (!inserida) return; // a Meta reenviou a mesma mensagem

  await sql(
    `UPDATE conversas SET ultima_mensagem_em = now(), ultima_entrada_em = now(),
       nao_lidas = nao_lidas + 1 WHERE id = $1`,
    [conversa.id],
  );

  // "menu" sempre devolve a conversa ao robô, mesmo durante o atendimento.
  if (/^\s*menu\s*$/i.test(msg.texto) && conversa.status !== "bot") {
    await sql("UPDATE conversas SET status = 'bot', atendente_id = NULL WHERE id = $1", [conversa.id]);
    conversa.status = "bot";
  }

  if (conversa.status === "bot") {
    await responderBot(conversa, contato.telefone, msg.texto, msg.opcaoId);
  }
}

export async function atualizarStatusMensagem(waId: string, status: string) {
  await sql("UPDATE mensagens SET status = $2 WHERE wa_id = $1 AND direcao = 'saida'", [waId, status]);
}

// ——— ações da equipe ———

export async function responderComoAtendente(conversaId: number, usuarioId: number, texto: string) {
  const alvo = await sqlOne<{ telefone: string; ultima_entrada_em: string | null }>(
    `SELECT ct.telefone, cv.ultima_entrada_em FROM conversas cv
     JOIN contatos ct ON ct.id = cv.contato_id WHERE cv.id = $1`,
    [conversaId],
  );
  if (!alvo) throw new Error("Conversa não encontrada.");

  // A Meta só permite mensagem livre até 24h depois da última mensagem do cliente.
  const dentroDaJanela =
    alvo.ultima_entrada_em && Date.now() - new Date(alvo.ultima_entrada_em).getTime() < 24 * 60 * 60 * 1000;
  const envio: ResultadoEnvio = dentroDaJanela
    ? await enviarTexto(alvo.telefone, texto)
    : { waId: null, status: "falhou", erro: "passaram mais de 24h desde a última mensagem do cliente" };

  await registrarSaida(conversaId, "atendente", texto, envio, usuarioId);
  await sql(
    "UPDATE conversas SET status = 'atendimento', atendente_id = $2, nao_lidas = 0 WHERE id = $1",
    [conversaId, usuarioId],
  );
  return envio;
}

export async function assumirConversa(conversaId: number, usuarioId: number) {
  await sql("UPDATE conversas SET status = 'atendimento', atendente_id = $2 WHERE id = $1", [conversaId, usuarioId]);
}

export async function encerrarConversa(conversaId: number) {
  await sql("UPDATE conversas SET status = 'bot', atendente_id = NULL, nao_lidas = 0 WHERE id = $1", [conversaId]);
}

export async function marcarComoLida(conversaId: number) {
  await sql("UPDATE conversas SET nao_lidas = 0 WHERE id = $1", [conversaId]);
}

// ——— consultas do painel ———

export type ItemConversa = {
  id: number;
  status: StatusConversa;
  nao_lidas: number;
  ultima_mensagem_em: string;
  contato_id: number;
  nome: string | null;
  telefone: string;
  ultimo_texto: string | null;
  atendente: string | null;
  etiquetas: { nome: string; cor: string }[];
};

export async function listarConversas(filtro?: StatusConversa | "todas", busca?: string) {
  const params: unknown[] = [];
  const where: string[] = [];
  if (filtro && filtro !== "todas") {
    params.push(filtro);
    where.push(`cv.status = $${params.length}`);
  }
  if (busca?.trim()) {
    params.push(`%${busca.trim().toLowerCase()}%`);
    where.push(`(lower(coalesce(ct.nome, '')) LIKE $${params.length} OR ct.telefone LIKE $${params.length})`);
  }
  return sql<ItemConversa>(
    `SELECT cv.id, cv.status, cv.nao_lidas, cv.ultima_mensagem_em, ct.id AS contato_id, ct.nome, ct.telefone,
       (SELECT texto FROM mensagens m WHERE m.conversa_id = cv.id ORDER BY m.id DESC LIMIT 1) AS ultimo_texto,
       u.nome AS atendente,
       COALESCE((SELECT json_agg(json_build_object('nome', e.nome, 'cor', e.cor) ORDER BY e.nome)
         FROM contato_etiquetas ce JOIN etiquetas e ON e.id = ce.etiqueta_id WHERE ce.contato_id = ct.id), '[]') AS etiquetas
     FROM conversas cv
     JOIN contatos ct ON ct.id = cv.contato_id
     LEFT JOIN usuarios u ON u.id = cv.atendente_id
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     ORDER BY (cv.status = 'aguardando') DESC, cv.ultima_mensagem_em DESC
     LIMIT 200`,
    params,
  );
}

export type Mensagem = {
  id: number;
  direcao: "entrada" | "saida";
  autor: "cliente" | "bot" | "atendente";
  texto: string;
  status: string;
  criado_em: string;
  usuario: string | null;
};

export async function listarMensagens(conversaId: number, depoisDe = 0) {
  return sql<Mensagem>(
    `SELECT m.id, m.direcao, m.autor, m.texto, m.status, m.criado_em, u.nome AS usuario
     FROM mensagens m LEFT JOIN usuarios u ON u.id = m.usuario_id
     WHERE m.conversa_id = $1 AND m.id > $2 ORDER BY m.id ASC LIMIT 500`,
    [conversaId, depoisDe],
  );
}

export async function contarAguardando() {
  const r = await sqlOne<{ n: number }>(
    "SELECT count(*)::int AS n FROM conversas WHERE status = 'aguardando' OR nao_lidas > 0",
  );
  return r?.n ?? 0;
}
