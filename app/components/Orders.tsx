"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CakeSlice, Gift, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "../data/site";

const orderTypes = [
  {
    icon: CakeSlice,
    title: "Tortas inteiras",
    description:
      "Sabores especiais para aniversários, encontros e comemorações.",
  },
  {
    icon: PartyPopper,
    title: "Ocasiões especiais",
    description:
      "Sobremesas preparadas para tornar cada momento ainda mais marcante.",
  },
  {
    icon: Gift,
    title: "Presentes",
    description:
      "Opções especiais para surpreender alguém com muito sabor e carinho.",
  },
];

export default function Orders() {
  return (
    <section id="encomendas" className="section-padding bg-[#FEEFE1]">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#9C521B]">
          <div className="absolute inset-0">
            <Image
              src="/images/orders.jpg"
              alt="Encomendas Bendita Banoffee"
              fill
              className="object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#482C1B] via-[#482C1B]/90 to-[#9C521B]/40" />
          </div>

          <div className="relative z-10 grid gap-14 px-7 py-16 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F1DCC9]">
                Encomendas
              </span>

              <h2 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Um sabor especial
                <span className="block italic text-[#F1DCC9]">
                  para cada celebração
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-white/70">
                Encomende tortas, banoffees e sobremesas para aniversários,
                encontros, presentes e momentos que merecem ser celebrados.
              </p>

              <Link
                href={site.ordersUrl}
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#FEEFE1] px-7 py-4 font-bold text-[#482C1B] transition hover:bg-white"
              >
                Solicitar encomenda
                <ArrowUpRight size={19} />
              </Link>
            </motion.div>

            <div className="grid gap-4">
              {orderTypes.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                    }}
                    className="flex gap-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1DCC9] text-[#482C1B]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}