import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";

export default function Reviews() {
  return (
    <section className="section-padding bg-[#F1DCC9]">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#9C521B]">
            Quem vive, recomenda
          </span>

          <h2 className="mx-auto mt-5 max-w-xl text-5xl font-semibold leading-[1.02] text-[#482C1B] sm:text-6xl">
            Experiências que ficam na memória
          </h2>

          <p className="mt-7 text-base leading-8 text-[#482C1B]/70">
            As avaliações de quem já passou pela Bendita ficam no nosso perfil do
            Google. Se você também viveu um momento por aqui, deixe o seu
            recado — ele ajuda mais gente a conhecer a casa.
          </p>

          <Link
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#482C1B] px-7 py-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9C521B]"
          >
            Ver avaliações no Google
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
