"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Coffee,
  Lightbulb,
  Menu,
  Monitor,
  X,
} from "lucide-react";
import {
  COFFEE_BREAK_URL,
  heroDisciplines,
  type WorkCategory,
} from "@/data/portfolio";
import BrandLogo from "@/components/BrandLogo";

interface HeroSectionProps {
  onSelectDiscipline: (category: Exclude<WorkCategory, "All">) => void;
}

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

function DisciplineIcon({ type }: { type: "lightbulb" | "monitor" | "chart" }) {
  if (type === "lightbulb") {
    return <Lightbulb className="h-[22px] w-[22px]" strokeWidth={1.7} />;
  }
  if (type === "monitor") {
    return <Monitor className="h-[22px] w-[22px]" strokeWidth={1.7} />;
  }
  return <BarChart3 className="h-[22px] w-[22px]" strokeWidth={1.7} />;
}

export default function HeroSection({ onSelectDiscipline }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-[28px] bg-[#FAF8F5] px-6 py-7 text-[#10161C] shadow-[0_1px_3px_rgba(16,22,28,0.04)] sm:px-10 sm:py-10 lg:rounded-[36px] lg:px-14 lg:py-12"
    >
      {/* Top Bar inside Sheet 01 */}
      <header className="mb-10 flex items-center justify-between gap-6 lg:mb-12">
        {/* Brand Mark + Name Lockup */}
        <div className="inline-flex shrink-0 items-center gap-3.5">
          <BrandLogo />

          <a
            href="#top"
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CA884]"
            aria-label="Rolan Bacalla — Home"
          >
            <span className="font-heading text-[20px] font-semibold leading-none tracking-[0.04em] text-[#10161C] whitespace-nowrap">
              ROLAN
            </span>
            <span className="mt-1 text-[11px] font-medium leading-none tracking-[0.12em] text-[#6B7280] whitespace-nowrap">
              BACALLA
            </span>
          </a>
        </div>

        {/* Desktop Minimal Nav with × separators + Coffee Break Utility Pill */}
        <div className="hidden items-center gap-6 md:flex">
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-3.5 text-[14px] font-medium text-[#6B7280]"
          >
            {navItems.map((item, idx) => (
              <span key={item.href} className="inline-flex items-center gap-3.5">
                <a
                  href={item.href}
                  className="whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#10161C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CA884]"
                >
                  {item.label}
                </a>
                {idx < navItems.length - 1 && (
                  <span
                    className="text-[12px] text-[#B8BEC7] select-none"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                )}
              </span>
            ))}
          </nav>

          <a
            href={COFFEE_BREAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Coffee Break — open interactive mini-games in a new tab"
            className="group inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border border-[#D8D4CB] bg-white px-4 py-2 text-[13px] font-medium text-[#10161C] whitespace-nowrap transition-all duration-200 hover:border-[#10161C] hover:bg-[#0F171E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884]"
          >
            <Coffee
              className="h-3.5 w-3.5 text-[#1D7A5E] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-[#54D6AE]"
              aria-hidden="true"
            />
            <span>Coffee Break</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#6B7280] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Mobile Actions: Compact Coffee Break Pill + Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={COFFEE_BREAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Coffee Break — open interactive mini-games in a new window"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#D8D4CB] bg-white px-3.5 text-[12.5px] font-medium text-[#10161C] whitespace-nowrap transition-colors hover:border-[#10161C] hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884]"
          >
            <Coffee className="h-3.5 w-3.5 text-[#1D7A5E]" aria-hidden="true" />
            <span className="hidden min-[390px]:inline">Coffee Break</span>
            <span className="min-[390px]:hidden">Break</span>
            <ArrowUpRight
              className="h-3 w-3 text-[#6B7280]"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E1DA] bg-white text-[#10161C] transition-colors hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            aria-label="Mobile navigation"
            className="mb-8 flex flex-col gap-1 rounded-[20px] border border-[#E7E4DD] bg-white p-3 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-[#10161C] transition-colors hover:bg-[#FAF8F5]"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-1 border-t border-[#EAE7E0] pt-2">
              <a
                href={COFFEE_BREAK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Coffee Break — open interactive mini-games in a new tab"
                className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-4 py-3 text-[15px] font-medium text-[#10161C] transition-colors hover:bg-[#F2EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Coffee
                    className="h-4 w-4 text-[#1D7A5E]"
                    aria-hidden="true"
                  />
                  <span>Coffee Break</span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#6B7280]"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Split Content */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Editorial Column — Your Hero Content in the New Layout */}
        <div className="flex flex-col justify-center py-2 lg:col-span-5 lg:pr-4">
          <div>
            {/* Index Marker + Disciplines */}
            <div className="inline-flex flex-wrap items-center gap-3">
              <span className="inline-flex h-7 min-w-[38px] items-center justify-center rounded-full bg-[#10161C] px-3 text-[11px] font-semibold tracking-wide text-white tabular-nums">
                01
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#10161C]">
                UX/UI Designer · Product Thinking · Design Systems
              </span>
            </div>

            {/* Primary Display Headline — Preserving Your Hero Message */}
            <h1 className="mt-6 font-heading text-[2.5rem] font-extrabold leading-[1.03] tracking-[-0.04em] text-[#10161C] sm:text-[3.1rem] xl:text-[3.45rem]">
              Designing digital products that feel clear, useful, and{" "}
              <span className="text-[#2CA884]">beautifully resolved.</span>
            </h1>

            {/* Lead Copy */}
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.65] text-[#6B7280]">
              I’m Rolan Bacalla, a London-based UX/UI designer creating product
              experiences across audio, tools, and digital platforms — with a
              strong focus on usability, systems thinking, and polished
              interaction design.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0F171E] px-6 py-3.5 text-[13.5px] font-medium text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] whitespace-nowrap shrink-0"
              >
                View Projects
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="mailto:rolan.bacalla@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8D4CB] bg-white px-6 py-3.5 text-[13.5px] font-medium text-[#10161C] transition-colors duration-200 hover:border-[#10161C] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] whitespace-nowrap shrink-0"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Right 3-Column Vertical Visual Showcase Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7 lg:gap-4">
          {heroDisciplines.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectDiscipline(card.filterTarget)}
              className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#10161C] p-5 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] sm:min-h-[460px] lg:min-h-[520px] lg:rounded-[28px] lg:p-6 cursor-pointer"
            >
              {/* Full-bleed Background Visual */}
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 24vw"
                className={`object-cover object-center transition-transform duration-700 ease-out ${
                  card.zoomClass ?? "group-hover:scale-[1.05]"
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Measured Bottom Contrast Scrim */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05080B] via-[#05080B]/55 via-35% to-transparent"
                aria-hidden="true"
              />

              {/* Top-Left Circular Dark Icon */}
              <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#10161C]/95 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <DisciplineIcon type={card.icon} />
              </div>

              {/* Bottom Editorial Copy */}
              <div className="relative z-10 mt-auto pt-24">
                <h2 className="font-heading text-[22px] font-semibold leading-[1.12] tracking-[-0.02em] text-white xl:text-[24px]">
                  <span className="block">{card.titleTop}</span>
                  <span className="block">{card.titleBottom}</span>
                </h2>
                <p className="mt-2.5 max-w-[190px] text-[13px] leading-[1.45] text-white/75">
                  {card.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}