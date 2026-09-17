import { DirectoryItem } from "@/types";

export const DIRECTORY_DATA: DirectoryItem[] = [
  {
    id: "dir-1",
    name: "Instituto Guatemalteco de Migración (IGM)",
    type: "Oficial Gubernamental",
    description: "Institución estatal rectora de las políticas migratorias y emisión de documentos de viaje (pasaportes, visas y control fronterizo) en Guatemala.",
    services: [
      "Emisión y renovación de pasaportes guatemaltecos",
      "Control de estatus migratorio oficial",
      "Atención y recepción de personas migrantes guatemaltecas retornadas",
      "Información sobre requisitos de viaje y regularización"
    ],
    phone: "(+502) 2411-2411",
    emergencyPhone: "1572 (Línea de Denuncias y Ayuda Migratoria)",
    address: "6ª Avenida 3-11, Zona 4, Ciudad de Guatemala (Sede Central). Delegación Quetzaltenango: Centro de Emisión de Pasaportes, Centro Comercial San Nicolás, Zona 3.",
    location: "Guatemala / Quetzaltenango / Todo el País",
    websiteUrl: "https://igm.gob.gt",
    isOfficial: true,
    freeServicesNote: "Las citas para pasaporte en el sitio web son 100% GRATUITAS. No pague a tramitadores."
  },
  {
    id: "dir-2",
    name: "Plan Retorno al Hogar (Gobierno de Guatemala)",
    type: "Oficial Gubernamental",
    description: "Programa de asistencia social y dignificación para connacionales retornados, facilitando transporte, alimentación y vinculación laboral.",
    services: [
      "Recepción y bienvenida humanitaria en centros de retorno",
      "Kits de higiene y alimentación básica",
      "Llamadas telefónicas gratuitas a familiares",
      "Orientación para el traslado seguro a sus comunidades de origen"
    ],
    phone: "(+502) 2414-3535",
    address: "Centro de Recepción de Retornados, Fuerza Aérea Guatemalteca / Ayutla (San Marcos)",
    location: "Ciudad de Guatemala / Tecún Umán",
    websiteUrl: "https://guatemala.gob.gt/plan-retorno-al-hogar/",
    isOfficial: true,
    freeServicesNote: "Todos los servicios del Plan Retorno al Hogar son completamente gratuitos."
  },
  {
    id: "dir-3",
    name: "Casa del Migrante Quetzaltenango (Pastoral de Movilidad Humana)",
    type: "Albergue / Casa del Migrante",
    description: "Espacio eclesial y humanitario de acogida temporal, alimentación, atención médica básica y apoyo psicosocial a migrantes y personas retornadas en el occidente del país.",
    services: [
      "Albergue temporal seguro y descanso",
      "Alimentación y agua potable",
      "Primeros auxilios médicos y medicinas básicas",
      "Llamadas internacionales y acceso a internet seguro para contacto familiar",
      "Acompañamiento psicológico y asesoría legal humanitaria"
    ],
    phone: "(+502) 7761-4115",
    emergencyPhone: "(+502) 5555-1234",
    address: "Zona 1, Quetzaltenango (Xela), Guatemala",
    location: "Quetzaltenango (Occidente)",
    websiteUrl: "https://movilidadhumana.com/casas-para-migrantes-iglesia-de-guatemala/",
    isOfficial: true,
    freeServicesNote: "La estadía, alimentación y auxilio son 100% humanitarios y sin costo."
  },
  {
    id: "dir-4",
    name: "Casa del Migrante Tecún Umán (San Marcos)",
    type: "Albergue / Casa del Migrante",
    description: "Punto de auxilio vital y refugio en la frontera occidental entre Guatemala y México, atendiendo a personas en tránsito y solicitantes de protección.",
    services: [
      "Alojamiento de emergencia",
      "Alimentación y aseo personal",
      "Orientación sobre derechos humanos y prevención de trata",
      "Canalización médica y recarga de dispositivos celulares"
    ],
    phone: "(+502) 7776-8344",
    address: "Ayutla, Tecún Umán, San Marcos, Guatemala",
    location: "San Marcos / Frontera México",
    websiteUrl: "https://movilidadhumana.com",
    isOfficial: true,
    freeServicesNote: "Atención gratuita sin discriminación por nacionalidad o estatus."
  },
  {
    id: "dir-5",
    name: "Organización Internacional para las Migraciones (OIM Guatemala)",
    type: "Organismo Internacional",
    description: "Agencia de las Naciones Unidas dedicada a promover la migración humana y ordenada para el beneficio de todos, con programas de reintegración sostenible.",
    services: [
      "Asistencia para la reintegración económica y formación técnica",
      "Información verificada sobre migración laboral regular y visas H-2",
      "Lucha contra la trata de personas y el tráfico ilícito de migrantes",
      "Línea de información gratuita sobre trámites"
    ],
    phone: "(+502) 2414-7400",
    emergencyPhone: "1801-466-4828",
    address: "Avenida Las Américas, Zona 13, Ciudad de Guatemala",
    location: "Guatemala / Cobertura Nacional",
    websiteUrl: "https://guatemala.iom.int",
    isOfficial: true,
    freeServicesNote: "La OIM no cobra honorarios por sus programas ni por información de orientación."
  },
  {
    id: "dir-6",
    name: "Escuela Normal Rural de Occidente 'Guillermo Ovando Arriola' (ENRO)",
    type: "Educación / Comunidad",
    description: "Centro educativo de formación docente en Quetzaltenango y aliado clave en alfabetización digital para estudiantes y familias vinculadas a la movilidad humana.",
    services: [
      "Departamento de Orientación y Acompañamiento Estudiantil",
      "Talleres de alfabetización y seguridad digital para jóvenes y familias",
      "Espacio comunitario de apoyo y prevención del riesgo migratorio"
    ],
    phone: "(+502) 7763-1200",
    address: "Totonicapán / Quetzaltenango, Guatemala",
    location: "Occidente de Guatemala",
    websiteUrl: "#",
    isOfficial: true,
    freeServicesNote: "Espacio escolar público de acompañamiento formativo e integral."
  }
];
