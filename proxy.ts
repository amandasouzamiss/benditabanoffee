import { NextResponse, type NextRequest } from "next/server";

// Checagem otimista do painel: sem cookie de sessão, vai para o login.
// A validação de verdade (assinatura + usuário no banco) acontece em lib/session.ts.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/painel/login") return NextResponse.next();

  if (!request.cookies.has("bendita_painel")) {
    if (pathname.startsWith("/api/painel")) {
      return NextResponse.json({ erro: "não autenticado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/painel/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*", "/api/painel/:path*"],
};
