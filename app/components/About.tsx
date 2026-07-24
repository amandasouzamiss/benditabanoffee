"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, UtensilsCrossed } from "lucide-react";
import { site } from "../data/site";

const qualities = [
  {
    icon: Heart,
    title: "Feito com carinho",
    description:
      "Cada receita e cada detalhe são preparados com cuidado para tornar sua experiência especial.",
  },
  {
    icon: UtensilsCrossed,
    title: "Ingredientes selecionados",
    description:
      "Produtos escolhidos com atenção para criar sabores equilibrados e sobremesas inesquecíveis.",
  },
  {
    icon: Sparkles,
    title: "Momentos especiais",
    description:
      "Um espaço acolhedor para encontros, pausas, conversas e boas lembranças.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function About() {
  return (
    <section
      id="sobre"
      className="section-padding relative overflow-hidden bg-[#FEEFE1]"
    >
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-[#F1DCC9]/70 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#B27730]/[0.06] blur-[140px]" />

      <div className="container-site relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24 xl:gap-32">
          {/* Imagens */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl lg:mx-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(72,44,27,0.14)] sm:rounded-[2.5rem]">
              <Image
                src="/images/about.jpg"
                alt="Ambiente acolhedor da Bendita Banoffee"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition duration-700 hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#321A0F]/35 via-transparent to-transparent" />
            </div>

            {/* Selo sobreposto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative -mt-10 ml-auto mr-4 max-w-[270px] rounded-[1.75rem] bg-[#482C1B] p-6 text-white shadow-[0_25px_60px_rgba(72,44,27,0.28)] sm:absolute sm:-bottom-8 sm:-right-7 sm:mt-0 sm:mr-0 sm:p-7"
            >
              <span className="font-[var(--font-title)] text-4xl font-semibold text-[#F1DCC9] sm:text-5xl">
                Bendita
              </span>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Um lugar feito para saborear, compartilhar e viver bons
                momentos.
              </p>
            </motion.div>

            {/* Detalhe circular */}
            <div className="pointer-events-none absolute -left-12 top-14 hidden h-36 w-36 rounded-full border border-[#B27730]/25 lg:block" />
            <div className="pointer-events-none absolute -left-5 top-28 hidden h-3 w-3 rounded-full bg-[#B27730] lg:block" />
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              staggerChildren: 0.1,
              delayChildren: 0.05,
            }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

              <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
                Nossa essência
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-5 max-w-3xl text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-6xl lg:text-[4.4rem]"
            >
              Feita para deixar
              <span className="mt-2 block font-serif italic font-normal text-[#9C521B]">
                o seu dia mais doce
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-7 max-w-xl text-base leading-8 text-[#482C1B]/70 sm:mt-8 sm:text-lg"
            >
              {site.about}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-9 h-px w-full max-w-xl bg-[#482C1B]/10"
            />

            <div className="mt-9 grid gap-7 sm:mt-10">
              {qualities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    className="group flex gap-4 sm:gap-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#9C521B]/10 bg-[#F1DCC9] text-[#9C521B] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#482C1B] group-hover:text-[#F1DCC9]">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#482C1B] sm:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 max-w-lg text-sm leading-7 text-[#482C1B]/65">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}