import { Course } from "@/types";

export const INITIAL_COURSES: Course[] = [
  // Alfabetización Digital Básica
  {
    id: "course-1",
    title: "Alfabetización Digital Básica para Smartphone y Computadora",
    category: "alfabetizacion_basica",
    platform: "Capacítate para el Empleo (Fundación Carlos Slim)",
    url: "https://capacitateparaelempleo.org",
    duration: "15 horas (Autoguiado)",
    level: "Básico",
    free: true,
    description: "Aprende desde cero a navegar por internet, usar el correo electrónico, organizar archivos en la nube y realizar búsquedas eficientes en Google.",
    whyItMatters: "Permite a personas sin experiencia previa dominar su teléfono inteligente para trámites, comunicación y educación sin depender de terceros.",
    recommendedBy: "Equipo Conectando Caminos - URL",
    tags: ["Internet", "Correo", "Google", "Smartphone", "Gratis con Certificado"],
    iconName: "Smartphone"
  },
  {
    id: "course-2",
    title: "Manejo Seguro de Aplicaciones de Mensajería y Videollamadas",
    category: "alfabetizacion_basica",
    platform: "Google Actívate / YouTube Edu",
    url: "https://grow.google/intl/es/courses-and-tools/",
    duration: "4 horas",
    level: "Básico",
    free: true,
    description: "Tutorial práctico para configurar WhatsApp, Telegram y Google Meet: cómo crear grupos familiares seguros, enviar ubicación en tiempo real y hacer videollamadas con bajo consumo de datos.",
    whyItMatters: "Esencial para mantener la comunicación familiar constante y económica durante cualquier trayecto o desde el exterior.",
    recommendedBy: "Departamento de Orientación ENRO",
    tags: ["WhatsApp", "Videollamadas", "Ahorro de Datos", "Familia"],
    iconName: "MessageCircle"
  },

  // Seguridad Digital y Antifraude
  {
    id: "course-3",
    title: "Ciberseguridad Ciudadana: Prevención de Fraudes y Protección de Datos",
    category: "seguridad_antifraude",
    platform: "Cisco Networking Academy (SkillsForAll)",
    url: "https://skillsforall.com/course/introduction-to-cybersecurity?courseLang=es-XL",
    duration: "6 horas",
    level: "Todos los niveles",
    free: true,
    description: "Aprende a reconocer enlaces engañosos (phishing), proteger contraseñas bancarias, activar la verificación en dos pasos y evitar el robo de identidad digital.",
    whyItMatters: "La población migrante y sus familias son blanco frecuente de estafas digitales y extorsiones; este curso brinda escudos de protección real.",
    recommendedBy: "Facultad de Ingeniería URL",
    tags: ["Antifraude", "Contraseñas Seguras", "Privacidad", "2FA"],
    iconName: "ShieldCheck"
  },
  {
    id: "course-4",
    title: "Protección de tu Privacidad y Celular en Movilidad Humana",
    category: "seguridad_antifraude",
    platform: "Front Line Defenders & Security First (Umbrella App)",
    url: "https://secfirst.org/es/",
    duration: "Guía interactiva (3 horas)",
    level: "Básico",
    free: true,
    description: "Guía paso a paso sobre cómo bloquear tu dispositivo con huella/PIN, cifrar tus chats, borrar datos de forma remota en caso de robo y navegar en modo privado.",
    whyItMatters: "Evita que extraños o delincuentes accedan a las fotos, contactos y cuentas bancarias familiares guardadas en el teléfono.",
    recommendedBy: "Conectando Caminos",
    tags: ["Cifrado", "Seguridad Móvil", "Ubicación Privada", "Copia de Seguridad"],
    iconName: "Lock"
  },

  // Trámites Migratorios y Fuentes Oficiales
  {
    id: "course-5",
    title: "Guía para Navegar Portales Oficiales de Migración e Identidad (IGM y RENAP)",
    category: "tramites_oficiales",
    platform: "Portal Oficial IGM Guatemala",
    url: "https://igm.gob.gt",
    duration: "Guía multimedia (2 horas)",
    level: "Básico",
    free: true,
    description: "Aprende a verificar páginas oficiales terminadas en .gob.gt, generar citas de pasaporte en línea, solicitar certificados de nacimiento en RENAP y consultar el estatus de trámites sin pagar intermediarios.",
    whyItMatters: "Muchos tramitadores ilegales cobran cifras excesivas por citas que son gratuitas y oficiales ante el gobierno guatemalteco.",
    recommendedBy: "Estudiantes Ética Aplicada URL",
    tags: ["IGM", "Pasaportes", "RENAP", "Citas Oficiales", "Trámites Seguros"],
    iconName: "FileCheck"
  },
  {
    id: "course-6",
    title: "Rutas de Retorno Seguro y Servicios de Apoyo Institucional",
    category: "tramites_oficiales",
    platform: "OIM Guatemala / Plan Retorno al Hogar",
    url: "https://guatemala.iom.int",
    duration: "Módulo informativo interactivo",
    level: "Todos los niveles",
    free: true,
    description: "Conoce los programas de acogida, asistencia humanitaria, casas de acogida de la Pastoral de Movilidad Humana y opciones de reintegración productiva.",
    whyItMatters: "Ofrece a personas retornadas un mapa claro de organizaciones humanitarias que brindan asistencia gratuita y legal.",
    recommendedBy: "Red Pastoral de Movilidad Humana",
    tags: ["OIM", "Retorno al Hogar", "Casas del Migrante", "Derechos Humanos"],
    iconName: "Globe"
  },

  // Empleabilidad y Desarrollo Profesional
  {
    id: "course-7",
    title: "Creación de Currículum Vitae Digital de Alto Impacto con Canva",
    category: "empleabilidad_cv",
    platform: "Canva Design School / YouTube Tutoriales",
    url: "https://www.canva.com/es_419/crear/curriculum-vitae/",
    duration: "3 horas",
    level: "Básico",
    free: true,
    description: "Aprende a diseñar tu hoja de vida desde el celular o computadora con plantillas profesionales, exportarlo en formato PDF y redactar tus logros y habilidades prácticas.",
    whyItMatters: "Un CV bien presentado en formato digital multiplica las probabilidades de conseguir entrevistas laborales formales en Guatemala o el extranjero.",
    recommendedBy: "Equipo Conectando Caminos",
    tags: ["Canva", "CV Digital", "PDF", "Búsqueda de Empleo"],
    iconName: "Briefcase"
  },
  {
    id: "course-8",
    title: "Búsqueda Activa de Empleo en Portales Digitales y Entrevistas Virtuales",
    category: "empleabilidad_cv",
    platform: "Capacítate para el Empleo",
    url: "https://capacitateparaelempleo.org",
    duration: "8 horas",
    level: "Todos los niveles",
    free: true,
    description: "Cómo registrarse en portales confiables como Transdoc, Computrabajo y LinkedIn, postularse con seguridad, preparar entrevistas por Zoom/Meet y evitar ofertas fraudulentas.",
    whyItMatters: "Facilita la reinserción laboral de jóvenes y personas retornadas en el mercado laboral formal guatemalteco.",
    recommendedBy: "Comunidad Estudiantil ENRO",
    tags: ["Transdoc", "LinkedIn", "Entrevistas Virtuales", "Empleo Formal"],
    iconName: "UserCheck"
  }
];
