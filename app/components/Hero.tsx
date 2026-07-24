"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "../data/site";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#482C1B] pt-20 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Banoffee da Bendita Banoffee"
          fill
          priority
          className="object-cover opacity-55"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#482C1B] via-[#482C1B]/80 to-[#482C1B]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#482C1B] via-transparent to-transparent" />
      </div>

      <div className="container-site relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F1DCC9] backdrop-blur"
          >
            Nova Prata · RS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="max-w-3xl text-6xl font-semibold leading-[0.92] tracking-tight sm:text-7xl lg:text-[7.5rem]"
          >
            A Casa da
            <span className="block italic text-[#F1DCC9]">Banoffee</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href={site.ordersUrl}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-7 py-4 font-bold text-[#482C1B] transition hover:bg-white"
            >
              Fazer pedido
              <ArrowUpRight size={19} />
            </Link>

            <Link
              href="#sobre"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              Conhecer a Bendita
            </Link>
          </motion.div>
        </div>
      </div>

      <Link
        href="#sobre"
        aria-label="Ir para a próxima seção"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-white/60 md:flex"
      >
        Descubra
        <ArrowDown size={18} />
      </Link>
    </section>
 );
}