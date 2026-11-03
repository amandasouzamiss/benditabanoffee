import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { sql, sqlOne } from "@/lib/db";
import { ROTULO_STATUS, ROTULO_TIPO, type StatusEncomenda } from "@/lib/encomendas";
import { adicionarEtiqueta, removerEtiqueta, salvarContato } from "../../../actions";

const CORES = ["#9C521B", "#482C1B", "#D9711C", "#2F7D4F", "#2E5E9E", "#A3345F", "#6B4FA0"];

export default async function ContatoPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const contato = await sqlOne<{ id: number; nome: string | null; telefone: string; notas: string; criado_em: string; conversa_id: number | null }>(
    `SELECT ct.*, cv.id AS conversa_id FROM contatos ct LEFT JOIN conversas cv ON cv.contato_id = ct.id WHERE ct.id = $1`,
    [id],
  );
  if (!contato) notFound();

  const [etiquetas, todas, encomendas] = await Promise.all([
    sql<{ id: number; nome: string; cor: string }>(
      `SELECT e.id, e.nome, e.cor FROM contato_etiquetas ce JOIN etiquetas e ON e.id = ce.etiqueta_id
       WHERE ce.contato_id = $1 ORDER BY e.nome`,
      [id],
    ),
    sql<{ nome: string }>("SELECT nome FROM etiquetas ORDER BY nome"),
    sql<{ id: number; tipo: string; status: StatusEncomenda; criado_em: string }>(
      "SELECT id, tipo, status, criado_em FROM encomendas WHERE contato_id = $1 ORDER BY id DESC",
      [id],
    ),
  ]);

  const campo =
    "mt-1.5 w-full rounded-xl border border-[#482C1B]/15 bg-[#FFF8F0] px-4 py-2.5 text-sm outline-none focus:border-[#9C521B]";

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <Link href="/painel/contatos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#482C1B]/60">
          <ArrowLeft size={16} /> Contatos
        </Link>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <h1 className="font-title text-4xl font-semibold">{contato.nome ?? "Sem nome"}</h1>
          <span className="pb-1 text-sm text-[#482C1B]/55">+{contato.telefone}</span>
          {contato.conversa_id && (
            <Link href={`/painel?c=${contato.conversa_id}`} className="ml-auto rounded-full bg-[#482C1B] px-4 py-2 text-sm font-bold text-white">
              Abrir conversa
            </Link>
          )}
        </div>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold">Etiquetas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {etiquetas.length === 0 && <span className="text-sm text-[#482C1B]/50">Nenhuma etiqueta.</span>}
            {etiquetas.map((e) => (
              <form key={e.id} action={removerEtiqueta}>
                <input type="hidden" name="contato_id" value={id} />
                <input type="hidden" name="etiqueta_id" value={e.id} />
                <button
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ background: e.cor }}
                  title="Remover etiqueta"
                >
                  {e.nome} <X size={12} />
                </button>
              </form>
            ))}
          </div>
          <form action={adicionarEtiqueta} className="mt-4 flex flex-wrap items-center gap-2">
            <input type="hidden" name="contato_id" value={id} />
            <input
              name="etiqueta"
              list="etiquetas-existentes"
              required
              maxLength={40}
              placeholder="Nova etiqueta (ex.: Cliente fiel)"
              className="min-w-[200px] flex-1 rounded-full border border-[#482C1B]/15 bg-[#FFF8F0] px-4 py-2 text-sm outline-none focus:border-[#9C521B]"
            />
            <datalist id="etiquetas-existentes">
              {todas.map((t) => (
                <option key={t.nome} value={t.nome} />
              ))}
            </datalist>
            <select name="cor" className="rounded-full border border-[#482C1B]/15 bg-white px-3 py-2 text-sm" aria-label="Cor">
              {CORES.map((c) => (
                <option key={c} value={c} style={{ color: c }}>
                  ● {c}
                </option>
              ))}
            </select>
            <button className="rounded-full bg-[#9C521B] px-4 py-2 text-sm font-bold text-white">Adicionar</button>
          </form>
        </section>

        <section className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold">Dados e anotações</h2>
          <form action={salvarContato} className="mt-3 space-y-3">
            <input type="hidden" name="id" value={id} />
            <label className="block text-sm font-semibold">
              Nome
              <input name="nome" defaultValue={contato.nome ?? ""} maxLength={120} className={campo} />
            </label>
            <label className="block text-sm font-semibold">
              Anotações
              <textarea
                name="notas"
                defaultValue={contato.notas}
                rows={5}
                placeholder="Preferências, alergias, datas especiais…"
                className={campo}
              />
            </label>
            <button className="rounded-full bg-[#482C1B] px-5 py-2 text-sm font-bold text-white">Salvar</button>
          </form>
        </section>

        <section className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold">Encomendas</h2>
          {encomendas.length === 0 ? (
            <p className="mt-2 text-sm text-[#482C1B]/50">Nenhuma encomenda pelo site.</p>
          ) : (
            <ul className="mt-2 divide-y divide-[#482C1B]/8 text-sm">
              {encomendas.map((e) => (
                <li key={e.id} className="flex justify-between py-2">
                  <Link href={`/painel/encomendas#encomenda-${e.id}`} className="font-semibold hover:underline">
                    #{e.id} · {ROTULO_TIPO[e.tipo] ?? e.tipo}
                  </Link>
                  <span className="text-[#482C1B]/60">
                    {ROTULO_STATUS[e.status]} · {new Date(e.criado_em).toLocaleDateString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
