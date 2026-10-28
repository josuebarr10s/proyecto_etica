import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, GraduationCap, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Proyecto */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-2xs">
              <Compass className="w-4 h-4" />
            </div>
            <span>Conectando Caminos</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Plataforma comunitaria y educativa de alfabetización digital inclusiva para personas migrantes, retornadas y sus familias en Guatemala.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl w-fit">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Código de Ética ACM 2018</span>
          </div>
        </div>

        {/* Col 2: Enlaces Rápidos */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Portal Principal
              </Link>
            </li>
            <li>
              <Link href="/experiencias" className="hover:text-white transition-colors">
                Red de Testimonios
              </Link>
            </li>
            <li>
              <Link href="/cursos" className="hover:text-white transition-colors">
                Catálogo de Cursos Gratuitos
              </Link>
            </li>
            <li>
              <Link href="/guia-digital" className="hover:text-white transition-colors">
                Kit de Seguridad Digital
              </Link>
            </li>
            <li>
              <Link href="/evaluacion" className="hover:text-white transition-colors">
                Evaluación y Diagnóstico ENRO
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Instituciones y Contexto Académico */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Alianza y Comunidad
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Universidad Rafael Landívar (Campus San Alberto Hurtado)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Escuela Normal Rural de Occidente (ENRO) "Guillermo Ovando Arriola"</span>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Quetzaltenango y Altiplano Occidental, Guatemala</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Compromiso Ético y Responsabilidad */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Responsabilidad Social
          </h4>
          <p className="text-xs leading-relaxed text-slate-400">
            Este sitio es una iniciativa educativa sin fines de lucro bajo la metodología de Aprendizaje-Servicio. No promete trámites migratorios oficiales ni solicita información personal sensible.
          </p>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-900 font-medium">
            Ingeniería en Informática y Sistemas &bull; Ética Aplicada
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Conectando Caminos. Diseñado con compromiso ético y tecnológico para Guatemala.
        </div>
        <div className="text-slate-400 font-medium">
          Universidad Rafael Landívar &bull; ENRO
        </div>
      </div>
    </footer>
  );
}
