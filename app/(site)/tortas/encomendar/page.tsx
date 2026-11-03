import type { Metadata } from "next";
import TortaConfigurator from "./TortaConfigurator";

const description =
  "Monte sua encomenda de torta da Bendita Banoffee em poucos passos: escolha o sabor, o tamanho e a data de retirada. A confirmação é feita pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Encomendar torta | Bendita Banoffee",
  description,
  alternates: { canonical: "/tortas/encomendar" },
  openGraph: {
    title: "Encomendar torta | Bendita Banoffee",
    description,
    url: "/tortas/encomendar",
    images: [
      { url: "/images/banoffee.jpg", alt: "Torta de banoffee Bendita Banoffee" },
    ],
  },
};

export default function EncomendarTortaPage() {
  return <TortaConfigurator />;
}
