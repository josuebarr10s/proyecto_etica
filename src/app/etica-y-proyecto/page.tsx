"use client";

import React from "react";
import { 
  HeartHandshake, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  CheckCircle2
} from "lucide-react";

export default function EticaYProyectoPage() {
  const teamMembers = [
    { name: "Kevin Estuardo Castañon Fuentes", carnId: "1636623" },
    { name: "Josué Emmanuel Barrios Estrada", carnId: "1524323" },
    { name: "Luis David Ixquiac Sac", carnId: "1521223" },
    { name: "Fátima María José Tzoc Monroy", carnId: "1523324" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header - Clean Open Layout */}
      <div className="max-w-3xl space-y-2 pb-2 border-b border-slate-200/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
          <span>Ética Aplicada &bull; Aprendizaje-Servicio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Marco Ético, Metodología y Equipo del Proyecto
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Fundamentación académica y moral del proyecto &quot;Conectando Caminos&quot;, desarrollado por estudiantes de Ingeniería en Informática y Sistemas de la Universidad Rafael Landívar en colaboración con la ENRO.
        </p>
      </div>

      {/* ACM Code of Ethics Section */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Pilares Éticos según el Código de la ACM (2018)
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Association for Computing Machinery - Principios de conducta profesional aplicados al software social.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Principio 1</span>
            <h3 className="text-base font-bold text-slate-900">Equidad en el Diseño (UI/UX)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Diseñar soluciones tecnológicas que no asuman un conocimiento digital avanzado previo, creando interfaces intuitivas, limpias y descansadas, accesibles en cualquier teléfono móvil sin barreras de entrada.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Principio 2</span>
            <h3 className="text-base font-bold text-slate-900">Protección y Minimización de Datos</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Garantizar la privacidad absoluta: la plataforma no almacena números de DPI, números de pasaporte, estatus migratorio ni ubicaciones domiciliarias de los participantes o estudiantes.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Principio 3</span>
            <h3 className="text-base font-bold text-slate-900">Responsabilidad Social y Transparencia</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              No generar falsas expectativas. Se aclara que este es un portal formativo y de orientación; no gestiona trámites gubernamentales ni promete empleo remunerado directo.
            </p>
          </div>

        </div>
      </section>

      {/* Context: Alianza ENRO y Justificación Social */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Institución Seleccionada: ENRO "Guillermo Ovando Arriola"
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Escuela Normal Rural de Occidente &bull; Quetzaltenango / Totonicapán
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <p>
              La <strong className="text-slate-900 font-semibold">ENRO</strong> es un centro educativo clave en el occidente de Guatemala cuyo departamento de Orientación ha identificado estudiantes con familiares retornados, padres deportados o con intención de migrar.
            </p>
            <p>
              La alianza permite validar la plataforma web mediante una capacitación piloto práctica, brindando a los jóvenes y sus familias herramientas concretas de autoprotección digital y verificación de fuentes oficiales.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Objetivos de Impacto Comunitario
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Capacitación práctica presencial y virtual para estudiantes del grupo piloto.</li>
              <li>Medición pedagógica mediante evaluaciones pre y post-taller.</li>
              <li>Acompañamiento a núcleos familiares mediante materiales digitales descargables.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Details */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-2xl">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Equipo Responsable del Proyecto
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Estudiantes del curso de Ética Aplicada &bull; Inga. Melissa Carlily González Ramírez
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-sm text-slate-900">{member.name}</h3>
              <p className="text-xs text-slate-500">Carné: <strong className="text-slate-800 font-medium">{member.carnId}</strong></p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 text-xs text-slate-400 font-normal">
          Universidad Rafael Landívar &bull; Campus San Alberto Hurtado &bull; Quetzaltenango, Guatemala &bull; Agosto - Septiembre 2026
        </div>
      </section>

    </div>
  );
}
