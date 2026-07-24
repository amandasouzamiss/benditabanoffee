"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "../data/site";

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="section-padding overflow-hidden bg-[#482C1B] text-white"
    >
      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F1DCC9]">
              Experiência Bendita
            </span>

            <h2 className="mt-5 text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              Seu momento merece
              <span className="block italic text-[#F1DCC9]">ser Bendito</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Um espaço acolhedor para encontrar amigos, conversar, comemorar ou
              simplesmente aproveitar um bom café acompanhado da sua sobremesa
              favorita.
            </p>

            <Link
              href={site.instagram}
              target="_blank"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#F1DCC9]/40 pb-2 font-bold text-[#F1DCC9] transition hover:border-[#F1DCC9]"
            >
              Acompanhe pelo Instagram
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative mt-16 aspect-[3/5] overflow-hidden rounded-[2rem]"
            >
              <Image
                src="/images/experience-1.jpg"
                alt="Ambiente da Bendita Banoffee"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="grid gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative aspect-square overflow-hidden rounded-[2rem]"
              >
                <Image
                  src="/images/experience-2.jpg"
                  alt="Café e sobremesa Bendita"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
              >
                <Image
                  src="/images/experience-3.jpg"
                  alt="Momentos na Bendita Banoffee"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}