import type { Metadata } from "next";
import EventosHero from "./EventosHero";
import EventosOptions from "./EventosOptions";
import EventosGallery from "./EventosGallery";
import EventosCta from "./EventosCta";

const title = "Festas e Eventos em Nova Prata | Bendita Banoffee";

const description =
  "Festas e eventos em Nova Prata, RS: no espaço da Bendita Banoffee ou no local da sua celebração. Aniversários, casamentos, formaturas e eventos corporativos. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/eventos" },
  openGraph: {
    title,
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
