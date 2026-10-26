// Cria (ou atualiza a senha de) um usuário do painel de atendimento.
// Uso: npm run painel:usuario -- "Nome" email@exemplo.com "senha"
// Com DATABASE_URL definida grava no banco de produção; sem ela, no banco local (.data/pglite).
import bcrypt from "bcryptjs";

const [nome, email, senha] = process.argv.slice(2);
if (!nome || !email || !senha) {
  console.error('Uso: npm run painel:usuario -- "Nome" email@exemplo.com "senha"');
  process.exit(1);
}
if (senha.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}

const hash = await bcrypt.hash(senha, 12);
const sqlText = `INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3)
  ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome, senha_hash = EXCLUDED.senha_hash
  RETURNING id`;
const params = [nome, email.toLowerCase().trim(), hash];

let rows;
if (process.env.DATABASE_URL) {
  const { Pool } = await import("@neondatabase/serverless");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  await pool.query(`CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, senha_hash TEXT NOT NULL, criado_em TIMESTAMPTZ NOT NULL DEFAULT now())`);
  rows = (await pool.query(sqlText, params)).rows;
  await pool.end();
} else {
  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite(".data/pglite");
  await db.query(`CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, senha_hash TEXT NOT NULL, criado_em TIMESTAMPTZ NOT NULL DEFAULT now())`);
  rows = (await db.query(sqlText, params)).rows;
  await db.close();
}
console.log(`Usuário pronto (id ${rows[0].id}): ${nome} <${params[1]}>`);
