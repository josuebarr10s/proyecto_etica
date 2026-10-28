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
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      
      {/* Selector Pre / Post Test */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>Módulo de Evaluación Pedagógica ENRO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Evaluación de Competencias y Ciberseguridad
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Medición de conocimientos antes y después de la capacitación de alfabetización digital.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              if (testType !== "pre") {
                setTestType("pre");
                handleRestart();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              testType === "pre"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
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
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              testType === "post"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            2. Evaluación Final (Post-Test)
          </button>
        </div>
      </div>

      {/* Student Name Input */}
      {!isSubmitted && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Nombre del Estudiante o Participante (Para tu constancia):
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ej. Kevin / María / Estudiante ENRO"
              className="w-full sm:w-80 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Pregunta <strong className="text-slate-900">{currentQuestionIndex + 1}</strong> de <strong className="text-slate-900">{TEST_QUESTIONS.length}</strong>
          </div>
        </div>
      )}

      {/* Test Engine */}
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full inline-block mb-3">
              Pregunta #{question.id}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
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
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-start gap-3 ${
                    isSelected
                      ? "bg-amber-50/70 border-amber-500 text-amber-950 shadow-2xs ring-1 ring-amber-400"
                      : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${
                    isSelected ? "border-amber-600 bg-amber-600 text-white font-bold" : "border-slate-300"
                  }`}>
                    {isSelected ? "✓" : ""}
                  </div>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Anterior
            </button>

            {currentQuestionIndex < TEST_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[question.id]}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold rounded-xl text-xs shadow-xs transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < TEST_QUESTIONS.length}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-semibold rounded-xl text-xs shadow-xs transition-all"
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
          <div className="p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900">
              {testType === "pre" ? "Resultado del Diagnóstico Inicial" : "¡Felicidades por completar la Evaluación Final!"}
            </h3>
            
            <div className="inline-block p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">Puntaje Obtenido</span>
              <span className="text-4xl font-extrabold text-amber-600">
                {currentScore} / {TEST_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-500 font-medium block mt-1">
                ({(currentScore / TEST_QUESTIONS.length) * 100}% de aciertos)
              </span>
            </div>

            {/* Comparison Metrics if both tests are taken */}
            {preScore !== null && postScore !== null && (
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-semibold text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Progreso de Aprendizaje Comprobado (ENRO):</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Diagnóstico Inicial (Pre): <strong className="text-slate-900">{preScore}/5</strong></span>
                  <span>Evaluación Final (Post): <strong className="text-slate-900">{postScore}/5</strong></span>
                  <span className="text-emerald-700 font-bold">
                    +{Math.max(0, postScore - preScore)} pts de mejora
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Digital Certificate of Participation */}
          <div className="p-8 bg-amber-50/30 border border-amber-200/80 rounded-3xl shadow-xs relative overflow-hidden text-center space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Universidad Rafael Landívar &bull; ENRO Quetzaltenango
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Constancia Digital de Alfabetización y Ciberseguridad
            </h4>
            <p className="text-xs text-slate-500 font-normal">Se hace constar que:</p>
            <div className="text-2xl font-bold text-amber-700 tracking-wide underline underline-offset-8 decoration-amber-300">
              {studentName.trim() || "Estudiante Participante"}
            </div>
            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              Ha completado exitosamente los módulos formativos sobre navegación segura, identificación de fuentes oficiales, prevención de fraudes y protección de datos familiares en el marco del proyecto <strong className="text-slate-900">Conectando Caminos</strong>.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 border-t border-amber-100 font-medium">
              <span>Fecha: {new Date().toLocaleDateString("es-GT")}</span>
              <span>Lugar: Quetzaltenango, Guatemala</span>
              <span>Validación: Código Ético ACM 2018</span>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-600" />
              <span>Revisión Detallada de Preguntas y Respuestas:</span>
            </h4>

            {TEST_QUESTIONS.map((q) => {
              const selectedId = selectedAnswers[q.id];
              const selectedOption = q.options.find((o) => o.id === selectedId);
              const correctOption = q.options.find((o) => o.isCorrect);
              const isCorrect = selectedOption?.isCorrect;

              return (
                <div key={q.id} className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">{q.id}. {q.question}</p>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correcta
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-semibold shrink-0">
                        <XCircle className="w-4 h-4 text-rose-600" /> A Mejorar
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">Tu respuesta:</strong> {selectedOption?.text || "No respondida"}
                  </p>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-amber-700 font-semibold">Explicación:</strong> {correctOption?.explanation}
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
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
              >
                Pasar a la Evaluación Final (Post-Test)
              </button>
            )}

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
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
