import type { Metadata } from "next";
import Image from "next/image";
import { requireUser } from "@/lib/session";
import { logout } from "../actions";
import PainelNav from "./PainelNav";

export const metadata: Metadata = {
  title: "Painel · Bendita Banoffee",
  robots: { index: false, follow: false },
};

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex h-dvh flex-col bg-[#FEEFE1] text-[#482C1B]">
      <header className="flex flex-none items-center gap-4 border-b border-[#482C1B]/10 bg-white px-4 py-2.5 sm:px-6">
        <Image src="/images/logo.png" alt="Bendita Banoffee" width={120} height={68} className="h-9 w-auto" />
        <PainelNav />
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="hidden font-semibold sm:inline">{user.nome}</span>
          <form action={logout}>
            <button className="rounded-full border border-[#482C1B]/15 px-3 py-1.5 font-semibold transition hover:bg-[#482C1B]/5">
              Sair
            </button>
          </form>
        </div>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
