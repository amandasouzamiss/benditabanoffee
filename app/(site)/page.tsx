import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Highlights from "@/app/components/Highlights";
import Catalogs from "@/app/components/Catalogs";
import Experience from "@/app/components/Experience";
import Orders from "@/app/components/Orders";
import Reviews from "@/app/components/Reviews";
import Location from "@/app/components/Location";
import OutubroRosa from "@/app/components/OutubroRosa";
import Halloween from "@/app/components/Halloween";
import Combos from "@/app/components/Combos";
import { site } from "@/app/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      {site.outubroRosa && <OutubroRosa />}
      {site.halloween && <Halloween />}
      <Combos />
      <About />
      <Highlights />
      <Catalogs />
      <Experience />
      <Orders />
      <Reviews />
      <Location />
    </>
  );
}
