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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-rose-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sos-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 rounded-2xl border border-rose-200">
              <ShieldAlert className="w-7 h-7 text-rose-600" />
            </div>
            <div>
              <h2 id="sos-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                Líneas de Auxilio y Emergencia Migratoria
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Atención humanitaria, rescate y asesoría oficial sin costo en Guatemala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Numbers Grid */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* IGM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md border border-rose-200/80 inline-block mb-2">
                  Atención y Denuncia Migratoria
                </span>
                <h3 className="font-semibold text-base text-slate-900">Instituto Guatemalteco de Migración</h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Orientación oficial y reporte de abusos migratorios.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-extrabold text-rose-600">1572</span>
                <a 
                  href="tel:1572" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* PNC Rescate */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md border border-rose-200/80 inline-block mb-2">
                  Emergencias y Seguridad PNC
                </span>
                <h3 className="font-semibold text-base text-slate-900">Policía Nacional Civil (PNC)</h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Auxilio inmediato ante asaltos, secuestros o extorsiones.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-extrabold text-rose-600">110</span>
                <a 
                  href="tel:110" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* Bomberos */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-200/80 inline-block mb-2">
                  Auxilio Médico y Rescate
                </span>
                <h3 className="font-semibold text-base text-slate-900">Bomberos Voluntarios y Municipales</h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Primeros auxilios, accidentes y emergencias médicas.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-extrabold text-amber-600">122 / 123</span>
                <a 
                  href="tel:122" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

            {/* Casa del Migrante */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200/80 inline-block mb-2">
                  Albergue y Refugio
                </span>
                <h3 className="font-semibold text-base text-slate-900">Casa del Migrante (Xela)</h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Alimentación, descanso seguro y llamadas humanitarias.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-700">(+502) 7761-4115</span>
                <a 
                  href="tel:+50277614115" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Llamar
                </a>
              </div>
            </div>

          </div>

          {/* Quick Safety Rule Box */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-semibold text-sm">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Reglas de Oro de Seguridad Personal y Digital</span>
            </div>
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside font-normal">
              <li>Nunca entregues tu teléfono desbloqueado ni tus contraseñas a personas desconocidas.</li>
              <li>Aprende de memoria al menos un número telefónico familiar con código de país (+502).</li>
              <li>Si te exigen dinero por un rescate, verifica primero con la <strong className="font-semibold">palabra clave secreta familiar</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <Link
            href="/directorio"
            onClick={onClose}
            className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Ver directorio completo de casas de acogida y consulados</span>
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
