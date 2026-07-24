"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { site } from "../data/site";

export default function Location() {
  return (
    <section
      id="localizacao"
      className="section-padding overflow-hidden bg-[#FEEFE1]"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="grid overflow-hidden rounded-[2rem] bg-[#482C1B] shadow-[0_30px_80px_rgba(72,44,27,0.14)] sm:rounded-[2.5rem] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative p-7 text-white sm:p-12 lg:p-14 xl:p-16">
            <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[#F1DCC9]/10 blur-[100px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#F1DCC9]/60 sm:w-10" />

                <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#F1DCC9] sm:text-xs">
                  Venha nos visitar
                </span>
              </div>

              <h2 className="mt-5 max-w-xl text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                Um cantinho especial
                <span className="mt-2 block font-serif italic font-normal text-[#F1DCC9]">
                  esperando por você
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                Venha conhecer a Bendita, aproveitar nossos cafés, sobremesas
                artesanais e viver momentos especiais em um ambiente
                acolhedor.
              </p>

              <div className="mt-9 grid gap-6 sm:mt-10">
                <div className="group flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition group-hover:border-[#F1DCC9]/30 group-hover:bg-white/10">
                    <MapPin size={20} className="text-[#F1DCC9]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">Endereço</h3>

                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-white/60">
                      {site.address}
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition group-hover:border-[#F1DCC9]/30 group-hover:bg-white/10">
                    <Clock3 size={20} className="text-[#F1DCC9]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">Horários</h3>

                    <div className="mt-1.5 space-y-1 text-sm leading-6 text-white/60">
                      {site.hours.map((hour) => (
                        <p key={hour}>{hour}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {site.phone && (
                  <div className="group flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition group-hover:border-[#F1DCC9]/30 group-hover:bg-white/10">
                      <MessageCircle size={20} className="text-[#F1DCC9]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">Contato</h3>

                      <p className="mt-1.5 text-sm leading-6 text-white/60">
                        {site.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                <Link
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-6 py-4 font-bold text-[#482C1B] shadow-[0_16px_40px_rgba(20,10,5,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  <Navigation size={18} />

                  Abrir rota

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-6 py-4 font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#F1DCC9]/50 hover:bg-white/10 hover:text-[#F1DCC9]"
                >
                  <FaInstagram size={18} />
                  Siga a Bendita
                </Link>

                <Link
  href={site.whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  WhatsApp
</Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-[#F1DCC9] lg:min-h-full">
            <iframe
              title="Localização da Bendita Banoffee em Nova Prata"
              src={site.mapsEmbed}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="absolute inset-0 h-full min-h-[420px] w-full border-0 grayscale-[0.15] contrast-[0.95] lg:min-h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}