import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
      className={`${dmSans.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#EAECEF] text-[#10161C] font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}