"use client";

import { useEffect, useRef, useState } from "react";
import {
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface LayerConfig {
  id: string;
  size: number;
  slots: readonly [Point, Point, Point, Point];
  startIndex: number;
  expand: boolean;
  times: readonly number[];
  ease: readonly (CubicBezier | "linear")[];
  className: string;
}

type CubicBezier = [number, number, number, number];

/**
 * Counter-clockwise orbit slots inside the 36px × 36px brand mark.
 * Order: Top-Left → Bottom-Left → Bottom-Right → Top-Right (CCW).
 */
const LEAD_SLOTS: readonly [Point, Point, Point, Point] = [
  { x: 0, y: 0 }, // 0: Top-Left
  { x: 0, y: 20 }, // 1: Bottom-Left
  { x: 20, y: 20 }, // 2: Bottom-Right
  { x: 20, y: 0 }, // 3: Top-Right
];

/** Middle trailing square (15px) tucked 3px inward towards the centre. */
const MID_SLOTS: readonly [Point, Point, Point, Point] = [
  { x: 3, y: 3 },
  { x: 3, y: 18 },
  { x: 18, y: 18 },
  { x: 18, y: 3 },
];

/** Tail trailing square (12.5px) tucked 5.5px inward for subtle layered overlap. */
const TAIL_SLOTS: readonly [Point, Point, Point, Point] = [
  { x: 5.5, y: 5.5 },
  { x: 5.5, y: 18 },
  { x: 18, y: 18 },
  { x: 18, y: 5.5 },
];

/** Full 360° counter-clockwise revolution duration (0.65s per 90° step). */
const LOOP_DURATION_S = 2.6;

const EXPAND_EASE: CubicBezier = [0.4, 0, 0.2, 1];
const CONTRACT_BOUNCE_EASE: CubicBezier = [0.34, 1.24, 0.64, 1];
const TRAIL_BOUNCE_EASE: CubicBezier = [0.34, 1.2, 0.64, 1];

/**
 * Shared 13-point normalised timelines across 4 quarter-turns:
 * - Lead:  0.00→0.10 expand to 2 blocks, 0.10→0.21 contract into 1 block, 0.21→0.25 hold
 * - Mid:   0.00→0.10 wait while lead is 2 blocks, 0.10→0.22 glide as lead contracts, 0.22→0.25 hold
 * - Tail:  0.00→0.125 wait + slight lag behind mid, 0.125→0.24 glide, 0.24→0.25 hold
 */
const LEAD_TIMES = [
  0.0, 0.1, 0.21, 0.25,
  0.35, 0.46, 0.5,
  0.6, 0.71, 0.75,
  0.85, 0.96, 1.0,
] as const;

const MID_TIMES = [
  0.0, 0.1, 0.22, 0.25,
  0.35, 0.47, 0.5,
  0.6, 0.72, 0.75,
  0.85, 0.97, 1.0,
] as const;

const TAIL_TIMES = [
  0.0, 0.125, 0.24, 0.25,
  0.375, 0.49, 0.5,
  0.625, 0.74, 0.75,
  0.875, 0.99, 1.0,
] as const;

const LEAD_EASES: readonly (CubicBezier | "linear")[] = [
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
];

const TRAIL_EASES: readonly (CubicBezier | "linear")[] = [
  "linear", TRAIL_BOUNCE_EASE, "linear",
  "linear", TRAIL_BOUNCE_EASE, "linear",
  "linear", TRAIL_BOUNCE_EASE, "linear",
  "linear", TRAIL_BOUNCE_EASE, "linear",
];

const LAYERS: readonly LayerConfig[] = [
  {
    id: "tail",
    size: 12.5,
    slots: TAIL_SLOTS,
    startIndex: 0, // Top-Left (2 steps behind Lead)
    expand: false,
    times: TAIL_TIMES,
    ease: TRAIL_EASES,
    className: "z-10 bg-[#10161C]/18 dark:bg-[#F4F6F9]/20",
  },
  {
    id: "mid",
    size: 15,
    slots: MID_SLOTS,
    startIndex: 1, // Bottom-Left (1 step behind Lead)
    expand: false,
    times: MID_TIMES,
    ease: TRAIL_EASES,
    className: "z-20 bg-[#10161C]/32 dark:bg-[#F4F6F9]/42",
  },
  {
    id: "lead",
    size: 16,
    slots: LEAD_SLOTS,
    startIndex: 2, // Bottom-Right (leading foreground square)
    expand: true,
    times: LEAD_TIMES,
    ease: LEAD_EASES,
    className: "z-30 bg-[#10161C] dark:bg-[#F4F6F9]",
  },
];

/**
 * Builds synchronised 13-keyframe sequences:
 * - Lead expands into 2 blocks, then contracts into the next CCW corner.
 * - Mid and Tail hold in place while Lead is expanded, then glide forward as Lead contracts.
 */
function buildLayerKeyframes(layer: LayerConfig) {
  const { slots, startIndex, size, expand } = layer;
  const x: number[] = [];
  const y: number[] = [];
  const width: number[] = [];
  const height: number[] = [];

  const p0 = slots[startIndex % 4];
  x.push(p0.x);
  y.push(p0.y);
  width.push(size);
  height.push(size);

  for (let q = 0; q < 4; q++) {
    const from = slots[(startIndex + q) % 4];
    const to = slots[(startIndex + q + 1) % 4];

    if (expand) {
      // Lead expands into a 2-block bar spanning `from` and `to`
      x.push(Math.min(from.x, to.x));
      y.push(Math.min(from.y, to.y));
      width.push(Math.abs(to.x - from.x) + size);
      height.push(Math.abs(to.y - from.y) + size);
    } else {
      // Trailing blocks hold at `from` while Lead is at 2-block size
      x.push(from.x);
      y.push(from.y);
      width.push(size);
      height.push(size);
    }

    // Lead contracts into `to`; trailing blocks glide into `to` as Lead vacates it
    x.push(to.x);
    y.push(to.y);
    width.push(size);
    height.push(size);

    // Brief crisp hold at `to`
    x.push(to.x);
    y.push(to.y);
    width.push(size);
    height.push(size);
  }

  return { x, y, width, height };
}

const LAYER_ANIMATIONS = LAYERS.map((layer) => ({
  layer,
  keyframes: buildLayerKeyframes(layer),
}));

export default function BrandLogo() {
  const prefersReducedMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLButtonElement>();
  const controlsRef = useRef<AnimationPlaybackControls[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const controls = LAYER_ANIMATIONS.map(({ layer, keyframes }) =>
      animate(`[data-logo-layer="${layer.id}"]`, keyframes, {
        duration: LOOP_DURATION_S,
        times: [...layer.times],
        ease: [...layer.ease],
        repeat: Infinity,
      })
    );

    controlsRef.current = controls;

    return () => {
      controls.forEach((control) => control.stop());
      controlsRef.current = [];
    };
  }, [animate, prefersReducedMotion]);

  const handleTogglePlayback = () => {
    if (prefersReducedMotion) return;

    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    controlsRef.current.forEach((control) => {
      if (nextPaused) {
        control.pause();
      } else {
        control.play();
      }
    });
  };

  return (
    <button
      ref={scope}
      type="button"
      onClick={handleTogglePlayback}
      aria-pressed={isPaused}
      aria-label={isPaused ? "Resume logo animation" : "Pause logo animation"}
      title={isPaused ? "Click to resume animation" : "Click to pause animation"}
      className="relative inline-block h-9 w-9 shrink-0 cursor-pointer overflow-visible rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CA884]"
    >
      {LAYER_ANIMATIONS.map(({ layer }) => {
        const start = layer.slots[layer.startIndex];

        return (
          <span
            key={layer.id}
            data-logo-layer={layer.id}
            style={{
              transform: `translateX(${start.x}px) translateY(${start.y}px)`,
              width: layer.size,
              height: layer.size,
            }}
            className={`pointer-events-none absolute top-0 left-0 rounded-[5px] will-change-transform ${layer.className}`}
            aria-hidden="true"
          />
        );
      })}
    </button>
  );
}
