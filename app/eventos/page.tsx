import type { Metadata } from "next";
import EventosHero from "./EventosHero";
import EventosOptions from "./EventosOptions";
import EventosCta from "./EventosCta";

const description =
  "Faça seu evento com a Bendita Banoffee: no nosso espaço em Nova Prata ou no local da sua celebração. Aniversários, casamentos, formaturas e eventos corporativos. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Faça seu evento conosco | Bendita Banoffee",
  description,
  alternates: { canonical: "/eventos" },
  openGraph: {
    title: "Faça seu evento conosco | Bendita Banoffee",
    description,
    url: "/eventos",
    images: [
      { url: "/images/about.jpg", alt: "Espaço da Bendita Banoffee em Nova Prata" },
    ],
  },
};

export default function EventosPage() {
  return (
    <>
      <EventosHero />
      <EventosOptions />
      <EventosCta />
    </>
  );
}
