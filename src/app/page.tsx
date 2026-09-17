"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Compass, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  ShieldAlert, 
  CheckSquare, 
  MapPin, 
  ArrowRight, 
  GraduationCap, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  HeartHandshake
} from "lucide-react";
import PhishingSimulator from "@/components/PhishingSimulator";
import SosSafetyModal from "@/components/SosSafetyModal";

export default function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState<"planificando" | "transito" | "retorno" | "familia">("planificando");
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const profileData = {
    planificando: {
      title: "Estoy Planificando o Evaluando una Oportunidad",
      description: "Aprende a verificar ofertas laborales reales, consultar sitios oficiales gubernamentales y evitar caer en estafas o cobros ilegales de intermediarios.",
      badges: ["Verificación de Visas de Trabajo", "Citas Oficiales IGM", "Prevención de Fraudes"],
      primaryAction: { href: "/cursos", label: "Ver Cursos de Trámites Oficiales" },
      secondaryAction: { href: "/guia-digital", label: "Probar Simulador Anti-Estafas" },
      accent: "from-amber-600 to-orange-600",
      iconBg: "bg-amber-100 text-amber-900 border-amber-300"
    },
    transito: {
      title: "Estoy en Tránsito o en Ruta Migratoria",
      description: "Estrategias de comunicación segura para mantener el contacto con tu familia, proteger la privacidad de tu celular y respaldar tus documentos de identidad en la nube.",
      badges: ["Ubicación Segura en Tiempo Real", "Palabra Clave Familiar", "Copia en Google Drive"],
      primaryAction: { href: "/guia-digital", label: "Guía de Autoprotección en Celular" },
      secondaryAction: { href: "/directorio", label: "Ver Casas de Acogida y Albergues" },
      accent: "from-orange-500 to-amber-700",
      iconBg: "bg-orange-100 text-orange-900 border-orange-300"
    },
    retorno: {
      title: "He Retornado a Guatemala",
      description: "Recursos para certificar tus habilidades, crear tu Currículum Vitae digital desde el celular y postularte a empleos formales en Guatemala.",
      badges: ["Creación de CV con Canva", "Portales de Empleo (Transdoc)", "Plan Retorno al Hogar"],
      primaryAction: { href: "/guia-digital", label: "Generador de CV Digital" },
      secondaryAction: { href: "/cursos", label: "Cursos de Empleabilidad y Oficios" },
      accent: "from-emerald-600 to-teal-700",
      iconBg: "bg-emerald-100 text-emerald-900 border-emerald-300"
    },
    familia: {
      title: "Soy Familiar o Estudiante en Guatemala",
      description: "Aprende a blindar a tu familia contra extorsiones telefónicas, usar videollamadas con bajo consumo de datos y apoyar en trámites digitales.",
      badges: ["Prevención de Extorsión", "Videollamadas Seguras", "Apoyo Digital Familiar"],
      primaryAction: { href: "/evaluacion", label: "Hacer Evaluación de Conocimientos" },
      secondaryAction: { href: "/experiencias", label: "Leer Consejos de la Comunidad" },
      accent: "from-stone-600 to-amber-800",
      iconBg: "bg-stone-200 text-stone-900 border-stone-300"
    }
  };

  const currentProfile = profileData[selectedProfile];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F7F1E6] via-[#FAF6EE] to-[#FAF8F5] border-b border-[#E7DECE]">
        
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-300/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-orange-300/15 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Institutional Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E0D5C3] text-xs font-bold text-amber-950 shadow-xs">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Universidad Rafael Landívar &bull; Alianza ENRO Quetzaltenango</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Proyecto de Ética Aplicada y Responsabilidad Social</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Alfabetización Digital Inclusiva para <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-600 bg-clip-text text-transparent">
                Migrantes y Familias
              </span> en Guatemala
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Un puente tecnológico para conectar a las personas con fuentes oficiales seguras, autoprotección ante fraudes digitales, cursos gratuitos y oportunidades de desarrollo social y laboral.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/experiencias"
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-600/20 hover:scale-105 transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Explorar Testimonios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cursos"
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F2ECE2] text-stone-800 font-bold text-sm rounded-xl border border-[#E7DECE] hover:border-[#DACFBE] transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Catálogo de Cursos</span>
              </Link>

              <button
                onClick={() => setSosModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 font-bold text-sm rounded-xl transition-all shadow-xs"
              >
                <AlertTriangle className="w-4 h-4 text-red-700" />
                <span>Contactos de Auxilio SOS</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Profile Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Orientación Personalizada
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            ¿En qué etapa te encuentras tú o tu familia?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Selecciona tu situación para ver recomendaciones, herramientas digitales y precauciones específicas.
          </p>
        </div>

        {/* Profile Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { id: "planificando", label: "Planificando Migrar", icon: Compass, color: "hover:border-amber-400" },
            { id: "transito", label: "En Ruta / Tránsito", icon: MapPin, color: "hover:border-orange-400" },
            { id: "retorno", label: "En Retorno / Retornado", icon: HeartHandshake, color: "hover:border-emerald-400" },
            { id: "familia", label: "Familia o Estudiante", icon: GraduationCap, color: "hover:border-stone-400" }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedProfile === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedProfile(tab.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-amber-500 shadow-md shadow-amber-600/10 scale-[1.02] ring-2 ring-amber-500/30"
                    : "bg-white/80 border-[#E7DECE] text-stone-600 hover:bg-white " + tab.color
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? "bg-amber-600 text-white font-bold" : "bg-[#F5F0E8] text-stone-600"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />}
                </div>
                <span className={`text-sm font-bold ${isSelected ? "text-stone-900" : "text-stone-700"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Profile Detail Card */}
        <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentProfile.accent}`} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                {currentProfile.title}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-medium">
                {currentProfile.description}
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentProfile.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#F5F0E8] text-stone-800 border border-[#E7DECE] rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-col gap-3 lg:border-l lg:border-[#F0EAE1] lg:pl-6">
              <Link
                href={currentProfile.primaryAction.href}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform hover:scale-105"
              >
                <span>{currentProfile.primaryAction.label}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href={currentProfile.secondaryAction.href}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#FAF8F5] hover:bg-[#F2ECE2] text-stone-800 font-bold text-xs sm:text-sm rounded-xl border border-[#E7DECE] transition-colors"
              >
                <span>{currentProfile.secondaryAction.label}</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 4 Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Ejes Estratégicos
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Cuatro Pilares de Inclusión Digital y Ética
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-medium">
            Herramientas diseñadas para cerrar la brecha digital y proteger a las personas en situación de vulnerabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white border border-[#E7DECE] hover:border-amber-400 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Red Comunitaria de Testimonios
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                Experiencias reales sobre qué aplicaciones sirvieron y cómo evitaron estafas, compartidas bajo estricto anonimato ético.
              </p>
            </div>
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-3 border-t border-[#F0EAE1]"
            >
              <span>Ver testimonios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-[#E7DECE] hover:border-orange-400 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-300 text-orange-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Cursos Gratuitos Sugeridos
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                Catálogo colaborativo con recursos de Fundación Carlos Slim, Google, Cisco e Intecap para aprender desde el celular.
              </p>
            </div>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 pt-3 border-t border-[#F0EAE1]"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-[#E7DECE] hover:border-red-400 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 text-red-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Seguridad y Anti-Fraude
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                Simulador interactivo para detectar mensajes falsos, citas ilegales y cómo proteger las contraseñas familiares.
              </p>
            </div>
            <Link
              href="/guia-digital"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 pt-3 border-t border-[#F0EAE1]"
            >
              <span>Abrir guía y simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-[#E7DECE] hover:border-emerald-400 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Evaluación y Diagnóstico ENRO
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                Test interactivo antes/después para medir el impacto de la capacitación y descargar tu diploma de participación.
              </p>
            </div>
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-3 border-t border-[#F0EAE1]"
            >
              <span>Hacer evaluación</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Interactive Phishing Simulator Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PhishingSimulator />
      </section>

      {/* Statistics & CEPAL Context Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D2824] text-[#FAF8F5] rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-stone-950 rounded-full text-xs font-extrabold shadow-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Datos y Pertinencia Social (CEPAL 2024)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                La brecha digital como factor de exclusión en Centroamérica
              </h2>
              <p className="text-xs sm:text-sm text-[#D8D2CA] leading-relaxed">
                El acceso a internet en hogares urbanos de América Latina alcanza cerca del <strong>77%</strong>, mientras que en zonas rurales apenas llega al <strong>38%</strong>. En contextos de movilidad humana, esta falta de orientación digital expone a las familias a fraudes y desinformación.
              </p>
              <div className="pt-2">
                <Link
                  href="/etica-y-proyecto"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                >
                  <span>Conoce el marco ético y la justificación del proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-300">77%</span>
                <p className="text-xs text-[#D8D2CA] font-semibold">Acceso urbano en la región</p>
              </div>

              <div className="p-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-orange-300">38%</span>
                <p className="text-xs text-[#D8D2CA] font-semibold">Acceso en áreas rurales</p>
              </div>

              <div className="p-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300">100%</span>
                <p className="text-xs text-[#D8D2CA] font-semibold">Gratuito y sin datos sensibles</p>
              </div>

              <div className="p-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-rose-300">0</span>
                <p className="text-xs text-[#D8D2CA] font-semibold">Riesgo de filtración de identidad</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Directory Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E7DECE] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-amber-100 border border-amber-300 rounded-2xl text-amber-800 shrink-0">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Directorio Oficial de Casas del Migrante e Instituciones
              </h3>
              <p className="text-xs text-stone-600 mt-0.5 font-medium">
                Ubica albergues seguros, centros de pasaportes y líneas humanitarias en Quetzaltenango, San Marcos y Guatemala.
              </p>
            </div>
          </div>
          <Link
            href="/directorio"
            className="shrink-0 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform hover:scale-105"
          >
            Consultar Directorio
          </Link>
        </div>
      </section>

      <SosSafetyModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

    </div>
  );
}
