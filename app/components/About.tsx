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
      "Cada detalhe é preparado com cuidado para tornar sua experiência especial.",
  },
  {
    icon: UtensilsCrossed,
    title: "Ingredientes selecionados",
    description:
      "Receitas preparadas com qualidade, equilíbrio e muito sabor.",
  },  
  {
    icon: Sparkles,
    title: "Momentos inesquecíveis",
    description:
      "Um espaço pensado para encontros, conversas e boas lembranças.",
  },
];

export default function About() {
  return (
    <section
      id="sobre"
      className="section-padding overflow-hidden bg-[#FEEFE1]"
    >
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/about.jpg"
                alt="Experiência Bendita Banoffee"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-7 -right-3 hidden max-w-[250px] rounded-[1.75rem] bg-[#482C1B] p-7 text-white shadow-2xl sm:block">
              <span className="font-[var(--font-title)] text-5xl font-semibold text-[#F1DCC9]">
                Bendita
              </span>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Um lugar feito para saborear, compartilhar e viver bons
                momentos.
              </p>
            </div>

            <div className="absolute -left-12 top-16 hidden h-36 w-36 rounded-full border border-[#B27730]/30 lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#9C521B]">
              Nossa essência
            </span>

            <h2 className="mt-5 text-5xl font-semibold leading-[0.95] text-[#482C1B] sm:text-6xl lg:text-7xl">
              Feita para deixar
              <span className="block italic text-[#9C521B]">
                o seu dia mais doce
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#482C1B]/70 sm:text-lg">
              {site.about}
            </p>

            <div className="mt-10 grid gap-7">
              {qualities.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1DCC9] text-[#9C521B]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#482C1B]">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-7 text-[#482C1B]/65">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}