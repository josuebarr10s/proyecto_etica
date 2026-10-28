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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo y Branding */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-lg p-1">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-2xs text-white transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 block group-hover:text-slate-700 transition-colors">
                  Conectando Caminos
                </span>
                <span className="text-[11px] text-slate-500 font-normal tracking-normal flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-slate-100 text-slate-900 border border-slate-200/80 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Botón SOS de Emergencia - Desaturated & Discreet */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setSosModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50/70 hover:bg-rose-100/70 text-rose-700 border border-rose-200/80 font-medium text-xs rounded-xl transition-colors shadow-2xs"
                aria-label="Botón de emergencia y números de auxilio"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Líneas SOS</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setSosModalOpen(true)}
                className="p-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg sm:hidden flex items-center justify-center shadow-2xs"
                aria-label="Auxilio SOS rápido"
              >
                <AlertTriangle className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-lg">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pt-1">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-semibold border border-slate-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-slate-400"}`} />
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
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow-xs"
              >
                <AlertTriangle className="w-4 h-4" />
                Botón SOS de Emergencia y Contactos
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
