import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";

// Layout das páginas públicas do site (menu, rodapé e botão do WhatsApp).
// O painel de atendimento (/painel) usa um layout próprio.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">{children}</main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
