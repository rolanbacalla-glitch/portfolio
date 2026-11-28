"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Car,
  ChevronDown,
  ChevronUp,
  Coffee,
  Compass,
  Cpu,
  Disc3,
  Globe,
  Headphones,
  Layers,
  LayoutDashboard,
  LineChart,
  MapPin,
  Radio,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  caseStudies,
  INITIAL_VISIBLE_PROJECTS,
  type CaseStudy,
} from "@/data/portfolio";
import ExpandableCardDescription from "@/components/sections/ExpandableCardDescription";

function ProjectIcon({ type }: { type: CaseStudy["icon"] }) {
  const cls = "h-[22px] w-[22px]";
  switch (type) {
    case "audio":
      return <Radio className={cls} strokeWidth={1.7} />;
    case "headphones":
      return <Headphones className={cls} strokeWidth={1.7} />;
    case "compass":
      return <Compass className={cls} strokeWidth={1.7} />;
    case "research":
      return <LineChart className={cls} strokeWidth={1.7} />;
    case "layers":
      return <Layers className={cls} strokeWidth={1.7} />;
    case "shield":
      return <ShieldCheck className={cls} strokeWidth={1.7} />;
    case "cpu":
      return <Cpu className={cls} strokeWidth={1.7} />;
    case "trending":
      return <TrendingUp className={cls} strokeWidth={1.7} />;
    case "zap":
      return <Zap className={cls} strokeWidth={1.7} />;
    case "cart":
      return <ShoppingBag className={cls} strokeWidth={1.7} />;
    case "layout":
      return <LayoutDashboard className={cls} strokeWidth={1.7} />;
    case "map":
      return <MapPin className={cls} strokeWidth={1.7} />;
    case "disc":
      return <Disc3 className={cls} strokeWidth={1.7} />;
    case "briefcase":
      return <Briefcase className={cls} strokeWidth={1.7} />;
    case "globe":
      return <Globe className={cls} strokeWidth={1.7} />;
    case "car":
      return <Car className={cls} strokeWidth={1.7} />;
    case "coffee":
      return <Coffee className={cls} strokeWidth={1.7} />;
  }
}

export default function ProjectGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const toggleAnchorRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const toggleCardDescription = (projectId: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const visibleProjects = showAll
    ? caseStudies
    : caseStudies.slice(0, INITIAL_VISIBLE_PROJECTS);
  const hiddenCount = Math.max(0, caseStudies.length - INITIAL_VISIBLE_PROJECTS);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const handleToggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      window.requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          if (rect.top < -240) {
            toggleAnchorRef.current?.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "end",
            });
          }
        }
      });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden rounded-[28px] bg-[#FAF8F5] px-6 py-10 text-[#10161C] shadow-[0_1px_3px_rgba(16,22,28,0.04)] transition-colors duration-200 dark:border dark:border-white/[0.07] dark:bg-[#11161F] dark:text-[#F4F6F9] dark:shadow-none sm:px-10 sm:py-12 lg:rounded-[36px] lg:px-14 lg:py-14"
    >
      {/* Header Row */}
      <div className="mb-10 max-w-2xl lg:mb-12">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex h-7 min-w-[38px] items-center justify-center rounded-full bg-[#10161C] px-3 text-[11px] font-semibold tracking-wide text-white tabular-nums dark:bg-[#F4F6F9] dark:text-[#0F131A]">
            03
          </span>
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#10161C] dark:text-[#F4F6F9]">
            Selected Case Studies
          </span>
        </div>

        <h2 className="mt-6 font-heading text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#10161C] dark:text-[#F4F6F9] sm:text-[3.25rem]">
          Case studies grounded in{" "}
          <span className="text-[#2CA884] dark:text-[#54D6AE]">
            real product challenges.
          </span>
        </h2>

        <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[#6B7280] dark:text-[#9CA6B5]">
          A selection of product design work spanning connected audio, companion
          apps, UX research, and design systems — each focused on clear
          usability and thoughtful execution.
        </p>
      </div>

      {/* Portfolio Work Cards — Original 6 + Expandable Archive Cards */}
      <div
        id="portfolio-project-grid"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {visibleProjects.map((project, index) => {
          const isExtraCard = index >= INITIAL_VISIBLE_PROJECTS;
          const isDescriptionExpanded = Boolean(expandedCardIds[project.id]);

          return (
            <motion.article
              key={project.id}
              ref={
                index === INITIAL_VISIBLE_PROJECTS - 1
                  ? (node) => {
                      toggleAnchorRef.current = node as HTMLDivElement | null;
                    }
                  : undefined
              }
              initial={
                isExtraCard && !prefersReducedMotion
                  ? { opacity: 0, y: 18 }
                  : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                delay:
                  isExtraCard && !prefersReducedMotion
                    ? Math.min((index - INITIAL_VISIBLE_PROJECTS) * 0.04, 0.28)
                    : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-h-[450px] flex-col justify-between overflow-hidden rounded-[26px] bg-[#0B0F14] p-6 text-left transition-transform duration-300 hover:-translate-y-1 dark:ring-1 dark:ring-white/[0.08] lg:min-h-[500px] lg:rounded-[28px] lg:p-7"
            >
              {/* Full-Bleed Editorial Studio Photography */}
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Signature Deep Seamless Bottom Scrim (deepens cleanly when description expands) */}
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  isDescriptionExpanded
                    ? "bg-gradient-to-t from-[#05080B] via-[#05080B]/88 via-58% to-[#05080B]/20"
                    : "bg-gradient-to-t from-[#05080B] via-[#05080B]/75 via-42% to-transparent"
                }`}
                aria-hidden="true"
              />

              {/* Stretched Click Area to Open Case Study Overview */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`View ${project.title} case study`}
                className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#2CA884] lg:rounded-[28px] cursor-pointer"
              />

              {/* Top Row: Signature Dark Circular Icon Badge + External Arrow */}
              <div className="relative z-20 flex items-center justify-between pointer-events-none">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#10161C]/95 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <ProjectIcon type={project.icon} />
                </span>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.liveLabel ?? "Open live project"} for ${project.title} (opens in a new tab)`}
                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#10161C]/75 text-white/90 backdrop-blur-sm transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-[#10161C] hover:border-white hover:bg-white hover:text-[#10161C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#10161C]/75 text-white/90 backdrop-blur-sm transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-[#10161C]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </div>

              {/* Bottom Content matching the Drafted Card Typography & Rhythm */}
              <div className="relative z-20 mt-auto pt-20 pointer-events-none">
                <p className="text-[12px] font-medium text-white/65 tabular-nums">
                  {project.domain} · {project.year}
                </p>

                <h3 className="mt-1.5 font-heading text-[26px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
                  {project.title}
                </h3>

                <ExpandableCardDescription
                  text={project.summary}
                  projectTitle={project.title}
                  isExpanded={isDescriptionExpanded}
                  onToggle={() => toggleCardDescription(project.id)}
                />

                <div className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#54D6AE] transition-colors group-hover:text-white">
                  <span>View case study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Inline Show More / Show Less Toggle */}
      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={handleToggleShowAll}
            aria-expanded={showAll}
            aria-controls="portfolio-project-grid"
            className="group inline-flex min-h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#0F171E] px-6 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:bg-[#F4F6F9] dark:text-[#0F131A] dark:hover:bg-white dark:focus-visible:outline-[#54D6AE] whitespace-nowrap"
          >
            {showAll ? (
              <>
                <span>Show less</span>
                <ChevronUp
                  className="h-4 w-4 text-[#54D6AE] transition-transform duration-200 group-hover:-translate-y-0.5 dark:text-[#1D7A5E]"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <span>Show more</span>
                <span className="font-mono text-[12px] font-medium text-[#54D6AE] tabular-nums dark:text-[#1D7A5E]">
                  (+{hiddenCount})
                </span>
                <ChevronDown
                  className="h-4 w-4 text-[#54D6AE] transition-transform duration-200 group-hover:translate-y-0.5 dark:text-[#1D7A5E]"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </div>
      )}

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F131A]/75 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[#FAF8F5] text-[#10161C] shadow-2xl dark:border dark:border-white/10 dark:bg-[#141A24] dark:text-[#F4F6F9]"
            >
              {/* Top Media Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#10161C]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F131A]/85 via-[#0F131A]/25 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close case study overview"
                  className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F131A]/85 text-white transition-colors hover:bg-[#0F131A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[12.5px] font-medium text-white/80 tabular-nums">
                    {selectedProject.domain} · {selectedProject.year}
                  </p>
                  <h3
                    id="case-study-modal-title"
                    className="mt-1 font-heading text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6 p-6 sm:p-8">
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full bg-[#2CA884]/12 px-3 py-1.5 font-mono text-xs font-semibold text-[#1D7A5E] tabular-nums dark:bg-[#54D6AE]/15 dark:text-[#54D6AE]"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-[12.5px] font-semibold text-[#6B7280] dark:text-[#9CA6B5]">
                      The Challenge
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-[#10161C] dark:text-[#E5EAF2]">
                      {selectedProject.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[12.5px] font-semibold text-[#6B7280] dark:text-[#9CA6B5]">
                      Role &amp; Outcome
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-[#10161C] dark:text-[#E5EAF2]">
                      {selectedProject.role}
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-[1.55] text-[#1D7A5E] dark:text-[#54D6AE]">
                      {selectedProject.outcome}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E7E4DD] pt-6 dark:border-white/10">
                  <h4 className="text-[12.5px] font-semibold text-[#6B7280] dark:text-[#9CA6B5]">
                    Key Contributions
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-[14.5px] leading-[1.6] text-[#374151] dark:text-[#CBD4E1]">
                    {selectedProject.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          className="mt-1 font-semibold text-[#2CA884] dark:text-[#54D6AE]"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E7E4DD] pt-6 dark:border-white/10">
                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#0F171E] px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:bg-[#F4F6F9] dark:text-[#0F131A] dark:hover:bg-white dark:focus-visible:outline-[#54D6AE] whitespace-nowrap"
                    >
                      {selectedProject.liveLabel ?? "Open live project"}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <a
                      href="mailto:rolan.bacalla@gmail.com?subject=Case%20Study%20Walkthrough%20Request"
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#0F171E] px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:bg-[#F4F6F9] dark:text-[#0F131A] dark:hover:bg-white dark:focus-visible:outline-[#54D6AE] whitespace-nowrap"
                    >
                      Request full walkthrough
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-[#DCD8CE] px-5 py-2.5 text-[13.5px] font-medium text-[#10161C] transition-colors hover:bg-[#EFECE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10161C] dark:border-white/15 dark:text-[#F4F6F9] dark:hover:bg-white/10 dark:focus-visible:outline-[#54D6AE] whitespace-nowrap cursor-pointer"
                  >
                    Close overview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
