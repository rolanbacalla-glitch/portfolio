export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "rolan-portfolio-theme";

/**
 * Synchronous pre-hydration boot script to prevent light/dark theme flash (FOUC).
 * Respects saved user preference first, then falls back to OS prefers-color-scheme.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=window.localStorage.getItem(k);var t=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`;
