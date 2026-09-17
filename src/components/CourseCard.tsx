"use client";

import React from "react";
import { Course, CourseCategory } from "@/types";
import { 
  ExternalLink, 
  Clock, 
  Award, 
  CheckCircle2, 
  Lightbulb, 
  Sparkles,
  Smartphone,
  ShieldCheck,
  FileCheck,
  Briefcase,
  Globe,
  UserCheck,
  MessageCircle,
  Lock
} from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CATEGORY_STYLES: Record<CourseCategory, { label: string; badgeBg: string; text: string; border: string }> = {
  alfabetizacion_basica: {
    label: "Alfabetización Básica",
    badgeBg: "bg-amber-100/90",
    text: "text-amber-950 font-bold",
    border: "border-amber-300"
  },
  seguridad_antifraude: {
    label: "Seguridad y Antifraude",
    badgeBg: "bg-orange-100/90",
    text: "text-orange-950 font-bold",
    border: "border-orange-300"
  },
  tramites_oficiales: {
    label: "Trámites y Fuentes Oficiales",
    badgeBg: "bg-stone-200/90",
    text: "text-stone-900 font-bold",
    border: "border-stone-300"
  },
  empleabilidad_cv: {
    label: "Empleabilidad y CV Digital",
    badgeBg: "bg-emerald-100/90",
    text: "text-emerald-950 font-bold",
    border: "border-emerald-300"
  }
};

export default function CourseCard({ course }: CourseCardProps) {
  const catStyle = CATEGORY_STYLES[course.category] || CATEGORY_STYLES.alfabetizacion_basica;

  const renderIcon = () => {
    switch (course.iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-amber-700" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-orange-700" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-red-700" />;
      case "FileCheck":
        return <FileCheck className="w-5 h-5 text-stone-700" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-amber-800" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-emerald-700" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5 text-emerald-800" />;
      case "MessageCircle":
        return <MessageCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="bg-white border border-[#E7DECE] hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
      
      <div>
        {/* Header: Category Badge & Free Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-1 text-xs rounded-full border ${catStyle.badgeBg} ${catStyle.text} ${catStyle.border}`}>
            {catStyle.label}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            100% Gratuito
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 bg-[#F5F0E8] border border-[#E7DECE] rounded-xl shrink-0 group-hover:scale-110 transition-transform">
            {renderIcon()}
          </div>
          <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Platform & Duration */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 mb-4 pb-3 border-b border-[#F0EAE1]">
          <span className="font-bold text-stone-800 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            {course.platform}
          </span>
          <span className="flex items-center gap-1 font-medium text-stone-600">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="px-2 py-0.5 bg-[#F5F0E8] rounded text-stone-700 font-semibold">
            Nivel: {course.level}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-700 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Why it matters Box */}
        <div className="p-3.5 bg-[#FAF6F0] border border-[#EBE3D5] rounded-xl mb-4">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
            <Lightbulb className="w-4 h-4 text-amber-700" />
            <span>¿Por qué es útil para la comunidad?</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {course.whyItMatters}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 bg-[#F5F0E8] text-stone-600 border border-[#E7DECE] rounded-lg text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action: Open Course Link */}
      <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
        <span className="text-xs text-stone-500">
          Sugerido por: <strong className="text-stone-800">{course.recommendedBy}</strong>
        </span>

        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-sm hover:scale-105 transition-all"
        >
          <span>Acceder al Curso</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
