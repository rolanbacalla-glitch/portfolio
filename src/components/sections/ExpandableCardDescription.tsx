"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp, Pointer } from "lucide-react";

interface TapRipple {
  id: number;
  x: number;
  y: number;
}

interface ExpandableCardDescriptionProps {
  text: string;
  projectTitle: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExpandableCardDescription({
  text,
  projectTitle,
  isExpanded,
  onToggle,
}: ExpandableCardDescriptionProps) {
  const prefersReducedMotion = useReducedMotion();
  const descriptionId = useId();
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(true);
  const [ripples, setRipples] = useState<TapRipple[]>([]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measureOverflow = () => {
      if (!isExpanded) {
        setIsTruncated(el.scrollHeight > el.clientHeight + 1);
      }
    };

    measureOverflow();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measureOverflow);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", measureOverflow);
    return () => window.removeEventListener("resize", measureOverflow);
  }, [text, isExpanded, isTruncated]);

  const handleTap = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!prefersReducedMotion) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x =
        event.clientX === 0 && event.clientY === 0
          ? rect.width / 2
          : event.clientX - rect.left;
      const y =
        event.clientX === 0 && event.clientY === 0
          ? rect.height / 2
          : event.clientY - rect.top;

      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, 520);
    }

    onToggle();
  };

  if (!isTruncated && !isExpanded) {
    return (
      <p
        ref={textRef}
        className="mt-2.5 w-full text-[14px] leading-[1.55] text-white/80 line-clamp-2"
      >
        {text}
      </p>
    );
  }

  return (
    <div className="pointer-events-auto relative z-30 mt-2 w-full">
      <button
        type="button"
        onClick={handleTap}
        aria-expanded={isExpanded}
        aria-controls={descriptionId}
        aria-label={
          isExpanded
            ? `Collapse full description for ${projectTitle}`
            : `Tap to read complete description for ${projectTitle}`
        }
        className={`group/desc relative -mx-2.5 block w-[calc(100%+1.25rem)] cursor-pointer overflow-hidden rounded-xl border px-2.5 py-2 text-left transition-all duration-200 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54D6AE] ${
          isExpanded
            ? "border-white/15 bg-[#090D12]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            : "border-transparent bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.08]"
        }`}
      >
        {/* Tactile Radial Tap Ripple */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ opacity: 0.45, scale: 0 }}
              animate={{ opacity: 0, scale: 3.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 64,
                height: 64,
                marginLeft: -32,
                marginTop: -32,
              }}
              className="pointer-events-none absolute rounded-full bg-[#54D6AE]/35"
              aria-hidden="true"
            />
          ))}
        </AnimatePresence>

        {/* Description Text (2-line clamped with ellipsis when collapsed, full text when expanded) */}
        <p
          id={descriptionId}
          ref={textRef}
          className={`relative z-10 w-full text-[14px] leading-[1.55] transition-colors duration-200 ${
            isExpanded
              ? "text-white/95"
              : "line-clamp-2 text-white/80 group-hover/desc:text-white/95"
          }`}
        >
          {text}
        </p>

        {/* Explicit Tap Gesture Affordance Cue */}
        <span className="relative z-10 mt-2 flex items-center justify-between gap-2 text-[11.5px] font-medium tracking-[0.01em] text-white/60 transition-colors duration-200 group-hover/desc:text-white/90">
          <span className="inline-flex items-center gap-1.5">
            {!isExpanded ? (
              <>
                <span
                  className="relative inline-flex h-4 w-4 items-center justify-center"
                  aria-hidden="true"
                >
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#54D6AE]/70"
                      initial={{ scale: 0.65, opacity: 0 }}
                      animate={{
                        scale: [0.65, 1.55, 1.55],
                        opacity: [0, 0.7, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 1.4,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <motion.span
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { y: [0, 1.5, 0], scale: [1, 0.92, 1] }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 1.4,
                      ease: "easeInOut",
                    }}
                    className="inline-flex"
                  >
                    <Pointer
                      className="h-3.5 w-3.5 text-[#54D6AE]"
                      strokeWidth={1.9}
                    />
                  </motion.span>
                </span>
                <span>Tap to read full description</span>
              </>
            ) : (
              <>
                <ChevronUp
                  className="h-3.5 w-3.5 text-[#54D6AE]"
                  aria-hidden="true"
                />
                <span>Tap to collapse</span>
              </>
            )}
          </span>

          {!isExpanded && (
            <ChevronDown
              className="h-3.5 w-3.5 shrink-0 text-white/45 transition-transform duration-200 group-hover/desc:translate-y-0.5 group-hover/desc:text-[#54D6AE]"
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </div>
  );
}
