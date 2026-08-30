"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
const catalogs = [
  {
    title: "Cestas de Café da Manhã",
    description:
      "Um presente afetivo para celebrar — montado à mão, com curadoria de sabores.",
    price: "Consulte tamanhos e valores",
    image: "/images/cestas/cesta-2.jpg",
    href: "/cestas",
  },
  {
    title: "Tortas",
    description:
      "8 sabores para aniversários, encontros e comemorações especiais.",
    price: "Consulte tamanhos e sabores",
    image: "/images/banoffee.jpg",
    href: "/tortas",
  },
];

export default function Catalogs() {
  return (
    <section
      id="catalogos"
      className="section-padding overflow-hidden bg-[#FEEFE1]"
    >
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

              <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
                Catálogos completos
              </span>
            </div>

            <h2 className="mt-5 max-w-2xl text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-6xl">
              Peça já a sua
              <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
                cesta ou torta favorita
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#482C1B]/65">
            Confira todos os sabores, o que vem em cada cesta e faça sua
            encomenda direto pelo WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6">
          {catalogs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(72,44,27,0.1)] sm:min-h-[420px] sm:rounded-[2rem]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2B180F]/95 via-[#2B180F]/30 to-transparent" />

                <div className="relative p-6 text-white sm:p-8 lg:p-9">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F1DCC9]">
                    {item.price}
                  </span>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#F1DCC9]">
                    Ver catálogo completo
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
