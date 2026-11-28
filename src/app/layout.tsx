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
  metadataBase: new URL("https://rolanbacalla.online"),
  title: {
    template: "%s | Rolan Bacalla",
    default: "Rolan Bacalla — UX/UI & Product Designer",
  },
  description:
    "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.",
  keywords: [
    "Rolan Bacalla",
    "UX Designer",
    "UI Designer",
    "Product Designer",
    "Design Systems",
    "London Product Designer",
    "Portfolio",
  ],
  authors: [{ name: "Rolan Bacalla", url: "https://rolanbacalla.online" }],
  creator: "Rolan Bacalla",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "6owHdHm79aL_eOwfX7Z1oPO6bsk4yO16l26nRwDiqMU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rolan Bacalla — UX/UI & Product Designer",
    description:
      "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.",
    url: "https://rolanbacalla.online",
    siteName: "Rolan Bacalla",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rolan Bacalla — UX/UI & Product Designer",
    description:
      "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Rolan Bacalla",
      url: "https://rolanbacalla.online",
      jobTitle: "UX/UI & Product Designer",
      description:
        "London-based UX/UI and product designer specialising in connected audio, mobile apps, and design systems.",
    },
    {
      "@type": "WebSite",
      name: "Rolan Bacalla",
      url: "https://rolanbacalla.online",
      inLanguage: "en-GB",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}