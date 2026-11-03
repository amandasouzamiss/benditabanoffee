import type { Metadata } from "next";
import TortasHero from "./TortasHero";
import TortasMenu from "./TortasMenu";
import TortasCta from "./TortasCta";

const title = "Tortas Artesanais em Nova Prata | Bendita Banoffee";

const description =
  "Tortas artesanais em Nova Prata, RS: 8 sabores da Bendita Banoffee — Banoffee, Cheese Cake, Uvanoffee, Choconoffee, Holandesa, Chocolate com Morango, Maçã com Canela e Limão. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tortas" },
  openGraph: {
    title,
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
