import type { NextRequest } from "next/server";
import { assinaturaValida, lerWebhook } from "@/lib/whatsapp";
import { atualizarStatusMensagem, receberMensagem } from "@/lib/atendimento";

// Webhook da WhatsApp Cloud API.
// URL para cadastrar na Meta: https://www.benditabanoffee.com.br/api/whatsapp/webhook

// Verificação feita pela Meta ao cadastrar o webhook.
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const tokenOk =
    process.env.WHATSAPP_VERIFY_TOKEN && p.get("hub.verify_token") === process.env.WHATSAPP_VERIFY_TOKEN;
  if (p.get("hub.mode") === "subscribe" && tokenOk) {
    return new Response(p.get("hub.challenge") ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

// Mensagens recebidas e atualizações de status (enviada, entregue, lida).
export async function POST(request: NextRequest) {
  const corpo = await request.text();
  if (!assinaturaValida(corpo, request.headers.get("x-hub-signature-256"))) {
    return new Response("Assinatura inválida", { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(corpo);
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const { mensagens, status } = lerWebhook(payload);
  try {
    for (const m of mensagens) await receberMensagem(m);
    for (const s of status) await atualizarStatusMensagem(s.waId, s.status);
  } catch (error) {
    // Responde 200 mesmo assim para a Meta não reenviar em loop; o erro fica no log.
    console.error("[whatsapp webhook]", error);
  }
  return new Response("ok", { status: 200 });
}
