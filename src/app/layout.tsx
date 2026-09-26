import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Allura } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anclora Private Estates | The Zenith of Mediterranean Living",
  description: "Ultra-luxury residences in Port d'Andratx, Mallorca. A limited collection of sophisticated homes offering unparalleled Mediterranean living and exceptional investment potential.",
  keywords: ["luxury real estate", "Mallorca", "Port d'Andratx", "Mediterranean", "investment property", "ultra-luxury"],
  authors: [{ name: "Anclora Private Estates" }],
  creator: "Anclora Group",
  applicationName: "Anclora Private Estates",
  category: "Real Estate",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://anclora-estates.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Anclora Private Estates | The Zenith of Mediterranean Living",
    description: "Blueprint portfolio project for premium real estate digital experience by Anclora Group.",
    type: "website",
    url: "https://anclora-estates.com",
    siteName: "Anclora Private Estates",
    locale: "es_ES",
    images: [
      {
        url: "/images/hero/hero-daylight.jpg",
        width: 1920,
        height: 1080,
        alt: "Anclora Private Estates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anclora Private Estates",
    description: "Blueprint project showcasing premium digital execution for luxury real estate.",
    images: ["/images/hero/hero-daylight.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anclora Private Estates",
    url: "https://anclora-estates.com",
    logo: "https://anclora-estates.com/anclora-private-estates-exp.png",
    parentOrganization: {
      "@type": "Organization",
      name: "Anclora Group",
    },
    areaServed: "Mallorca, Spain",
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Anclora Private Estates Blueprint Project",
    creator: "Anclora Group",
    inLanguage: ["es", "en"],
    description:
      "Portfolio blueprint project demonstrating premium digital design and engineering for luxury real estate.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anclora Private Estates",
    url: "https://anclora-estates.com",
    inLanguage: ["es", "en"],
  };

  const structuredData = [organizationSchema, projectSchema, websiteSchema];

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${montserrat.variable} ${allura.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
