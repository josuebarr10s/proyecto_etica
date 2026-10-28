"use client";

import React, { useState } from "react";
import { Experience, MigrationStage } from "@/types";
import { 
  X, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Lock, 
  AlertTriangle 
} from "lucide-react";
import { containsSensitiveData, sanitizeInput } from "@/lib/utils";

interface NewExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExperience: (newExp: Experience) => void;
}

export default function NewExperienceModal({
  isOpen,
  onClose,
  onAddExperience
}: NewExperienceModalProps) {
  const [stage, setStage] = useState<MigrationStage>("planificacion");
  const [title, setTitle] = useState("");
  const [authorAlias, setAuthorAlias] = useState("");
  const [departmentOrRegion, setDepartmentOrRegion] = useState("Quetzaltenango");
  const [story, setStory] = useState("");
  const [toolsInput, setToolsInput] = useState("");
  const [keyAdvice, setKeyAdvice] = useState("");
  const [risksAvoided, setRisksAvoided] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Ethics & Data Minimization Checks
    if (!title.trim() || !story.trim() || !keyAdvice.trim()) {
      setErrorMessage("Por favor completa los campos obligatorios (Título, Tu Experiencia y Consejo Práctico).");
      return;
    }

    if (!consentGiven) {
      setErrorMessage("Debes aceptar el consentimiento ético y de voluntariedad para publicar.");
      return;
    }

    // Check for accidental sensitive data (DPI numbers, card numbers)
    const combinedText = `${title} ${story} ${keyAdvice} ${risksAvoided} ${authorAlias}`;
    const sensitiveCheck = containsSensitiveData(combinedText);
    if (sensitiveCheck.hasSensitive) {
      setErrorMessage(sensitiveCheck.reason || "Por favor retira cualquier documento de identidad o número sensible.");
      return;
    }

    const toolsArray = toolsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      title: sanitizeInput(title),
      stage,
      authorAlias: sanitizeInput(authorAlias) || "Compañero/a Anónimo/a",
      departmentOrRegion: sanitizeInput(departmentOrRegion) || "Guatemala",
      date: new Date().toISOString().split("T")[0],
      story: sanitizeInput(story),
      digitalToolsUsed: toolsArray.length > 0 ? toolsArray : ["Teléfono Móvil", "WhatsApp"],
      keyAdvice: sanitizeInput(keyAdvice),
      risksAvoided: sanitizeInput(risksAvoided),
      usefulVotes: 1,
      verifiedEthics: true
    };

    onAddExperience(newExperience);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
      // Reset form
      setTitle("");
      setStory("");
      setKeyAdvice("");
      setRisksAvoided("");
      setToolsInput("");
      setAuthorAlias("");
      setConsentGiven(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto text-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-exp-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-200/80">
              <ShieldAlert className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 id="modal-exp-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Compartir una Experiencia o Consejo Digital
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Tu testimonio ayudará a otros migrantes y familias a protegerse y usar la tecnología.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Cerrar formulario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ethical Notice Box */}
        <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/70 rounded-2xl space-y-1.5 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-semibold text-amber-900">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Principio Ético de Privacidad y Anonimato (Código ACM 2018)</span>
          </div>
          <p className="leading-relaxed">
            • No compartas nombres reales completos, números de DPI, números de pasaporte ni direcciones residenciales exactas.
          </p>
          <p className="leading-relaxed">
            • Comparte únicamente cómo utilizaste la tecnología (aplicaciones, precauciones, sitios oficiales) para orientar a la comunidad de manera positiva.
          </p>
        </div>

        {/* Success Message */}
        {successMessage ? (
          <div className="my-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">¡Experiencia publicada con éxito!</h3>
            <p className="text-xs text-emerald-800">
              Gracias por tu aporte a la comunidad y a la alfabetización digital.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Stage Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Etapa del Proceso Migratorio <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: "planificacion", label: "Planificación" },
                  { key: "en_transito", label: "En Tránsito / Ruta" },
                  { key: "retorno", label: "Retorno / Reinserción" },
                  { key: "familiar", label: "Familiar en Guatemala" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setStage(item.key as MigrationStage)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      stage === item.key
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Título del Consejo o Experiencia <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Cómo verificar si un empleo o visa es real por internet"
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Author Alias & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Seudónimo o Alias (Opcional y Anónimo)
                </label>
                <input
                  type="text"
                  value={authorAlias}
                  onChange={(e) => setAuthorAlias(e.target.value)}
                  placeholder="Ej. Joven de Occidente, Hermano Retornado"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Departamento / Región
                </label>
                <input
                  type="text"
                  value={departmentOrRegion}
                  onChange={(e) => setDepartmentOrRegion(e.target.value)}
                  placeholder="Ej. Quetzaltenango, Totonicapán, San Marcos"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Story */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ¿Qué ocurrió y cómo te ayudó la tecnología? <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Narra tu experiencia sin dar datos privados de terceros. Describe qué problema tenías y cómo lo solucionaste..."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Tools Used */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Herramientas Digitales Utilizadas (Separadas por comas)
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="Ej. WhatsApp, Google Drive, Google Maps, Canva, Portal IGM"
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
              />
            </div>

            {/* Key Advice */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Consejo Práctico para los demás <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={keyAdvice}
                onChange={(e) => setKeyAdvice(e.target.value)}
                placeholder="Ej. Nunca pagues por adelantado citas de pasaporte ni trámites gubernamentales."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Risk Avoided */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Riesgo o Estafa que evitaste (Opcional)
              </label>
              <input
                type="text"
                value={risksAvoided}
                onChange={(e) => setRisksAvoided(e.target.value)}
                placeholder="Ej. Extorsión telefónica, pérdida de documentos físicos, estafa de Q3,000."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consent-cb"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="consent-cb" className="text-xs text-slate-600 leading-relaxed cursor-pointer font-normal">
                Confirmo que este testimonio es voluntario, verídico con fines educativos, y no contiene información confidencial ni números de identificación personal de ninguna persona.
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                Publicar Testimonio
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
