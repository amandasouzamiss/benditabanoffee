import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Cliente da WhatsApp Cloud API (API oficial da Meta).
//
// Variáveis de ambiente:
//   WHATSAPP_TOKEN            token de acesso (usuário do sistema no Meta Business)
//   WHATSAPP_PHONE_NUMBER_ID  id do número no WhatsApp Manager
//   WHATSAPP_APP_SECRET       segredo do app (valida a assinatura do webhook)
//   WHATSAPP_VERIFY_TOKEN     texto combinado na configuração do webhook
//
// Sem WHATSAPP_TOKEN o envio fica em "modo simulação": nada sai para a Meta,
// a mensagem só é registrada no painel. Útil para testar localmente.

const API_VERSION = process.env.WHATSAPP_API_VERSION ?? "v23.0";

export const whatsappConfigurado = () =>
  Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);

export type ResultadoEnvio = { waId: string | null; status: "enviada" | "simulada" | "falhou"; erro?: string };

async function enviar(payload: Record<string, unknown>): Promise<ResultadoEnvio> {
  if (!whatsappConfigurado()) return { waId: null, status: "simulada" };

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", ...payload }),
    },
  );
  const data = (await res.json().catch(() => ({}))) as {
    messages?: { id: string }[];
    error?: { message?: string };
  };
  if (!res.ok) {
    return { waId: null, status: "falhou", erro: data.error?.message ?? `HTTP ${res.status}` };
  }
  return { waId: data.messages?.[0]?.id ?? null, status: "enviada" };
}

export function enviarTexto(para: string, texto: string) {
  return enviar({ to: para, type: "text", text: { body: texto, preview_url: true } });
}

export type OpcaoMenu = { id: string; titulo: string; descricao?: string };

// Lista interativa (até 10 opções; título até 24 caracteres).
export function enviarLista(para: string, corpo: string, botao: string, opcoes: OpcaoMenu[]) {
  return enviar({
    to: para,
    type: "interactive",
    interactive: {
      type: "list",
      body: { text: corpo },
      action: {
        button: botao,
        sections: [
          {
            title: "Bendita Banoffee",
            rows: opcoes.map((o) => ({ id: o.id, title: o.titulo, description: o.descricao })),
          },
        ],
      },
    },
  });
}

// Confere o cabeçalho X-Hub-Signature-256 enviado pela Meta.
export function assinaturaValida(corpo: string, assinatura: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!assinatura?.startsWith("sha256=")) return false;
  const esperado = Buffer.from(createHmac("sha256", secret).update(corpo).digest("hex"));
  const recebido = Buffer.from(assinatura.slice(7));
  return esperado.length === recebido.length && timingSafeEqual(esperado, recebido);
}

// ——— leitura do payload do webhook ———

export type MensagemRecebida = {
  waId: string;
  de: string; // telefone, só dígitos com DDI
  nome?: string;
  texto: string; // texto digitado ou título da opção escolhida
  opcaoId?: string; // id da opção do menu, quando for resposta interativa
};

export type StatusRecebido = { waId: string; status: string };

type WebhookBody = {
  entry?: {
    changes?: {
      value?: {
        contacts?: { wa_id: string; profile?: { name?: string } }[];
        messages?: {
          id: string;
          from: string;
          type: string;
          text?: { body: string };
          button?: { text: string; payload?: string };
          interactive?: {
            type: string;
            list_reply?: { id: string; title: string };
            button_reply?: { id: string; title: string };
          };
          image?: { caption?: string };
          document?: { caption?: string; filename?: string };
          location?: { name?: string; address?: string };
        }[];
        statuses?: { id: string; status: string }[];
      };
    }[];
  }[];
};

const rotuloMidia: Record<string, string> = {
  image: "📷 Imagem",
  audio: "🎤 Áudio",
  video: "🎬 Vídeo",
  document: "📄 Documento",
  sticker: "Figurinha",
  location: "📍 Localização",
  contacts: "👤 Contato",
};

export function lerWebhook(body: WebhookBody) {
  const mensagens: MensagemRecebida[] = [];
  const status: StatusRecebido[] = [];

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value ?? {};
      const nomes = new Map((value.contacts ?? []).map((c) => [c.wa_id, c.profile?.name]));

      for (const m of value.messages ?? []) {
        const reply = m.interactive?.list_reply ?? m.interactive?.button_reply;
        let texto = m.text?.body ?? reply?.title ?? m.button?.text ?? "";
        if (!texto) {
          const legenda = m.image?.caption ?? m.document?.caption ?? m.location?.name ?? "";
          texto = [rotuloMidia[m.type] ?? `[${m.type}]`, legenda].filter(Boolean).join(": ");
        }
        mensagens.push({
          waId: m.id,
          de: m.from,
          nome: nomes.get(m.from),
          texto,
          opcaoId: reply?.id ?? m.button?.payload,
        });
      }

      for (const s of value.statuses ?? []) status.push({ waId: s.id, status: s.status });
    }
  }
  return { mensagens, status };
}
