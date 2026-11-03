import Link from "next/link";
import { sql } from "@/lib/db";

type Linha = {
  id: number;
  nome: string | null;
  telefone: string;
  criado_em: string;
  conversa_id: number | null;
  etiquetas: { id: number; nome: string; cor: string }[];
};

export default async function ContatosPage({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string; etiqueta?: string }>;
}) {
  const { busca = "", etiqueta = "" } = await searchParams;
  const params: unknown[] = [];
  const where: string[] = [];
  if (busca.trim()) {
    params.push(`%${busca.trim().toLowerCase()}%`);
    where.push(`(lower(coalesce(ct.nome, '')) LIKE $${params.length} OR ct.telefone LIKE $${params.length})`);
  }
  if (Number(etiqueta) > 0) {
    params.push(Number(etiqueta));
    where.push(`EXISTS (SELECT 1 FROM contato_etiquetas x WHERE x.contato_id = ct.id AND x.etiqueta_id = $${params.length})`);
  }

  const [contatos, etiquetas] = await Promise.all([
    sql<Linha>(
      `SELECT ct.id, ct.nome, ct.telefone, ct.criado_em, cv.id AS conversa_id,
         COALESCE((SELECT json_agg(json_build_object('id', e.id, 'nome', e.nome, 'cor', e.cor) ORDER BY e.nome)
           FROM contato_etiquetas ce JOIN etiquetas e ON e.id = ce.etiqueta_id WHERE ce.contato_id = ct.id), '[]') AS etiquetas
       FROM contatos ct LEFT JOIN conversas cv ON cv.contato_id = ct.id
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY ct.atualizado_em DESC LIMIT 300`,
      params,
    ),
    sql<{ id: number; nome: string; cor: string }>("SELECT id, nome, cor FROM etiquetas ORDER BY nome"),
  ]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <h1 className="font-title text-4xl font-semibold">Contatos</h1>

        <form className="mt-5 flex flex-wrap gap-2">
          <input
            name="busca"
            defaultValue={busca}
            placeholder="Buscar nome ou telefone"
            className="min-w-[220px] flex-1 rounded-full border border-[#482C1B]/15 bg-white px-4 py-2 text-sm outline-none focus:border-[#9C521B]"
          />
          <select
            name="etiqueta"
            defaultValue={etiqueta}
            className="rounded-full border border-[#482C1B]/15 bg-white px-4 py-2 text-sm"
          >
            <option value="">Todas as etiquetas</option>
            {etiquetas.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </select>
          <button className="rounded-full bg-[#482C1B] px-5 py-2 text-sm font-bold text-white">Filtrar</button>
        </form>

        <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          {contatos.length === 0 && <p className="p-6 text-center text-sm text-[#482C1B]/55">Nenhum contato encontrado.</p>}
          <ul className="divide-y divide-[#482C1B]/8">
            {contatos.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <Link href={`/painel/contatos/${c.id}`} className="min-w-0 flex-1">
                  <span className="block truncate font-bold hover:underline">{c.nome ?? "Sem nome"}</span>
                  <span className="text-xs text-[#482C1B]/55">+{c.telefone}</span>
                </Link>
                <span className="flex flex-wrap gap-1">
                  {c.etiquetas.map((e) => (
                    <span key={e.id} className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: e.cor }}>
                      {e.nome}
                    </span>
                  ))}
                </span>
                {c.conversa_id && (
                  <Link href={`/painel?c=${c.conversa_id}`} className="rounded-full border border-[#482C1B]/15 px-3 py-1 text-xs font-bold">
                    Conversa
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
