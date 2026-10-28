"use client";

import React, { useState } from "react";
import PhishingSimulator from "@/components/PhishingSimulator";
import CvBuilderModal from "@/components/CvBuilderModal";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  Lock, 
  Key, 
  EyeOff, 
  HardDrive, 
  CheckCircle2, 
  AlertTriangle,
  Briefcase,
  Sparkles
} from "lucide-react";

export default function GuiaDigitalPage() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header - Clean Open Layout */}
      <div className="max-w-3xl space-y-3 pb-2 border-b border-slate-200/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Kit de Autoprotección y Ciberseguridad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Guía de Autoprotección y Seguridad Digital
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Aprende a blindar tu teléfono inteligente, proteger tus fotos y documentos personales, y evitar engaños de intermediarios o estafadores en internet.
        </p>
      </div>

      {/* Interactive Anti-Phishing Simulator */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>1. Simulador Interactivo: ¿Estafa o Mensaje Legítimo?</span>
          </h2>
        </div>
        <PhishingSimulator />
      </section>

      {/* Step-by-Step Mobile Shielding - Clean Timeline/List, NOT 5 Boxed Cards */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-600" />
            <span>2. Blindaje de tu Teléfono Móvil en 5 Pasos</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Aplica estas 5 configuraciones en tu smartphone para que nadie pueda acceder a tus datos si pierdes tu dispositivo.
          </p>
        </div>

        {/* Clean Unified Container With Divided Items */}
        <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-2xs">
          
          {/* Step 1 */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200/80">
              1
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                Bloqueo con PIN de 6 dígitos o Huella
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                No uses patrones sencillos en forma de &quot;Z&quot; o &quot;L&quot; ni fechas de cumpleaños. Configura un PIN numérico de 6 dígitos o tu huella digital en <em className="text-slate-800 font-medium">Ajustes &gt; Seguridad</em>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200/80">
              2
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" />
                Verificación en Dos Pasos (WhatsApp y Gmail)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                En WhatsApp ve a <em className="text-slate-800 font-medium">Ajustes &gt; Cuenta &gt; Verificación en dos pasos</em>. Esto impide que si te roban el chip puedan activar tu WhatsApp en otro celular.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm shrink-0 border border-sky-200/80">
              3
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-sky-600" />
                Copia de Seguridad en Google Drive / iCloud
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Fotografía tus documentos de identidad (DPI, certificados, acta) y súbelos a una carpeta privada en la nube. Si pierdes el teléfono físico, tus documentos siguen a salvo.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
              4
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-slate-600" />
                Palabra Clave Familiar Secreta
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Acuerda con tus familiares una palabra secreta (ej. el nombre de una mascota de la infancia). Si alguien llama exigiendo dinero por un rescate o secuestro, esa palabra desenmascara la extorsión de inmediato.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200/80">
              5
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Activar &quot;Encontrar mi Dispositivo&quot;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Activa la opción de localización y borrado remoto de Google o Apple para que, en caso de pérdida o robo, puedas borrar fotos y cuentas a distancia desde cualquier computadora.
              </p>
            </div>
          </div>

        </div>

        {/* Bonus Tool: Clean Action Callout Instead of Heavy Card */}
        <div className="p-6 bg-slate-50/80 border border-slate-200/70 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Herramienta de Empleabilidad: Generador de CV Digital
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Estructura tu currículum vitae profesional en 2 minutos listo para enviar por WhatsApp o correo.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCvModalOpen(true)}
            className="shrink-0 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs"
          >
            Abrir Generador de CV
          </button>
        </div>

      </section>

      {/* Rules for Identifying Official Portals */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>3. ¿Cómo saber si una página o trámite es 100% Oficial en Guatemala?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
            <h4 className="font-semibold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Página Web Oficial y Segura
            </h4>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside text-xs">
              <li>Termina siempre en el dominio gubernamental: <strong className="text-slate-900 font-semibold">.gob.gt</strong> (ej. <em>igm.gob.gt</em>, <em>mintrabajo.gob.gt</em>, <em>minex.gob.gt</em>).</li>
              <li>Cuenta con certificado de seguridad (candado HTTPS).</li>
              <li>Las citas en línea para pasaporte son <strong className="text-slate-900 font-semibold">totalmente gratuitas</strong>.</li>
              <li>Los pagos de aranceles se realizan en ventanillas bancarias autorizadas (Banrural / Banco Industrial), nunca en cuentas a nombre de personas particulares.</li>
            </ul>
          </div>

          <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
            <h4 className="font-semibold text-rose-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Señales de Alerta de Trampa o Estafa
            </h4>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside text-xs">
              <li>El sitio web termina en dominios gratuitos como <em>.blogspot.com</em>, <em>.wixsite.com</em> o <em>.free.biz</em>.</li>
              <li>Te solicitan dinero por adelantado a través de transferencias rápidas o depósitos a terceros.</li>
              <li>Prometen "visas 100% garantizadas en 3 días" o cruces clandestinos por grupos de redes sociales.</li>
              <li>Te piden fotografías de tu DPI o pasaporte por WhatsApp sin ningún contrato laboral verificado.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CV Builder Modal */}
      <CvBuilderModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

    </div>
  );
}
