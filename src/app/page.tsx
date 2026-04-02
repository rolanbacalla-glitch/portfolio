import HeroSection from "@/components/sections/HeroSection";
import ProjectGrid from "@/components/sections/ProjectGrid";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="bg-noise">
      <HeroSection />
      <ProjectGrid />
      <AboutSection />
      <ContactSection />

      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-4 text-sm text-zinc-500 md:px-10">
        Rolan Bacalla — UX/UI Designer based in London.
      </footer>
    </main>
  );
}