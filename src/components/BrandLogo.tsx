"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Counter-clockwise slot coordinates inside a 36px × 36px mark:
 * Each square is 16px × 16px with a 4px gap (16 + 4 + 16 = 36px).
 * Order: Top-Left → Bottom-Left → Bottom-Right → Top-Right (CCW).
 */
const CCW_SLOTS = [
  { x: 0, y: 0 }, // 0: Top-Left
  { x: 0, y: 20 }, // 1: Bottom-Left
  { x: 20, y: 20 }, // 2: Bottom-Right
  { x: 20, y: 0 }, // 3: Top-Right
] as const;

const SQUARES = [0, 1, 2, 3] as const;

/** Stagger between consecutive squares so each visibly nudges the next (seconds). */
const PUSH_STAGGER_S = 0.068;

/** Pause between ambient counter-clockwise push cycles (milliseconds). */
const CYCLE_INTERVAL_MS = 2600;

interface BrandLogoProps {
  /** Incremented by the parent (e.g. on link hover) to trigger an immediate push. */
  triggerCount?: number;
}

export default function BrandLogo({ triggerCount = 0 }: BrandLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ambientStep, setAmbientStep] = useState(0);

  const step = prefersReducedMotion ? 0 : ambientStep + triggerCount;

  // Ambient counter-clockwise push loop; automatically resets after any hover push
  useEffect(() => {
    if (prefersReducedMotion) return;

    const delay = step === 0 ? 1200 : CYCLE_INTERVAL_MS;
    const timer = window.setTimeout(() => {
      setAmbientStep((prev) => prev + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [step, prefersReducedMotion]);

  return (
    <span
      className="relative inline-block h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      {SQUARES.map((squareIndex) => {
        const currentSlot = (squareIndex + step) % 4;
        const previousSlot = (squareIndex + step - 1 + 4) % 4;
        const target = CCW_SLOTS[currentSlot];

        // Initiate the push wave from the Top-Left slot (previousSlot === 0)
        // so TL pushes BL → BL pushes BR → BR pushes TR → TR glides into TL.
        const staggerDelay =
          step === 0 || prefersReducedMotion ? 0 : previousSlot * PUSH_STAGGER_S;

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
                    stiffness: 380,
                    damping: 26,
                    mass: 0.82,
                    delay: staggerDelay,
                  }
            }
            className="absolute top-0 left-0 h-4 w-4 rounded-[5px] bg-[#10161C] will-change-transform"
          />
        );
      })}
    </span>
  );
}
