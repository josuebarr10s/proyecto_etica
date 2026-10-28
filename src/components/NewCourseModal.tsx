"use client";

import React, { useState } from "react";
import { Course, CourseCategory } from "@/types";
import { 
  X, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Link as LinkIcon 
} from "lucide-react";
import { sanitizeInput } from "@/lib/utils";

interface NewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (newCourse: Course) => void;
}

export default function NewCourseModal({
  isOpen,
  onClose,
  onAddCourse
}: NewCourseModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CourseCategory>("alfabetizacion_basica");
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState<"Básico" | "Intermedio" | "Todos los niveles">("Básico");
  const [description, setDescription] = useState("");
  const [whyItMatters, setWhyItMatters] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || !platform.trim() || !url.trim() || !description.trim() || !whyItMatters.trim()) {
      setErrorMessage("Por favor completa los campos principales requeridos.");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setErrorMessage("El enlace debe ser una URL válida que empiece con https:// o http://");
      return;
    }

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: sanitizeInput(title),
      category,
      platform: sanitizeInput(platform),
      url: url.trim(),
      duration: sanitizeInput(duration) || "Autoguiado",
      level,
      free: true,
      description: sanitizeInput(description),
      whyItMatters: sanitizeInput(whyItMatters),
      recommendedBy: sanitizeInput(recommendedBy) || "Comunidad Conectando Caminos",
      tags: tagsArray.length > 0 ? tagsArray : ["Gratuito", "Educación Digital"]
    };

    onAddCourse(newCourse);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
      // Reset
      setTitle("");
      setPlatform("");
      setUrl("");
      setDuration("");
      setDescription("");
      setWhyItMatters("");
      setRecommendedBy("");
      setTagsInput("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto text-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-course-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-200/80">
              <BookOpen className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 id="modal-course-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Sugerir un Curso o Recurso Gratuito
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Aporta enlaces educativos y herramientas gratuitas que fortalezcan a la comunidad.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage ? (
          <div className="my-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">¡Curso agregado al catálogo!</h3>
            <p className="text-xs text-emerald-800">
              El recurso ya está disponible para que todos los usuarios puedan consultarlo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nombre del Curso o Recurso <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Taller Práctico de Creación de CV en Celular"
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Categoría Principal <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CourseCategory)}
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
              >
                <option value="alfabetizacion_basica">Alfabetización Digital Básica</option>
                <option value="seguridad_antifraude">Seguridad Digital y Antifraude</option>
                <option value="tramites_oficiales">Trámites y Fuentes Oficiales</option>
                <option value="empleabilidad_cv">Empleabilidad y CV Digital</option>
              </select>
            </div>

            {/* Platform & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Plataforma / Canal <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Ej. YouTube, Capacítate para el Empleo, Platzi"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Duración Aproximada
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ej. 2 horas, 5 videos, Autoguiado"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Enlace Directo Oficial (URL) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Descripción del Contenido <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica brevemente qué se aprende en este curso..."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Why It Matters */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ¿Por qué es importante para personas migrantes o familias? <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                value={whyItMatters}
                onChange={(e) => setWhyItMatters(e.target.value)}
                placeholder="Ej. Ayuda a aprender a enviar correos formales a empresas locales..."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Recommended By & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tu Nombre o Institución
                </label>
                <input
                  type="text"
                  value={recommendedBy}
                  onChange={(e) => setRecommendedBy(e.target.value)}
                  placeholder="Ej. Estudiante ENRO, Orientador, Docente"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Etiquetas (Separadas por comas)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Ej. Empleo, Gratuito, Fácil, Celular"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Buttons */}
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
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                Agregar Curso
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
