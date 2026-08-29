"use client";

import { Coffee, Cookie, Grape, Heart, UtensilsCrossed, Wine } from "lucide-react";
import { motion } from "framer-motion";
import { cestas } from "../data/site";

const icons = [Coffee, UtensilsCrossed, Grape, Cookie, Wine, Heart];

export default function CestasIncludes() {
  return (
    <section className="section-padding bg-[#FEEFE1]">
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

            <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
              O que compõe a sua cesta
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#482C1B] sm:text-5xl">
            Cada detalhe pensado
            <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
              para surpreender
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#482C1B]/65">
            O conteúdo pode variar conforme o tamanho e a ocasião — fale com a
            gente para montar a combinação ideal.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {cestas.includes.map((item, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
                className="group flex gap-4 rounded-[1.5rem] border border-[#482C1B]/10 bg-white p-6 shadow-[0_12px_35px_rgba(72,44,27,0.06)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#9C521B]/10 bg-[#F1DCC9] text-[#9C521B] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#482C1B] group-hover:text-[#F1DCC9]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#482C1B]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-7 text-[#482C1B]/65">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
