import type { Metadata } from "next";
import CestasHero from "./CestasHero";
import CestasIncludes from "./CestasIncludes";
import CestasGallery from "./CestasGallery";
import CestasCta from "./CestasCta";

const description =
  "Cestas de café da manhã montadas à mão pela Bendita Banoffee, com pães, frios, queijos, frutas frescas e mimos especiais. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Cestas de Café da Manhã | Bendita Banoffee",
  description,
  alternates: { canonical: "/cestas" },
  openGraph: {
    title: "Cestas de Café da Manhã | Bendita Banoffee",
    description,
    url: "/cestas",
    images: [{ url: "/images/cestas/cesta-1.jpg", alt: "Cesta de café da manhã Bendita Banoffee" }],
  },
};

export default function CestasPage() {
  return (
    <>
      <CestasHero />
      <CestasIncludes />
      <CestasGallery />
      <CestasCta />
    </>
  );
}
