"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  { href: "/painel", label: "Conversas" },
  { href: "/painel/contatos", label: "Contatos" },
  { href: "/painel/encomendas", label: "Encomendas" },
];

export default function PainelNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto text-sm font-semibold">
      {itens.map((item) => {
        const ativo = item.href === "/painel" ? pathname === "/painel" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 transition ${
              ativo ? "bg-[#482C1B] text-white" : "text-[#482C1B]/70 hover:bg-[#482C1B]/5"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
