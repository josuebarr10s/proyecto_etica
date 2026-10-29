"use client";

import React, { useState, useEffect } from "react";
import { Experience } from "@/types";
import { INITIAL_EXPERIENCES } from "@/data/initialExperiences";
import {
  fetchExperiences,
  createExperienceInDb,
  voteExperienceInDb,
} from "@/lib/db";
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

  // Load experiences from Supabase (or localStorage fallback)
  useEffect(() => {
    let mounted = true;
    async function load() {
      const dbData = await fetchExperiences();
      if (!mounted) return;
      if (dbData && dbData.length > 0) {
        setExperiences(dbData);
      } else {
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
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddExperience = async (newExp: Experience) => {
    const savedInDb = await createExperienceInDb(newExp);
    const finalExp = savedInDb || newExp;
    const updated = [finalExp, ...experiences];
    setExperiences(updated);
    try {
      localStorage.setItem("conectando_caminos_experiences", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleVoteUseful = async (id: string) => {
    const newCount = await voteExperienceInDb(id);
    const updated = experiences.map((exp) => 
      exp.id === id
        ? { ...exp, usefulVotes: newCount !== null ? newCount : exp.usefulVotes + 1 }
        : exp
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
      
      {/* Page Header - Clean Open Layout Without Giant Box */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-slate-200/60">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            <span>Red Comunitaria y Solidaria</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Experiencias y Consejos Digitales
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Un espacio seguro y colaborativo donde personas migrantes, retornadas y sus familias comparten qué herramientas digitales les fueron útiles y qué precauciones tomar frente a riesgos y estafas.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Compartir Mi Testimonio</span>
        </button>
      </div>

      {/* Ethical Safeguard Notice */}
      <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <strong className="text-emerald-950 font-semibold">Garantía Ética de Anonimato:</strong> Todos los testimonios pasan por un filtro de minimización de datos para proteger la identidad, privacidad y seguridad de quienes participan, conforme a los principios de la ACM (2018).
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave, aplicación (WhatsApp, Canva, Google Drive) o consejo..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
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
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedStage === tab.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Experience Cards Grid */}
      {filteredExperiences.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No se encontraron testimonios</h3>
          <p className="text-xs text-slate-500 font-normal">
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
