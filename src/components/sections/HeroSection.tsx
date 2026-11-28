"use client";

import { ArrowUpRight, Coffee } from "lucide-react";
import {
  COFFEE_BREAK_URL,
  heroDisciplines,
  type WorkCategory,
} from "@/data/portfolio";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import HeroDisciplineCard from "@/components/sections/HeroDisciplineCard";

interface HeroSectionProps {
  onSelectDiscipline: (category: Exclude<WorkCategory, "All">) => void;
}

export default function HeroSection({ onSelectDiscipline }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-[28px] bg-[#FAF8F5] px-6 py-7 text-[#10161C] shadow-[0_1px_3px_rgba(16,22,28,0.04)] transition-colors duration-200 dark:border dark:border-white/[0.07] dark:bg-[#11161F] dark:text-[#F4F6F9] dark:shadow-none sm:px-10 sm:py-10 lg:rounded-[36px] lg:px-14 lg:py-12"
    >
      {/* Top Bar inside Sheet 01 */}
      <header className="mb-10 flex items-center justify-between gap-4 sm:gap-6 lg:mb-12">
        {/* Brand Mark + Name Lockup */}
        <div className="inline-flex shrink-0 items-center gap-3.5">
          <BrandLogo />

          <a
            href="#top"
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CA884] dark:focus-visible:outline-[#54D6AE]"
            aria-label="Rolan Bacalla — Home"
          >
            <span className="font-heading text-[20px] font-semibold leading-none tracking-[0.04em] text-[#10161C] transition-colors duration-200 dark:text-[#F4F6F9] whitespace-nowrap">
              ROLAN
            </span>
            <span className="mt-1 text-[11px] font-medium leading-none tracking-[0.12em] text-[#6B7280] transition-colors duration-200 dark:text-[#9CA6B5] whitespace-nowrap">
              BACALLA
            </span>
          </a>
        </div>

        {/* Header Actions: Coffee Break Pill + Theme Switch */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href={COFFEE_BREAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Coffee Break — open interactive mini-games in a new tab"
            className="group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#D8D4CB] bg-white px-3.5 text-[12.5px] font-medium text-[#10161C] whitespace-nowrap transition-all duration-200 hover:border-[#10161C] hover:bg-[#0F171E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:border-white/15 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:border-[#54D6AE]/60 dark:hover:bg-[#232D3F] dark:hover:text-white dark:focus-visible:outline-[#54D6AE] sm:gap-2 sm:px-4 sm:text-[13px]"
          >
            <Coffee
              className="h-3.5 w-3.5 text-[#1D7A5E] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-[#54D6AE] dark:text-[#54D6AE]"
              aria-hidden="true"
            />
            <span className="hidden min-[380px]:inline">Coffee Break</span>
            <span className="min-[380px]:hidden">Break</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#6B7280] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80 dark:text-[#9CA6B5]"
              aria-hidden="true"
            />
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Hero Split Content */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Editorial Column — Your Hero Content in the New Layout */}
        <div className="flex flex-col justify-center py-2 lg:col-span-5 lg:pr-4">
          <div>
            {/* Index Marker + Disciplines */}
            <div className="inline-flex flex-wrap items-center gap-3">
              <span className="inline-flex h-7 min-w-[38px] items-center justify-center rounded-full bg-[#10161C] px-3 text-[11px] font-semibold tracking-wide text-white tabular-nums dark:bg-[#F4F6F9] dark:text-[#0F131A]">
                01
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#10161C] dark:text-[#F4F6F9]">
                UX/UI Designer · Product Thinking · Design Systems
              </span>
            </div>

            {/* Primary Display Headline — Preserving Your Hero Message */}
            <h1 className="mt-6 font-heading text-[2.5rem] font-extrabold leading-[1.03] tracking-[-0.04em] text-[#10161C] dark:text-[#F4F6F9] sm:text-[3.1rem] xl:text-[3.45rem]">
              Designing digital products that feel clear, useful, and{" "}
              <span className="text-[#2CA884] dark:text-[#54D6AE]">
                beautifully resolved.
              </span>
            </h1>

            {/* Lead Copy */}
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.65] text-[#6B7280] dark:text-[#9CA6B5]">
              I’m Rolan Bacalla, a London-based UX/UI designer creating product
              experiences across audio, tools, and digital platforms — with a
              strong focus on usability, systems thinking, and polished
              interaction design.
            </p>
          </div>
        </div>

        {/* Right 3-Column Vertical Visual Showcase Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7 lg:gap-4">
          {heroDisciplines.map((card) => (
            <HeroDisciplineCard
              key={card.id}
              card={card}
              onSelectDiscipline={onSelectDiscipline}
            />
          ))}
        </div>
      </div>
    </section>
  );
}