"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`inline-flex h-10 shrink-0 items-center rounded-full border border-[#D8D4CB] bg-white p-1 transition-colors duration-200 dark:border-white/15 dark:bg-[#19202D] ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        aria-label="Switch to light theme"
        title="Light theme"
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:focus-visible:outline-[#54D6AE] bg-[#0F171E] text-white shadow-xs dark:bg-transparent dark:text-[#9CA6B5] dark:shadow-none dark:hover:text-[#F4F6F9]"
      >
        <Sun className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark theme"
        title="Dark theme"
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CA884] dark:focus-visible:outline-[#54D6AE] bg-transparent text-[#6B7280] hover:text-[#10161C] dark:bg-[#F4F6F9] dark:text-[#0F131A] dark:shadow-xs dark:hover:text-[#0F131A]"
      >
        <Moon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}
