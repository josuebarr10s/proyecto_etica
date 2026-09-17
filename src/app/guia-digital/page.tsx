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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
            <span>Kit de Autoprotección y Ciberseguridad</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Guía Práctica de Alfabetización y Seguridad Digital
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Consejos técnicos explicados de manera sencilla para blindar tu teléfono inteligente, proteger tus fotos y documentos personales, y evitar engaños de traficantes o estafadores en internet.
          </p>
        </div>
      </div>

      {/* Interactive Anti-Phishing Simulator */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>1. Simulador Interactivo: ¿Estafa o Mensaje Legítimo?</span>
          </h2>
        </div>
        <PhishingSimulator />
      </section>

      {/* Step-by-Step Mobile Shielding Checklist */}
      <section className="space-y-6">
        <div className="text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-700" />
            <span>2. Blindaje de tu Teléfono Móvil en 5 Pasos</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Aplica estas 5 configuraciones en tu smartphone para que nadie pueda acceder a tus datos si pierdes tu dispositivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white border border-[#E7DECE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg border border-amber-300">
              1
            </div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Bloqueo con PIN de 6 dígitos o Huella
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              No uses patrones sencillos en forma de "Z" o "L" ni fechas de cumpleaños. Configura un PIN numérico de 6 dígitos o tu huella digital en <em>Ajustes &gt; Seguridad</em>.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E7DECE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg border border-emerald-300">
              2
            </div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-700" />
              Verificación en Dos Pasos (WhatsApp y Gmail)
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              En WhatsApp ve a <em>Ajustes &gt; Cuenta &gt; Verificación en dos pasos</em>. Esto impide que si te roban el chip puedan activar tu WhatsApp en otro celular.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E7DECE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center font-bold text-lg border border-orange-300">
              3
            </div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-orange-700" />
              Copia en Google Drive / iCloud
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Escanea con tu cámara tus documentos (DPI, certificados, acta) y súbelos a una carpeta privada en la nube. Si pierdes el teléfono físico, tus documentos no se perderán.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-[#E7DECE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-900 flex items-center justify-center font-bold text-lg border border-stone-300">
              4
            </div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-stone-700" />
              Palabra Clave Familiar Secreta
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Acuerda con tus padres o hijos una palabra secreta (ej. el nombre de una mascota de la infancia). Si alguien llama exigiendo dinero por un secuestro, esa palabra desenmascara la extorsión.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-[#E7DECE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-900 flex items-center justify-center font-bold text-lg border border-red-300">
              5
            </div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-700" />
              Activar "Encontrar mi Dispositivo"
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Activa la opción de localización y borrado remoto de Google o Apple para que, en caso de pérdida o robo, puedas borrar fotos y cuentas a distancia desde cualquier computadora.
            </p>
          </div>

          {/* Bonus Tool: CV Generator */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-6 space-y-3 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-lg border border-amber-400 mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Herramienta de Empleabilidad: CV Digital
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                ¿Necesitas postularte a un empleo? Genera en 2 minutos tu currículum vitae listo para enviar por WhatsApp o correo.
              </p>
            </div>
            <button
              onClick={() => setCvModalOpen(true)}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105 mt-2"
            >
              Abrir Generador de CV
            </button>
          </div>

        </div>
      </section>

      {/* Rules for Identifying Official Portals */}
      <section className="bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <span>3. ¿Cómo saber si una página o trámite es 100% Oficial en Guatemala?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2">
            <h4 className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Página Web Oficial y Segura
            </h4>
            <ul className="space-y-1.5 text-stone-800 list-disc list-inside text-xs font-medium">
              <li>Termina siempre en el dominio gubernamental: <strong>.gob.gt</strong> (ej. <em>igm.gob.gt</em>, <em>mintrabajo.gob.gt</em>, <em>minex.gob.gt</em>).</li>
              <li>Cuenta con certificado de seguridad (candado HTTPS).</li>
              <li>Las citas en línea para pasaporte son <strong>totalmente gratuitas</strong>.</li>
              <li>Los pagos de aranceles se realizan en ventanillas bancarias autorizadas (Banrural / Banco Industrial), nunca en cuentas a nombre de personas particulares.</li>
            </ul>
          </div>

          <div className="p-5 bg-red-50 border border-red-300 rounded-2xl space-y-2">
            <h4 className="font-bold text-red-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              Señales de Alerta de Trampa o Estafa
            </h4>
            <ul className="space-y-1.5 text-stone-800 list-disc list-inside text-xs font-medium">
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
