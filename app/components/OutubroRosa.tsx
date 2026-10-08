import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";

export function RosaRibbon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 22C9 17 12 13.5 14 9.5 15.2 7 14.6 3 12 3 9.4 3 8.8 7 10 9.5 12 13.5 15 17 17 22" />
    </svg>
  );
}

export default function OutubroRosa() {
  return (
    <section
      id="outubro-rosa"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#fbe3ea] to-[#feefe1] py-16 sm:py-20"
    >
      <RosaRibbon className="pointer-events-none absolute -right-10 -top-6 -z-10 h-72 w-72 rotate-12 text-[#d9568a]/15 sm:h-96 sm:w-96" />

      <div className="container-site">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#a3345f]/50 sm:w-10" />

          <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a3345f] sm:text-xs">
            <RosaRibbon className="h-4 w-4" />
            Outubro Rosa
          </span>
        </div>

        <h2 className="mt-5 max-w-3xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#482C1B] sm:text-6xl">
          Outubro é rosa e
          <span className="mt-2 block font-title italic font-normal text-[#a3345f]">
            cuidar de você vem primeiro
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[#482C1B]/70 sm:text-lg">
          Este mês a gente lembra que prevenção salva vidas. Quando descoberto
          cedo, o câncer de mama tem grandes chances de cura. Faça seus exames,
          agende sua consulta e incentive quem você ama a fazer o mesmo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={site.ordersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#a3345f] px-7 py-3.5 font-bold text-white shadow-[0_14px_36px_rgba(163,52,95,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8c2a50]"
          >
            Fazer pedido
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/tortas"
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-[#a3345f]/35 px-7 py-3.5 font-bold text-[#a3345f] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a3345f]/10"
          >
            Ver tortas
          </Link>
        </div>
      </div>
    </section>
  );
}
