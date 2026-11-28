"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BarChart3, Lightbulb, Monitor } from "lucide-react";
import type { DisciplineCard, WorkCategory } from "@/data/portfolio";

interface HeroDisciplineCardProps {
  card: DisciplineCard;
  onSelectDiscipline: (category: Exclude<WorkCategory, "All">) => void;
}

const HOVER_INTENT_MS = 120;
const FADE_OUT_PAUSE_MS = 220;

function DisciplineIcon({ type }: { type: "lightbulb" | "monitor" | "chart" }) {
  if (type === "lightbulb") {
    return <Lightbulb className="h-[22px] w-[22px]" strokeWidth={1.7} />;
  }
  if (type === "monitor") {
    return <Monitor className="h-[22px] w-[22px]" strokeWidth={1.7} />;
  }
  return <BarChart3 className="h-[22px] w-[22px]" strokeWidth={1.7} />;
}

export default function HeroDisciplineCard({
  card,
  onSelectDiscipline,
}: HeroDisciplineCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const hasVideo = Boolean(card.videoMp4 || card.videoWebm);
  const isActive = isHovered || isPressed || isFocused;

  const clearTimers = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const syncReadyState = useCallback(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setIsVideoReady(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isActive && !reducedMotion) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore AbortError if hover/press releases before playback resolves
        });
      }
    } else {
      // Allow the 200ms opacity fade-out to finish before pausing the loop
      pauseTimerRef.current = setTimeout(() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }, FADE_OUT_PAUSE_MS);
    }
  }, [isActive, hasVideo]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    syncReadyState();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, HOVER_INTENT_MS);
  };

  const handlePointerLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsHovered(false);
    setIsPressed(false);
  };

  const handlePointerDown = () => {
    syncReadyState();
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handlePointerCancel = () => {
    setIsPressed(false);
    setIsHovered(false);
  };

  const handleFocus = () => {
    syncReadyState();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      syncReadyState();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      setIsPressed(false);
    }
  };

  const mediaScaleClass = card.zoomClass ?? "group-hover:scale-[1.05]";
  const showVideo = hasVideo && isActive && isVideoReady;

  return (
    <button
      type="button"
      onClick={() => onSelectDiscipline(card.filterTarget)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      data-pressed={isPressed ? "true" : undefined}
      className={`group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#10161C] p-5 text-left transition-transform duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:ring-1 dark:ring-white/[0.08] dark:focus-visible:outline-[#54D6AE] sm:min-h-[460px] lg:min-h-[520px] lg:rounded-[28px] lg:p-6 cursor-pointer select-none ${
        isPressed ? "scale-[0.985]" : "hover:-translate-y-1"
      }`}
    >
      {/* Shared Media Stage so static poster & looping video scale in exact lockstep */}
      <div
        className={`pointer-events-none absolute inset-0 transition-transform duration-700 ease-out ${mediaScaleClass}`}
      >
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 24vw"
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {hasVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
              showVideo ? "opacity-100" : "opacity-0"
            }`}
          >
            {card.videoWebm && (
              <source src={card.videoWebm} type="video/webm" />
            )}
            {card.videoMp4 && <source src={card.videoMp4} type="video/mp4" />}
          </video>
        )}
      </div>

      {/* Measured Bottom Contrast Scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05080B] via-[#05080B]/55 via-35% to-transparent"
        aria-hidden="true"
      />

      {/* Top-Left Circular Dark Icon */}
      <div
        className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#10161C]/95 text-white shadow-sm transition-transform duration-200 ${
          isPressed ? "scale-95" : "group-hover:scale-105"
        }`}
      >
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
  );
}
