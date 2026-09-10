"use client";

import { MapPin, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { eventos } from "../data/site";

const icons = [MapPin, Truck];

export default function EventosOptions() {
  return (
    <section className="section-padding bg-[#FEEFE1]">
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

            <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
              Como funciona
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#482C1B] sm:text-5xl">
            Duas formas de
            <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
              celebrar com a gente
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#482C1B]/65">
            Escolha o que faz mais sentido para o seu evento — a gente ajuda a
            montar dos dois jeitos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6">
          {eventos.options.map((item, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="group flex flex-col gap-4 rounded-[1.75rem] border border-[#482C1B]/10 bg-white p-7 shadow-[0_16px_45px_rgba(72,44,27,0.08)] sm:p-9"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#9C521B]/10 bg-[#F1DCC9] text-[#9C521B] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#482C1B] group-hover:text-[#F1DCC9]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#482C1B] sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-7 text-[#482C1B]/65">
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
