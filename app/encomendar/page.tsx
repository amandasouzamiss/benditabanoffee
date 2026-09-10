import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const description =
  "Encomende tortas, cestas de café da manhã ou monte seu evento com a Bendita Banoffee. Monte seu pedido em poucos passos e finalize pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Fazer uma encomenda | Bendita Banoffee",
  description,
  alternates: { canonical: "/encomendar" },
  openGraph: {
    title: "Fazer uma encomenda | Bendita Banoffee",
    description,
    url: "/encomendar",
    images: [{ url: "/images/orders.jpg", alt: "Encomendas Bendita Banoffee" }],
  },
};

const options = [
  {
    title: "Torta",
    description:
      "Escolha o sabor, o tamanho e a data de retirada em 4 passos rápidos.",
    image: "/images/banoffee.jpg",
    href: "/tortas/encomendar",
  },
  {
    title: "Cesta de café da manhã",
    description:
      "Monte a cesta pela ocasião, tamanho e extras, com entrega ou retirada.",
    image: "/images/cestas/cesta-2.jpg",
    href: "/cestas/encomendar",
  },
  {
    title: "Evento",
    description:
      "No nosso espaço ou no local da sua festa — conte o tipo de evento e a data.",
    image: "/images/about.jpg",
    href: "/eventos/encomendar",
  },
];

export default function EncomendarPage() {
  return (
    <section className="relative overflow-hidden bg-[#FEEFE1] pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#F1DCC9]/60 blur-[130px]" />

      <div className="container-site relative">
        <div className="max-w-2xl">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
            Encomendas
          </span>

          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-5xl lg:text-6xl">
            O que você quer
            <span className="mt-1 block font-title italic font-normal text-[#9C521B]">
              encomendar hoje?
            </span>
          </h1>

          <p className="mt-5 text-base leading-8 text-[#482C1B]/70">
            Monte seu pedido em poucos passos. No fim, abrimos uma conversa no
            WhatsApp com todos os detalhes preenchidos — sem pagamento antecipado.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {options.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(72,44,27,0.1)] sm:min-h-[400px] sm:rounded-[2rem]"
            >
              <Image
                src={option.image}
                alt={option.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2B180F]/95 via-[#2B180F]/30 to-transparent" />

              <div className="relative p-6 text-white sm:p-8 lg:p-9">
                <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                  {option.title}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                  {option.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#F1DCC9]">
                  Começar
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
