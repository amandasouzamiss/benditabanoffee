"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { highlights, site } from "../data/site";

export default function Highlights() {
  return (
    <section
      id="destaques"
      className="section-padding overflow-hidden bg-[#F1DCC9]"
    >
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

              <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
                Sabores Benditos
              </span>
            </div>

            <h2 className="mt-5 max-w-3xl text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-6xl lg:text-7xl">
              Escolhas para todos
              <span className="mt-2 block font-serif italic font-normal text-[#9C521B]">
                os seus momentos
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#482C1B]/65">
            Uma seleção dos principais sabores que fazem parte da experiência
            Bendita.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {highlights.map((item, index) => {
            const large = index === 0 || index === 3 || index === 5;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className={`group relative min-h-[380px] overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(72,44,27,0.1)] sm:min-h-[420px] sm:rounded-[2rem] ${
                  large ? "lg:col-span-7" : "lg:col-span-5"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    large
                      ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2B180F]/95 via-[#2B180F]/25 to-transparent" />

                <div className="absolute inset-0 bg-[#2B180F]/0 transition duration-500 group-hover:bg-[#2B180F]/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F1DCC9]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#F1DCC9] opacity-0 transition duration-300 group-hover:opacity-100">
                    Conhecer opções

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={site.ordersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#482C1B] px-7 py-4 text-center font-bold text-white shadow-[0_18px_40px_rgba(72,44,27,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9C521B]"
          >
            Ver opções e fazer pedido

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}