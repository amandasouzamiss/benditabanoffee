import type { Metadata } from "next";
import EventoConfigurator from "./EventoConfigurator";

const description =
  "Monte o seu evento com a Bendita Banoffee: tipo de evento, local, data, número de convidados e o que você imagina. A confirmação é feita pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Encomendar evento | Bendita Banoffee",
  description,
  alternates: { canonical: "/eventos/encomendar" },
  openGraph: {
    title: "Encomendar evento | Bendita Banoffee",
    description,
    url: "/eventos/encomendar",
    images: [
      { url: "/images/about.jpg", alt: "Espaço da Bendita Banoffee em Nova Prata" },
    ],
  },
};

export default function EncomendarEventoPage() {
  return <EventoConfigurator />;
}
