import Link from "next/link";
import { sql } from "@/lib/db";
import { ROTULO_STATUS, ROTULO_TIPO, STATUS_ENCOMENDA, type StatusEncomenda } from "@/lib/encomendas";
import { mudarStatusEncomenda } from "../../actions";

type Encomenda = {
  id: number;
  tipo: string;
  nome: string;
  telefone: string;
  itens: { label: string; value: string }[];
  status: StatusEncomenda;
  criado_em: string;
  contato_id: number | null;
  conversa_id: number | null;
};

const ABERTAS: StatusEncomenda[] = ["nova", "confirmada", "producao", "pronta"];

export default async function EncomendasPage({ searchParams }: { searchParams: Promise<{ ver?: string }> }) {
  const { ver } = await searchParams;
  const mostrarFechadas = ver === "todas";

  const encomendas = await sql<Encomenda>(
    `SELECT e.*, cv.id AS conversa_id FROM encomendas e
     LEFT JOIN conversas cv ON cv.contato_id = e.contato_id
     ${mostrarFechadas ? "" : "WHERE e.status IN ('nova', 'confirmada', 'producao', 'pronta')"}
     ORDER BY e.id DESC LIMIT 300`,
  );
  const colunas = mostrarFechadas ? [...STATUS_ENCOMENDA] : ABERTAS;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="font-title text-4xl font-semibold">Encomendas</h1>
          <Link
            href={mostrarFechadas ? "/painel/encomendas" : "/painel/encomendas?ver=todas"}
            className="ml-auto rounded-full border border-[#482C1B]/15 bg-white px-4 py-2 text-sm font-bold"
          >
            {mostrarFechadas ? "Só em andamento" : "Ver entregues e canceladas"}
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {colunas.map((status) => {
            const daColuna = encomendas.filter((e) => e.status === status);
            return (
              <section key={status} className="rounded-2xl bg-[#F1DCC9]/50 p-3">
                <h2 className="flex items-center justify-between px-1 font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wider">
                  {ROTULO_STATUS[status]}
                  <span className="rounded-full bg-white px-2 text-xs">{daColuna.length}</span>
                </h2>
                <div className="mt-3 space-y-3">
                  {daColuna.map((e) => (
                    <article id={`encomenda-${e.id}`} key={e.id} className="rounded-xl bg-white p-4 text-sm shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#9C521B]">
                            #{e.id} · {ROTULO_TIPO[e.tipo] ?? e.tipo}
                          </p>
                          <p className="mt-0.5 font-bold">{e.nome}</p>
                          <p className="text-xs text-[#482C1B]/55">
                            +{e.telefone} · {new Date(e.criado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                          </p>
                        </div>
                      </div>
                      <dl className="mt-3 space-y-1.5">
                        {e.itens
                          .filter((i) => i.label !== "Contato")
                          .map((i) => (
                            <div key={i.label}>
                              <dt className="text-[10px] font-bold uppercase tracking-wider text-[#482C1B]/45">{i.label}</dt>
                              <dd className="whitespace-pre-line">{i.value}</dd>
                            </div>
                          ))}
                      </dl>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <form action={mudarStatusEncomenda} className="flex gap-1.5">
                          <input type="hidden" name="id" value={e.id} />
                          <select
                            name="status"
                            defaultValue={e.status}
                            className="rounded-full border border-[#482C1B]/15 bg-[#FFF8F0] px-2.5 py-1 text-xs"
                            aria-label="Etapa"
                          >
                            {STATUS_ENCOMENDA.map((s) => (
                              <option key={s} value={s}>
                                {ROTULO_STATUS[s]}
                              </option>
                            ))}
                          </select>
                          <button className="rounded-full bg-[#482C1B] px-3 py-1 text-xs font-bold text-white">Mover</button>
                        </form>
                        {e.conversa_id ? (
                          <Link href={`/painel?c=${e.conversa_id}`} className="text-xs font-bold text-[#9C521B] hover:underline">
                            Conversa
                          </Link>
                        ) : (
                          e.contato_id && (
                            <Link href={`/painel/contatos/${e.contato_id}`} className="text-xs font-bold text-[#9C521B] hover:underline">
                              Contato
                            </Link>
                          )
                        )}
                      </div>
                    </article>
                  ))}
                  {daColuna.length === 0 && <p className="px-1 text-xs text-[#482C1B]/45">Nada por aqui.</p>}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
