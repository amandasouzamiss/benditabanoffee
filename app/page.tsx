import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Experience from "./components/Experience";
import Orders from "./components/Orders";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Highlights />
        <Experience />
        <Orders />
        <Reviews />
        <Location />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}