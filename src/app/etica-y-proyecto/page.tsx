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
      
      {/* Page Header */}
      <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Ética Aplicada &bull; Aprendizaje-Servicio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Marco Ético, Metodología y Equipo del Proyecto
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Fundamentación académica y moral del proyecto "Conectando Caminos", desarrollado por estudiantes de Ingeniería en Informática y Sistemas de la Universidad Rafael Landívar en colaboración con la ENRO.
          </p>
        </div>
      </div>

      {/* ACM Code of Ethics Section */}
      <section className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
          <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Pilares Éticos según el Código de la ACM (2018)
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Association for Computing Machinery - Principios de conducta profesional aplicados al software social.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Principio 1</span>
            <h3 className="text-base font-bold text-stone-900">Equidad en el Diseño (UI/UX)</h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Diseñar soluciones tecnológicas que no asuman un conocimiento digital avanzado previo, creando interfaces intuitivas, con tonos cálidos y descansados, accesibles en cualquier teléfono móvil sin barreras de entrada.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-800">Principio 2</span>
            <h3 className="text-base font-bold text-stone-900">Protección y Minimización de Datos</h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Garantizar la privacidad absoluta: la plataforma no almacena números de DPI, números de pasaporte, estatus migratorio ni ubicaciones domiciliarias de los participantes o estudiantes.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Principio 3</span>
            <h3 className="text-base font-bold text-stone-900">Responsabilidad Social y Transparencia</h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              No generar falsas expectativas. Se aclara que este es un portal formativo y de orientación; no gestiona trámites gubernamentales ni promete empleo remunerado directo.
            </p>
          </div>

        </div>
      </section>

      {/* Context: Alianza ENRO y Justificación Social */}
      <section className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
          <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-2xl">
            <GraduationCap className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Institución Seleccionada: ENRO "Guillermo Ovando Arriola"
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Escuela Normal Rural de Occidente &bull; Quetzaltenango / Totonicapán
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          <div className="space-y-3">
            <p>
              La <strong>ENRO</strong> es un centro educativo clave en el occidente de Guatemala cuyo departamento de Orientación ha identificado estudiantes con familiares retornados, padres deportados o con intención de migrar.
            </p>
            <p>
              La alianza permite validar la plataforma web mediante una capacitación piloto práctica, brindando a los jóvenes y sus familias herramientas concretas de autoprotección digital y verificación de fuentes oficiales.
            </p>
          </div>
          <div className="p-5 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Objetivos de Impacto Comunitario
            </h4>
            <ul className="text-xs text-stone-800 space-y-1.5 list-disc list-inside">
              <li>Capacitación práctica presencial y virtual para estudiantes del grupo piloto.</li>
              <li>Medición pedagógica mediante evaluaciones pre y post-taller.</li>
              <li>Acompañamiento a núcleos familiares mediante materiales digitales descargables.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Details */}
      <section className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
          <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-2xl">
            <Users className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Equipo Responsable del Proyecto
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Estudiantes del curso de Ética Aplicada &bull; Inga. Melissa Carlily González Ramírez
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-5 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs border border-amber-200">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-sm text-stone-900">{member.name}</h3>
              <p className="text-xs text-stone-600 font-medium">Carné: <strong className="text-stone-800">{member.carnId}</strong></p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 text-xs text-stone-500 font-medium">
          Universidad Rafael Landívar &bull; Campus San Alberto Hurtado &bull; Quetzaltenango, Guatemala &bull; Agosto - Septiembre 2026
        </div>
      </section>

    </div>
  );
}
