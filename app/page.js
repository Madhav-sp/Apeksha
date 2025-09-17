"use client";

import React from "react";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import InitiativesSection from "./components/Ourinitiatives";
import GallerySection from "./components/Gallery";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <main className="relative w-full bg-white">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="initiatives">
        <InitiativesSection />
      </section>
      <section id="gallery">
        <GallerySection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
