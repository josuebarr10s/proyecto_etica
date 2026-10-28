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
    bg: "bg-amber-50",
    text: "text-amber-700 font-medium",
    border: "border-amber-200/80"
  },
  en_transito: {
    label: "En Ruta / En Tránsito",
    bg: "bg-sky-50",
    text: "text-sky-700 font-medium",
    border: "border-sky-200/80"
  },
  retorno: {
    label: "Retorno / Reinserción",
    bg: "bg-emerald-50",
    text: "text-emerald-700 font-medium",
    border: "border-emerald-200/80"
  },
  familiar: {
    label: "Familiares en Guatemala",
    bg: "bg-indigo-50",
    text: "text-indigo-700 font-medium",
    border: "border-indigo-200/80"
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
    <div className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl p-6 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between group">
      
      {/* Header with Stage Badge and Ethical verification badge */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-xs rounded-full border ${stageInfo.bg} ${stageInfo.text} ${stageInfo.border}`}>
            {stageInfo.label}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-medium" title="Verificado sin datos personales sensibles bajo el Código ACM">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Testimonio Protegido</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {experience.title}
        </h3>

        {/* Metadata: Author alias, Region, Date */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <span className="font-semibold text-slate-800">{experience.authorAlias}</span>
          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3 h-3 text-amber-600" />
            {experience.departmentOrRegion}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3 h-3" />
            {formatDate(experience.date)}
          </span>
        </div>

        {/* Story Text */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
          {experience.story}
        </p>

        {/* Tools Used Tags */}
        {experience.digitalToolsUsed.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <Wrench className="w-3.5 h-3.5 text-amber-600" />
              <span>Herramientas digitales que sirvieron:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {experience.digitalToolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Advice - Clean Inline Callout Without Heavy Box */}
        <div className="border-l-2 border-amber-500 bg-amber-50/40 pl-3 py-2 rounded-r-xl my-3 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-0.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Consejo práctico:</span>
          </div>
          <p className="leading-relaxed">
            {experience.keyAdvice}
          </p>
        </div>

        {/* Risks Avoided - Clean Inline Callout */}
        {experience.risksAvoided && (
          <div className="border-l-2 border-rose-400 bg-rose-50/40 pl-3 py-1.5 rounded-r-xl mb-4 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-semibold text-rose-900 mb-0.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Riesgo evitado:</span>
            </div>
            <p className="leading-relaxed">
              {experience.risksAvoided}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions: Useful Vote + Share */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600 mt-2">
        <button
          onClick={handleVote}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            hasVoted
              ? "bg-slate-900 text-white shadow-2xs"
              : "bg-slate-100 hover:bg-slate-200/70 text-slate-700"
          }`}
          aria-label="Votar que este testimonio fue útil"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-white" : ""}`} />
          <span>{votes} personas lo encontraron útil</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-medium rounded-lg transition-colors text-xs"
          title="Copiar consejo para compartir por WhatsApp"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">¡Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Compartir</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
