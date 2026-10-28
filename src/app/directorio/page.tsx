"use client";

import React, { useState } from "react";
import { DIRECTORY_DATA } from "@/data/directoryData";
import { 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Search, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function DirectorioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredItems = DIRECTORY_DATA.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.services.some(s => s.toLowerCase().includes(query));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header - Clean Open Layout */}
      <div className="max-w-3xl space-y-2 pb-2 border-b border-slate-200/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>Directorio Humanitario y Oficial Verificado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Puntos de Apoyo, Albergues y Fuentes Oficiales
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Directorio de instituciones legítimas en Guatemala (IGM, Casas del Migrante, OIM, Plan Retorno al Hogar y ENRO) para evitar intermediarios clandestinos o estafas.
        </p>
      </div>

      {/* Warning Alert - Subtle Banner */}
      <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl flex items-center gap-3 text-xs text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <div>
          <strong className="text-amber-900 font-semibold">Importante:</strong> Todos los albergues humanitarios y citas en sitios oficiales son <strong className="font-semibold">100% GRATUITOS</strong>. Nunca entregues dinero a personas que ofrezcan turnos en la calle.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-slate-200/80 p-3.5 rounded-2xl shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por institución, ubicación (Quetzaltenango, San Marcos, Guatemala) o servicio..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-normal"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { key: "all", label: "Todas las Instituciones" },
            { key: "Oficial Gubernamental", label: "Gubernamentales" },
            { key: "Albergue / Casa del Migrante", label: "Casas del Migrante" },
            { key: "Organismo Internacional", label: "Organismos (OIM)" },
            { key: "Educación / Comunidad", label: "Educación (ENRO)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedType(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedType === tab.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 shadow-2xs hover:shadow-md flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verificado Oficial
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{item.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">{item.description}</p>

              {/* Location & Address - Clean Inline */}
              <div className="flex items-start gap-1.5 text-xs text-slate-700 mb-3">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 font-semibold">{item.location}:</strong> {item.address}</span>
              </div>

              {/* Free notice - Clean text note */}
              <div className="text-[11px] text-emerald-700 flex items-center gap-1.5 mb-4 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.freeServicesNote}</span>
              </div>
            </div>

            {/* Contact Actions Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-2xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Llamar: {item.phone}</span>
                </a>

                {item.emergencyPhone && (
                  <a
                    href={`tel:${item.emergencyPhone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition-all"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Línea: {item.emergencyPhone}</span>
                  </a>
                )}
              </div>

              {item.websiteUrl && item.websiteUrl !== "#" && (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  <span>Sitio Web</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
