"use client";

import React, { useState } from "react";
import { PHISHING_SCENARIOS } from "@/data/phishingScenarios";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Smartphone, 
  MessageSquare, 
  Mail, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function PhishingSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = PHISHING_SCENARIOS[currentIndex];

  const handleAnswer = (answer: boolean) => {
    if (userAnswer !== null) return;
    setUserAnswer(answer);
    if (answer === scenario.isScam) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PHISHING_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserAnswer(null);
    setScore(0);
    setCompleted(false);
  };

  const renderScenarioIcon = () => {
    switch (scenario.type) {
      case "whatsapp":
        return <MessageSquare className="w-4 h-4 text-emerald-700" />;
      case "sms":
        return <Smartphone className="w-4 h-4 text-amber-700" />;
      case "email":
        return <Mail className="w-4 h-4 text-orange-700" />;
      default:
        return <HelpCircle className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-2xl">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Simulador Anti-Estafas Digitales</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full">
                Práctica Interactiva
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Aprende a diferenciar mensajes legítimos de trampas y estafas en tu celular.
            </p>
          </div>
        </div>

        {!completed && (
          <div className="text-xs font-semibold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600">
            Caso {currentIndex + 1} de {PHISHING_SCENARIOS.length}
          </div>
        )}
      </div>

      {completed ? (
        /* Results View */
        <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900">¡Simulación Completada!</h4>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            Identificaste correctamente <strong className="text-amber-600">{score}</strong> de <strong className="text-slate-900">{PHISHING_SCENARIOS.length}</strong> casos presentados.
          </p>
          
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto text-xs text-slate-700 text-left space-y-2">
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span>💡 Resumen de Aprendizaje:</span>
            </p>
            <p className="text-slate-600">1. Las instituciones del gobierno guatemalteco usan dominios oficiales terminados en <strong className="text-slate-900">.gob.gt</strong>.</p>
            <p className="text-slate-600">2. Nunca entregues dinero anticipado ni números de DPI por WhatsApp a intermediarios no verificados.</p>
            <p className="text-slate-600">3. Mantén la calma y verifica siempre en fuentes oficiales ante mensajes que causen urgencia o miedo.</p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Simulador</span>
          </button>
        </div>
      ) : (
        /* Active Scenario Simulation */
        <div className="space-y-6">
          
          {/* Simulated Mobile Message Screen */}
          <div className="max-w-lg mx-auto bg-slate-900 border-4 border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden">
            {/* Phone Top Notch Bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 mb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-medium">
                {renderScenarioIcon()}
                <span className="truncate max-w-[220px] text-slate-100">{scenario.sender}</span>
              </span>
              <span className="text-slate-400">Mensaje Recibido</span>
            </div>

            {/* Bubble Message */}
            <div className="bg-slate-800/90 border border-slate-700/60 rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-slate-100 leading-relaxed shadow-2xs">
              {scenario.content}
            </div>
            
            <div className="text-[10px] text-slate-400 text-right mt-2 font-medium">
              Recibido hoy &bull; Vía Mensajería
            </div>
          </div>

          {/* Question & Actions */}
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-slate-800">
              ¿Qué opinas sobre este mensaje que llegó a tu celular?
            </p>

            {userAnswer === null ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>¡Es una Estafa / Falso!</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Es un Mensaje Legítimo</span>
                </button>
              </div>
            ) : (
              /* Explanation after answering */
              <div className="mt-4 p-5 rounded-2xl text-left animate-in fade-in duration-200 space-y-3 border bg-slate-50/70 border-slate-200">
                <div className="flex items-center gap-2">
                  {userAnswer === scenario.isScam ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>¡Correcto! Tu análisis fue acertado.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>¡Cuidado! Tu respuesta fue incorrecta.</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {scenario.explanation}
                </p>

                {scenario.redFlags.length > 0 && (
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
                      Pistas para identificarlo:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      {scenario.redFlags.map((flag, i) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-900 font-normal">
                  <strong className="font-semibold text-amber-950">Acción segura recomendada:</strong> {scenario.safeAction}
                </div>

                <div className="text-right pt-2">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
                  >
                    <span>{currentIndex < PHISHING_SCENARIOS.length - 1 ? "Siguiente Caso" : "Ver Resultados"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
