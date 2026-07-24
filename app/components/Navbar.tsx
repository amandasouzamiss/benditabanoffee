"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { navigation, site } from "../data/site";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#482C1B]/10 bg-[#FEEFE1]/90 backdrop-blur-xl">
      <div className="container-site flex h-20 items-center justify-between">
        <Link
          href="#inicio"
          aria-label="Ir para o início"
          className="relative block h-14 w-36 shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="Bendita Banoffee"
            fill
            priority
            sizes="144px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[#482C1B]/75 transition hover:text-[#9C521B]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={site.ordersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#482C1B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9C521B]"
          >
            <ShoppingBag size={17} />
            Fazer pedido
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((state) => !state)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#482C1B]/15 text-[#482C1B] transition hover:bg-[#482C1B]/5 lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#482C1B]/10 bg-[#FEEFE1] shadow-lg lg:hidden">
          <nav className="container-site flex flex-col py-6">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#482C1B]/10 py-4 font-semibold text-[#482C1B] transition hover:text-[#9C521B]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={site.ordersUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#482C1B] px-5 py-4 font-bold text-white transition hover:bg-[#9C521B]"
            >
              <ShoppingBag size={18} />
              Fazer pedido
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}