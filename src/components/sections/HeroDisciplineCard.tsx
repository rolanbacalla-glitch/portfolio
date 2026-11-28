"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { BarChart3, Lightbulb, Monitor } from "lucide-react";
import type { DisciplineCard, WorkCategory } from "@/data/portfolio";

interface HeroDisciplineCardProps {
  card: DisciplineCard;
  onSelectDiscipline: (category: Exclude<WorkCategory, "All">) => void;
}

// Research-backed timing for hoverable portfolio showcase cards:
// - 4.0s seamless video loop (30fps, muted, audio track stripped)
// - 300ms hover-intent delay on desktop to prevent accidental cursor-sweep strobing
// - 200ms snappy fade-in, 150ms graceful exit fade-out before pause
const HOVER_INTENT_MS = 300;
const FADE_OUT_PAUSE_MS = 150;
const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeDesktopHover(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(DESKTOP_HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getDesktopHoverSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
}

function getDesktopHoverServerSnapshot() {
  return false;
}

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

  // True only on non-mobile devices with a real mouse/trackpad fine pointer
  const supportsDesktopHover = useSyncExternalStore(
    subscribeDesktopHover,
    getDesktopHoverSnapshot,
    getDesktopHoverServerSnapshot
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const hasVideo = Boolean(card.videoMp4 || card.videoWebm);
  const isHoverActive = supportsDesktopHover && isHovered;
  const isActive = isHoverActive || isPressed || isKeyboardFocused;

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
      // Wait for the 150ms fade-out transition before pausing so the exit stays smooth
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
    // Strictly disable hover playback on touch/mobile devices
    if (!supportsDesktopHover || e.pointerType !== "mouse") return;
    syncReadyState();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, HOVER_INTENT_MS);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (e.pointerType === "mouse") {
      setIsHovered(false);
    }
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

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    // Only activate focus preview on keyboard navigation (not mobile taps)
    if (supportsDesktopHover && e.currentTarget.matches(":focus-visible")) {
      syncReadyState();
      setIsKeyboardFocused(true);
    }
  };

  const handleBlur = () => {
    setIsKeyboardFocused(false);
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

  // Preserve base scale (e.g. scale-[1.18] for Design Systems) on all devices,
  // but apply hover zoom only on non-mobile fine-pointer devices.
  const baseScaleClass = card.id === "systems" ? "scale-[1.18]" : "";
  const desktopHoverScaleClass = supportsDesktopHover
    ? card.id === "systems"
      ? "hover:scale-[1.24] group-hover:scale-[1.24]"
      : "group-hover:scale-[1.05]"
    : "";
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
        isPressed
          ? "scale-[0.985]"
          : supportsDesktopHover
            ? "hover:-translate-y-1"
            : ""
      }`}
    >
      {/* Shared Media Stage so static poster & looping video scale in exact lockstep */}
      <div
        className={`pointer-events-none absolute inset-0 transition-transform duration-700 ease-out ${baseScaleClass} ${desktopHoverScaleClass}`}
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
            preload={supportsDesktopHover ? "auto" : "metadata"}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-out ${
              showVideo
                ? "opacity-100 duration-200"
                : "opacity-0 duration-150"
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
          isPressed
            ? "scale-95"
            : supportsDesktopHover
              ? "group-hover:scale-105"
              : ""
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
