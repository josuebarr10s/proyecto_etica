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
      accent: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-700 border-amber-200"
    },
    transito: {
      title: "Estoy en Tránsito o en Ruta Migratoria",
      description: "Estrategias de comunicación segura para mantener el contacto con tu familia, proteger la privacidad de tu celular y respaldar tus documentos de identidad en la nube.",
      badges: ["Ubicación Segura en Tiempo Real", "Palabra Clave Familiar", "Copia en Google Drive"],
      primaryAction: { href: "/guia-digital", label: "Guía de Autoprotección en Celular" },
      secondaryAction: { href: "/directorio", label: "Ver Casas de Acogida y Albergues" },
      accent: "from-sky-500 to-blue-600",
      iconBg: "bg-sky-50 text-sky-700 border-sky-200"
    },
    retorno: {
      title: "He Retornado a Guatemala",
      description: "Recursos para certificar tus habilidades, crear tu Currículum Vitae digital desde el celular y postularte a empleos formales en Guatemala.",
      badges: ["Creación de CV con Canva", "Portales de Empleo (Transdoc)", "Plan Retorno al Hogar"],
      primaryAction: { href: "/guia-digital", label: "Generador de CV Digital" },
      secondaryAction: { href: "/cursos", label: "Cursos de Empleabilidad y Oficios" },
      accent: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    familia: {
      title: "Soy Familiar o Estudiante en Guatemala",
      description: "Aprende a blindar a tu familia contra extorsiones telefónicas, usar videollamadas con bajo consumo de datos y apoyar en trámites digitales.",
      badges: ["Prevención de Extorsión", "Videollamadas Seguras", "Apoyo Digital Familiar"],
      primaryAction: { href: "/evaluacion", label: "Hacer Evaluación de Conocimientos" },
      secondaryAction: { href: "/experiencias", label: "Leer Consejos de la Comunidad" },
      accent: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-50 text-indigo-700 border-indigo-200"
    }
  };

  const currentProfile = profileData[selectedProfile];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/70 via-white to-[#FBFBFD] border-b border-slate-200/60">
        
        {/* Soft luminous ambient backlight for the heroic title */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-r from-amber-200/20 via-orange-300/15 to-amber-200/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Institutional Unified Badge - Subtle Monochrome */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-medium text-slate-700 shadow-2xs">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>Universidad Rafael Landívar &bull; ENRO Quetzaltenango</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Ética Aplicada & Responsabilidad Social</span>
            </div>
          </div>

          {/* Main Title & Subtitle - Vibrant, Eye-catching & Heroic */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Alfabetización Digital Inclusiva para <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Migrantes y Familias
              </span> en Guatemala
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Un puente tecnológico para conectar a las personas con fuentes oficiales seguras, autoprotección ante fraudes digitales, cursos gratuitos y oportunidades de desarrollo social y laboral.
            </p>

            {/* Quick CTAs - Vibrant Main CTA with Clean Supporting Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/experiencias"
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Users className="w-4 h-4 text-white" />
                <span>Explorar Testimonios</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/cursos"
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Catálogo de Cursos</span>
              </Link>

              <button
                onClick={() => setSosModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-sm rounded-xl transition-colors shadow-2xs"
              >
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Contactos de Auxilio SOS</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Profile Selector - Streamlined Segmented Control */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Orientación Personalizada
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ¿En qué etapa te encuentras tú o tu familia?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Selecciona tu situación para ver recomendaciones, herramientas digitales y precauciones específicas.
          </p>
        </div>

        {/* Minimalist Segmented Pill Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap p-1.5 bg-slate-100/90 rounded-2xl gap-1 border border-slate-200/70">
            {[
              { id: "planificando", label: "Planificando Migrar", icon: Compass },
              { id: "transito", label: "En Ruta / Tránsito", icon: MapPin },
              { id: "retorno", label: "En Retorno / Retornado", icon: HeartHandshake },
              { id: "familia", label: "Familia en Guatemala", icon: GraduationCap }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedProfile === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedProfile(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-slate-900" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Open Airy Profile Content - Fully Desaturated */}
        <div className="py-6 px-6 sm:px-10 bg-white rounded-3xl border border-slate-200/70 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <span>Ruta Recomendada</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentProfile.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {currentProfile.description}
              </p>
              
              {/* Badges as subtle inline chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProfile.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200/80 rounded-lg text-xs font-medium flex items-center gap-1.5"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-col gap-3 lg:border-l lg:border-slate-100 lg:pl-8">
              <Link
                href={currentProfile.primaryAction.href}
                className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
              >
                <span>{currentProfile.primaryAction.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href={currentProfile.secondaryAction.href}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold text-xs sm:text-sm rounded-xl transition-colors text-center"
              >
                <span>{currentProfile.secondaryAction.label}</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 4 Core Pillars - Clean Editorial Grid Without Boxed Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center space-y-1 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ejes Estratégicos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Cuatro Pilares de Inclusión Digital y Ética
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Herramientas diseñadas para cerrar la brecha digital y proteger a las personas en situación de vulnerabilidad.
          </p>
        </div>

        {/* Clean Editorial Columns with Dividers, Desaturated Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70">
          
          {/* Pillar 1 */}
          <div className="pt-6 lg:pt-0 lg:px-5 flex flex-col justify-between first:pt-0 first:pl-0">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Red Comunitaria de Testimonios
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-4">
                Experiencias reales sobre qué aplicaciones sirvieron y cómo evitaron estafas, compartidas bajo estricto anonimato ético.
              </p>
            </div>
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 group mt-auto"
            >
              <span>Ver testimonios</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="pt-6 lg:pt-0 lg:px-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Cursos Gratuitos Sugeridos
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-4">
                Catálogo colaborativo con recursos de Fundación Carlos Slim, Google, Cisco e Intecap para aprender desde el celular.
              </p>
            </div>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 group mt-auto"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="pt-6 lg:pt-0 lg:px-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Seguridad y Anti-Fraude
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-4">
                Simulador interactivo para detectar mensajes falsos, citas ilegales y cómo proteger las contraseñas familiares.
              </p>
            </div>
            <Link
              href="/guia-digital"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 group mt-auto"
            >
              <span>Abrir guía y simulador</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pillar 4 */}
          <div className="pt-6 lg:pt-0 lg:px-5 flex flex-col justify-between last:pr-0">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Evaluación y Diagnóstico
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-4">
                Test interactivo antes/después para medir el impacto de la capacitación y descargar tu diploma de participación.
              </p>
            </div>
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 group mt-auto"
            >
              <span>Hacer evaluación</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Interactive Phishing Simulator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PhishingSimulator />
      </section>

      {/* Statistics & CEPAL Context Section - Clean Typography Counters, No Inner Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-850 text-slate-300 border border-slate-700/80 rounded-full text-xs font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <span>Datos y Pertinencia Social (CEPAL 2024)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                La brecha digital como factor de exclusión en Centroamérica
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                El acceso a internet en hogares urbanos de América Latina alcanza cerca del <strong className="text-white font-semibold">77%</strong>, mientras que en zonas rurales apenas llega al <strong className="text-white font-semibold">38%</strong>. En contextos de movilidad humana, esta falta de orientación digital expone a las familias a fraudes y desinformación.
              </p>
              <div className="pt-2">
                <Link
                  href="/etica-y-proyecto"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Conoce el marco ético y la justificación del proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Typography Counters - Calm Desaturated Tones */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-10">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">77%</div>
                <p className="text-xs text-slate-400 font-normal">Acceso urbano en la región</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-200 tracking-tight">38%</div>
                <p className="text-xs text-slate-400 font-normal">Acceso en áreas rurales</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">100%</div>
                <p className="text-xs text-slate-400 font-normal">Gratuito y sin datos sensibles</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-200 tracking-tight">0</div>
                <p className="text-xs text-slate-400 font-normal">Riesgo de filtración de identidad</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Directory Callout - Clean Inline Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 px-6 sm:px-8 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl text-slate-700 shrink-0 shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Directorio Oficial de Casas del Migrante e Instituciones
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Ubica albergues seguros, centros de pasaportes y líneas humanitarias en Quetzaltenango y Guatemala.
              </p>
            </div>
          </div>
          <Link
            href="/directorio"
            className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs"
          >
            Consultar Directorio
          </Link>
        </div>
      </section>

      <SosSafetyModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

    </div>
  );
}
