"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Layers,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Speaker,
  Volume2,
  X,
} from "lucide-react";

export type PopoutPillar =
  | "All"
  | "Cambridge Audio"
  | "FinTech & SaaS"
  | "Web & Editorial"
  | "Brand & Spatial";

export interface PopoutWorkItem {
  id: string;
  title: string;
  pillar: Exclude<PopoutPillar, "All">;
  badge: string;
  metrics?: string[];
  summary: string;
  roleNote: string;
  dimensions: string;
  aspectNote: string;
  stageTone: "dark" | "light" | "hardware";
  palette: string[];
  sourceFiles: { name: string; dimensions: string; href: string }[];
  assetHref: string;
  hasHardwarePreview?: boolean;
  flowSteps?: { step: string; title: string; detail: string }[];
}

const POPOUT_WORKS: PopoutWorkItem[] = [
  {
    id: "cambridge-audio-ecosystem",
    title: "Cambridge Audio — Connected Hi-Fi Ecosystem",
    pillar: "Cambridge Audio",
    badge: "8 Merged Boards · Hardware + Mobile",
    metrics: ["90% Task Completion", "+25% Setup Speed", "-15% Source Friction"],
    summary:
      "End-to-end UX research (UK personas & journey maps), StreamMagic & Melomania Connect companion apps, and EVO 150 / CXN / EXN front-panel OLED/LCD display UI unified under one interaction model.",
    roleNote: "Lead Product Designer · Research, Companion UX & Embedded Display UI",
    dimensions: "11524 × 1388 / 2211 × 7236",
    aspectNote: "Panoramic 18-screen flow + vertical hardware states",
    stageTone: "hardware",
    palette: ["#141619", "#D4A359", "#60A5FA", "#EC4899"],
    hasHardwarePreview: true,
    flowSteps: [
      {
        step: "01",
        title: "Melomania Personas & Journey",
        detail: "3 UK listener archetypes (Alex, Sarah, Jake) mapped across M100/P100/A100.",
      },
      {
        step: "02",
        title: "StreamMagic 18-Screen Onboarding",
        detail: "Zero-IP Wi-Fi handshake and guided source pairing on dark mobile surfaces.",
      },
      {
        step: "03",
        title: "EVO 150 / CXN / EXN Display Sync",
        detail: "3-metre glanceable OLED states controlled via dual-concentric rotary dial.",
      },
    ],
    sourceFiles: [
      { name: "Media Streamers.png", dimensions: "3860 × 4254", href: "#" },
      { name: "StreamMagic (Look & Feel V2).jpg", dimensions: "11524 × 1388", href: "#" },
      { name: "EVO 150 display UI layout.png", dimensions: "2211 × 7236", href: "#" },
      { name: "CA design final.png", dimensions: "4269 × 3748", href: "#" },
      { name: "Input source.png", dimensions: "3744 × 4272", href: "#" },
      { name: "Melomania (Look & Feel).jpg", dimensions: "5293 × 3022", href: "#" },
      { name: "Melomania Connect – User personas.jpg", dimensions: "3260 × 2770", href: "#" },
      { name: "Melomania Connect – Journey map.jpg", dimensions: "4100 × 2704", href: "#" },
    ],
    assetHref: "#",
  },
  {
    id: "apex-strategist",
    title: "Apex Strategist — Crypto Portfolio & Risk App",
    pillar: "FinTech & SaaS",
    badge: "12 Dark-Mode Screens · Case Study",
    metrics: ["+25% Adoption", "-40% Friction", "8.5/10 UX", "+15% Conversion"],
    summary:
      "Rules-based mobile crypto portfolio experience replacing exchange clutter with Trade Advisor guardrails, automated Allocation Rules, and actionable Risk Alerts.",
    roleNote: "Lead Product Designer · Strategy, IA & Mobile UI",
    dimensions: "5620 × 3781",
    aspectNote: "Case study column + 12 mobile screens",
    stageTone: "dark",
    palette: ["#0D0F14", "#818CF8", "#34D399", "#F59E0B"],
    flowSteps: [
      {
        step: "01",
        title: "Portfolio Balance & Drift",
        detail: "Tabular GBP balance (£59,234.56) and health score without chart overload.",
      },
      {
        step: "02",
        title: "Trade Advisor Guardrails",
        detail: "Plain-English rationale and pre-trade risk preview driving 8.5/10 trust.",
      },
      {
        step: "03",
        title: "Allocation Rules & Alerts",
        detail: "One-tap rebalance triggers cutting execution friction by 40%.",
      },
    ],
    sourceFiles: [
      { name: "Apex Strategist App - Crypto.png", dimensions: "5620 × 3781", href: "#" },
    ],
    assetHref: "#",
  },
  {
    id: "smartcharge-ev",
    title: "SmartCharge — Home EV Charging Ecosystem",
    pillar: "FinTech & SaaS",
    badge: "8 Mobile + 3 Desktop SaaS",
    metrics: ["11 Synced Screens", "Off-Peak Automation", "Cross-Platform"],
    summary:
      "Cross-platform EV charging product pairing departure-time mobile scheduling with a desktop SaaS billing, kWh analytics, and tariff management workspace.",
    roleNote: "Senior Product Designer · Cross-Platform UX & Responsive UI",
    dimensions: "8220 × 3250",
    aspectNote: "Wide panoramic cross-platform board (2.5:1)",
    stageTone: "light",
    palette: ["#F8FAFC", "#2563EB", "#10B981", "#0F172A"],
    sourceFiles: [
      { name: "Home EV charging.png", dimensions: "8220 × 3250", href: "#" },
    ],
    assetHref: "#",
  },
  {
    id: "design-system-spec",
    title: "Multi-Platform Design System & Token Library",
    pillar: "FinTech & SaaS",
    badge: "Tokens · Components · WCAG 2.2 AA",
    metrics: ["3-Tier Tokens", "Light & Dark Parity", "Figma-to-Code"],
    summary:
      "Full component and token architecture specification spanning typography, semantic surfaces, accessible states, and scalable engineering hand-off.",
    roleNote: "Principal Design Systems Designer",
    dimensions: "1676 × 9548",
    aspectNote: "Ultra-tall vertical specification (1:5.7)",
    stageTone: "light",
    palette: ["#FFFFFF", "#2563EB", "#2CA884", "#0F172A"],
    sourceFiles: [{ name: "Design System.png", dimensions: "1676 × 9548", href: "#" }],
    assetHref: "#",
  },
  {
    id: "checkout-flow",
    title: "E-Commerce Checkout Flow Improvements",
    pillar: "FinTech & SaaS",
    badge: "7-Screen Conversion Flow",
    summary:
      "Streamlined 7-screen mobile checkout reducing form friction with progressive disclosure, clear shipping tiers, and high-trust payment confirmation.",
    roleNote: "Product Designer · Conversion Optimisation",
    dimensions: "3930 × 2145",
    aspectNote: "Landscape 7-screen flow board",
    stageTone: "light",
    palette: ["#FFFFFF", "#2563EB", "#0F172A", "#10B981"],
    sourceFiles: [
      { name: "Checkout Flow improvements.png", dimensions: "3930 × 2145", href: "#" },
    ],
    assetHref: "#",
  },
  {
    id: "web-dashboards",
    title: "Atom Ledger & Atelier SaaS Dashboards",
    pillar: "FinTech & SaaS",
    badge: "5 Dashboard Explorations",
    summary:
      "High-density fintech and executive workspace dashboards exploring dark card telemetry, transaction ledgers, and performance architecture.",
    roleNote: "Product Designer · Data Visualisation",
    dimensions: "7777 × 2057",
    aspectNote: "Ultra-wide panoramic strip (3.8:1)",
    stageTone: "dark",
    palette: ["#0D0F14", "#10B981", "#3B82F6", "#F8FAFC"],
    sourceFiles: [{ name: "Dashboards.png", dimensions: "7777 × 2057", href: "#" }],
    assetHref: "#",
  },
  {
    id: "roam-together",
    title: "Roam Together — Collaborative Travel App",
    pillar: "FinTech & SaaS",
    badge: "Consumer Mobile · Maps",
    summary:
      "Group travel itinerary app combining curated destination cards, shared trip planning, and integrated map views in a warm orange-and-white palette.",
    roleNote: "Product Designer · Mobile UX/UI",
    dimensions: "2355 × 3145",
    aspectNote: "Portrait mobile showcase",
    stageTone: "light",
    palette: ["#FFFFFF", "#F97316", "#1E293B", "#FEF3C7"],
    sourceFiles: [{ name: "Roam Together.png", dimensions: "2355 × 3145", href: "#" }],
    assetHref: "#",
  },
  {
    id: "lyssnup-music-player",
    title: "LyssnUP — Desktop & Tablet Music Player",
    pillar: "Cambridge Audio",
    badge: "Dual-Mode Audio Concept",
    summary:
      "Desktop and tablet streaming player rendered in obsidian dark and studio-grey modes with an album cover-flow carousel and tactile playback controls.",
    roleNote: "Product Designer · Audio UI Exploration",
    dimensions: "6341 × 2523",
    aspectNote: "Wide dual-theme board (2.5:1)",
    stageTone: "dark",
    palette: ["#18181B", "#52525B", "#F97316", "#FAFAFA"],
    sourceFiles: [{ name: "Music player.jpg", dimensions: "6341 × 2523", href: "#" }],
    assetHref: "#",
  },
  {
    id: "cody-philips",
    title: "Cody.Philips — Executive Recruitment Website",
    pillar: "Web & Editorial",
    badge: "Multi-Page Executive Web",
    summary:
      "Editorial executive search website pairing refined serif headlines ('Refined Talent Architecture') with deep royal purple and warm gold accents.",
    roleNote: "Lead Web & Brand Designer",
    dimensions: "4060 × 3939",
    aspectNote: "Near-square multi-page layout",
    stageTone: "light",
    palette: ["#2E1065", "#D97706", "#FFFFFF", "#F8FAFC"],
    sourceFiles: [
      { name: "Cody.Philips - Website.png", dimensions: "4060 × 3939", href: "#" },
    ],
    assetHref: "#",
  },
  {
    id: "landing-pages",
    title: "Wealth & SaaS Marketing Landing Pages",
    pillar: "Web & Editorial",
    badge: "Conversion Web Layouts",
    summary:
      "Full-length marketing pages contrasting a dark wealth-management site ('Command your financial universe') with a crisp light-mode SaaS platform.",
    roleNote: "Web Designer · Conversion Storytelling",
    dimensions: "2981 × 5366",
    aspectNote: "Tall vertical full-page layouts (1:1.8)",
    stageTone: "dark",
    palette: ["#0B0F19", "#6366F1", "#2563EB", "#FFFFFF"],
    sourceFiles: [{ name: "Landing pages.png", dimensions: "2981 × 5366", href: "#" }],
    assetHref: "#",
  },
  {
    id: "hozah-brand",
    title: "Hozah — Ticketless Parking Brand & Spatial Identity",
    pillar: "Brand & Spatial",
    badge: "Identity · Booth · Print · Merch",
    summary:
      "Complete brand identity ('Drive in. Park. Walk away.') covering 3 logo explorations, HOZAH.com visual language, exhibition booths, flyers, stationery, and merch.",
    roleNote: "Brand & Identity Designer",
    dimensions: "5799 × 2759",
    aspectNote: "Wide brand collateral collage (19.7 MB)",
    stageTone: "dark",
    palette: ["#0F172A", "#0D9488", "#84CC16", "#FFFFFF"],
    sourceFiles: [{ name: "Hozah.png", dimensions: "5799 × 2759", href: "#" }],
    assetHref: "#",
  },
];

const PILLARS: { id: PopoutPillar; label: string; count: number }[] = [
  { id: "All", label: "All Works", count: 18 },
  { id: "Cambridge Audio", label: "Audio & Hardware", count: 9 },
  { id: "FinTech & SaaS", label: "FinTech, EV & Systems", count: 6 },
  { id: "Web & Editorial", label: "Web & Editorial", count: 2 },
  { id: "Brand & Spatial", label: "Brand & Spatial", count: 1 },
];

const MINI_HARDWARE_STATES = [
  {
    id: "now-playing",
    label: "Now Playing",
    model: "EVO 150",
    title: "Midnight Architecture",
    sub: "Nils Frahm · TIDAL Connect · 24-bit/192kHz",
    level: 64,
    accent: "#D4A359",
  },
  {
    id: "source",
    label: "Input Source",
    model: "CXN100",
    title: "HDMI ARC · Active",
    sub: "Rotary selector · 3m living-room legibility",
    level: 52,
    accent: "#54D6AE",
  },
  {
    id: "volume",
    label: "Volume Dial",
    model: "EXN100",
    title: "-24.0 dB",
    sub: "Synced with StreamMagic mobile slider",
    level: 72,
    accent: "#60A5FA",
  },
];

interface VisualArchivePopoutProps {
  isOpen: boolean;
  onClose: () => void;
  initialPillar?: PopoutPillar;
}

export default function VisualArchivePopout({
  isOpen,
  onClose,
  initialPillar = "All",
}: VisualArchivePopoutProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activePillar, setActivePillar] = useState<PopoutPillar>(initialPillar);
  const [selectedWork, setSelectedWork] = useState<PopoutWorkItem | null>(null);
  const [stageMode, setStageMode] = useState<"auto" | "dark" | "light">("auto");
  const [hwStateIdx, setHwStateIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedWork) {
          setSelectedWork(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, selectedWork]);

  const filteredWorks =
    activePillar === "All"
      ? POPOUT_WORKS
      : POPOUT_WORKS.filter((item) => item.pillar === activePillar);

  const activeHw = MINI_HARDWARE_STATES[hwStateIdx] ?? MINI_HARDWARE_STATES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="visual-archive-popout-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F131A]/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-[#D8D4CB] bg-[#FAF8F5] text-[#10161C] shadow-2xl dark:border-white/10 dark:bg-[#11161F] dark:text-[#F4F6F9]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popout Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[#D8D4CB] bg-[#FAF8F5] px-5 py-4 dark:border-white/10 dark:bg-[#11161F] sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                {selectedWork ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedWork(null);
                      setStepIdx(0);
                    }}
                    className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-[#D8D4CB] bg-white px-4 text-xs font-semibold text-[#10161C] transition-colors hover:border-[#10161C] focus-visible:outline-2 focus-visible:outline-[#2CA884] focus-visible:outline-offset-2 dark:border-white/15 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:border-white/35"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    All 18 Works
                  </button>
                ) : (
                  <span className="inline-flex h-7 items-center rounded-full bg-[#0F131A] px-3 font-mono text-[11px] font-semibold tabular-nums text-white dark:bg-[#F4F6F9] dark:text-[#0F131A]">
                    ARCHIVE · 18
                  </span>
                )}
                <div>
                  <h2
                    id="visual-archive-popout-title"
                    className="font-heading text-lg font-bold tracking-[-0.02em] text-[#10161C] dark:text-[#F4F6F9] sm:text-xl"
                  >
                    {selectedWork ? selectedWork.title : "Selected Visual Archive"}
                  </h2>
                  {!selectedWork && (
                    <p className="hidden text-xs text-[#6B7280] dark:text-[#9CA6B5] sm:block">
                      Hardware-to-cloud ecosystems, FinTech, EV SaaS, design systems &amp; brand craft
                    </p>
                  )}
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close visual archive popout"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0F131A] text-white transition-colors hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-[#2CA884] focus-visible:outline-offset-2 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:bg-[#232D3F]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Popout Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
              {!selectedWork ? (
                <div className="space-y-6">
                  {/* Filter Bar */}
                  <div
                    role="tablist"
                    aria-label="Filter visual archive by discipline"
                    className="flex flex-wrap items-center gap-2"
                  >
                    {PILLARS.map((pillar) => {
                      const isActive = activePillar === pillar.id;
                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActivePillar(pillar.id)}
                          className={`min-h-[40px] cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#2CA884] focus-visible:outline-offset-2 ${
                            isActive
                              ? "bg-[#0F171E] text-white dark:bg-[#F4F6F9] dark:text-[#0F131A]"
                              : "border border-[#D8D4CB] bg-white text-[#10161C] hover:border-[#10161C] dark:border-white/15 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:border-white/35"
                          }`}
                        >
                          {pillar.label}{" "}
                          <span
                            className={
                              isActive
                                ? "text-[#54D6AE] dark:text-[#1D7A5E]"
                                : "text-[#6B7280] dark:text-[#9CA6B5]"
                            }
                          >
                            ({pillar.count})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredWorks.map((work, idx) => (
                      <article
                        key={work.id}
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#0F131A] p-6 text-white transition-transform duration-200 hover:-translate-y-0.5 ${
                          idx === 0 && activePillar === "All" ? "md:col-span-2" : ""
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-neutral-200">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: work.palette[1] ?? "#54D6AE" }}
                                aria-hidden="true"
                              />
                              {work.badge}
                            </span>
                            <span className="font-mono text-[10px] text-neutral-400">
                              {work.dimensions}
                            </span>
                          </div>

                          <h3 className="mt-4 font-heading text-xl font-semibold tracking-[-0.02em] text-white">
                            {work.title}
                          </h3>
                          <p className="mt-2 text-sm leading-[1.6] text-neutral-300">
                            {work.summary}
                          </p>

                          {work.metrics && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {work.metrics.map((metric) => (
                                <span
                                  key={metric}
                                  className="rounded-full border border-[#54D6AE]/30 bg-[#2CA884]/15 px-2.5 py-1 font-mono text-[11px] font-medium text-[#54D6AE]"
                                >
                                  {metric}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center gap-1.5">
                            {work.palette.map((hex) => (
                              <span
                                key={hex}
                                className="h-3.5 w-3.5 rounded-full border border-white/20"
                                style={{ backgroundColor: hex }}
                                title={hex}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedWork(work);
                              setStageMode("auto");
                              setStepIdx(0);
                            }}
                            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-[#54D6AE] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#54D6AE] focus-visible:outline-offset-2"
                          >
                            Inspect work
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                /* In-Popout Work Detail Inspector */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <div className="rounded-[24px] border border-[#D8D4CB] bg-white p-6 dark:border-white/10 dark:bg-[#161C28] lg:col-span-8">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#2CA884] dark:text-[#54D6AE]">
                        {selectedWork.pillar} · {selectedWork.aspectNote}
                      </p>
                      <p className="mt-2 text-base leading-[1.6] text-[#10161C] dark:text-[#F4F6F9]">
                        {selectedWork.summary}
                      </p>
                      <p className="mt-3 text-xs font-medium text-[#6B7280] dark:text-[#9CA6B5]">
                        {selectedWork.roleNote}
                      </p>
                      {selectedWork.metrics && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedWork.metrics.map((metric) => (
                            <span
                              key={metric}
                              className="rounded-full bg-[#2CA884]/12 px-3 py-1.5 font-mono text-xs font-semibold text-[#1D7A5E] dark:bg-[#54D6AE]/15 dark:text-[#54D6AE]"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="rounded-[24px] border border-[#D8D4CB] bg-white p-6 dark:border-white/10 dark:bg-[#161C28] lg:col-span-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA6B5]">
                          Source Boards ({selectedWork.sourceFiles.length})
                        </span>
                        <Layers className="h-4 w-4 text-[#2CA884] dark:text-[#54D6AE]" aria-hidden="true" />
                      </div>
                      <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
                        {selectedWork.sourceFiles.map((file) => (
                          <li key={file.name}>
                            <a
                              href={file.href}
                              className="flex items-center justify-between gap-2 rounded-xl border border-[#EAECEF] bg-[#FAF8F5] px-3 py-2 text-xs transition-colors hover:border-[#2CA884] focus-visible:outline-2 focus-visible:outline-[#2CA884] focus-visible:outline-offset-2 dark:border-white/10 dark:bg-[#1E2636] dark:hover:border-[#54D6AE]"
                            >
                              <span className="truncate font-mono font-medium text-[#10161C] dark:text-[#F4F6F9]">
                                {file.name}
                              </span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6B7280] dark:text-[#9CA6B5]" aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interactive Hardware Bezel Preview */}
                  {selectedWork.hasHardwarePreview && (
                    <div className="rounded-[24px] bg-[#0F131A] p-6 text-white">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-wider text-[#54D6AE]">
                            Interactive Embedded Hardware Preview
                          </p>
                          <h3 className="mt-0.5 font-heading text-lg font-semibold">
                            Cambridge Audio OLED Display ↔ StreamMagic Sync
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {MINI_HARDWARE_STATES.map((state, index) => (
                            <button
                              key={state.id}
                              type="button"
                              onClick={() => setHwStateIdx(index)}
                              className={`min-h-[38px] cursor-pointer rounded-full px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#54D6AE] focus-visible:outline-offset-2 ${
                                hwStateIdx === index
                                  ? "bg-[#2CA884] text-white"
                                  : "bg-white/10 text-neutral-300 hover:bg-white/15"
                              }`}
                            >
                              {state.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-[#07080A] p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10"
                              style={{ backgroundColor: `${activeHw.accent}22` }}
                            >
                              {activeHw.id === "source" ? (
                                <Radio className="h-6 w-6" style={{ color: activeHw.accent }} />
                              ) : activeHw.id === "volume" ? (
                                <Volume2 className="h-6 w-6" style={{ color: activeHw.accent }} />
                              ) : (
                                <Disc3 className="h-6 w-6" style={{ color: activeHw.accent }} />
                              )}
                            </div>
                            <div>
                              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase text-neutral-400">
                                <Speaker className="h-3.5 w-3.5" aria-hidden="true" />
                                CAMBRIDGE AUDIO · {activeHw.model}
                              </p>
                              <p className="mt-0.5 font-heading text-2xl font-bold tracking-tight tabular-nums">
                                {activeHw.title}
                              </p>
                              <p className="text-xs text-neutral-300">{activeHw.sub}</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-[#54D6AE] tabular-nums">
                            OUTPUT {activeHw.level}%
                          </span>
                        </div>
                        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${activeHw.level}%`, backgroundColor: activeHw.accent }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Adaptive Stage / Step-Through Flow */}
                  <div className="rounded-[24px] border border-[#D8D4CB] bg-white p-6 dark:border-white/10 dark:bg-[#161C28]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#6B7280] dark:text-[#9CA6B5]">
                          Adaptive Stage Viewer · {selectedWork.dimensions} px
                        </p>
                        <h3 className="mt-0.5 font-heading text-base font-semibold text-[#10161C] dark:text-[#F4F6F9]">
                          {selectedWork.flowSteps
                            ? "Step-Through Panoramic Flow"
                            : "High-Resolution Board Stage"}
                        </h3>
                      </div>

                      <div
                        role="radiogroup"
                        aria-label="Stage viewer theme"
                        className="relative inline-flex rounded-full border border-[#D8D4CB] bg-[#FAF8F5] p-1 dark:border-white/15 dark:bg-[#11161F]"
                      >
                        {(["auto", "light", "dark"] as const).map((mode) => {
                          const isSelected = stageMode === mode;
                          return (
                            <button
                              key={mode}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setStageMode(mode)}
                              className={`relative min-h-[32px] cursor-pointer rounded-full px-3 text-xs font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] ${
                                isSelected
                                  ? "text-white dark:text-[#0F131A]"
                                  : "text-[#6B7280] hover:text-[#10161C] dark:text-[#9CA6B5] dark:hover:text-white"
                              }`}
                            >
                              {isSelected && (
                                <motion.span
                                  layoutId="stage-mode-active-pill"
                                  transition={
                                    prefersReducedMotion
                                      ? { duration: 0 }
                                      : {
                                          type: "spring",
                                          visualDuration: 0.25,
                                          bounce: 0.18,
                                        }
                                  }
                                  className="absolute inset-0 rounded-full bg-[#0F171E] dark:bg-[#F4F6F9]"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="relative z-10">{mode}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className={`mt-4 rounded-2xl border p-6 transition-colors ${
                        stageMode === "dark" ||
                        (stageMode === "auto" && selectedWork.stageTone !== "light")
                          ? "border-white/10 bg-[#0F131A] text-white"
                          : "border-[#EAECEF] bg-[#F8FAFC] text-[#10161C]"
                      }`}
                    >
                      {selectedWork.flowSteps ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-[#54D6AE]">
                              STEP {selectedWork.flowSteps[stepIdx]?.step} / 0
                              {selectedWork.flowSteps.length}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Previous step"
                                onClick={() =>
                                  setStepIdx(
                                    (p) =>
                                      (p - 1 + (selectedWork.flowSteps?.length ?? 1)) %
                                      (selectedWork.flowSteps?.length ?? 1),
                                  )
                                }
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-current/20 hover:bg-current/10"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                aria-label="Next step"
                                onClick={() =>
                                  setStepIdx((p) => (p + 1) % (selectedWork.flowSteps?.length ?? 1))
                                }
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-current/20 hover:bg-current/10"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <h4 className="font-heading text-xl font-semibold">
                            {selectedWork.flowSteps[stepIdx]?.title}
                          </h4>
                          <p className="text-sm opacity-80">
                            {selectedWork.flowSteps[stepIdx]?.detail}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="flex items-center gap-2 font-mono text-xs opacity-75">
                              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                              Ready for sliced AVIF / WebP export
                            </p>
                            <p className="mt-1 text-sm opacity-90">{selectedWork.summary}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/10 pt-4">
                        <span className="font-mono text-xs opacity-70">
                          Placeholder link — swap <code>assetHref</code> when ready
                        </span>
                        <a
                          href={selectedWork.assetHref}
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#2CA884] px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#54D6AE] focus-visible:outline-offset-2"
                        >
                          Open Full Board
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Popout Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D8D4CB] bg-[#FAF8F5] px-5 py-3.5 dark:border-white/10 dark:bg-[#11161F] sm:px-8">
              <p className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#9CA6B5]">
                <Sparkles className="h-3.5 w-3.5 text-[#2CA884] dark:text-[#54D6AE]" aria-hidden="true" />
                Selected works archive · 18 high-resolution boards
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:rolan.bacalla@gmail.com?subject=Visual%20Archive%20Walkthrough%20Request"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#D8D4CB] bg-white px-4 text-xs font-semibold text-[#10161C] hover:border-[#10161C] dark:border-white/15 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:border-white/35"
                >
                  Request Full Walkthrough
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[40px] cursor-pointer items-center rounded-full bg-[#0F171E] px-4 text-xs font-semibold text-white hover:bg-[#1E293B] dark:bg-[#F4F6F9] dark:text-[#0F131A] dark:hover:bg-white"
                >
                  Close Popout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
