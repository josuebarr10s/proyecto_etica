"use client";

import React, { useState } from "react";
import PrePostTest from "@/components/PrePostTest";
import { 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  MessageSquareHeart, 
  ShieldCheck
} from "lucide-react";
import { sanitizeInput } from "@/lib/utils";

export default function EvaluacionPage() {
  const [feedbackCategory, setFeedbackCategory] = useState("estudiante");
  const [feedbackText, setFeedbackText] = useState("");
  const [usefulnessRating, setUsefulnessRating] = useState("5");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    // Persist anonymous feedback to localStorage
    try {
      const existing = localStorage.getItem("conectando_caminos_feedback");
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        id: Date.now(),
        category: feedbackCategory,
        rating: usefulnessRating,
        comment: sanitizeInput(feedbackText),
        date: new Date().toISOString()
      });
      localStorage.setItem("conectando_caminos_feedback", JSON.stringify(list));
    } catch {
      // Ignore
    }

    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackText("");
      setFeedbackSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Intro Header */}
      <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Alianza ENRO - Quetzaltenango / URL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Evaluación Pedagógica de Alfabetización Digital
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Este módulo permite evaluar los conocimientos previos y posteriores de los estudiantes y miembros de la comunidad escolar de la ENRO, garantizando una formación medible en seguridad digital y fuentes oficiales.
          </p>
        </div>
      </div>

      {/* Main Pre/Post Interactive Test Component */}
      <section>
        <PrePostTest />
      </section>

      {/* Anonymous Feedback Box for Orientación ENRO */}
      <section className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
          <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-2xl">
            <MessageSquareHeart className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              Buzón Anónimo de Retroalimentación y Sugerencias
            </h3>
            <p className="text-xs text-stone-600 font-medium">
              Canal directo para que estudiantes y docentes de la ENRO aporten mejoras a la plataforma y futuros talleres.
            </p>
          </div>
        </div>

        {feedbackSent ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-950">¡Muchas gracias por tu retroalimentación anónima!</h4>
            <p className="text-xs text-emerald-800 font-medium">
              Tu opinión es fundamental para adaptar los contenidos a las necesidades reales de nuestra comunidad educativa.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendFeedback} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  ¿Quién responde?
                </label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-amber-500"
                >
                  <option value="estudiante">Estudiante de la ENRO</option>
                  <option value="docente_orientacion">Docente / Personal de Orientación</option>
                  <option value="familiar">Familiar de estudiante</option>
                  <option value="otro">Visitante / Comunidad en general</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  ¿Qué tan útil te pareció la plataforma? (1 = Poco, 5 = Muy útil)
                </label>
                <select
                  value={usefulnessRating}
                  onChange={(e) => setUsefulnessRating(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-amber-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 - Excelente y muy clara</option>
                  <option value="4">⭐⭐⭐⭐ 4 - Bastante útil</option>
                  <option value="3">⭐⭐⭐ 3 - Regular / Puede mejorar</option>
                  <option value="2">⭐⭐ 2 - Poco entendible</option>
                  <option value="1">⭐ 1 - Difícil de usar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                ¿Qué tema adicional te gustaría que incluyéramos o qué podemos mejorar? <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Escribe tus sugerencias de forma totalmente anónima y libre..."
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 font-medium"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Envío 100% confidencial y anónimo</span>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Sugerencia</span>
              </button>
            </div>

          </form>
        )}
      </section>

    </div>
  );
}
