"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Send, UserCheck, UserRound, X } from "lucide-react";
import type { ItemConversa, Mensagem, StatusConversa } from "@/lib/atendimento";
import { assumir, encerrar, enviarResposta } from "../actions";

type Detalhe = {
  id: number;
  status: StatusConversa;
  ultima_entrada_em: string | null;
  fora_da_janela: boolean;
  contato_id: number;
  nome: string | null;
  telefone: string;
  notas: string;
  atendente: string | null;
};

const FILTROS: { id: StatusConversa | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "aguardando", label: "Aguardando" },
  { id: "atendimento", label: "Em atendimento" },
  { id: "bot", label: "Com o robô" },
];

const STATUS_INFO: Record<StatusConversa, { label: string; cls: string }> = {
  aguardando: { label: "Aguardando", cls: "bg-[#D9711C] text-white" },
  atendimento: { label: "Em atendimento", cls: "bg-[#482C1B] text-white" },
  bot: { label: "Robô", cls: "bg-[#F1DCC9] text-[#482C1B]" },
};

const RESPOSTAS_RAPIDAS = [
  "Olá! Aqui é da Bendita Banoffee 💛 Como posso te ajudar?",
  "Sua encomenda está confirmada! Qualquer novidade avisamos por aqui.",
  "Nosso cardápio completo para pedir online: https://pedidos.benditabanoffee.com.br/",
  "Obrigado pelo contato! Se precisar de algo mais, é só chamar 😊",
];

const formatarTelefone = (t: string) =>
  t.length === 13 ? `(${t.slice(2, 4)}) ${t.slice(4, 9)}-${t.slice(9)}` : `+${t}`;

const hora = (iso: string) => {
  const d = new Date(iso);
  const hoje = new Date();
  return d.toDateString() === hoje.toDateString()
    ? d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
};

export default function Caixa({
  conversaInicial,
  simulacao,
}: {
  conversaInicial: number | null;
  simulacao: boolean;
}) {
  const [filtro, setFiltro] = useState<StatusConversa | "todas">("todas");
  const [busca, setBusca] = useState("");
  const [conversas, setConversas] = useState<ItemConversa[]>([]);
  const [selecionada, setSelecionada] = useState<number | null>(conversaInicial);
  const [detalhe, setDetalhe] = useState<Detalhe | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [pendente, startTransition] = useTransition();
  const fimRef = useRef<HTMLDivElement>(null);
  const ultimoId = useRef(0);

  const carregarLista = useCallback(async () => {
    const qs = new URLSearchParams({ filtro, busca });
    const res = await fetch(`/api/painel/conversas?${qs}`, { cache: "no-store" });
    if (res.status === 401) return window.location.assign("/painel/login");
    if (res.ok) setConversas((await res.json()).conversas);
  }, [filtro, busca]);

  const carregarMensagens = useCallback(
    async (id: number, desdeInicio = false) => {
      const depois = desdeInicio ? 0 : ultimoId.current;
      const res = await fetch(`/api/painel/conversas/${id}?depois=${depois}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { conversa: Detalhe; mensagens: Mensagem[] };
      setDetalhe(data.conversa);
      if (data.mensagens.length) {
        ultimoId.current = data.mensagens[data.mensagens.length - 1].id;
        setMensagens((atual) => (desdeInicio ? data.mensagens : [...atual, ...data.mensagens]));
      } else if (desdeInicio) {
        setMensagens([]);
      }
    },
    [],
  );

  // Lista: atualiza a cada 5s.
  useEffect(() => {
    const primeira = setTimeout(carregarLista, 0);
    const timer = setInterval(carregarLista, 5000);
    return () => {
      clearTimeout(primeira);
      clearInterval(timer);
    };
  }, [carregarLista]);

  // Conversa aberta: busca só as mensagens novas a cada 3s.
  useEffect(() => {
    if (!selecionada) return;
    ultimoId.current = 0;
    const primeira = setTimeout(() => carregarMensagens(selecionada, true), 0);
    const timer = setInterval(() => carregarMensagens(selecionada), 3000);
    return () => {
      clearTimeout(primeira);
      clearInterval(timer);
    };
  }, [selecionada, carregarMensagens]);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ block: "end" });
  }, [mensagens.length]);

  const abrir = (id: number) => {
    setSelecionada(id);
    setDetalhe(null);
    setMensagens([]);
    setErroEnvio(null);
    window.history.replaceState(null, "", `/painel?c=${id}`);
  };

  const enviar = () => {
    if (!selecionada || !texto.trim()) return;
    const corpo = texto;
    startTransition(async () => {
      const r = await enviarResposta(selecionada, corpo);
      if (r.status === "falhou") setErroEnvio(r.erro ?? "Não foi possível enviar.");
      else {
        setErroEnvio(null);
        setTexto("");
      }
      await carregarMensagens(selecionada);
      await carregarLista();
    });
  };

  const acao = (fn: (id: number) => Promise<void>) => () => {
    if (!selecionada) return;
    startTransition(async () => {
      await fn(selecionada);
      await carregarMensagens(selecionada);
      await carregarLista();
    });
  };

  const foraDaJanela = detalhe?.fora_da_janela;

  return (
    <div className="flex h-full min-h-0">
      {/* Lista */}
      <aside
        className={`${selecionada ? "hidden md:flex" : "flex"} w-full flex-none flex-col border-r border-[#482C1B]/10 bg-white md:w-[340px]`}
      >
        <div className="space-y-3 border-b border-[#482C1B]/10 p-3">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nome ou telefone"
            className="w-full rounded-full border border-[#482C1B]/15 bg-[#FFF8F0] px-4 py-2 text-sm outline-none focus:border-[#9C521B]"
          />
          <div className="flex gap-1.5 overflow-x-auto">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
                  filtro === f.id ? "bg-[#9C521B] text-white" : "bg-[#F1DCC9]/60 text-[#482C1B]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto">
          {conversas.length === 0 && (
            <li className="p-6 text-center text-sm text-[#482C1B]/50">Nenhuma conversa por aqui.</li>
          )}
          {conversas.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => abrir(c.id)}
                className={`flex w-full gap-3 border-b border-[#482C1B]/5 px-4 py-3 text-left transition hover:bg-[#FFF8F0] ${
                  selecionada === c.id ? "bg-[#FEEFE1]" : ""
                }`}
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F1DCC9] text-[#9C521B]">
                  <UserRound size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-bold">{c.nome ?? formatarTelefone(c.telefone)}</span>
                    <span className="ml-auto flex-none text-[11px] text-[#482C1B]/50">{hora(c.ultima_mensagem_em)}</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2">
                    <span className="truncate text-xs text-[#482C1B]/60">{c.ultimo_texto ?? ""}</span>
                    {c.nao_lidas > 0 && (
                      <span className="ml-auto flex-none rounded-full bg-[#D9711C] px-1.5 text-[11px] font-bold text-white">
                        {c.nao_lidas}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_INFO[c.status].cls}`}>
                      {STATUS_INFO[c.status].label}
                    </span>
                    {c.etiquetas.map((e) => (
                      <span
                        key={e.nome}
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                        style={{ background: e.cor }}
                      >
                        {e.nome}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conversa */}
      <section className={`${selecionada ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
        {!selecionada || !detalhe ? (
          <div className="m-auto max-w-sm p-6 text-center text-sm text-[#482C1B]/55">
            {selecionada ? "Carregando…" : "Escolha uma conversa à esquerda."}
            {simulacao && (
              <p className="mt-4 rounded-xl bg-[#F1DCC9]/70 p-3 text-xs">
                Modo simulação: o WhatsApp ainda não está conectado. As respostas ficam registradas aqui, mas não
                são enviadas.
              </p>
            )}
          </div>
        ) : (
          <>
            <header className="flex flex-none items-center gap-3 border-b border-[#482C1B]/10 bg-white px-3 py-2.5 sm:px-5">
              <button onClick={() => setSelecionada(null)} className="md:hidden" aria-label="Voltar">
                <ArrowLeft size={20} />
              </button>
              <div className="min-w-0">
                <Link href={`/painel/contatos/${detalhe.contato_id}`} className="block truncate font-bold hover:underline">
                  {detalhe.nome ?? formatarTelefone(detalhe.telefone)}
                </Link>
                <p className="text-xs text-[#482C1B]/55">
                  {formatarTelefone(detalhe.telefone)} · {STATUS_INFO[detalhe.status].label}
                  {detalhe.atendente ? ` com ${detalhe.atendente}` : ""}
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                {detalhe.status !== "atendimento" && (
                  <button
                    onClick={acao(assumir)}
                    disabled={pendente}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#482C1B] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    <UserCheck size={14} /> Assumir
                  </button>
                )}
                {detalhe.status !== "bot" && (
                  <button
                    onClick={acao(encerrar)}
                    disabled={pendente}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#482C1B]/20 px-3 py-1.5 text-xs font-bold"
                  >
                    <Bot size={14} /> Devolver ao robô
                  </button>
                )}
              </div>
            </header>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4 sm:px-6">
              {mensagens.map((m) => {
                const minha = m.direcao === "saida";
                return (
                  <div key={m.id} className={`flex ${minha ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-sm sm:max-w-[70%] ${
                        minha
                          ? m.autor === "bot"
                            ? "bg-[#F1DCC9] text-[#482C1B]"
                            : "bg-[#482C1B] text-white"
                          : "bg-white text-[#482C1B]"
                      }`}
                    >
                      {m.autor !== "cliente" && (
                        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider opacity-60">
                          {m.autor === "bot" ? "Robô" : (m.usuario ?? "Equipe")}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words">{m.texto}</p>
                      <p className="mt-1 text-right text-[10px] opacity-55">
                        {hora(m.criado_em)}
                        {minha && m.status !== "enviada" ? ` · ${m.status}` : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={fimRef} />
            </div>

            <footer className="flex-none border-t border-[#482C1B]/10 bg-white p-3">
              {foraDaJanela && (
                <p className="mb-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Passaram mais de 24h desde a última mensagem do cliente. Pela regra do WhatsApp, só é possível
                  responder depois que ele escrever de novo.
                </p>
              )}
              {erroEnvio && (
                <p className="mb-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
                  {erroEnvio}
                  <button onClick={() => setErroEnvio(null)} className="ml-auto" aria-label="Fechar">
                    <X size={14} />
                  </button>
                </p>
              )}
              <div className="mb-2 flex gap-1.5 overflow-x-auto">
                {RESPOSTAS_RAPIDAS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTexto(r)}
                    className="max-w-[220px] flex-none truncate rounded-full bg-[#FFF8F0] px-3 py-1 text-xs text-[#482C1B]/75 ring-1 ring-[#482C1B]/10 hover:bg-[#F1DCC9]/60"
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      enviar();
                    }
                  }}
                  rows={2}
                  placeholder="Escreva uma resposta (Enter envia, Shift+Enter quebra linha)"
                  className="min-h-[48px] flex-1 resize-none rounded-2xl border border-[#482C1B]/15 bg-[#FFF8F0] px-4 py-2.5 text-sm outline-none focus:border-[#9C521B]"
                />
                <button
                  onClick={enviar}
                  disabled={pendente || !texto.trim()}
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#9C521B] text-white transition hover:bg-[#482C1B] disabled:opacity-50"
                  aria-label="Enviar"
                >
                  <Send size={18} />
                </button>
              </div>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}
