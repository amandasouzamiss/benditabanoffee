"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { highlights, site } from "../data/site";

export default function Highlights() {
  return (
    <section id="destaques" className="section-padding bg-[#F1DCC9]">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#9C521B]">
              Sabores Benditos
            </span>

            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] text-[#482C1B] sm:text-6xl lg:text-7xl">
              Escolhas para todos
              <span className="block italic text-[#9C521B]">
                os seus momentos
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#482C1B]/65">
            Uma seleção dos principais sabores que fazem parte da experiência
            Bendita.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {highlights.map((item, index) => {
            const large = index === 0 || index === 3;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] ${
                  large ? "lg:col-span-7" : "lg:col-span-5"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2B180F] via-[#2B180F]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F1DCC9]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-3 text-4xl font-semibold">{item.title}</h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={site.ordersUrl}
            className="inline-flex items-center gap-3 rounded-full bg-[#482C1B] px-7 py-4 font-bold text-white transition hover:bg-[#9C521B]"
          >
            Ver opções e fazer pedido
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}