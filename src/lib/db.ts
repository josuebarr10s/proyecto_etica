import { supabase, isSupabaseConfigured } from "./supabase";
import {
  Experience,
  Course,
  CourseCategory,
  DirectoryItem,
  TestQuestion,
  PhishingScenario,
  MigrationStage,
} from "@/types";
import { INITIAL_EXPERIENCES } from "@/data/initialExperiences";
import { INITIAL_COURSES } from "@/data/initialCourses";
import { DIRECTORY_DATA } from "@/data/directoryData";
import { TEST_QUESTIONS } from "@/data/testQuestions";
import { PHISHING_SCENARIOS } from "@/data/phishingScenarios";

const CATEGORY_SLUG_TO_ID: Record<CourseCategory, number> = {
  alfabetizacion_basica: 1,
  seguridad_antifraude: 2,
  tramites_oficiales: 3,
  empleabilidad_cv: 4,
};

const CATEGORY_ID_TO_SLUG: Record<number, CourseCategory> = {
  1: "alfabetizacion_basica",
  2: "seguridad_antifraude",
  3: "tramites_oficiales",
  4: "empleabilidad_cv",
};

// ============================================================================
// 1. EXPERIENCIAS COMUNITARIAS
// ============================================================================

export async function fetchExperiences(): Promise<Experience[]> {
  if (!isSupabaseConfigured || !supabase) {
    return INITIAL_EXPERIENCES;
  }

  try {
    const { data, error } = await supabase
      .from("experiences")
      .select(
        `
        id,
        title,
        stage,
        author_alias,
        department_or_region,
        story,
        key_advice,
        risks_avoided,
        verified_ethics,
        useful_votes_count,
        created_at,
        experience_tools ( tool_name )
      `
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_EXPERIENCES;
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      stage: row.stage as MigrationStage,
      authorAlias: row.author_alias,
      departmentOrRegion: row.department_or_region,
      date: row.created_at
        ? new Date(row.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      story: row.story,
      digitalToolsUsed: Array.isArray(row.experience_tools)
        ? row.experience_tools.map((t: any) => t.tool_name)
        : [],
      keyAdvice: row.key_advice,
      risksAvoided: row.risks_avoided || "",
      usefulVotes: row.useful_votes_count ?? 1,
      verifiedEthics: Boolean(row.verified_ethics),
    }));
  } catch {
    return INITIAL_EXPERIENCES;
  }
}

export async function createExperienceInDb(
  exp: Omit<Experience, "id">
): Promise<Experience | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data: inserted, error } = await supabase
      .from("experiences")
      .insert({
        title: exp.title,
        stage: exp.stage,
        author_alias: exp.authorAlias,
        department_or_region: exp.departmentOrRegion,
        story: exp.story,
        key_advice: exp.keyAdvice,
        risks_avoided: exp.risksAvoided || "",
        verified_ethics: true,
        consent_given: true,
        status: "approved",
        useful_votes_count: exp.usefulVotes ?? 1,
      })
      .select("*")
      .single();

    if (error || !inserted) {
      console.error("Error al guardar experiencia en Supabase:", error);
      return null;
    }

    if (exp.digitalToolsUsed && exp.digitalToolsUsed.length > 0) {
      const toolRows = exp.digitalToolsUsed.map((tool) => ({
        experience_id: inserted.id,
        tool_name: tool,
      }));
      await supabase.from("experience_tools").insert(toolRows);
    }

    return {
      ...exp,
      id: inserted.id,
      date: inserted.created_at
        ? new Date(inserted.created_at).toISOString().split("T")[0]
        : exp.date,
    };
  } catch (err) {
    console.error("Error inesperado al crear experiencia:", err);
    return null;
  }
}

export async function voteExperienceInDb(experienceId: string): Promise<number | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  // Solo si es un UUID válido en Supabase
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(experienceId)) {
    return null;
  }

  try {
    // Generar un identificador anónimo de sesión para el voto ético
    let voterHash = "anon";
    if (typeof window !== "undefined") {
      let stored = localStorage.getItem("conectando_caminos_voter_hash");
      if (!stored) {
        stored = `vh_${Math.random().toString(36).substring(2)}_${Date.now()}`;
        localStorage.setItem("conectando_caminos_voter_hash", stored);
      }
      voterHash = `${stored}_${experienceId}`;
    }

    const { data, error } = await supabase.rpc("vote_experience_useful", {
      p_experience_id: experienceId,
      p_voter_hash: voterHash,
    });

    if (error) {
      // Fallback con UPDATE directo si la función RPC no existe
      return null;
    }

    return typeof data === "number" ? data : null;
  } catch {
    return null;
  }
}

// ============================================================================
// 2. CATÁLOGO DE CURSOS Y RECURSOS
// ============================================================================

export async function fetchCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured || !supabase) {
    return INITIAL_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select(
        `
        id,
        category_id,
        title,
        platform,
        url,
        duration,
        level,
        is_free,
        description,
        why_it_matters,
        recommended_by,
        icon_name,
        course_categories ( slug ),
        course_tags ( tag_name )
      `
      )
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_COURSES;
    }

    return data.map((row: any) => {
      const catSlug =
        row.course_categories?.slug ||
        CATEGORY_ID_TO_SLUG[row.category_id] ||
        "alfabetizacion_basica";

      return {
        id: row.id,
        title: row.title,
        category: catSlug as CourseCategory,
        platform: row.platform,
        url: row.url,
        duration: row.duration,
        level: row.level as Course["level"],
        free: Boolean(row.is_free),
        description: row.description,
        whyItMatters: row.why_it_matters,
        recommendedBy: row.recommended_by || "Comunidad Conectando Caminos",
        tags: Array.isArray(row.course_tags)
          ? row.course_tags.map((t: any) => t.tag_name)
          : [],
        iconName: row.icon_name || "BookOpen",
      };
    });
  } catch {
    return INITIAL_COURSES;
  }
}

export async function createCourseInDb(
  course: Omit<Course, "id">
): Promise<Course | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const categoryId = CATEGORY_SLUG_TO_ID[course.category] || 1;

    const { data: inserted, error } = await supabase
      .from("courses")
      .insert({
        category_id: categoryId,
        title: course.title,
        platform: course.platform,
        url: course.url,
        duration: course.duration,
        level: course.level,
        is_free: true,
        description: course.description,
        why_it_matters: course.whyItMatters,
        recommended_by: course.recommendedBy,
        icon_name: course.iconName || "BookOpen",
      })
      .select("*")
      .single();

    if (error || !inserted) {
      console.error("Error al guardar curso en Supabase:", error);
      return null;
    }

    if (course.tags && course.tags.length > 0) {
      const tagRows = course.tags.map((tag) => ({
        course_id: inserted.id,
        tag_name: tag,
      }));
      await supabase.from("course_tags").insert(tagRows);
    }

    return {
      ...course,
      id: inserted.id,
    };
  } catch (err) {
    console.error("Error inesperado al crear curso:", err);
    return null;
  }
}

// ============================================================================
// 3. DIRECTORIO HUMANITARIO Y OFICIAL
// ============================================================================

export async function fetchDirectoryItems(): Promise<DirectoryItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return DIRECTORY_DATA;
  }

  try {
    const { data, error } = await supabase
      .from("directory_items")
      .select(
        `
        id,
        name,
        org_type,
        description,
        phone,
        emergency_phone,
        address,
        department_or_region,
        website_url,
        is_official,
        free_services_note,
        directory_services ( service_name )
      `
      )
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return DIRECTORY_DATA;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      type: row.org_type as DirectoryItem["type"],
      description: row.description,
      services: Array.isArray(row.directory_services)
        ? row.directory_services.map((s: any) => s.service_name)
        : [],
      phone: row.phone,
      emergencyPhone: row.emergency_phone || undefined,
      address: row.address,
      location: row.department_or_region,
      websiteUrl: row.website_url,
      isOfficial: Boolean(row.is_official),
      freeServicesNote: row.free_services_note,
    }));
  } catch {
    return DIRECTORY_DATA;
  }
}

// ============================================================================
// 4. EVALUACIONES PEDAGÓGICAS (PRE-TEST Y POST-TEST ENRO)
// ============================================================================

export async function fetchTestQuestions(): Promise<TestQuestion[]> {
  if (!isSupabaseConfigured || !supabase) {
    return TEST_QUESTIONS;
  }

  try {
    const { data, error } = await supabase
      .from("test_questions")
      .select(
        `
        id,
        category,
        question_text,
        question_order,
        test_options (
          id,
          option_code,
          option_text,
          is_correct,
          explanation
        )
      `
      )
      .eq("is_active", true)
      .order("question_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return TEST_QUESTIONS;
    }

    return data.map((row: any) => ({
      id: row.id,
      question: row.question_text,
      category: row.category as TestQuestion["category"],
      options: Array.isArray(row.test_options)
        ? row.test_options
            .sort((a: any, b: any) => a.option_code.localeCompare(b.option_code))
            .map((opt: any) => ({
              id: opt.option_code,
              text: opt.option_text,
              isCorrect: Boolean(opt.is_correct),
              explanation: opt.explanation,
            }))
        : [],
    }));
  } catch {
    return TEST_QUESTIONS;
  }
}

export async function saveTestEvaluationInDb(params: {
  studentName: string;
  testType: "pre" | "post";
  score: number;
  totalQuestions: number;
}): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const certificateCode = `CC-${params.testType.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    const { data, error } = await supabase
      .from("test_evaluations")
      .insert({
        student_name: params.studentName.trim() || "Estudiante Participante",
        test_type: params.testType,
        score: params.score,
        total_questions: params.totalQuestions,
        certificate_code: certificateCode,
      })
      .select("certificate_code")
      .single();

    if (error || !data) {
      return null;
    }

    return data.certificate_code;
  } catch {
    return null;
  }
}

// ============================================================================
// 5. SIMULADOR DE PHISHING Y RETROALIMENTACIÓN
// ============================================================================

export async function fetchPhishingScenarios(): Promise<PhishingScenario[]> {
  if (!isSupabaseConfigured || !supabase) {
    return PHISHING_SCENARIOS;
  }

  try {
    const { data, error } = await supabase
      .from("phishing_scenarios")
      .select(
        `
        id,
        channel_type,
        sender,
        message_content,
        is_scam,
        explanation,
        safe_action,
        scenario_order,
        phishing_red_flags ( flag_text, flag_order )
      `
      )
      .order("scenario_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return PHISHING_SCENARIOS;
    }

    return data.map((row: any) => ({
      id: row.id,
      type: row.channel_type as PhishingScenario["type"],
      sender: row.sender,
      content: row.message_content,
      isScam: Boolean(row.is_scam),
      explanation: row.explanation,
      safeAction: row.safe_action,
      redFlags: Array.isArray(row.phishing_red_flags)
        ? row.phishing_red_flags
            .sort((a: any, b: any) => (a.flag_order ?? 1) - (b.flag_order ?? 1))
            .map((f: any) => f.flag_text)
        : [],
    }));
  } catch {
    return PHISHING_SCENARIOS;
  }
}

export async function savePhishingAttemptInDb(params: {
  scenarioId: string;
  selectedIsScam: boolean;
  isCorrect: boolean;
}): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(params.scenarioId)) return;

  try {
    await supabase.from("phishing_attempts").insert({
      scenario_id: params.scenarioId,
      selected_is_scam: params.selectedIsScam,
      is_correct: params.isCorrect,
    });
  } catch {
    // Ignore error silently
  }
}

export async function saveCommunityFeedbackInDb(params: {
  category: string;
  rating: number;
  comment: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase.from("community_feedback").insert({
      respondent_category: params.category,
      rating: params.rating,
      comment: params.comment,
    });
    return !error;
  } catch {
    return false;
  }
}
