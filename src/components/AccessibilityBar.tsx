"use client";

import React, { useState, useEffect } from "react";
import { Eye, Sparkles } from "lucide-react";

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "large") {
      root.style.fontSize = "18px";
    } else if (fontSize === "xlarge") {
      root.style.fontSize = "20px";
    } else {
      root.style.fontSize = "16px";
    }

    if (highContrast) {
      document.body.classList.add("high-contrast-mode");
    } else {
      document.body.classList.remove("high-contrast-mode");
    }
  }, [fontSize, highContrast]);

  return (
    <div className="bg-slate-50/95 border-b border-slate-200/60 text-slate-600 py-1.5 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-slate-500" />
          <span>Accesibilidad e Inclusión Digital</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden sm:inline font-medium">Tamaño de letra:</span>
          <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                fontSize === "normal" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
              title="Tamaño normal"
              aria-label="Tamaño de texto normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                fontSize === "large" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
              title="Texto grande"
              aria-label="Tamaño de texto grande"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                fontSize === "xlarge" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
              title="Texto extra grande"
              aria-label="Tamaño de texto extra grande"
            >
              A++
            </button>
          </div>

          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
              highContrast
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100/70 hover:text-slate-900 shadow-xs"
            }`}
            aria-label="Alternar modo de alto contraste"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>{highContrast ? "Alto Contraste: ON" : "Alto Contraste"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
