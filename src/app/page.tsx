import Navbar from "@/components/layout/navbar";

import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import TechStack from "@/components/sections/tech-stack";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import About from "@/components/sections/about";

import Spotlight from "@/components/ui/spotlight";
import PageLoader from "@/components/ui/page-loader";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <PageLoader />

      <Navbar />

      <Hero />

      <Projects />

      <Services />

      <TechStack />

      <About />

      <CTA />

      <Footer />

      <Spotlight />
    </main>
  );
}