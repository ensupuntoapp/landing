import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnSuPunto | Menús familiares coordinados con el comedor escolar",
  description:
    "Landing de validación de EnSuPunto: menos estrés en la cocina, menos desperdicio y más tiempo en familia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
