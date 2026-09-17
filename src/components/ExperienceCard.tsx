"use client";

import React, { useState } from "react";
import { Experience, MigrationStage } from "@/types";
import { 
  ThumbsUp, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Lightbulb, 
  AlertOctagon, 
  Wrench,
  Check
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  onVoteUseful?: (id: string) => void;
}

const STAGE_LABELS: Record<MigrationStage, { label: string; bg: string; text: string; border: string }> = {
  planificacion: {
    label: "Planificación Preventiva",
    bg: "bg-amber-100/80",
    text: "text-amber-950 font-bold",
    border: "border-amber-300"
  },
  en_transito: {
    label: "En Ruta / En Tránsito",
    bg: "bg-orange-100/80",
    text: "text-orange-950 font-bold",
    border: "border-orange-300"
  },
  retorno: {
    label: "Retorno / Reinserción",
    bg: "bg-emerald-100/80",
    text: "text-emerald-950 font-bold",
    border: "border-emerald-300"
  },
  familiar: {
    label: "Familiares en Guatemala",
    bg: "bg-stone-200/80",
    text: "text-stone-900 font-bold",
    border: "border-stone-300"
  }
};

export default function ExperienceCard({ experience, onVoteUseful }: ExperienceCardProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(experience.usefulVotes);
  const [copied, setCopied] = useState(false);

  const stageInfo = STAGE_LABELS[experience.stage] || STAGE_LABELS.planificacion;

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
      if (onVoteUseful) onVoteUseful(experience.id);
    }
  };

  const handleShare = () => {
    const textToShare = `Consejo de Conectando Caminos:\n"${experience.title}"\n${experience.keyAdvice}\nConoce más en Conectando Caminos`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white border border-[#E7DECE] hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between">
      
      {/* Header with Stage Badge and Ethical verification badge */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-1 text-xs rounded-full border ${stageInfo.bg} ${stageInfo.text} ${stageInfo.border}`}>
            {stageInfo.label}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold" title="Verificado sin datos personales sensibles bajo el Código ACM">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Testimonio Protegido</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2 hover:text-amber-800 transition-colors">
          {experience.title}
        </h3>

        {/* Metadata: Author alias, Region, Date */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-500 mb-4 pb-3 border-b border-[#F0EAE1]">
          <span className="font-bold text-stone-800">{experience.authorAlias}</span>
          <span className="flex items-center gap-1 text-stone-600">
            <MapPin className="w-3 h-3 text-amber-700" />
            {experience.departmentOrRegion}
          </span>
          <span className="flex items-center gap-1 text-stone-500">
            <Calendar className="w-3 h-3" />
            {formatDate(experience.date)}
          </span>
        </div>

        {/* Story Text */}
        <p className="text-sm text-stone-700 leading-relaxed mb-5">
          {experience.story}
        </p>

        {/* Tools Used Tags */}
        {experience.digitalToolsUsed.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
              <Wrench className="w-3.5 h-3.5 text-amber-700" />
              <span>Herramientas digitales que sirvieron:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {experience.digitalToolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#F5F0E8] text-amber-950 border border-[#E7DECE] rounded-lg text-xs font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Advice Box */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl mb-3">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
            <Lightbulb className="w-4 h-4 text-amber-700" />
            <span>Consejo práctico para la comunidad:</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed font-medium">
            {experience.keyAdvice}
          </p>
        </div>

        {/* Risks Avoided Box */}
        {experience.risksAvoided && (
          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl mb-5">
            <div className="flex items-center gap-1.5 text-red-900 font-bold text-xs mb-0.5">
              <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
              <span>Riesgo o estafa evitada:</span>
            </div>
            <p className="text-xs text-red-950">
              {experience.risksAvoided}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions: Useful Vote + Share */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F0EAE1] text-xs text-stone-600 mt-2">
        <button
          onClick={handleVote}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            hasVoted
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-[#F5F0E8] hover:bg-[#EFE8DC] text-stone-800"
          }`}
          aria-label="Votar que este testimonio fue útil"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-white" : ""}`} />
          <span>{votes} personas lo encontraron útil</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#F5F0E8] hover:bg-[#EFE8DC] text-stone-800 font-semibold rounded-lg transition-colors"
          title="Copiar consejo para compartir por WhatsApp"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">¡Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-stone-600" />
              <span>Compartir</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
