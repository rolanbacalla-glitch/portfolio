import type { Metadata } from "next";
import { Inter, Headland_One } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const headlandOne = Headland_One({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Portfolio",
    default: "Modern Portfolio | Creative Developer",
  },
  description: "A premium, high-impact portfolio built with Next.js, Framer Motion, and GSAP.",
  openGraph: {
    title: "Modern Portfolio | Creative Developer",
    description: "A premium, high-impact portfolio built with Next.js, Framer Motion, and GSAP.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${headlandOne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}