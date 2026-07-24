"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "../data/site";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[760px] overflow-hidden bg-[#482C1B] pt-20 text-white md:min-h-screen"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero.jpg"
          alt="Banoffee artesanal da Bendita Banoffee"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
        />
      </div>

      {/* Camadas de contraste */}
      <div className="absolute inset-0 -z-10 bg-[#2A160D]/30" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#321A0F]/95 via-[#482C1B]/75 to-[#482C1B]/10 md:from-[#321A0F]/95 md:via-[#482C1B]/70 md:to-transparent" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#321A0F] via-transparent to-[#321A0F]/20" />

      {/* Luz suave decorativa */}
      <div className="pointer-events-none absolute -left-28 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#F1DCC9]/10 blur-[120px]" />

      <div className="container-site flex min-h-[680px] items-center py-16 sm:py-20 md:min-h-[calc(100vh-5rem)]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: 0.1,
            delayChildren: 0.1,
          }}
          className="w-full max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#F1DCC9]/60 sm:w-12" />

            <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#F1DCC9] sm:text-xs">
              <MapPin size={14} strokeWidth={1.8} />
              Nova Prata · RS
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-[11ch] text-[3.8rem] font-semibold leading-[0.88] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8rem]"
          >
            A Casa da
            <span className="mt-2 block font-serif italic font-normal tracking-[-0.035em] text-[#F1DCC9] sm:mt-3">
              Banoffee
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:mt-8 sm:text-lg sm:leading-8"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <Link
              href={site.ordersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-7 py-4 font-bold text-[#482C1B] shadow-[0_18px_50px_rgba(30,15,8,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_60px_rgba(30,15,8,0.36)]"
            >
              Fazer pedido

              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              href="#localizacao"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 bg-white/[0.07] px-7 py-4 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15"
            >
              Ver localização
              <MapPin size={18} />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-9 flex items-center gap-3 text-sm text-white/55 sm:mt-10"
          >
            <span className="h-px w-8 bg-white/25" />
            Banoffees, cafés e momentos especiais
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <Link
          href="#sobre"
          aria-label="Conhecer a história da Bendita"
          className="flex flex-col items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/50 transition hover:text-white/80"
        >
          Descubra
          <ArrowDown size={18} />
        </Link>
      </motion.div>
    </section>
  );
}