import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Banco local do painel (só em desenvolvimento): carregado direto do node_modules.
  serverExternalPackages: ["@electric-sql/pglite"],
};

export default nextConfig;
