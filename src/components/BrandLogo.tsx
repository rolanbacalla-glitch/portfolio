"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Counter-clockwise orbit slots inside the 36px × 36px brand mark.
 * Base square size is 16px × 16px (h-4 w-4) with rounded-[5px] corners.
 * Order: Top-Left → Bottom-Left → Bottom-Right → Top-Right (CCW).
 */
const LEAD_SLOTS = [
  { x: 0, y: 0 }, // 0: Top-Left
  { x: 0, y: 20 }, // 1: Bottom-Left
  { x: 20, y: 20 }, // 2: Bottom-Right
  { x: 20, y: 0 }, // 3: Top-Right
] as const;

/** Middle trailing square tucked 3px inward towards the centre (10, 10). */
const MID_SLOTS = [
  { x: 3, y: 3 },
  { x: 3, y: 17 },
  { x: 17, y: 17 },
  { x: 17, y: 3 },
] as const;

/** Tail square tucked 5.5px inward towards the centre (10, 10) for subtle overlap. */
const TAIL_SLOTS = [
  { x: 5.5, y: 5.5 },
  { x: 5.5, y: 14.5 },
  { x: 14.5, y: 14.5 },
  { x: 14.5, y: 5.5 },
] as const;

/** Cadence per 90° counter-clockwise step (650ms ≈ 2.6s per full revolution). */
const STEP_INTERVAL_MS = 650;

const LAYERS = [
  {
    id: "tail",
    slots: TAIL_SLOTS,
    startIndex: 0, // Starts at Top-Left (2 steps behind Lead)
    scale: 0.78,
    delay: 0.11,
    visualDuration: 0.48,
    bounce: 0.2,
    className: "z-10 bg-[#10161C]/18",
  },
  {
    id: "mid",
    slots: MID_SLOTS,
    startIndex: 1, // Starts at Bottom-Left (1 step behind Lead)
    scale: 0.95,
    delay: 0.055,
    visualDuration: 0.42,
    bounce: 0.22,
    className: "z-20 bg-[#10161C]/32",
  },
  {
    id: "lead",
    slots: LEAD_SLOTS,
    startIndex: 2, // Starts at Bottom-Right (leading foreground square)
    scale: 1,
    delay: 0,
    visualDuration: 0.36,
    bounce: 0.24,
    className: "z-30 bg-[#10161C]",
  },
] as const;

export default function BrandLogo() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setStep((prev) => prev + 1);
    }, STEP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeStep = prefersReducedMotion ? 0 : step;

  return (
    <span
      className="relative inline-block h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      {LAYERS.map((layer) => {
        const slotIndex = (layer.startIndex + activeStep) % 4;
        const target = layer.slots[slotIndex];

        return (
          <motion.span
            key={layer.id}
            initial={false}
            animate={{
              x: target.x,
              y: target.y,
              scale: layer.scale,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    visualDuration: layer.visualDuration,
                    bounce: layer.bounce,
                    delay: layer.delay,
                  }
            }
            className={`absolute top-0 left-0 h-4 w-4 rounded-[5px] will-change-transform ${layer.className}`}
          />
        );
      })}
    </span>
  );
}
