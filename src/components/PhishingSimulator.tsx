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
    <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EAE1] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-2xl">
            <ShieldAlert className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>Simulador Anti-Estafas Digitales</span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                Práctica Interactiva
              </span>
            </h3>
            <p className="text-xs text-stone-600 font-medium">
              Aprende a diferenciar mensajes legítimos de trampas y estafas en tu celular.
            </p>
          </div>
        </div>

        {!completed && (
          <div className="text-xs font-bold px-3 py-1.5 bg-[#F5F0E8] border border-[#E7DECE] rounded-xl text-stone-700">
            Caso {currentIndex + 1} de {PHISHING_SCENARIOS.length}
          </div>
        )}
      </div>

      {completed ? (
        /* Results View */
        <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-stone-900">¡Simulación Completada!</h4>
          <p className="text-base text-stone-700 max-w-md mx-auto">
            Identificaste correctamente <strong className="text-amber-700">{score}</strong> de <strong className="text-stone-900">{PHISHING_SCENARIOS.length}</strong> casos presentados.
          </p>
          
          <div className="p-4 bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl max-w-lg mx-auto text-xs text-stone-700 text-left space-y-1.5 font-medium">
            <p className="font-bold text-amber-900">💡 Resumen de Aprendizaje:</p>
            <p>1. Las instituciones del gobierno guatemalteco usan dominios terminados en <strong>.gob.gt</strong>.</p>
            <p>2. Nunca entregues dinero anticipado ni números de DPI por WhatsApp a desconocidos.</p>
            <p>3. Mantén la calma y verifica siempre antes de actuar ante mensajes alarmistas.</p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl transition-transform hover:scale-105 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Simulador</span>
          </button>
        </div>
      ) : (
        /* Active Scenario Simulation */
        <div className="space-y-6">
          
          {/* Simulated Mobile Message Screen */}
          <div className="max-w-lg mx-auto bg-[#231F1D] border-4 border-[#3D3732] rounded-3xl p-5 shadow-xl relative overflow-hidden">
            {/* Phone Top Notch Bar */}
            <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] pb-3 mb-3 border-b border-[#3D3732]">
              <span className="flex items-center gap-1.5 font-bold">
                {renderScenarioIcon()}
                <span className="truncate max-w-[220px] text-[#FAF8F5]">{scenario.sender}</span>
              </span>
              <span className="text-[#999187]">Mensaje Recibido</span>
            </div>

            {/* Bubble Message */}
            <div className="bg-[#352F2B] border border-[#4D453F] rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-[#FAF8F5] leading-relaxed shadow-xs">
              {scenario.content}
            </div>
            
            <div className="text-[10px] text-[#999187] text-right mt-2 font-medium">
              Recibido hoy &bull; Vía Mensajería
            </div>
          </div>

          {/* Question & Actions */}
          <div className="text-center space-y-3">
            <p className="text-sm font-bold text-stone-800">
              ¿Qué opinas sobre este mensaje que llegó a tu celular?
            </p>

            {userAnswer === null ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>¡Es una Estafa / Falso!</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Es un Mensaje Legítimo</span>
                </button>
              </div>
            ) : (
              /* Explanation after answering */
              <div className="mt-4 p-5 rounded-2xl text-left animate-in fade-in duration-200 space-y-3 border bg-[#FAF8F5] border-[#E7DECE]">
                <div className="flex items-center gap-2">
                  {userAnswer === scenario.isScam ? (
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <span>¡Correcto! Tu análisis fue acertado.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-800 font-bold text-base">
                      <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                      <span>¡Cuidado! Tu respuesta fue incorrecta.</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {scenario.explanation}
                </p>

                {scenario.redFlags.length > 0 && (
                  <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#E0D5C3]">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                      Pistas para identificarlo:
                    </span>
                    <ul className="text-xs text-stone-800 space-y-1 list-disc list-inside">
                      {scenario.redFlags.map((flag, i) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                  <strong>Acción segura recomendada:</strong> {scenario.safeAction}
                </div>

                <div className="text-right pt-2">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
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
