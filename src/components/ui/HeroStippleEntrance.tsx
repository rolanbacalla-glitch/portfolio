"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { ThemeMode } from "@/lib/theme";

interface StippleParticle {
  /** Normalised start coordinates (feathered bottom-left → top-right diagonal band) */
  startX: number;
  startY: number;
  /** Polar coordinates for the hollow-centred ring behind the editorial headline */
  ringAngle: number;
  ringRadiusFactor: number;
  /** Normalised settled home coordinates (stratified ambient stipple field) */
  endX: number;
  endY: number;
  /** Radial burst multiplier so particles explode outward at varied speeds */
  burstFactor: number;
  /** Live ambient coordinates in CSS pixels once Phase 3 begins */
  x: number;
  y: number;
  /** Spring-damped cursor magnet displacement offset in CSS pixels */
  offsetX: number;
  offsetY: number;
  offsetVx: number;
  offsetVy: number;
  /** Unique halo angle & radius around the cursor when magnetised */
  magnetAngle: number;
  magnetOrbitRadius: number;
  /** 0..1 magnetic memory: only magnetised dots linger and release slowly */
  magnetCharge: number;
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
  /** Extra particles that enrich the initial gather/ring and fade out during the radial burst */
  entranceOnly: boolean;
  /** Per-dot subtle opacity multiplier */
  alphaScale: number;
}

const DESKTOP_AMBIENT_COUNT = 480;
const DESKTOP_ENTRANCE_TOTAL = 960;
const MOBILE_AMBIENT_COUNT = 140;
const MOBILE_ENTRANCE_TOTAL = 280;
const MAX_DPR = 2;
const GATHER_DURATION_MS = 900;
const HOLD_DURATION_MS = 180;
const ENTRANCE_DURATION_MS = 2550;
const CURSOR_RADIUS = 145;
const MAX_MAGNETISED = 34;

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

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -9 * t);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Generates deterministic stipple particles with 3 spatial anchors:
 * 1. Feathered diagonal band (bottom-left → top-right)
 * 2. Hollow-centred circular ring framed behind the editorial headline
 * 3. Stratified ambient field after the radial burst
 */
function buildParticles(
  ambientCount: number,
  totalCount: number,
  width: number,
  height: number
): StippleParticle[] {
  const rand = createSeededRandom(20261128);
  const cols = Math.max(1, Math.round(Math.sqrt(ambientCount * 1.65)));
  const rows = Math.max(1, Math.ceil(ambientCount / cols));
  const particles: StippleParticle[] = [];

  for (let i = 0; i < totalCount; i++) {
    const entranceOnly = i >= ambientCount;

    // 1. Diagonal band from bottom-left (0, 1) to top-right (1, 0)
    const along = rand();
    const spread = (rand() + rand() + rand() - 1.5) * 0.24;
    const startX = clamp01(along + spread * 0.7);
    const startY = clamp01(1 - along + spread * 0.7);

    // 2. Hollow-centred circular ring (denser near perimeter, lighter centre)
    const ringAngle = rand() * Math.PI * 2;
    const ringRadiusFactor = 0.64 + (rand() + rand()) * 0.2;

    // 3. Stratified jittered grid for persistent ambient dots; wide scatter for entrance-only burst dots
    const col = i % cols;
    const row = Math.floor(i / cols);
    const endX = entranceOnly ? rand() : clamp01((col + 0.14 + rand() * 0.72) / cols);
    const endY = entranceOnly ? rand() : clamp01((row + 0.14 + rand() * 0.72) / rows);

    // Calm bottom-left → top-right ambient drift (px per second)
    const speed = 7 + rand() * 11;

    particles.push({
      startX,
      startY,
      ringAngle,
      ringRadiusFactor,
      endX,
      endY,
      burstFactor: entranceOnly ? 0.9 + rand() * 1.15 : 0.55 + rand() * 0.85,
      x: endX * width,
      y: endY * height,
      offsetX: 0,
      offsetY: 0,
      offsetVx: 0,
      offsetVy: 0,
      magnetAngle: rand() * Math.PI * 2,
      magnetOrbitRadius: 16 + rand() * 24,
      magnetCharge: 0,
      driftVx: speed * 0.82,
      driftVy: -speed * 0.52,
      swayPhase: rand() * Math.PI * 2,
      radius: 0.65 + rand() * 0.65,
      delay: rand() * 0.14,
      isAccent: rand() < 0.2,
      entranceOnly,
      alphaScale: 0.74 + rand() * 0.26,
    });
  }

  return particles;
}

/**
 * Gently softens particle opacity directly behind the left editorial headline and copy
 * once settled, preserving crisp legibility across light and dark themes.
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
      magnetBoost: 0.26,
    };
  }

  return {
    primaryRgb: "30, 41, 59",
    accentRgb: "30, 148, 114",
    peakOpacity: 0.58,
    settledOpacity: 0.3,
    magnetBoost: 0.22,
  };
}

/**
 * Mercury Books-inspired hybrid stipple background for HeroSection:
 * 1. Gathers into a circular ring framed directly behind the visible editorial headline area.
 * 2. Bursts radially outward in all directions into a calm ambient stipple field.
 * 3. Features selective cursor magnetism where only captured dots cluster gently around
 *    the pointer and then release/drift away more slowly than the surrounding field.
 * 4. Automatically pauses offscreen (IntersectionObserver) and when the tab is hidden,
 *    and renders a crisp static frame for `prefers-reduced-motion: reduce`.
 */
export default function HeroStippleEntrance() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const staticRedrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
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
        if (p.entranceOnly) continue;
        const alpha =
          palette.settledOpacity *
          p.alphaScale *
          editorialSafeAlpha(p.x, p.y, width, height);

        if (alpha <= 0.01) continue;

        ctx.fillStyle = `rgba(${
          p.isAccent ? palette.accentRgb : palette.primaryRgb
        }, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    staticRedrawRef.current = drawStaticSettled;

    const stepAndDraw = (dtSec: number) => {
      if (width <= 0 || height <= 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const palette = getPalette(themeRef.current);

      // Target the visible editorial headline column (clear of the 3 opaque cards on desktop)
      const isDesktop = width >= 1024;
      const ringCenterX = isDesktop ? width * 0.22 : width * 0.5;
      const ringCenterY = isDesktop ? height * 0.55 : height * 0.24;
      const ringBaseRadius = isDesktop
        ? Math.min(width * 0.175, height * 0.31)
        : Math.min(width * 0.32, height * 0.15);

      if (!entranceComplete) {
        elapsedEntranceMs += dtSec * 1000;
        if (elapsedEntranceMs >= ENTRANCE_DURATION_MS) {
          entranceComplete = true;
          for (let i = 0; i < particles.length; i++) {
            particles[i].x = particles[i].endX * width;
            particles[i].y = particles[i].endY * height;
          }
        }
      } else {
        ambientTimeSec += dtSec;
      }

      // Select up to MAX_MAGNETISED closest dots within CURSOR_RADIUS during Phase 3
      const capturedIndices = new Set<number>();
      if (entranceComplete && hasFinePointer && pointer.active) {
        const candidates: Array<{ index: number; distSq: number }> = [];
        const radiusSq = CURSOR_RADIUS * CURSOR_RADIUS;

        for (let i = 0; i < particles.length; i++) {
          if (particles[i].entranceOnly) continue;
          const dx = particles[i].x - pointer.x;
          const dy = particles[i].y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            candidates.push({ index: i, distSq });
          }
        }

        if (candidates.length > MAX_MAGNETISED) {
          candidates.sort((a, b) => a.distSq - b.distSq);
        }

        const cap = Math.min(candidates.length, MAX_MAGNETISED);
        for (let c = 0; c < cap; c++) {
          capturedIndices.add(candidates[c].index);
        }
      }

      const margin = 12;
      const burstStartMs = GATHER_DURATION_MS + HOLD_DURATION_MS;
      const burstWindowMs = ENTRANCE_DURATION_MS - burstStartMs;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let drawX: number;
        let drawY: number;
        let baseOpacity: number;
        let magnetAlphaBoost = 0;
        let safeZoneBlend = 1;

        if (!entranceComplete) {
          const ringR = ringBaseRadius * p.ringRadiusFactor;
          const ringX = ringCenterX + Math.cos(p.ringAngle) * ringR;
          const ringY = ringCenterY + Math.sin(p.ringAngle) * ringR;

          const startX = p.startX * width;
          const startY = p.startY * height;
          const endX = p.endX * width;
          const endY = p.endY * height;

          const staggeredMs = Math.max(0, elapsedEntranceMs - p.delay * 420);

          if (staggeredMs <= GATHER_DURATION_MS) {
            // Phase 1: Feathered diagonal swath gathers into the headline ring
            const t = easeInOutCubic(clamp01(staggeredMs / GATHER_DURATION_MS));
            drawX = startX + (ringX - startX) * t;
            drawY = startY + (ringY - startY) * t;
            baseOpacity = 0.08 + (palette.peakOpacity - 0.08) * t;
            safeZoneBlend = 0.15;
          } else if (staggeredMs <= burstStartMs) {
            // Micro-hold: slight inward compression right before radial explosion
            const holdT = clamp01((staggeredMs - GATHER_DURATION_MS) / HOLD_DURATION_MS);
            const squeeze = 1 - Math.sin(holdT * Math.PI) * 0.06;
            drawX = ringCenterX + (ringX - ringCenterX) * squeeze;
            drawY = ringCenterY + (ringY - ringCenterY) * squeeze;
            baseOpacity = palette.peakOpacity;
            safeZoneBlend = 0.15;
          } else {
            // Phase 2: Radial explosion outward in all directions to settled positions
            const rawT = clamp01((staggeredMs - burstStartMs) / burstWindowMs);
            const t = easeOutExpo(rawT);

            // Brief outward radial kick along ringAngle that peaks early then blends into target
            const burstEnvelope = Math.sin(rawT * Math.PI) * (1 - rawT * 0.45);
            const burstKick = burstEnvelope * ringBaseRadius * 0.65 * p.burstFactor;
            const kickX = Math.cos(p.ringAngle) * burstKick;
            const kickY = Math.sin(p.ringAngle) * burstKick;

            drawX = ringX + (endX - ringX) * t + kickX;
            drawY = ringY + (endY - ringY) * t + kickY;
            const targetOpacity = p.entranceOnly ? 0 : palette.settledOpacity;
            baseOpacity =
              palette.peakOpacity +
              (targetOpacity - palette.peakOpacity) * rawT;
            safeZoneBlend = 0.15 + 0.85 * rawT;
          }
        } else {
          if (p.entranceOnly) continue;
          // Phase 3: Calm ambient drift + selective cursor magnetism with slow release
          const isCaptured = capturedIndices.has(i);

          if (isCaptured) {
            // Ramp up magnetic charge briskly while captured
            p.magnetCharge = Math.min(1, p.magnetCharge + dtSec * 4.5);
          } else if (p.magnetCharge > 0) {
            // Release slowly so only magnetised dots trail and peel away gracefully
            p.magnetCharge = Math.max(0, p.magnetCharge - dtSec * 0.72);
          }

          // Slow down ambient drift only for dots currently peeling away from the magnet
          const driftPace = 1 - p.magnetCharge * 0.68;
          const sway = Math.sin(ambientTimeSec * 0.7 + p.swayPhase) * 3.5;
          p.x += p.driftVx * driftPace * dtSec;
          p.y += (p.driftVy + sway * 0.25) * driftPace * dtSec;

          // Seamless edge wrapping
          if (p.x > width + margin) p.x = -margin;
          if (p.x < -margin) p.x = width + margin;
          if (p.y < -margin) p.y = height + margin;
          if (p.y > height + margin) p.y = -margin;

          let targetOx = 0;
          let targetOy = 0;

          if (isCaptured) {
            // Pull inward toward a delicate orbiting halo around the cursor
            const orbitAngle = p.magnetAngle + ambientTimeSec * 0.45;
            const desiredX = pointer.x + Math.cos(orbitAngle) * p.magnetOrbitRadius;
            const desiredY = pointer.y + Math.sin(orbitAngle) * p.magnetOrbitRadius;
            targetOx = desiredX - p.x;
            targetOy = desiredY - p.y;
          }

          // Fast magnetic capture vs. slow, velvety release for magnetised dots only
          if (isCaptured || p.magnetCharge > 0.005 || Math.abs(p.offsetX) > 0.05 || Math.abs(p.offsetY) > 0.05) {
            const stiffness = isCaptured ? 16 : 2.1;
            const damping = isCaptured ? 7.2 : 3.9;
            p.offsetVx += ((targetOx - p.offsetX) * stiffness - p.offsetVx * damping) * dtSec;
            p.offsetVy += ((targetOy - p.offsetY) * stiffness - p.offsetVy * damping) * dtSec;
            p.offsetX += p.offsetVx * dtSec;
            p.offsetY += p.offsetVy * dtSec;
          } else {
            p.offsetX = 0;
            p.offsetY = 0;
            p.offsetVx = 0;
            p.offsetVy = 0;
          }

          drawX = p.x + p.offsetX;
          drawY = p.y + p.offsetY;
          baseOpacity = palette.settledOpacity;
          magnetAlphaBoost = p.magnetCharge * palette.magnetBoost;
        }

        const safeAlpha = editorialSafeAlpha(drawX, drawY, width, height);
        const safeZoneMultiplier = 1 - (1 - safeAlpha) * safeZoneBlend;
        const alpha = Math.min(
          0.85,
          (baseOpacity + magnetAlphaBoost) * p.alphaScale * safeZoneMultiplier
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

      const targetAmbient =
        width >= 768 ? DESKTOP_AMBIENT_COUNT : MOBILE_AMBIENT_COUNT;
      const targetTotal =
        width >= 768 ? DESKTOP_ENTRANCE_TOTAL : MOBILE_ENTRANCE_TOTAL;
      if (particles.length !== targetTotal) {
        particles = buildParticles(targetAmbient, targetTotal, width, height);
      } else if (prevWidth > 0 && prevHeight > 0) {
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
