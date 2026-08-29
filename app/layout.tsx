import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const description =
  "Banoffees artesanais, cafés especiais, sobremesas e um ambiente acolhedor em Nova Prata.";

export const metadata: Metadata = {
  metadataBase: new URL("https://benditabanoffee.com.br"),
  title: "Bendita Banoffee | A Casa da Banoffee",
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Bendita Banoffee",
    title: "Bendita Banoffee | A Casa da Banoffee",
    description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1066,
        alt: "Banoffee artesanal da Bendita Banoffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bendita Banoffee | A Casa da Banoffee",
    description,
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <Navbar />

        <main className="overflow-x-hidden">{children}</main>

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
