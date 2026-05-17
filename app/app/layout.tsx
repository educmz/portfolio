import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eduardo Chacaliaza | Portfolio",
  description: "Portfolio personal de Eduardo Chacaliaza",
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