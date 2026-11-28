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
  /** Normalised settled coordinates (stratified ambient stipple field) */
  endX: number;
  endY: number;
  /** Base dot radius in CSS pixels */
  radius: number;
  /** Slight per-particle stagger (0..0.14) for organic swarm motion */
  delay: number;
  /** Whether this dot uses the emerald accent colour (~15%) */
  isAccent: boolean;
  /** Per-dot subtle opacity multiplier */
  alphaScale: number;
}

const DESKTOP_COUNT = 340;
const MOBILE_COUNT = 100;
const MAX_DPR = 2;
const GATHER_DURATION_MS = 850;
const TOTAL_DURATION_MS = 2400;

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
 * 3. Stratified ambient field for the quiet settled state
 */
function buildParticles(count: number): StippleParticle[] {
  const rand = createSeededRandom(20261128);
  const cols = Math.max(1, Math.round(Math.sqrt(count * 1.65)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const particles: StippleParticle[] = [];

  for (let i = 0; i < count; i++) {
    // 1. Diagonal band from bottom-left (0, 1) to top-right (1, 0) with feathered perpendicular spread
    const along = rand();
    const spread = (rand() + rand() + rand() - 1.5) * 0.24;
    const startX = clamp01(along + spread * 0.7);
    const startY = clamp01(1 - along + spread * 0.7);

    // 2. Hollow-centred circular ring (denser near perimeter, light centre)
    const ringAngle = rand() * Math.PI * 2;
    const ringRadiusFactor = 0.21 + (rand() + rand()) * 0.065;

    // 3. Stratified jittered grid for even, non-clumpy final ambient distribution
    const col = i % cols;
    const row = Math.floor(i / cols);
    const endX = clamp01((col + 0.15 + rand() * 0.7) / cols);
    const endY = clamp01((row + 0.15 + rand() * 0.7) / rows);

    particles.push({
      startX,
      startY,
      ringAngle,
      ringRadiusFactor,
      endX,
      endY,
      radius: 0.85 + rand() * 0.9,
      delay: rand() * 0.14,
      isAccent: rand() < 0.15,
      alphaScale: 0.65 + rand() * 0.35,
    });
  }

  return particles;
}

/**
 * Softly attenuates particle opacity over the left editorial headline & body copy
 * on desktop viewports so text contrast remains crisp.
 */
function editorialSafeAlpha(x: number, y: number, width: number, height: number): number {
  if (width < 1024) {
    // On stacked mobile/tablet layouts, gently soften the upper-left text band
    const dx = (x - width * 0.38) / (width * 0.48);
    const dy = (y - height * 0.26) / (height * 0.24);
    const distSq = dx * dx + dy * dy;
    if (distSq >= 1) return 1;
    return 0.28 + 0.72 * distSq;
  }

  const dx = (x - width * 0.23) / (width * 0.26);
  const dy = (y - height * 0.56) / (height * 0.36);
  const distSq = dx * dx + dy * dy;
  if (distSq >= 1) return 1;
  return 0.22 + 0.78 * distSq;
}

function getPalette(theme: ThemeMode) {
  if (theme === "dark") {
    return {
      primaryRgb: "244, 246, 249",
      accentRgb: "84, 214, 174",
      peakOpacity: 0.32,
      settledOpacity: 0.15,
    };
  }

  return {
    primaryRgb: "16, 22, 28",
    accentRgb: "44, 168, 132",
    peakOpacity: 0.28,
    settledOpacity: 0.11,
  };
}

/**
 * Mercury Books-inspired one-shot stipple entrance background for HeroSection.
 * Runs a ~2.4s diagonal-gather → ring-condensation → radial-diffusion sequence on mount,
 * then halts `requestAnimationFrame` completely for zero ongoing CPU/GPU cost.
 */
export default function HeroStippleEntrance() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const settledRef = useRef(false);
  const particlesRef = useRef<StippleParticle[]>([]);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const drawFrameRef = useRef<((elapsedMs: number) => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    // If the entrance has already settled, re-render a single static frame for the new theme
    if (settledRef.current && drawFrameRef.current) {
      drawFrameRef.current(TOTAL_DURATION_MS);
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const drawFrame = (elapsedMs: number) => {
      const { width, height, dpr } = sizeRef.current;
      if (width <= 0 || height <= 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const palette = getPalette(themeRef.current);
      const minDim = Math.min(width, height);
      const ringCenterX = width >= 1024 ? width * 0.44 : width * 0.5;
      const ringCenterY = height * 0.5;

      const isSettled = elapsedMs >= TOTAL_DURATION_MS;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let x: number;
        let y: number;
        let baseOpacity: number;

        if (isSettled) {
          x = p.endX * width;
          y = p.endY * height;
          baseOpacity = palette.settledOpacity;
        } else {
          const ringX =
            ringCenterX + Math.cos(p.ringAngle) * (minDim * p.ringRadiusFactor);
          const ringY =
            ringCenterY + Math.sin(p.ringAngle) * (minDim * p.ringRadiusFactor);

          const startX = p.startX * width;
          const startY = p.startY * height;
          const endX = p.endX * width;
          const endY = p.endY * height;

          const staggeredMs = Math.max(0, elapsedMs - p.delay * 450);

          if (staggeredMs <= GATHER_DURATION_MS) {
            // Phase 1: Diagonal swath gathers inward into the circular ring
            const t = easeInOutCubic(clamp01(staggeredMs / GATHER_DURATION_MS));
            x = startX + (ringX - startX) * t;
            y = startY + (ringY - startY) * t;
            baseOpacity = 0.04 + (palette.peakOpacity - 0.04) * t;
          } else {
            // Phase 2: Radial diffusion outward into the quiet settled ambient field
            const diffuseWindow = TOTAL_DURATION_MS - GATHER_DURATION_MS;
            const t = easeOutQuart(
              clamp01((staggeredMs - GATHER_DURATION_MS) / diffuseWindow)
            );
            x = ringX + (endX - ringX) * t;
            y = ringY + (endY - ringY) * t;
            baseOpacity =
              palette.peakOpacity +
              (palette.settledOpacity - palette.peakOpacity) * t;
          }
        }

        const safeZoneMultiplier = editorialSafeAlpha(x, y, width, height);
        const alpha = baseOpacity * p.alphaScale * safeZoneMultiplier;
        if (alpha <= 0.005) continue;

        ctx.fillStyle = `rgba(${
          p.isAccent ? palette.accentRgb : palette.primaryRgb
        }, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawFrameRef.current = drawFrame;

    const syncCanvasSize = () => {
      const rect = parent.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      if (nextWidth <= 0 || nextHeight <= 0) return;

      const targetCount = nextWidth >= 768 ? DESKTOP_COUNT : MOBILE_COUNT;
      if (particlesRef.current.length !== targetCount) {
        particlesRef.current = buildParticles(targetCount);
      }

      sizeRef.current = { width: nextWidth, height: nextHeight, dpr: nextDpr };
      canvas.width = Math.round(nextWidth * nextDpr);
      canvas.height = Math.round(nextHeight * nextDpr);

      if (settledRef.current) {
        drawFrame(TOTAL_DURATION_MS);
      }
    };

    syncCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });
    resizeObserver.observe(parent);

    if (prefersReducedMotion) {
      settledRef.current = true;
      drawFrame(TOTAL_DURATION_MS);
    } else {
      settledRef.current = false;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsedMs = now - startTime;
        if (elapsedMs >= TOTAL_DURATION_MS) {
          settledRef.current = true;
          drawFrame(TOTAL_DURATION_MS);
          rafId = null;
          return;
        }

        drawFrame(elapsedMs);
        rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      resizeObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      drawFrameRef.current = null;
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
