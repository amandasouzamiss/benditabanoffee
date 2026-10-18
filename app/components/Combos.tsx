"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { combos, site } from "../data/site";

// Dia da semana no horário de Nova Prata (0 = domingo).
function todayInBrazil() {
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
}

export default function Combos() {
  // Calculado só no navegador (no servidor é null) para não divergir do HTML gerado.
  const today = useSyncExternalStore(
    () => () => {},
    todayInBrazil,
    () => null,
  );

  return (
    <section
      id="combos"
      className="section-padding relative overflow-hidden bg-[#FEEFE1]"
    >
      {/* Elementos ilustrados da identidade visual */}
      <div aria-hidden="true" className="pointer-events-none hidden md:block">
        <Image
          src="/images/marca/coracao.png"
          alt=""
          width={216}
          height={240}
          className="h-auto absolute right-[6%] top-14 w-20 rotate-12 opacity-90 lg:w-24"
        />
        <Image
          src="/images/marca/colher.png"
          alt=""
          width={65}
          height={240}
          className="h-auto absolute right-[22%] top-10 w-8 rotate-[24deg] lg:w-10"
        />
        <Image
          src="/images/marca/grao-cafe.png"
          alt=""
          width={222}
          height={240}
          className="h-auto absolute bottom-10 left-[5%] w-14 rotate-[20deg] lg:w-16"
        />
        <Image
          src="/images/marca/chantilly.png"
          alt=""
          width={240}
          height={236}
          className="h-auto absolute bottom-8 right-[4%] w-20 lg:w-24"
        />
      </div>

      <div className="container-site relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#9C521B]/50 sm:w-10" />

              <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
                Combos da Semana
              </span>
            </div>

            <h2 className="mt-5 max-w-3xl text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-6xl lg:text-7xl">
              Todo dia tem
              <span className="mt-2 block font-title italic font-normal text-[#9C521B]">
                um motivo pra vir
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#482C1B]/65">
            Combos especiais durante a semana — cada um vale só no seu dia.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {combos.map((combo) => {
            const isToday = combo.weekday === today;

            return (
              <article
                key={combo.weekday}
                className={`relative flex flex-col rounded-[1.75rem] p-6 transition duration-300 sm:p-7 ${
                  isToday
                    ? "bg-[#482C1B] text-white shadow-[0_24px_60px_rgba(72,44,27,0.28)]"
                    : "bg-white/70 text-[#482C1B] shadow-[0_16px_40px_rgba(72,44,27,0.08)]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.3em] ${
                      isToday ? "text-[#F1DCC9]" : "text-[#9C521B]"
                    }`}
                  >
                    {combo.day}
                  </span>

                  {isToday && (
                    <span className="rounded-full bg-[#9C521B] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
                      Hoje
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-title text-3xl font-semibold leading-tight">
                  {combo.title}
                </h3>

                <p
                  className={`mt-3 flex-1 text-sm leading-7 ${
                    isToday ? "text-white/70" : "text-[#482C1B]/65"
                  }`}
                >
                  {combo.description}
                </p>

                {combo.hours && (
                  <p
                    className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${
                      isToday ? "text-[#F1DCC9]" : "text-[#9C521B]"
                    }`}
                  >
                    <Clock size={15} />
                    {combo.hours}
                  </p>
                )}

                {combo.price && (
                  <p className="mt-4 text-2xl font-bold tracking-[-0.02em]">
                    {combo.price}
                  </p>
                )}
              </article>
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
            Fazer pedido
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
