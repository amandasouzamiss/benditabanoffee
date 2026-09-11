"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventos } from "../data/site";

export default function EventosGallery() {
  return (
    <section className="section-padding overflow-hidden bg-[#F1DCC9]">
      <div className="container-site">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

          <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
            Já celebramos assim
          </span>
        </div>

        <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#482C1B] sm:text-5xl">
          Eventos que já
          <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
            passaram pela Bendita
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {eventos.gallery.map((image, index) => {
            const large = index === 0 || index === 3 || index === 7;

            return (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-[1.5rem] shadow-[0_16px_40px_rgba(72,44,27,0.12)] sm:rounded-[1.75rem] ${
                  large
                    ? "col-span-2 aspect-[16/10] sm:aspect-[16/9]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={image}
                  alt="Evento realizado pela Bendita Banoffee"
                  fill
                  sizes={
                    large
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
