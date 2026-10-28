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
    badgeBg: "bg-amber-50",
    text: "text-amber-700 font-medium",
    border: "border-amber-200/80"
  },
  seguridad_antifraude: {
    label: "Seguridad y Antifraude",
    badgeBg: "bg-rose-50",
    text: "text-rose-700 font-medium",
    border: "border-rose-200/80"
  },
  tramites_oficiales: {
    label: "Trámites y Fuentes Oficiales",
    badgeBg: "bg-slate-100",
    text: "text-slate-700 font-medium",
    border: "border-slate-200"
  },
  empleabilidad_cv: {
    label: "Empleabilidad y CV Digital",
    badgeBg: "bg-emerald-50",
    text: "text-emerald-700 font-medium",
    border: "border-emerald-200/80"
  }
};

export default function CourseCard({ course }: CourseCardProps) {
  const catStyle = CATEGORY_STYLES[course.category] || CATEGORY_STYLES.alfabetizacion_basica;

  const renderIcon = () => {
    switch (course.iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-amber-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-rose-600" />;
      case "FileCheck":
        return <FileCheck className="w-5 h-5 text-slate-600" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-amber-600" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5 text-emerald-600" />;
      case "MessageCircle":
        return <MessageCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl p-6 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between group">
      
      <div>
        {/* Header: Category Badge & Free Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-xs rounded-full border ${catStyle.badgeBg} ${catStyle.text} ${catStyle.border}`}>
            {catStyle.label}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            100% Gratuito
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
            {renderIcon()}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Platform & Duration */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <span className="font-semibold text-slate-800 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            {course.platform}
          </span>
          <span className="flex items-center gap-1 font-normal text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">
            Nivel: {course.level}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 font-normal">
          {course.description}
        </p>

        {/* Why it matters - Clean inline callout without heavy box frame */}
        <div className="flex items-start gap-2 text-xs text-slate-500 mb-4 bg-slate-50/60 p-2.5 rounded-lg border-l-2 border-amber-500">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{course.whyItMatters}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[11px] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action: Open Course Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Por: <strong className="text-slate-700 font-medium">{course.recommendedBy}</strong>
        </span>

        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
        >
          <span>Acceder</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
