import type { Metadata } from "next";
import TortasHero from "./TortasHero";
import TortasMenu from "./TortasMenu";
import TortasCta from "./TortasCta";

const description =
  "Conheça os 8 sabores de tortas da Bendita Banoffee: Banoffee, Cheese Cake, Uvanoffe, Choconoffe, Holandesa, Chocolate com Morango, Maçã com Canela e Limão. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Tortas | Bendita Banoffee",
  description,
  alternates: { canonical: "/tortas" },
  openGraph: {
    title: "Tortas | Bendita Banoffee",
    description,
    url: "/tortas",
    images: [{ url: "/images/banoffee.jpg", alt: "Torta de banoffee Bendita Banoffee" }],
  },
};

export default function TortasPage() {
  return (
    <>
      <TortasHero />
      <TortasMenu />
      <TortasCta />
    </>
  );
}
