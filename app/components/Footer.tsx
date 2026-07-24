import Link from "next/link";
import { MapPin, ShoppingBag } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { navigation, site } from "../data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2B180F] text-white">
      <div className="container-site py-14">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="#inicio" className="inline-block leading-none">
              <span className="block font-[var(--font-title)] text-4xl font-semibold">
                Bendita
              </span>

              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.4em] text-[#F1DCC9]">
                Banoffee
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">
              Banoffees, cafés e momentos especiais para deixar o seu dia ainda
              mais bendito.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Navegação</h3>

            <nav className="mt-5 grid gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/55 transition hover:text-[#F1DCC9]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contato</h3>

            <div className="mt-5 grid gap-4">
              <Link
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/55 transition hover:text-[#F1DCC9]"
              >
                <FaInstagram size={17} />
                @benditabanoffeenp
              </Link>

              <Link
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm leading-6 text-white/55 transition hover:text-[#F1DCC9]"
              >
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>{site.address}</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Faça seu pedido</h3>

            <p className="mt-5 text-sm leading-7 text-white/55">
              Escolha seus produtos favoritos pela nossa página oficial de
              pedidos.
            </p>

            <Link
              href={site.ordersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#F1DCC9] px-5 py-3 text-sm font-bold text-[#482C1B] transition hover:bg-white"
            >
              <ShoppingBag size={17} />
              Fazer pedido
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Bendita Banoffee. Todos os direitos reservados.
          </p>

          <p>A Casa da Banoffee</p>
        </div>
      </div>
    </footer>
  );
}