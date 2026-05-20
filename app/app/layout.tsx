import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eduardo-chacaliaza.dev"),
  title: {
    default: "Eduardo Chacaliaza | Portfolio",
    template: "%s | Eduardo Chacaliaza",
  },
  description:
    "Portafolio de Eduardo Chacaliaza, desarrollador full stack orientado a aplicaciones web, desktop, sistemas modernos e inteligencia artificial.",
  keywords: [
    "Eduardo Chacaliaza",
    "desarrollador web",
    "full stack developer",
    "software developer",
    "portfolio",
    "react developer",
    "Next.js developer",
    "web projects",
    "software engineering",
    "Lima Peru",
  ],
  authors: [{ name: "Eduardo Chacaliaza" }],
  creator: "Eduardo Chacaliaza",
  publisher: "Eduardo Chacaliaza",
  applicationName: "Eduardo Chacaliaza Portfolio",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Eduardo Chacaliaza Portfolio",
    title: "Eduardo Chacaliaza | Portfolio",
    description:
      "Proyectos, habilidades y certificados de Eduardo Chacaliaza, desarrollador full stack enfocado en software moderno, producto e IA.",
    images: [
      {
        url: "/images/profile/hero-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Eduardo Chacaliaza portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Chacaliaza | Portfolio",
    description:
      "Portfolio de desarrollo full stack, aplicaciones web, desktop e inteligencia artificial.",
    images: ["/images/profile/hero-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
