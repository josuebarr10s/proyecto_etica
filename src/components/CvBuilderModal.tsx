"use client";

import React, { useState } from "react";
import { 
  X, 
  Briefcase, 
  Copy, 
  Check, 
  Download, 
  Sparkles
} from "lucide-react";

interface CvBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvBuilderModal({ isOpen, onClose }: CvBuilderModalProps) {
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Quetzaltenango, Guatemala");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState("");
  const [education, setEducation] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedCvText = `==============================
${fullName.toUpperCase() || "NOMBRE COMPLETO"}
${profession || "Profesión / Oficio / Especialidad"}
==============================
📍 Ubicación: ${location}
📞 Teléfono: ${phone || "Número de contacto"}
✉️ Correo: ${email || "correo@ejemplo.com"}

PERFIL PERSONAL:
${summary || "Persona proactiva, puntual y con alta capacidad de aprendizaje y trabajo en equipo..."}

HABILIDADES Y COMPETENCIAS:
${skills ? skills.split(",").map(s => `• ${s.trim()}`).join("\n") : "• Manejo de herramientas\n• Comunicación efectiva\n• Responsabilidad y puntualidad"}

EXPERIENCIA LABORAL:
${experiences || "• Ayudante general / Operario (Tareas de ensamblaje, mantenimiento y atención)\n• Experiencia práctica en proyectos locales"}

EDUCACIÓN Y CAPACITACIONES:
${education || "• Nivel Medio / Bachillerato o Diversificado\n• Cursos de Capacitación Técnica / Alfabetización Digital"}
==============================`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCvText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedCvText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `CV_${fullName.replace(/\s+/g, "_") || "Mi_Curriculum"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto text-stone-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-builder-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7DECE] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-2xl">
              <Briefcase className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h2 id="cv-builder-title" className="text-xl sm:text-2xl font-bold text-stone-900">
                Generador Rápido de CV Digital
              </h2>
              <p className="text-xs text-stone-600 font-medium">
                Estructura tu hoja de vida profesional para postularte por WhatsApp, correo o portales de empleo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-[#EFE8DC] rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Form Side */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              1. Completa tus datos principales
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Carlos López Morales"
                className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Oficio o Puesto</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Ej. Electricista / Asistente / Ventas"
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Quetzaltenango"
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(+502) 5555-0000"
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Breve Perfil Personal</label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Ej. Persona responsable con 4 años de experiencia en mantenimiento y atención a clientes..."
                className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Habilidades (Separadas por comas)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Ej. Soldadura, Uso de smartphone, Trabajo bajo presión, Honestidad"
                className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Experiencia Laboral Previa</label>
              <textarea
                rows={2}
                value={experiences}
                onChange={(e) => setExperiences(e.target.value)}
                placeholder="Ej. 2024-2025: Operador en taller de carpintería. Corte, pulido y entrega de pedidos."
                className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Educación / Certificados</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Ej. Diploma en Alfabetización Digital (ENRO/URL), Nivel Medio"
                className="w-full px-3 py-2 bg-white border border-[#E7DECE] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

          </div>

          {/* Live Preview Side */}
          <div className="flex flex-col justify-between bg-white border border-[#E7DECE] rounded-2xl p-5 shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0EAE1]">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Vista Previa del CV Digital
                </span>
                <span className="text-[10px] text-stone-500 font-medium">Listo para copiar o enviar</span>
              </div>

              <pre className="text-xs font-mono text-stone-800 whitespace-pre-wrap bg-[#FAF8F5] p-4 rounded-xl border border-[#E7DECE] max-h-[380px] overflow-y-auto">
                {generatedCvText}
              </pre>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "¡Copiado al Portapapeles!" : "Copiar Texto"}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F0EAE1] hover:bg-[#E7DECE] text-stone-800 font-bold text-xs rounded-xl border border-[#E7DECE] transition-colors"
              >
                <Download className="w-4 h-4 text-amber-700" />
                <span>Descargar (.txt)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
