import type { Metadata } from "next";
import CestaConfigurator from "./CestaConfigurator";

const description =
  "Monte sua cesta de café da manhã da Bendita Banoffee: escolha a ocasião, o tamanho, os extras e como prefere receber. A confirmação é feita pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Encomendar cesta de café da manhã | Bendita Banoffee",
  description,
  alternates: { canonical: "/cestas/encomendar" },
  openGraph: {
    title: "Encomendar cesta de café da manhã | Bendita Banoffee",
    description,
    url: "/cestas/encomendar",
    images: [
      {
        url: "/images/cestas/cesta-1.jpg",
        alt: "Cesta de café da manhã Bendita Banoffee",
      },
    ],
  },
};

export default function EncomendarCestaPage() {
  return <CestaConfigurator />;
}
