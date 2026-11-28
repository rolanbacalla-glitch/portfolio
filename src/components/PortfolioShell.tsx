"use client";

import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import ProjectGrid from "@/components/sections/ProjectGrid";
import AboutContactSection from "@/components/sections/AboutContactSection";

export default function PortfolioShell() {
  const handleJumpToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#EAECEF] transition-colors duration-200 dark:bg-[#070A0E]">
      <main className="px-3 pt-3 sm:px-5 sm:pt-5 lg:px-7 lg:pt-7">
        <div className="mx-auto max-w-[1380px] space-y-5 lg:space-y-6">
          <HeroSection onSelectDiscipline={handleJumpToWork} />
          <ApproachSection />
          <ProjectGrid />
        </div>
      </main>

      <AboutContactSection />
    </div>
  );
}
