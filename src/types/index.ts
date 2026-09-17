export type MigrationStage = 
  | "planificacion" 
  | "en_transito" 
  | "retorno" 
  | "familiar";

export type CourseCategory = 
  | "alfabetizacion_basica" 
  | "seguridad_antifraude" 
  | "tramites_oficiales" 
  | "empleabilidad_cv";

export interface Experience {
  id: string;
  title: string;
  stage: MigrationStage;
  authorAlias: string; // Anonymous or generic alias
  departmentOrRegion: string;
  date: string;
  story: string;
  digitalToolsUsed: string[];
  keyAdvice: string;
  risksAvoided: string;
  usefulVotes: number;
  verifiedEthics: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  platform: string; // e.g., 'Capacítate para el Empleo', 'Google Actívate', 'YouTube Oficial', 'Platzi Becas', 'Intecap'
  url: string;
  duration: string;
  level: "Básico" | "Intermedio" | "Todos los niveles";
  free: boolean;
  description: string;
  whyItMatters: string;
  recommendedBy: string;
  tags: string[];
  iconName?: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  type: "Oficial Gubernamental" | "Albergue / Casa del Migrante" | "Organismo Internacional" | "Educación / Comunidad";
  description: string;
  services: string[];
  phone: string;
  emergencyPhone?: string;
  address: string;
  location: string; // e.g. "Quetzaltenango", "Ciudad de Guatemala", "San Marcos", "Tecún Umán"
  websiteUrl: string;
  isOfficial: boolean;
  freeServicesNote: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  category: "seguridad" | "fuentes_oficiales" | "tramites" | "datos_personales";
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface PhishingScenario {
  id: string;
  type: "sms" | "whatsapp" | "email" | "web";
  sender: string;
  content: string;
  isScam: boolean;
  explanation: string;
  redFlags: string[];
  safeAction: string;
}
