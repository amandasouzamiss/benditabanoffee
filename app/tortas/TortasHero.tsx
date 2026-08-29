"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { site, tortas } from "../data/site";

export default function TortasHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#482C1B] pb-20 pt-32 text-white sm:pb-24 sm:pt-40">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/banoffee.jpg"
          alt="Torta de banoffee Bendita Banoffee"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#321A0F]/95 via-[#482C1B]/85 to-[#482C1B]/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#321A0F] via-transparent to-[#321A0F]/10" />

      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#F1DCC9]/60 sm:w-10" />

            <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#F1DCC9] sm:text-xs">
              Tortas Benditas
            </span>
          </div>

          <h1 className="mt-5 text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Tortas para
            <span className="mt-2 block font-title italic font-normal text-[#F1DCC9]">
              celebrar cada momento
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            {tortas.length} sabores para aniversários, encontros e
            comemorações — cada torta preparada artesanalmente, com aquele
            cuidado que faz cada fatia ser especial.
          </p>

          <div className="mt-9">
            <Link
              href={site.tortasWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-7 py-4 font-bold text-[#482C1B] shadow-[0_18px_50px_rgba(30,15,8,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Encomendar pelo WhatsApp
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
