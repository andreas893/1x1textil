import React from "react";
import CategorySection from "../components/CategorySection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import Mission from "../components/Mission";
import ArtistSection from "../components/ArtistSection";
import AboutSection from "../components/AboutSection";
import InspirationSection from "../components/InspirationSection";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-(--color-text)">
      <section className="hero grid grid-cols-2 border-b">
        <div className="p-12 h-full flex flex-col ">
          <h1 className="h1 pb-4">Dansk kunsthåndværk</h1>

          <p className="body-lg mt-auto">
            Håndplukket med fokus på form, materiale og sanselighed. Hvert
            stykke bærer sporene af de hænder, der har formet det. Vi samler
            kunstnere og materialer med karakter — ikke for at vise mere, men
            for at vise det rigtige.
          </p>

          <div className="flex gap-4">
            <button className="btn">Udforsk universet</button>
            <button className="btn">Mød kunsthåndværkerne</button>
          </div>
        </div>

        <div>
          <img
            src="/images/hero-forside.jpeg"
            alt="1+1 Textil - Butikshylde med keramik"
          />
        </div>
      </section>

      <CategorySection/>


      <FeaturedProductsSection />

      <Mission />

      <ArtistSection />

      <AboutSection />

      <InspirationSection />

    </div>
  );
}

export default HomePage;
