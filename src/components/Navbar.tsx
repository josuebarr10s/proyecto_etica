"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  BookOpen, 
  Users, 
  ShieldAlert, 
  CheckSquare, 
  MapPin, 
  HeartHandshake, 
  Menu, 
  X,
  AlertTriangle
} from "lucide-react";
import SosSafetyModal from "./SosSafetyModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio", icon: Compass },
    { href: "/experiencias", label: "Experiencias", icon: Users },
    { href: "/cursos", label: "Cursos y Recursos", icon: BookOpen },
    { href: "/guia-digital", label: "Guía de Seguridad", icon: ShieldAlert },
    { href: "/evaluacion", label: "Evaluación ENRO", icon: CheckSquare },
    { href: "/directorio", label: "Directorio Oficial", icon: MapPin },
    { href: "/etica-y-proyecto", label: "Ética y Proyecto", icon: HeartHandshake },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7DECE] text-stone-900 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo y Branding */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-stone-900 block group-hover:text-amber-700 transition-colors">
                  Conectando Caminos
                </span>
                <span className="text-xs text-amber-800 font-semibold tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Alfabetización Digital Inclusiva
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Navegación principal">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#EFE8DC] text-amber-900 border border-[#DACFBE] shadow-xs"
                        : "text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE2]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-700" : "text-stone-400"}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Botón SOS de Emergencia */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setSosModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-600/20 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Botón de emergencia y números de auxilio"
              >
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Auxilio / SOS</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setSosModalOpen(true)}
                className="p-2 bg-red-600 text-white rounded-lg sm:hidden flex items-center justify-center shadow"
                aria-label="Auxilio SOS rápido"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#F0EAE1] text-stone-700 hover:text-stone-900 hover:bg-[#E7DECE] focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E7DECE] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-3 pt-2">
              Módulos del Proyecto
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-[#EFE8DC] text-amber-900 border border-[#DACFBE]"
                      : "text-stone-700 hover:bg-[#F2ECE2] hover:text-stone-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-amber-700" : "text-stone-400"}`} />
                  {link.label}
                </Link>
              );
            })}
            
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSosModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-md"
              >
                <AlertTriangle className="w-5 h-5" />
                Botón SOS de Emergencia y Contactos Clave
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal de Emergencia SOS */}
      <SosSafetyModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </>
  );
}
