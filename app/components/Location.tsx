"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { site } from "../data/site";

export default function Location() {
  return (
    <section id="localizacao" className="section-padding bg-[#FEEFE1]">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[#482C1B] lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="p-8 text-white sm:p-12 lg:p-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F1DCC9]">
              Venha nos visitar
            </span>

            <h2 className="mt-5 text-5xl font-semibold leading-[0.95] sm:text-6xl">
              Um cantinho especial
              <span className="block italic text-[#F1DCC9]">
                esperando por você
              </span>
            </h2>

            <div className="mt-10 grid gap-7">
              <div className="flex gap-4">
                <MapPin
                  size={22}
                  className="mt-1 shrink-0 text-[#F1DCC9]"
                />

                <div>
                  <h3 className="font-semibold">Endereço</h3>

                  <p className="mt-2 text-sm leading-7 text-white/65">
                    {site.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3
                  size={22}
                  className="mt-1 shrink-0 text-[#F1DCC9]"
                />

                <div>
                  <h3 className="font-semibold">Horários</h3>

                  <div className="mt-2 text-sm leading-7 text-white/65">
                    {site.hours.map((hour) => (
                      <p key={hour}>{hour}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <MessageCircle
                  size={22}
                  className="mt-1 shrink-0 text-[#F1DCC9]"
                />

                <div>
                  <h3 className="font-semibold">Contato</h3>

                  <p className="mt-2 text-sm leading-7 text-white/65">
                    {site.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FEEFE1] px-6 py-4 font-bold text-[#482C1B] transition hover:bg-white"
              >
                Abrir rota
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 font-bold text-white transition hover:border-[#F1DCC9] hover:bg-white/10 hover:text-[#F1DCC9]"
              >
                <FaInstagram size={18} />
                Siga a Bendita
              </Link>
            </div>
          </motion.div>

          <div className="min-h-[480px] bg-[#F1DCC9]">
            <iframe
              title="Localização da Bendita Banoffee"
              src="https://www.google.com/maps?q=Travessa%20Angelo%20Lorencet%2027,%20Centro,%20Nova%20Prata%20RS&output=embed" 
              width="100%"
              height="100%"
              loading="lazy"
              className="min-h-[480px] border-0 grayscale-[0.25]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}