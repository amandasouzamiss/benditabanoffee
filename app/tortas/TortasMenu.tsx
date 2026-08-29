"use client";

import { CakeSlice } from "lucide-react";
import { motion } from "framer-motion";
import { tortas } from "../data/site";

export default function TortasMenu() {
  return (
    <section className="section-padding bg-[#FEEFE1]">
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

            <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
              Nosso cardápio
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#482C1B] sm:text-5xl">
            Escolha o seu
            <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
              sabor favorito
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
          {tortas.map((torta, index) => (
            <motion.div
              key={torta.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: "easeOut" }}
              className="group flex items-start justify-between gap-6 rounded-[1.5rem] border border-[#482C1B]/10 bg-white p-7 shadow-[0_12px_35px_rgba(72,44,27,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(72,44,27,0.12)]"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9C521B]/10 bg-[#F1DCC9] text-[#9C521B] transition duration-300 group-hover:bg-[#482C1B] group-hover:text-[#F1DCC9]">
                  <CakeSlice size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#482C1B] sm:text-2xl">
                    {torta.name}
                  </h3>

                  <p className="mt-1.5 max-w-sm text-sm leading-7 text-[#482C1B]/65">
                    {torta.description}
                  </p>
                </div>
              </div>

              <span className="shrink-0 whitespace-nowrap font-title text-xl font-semibold text-[#9C521B] sm:text-2xl">
                {torta.price}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-sm leading-7 text-[#482C1B]/55">
          Preços referentes à torta inteira. Consulte tamanhos e opções
          personalizadas para o seu evento.
        </p>
      </div>
    </section>
  );
}
