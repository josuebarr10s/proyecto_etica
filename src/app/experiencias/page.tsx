"use client";

import React, { useState, useEffect } from "react";
import { Experience } from "@/types";
import { INITIAL_EXPERIENCES } from "@/data/initialExperiences";
import ExperienceCard from "@/components/ExperienceCard";
import NewExperienceModal from "@/components/NewExperienceModal";
import { 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  HeartHandshake,
  AlertCircle
} from "lucide-react";

export default function ExperienciasPage() {
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load persisted experiences from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("conectando_caminos_experiences");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExperiences(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAddExperience = (newExp: Experience) => {
    const updated = [newExp, ...experiences];
    setExperiences(updated);
    try {
      localStorage.setItem("conectando_caminos_experiences", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleVoteUseful = (id: string) => {
    const updated = experiences.map((exp) => 
      exp.id === id ? { ...exp, usefulVotes: exp.usefulVotes + 1 } : exp
    );
    setExperiences(updated);
    try {
      localStorage.setItem("conectando_caminos_experiences", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesStage = selectedStage === "all" || exp.stage === selectedStage;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      exp.title.toLowerCase().includes(query) ||
      exp.story.toLowerCase().includes(query) ||
      exp.keyAdvice.toLowerCase().includes(query) ||
      exp.digitalToolsUsed.some(t => t.toLowerCase().includes(query));
    return matchesStage && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Red Comunitaria y Solidaria</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Experiencias y Consejos Digitales
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Un espacio seguro y colaborativo donde personas migrantes, retornadas y sus familias comparten qué herramientas digitales les fueron útiles y qué precauciones tomar frente a riesgos y estafas.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-600/20 hover:scale-105 transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Compartir Mi Testimonio</span>
        </button>
      </div>

      {/* Ethical Safeguard Notice */}
      <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs text-emerald-950 font-medium">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
        <div>
          <strong className="text-emerald-900">Garantía Ética de Anonimato:</strong> Todos los testimonios pasan por un filtro de minimización de datos para proteger la identidad, privacidad y seguridad de quienes participan, conforme a los principios de la ACM (2018).
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-[#E7DECE] p-4 rounded-2xl shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave, aplicación (WhatsApp, Canva, Google Drive) o consejo..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { key: "all", label: "Todos los Testimonios" },
            { key: "planificacion", label: "Planificación" },
            { key: "en_transito", label: "En Ruta" },
            { key: "retorno", label: "Retorno" },
            { key: "familiar", label: "Familiares" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStage(tab.key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedStage === tab.key
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-[#F5F0E8] text-stone-700 hover:bg-[#EFE8DC] hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Experience Cards Grid */}
      {filteredExperiences.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E7DECE] rounded-3xl space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
          <h3 className="text-lg font-bold text-stone-900">No se encontraron testimonios</h3>
          <p className="text-xs text-stone-600">
            Intenta cambiar el término de búsqueda o selecciona otra categoría de filtro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onVoteUseful={handleVoteUseful}
            />
          ))}
        </div>
      )}

      {/* Modal for adding experiences */}
      <NewExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExperience={handleAddExperience}
      />

    </div>
  );
}
