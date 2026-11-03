import type { NextRequest } from "next/server";
import { getUser } from "@/lib/session";
import { listarConversas, type StatusConversa } from "@/lib/atendimento";

const FILTROS = ["todas", "aguardando", "atendimento", "bot"] as const;

export async function GET(request: NextRequest) {
  if (!(await getUser())) return Response.json({ erro: "não autenticado" }, { status: 401 });

  const filtro = request.nextUrl.searchParams.get("filtro");
  const busca = request.nextUrl.searchParams.get("busca") ?? undefined;
  const valido = FILTROS.includes(filtro as (typeof FILTROS)[number])
    ? (filtro as StatusConversa | "todas")
    : "todas";

  return Response.json({ conversas: await listarConversas(valido, busca) });
}
