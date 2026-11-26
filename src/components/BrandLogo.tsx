"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface LayerConfig {
  id: string;
  size: number;
  slots: readonly [Point, Point, Point, Point];
  startIndex: number;
  delay: number;
  expand: boolean;
  className: string;
}

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

type CubicBezier = [number, number, number, number];
const EXPAND_EASE: CubicBezier = [0.4, 0, 0.2, 1];
const CONTRACT_BOUNCE_EASE: CubicBezier = [0.34, 1.24, 0.64, 1];
const TRAIL_BOUNCE_EASE: CubicBezier = [0.34, 1.2, 0.64, 1];

/** 13-point timeline for the lead square: start → 2-block expand → contract → hold. */
const LEAD_TIMES = [
  0.0, 0.1, 0.21, 0.25,
  0.35, 0.46, 0.5,
  0.6, 0.71, 0.75,
  0.85, 0.96, 1.0,
];

const LEAD_EASES: (CubicBezier | "linear")[] = [
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
  EXPAND_EASE, CONTRACT_BOUNCE_EASE, "linear",
];

/** 9-point timeline for trailing 1-block squares: slide corner-to-corner → brief hold. */
const TRAIL_TIMES = [
  0.0, 0.21, 0.25,
  0.46, 0.5,
  0.71, 0.75,
  0.96, 1.0,
];

const TRAIL_EASES: (CubicBezier | "linear")[] = [
  TRAIL_BOUNCE_EASE, "linear",
  TRAIL_BOUNCE_EASE, "linear",
  TRAIL_BOUNCE_EASE, "linear",
  TRAIL_BOUNCE_EASE, "linear",
];

const LAYERS: readonly LayerConfig[] = [
  {
    id: "tail",
    size: 12.5,
    slots: TAIL_SLOTS,
    startIndex: 0, // Top-Left (2 steps behind Lead)
    delay: 0.15,
    expand: false,
    className: "z-10 bg-[#10161C]/18",
  },
  {
    id: "mid",
    size: 15,
    slots: MID_SLOTS,
    startIndex: 1, // Bottom-Left (1 step behind Lead)
    delay: 0.075,
    expand: false,
    className: "z-20 bg-[#10161C]/32",
  },
  {
    id: "lead",
    size: 16,
    slots: LEAD_SLOTS,
    startIndex: 2, // Bottom-Right (leading foreground square)
    delay: 0,
    expand: true,
    className: "z-30 bg-[#10161C]",
  },
];

/**
 * Builds keyframes for the leading square (expands into 2 blocks before contracting)
 * or trailing squares (remains a single 1×1 block following behind).
 */
function buildLayerAnimation(layer: LayerConfig) {
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
      // Expand into a 2-block bar spanning both `from` and `to`
      x.push(Math.min(from.x, to.x));
      y.push(Math.min(from.y, to.y));
      width.push(Math.abs(to.x - from.x) + size);
      height.push(Math.abs(to.y - from.y) + size);
    }

    // Arrive at `to` as a single square
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

  return {
    keyframes: { x, y, width, height },
    times: expand ? LEAD_TIMES : TRAIL_TIMES,
    ease: expand ? LEAD_EASES : TRAIL_EASES,
  };
}

const LAYER_ANIMATIONS = LAYERS.map((layer) => ({
  layer,
  ...buildLayerAnimation(layer),
}));

export default function BrandLogo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      className="relative inline-block h-9 w-9 shrink-0 overflow-visible"
      aria-hidden="true"
    >
      {LAYER_ANIMATIONS.map(({ layer, keyframes, times, ease }) => {
        const start = layer.slots[layer.startIndex];

        return (
          <motion.span
            key={layer.id}
            initial={{
              x: start.x,
              y: start.y,
              width: layer.size,
              height: layer.size,
            }}
            animate={
              prefersReducedMotion
                ? {
                    x: start.x,
                    y: start.y,
                    width: layer.size,
                    height: layer.size,
                  }
                : keyframes
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: LOOP_DURATION_S,
                    times,
                    ease,
                    delay: layer.delay,
                    repeat: Infinity,
                  }
            }
            className={`absolute top-0 left-0 rounded-[5px] will-change-transform ${layer.className}`}
          />
        );
      })}
    </span>
  );
}
