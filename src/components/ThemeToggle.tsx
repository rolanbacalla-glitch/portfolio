"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D8D4CB] bg-white text-[#10161C] transition-all duration-200 hover:border-[#10161C] hover:bg-[#0F171E] hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:border-white/15 dark:bg-[#19202D] dark:text-[#F4F6F9] dark:hover:border-[#54D6AE]/60 dark:hover:bg-[#232D3F] dark:hover:text-[#54D6AE] dark:focus-visible:outline-[#54D6AE] ${className}`}
    >
      <Moon
        className="block h-4 w-4 transition-transform duration-200 group-hover:-rotate-12 dark:hidden"
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <Sun
        className="hidden h-4 w-4 transition-transform duration-200 group-hover:rotate-12 dark:block"
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </button>
  );
}
