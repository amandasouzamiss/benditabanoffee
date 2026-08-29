"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TortasCta() {
  return (
    <section className="section-padding bg-[#F1DCC9]">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 rounded-[2rem] bg-[#482C1B] px-7 py-14 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F1DCC9]">
            Vamos escolher a sua?
          </span>

          <h2 className="max-w-xl text-4xl font-semibold leading-[0.95] sm:text-5xl">
            Encomende sua torta
            <span className="block font-title italic font-normal text-[#F1DCC9]">
              para a próxima celebração
            </span>
          </h2>

          <p className="max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            Monte sua encomenda em poucos passos — sabor, tamanho, data e
            detalhes — e finalize a conversa pelo WhatsApp.
          </p>

          <Link
            href="/tortas/encomendar"
            className="group mt-2 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-7 py-4 font-bold text-[#482C1B] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Montar minha encomenda
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
