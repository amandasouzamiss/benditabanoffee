import Link from "next/link";
import { ArrowUpRight, Brush, ShoppingBag, Trophy } from "lucide-react";
import { site } from "../data/site";

export function Pumpkin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        d="M100 52 C96 36 102 24 116 18"
        stroke="#6B8E3A"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="62" cy="118" rx="44" ry="58" fill="#C95F14" />
      <ellipse cx="138" cy="118" rx="44" ry="58" fill="#C95F14" />
      <ellipse cx="100" cy="118" rx="44" ry="62" fill="#E07A1F" />
      <ellipse cx="82" cy="118" rx="30" ry="60" fill="#E8862A" opacity=".7" />
      <ellipse cx="118" cy="118" rx="30" ry="60" fill="#E8862A" opacity=".7" />
      <path d="M70 102 L86 92 L88 110 Z" fill="#3A2238" />
      <path d="M130 102 L114 92 L112 110 Z" fill="#3A2238" />
      <path
        d="M66 136 Q100 166 134 136 L124 140 L118 132 L110 142 L100 134 L90 142 L82 132 L76 140 Z"
        fill="#3A2238"
      />
    </svg>
  );
}

function Bat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M32 10c2-4 6-6 6-6s-1 4 0 6c4-6 14-8 26-4-6 2-10 6-10 12-4-4-10-4-12 0-2-3-6-4-10-1-4-3-8-2-10 1-2-4-8-4-12 0 0-6-4-10-10-12 12-4 22-2 26 4 1-2 0-6 0-6s4 2 6 6z" />
    </svg>
  );
}

const atividades = [
  {
    icon: Brush,
    quando: "15h às 16h30",
    titulo: "Pintura facial",
    texto: "Maquiagem temática para a criançada entrar no clima.",
  },
  {
    icon: ShoppingBag,
    quando: "Doces ou travessuras",
    titulo: "Visita ao comércio",
    texto: "Concentração na Bendita e saída em grupo para pedir doces.",
  },
  {
    icon: Trophy,
    quando: "Concurso",
    titulo: "Melhor fantasia",
    texto: "Capriche na fantasia: a mais criativa será premiada.",
  },
];

export default function Halloween() {
  return (
    <section
      id="halloween"
      className="relative isolate overflow-hidden bg-[#2A1828] py-16 text-[#FFF8F0] sm:py-20"
    >
      <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#D9711C]/35 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_10%,#5A3350_0%,#3A2238_45%,#2A1828_100%)]" />

      <Bat className="pointer-events-none absolute right-[38%] top-10 w-10 text-[#FFF8F0]/70 sm:w-14" />
      <Bat className="pointer-events-none absolute right-[30%] top-24 hidden w-8 text-[#FFF8F0]/40 sm:block" />

      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F2A25C]/60 sm:w-10" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#F2A25C] sm:text-xs">
                Bendita Banoffee × Wizard
              </span>
            </div>

            <h2 className="mt-5 max-w-3xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Halloween na Bendita
              <span className="mt-2 block font-title italic font-normal text-[#F2A25C]">
                com a Wizard
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#FFF8F0]/80 sm:text-lg">
              Uma tarde de fantasias, doces e muita diversão para os alunos da
              Wizard e suas famílias. Venha fantasiado!
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full border border-[#FFF8F0]/25 px-4 py-2">
                Sábado, 31/10
              </span>
              <span className="rounded-full border border-[#FFF8F0]/25 px-4 py-2">
                15h às 17h
              </span>
              <span className="rounded-full border border-[#FFF8F0]/25 px-4 py-2">
                Combos infantil, adulto e família
              </span>
            </div>
          </div>

          <Pumpkin className="mx-auto hidden w-56 drop-shadow-[0_30px_60px_rgba(217,113,28,0.35)] lg:block" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {atividades.map(({ icon: Icon, quando, titulo, texto }) => (
            <article
              key={titulo}
              className="rounded-[1.5rem] bg-[#FFF8F0] p-6 text-[#482C1B] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FCE3CC] text-[#D9711C]">
                <Icon size={20} />
              </span>
              <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C25F12]">
                {quando}
              </p>
              <h3 className="mt-1 font-title text-2xl font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E3D2A]">{texto}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#D9711C] px-7 py-3.5 font-bold text-white shadow-[0_14px_36px_rgba(217,113,28,0.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C25F12]"
          >
            Como chegar
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
