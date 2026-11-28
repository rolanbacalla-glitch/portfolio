"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { ThemeMode } from "@/lib/theme";

interface StippleParticle {
  /** Normalised start coordinates (feathered bottom-left → top-right diagonal band) */
  startX: number;
  startY: number;
  /** Normalised ring coordinates (hollow-centred circular condensation) */
  ringAngle: number;
  ringRadiusFactor: number;
  /** Normalised settled home coordinates (stratified ambient stipple field) */
  endX: number;
  endY: number;
  /** Live ambient coordinates in CSS pixels once Phase 3 begins */
  x: number;
  y: number;
  /** Spring-damped cursor displacement offset in CSS pixels */
  offsetX: number;
  offsetY: number;
  offsetVx: number;
  offsetVy: number;
  /** Gentle bottom-left → top-right drift velocity (px/sec) */
  driftVx: number;
  driftVy: number;
  /** Subtle sinusoidal sway phase for organic floating */
  swayPhase: number;
  /** Base dot radius in CSS pixels */
  radius: number;
  /** Slight per-particle stagger (0..0.14) for organic swarm entrance */
  delay: number;
  /** Whether this dot uses the emerald accent colour (~20%) */
  isAccent: boolean;
  /** Per-dot subtle opacity multiplier */
  alphaScale: number;
}

const DESKTOP_COUNT = 480;
const MOBILE_COUNT = 140;
const MAX_DPR = 2;
const GATHER_DURATION_MS = 850;
const ENTRANCE_DURATION_MS = 2400;
const CURSOR_RADIUS = 125;

/** Mulberry32 deterministic PRNG so particle layout is balanced and repeatable. */
function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Generates deterministic stipple particles with 3 spatial anchors:
 * 1. Feathered diagonal band (bottom-left → top-right)
 * 2. Hollow-centred circular ring
 * 3. Stratified ambient field that transitions into gentle diagonal drift
 */
function buildParticles(
  count: number,
  width: number,
  height: number
): StippleParticle[] {
  const rand = createSeededRandom(20261128);
  const cols = Math.max(1, Math.round(Math.sqrt(count * 1.65)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const particles: StippleParticle[] = [];

  for (let i = 0; i < count; i++) {
    // 1. Diagonal band from bottom-left (0, 1) to top-right (1, 0)
    const along = rand();
    const spread = (rand() + rand() + rand() - 1.5) * 0.24;
    const startX = clamp01(along + spread * 0.7);
    const startY = clamp01(1 - along + spread * 0.7);

    // 2. Hollow-centred circular ring (denser near perimeter, lighter centre)
    const ringAngle = rand() * Math.PI * 2;
    const ringRadiusFactor = 0.21 + (rand() + rand()) * 0.068;

    // 3. Stratified jittered grid for even ambient distribution
    const col = i % cols;
    const row = Math.floor(i / cols);
    const endX = clamp01((col + 0.14 + rand() * 0.72) / cols);
    const endY = clamp01((row + 0.14 + rand() * 0.72) / rows);

    // Calm bottom-left → top-right ambient drift (px per second)
    const speed = 7 + rand() * 11;

    particles.push({
      startX,
      startY,
      ringAngle,
      ringRadiusFactor,
      endX,
      endY,
      x: endX * width,
      y: endY * height,
      offsetX: 0,
      offsetY: 0,
      offsetVx: 0,
      offsetVy: 0,
      driftVx: speed * 0.82,
      driftVy: -speed * 0.52,
      swayPhase: rand() * Math.PI * 2,
      radius: 1.0 + rand() * 1.1,
      delay: rand() * 0.14,
      isAccent: rand() < 0.2,
      alphaScale: 0.74 + rand() * 0.26,
    });
  }

  return particles;
}

/**
 * Gently softens particle opacity directly behind the left editorial headline and copy
 * while preserving crisp visibility across the rest of the Hero sheet.
 */
function editorialSafeAlpha(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  if (width < 1024) {
    const dx = (x - width * 0.38) / (width * 0.44);
    const dy = (y - height * 0.26) / (height * 0.22);
    const distSq = dx * dx + dy * dy;
    if (distSq >= 1) return 1;
    return 0.45 + 0.55 * distSq;
  }

  const dx = (x - width * 0.22) / (width * 0.23);
  const dy = (y - height * 0.56) / (height * 0.32);
  const distSq = dx * dx + dy * dy;
  if (distSq >= 1) return 1;
  return 0.4 + 0.6 * distSq;
}

function getPalette(theme: ThemeMode) {
  if (theme === "dark") {
    return {
      primaryRgb: "226, 232, 240",
      accentRgb: "84, 214, 174",
      peakOpacity: 0.62,
      settledOpacity: 0.34,
      hoverBoost: 0.22,
    };
  }

  return {
    primaryRgb: "30, 41, 59",
    accentRgb: "30, 148, 114",
    peakOpacity: 0.58,
    settledOpacity: 0.3,
    hoverBoost: 0.18,
  };
}

/**
 * Mercury Books-inspired hybrid stipple background for HeroSection (Option 1 + Option 2):
 * 1. Plays a ~2.4s diagonal-gather → ring-condensation → radial-diffusion entrance on mount.
 * 2. Transitions seamlessly into calm ambient diagonal drift with subtle desktop cursor magnetism.
 * 3. Automatically pauses offscreen (IntersectionObserver) and when the tab is hidden,
 *    and renders a crisp static frame for `prefers-reduced-motion: reduce`.
 */
export default function HeroStippleEntrance() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const staticRedrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    // Immediately refresh static reduced-motion or paused frames on theme toggle
    if (staticRedrawRef.current) {
      staticRedrawRef.current();
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    let rafId: number | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: StippleParticle[] = [];

    let isInViewport = true;
    let isTabVisible = !document.hidden;
    let entranceComplete = prefersReducedMotion;
    let elapsedEntranceMs = prefersReducedMotion ? ENTRANCE_DURATION_MS : 0;
    let ambientTimeSec = 0;
    let lastFrameTime = performance.now();

    const pointer = {
      active: false,
      x: -9999,
      y: -9999,
    };

    const drawStaticSettled = () => {
      if (width <= 0 || height <= 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const palette = getPalette(themeRef.current);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const x = p.x;
        const y = p.y;
        const alpha =
          palette.settledOpacity *
          p.alphaScale *
          editorialSafeAlpha(x, y, width, height);

        if (alpha <= 0.01) continue;

        ctx.fillStyle = `rgba(${
          p.isAccent ? palette.accentRgb : palette.primaryRgb
        }, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    staticRedrawRef.current = drawStaticSettled;

    const stepAndDraw = (dtSec: number) => {
      if (width <= 0 || height <= 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const palette = getPalette(themeRef.current);
      const minDim = Math.min(width, height);
      const ringCenterX = width >= 1024 ? width * 0.44 : width * 0.5;
      const ringCenterY = height * 0.5;

      if (!entranceComplete) {
        elapsedEntranceMs += dtSec * 1000;
        if (elapsedEntranceMs >= ENTRANCE_DURATION_MS) {
          entranceComplete = true;
          // Lock ambient starting coordinates cleanly to each particle's settled home
          for (let i = 0; i < particles.length; i++) {
            particles[i].x = particles[i].endX * width;
            particles[i].y = particles[i].endY * height;
          }
        }
      } else {
        ambientTimeSec += dtSec;
      }

      const margin = 12;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let drawX: number;
        let drawY: number;
        let baseOpacity: number;
        let hoverAlphaBoost = 0;

        if (!entranceComplete) {
          const ringX =
            ringCenterX + Math.cos(p.ringAngle) * (minDim * p.ringRadiusFactor);
          const ringY =
            ringCenterY + Math.sin(p.ringAngle) * (minDim * p.ringRadiusFactor);

          const startX = p.startX * width;
          const startY = p.startY * height;
          const endX = p.endX * width;
          const endY = p.endY * height;

          const staggeredMs = Math.max(0, elapsedEntranceMs - p.delay * 450);

          if (staggeredMs <= GATHER_DURATION_MS) {
            // Phase 1: Feathered diagonal swath gathers into a circular ring
            const t = easeInOutCubic(clamp01(staggeredMs / GATHER_DURATION_MS));
            drawX = startX + (ringX - startX) * t;
            drawY = startY + (ringY - startY) * t;
            baseOpacity = 0.08 + (palette.peakOpacity - 0.08) * t;
          } else {
            // Phase 2: Ring diffuses radially outward into the ambient field
            const diffuseWindow = ENTRANCE_DURATION_MS - GATHER_DURATION_MS;
            const t = easeOutQuart(
              clamp01((staggeredMs - GATHER_DURATION_MS) / diffuseWindow)
            );
            drawX = ringX + (endX - ringX) * t;
            drawY = ringY + (endY - ringY) * t;
            baseOpacity =
              palette.peakOpacity +
              (palette.settledOpacity - palette.peakOpacity) * t;
          }
        } else {
          // Phase 3 (Option 1): Calm ambient diagonal drift + subtle desktop cursor magnetism
          const sway = Math.sin(ambientTimeSec * 0.7 + p.swayPhase) * 3.5;
          p.x += p.driftVx * dtSec;
          p.y += (p.driftVy + sway * 0.25) * dtSec;

          // Seamless edge wrapping
          if (p.x > width + margin) p.x = -margin;
          if (p.x < -margin) p.x = width + margin;
          if (p.y < -margin) p.y = height + margin;
          if (p.y > height + margin) p.y = -margin;

          // Spring-damped cursor interaction (desktop fine pointer only)
          let targetOx = 0;
          let targetOy = 0;

          if (hasFinePointer && pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < CURSOR_RADIUS * CURSOR_RADIUS && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const influence = 1 - dist / CURSOR_RADIUS;
              const eased = influence * influence;
              // Gentle radial dispersion away from cursor + subtle glow
              const push = eased * 18;
              targetOx = (dx / dist) * push;
              targetOy = (dy / dist) * push;
              hoverAlphaBoost = eased * palette.hoverBoost;
            }
          }

          // Critically damped spring integration for silky settle
          const stiffness = 14;
          const damping = 7.5;
          p.offsetVx += ((targetOx - p.offsetX) * stiffness - p.offsetVx * damping) * dtSec;
          p.offsetVy += ((targetOy - p.offsetY) * stiffness - p.offsetVy * damping) * dtSec;
          p.offsetX += p.offsetVx * dtSec;
          p.offsetY += p.offsetVy * dtSec;

          drawX = p.x + p.offsetX;
          drawY = p.y + p.offsetY;
          baseOpacity = palette.settledOpacity;
        }

        const safeZoneMultiplier = editorialSafeAlpha(drawX, drawY, width, height);
        const alpha = Math.min(
          0.85,
          (baseOpacity + hoverAlphaBoost) * p.alphaScale * safeZoneMultiplier
        );

        if (alpha <= 0.01) continue;

        ctx.fillStyle = `rgba(${
          p.isAccent ? palette.accentRgb : palette.primaryRgb
        }, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now: number) => {
      if (!isInViewport || !isTabVisible) {
        rafId = null;
        return;
      }

      // Clamp frame delta to avoid large jumps after tab resume
      const dtSec = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      stepAndDraw(dtSec);
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (prefersReducedMotion || rafId !== null || !isInViewport || !isTabVisible) {
        return;
      }
      lastFrameTime = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };

    const syncCanvasSize = () => {
      const rect = parent.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      if (nextWidth <= 0 || nextHeight <= 0) return;

      const prevWidth = width;
      const prevHeight = height;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const targetCount = width >= 768 ? DESKTOP_COUNT : MOBILE_COUNT;
      if (particles.length !== targetCount) {
        particles = buildParticles(targetCount, width, height);
      } else if (prevWidth > 0 && prevHeight > 0) {
        // Proportionally rescale live coordinates on viewport resize
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;
        for (let i = 0; i < particles.length; i++) {
          particles[i].x *= scaleX;
          particles[i].y *= scaleY;
        }
      }

      if (prefersReducedMotion || !isInViewport || !isTabVisible) {
        drawStaticSettled();
      }
    };

    syncCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        if (isInViewport && isTabVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(parent);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isInViewport) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    if (hasFinePointer && !prefersReducedMotion) {
      parent.addEventListener("pointermove", handlePointerMove, { passive: true });
      parent.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    if (prefersReducedMotion) {
      drawStaticSettled();
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (hasFinePointer && !prefersReducedMotion) {
        parent.removeEventListener("pointermove", handlePointerMove);
        parent.removeEventListener("pointerleave", handlePointerLeave);
      }
      staticRedrawRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
