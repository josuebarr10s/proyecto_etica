"use client";

import React from "react";
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Lock
} from "lucide-react";
import Link from "next/link";

interface SosSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SosSafetyModal({ isOpen, onClose }: SosSafetyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-red-300 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-stone-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sos-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-2xl border border-red-300">
              <ShieldAlert className="w-8 h-8 text-red-700 animate-bounce" />
            </div>
            <div>
              <h2 id="sos-title" className="text-xl sm:text-2xl font-bold text-red-900">
                Líneas de Auxilio y Emergencia Migratoria
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Atención humanitaria, rescate y asesoría oficial sin costo en Guatemala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-[#EFE8DC] rounded-xl transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Emergency Numbers Grid */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* IGM */}
            <div className="bg-white border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 bg-red-50 text-red-800 rounded-md border border-red-200 inline-block mb-2">
                  Atención y Denuncia Migratoria
                </span>
                <h3 className="font-bold text-base text-stone-900">Instituto Guatemalteco de Migración</h3>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Orientación oficial y reporte de abusos migratorios.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="text-lg font-extrabold text-red-700">1572</span>
                <a 
                  href="tel:1572" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* PNC Rescate */}
            <div className="bg-white border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 bg-red-50 text-red-800 rounded-md border border-red-200 inline-block mb-2">
                  Emergencias y Seguridad PNC
                </span>
                <h3 className="font-bold text-base text-stone-900">Policía Nacional Civil (PNC)</h3>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Auxilio inmediato ante asaltos, secuestros o extorsiones.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="text-lg font-extrabold text-red-700">110</span>
                <a 
                  href="tel:110" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* Bomberos */}
            <div className="bg-white border border-[#E7DECE] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 bg-amber-50 text-amber-900 rounded-md border border-amber-200 inline-block mb-2">
                  Auxilio Médico y Rescate
                </span>
                <h3 className="font-bold text-base text-stone-900">Bomberos Voluntarios y Municipales</h3>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Primeros auxilios, accidentes y emergencias médicas.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="text-lg font-extrabold text-amber-800">122 / 123</span>
                <a 
                  href="tel:122" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* Casa del Migrante */}
            <div className="bg-white border border-[#E7DECE] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded-md border border-emerald-200 inline-block mb-2">
                  Albergue y Refugio
                </span>
                <h3 className="font-bold text-base text-stone-900">Casa del Migrante (Xela)</h3>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Alimentación, descanso seguro y llamadas humanitarias.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-800">(+502) 7761-4115</span>
                <a 
                  href="tel:+50277614115" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

          </div>

          {/* Quick Safety Rule Box */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Reglas de Oro de Seguridad Personal y Digital</span>
            </div>
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside font-medium">
              <li>Nunca entregues tu teléfono desbloqueado ni tus contraseñas a personas desconocidas.</li>
              <li>Aprende de memoria al menos un número telefónico familiar con código de país (+502).</li>
              <li>Si te exigen dinero por un rescate, verifica primero con la <strong>palabra clave secreta familiar</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E7DECE] pt-4">
          <Link
            href="/directorio"
            onClick={onClose}
            className="text-xs sm:text-sm text-amber-800 hover:text-amber-900 font-bold inline-flex items-center gap-1 underline underline-offset-4"
          >
            <MapPin className="w-4 h-4" />
            Ver directorio completo de casas de acogida y consulados
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#F0EAE1] hover:bg-[#E7DECE] text-stone-800 rounded-xl text-sm font-bold transition-colors"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
