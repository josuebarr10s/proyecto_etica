"use client";

import React, { useState, useEffect } from "react";
import { Course } from "@/types";
import { INITIAL_COURSES } from "@/data/initialCourses";
import CourseCard from "@/components/CourseCard";
import NewCourseModal from "@/components/NewCourseModal";
import { 
  PlusCircle, 
  Search, 
  GraduationCap,
  AlertCircle
} from "lucide-react";

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load persisted courses from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("conectando_caminos_courses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCourses(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAddCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    try {
      localStorage.setItem("conectando_caminos_courses", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.platform.toLowerCase().includes(query) ||
      course.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Formación Gratuita y Autoguiada</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            Catálogo de Cursos y Recursos Sugeridos
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Plataformas certificadas y gratuitas seleccionadas para aprender habilidades digitales, crear tu CV, navegar sitios oficiales y proteger tu dinero y datos personales.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-600/20 hover:scale-105 transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Sugerir un Curso / Recurso</span>
        </button>
      </div>

      {/* Categories / Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-[#E7DECE] p-4 rounded-2xl shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema (CV, Ciberseguridad, WhatsApp, Pasaportes, Google)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { key: "all", label: "Todos los Cursos" },
            { key: "alfabetizacion_basica", label: "Alfabetización Básica" },
            { key: "seguridad_antifraude", label: "Seguridad y Antifraude" },
            { key: "tramites_oficiales", label: "Trámites Oficiales" },
            { key: "empleabilidad_cv", label: "Empleabilidad & CV" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.key
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-[#F5F0E8] text-stone-700 hover:bg-[#EFE8DC] hover:text-stone-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E7DECE] rounded-3xl space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
          <h3 className="text-lg font-bold text-stone-900">No se encontraron cursos</h3>
          <p className="text-xs text-stone-600 font-medium">
            Intenta con otro término de búsqueda o selecciona otra categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Modal for adding course */}
      <NewCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

    </div>
  );
}
