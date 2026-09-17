"use client";

import React, { useState } from "react";
import { TEST_QUESTIONS } from "@/data/testQuestions";
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  GraduationCap, 
  TrendingUp, 
  FileCheck 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PrePostTest() {
  const [testType, setTestType] = useState<"pre" | "post">("pre");
  const [studentName, setStudentName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Previous results comparison stored in state
  const [preScore, setPreScore] = useState<number | null>(null);
  const [postScore, setPostScore] = useState<number | null>(null);

  const question = TEST_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: optionId
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < TEST_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    TEST_QUESTIONS.forEach((q) => {
      const selectedId = selectedAnswers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selectedId === correctOption?.id) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setIsSubmitted(true);

    if (testType === "pre") {
      setPreScore(finalScore);
    } else {
      setPostScore(finalScore);
      // Trigger confetti celebration on post test completion
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  };

  const handleSwitchToPost = () => {
    setTestType("post");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const currentScore = calculateScore();

  return (
    <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
      
      {/* Selector Pre / Post Test */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0EAE1] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            <GraduationCap className="w-4 h-4 text-amber-700" />
            <span>Módulo de Evaluación Pedagógica ENRO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Evaluación de Competencias y Ciberseguridad
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Medición de conocimientos antes y después de la capacitación de alfabetización digital.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-[#F4EFE6] p-1.5 rounded-2xl border border-[#E0D5C3]">
          <button
            onClick={() => {
              if (testType !== "pre") {
                setTestType("pre");
                handleRestart();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              testType === "pre"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            1. Diagnóstico Inicial (Pre-Test)
          </button>
          <button
            onClick={() => {
              if (testType !== "post") {
                setTestType("post");
                handleRestart();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              testType === "post"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            2. Evaluación Final (Post-Test)
          </button>
        </div>
      </div>

      {/* Student Name Input */}
      {!isSubmitted && (
        <div className="mb-6 p-4 bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
              Nombre del Estudiante o Participante (Para tu constancia):
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ej. Kevin / María / Estudiante ENRO"
              className="w-full sm:w-80 px-3 py-1.5 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 font-medium focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="text-xs text-stone-600 font-bold">
            Pregunta <strong className="text-stone-900">{currentQuestionIndex + 1}</strong> de <strong className="text-stone-900">{TEST_QUESTIONS.length}</strong>
          </div>
        </div>
      )}

      {/* Test Engine */}
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-6 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full inline-block mb-3">
              Pregunta #{question.id}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = selectedAnswers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-semibold flex items-start gap-3 ${
                    isSelected
                      ? "bg-amber-50 border-amber-500 text-amber-950 shadow-xs ring-1 ring-amber-400"
                      : "bg-white border-[#E7DECE] text-stone-700 hover:bg-[#FAF8F5] hover:text-stone-900"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${
                    isSelected ? "border-amber-600 bg-amber-600 text-white font-bold" : "border-stone-400"
                  }`}>
                    {isSelected ? "✓" : ""}
                  </div>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-[#F0EAE1]">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-[#F0EAE1] hover:bg-[#E7DECE] disabled:opacity-40 text-stone-700 rounded-xl text-xs font-bold"
            >
              Anterior
            </button>

            {currentQuestionIndex < TEST_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[question.id]}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-xs"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < TEST_QUESTIONS.length}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md transition-all"
              >
                <FileCheck className="w-4 h-4" />
                <span>Finalizar y Ver Resultados</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Certificate Section */
        <div className="space-y-8 animate-in zoom-in-95 duration-200">
          
          {/* Score Header */}
          <div className="p-8 bg-gradient-to-br from-[#FAF8F5] to-[#F2ECE2] border border-[#E7DECE] rounded-3xl text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-stone-900">
              {testType === "pre" ? "Resultado del Diagnóstico Inicial" : "¡Felicidades por completar la Evaluación Final!"}
            </h3>
            
            <div className="inline-block p-4 bg-white border border-amber-300 rounded-2xl shadow-xs">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-bold block">Puntaje Obtenido</span>
              <span className="text-4xl font-extrabold text-amber-700">
                {currentScore} / {TEST_QUESTIONS.length}
              </span>
              <span className="text-xs text-stone-600 font-medium block mt-1">
                ({(currentScore / TEST_QUESTIONS.length) * 100}% de aciertos)
              </span>
            </div>

            {/* Comparison Metrics if both tests are taken */}
            {preScore !== null && postScore !== null && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Progreso de Aprendizaje Comprobado (ENRO):</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-700 font-medium">
                  <span>Diagnóstico Inicial (Pre): <strong>{preScore}/5</strong></span>
                  <span>Evaluación Final (Post): <strong>{postScore}/5</strong></span>
                  <span className="text-emerald-800 font-bold">
                    +{Math.max(0, postScore - preScore)} pts de mejora
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Digital Certificate of Participation */}
          <div className="p-8 bg-[#FAF6F0] border-2 border-amber-300 rounded-3xl shadow-sm relative overflow-hidden text-center space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Universidad Rafael Landívar &bull; ENRO Quetzaltenango
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Constancia Digital de Alfabetización y Ciberseguridad
            </h4>
            <p className="text-xs text-stone-600 font-medium">Se hace constar que:</p>
            <div className="text-2xl font-bold text-amber-800 tracking-wide underline underline-offset-8 decoration-amber-400">
              {studentName.trim() || "Estudiante Participante"}
            </div>
            <p className="text-xs text-stone-700 max-w-xl mx-auto leading-relaxed font-medium">
              Ha completado exitosamente los módulos formativos sobre navegación segura, identificación de fuentes oficiales, prevención de fraudes y protección de datos familiares en el marco del proyecto <strong>Conectando Caminos</strong>.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-stone-500 border-t border-[#E7DECE] font-semibold">
              <span>Fecha: {new Date().toLocaleDateString("es-GT")}</span>
              <span>Lugar: Quetzaltenango, Guatemala</span>
              <span>Validación: Código Ético ACM 2018</span>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-700" />
              <span>Revisión Detallada de Preguntas y Respuestas:</span>
            </h4>

            {TEST_QUESTIONS.map((q) => {
              const selectedId = selectedAnswers[q.id];
              const selectedOption = q.options.find((o) => o.id === selectedId);
              const correctOption = q.options.find((o) => o.isCorrect);
              const isCorrect = selectedOption?.isCorrect;

              return (
                <div key={q.id} className="p-5 bg-white border border-[#E7DECE] rounded-2xl space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-stone-900">{q.id}. {q.question}</p>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-800 font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correcta
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-800 font-bold shrink-0">
                        <XCircle className="w-4 h-4 text-red-600" /> A Mejorar
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 font-medium">
                    <strong>Tu respuesta:</strong> {selectedOption?.text || "No respondida"}
                  </p>
                  <p className="text-stone-800 bg-[#FAF8F5] p-3 rounded-xl border border-[#E7DECE]">
                    <strong className="text-amber-800">Explicación:</strong> {correctOption?.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            {testType === "pre" && (
              <button
                onClick={handleSwitchToPost}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-105"
              >
                Pasar a la Evaluación Final (Post-Test)
              </button>
            )}

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F0EAE1] hover:bg-[#E7DECE] text-stone-800 font-bold text-xs rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Realizar nuevamente este test</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
