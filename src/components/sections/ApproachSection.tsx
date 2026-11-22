"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Pencil,
  Search,
  Target,
} from "lucide-react";
import { approachSteps, designerPortrait } from "@/data/portfolio";

function StepIcon({
  type,
  active,
}: {
  type: "search" | "target" | "pencil" | "check";
  active: boolean;
}) {
  const colorClass = active ? "text-[#10161C]" : "text-white/90";
  if (type === "search") {
    return <Search className={`h-6 w-6 ${colorClass}`} strokeWidth={1.7} />;
  }
  if (type === "target") {
    return <Target className={`h-6 w-6 ${colorClass}`} strokeWidth={1.7} />;
  }
  if (type === "pencil") {
    return <Pencil className={`h-6 w-6 ${colorClass}`} strokeWidth={1.7} />;
  }
  return <CheckCircle2 className={`h-6 w-6 ${colorClass}`} strokeWidth={1.7} />;
}

export default function ApproachSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStep = approachSteps[activeIndex];

  return (
    <section
      id="approach"
      className="relative overflow-hidden rounded-[28px] bg-[#0F131A] px-6 py-10 text-white sm:px-10 sm:py-12 lg:rounded-[36px] lg:px-14 lg:py-14"
    >
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Editorial Column */}
        <div className="flex flex-col justify-between lg:col-span-4 lg:pr-4">
          <div>
            {/* White 02 Index Marker */}
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-7 min-w-[38px] items-center justify-center rounded-full bg-white px-3 text-[11px] font-semibold tracking-wide text-[#0F131A] tabular-nums">
                02
              </span>
              <span className="text-[14px] font-medium tracking-[-0.01em] text-white/90">
                Double Diamond Process
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="mt-7 font-heading text-[2.65rem] font-bold leading-[1.03] tracking-[-0.035em] text-white sm:text-[3.2rem] xl:text-[3.5rem]">
              From messy{" "}
              <span className="text-[#C8BFFF]">problems</span> to clear
              solutions.
            </h2>

            {/* Clean Double Diamond Structure Summary */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-5 text-[12px]">
              <div>
                <p className="font-semibold text-white/90">
                  Diamond 01 · Problem
                </p>
                <p className="mt-0.5 text-[#8E98A8]">Discover → Define</p>
              </div>
              <div>
                <p className="font-semibold text-white/90">
                  Diamond 02 · Solution
                </p>
                <p className="mt-0.5 text-[#8E98A8]">Develop → Deliver</p>
              </div>
            </div>

            {/* Focused Active Step Detail */}
            <div className="mt-5 border-t border-white/[0.08] pt-5">
              <p className="text-[12.5px] font-medium text-[#C8BFFF] tabular-nums">
                {currentStep.number} · {currentStep.title} ({currentStep.mode})
              </p>
              <p className="mt-2.5 text-[14.5px] leading-[1.65] text-[#A2AAB8]">
                {currentStep.detail}
              </p>
              <ul className="mt-4 space-y-1.5 text-[13px] text-white/80">
                {currentStep.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#2CA884]" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-2">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-white transition-colors hover:text-[#C8BFFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8BFFF]"
            >
              See this process in case studies
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right 3-Column Portrait + Double Diamond 2x2 Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8 lg:gap-5">
          {/* Product Design Craft Column */}
          <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-[#191E28] sm:min-h-full lg:rounded-[28px]">
            <Image
              src={designerPortrait.src}
              alt={designerPortrait.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 26vw"
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-[#0B0E14]/25 via-35% to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
              <p className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">
                Product Craft
              </p>
              <p className="mt-1 text-[12.5px] text-white/75">
                Wireframes · Prototypes · London
              </p>
            </div>
          </div>

          {/* Interactive Double Diamond 4-Stage Grid */}
          <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-2 lg:gap-5">
            {approachSteps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group flex min-h-[220px] flex-col justify-between rounded-[24px] p-6 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8BFFF] lg:min-h-[240px] lg:rounded-[28px] lg:p-7 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-b from-[#D2C9FF] to-[#C2B6FF] text-[#10161C]"
                      : "border border-white/[0.06] bg-[#191E28] text-white hover:border-white/[0.12] hover:bg-[#1F2531]"
                  }`}
                >
                  <div className="flex w-full items-start justify-between">
                    <StepIcon type={step.icon} active={isActive} />
                    <span
                      className={`font-heading text-[22px] font-semibold leading-none tabular-nums ${
                        isActive ? "text-[#10161C]/20" : "text-white/20"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p
                      className={`text-[11.5px] font-medium ${
                        isActive ? "text-[#10161C]/65" : "text-[#8E98A8]"
                      }`}
                    >
                      {step.diamond} · {step.mode}
                    </p>
                    <h3
                      className={`mt-1 font-heading text-[22px] font-semibold tracking-[-0.02em] ${
                        isActive ? "text-[#10161C]" : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-[14px] leading-[1.55] ${
                        isActive ? "text-[#10161C]/80" : "text-[#9CA5B4]"
                      }`}
                    >
                      {step.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
