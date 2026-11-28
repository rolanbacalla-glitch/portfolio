import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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

const SITE_TITLE = "Rolan Bacalla — UX/UI & Product Designer";
const SITE_DESCRIPTION =
  "London-based UX/UI and product designer turning complex product ideas into clear, intuitive digital experiences across connected audio, mobile apps, and design systems.";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL;
const metadataBase = (() => {
  if (!rawSiteUrl) return undefined;
  try {
    return new URL(rawSiteUrl);
  } catch {
    return undefined;
  }
})();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rolan Bacalla",
  jobTitle: "UX/UI & Product Designer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.linkedin.com/in/rolan-bacalla/",
    "https://github.com/rolanbacalla-glitch/",
  ],
};

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: {
    template: "%s | Rolan Bacalla",
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: "6owHdHm79aL_eOwfX7Z1oPO6bsk4yO16l26nRwDiqMU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Rolan Bacalla",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#EAECEF] text-[#10161C] transition-colors duration-200 dark:bg-[#070A0E] dark:text-[#F4F6F9] font-sans">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  cookie_domain: 'rolanbacalla.online',
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}