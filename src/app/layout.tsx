import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityBar from "@/components/AccessibilityBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conectando Caminos | Alfabetización Digital Inclusiva para Migrantes en Guatemala",
  description: "Plataforma educativa, humanitaria y comunitaria para fortalecer las competencias digitales, seguridad informática y acceso a fuentes oficiales de personas migrantes y sus familias en Guatemala (Universidad Rafael Landívar / ENRO).",
  keywords: [
    "Conectando Caminos",
    "Alfabetización Digital Migrantes",
    "Guatemala",
    "Ciberseguridad",
    "Casas del Migrante",
    "Instituto Guatemalteco de Migración",
    "ENRO Quetzaltenango",
    "Universidad Rafael Landívar"
  ],
  authors: [
    { name: "Kevin Castañon" },
    { name: "Josué Barrios" },
    { name: "Luis Ixquiac" },
    { name: "Fátima Tzoc" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-200 selection:text-stone-900">
        <AccessibilityBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
