import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Catalogs from "./components/Catalogs";
import Experience from "./components/Experience";
import Orders from "./components/Orders";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import OutubroRosa from "./components/OutubroRosa";
import { site } from "./data/site";

export default function Home() {
  return (
    <>
      <Hero />
      {site.outubroRosa && <OutubroRosa />}
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
