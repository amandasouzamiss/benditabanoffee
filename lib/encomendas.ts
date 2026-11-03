// Etapas de uma encomenda no painel.
export const STATUS_ENCOMENDA = ["nova", "confirmada", "producao", "pronta", "entregue", "cancelada"] as const;
export type StatusEncomenda = (typeof STATUS_ENCOMENDA)[number];

export const ROTULO_STATUS: Record<StatusEncomenda, string> = {
  nova: "Nova",
  confirmada: "Confirmada",
  producao: "Em produção",
  pronta: "Pronta",
  entregue: "Entregue",
  cancelada: "Cancelada",
};

export const ROTULO_TIPO: Record<string, string> = {
  torta: "Torta",
  cesta: "Cesta",
  evento: "Evento",
};
