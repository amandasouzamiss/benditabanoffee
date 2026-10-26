import type { Metadata } from "next";
import CestasHero from "./CestasHero";
import CestasIncludes from "./CestasIncludes";
import CestasGallery from "./CestasGallery";
import CestasCta from "./CestasCta";

const title = "Cesta de Café da Manhã em Nova Prata | Bendita Banoffee";

const description =
  "Cesta de café da manhã em Nova Prata, RS: um presente afetivo da Bendita Banoffee para aniversário, data romântica, agradecimento ou presente corporativo. Montada à mão, entregue a qualquer hora. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cestas" },
  openGraph: {
    title,
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
