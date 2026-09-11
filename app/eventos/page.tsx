import type { Metadata } from "next";
import EventosHero from "./EventosHero";
import EventosOptions from "./EventosOptions";
import EventosGallery from "./EventosGallery";
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
      {
        url: "/images/eventos/evento-3.jpg",
        alt: "Evento realizado pela Bendita Banoffee",
      },
    ],
  },
};

export default function EventosPage() {
  return (
    <>
      <EventosHero />
      <EventosOptions />
      <EventosGallery />
      <EventosCta />
    </>
  );
}
