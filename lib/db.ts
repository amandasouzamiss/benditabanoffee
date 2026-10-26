import "server-only";

// Acesso ao banco do painel de atendimento.
//
// Produção: Postgres na Neon (variável DATABASE_URL).
// Desenvolvimento: sem DATABASE_URL, usa um Postgres embutido (PGlite) salvo
// em .data/pglite — não precisa de conta nem servidor para testar.

type Row = Record<string, unknown>;
type Runner = (text: string, params?: unknown[]) => Promise<Row[]>;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contatos (
  id SERIAL PRIMARY KEY,
  telefone TEXT NOT NULL UNIQUE,
  nome TEXT,
  notas TEXT NOT NULL DEFAULT '',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS etiquetas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  cor TEXT NOT NULL DEFAULT '#9C521B'
);

CREATE TABLE IF NOT EXISTS contato_etiquetas (
  contato_id INTEGER NOT NULL REFERENCES contatos(id) ON DELETE CASCADE,
  etiqueta_id INTEGER NOT NULL REFERENCES etiquetas(id) ON DELETE CASCADE,
  PRIMARY KEY (contato_id, etiqueta_id)
);

-- Uma conversa por contato. status: bot | aguardando | atendimento
CREATE TABLE IF NOT EXISTS conversas (
  id SERIAL PRIMARY KEY,
  contato_id INTEGER NOT NULL UNIQUE REFERENCES contatos(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'bot',
  atendente_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  nao_lidas INTEGER NOT NULL DEFAULT 0,
  ultima_mensagem_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  ultima_entrada_em TIMESTAMPTZ
);

-- direcao: entrada | saida. autor: cliente | bot | atendente
CREATE TABLE IF NOT EXISTS mensagens (
  id SERIAL PRIMARY KEY,
  conversa_id INTEGER NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  direcao TEXT NOT NULL,
  autor TEXT NOT NULL,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  texto TEXT NOT NULL,
  wa_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'enviada',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mensagens_conversa_idx ON mensagens (conversa_id, id);

-- tipo: torta | cesta | evento. status: nova | confirmada | producao | pronta | entregue | cancelada
CREATE TABLE IF NOT EXISTS encomendas (
  id SERIAL PRIMARY KEY,
  tipo TEXT NOT NULL,
  contato_id INTEGER REFERENCES contatos(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  itens JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'nova',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS respostas_rapidas (
  id SERIAL PRIMARY KEY,
  atalho TEXT NOT NULL UNIQUE,
  texto TEXT NOT NULL
);
`;

// Guardado no globalThis para não abrir o banco de novo a cada recarga em dev.
const store = globalThis as typeof globalThis & { __benditaDb?: Promise<Runner> };

async function createRunner(): Promise<Runner> {
  let run: Runner;

  if (process.env.DATABASE_URL) {
    const { Pool } = await import("@neondatabase/serverless");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    run = async (text, params = []) => (await pool.query(text, params)).rows;
  } else {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL não configurada.");
    }
    const { PGlite } = await import("@electric-sql/pglite");
    const db = new PGlite(".data/pglite");
    run = async (text, params = []) => (await db.query<Row>(text, params)).rows;
  }

  for (const statement of SCHEMA.split(";").map((s) => s.trim()).filter(Boolean)) {
    await run(statement);
  }
  return run;
}

export async function sql<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  store.__benditaDb ??= createRunner().catch((error) => {
    store.__benditaDb = undefined;
    throw error;
  });
  return (await (await store.__benditaDb)(text, params)) as T[];
}

export async function sqlOne<T = Row>(text: string, params: unknown[] = []): Promise<T | undefined> {
  return (await sql<T>(text, params))[0];
}
