import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rolan Bacalla",
    default: "Rolan Bacalla — UX/UI & Product Designer",
  },
  description:
    "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.",
  openGraph: {
    title: "Rolan Bacalla — UX/UI & Product Designer",
    description:
      "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-[#EAECEF] text-[#10161C] transition-colors duration-200 dark:bg-[#070A0E] dark:text-[#F4F6F9] font-sans">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}