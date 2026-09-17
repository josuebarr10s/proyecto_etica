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
      
      {/* Page Header */}
      <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Directorio Humanitario y Oficial Verificado</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Puntos de Apoyo, Albergues y Fuentes Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Directorio telefónico y presencial de instituciones legítimas en Guatemala (IGM, Casas del Migrante, OIM, Plan Retorno al Hogar y ENRO) para evitar intermediarios clandestinos o estafas.
          </p>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-3 text-xs text-amber-950 font-medium">
        <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
        <div>
          <strong className="text-amber-900 font-bold">Información Importante:</strong> Todos los albergues humanitarios de la Pastoral de Movilidad Humana y las citas en las páginas oficiales gubernamentales son <strong>100% GRATUITAS</strong>. Nunca entregues dinero a personas que ofrezcan cupos o turnos en la calle.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-[#E7DECE] p-4 rounded-2xl shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por institución, ubicación (Quetzaltenango, San Marcos, Guatemala) o servicio..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 font-medium"
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
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedType === tab.key
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-[#F5F0E8] text-stone-700 hover:bg-[#EFE8DC] hover:text-stone-900"
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
            className="bg-white border border-[#E7DECE] hover:border-amber-400 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verificado Oficial
                </span>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
              <p className="text-xs text-stone-700 leading-relaxed mb-4 font-medium">{item.description}</p>

              {/* Services List */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Servicios que brinda:</span>
                <ul className="text-xs text-stone-800 space-y-1 list-disc list-inside font-medium">
                  {item.services.map((svc, idx) => (
                    <li key={idx}>{svc}</li>
                  ))}
                </ul>
              </div>

              {/* Location & Address */}
              <div className="p-3 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl space-y-1.5 text-xs text-stone-800 mb-4">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Ubicación:</strong> {item.location}</span>
                </div>
                <div className="text-[11px] text-stone-600 pl-5 font-medium">{item.address}</div>
              </div>

              {/* Free notice */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] text-emerald-950 flex items-center gap-1.5 mb-4 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{item.freeServicesNote}</span>
              </div>
            </div>

            {/* Contact Actions Footer */}
            <div className="pt-3 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Llamar: {item.phone}</span>
                </a>

                {item.emergencyPhone && (
                  <a
                    href={`tel:${item.emergencyPhone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-xs"
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
                  className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-bold"
                >
                  <span>Sitio Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
