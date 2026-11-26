"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Counter-clockwise slot coordinates inside a 36px × 36px mark:
 * Each square is 16px × 16px with a 4px gap (16 + 4 + 16 = 36px).
 * Order: Top-Left → Bottom-Left → Bottom-Right → Top-Right (CCW).
 */
const CCW_SLOTS = [
  { x: 0, y: 0 }, // 0: Top-Left (starts empty)
  { x: 0, y: 20 }, // 1: Bottom-Left
  { x: 20, y: 20 }, // 2: Bottom-Right
  { x: 20, y: 0 }, // 3: Top-Right
] as const;

/**
 * Three squares starting in Top-Right (3), Bottom-Right (2), and Bottom-Left (1),
 * leaving Top-Left (0) empty.
 * Each tick advances exactly one square counter-clockwise into the empty slot:
 *   Tick 1: TR → TL
 *   Tick 2: BR → TR
 *   Tick 3: BL → BR
 *   Tick 4: TL → BL
 */
const INITIAL_SQUARE_SLOTS = [3, 2, 1] as const;

/**
 * Perceptual spring timing for each 20px tile slide:
 * - visualDuration (0.34s): brisk, physical glide into the empty slot
 * - bounce (0.26): subtle tactile overshoot as the square settles
 * - STEP_INTERVAL_MS (520ms): lets the tiny bounce settle with a brief rhythmic beat
 */
const SLIDE_VISUAL_DURATION_S = 0.34;
const SLIDE_BOUNCE = 0.26;
const STEP_INTERVAL_MS = 520;

export default function BrandLogo() {
  const prefersReducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, STEP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeTick = prefersReducedMotion ? 0 : tick;

  return (
    <span
      className="relative inline-block h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      {INITIAL_SQUARE_SLOTS.map((initialSlot, squareIndex) => {
        const moves = Math.floor((activeTick + 2 - squareIndex) / 3);
        const currentSlot = (initialSlot + moves) % 4;
        const target = CCW_SLOTS[currentSlot];

        return (
          <motion.span
            key={squareIndex}
            initial={false}
            animate={{
              x: target.x,
              y: target.y,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    visualDuration: SLIDE_VISUAL_DURATION_S,
                    bounce: SLIDE_BOUNCE,
                  }
            }
            className="absolute top-0 left-0 h-4 w-4 rounded-[5px] bg-[#10161C] will-change-transform"
          />
        );
      })}
    </span>
  );
}
