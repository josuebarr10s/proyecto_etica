-- =============================================================================
-- CONECTANDO CAMINOS - ESQUEMA RELACIONAL Y DATOS INICIALES (SUPABASE / POSTGRESQL)
-- Alfabetización Digital Inclusiva y Marco Ético (ACM 2018)
-- Universidad Rafael Landívar (URL) & Escuela Normal Rural de Occidente (ENRO)
-- =============================================================================

-- Habilitar extensión para generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. TABLAS DE USUARIOS, ROLES Y AUDITORÍA ÉTICA
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id INT NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  full_name VARCHAR(150) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  moderator_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  target_table VARCHAR(50) NOT NULL,
  target_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'approved', 'rejected', 'pii_filtered'
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 2. MURO COMUNITARIO DE EXPERIENCIAS Y HERRAMIENTAS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  stage VARCHAR(30) NOT NULL CHECK (stage IN ('planificacion', 'en_transito', 'retorno', 'familiar')),
  author_alias VARCHAR(100) NOT NULL DEFAULT 'Compañero/a Anónimo/a',
  department_or_region VARCHAR(100) NOT NULL DEFAULT 'Guatemala',
  story TEXT NOT NULL,
  key_advice TEXT NOT NULL,
  risks_avoided TEXT DEFAULT '',
  verified_ethics BOOLEAN NOT NULL DEFAULT TRUE,
  consent_given BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(30) NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  useful_votes_count INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.experience_tools (
  id SERIAL PRIMARY KEY,
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  tool_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.experience_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  voter_hash VARCHAR(128) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(experience_id, voter_hash)
);

-- =============================================================================
-- 3. CATÁLOGO DE CURSOS, CATEGORÍAS, ETIQUETAS Y PROGRESO
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.course_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE CHECK (slug IN ('alfabetizacion_basica', 'seguridad_antifraude', 'tramites_oficiales', 'empleabilidad_cv')),
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id INT NOT NULL REFERENCES public.course_categories(id) ON DELETE RESTRICT,
  title VARCHAR(200) NOT NULL,
  platform VARCHAR(150) NOT NULL,
  url TEXT NOT NULL,
  duration VARCHAR(100) NOT NULL DEFAULT 'Autoguiado',
  level VARCHAR(50) NOT NULL DEFAULT 'Básico' CHECK (level IN ('Básico', 'Intermedio', 'Todos los niveles')),
  is_free BOOLEAN NOT NULL DEFAULT TRUE,
  description TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  recommended_by VARCHAR(150) NOT NULL DEFAULT 'Comunidad Conectando Caminos',
  icon_name VARCHAR(50) DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_tags (
  id SERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  tag_name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- =============================================================================
-- 4. EVALUACIONES PEDAGÓGICAS (PRE-TEST Y POST-TEST ENRO)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.test_questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL CHECK (category IN ('seguridad', 'fuentes_oficiales', 'tramites', 'datos_personales')),
  question_text TEXT NOT NULL,
  question_order INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.test_options (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES public.test_questions(id) ON DELETE CASCADE,
  option_code VARCHAR(10) NOT NULL, -- '1a', '1b', '1c'
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  explanation TEXT NOT NULL,
  UNIQUE(question_id, option_code)
);

CREATE TABLE IF NOT EXISTS public.test_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name VARCHAR(150) NOT NULL DEFAULT 'Estudiante Participante',
  test_type VARCHAR(10) NOT NULL CHECK (test_type IN ('pre', 'post')),
  score INT NOT NULL,
  total_questions INT NOT NULL,
  certificate_code VARCHAR(64) UNIQUE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_evaluation_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES public.test_evaluations(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES public.test_questions(id) ON DELETE CASCADE,
  option_id INT REFERENCES public.test_options(id) ON DELETE SET NULL,
  is_correct BOOLEAN NOT NULL
);

-- =============================================================================
-- 5. SIMULADOR DE PHISHING Y CIBERSEGURIDAD
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.phishing_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_type VARCHAR(20) NOT NULL CHECK (channel_type IN ('sms', 'whatsapp', 'email', 'web')),
  sender VARCHAR(150) NOT NULL,
  message_content TEXT NOT NULL,
  is_scam BOOLEAN NOT NULL,
  explanation TEXT NOT NULL,
  safe_action TEXT NOT NULL,
  scenario_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.phishing_red_flags (
  id SERIAL PRIMARY KEY,
  scenario_id UUID NOT NULL REFERENCES public.phishing_scenarios(id) ON DELETE CASCADE,
  flag_text TEXT NOT NULL,
  flag_order INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.phishing_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES public.phishing_scenarios(id) ON DELETE CASCADE,
  selected_is_scam BOOLEAN NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 6. DIRECTORIO DE EMERGENCIAS, CASAS DEL MIGRANTE Y FUENTES OFICIALES
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.directory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL UNIQUE,
  org_type VARCHAR(80) NOT NULL CHECK (org_type IN (
    'Oficial Gubernamental',
    'Albergue / Casa del Migrante',
    'Organismo Internacional',
    'Educación / Comunidad'
  )),
  description TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  emergency_phone VARCHAR(80),
  address TEXT NOT NULL,
  department_or_region VARCHAR(120) NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  website_url TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT TRUE,
  free_services_note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_services (
  id SERIAL PRIMARY KEY,
  directory_item_id UUID NOT NULL REFERENCES public.directory_items(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL
);

-- =============================================================================
-- 7. CURRÍCULUMS DIGITALES (OPCIONAL / VOLUNTARIO) Y RETROALIMENTACIÓN ANÓNIMA
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  full_name VARCHAR(150) NOT NULL,
  profession VARCHAR(150),
  location VARCHAR(150) DEFAULT 'Quetzaltenango, Guatemala',
  summary TEXT,
  skills TEXT,
  experience_text TEXT,
  education_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_category VARCHAR(50) NOT NULL DEFAULT 'estudiante',
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 8. FUNCIÓN RPC PARA VOTACIÓN ÉTICA ANÓNIMA EN EXPERIENCIAS
-- =============================================================================

CREATE OR REPLACE FUNCTION public.vote_experience_useful(
  p_experience_id UUID,
  p_voter_hash VARCHAR DEFAULT NULL
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_count INT;
  v_hash VARCHAR;
BEGIN
  v_hash := COALESCE(p_voter_hash, encode(gen_random_bytes(16), 'hex'));

  INSERT INTO public.experience_votes (experience_id, voter_hash)
  VALUES (p_experience_id, v_hash)
  ON CONFLICT (experience_id, voter_hash) DO NOTHING;

  UPDATE public.experiences
  SET useful_votes_count = useful_votes_count + 1
  WHERE id = p_experience_id
  RETURNING useful_votes_count INTO v_new_count;

  RETURN v_new_count;
END;
$$;

-- =============================================================================
-- 9. POLÍTICAS DE SEGURIDAD A NIVEL DE FILA (ROW LEVEL SECURITY - RLS)
-- =============================================================================

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_evaluation_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phishing_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phishing_red_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phishing_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_feedback ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para recursos comunitarios y educativos
DROP POLICY IF EXISTS "Lectura pública de experiencias aprobadas" ON public.experiences;
CREATE POLICY "Lectura pública de experiencias aprobadas" ON public.experiences
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Publicación comunitaria de experiencias" ON public.experiences;
CREATE POLICY "Publicación comunitaria de experiencias" ON public.experiences
  FOR INSERT WITH CHECK (consent_given = TRUE AND verified_ethics = TRUE);

DROP POLICY IF EXISTS "Actualización de votos de experiencias" ON public.experiences;
CREATE POLICY "Actualización de votos de experiencias" ON public.experiences
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública de herramientas de experiencias" ON public.experience_tools;
CREATE POLICY "Lectura pública de herramientas de experiencias" ON public.experience_tools
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción pública de herramientas de experiencias" ON public.experience_tools;
CREATE POLICY "Inserción pública de herramientas de experiencias" ON public.experience_tools
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Inserción pública de votos" ON public.experience_votes;
CREATE POLICY "Inserción pública de votos" ON public.experience_votes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública de categorías de cursos" ON public.course_categories;
CREATE POLICY "Lectura pública de categorías de cursos" ON public.course_categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de cursos" ON public.courses;
CREATE POLICY "Lectura pública de cursos" ON public.courses
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Sugerencia comunitaria de cursos gratuitos" ON public.courses;
CREATE POLICY "Sugerencia comunitaria de cursos gratuitos" ON public.courses
  FOR INSERT WITH CHECK (is_free = TRUE);

DROP POLICY IF EXISTS "Lectura pública de etiquetas de cursos" ON public.course_tags;
CREATE POLICY "Lectura pública de etiquetas de cursos" ON public.course_tags
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción pública de etiquetas de cursos" ON public.course_tags;
CREATE POLICY "Inserción pública de etiquetas de cursos" ON public.course_tags
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública de preguntas de evaluación" ON public.test_questions;
CREATE POLICY "Lectura pública de preguntas de evaluación" ON public.test_questions
  FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Lectura pública de opciones de evaluación" ON public.test_options;
CREATE POLICY "Lectura pública de opciones de evaluación" ON public.test_options
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Registro público de evaluaciones pedagógicas" ON public.test_evaluations;
CREATE POLICY "Registro público de evaluaciones pedagógicas" ON public.test_evaluations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública de evaluaciones pedagógicas" ON public.test_evaluations;
CREATE POLICY "Lectura pública de evaluaciones pedagógicas" ON public.test_evaluations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Registro público de respuestas de evaluación" ON public.test_evaluation_answers;
CREATE POLICY "Registro público de respuestas de evaluación" ON public.test_evaluation_answers
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública de escenarios de phishing" ON public.phishing_scenarios;
CREATE POLICY "Lectura pública de escenarios de phishing" ON public.phishing_scenarios
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de señales de alerta phishing" ON public.phishing_red_flags;
CREATE POLICY "Lectura pública de señales de alerta phishing" ON public.phishing_red_flags
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Registro público de intentos de phishing" ON public.phishing_attempts;
CREATE POLICY "Registro público de intentos de phishing" ON public.phishing_attempts
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura pública del directorio humanitario" ON public.directory_items;
CREATE POLICY "Lectura pública del directorio humanitario" ON public.directory_items
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de servicios del directorio" ON public.directory_services;
CREATE POLICY "Lectura pública de servicios del directorio" ON public.directory_services
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Registro opcional de CV" ON public.resumes;
CREATE POLICY "Registro opcional de CV" ON public.resumes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Envío anónimo de retroalimentación" ON public.community_feedback;
CREATE POLICY "Envío anónimo de retroalimentación" ON public.community_feedback
  FOR INSERT WITH CHECK (true);

-- =============================================================================
-- 10. DATOS INICIALES (SEED DATA)
-- =============================================================================

-- 10.1 Roles
INSERT INTO public.roles (id, name, description) VALUES
  (1, 'admin_url', 'Coordinador académico / Administrador Universidad Rafael Landívar'),
  (2, 'orientador_enro', 'Docente o personal del Departamento de Orientación ENRO'),
  (3, 'estudiante_facilitador', 'Estudiante facilitador de Aprendizaje-Servicio'),
  (4, 'participante_comunidad', 'Estudiante, migrante o familiar participante')
ON CONFLICT (name) DO NOTHING;

-- 10.2 Categorías de Cursos
INSERT INTO public.course_categories (id, slug, name, description) VALUES
  (1, 'alfabetizacion_basica', 'Alfabetización Digital Básica', 'Dominio inicial de smartphone, correo, nube y mensajería segura.'),
  (2, 'seguridad_antifraude', 'Seguridad Digital y Antifraude', 'Prevención de estafas, phishing, robo de identidad y protección móvil.'),
  (3, 'tramites_oficiales', 'Trámites y Fuentes Oficiales', 'Uso de portales .gob.gt (IGM, RENAP, MINTRAB) y asistencia humanitaria.'),
  (4, 'empleabilidad_cv', 'Empleabilidad y CV Digital', 'Creación de currículum digital y búsqueda segura de empleo formal.')
ON CONFLICT (slug) DO NOTHING;

-- 10.3 Experiencias Iniciales (con UUIDs fijos para evitar duplicados al re-ejecutar)
INSERT INTO public.experiences (
  id, title, stage, author_alias, department_or_region, story, key_advice, risks_avoided, verified_ethics, consent_given, status, useful_votes_count, created_at
) VALUES
  (
    '11111111-1111-4111-8111-111111111101',
    'Cómo verificar ofertas de trabajo en el extranjero antes de salir',
    'planificacion',
    'Compañero de Quetzaltenango',
    'Quetzaltenango',
    'Hace unos meses un conocido me ofreció una visa H-2A de trabajo temporal a través de un grupo de Facebook pidiéndome Q2,500 de anticipo. Gracias a que aprendí a revisar las páginas del Ministerio de Trabajo (.gob.gt) y la Embajada, descubrí que las ofertas legítimas nunca cobran dinero adelantado por la visa y que la agencia era falsa.',
    'Nunca entregues dinero por adelantado en internet para conseguir un trámite de visa o empleo. Consulta siempre las ventanillas únicas oficiales de migración laboral.',
    'Estafa económica de más de Q2,500 y pérdida de documentos personales.',
    TRUE, TRUE, 'approved', 34, '2026-08-12T10:00:00Z'
  ),
  (
    '11111111-1111-4111-8111-111111111102',
    'Uso de ubicación compartida en tiempo real y respaldo de fotos',
    'en_transito',
    'Hermano en ruta',
    'San Marcos / Frontera',
    'Durante mi trayecto, acordé con mi hermana en Guatemala compartir mi ubicación en tiempo real por WhatsApp solo por lapsos de 8 horas y guardar copias escaneadas de mi DPI y partida de nacimiento en una cuenta de Google Drive con verificación de dos pasos. Eso me dio mucha tranquilidad cuando cambié de chip.',
    'Aprende de memoria al menos un número telefónico de emergencia con código de país (+502) y no lleves tus contraseñas escritas en un papel dentro de tu billetera.',
    'Pérdida irrecuperable de documentos en caso de robo o extravío del teléfono físico.',
    TRUE, TRUE, 'approved', 48, '2026-08-19T14:30:00Z'
  ),
  (
    '11111111-1111-4111-8111-111111111103',
    'Reinserción laboral: Creando mi CV digital con Canva y postulando en línea',
    'retorno',
    'Joven Retornado de Quiché',
    'Quiché / Xela',
    'Al regresar a Guatemala sentía que no tenía oportunidades. En un taller me enseñaron a estructurar un currículum moderno en el celular usando Canva y a registrarme en plataformas de empleo como Transdoc y Tecoloco. Logré certificar mis habilidades en soldadura y conseguir empleo en una constructora local en 3 semanas.',
    'Las habilidades que aprendiste fuera de Guatemala valen mucho. Aprende a redactarlas en un CV digital en PDF y compártelo directo a los correos de recursos humanos.',
    'Desempleo prolongado y caer en falsas ofertas de empleo que piden pagos de ''derecho de entrevista''.',
    TRUE, TRUE, 'approved', 29, '2026-08-25T09:15:00Z'
  ),
  (
    '11111111-1111-4111-8111-111111111104',
    'Cómo ayudé a mi mamá a identificar videollamadas falsas y extorsiones',
    'familiar',
    'Estudiante de Magisterio ENRO',
    'Totonicapán',
    'Mi papá está en el norte. Una vez llamaron a mi mamá desde un número desconocido diciendo que mi papá estaba detenido y que debíamos depositar Q5,000 urgente. Le enseñé a mi mamá la ''palabra clave familiar'' que habíamos acordado antes y a no entrar en pánico. Llamamos directamente a mi papá por su contacto habitual y comprobamos que estaba bien trabajando.',
    'Establece con tu familia una palabra o pregunta secreta que solo ustedes conozcan. Si alguien llama diciendo que un familiar está en peligro, esa palabra evita que caigas en extorsiones.',
    'Extorsión telefónica y angustia emocional grave.',
    TRUE, TRUE, 'approved', 52, '2026-09-02T16:45:00Z'
  ),
  (
    '11111111-1111-4111-8111-111111111105',
    'Cuidado con los grupos de ''Coyotes'' en TikTok y Facebook',
    'planificacion',
    'Vecino del Altiplano',
    'Huehuetenango',
    'En redes sociales abundan videos con música bonita prometiendo ''viajes 100% seguros y legales en avión'' pidiendo depósitos iniciales a cuentas de terceros. Esos perfiles son desechables. Investigando en fuentes oficiales de la OIM y el IGM entendí que son redes de trata y fraude.',
    'Desconfía de cualquier video o anuncio en redes sociales que prometa cruces de frontera o visas ''fáciles''. Son redes de estafa que te bloquean en cuanto depositas.',
    'Trata de personas, secuestro y pérdidas de miles de quetzales.',
    TRUE, TRUE, 'approved', 41, '2026-09-08T11:20:00Z'
  )
ON CONFLICT (id) DO NOTHING;

-- Limpiar e insertar herramientas de las experiencias iniciales
DELETE FROM public.experience_tools WHERE experience_id IN (
  '11111111-1111-4111-8111-111111111101',
  '11111111-1111-4111-8111-111111111102',
  '11111111-1111-4111-8111-111111111103',
  '11111111-1111-4111-8111-111111111104',
  '11111111-1111-4111-8111-111111111105'
);

INSERT INTO public.experience_tools (experience_id, tool_name) VALUES
  ('11111111-1111-4111-8111-111111111101', 'Google Chrome'),
  ('11111111-1111-4111-8111-111111111101', 'Portal MINTRAB (.gob.gt)'),
  ('11111111-1111-4111-8111-111111111101', 'WhatsApp con verificación'),
  ('11111111-1111-4111-8111-111111111102', 'WhatsApp Ubicación en Vivo'),
  ('11111111-1111-4111-8111-111111111102', 'Google Drive'),
  ('11111111-1111-4111-8111-111111111102', 'Autenticación en 2 Pasos'),
  ('11111111-1111-4111-8111-111111111103', 'Canva Móvil'),
  ('11111111-1111-4111-8111-111111111103', 'Gmail'),
  ('11111111-1111-4111-8111-111111111103', 'Transdoc Guatemala'),
  ('11111111-1111-4111-8111-111111111103', 'Computrabajo'),
  ('11111111-1111-4111-8111-111111111104', 'Palabra Clave Familiar'),
  ('11111111-1111-4111-8111-111111111104', 'Bloqueo de llamadas desconocidas'),
  ('11111111-1111-4111-8111-111111111104', 'Signal / WhatsApp'),
  ('11111111-1111-4111-8111-111111111105', 'Búsqueda Inversa de Imágenes'),
  ('11111111-1111-4111-8111-111111111105', 'Reporte de perfiles falsos'),
  ('11111111-1111-4111-8111-111111111105', 'Portal OIM');

-- 10.4 Cursos Iniciales
INSERT INTO public.courses (
  id, category_id, title, platform, url, duration, level, is_free, description, why_it_matters, recommended_by, icon_name
) VALUES
  (
    '22222222-2222-4222-8222-222222222201', 1,
    'Alfabetización Digital Básica para Smartphone y Computadora',
    'Capacítate para el Empleo (Fundación Carlos Slim)',
    'https://capacitateparaelempleo.org',
    '15 horas (Autoguiado)', 'Básico', TRUE,
    'Aprende desde cero a navegar por internet, usar el correo electrónico, organizar archivos en la nube y realizar búsquedas eficientes en Google.',
    'Permite a personas sin experiencia previa dominar su teléfono inteligente para trámites, comunicación y educación sin depender de terceros.',
    'Equipo Conectando Caminos - URL', 'Smartphone'
  ),
  (
    '22222222-2222-4222-8222-222222222202', 1,
    'Manejo Seguro de Aplicaciones de Mensajería y Videollamadas',
    'Google Actívate / YouTube Edu',
    'https://grow.google/intl/es/courses-and-tools/',
    '4 horas', 'Básico', TRUE,
    'Tutorial práctico para configurar WhatsApp, Telegram y Google Meet: cómo crear grupos familiares seguros, enviar ubicación en tiempo real y hacer videollamadas con bajo consumo de datos.',
    'Esencial para mantener la comunicación familiar constante y económica durante cualquier trayecto o desde el exterior.',
    'Departamento de Orientación ENRO', 'MessageCircle'
  ),
  (
    '22222222-2222-4222-8222-222222222203', 2,
    'Ciberseguridad Ciudadana: Prevención de Fraudes y Protección de Datos',
    'Cisco Networking Academy (SkillsForAll)',
    'https://skillsforall.com/course/introduction-to-cybersecurity?courseLang=es-XL',
    '6 horas', 'Todos los niveles', TRUE,
    'Aprende a reconocer enlaces engañosos (phishing), proteger contraseñas bancarias, activar la verificación en dos pasos y evitar el robo de identidad digital.',
    'La población migrante y sus familias son blanco frecuente de estafas digitales y extorsiones; este curso brinda escudos de protección real.',
    'Facultad de Ingeniería URL', 'ShieldCheck'
  ),
  (
    '22222222-2222-4222-8222-222222222204', 2,
    'Protección de tu Privacidad y Celular en Movilidad Humana',
    'Front Line Defenders & Security First (Umbrella App)',
    'https://secfirst.org/es/',
    'Guía interactiva (3 horas)', 'Básico', TRUE,
    'Guía paso a paso sobre cómo bloquear tu dispositivo con huella/PIN, cifrar tus chats, borrar datos de forma remota en caso de robo y navegar en modo privado.',
    'Evita que extraños o delincuentes accedan a las fotos, contactos y cuentas bancarias familiares guardadas en el teléfono.',
    'Conectando Caminos', 'Lock'
  ),
  (
    '22222222-2222-4222-8222-222222222205', 3,
    'Guía para Navegar Portales Oficiales de Migración e Identidad (IGM y RENAP)',
    'Portal Oficial IGM Guatemala',
    'https://igm.gob.gt',
    'Guía multimedia (2 horas)', 'Básico', TRUE,
    'Aprende a verificar páginas oficiales terminadas en .gob.gt, generar citas de pasaporte en línea, solicitar certificados de nacimiento en RENAP y consultar el estatus de trámites sin pagar intermediarios.',
    'Muchos tramitadores ilegales cobran cifras excesivas por citas que son gratuitas y oficiales ante el gobierno guatemalteco.',
    'Estudiantes Ética Aplicada URL', 'FileCheck'
  ),
  (
    '22222222-2222-4222-8222-222222222206', 3,
    'Rutas de Retorno Seguro y Servicios de Apoyo Institucional',
    'OIM Guatemala / Plan Retorno al Hogar',
    'https://guatemala.iom.int',
    'Módulo informativo interactivo', 'Todos los niveles', TRUE,
    'Conoce los programas de acogida, asistencia humanitaria, casas de acogida de la Pastoral de Movilidad Humana y opciones de reintegración productiva.',
    'Ofrece a personas retornadas un mapa claro de organizaciones humanitarias que brindan asistencia gratuita y legal.',
    'Red Pastoral de Movilidad Humana', 'Globe'
  ),
  (
    '22222222-2222-4222-8222-222222222207', 4,
    'Creación de Currículum Vitae Digital de Alto Impacto con Canva',
    'Canva Design School / YouTube Tutoriales',
    'https://www.canva.com/es_419/crear/curriculum-vitae/',
    '3 horas', 'Básico', TRUE,
    'Aprende a diseñar tu hoja de vida desde el celular o computadora con plantillas profesionales, exportarlo en formato PDF y redactar tus logros y habilidades prácticas.',
    'Un CV bien presentado en formato digital multiplica las probabilidades de conseguir entrevistas laborales formales en Guatemala o el extranjero.',
    'Equipo Conectando Caminos', 'Briefcase'
  ),
  (
    '22222222-2222-4222-8222-222222222208', 4,
    'Búsqueda Activa de Empleo en Portales Digitales y Entrevistas Virtuales',
    'Capacítate para el Empleo',
    'https://capacitateparaelempleo.org',
    '8 horas', 'Todos los niveles', TRUE,
    'Cómo registrarse en portales confiables como Transdoc, Computrabajo y LinkedIn, postularse con seguridad, preparar entrevistas por Zoom/Meet y evitar ofertas fraudulentas.',
    'Facilita la reinserción laboral de jóvenes y personas retornadas en el mercado laboral formal guatemalteco.',
    'Comunidad Estudiantil ENRO', 'UserCheck'
  )
ON CONFLICT (id) DO NOTHING;

DELETE FROM public.course_tags WHERE course_id IN (
  '22222222-2222-4222-8222-222222222201',
  '22222222-2222-4222-8222-222222222202',
  '22222222-2222-4222-8222-222222222203',
  '22222222-2222-4222-8222-222222222204',
  '22222222-2222-4222-8222-222222222205',
  '22222222-2222-4222-8222-222222222206',
  '22222222-2222-4222-8222-222222222207',
  '22222222-2222-4222-8222-222222222208'
);

INSERT INTO public.course_tags (course_id, tag_name) VALUES
  ('22222222-2222-4222-8222-222222222201', 'Internet'),
  ('22222222-2222-4222-8222-222222222201', 'Correo'),
  ('22222222-2222-4222-8222-222222222201', 'Google'),
  ('22222222-2222-4222-8222-222222222201', 'Smartphone'),
  ('22222222-2222-4222-8222-222222222201', 'Gratis con Certificado'),
  ('22222222-2222-4222-8222-222222222202', 'WhatsApp'),
  ('22222222-2222-4222-8222-222222222202', 'Videollamadas'),
  ('22222222-2222-4222-8222-222222222202', 'Ahorro de Datos'),
  ('22222222-2222-4222-8222-222222222202', 'Familia'),
  ('22222222-2222-4222-8222-222222222203', 'Antifraude'),
  ('22222222-2222-4222-8222-222222222203', 'Contraseñas Seguras'),
  ('22222222-2222-4222-8222-222222222203', 'Privacidad'),
  ('22222222-2222-4222-8222-222222222203', '2FA'),
  ('22222222-2222-4222-8222-222222222204', 'Cifrado'),
  ('22222222-2222-4222-8222-222222222204', 'Seguridad Móvil'),
  ('22222222-2222-4222-8222-222222222204', 'Ubicación Privada'),
  ('22222222-2222-4222-8222-222222222204', 'Copia de Seguridad'),
  ('22222222-2222-4222-8222-222222222205', 'IGM'),
  ('22222222-2222-4222-8222-222222222205', 'Pasaportes'),
  ('22222222-2222-4222-8222-222222222205', 'RENAP'),
  ('22222222-2222-4222-8222-222222222205', 'Citas Oficiales'),
  ('22222222-2222-4222-8222-222222222205', 'Trámites Seguros'),
  ('22222222-2222-4222-8222-222222222206', 'OIM'),
  ('22222222-2222-4222-8222-222222222206', 'Retorno al Hogar'),
  ('22222222-2222-4222-8222-222222222206', 'Casas del Migrante'),
  ('22222222-2222-4222-8222-222222222206', 'Derechos Humanos'),
  ('22222222-2222-4222-8222-222222222207', 'Canva'),
  ('22222222-2222-4222-8222-222222222207', 'CV Digital'),
  ('22222222-2222-4222-8222-222222222207', 'PDF'),
  ('22222222-2222-4222-8222-222222222207', 'Búsqueda de Empleo'),
  ('22222222-2222-4222-8222-222222222208', 'Transdoc'),
  ('22222222-2222-4222-8222-222222222208', 'LinkedIn'),
  ('22222222-2222-4222-8222-222222222208', 'Entrevistas Virtuales'),
  ('22222222-2222-4222-8222-222222222208', 'Empleo Formal');

-- 10.5 Preguntas del Pre-Test y Post-Test
INSERT INTO public.test_questions (id, category, question_text, question_order, is_active) VALUES
  (1, 'seguridad', 'Si recibes un mensaje por WhatsApp diciendo que ganaste un bono económico de una entidad extranjera y te piden que abras un enlace e ingreses tus datos personales y número de DPI, ¿qué debes hacer?', 1, TRUE),
  (2, 'fuentes_oficiales', '¿Cómo puedes identificar en internet que una página web pertenece realmente al Gobierno de Guatemala y no es un sitio falso creado por estafadores?', 2, TRUE),
  (3, 'datos_personales', '¿Cuál es la forma más segura de guardar y proteger tus documentos de identificación (DPI, partida de nacimiento, pasaporte) en tu teléfono?', 3, TRUE),
  (4, 'tramites', 'Si alguien en internet o en persona te ofrece una cita de pasaporte o una visa de trabajo garantizada a cambio de un ''depósito anticipado en cuenta particular'', ¿qué debes saber?', 4, TRUE),
  (5, 'seguridad', '¿Qué medida familiar de seguridad digital previene caer en estafas o extorsiones telefónicas donde fingen que un familiar está en peligro?', 5, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.test_options (question_id, option_code, option_text, is_correct, explanation) VALUES
  (1, '1a', 'Abrir el enlace de inmediato para reclamar el dinero antes de que venza.', FALSE, 'Incorrecto. Este es el método clásico de estafa (phishing). Las entidades legítimas no regalan dinero por WhatsApp ni piden datos bancarios o DPI por enlaces desconocidos.'),
  (1, '1b', 'Desconfiar, no abrir el enlace, no proporcionar ningún dato personal y verificar con fuentes oficiales o bloquear el remitente.', TRUE, '¡Correcto! Nunca debes abrir enlaces sospechosos ni ingresar documentos de identidad en páginas no verificadas.'),
  (1, '1c', 'Reenviar el mensaje a todos tus grupos familiares para preguntar si a ellos también les llegó.', FALSE, 'Incorrecto. Reenviar mensajes falsos propaga la desinformación y pone en riesgo a tus familiares y contactos.'),
  (2, '2a', 'Porque tiene el logo de Guatemala en una foto y muchas banderas.', FALSE, 'Incorrecto. Cualquier estafador puede descargar logotipos e imágenes patrias y pegarlas en su sitio falso.'),
  (2, '2b', 'Porque la dirección web oficial termina en el dominio gubernamental ''.gob.gt'' (por ejemplo igm.gob.gt) y cuenta con candado de seguridad (HTTPS).', TRUE, '¡Correcto! Los dominios gubernamentales auténticos en Guatemala terminan siempre en ''.gob.gt'' y garantizan que estás en la institución legítima.'),
  (2, '2c', 'Porque aparece en el primer video de TikTok que viste.', FALSE, 'Incorrecto. Las redes sociales no son fuentes oficiales; proliferan cuentas falsas que cobran por citas gratuitas.'),
  (3, '3a', 'Tener fotos claras en la galería y compartirlas en publicaciones abiertas de Facebook o estados públicos.', FALSE, 'Incorrecto. Exponer documentos personales públicamente te vuelve blanco fácil de robo de identidad y fraudes.'),
  (3, '3b', 'Anotar tu número de DPI y contraseñas en un papel pegado detrás del teléfono.', FALSE, 'Incorrecto. Si te extravían o roban el celular, perderás el control de toda tu información y cuentas.'),
  (3, '3c', 'Guardar copias digitales escaneadas en una cuenta privada en la nube (como Google Drive o iCloud) protegida con contraseña robusta y verificación en dos pasos (2FA).', TRUE, '¡Correcto! El almacenamiento en la nube cifrado con doble factor de autenticación te permite recuperar tus documentos desde cualquier dispositivo seguro si pierdes tu celular.'),
  (4, '4a', 'Las citas en el Instituto Guatemalteco de Migración (IGM) son GRATUITAS en su página web y ninguna visa oficial se compra con depósitos a cuentas personales particulares.', TRUE, '¡Correcto! Los cobros por ''agilizar citas'' son ilegales o estafas. Los pagos oficiales de aranceles se realizan en bancos autorizados con boleta oficial a nombre de la institución.'),
  (4, '4b', 'Que es normal y que conviene pagar para no esperar en la fila.', FALSE, 'Incorrecto. Pagar a tramitadores clandestinos fomenta el fraude, corres riesgo de recibir documentos falsos o perder tu dinero por completo.'),
  (4, '4c', 'Que si te muestran una foto de un carnet firmado, ya es totalmente confiable.', FALSE, 'Incorrecto. Los estafadores falsifican fácilmente credenciales, fotos y sellos en herramientas de edición.'),
  (5, '5a', 'Depositar de inmediato lo que solicitan por si acaso fuera verdad.', FALSE, 'Incorrecto. Los extorsionadores juegan con el miedo y la urgencia; nunca se debe transferir dinero de forma impulsiva.'),
  (5, '5b', 'Establecer una ''Palabra o Clave Secreta Familiar'' y comunicarse de forma directa por el número privado habitual del familiar antes de tomar cualquier decisión.', TRUE, '¡Correcto! Una palabra clave acordada previamente en el núcleo familiar permite verificar al instante si la emergencia es auténtica o un engaño de delincuentes.'),
  (5, '5c', 'Publicar en Facebook el número del que te llamaron preguntando qué hacer.', FALSE, 'Incorrecto. Esto puede alertar a los delincuentes o exponer más datos personales de tu familia.')
ON CONFLICT (question_id, option_code) DO NOTHING;

-- 10.6 Escenarios del Simulador de Phishing
INSERT INTO public.phishing_scenarios (
  id, channel_type, sender, message_content, is_scam, explanation, safe_action, scenario_order
) VALUES
  (
    '33333333-3333-4333-8333-333333333301', 'whatsapp',
    '+502 4492-XXXX (Foto del Logo del Gobierno)',
    '¡Felicidades! Ha sido preseleccionado por el Programa de Ayuda Humanitaria 2026 para recibir un apoyo mensual de Q3,500. Para cobrar hoy mismo, ingrese a: http://bono-guatemala-ayuda2026.free-site.biz/reclamo e ingrese su DPI y número de cuenta bancaria. Cupos limitados, vence en 2 horas.',
    TRUE,
    'Este es un intento típico de Phishing y robo de identidad. El Gobierno de Guatemala nunca distribuye subsidios a través de enlaces informales de dominios gratuitos ni pide datos bancarios por WhatsApp.',
    'No abras el enlace, bloquea el número de WhatsApp y reporta el mensaje como spam.',
    1
  ),
  (
    '33333333-3333-4333-8333-333333333302', 'sms',
    'IGM_OFICIAL',
    'Estimado usuario: Le recordamos su cita programada para emisión de pasaporte en la Delegación Quetzaltenango para el 24/09/2026 a las 09:30 AM. Recuerde presentar su constancia impresa y DPI original. Información oficial en https://igm.gob.gt.',
    FALSE,
    'Este es un mensaje informativo y legítimo. No te pide transferir dinero a ninguna cuenta particular ni te solicita ingresar tus claves personales.',
    'Verifica tu boleta oficial y acude a tu cita en la fecha y hora indicadas con tus documentos originales.',
    2
  ),
  (
    '33333333-3333-4333-8333-333333333303', 'whatsapp',
    '+1 (915) 304-XXXX (Grupo de Facebook: ''Viajes Seguros al Norte'')',
    'Amigo, tenemos cupos abiertos para viaje terrestre 100% garantizado con guía de confianza. Salida este viernes. Solo debes depositar un adelanto de Q1,500 por Western Union a nombre de ''Juan Pérez'' para apartar tu lugar en la camioneta. ¡No dejes pasar esta oportunidad única!',
    TRUE,
    'Es una estafa de tráfico ilícito de personas. En cuanto la persona deposita el dinero, el supuesto ''guía'' bloquea el número de teléfono o pone en riesgo extremo la vida de las personas.',
    'Jamás deposites dinero a desconocidos y denuncia ante el Ministerio Público (MP) o la PNC al 110.',
    3
  ),
  (
    '33333333-3333-4333-8333-333333333304', 'email',
    'soporte@seguridad-google-cuentas-alert.com',
    'Alerta de Seguridad: Su cuenta de Google Drive ha sido bloqueada temporalmente por actividad sospechosa. Haga clic en el botón inferior para ingresar su usuario y contraseña antes de 24 horas para evitar la pérdida permanente de sus fotos y archivos.',
    TRUE,
    'Los ciberdelincuentes intentan robarte el acceso a tu cuenta de Google donde guardas copias de tus documentos de identidad y contactos familiares.',
    'Ignora el correo y revisa tu estado de seguridad directamente ingresando desde la aplicación oficial de Google en tu teléfono (Ajustes > Cuenta Google > Seguridad).',
    4
  )
ON CONFLICT (id) DO NOTHING;

DELETE FROM public.phishing_red_flags WHERE scenario_id IN (
  '33333333-3333-4333-8333-333333333301',
  '33333333-3333-4333-8333-333333333302',
  '33333333-3333-4333-8333-333333333303',
  '33333333-3333-4333-8333-333333333304'
);

INSERT INTO public.phishing_red_flags (scenario_id, flag_text, flag_order) VALUES
  ('33333333-3333-4333-8333-333333333301', 'Urgencia artificial (''vence en 2 horas'') para que actúes sin pensar.', 1),
  ('33333333-3333-4333-8333-333333333301', 'Enlace no oficial (termina en .free-site.biz en lugar de .gob.gt).', 2),
  ('33333333-3333-4333-8333-333333333301', 'Solicitud de DPI y datos bancarios directos por WhatsApp.', 3),
  ('33333333-3333-4333-8333-333333333301', 'Número telefónico común y no una cuenta corporativa verificada.', 4),
  ('33333333-3333-4333-8333-333333333302', 'No solicita contraseñas ni depósitos a cuentas de particulares.', 1),
  ('33333333-3333-4333-8333-333333333302', 'La dirección web proporcionada es el dominio oficial del estado guatemalteco (.gob.gt).', 2),
  ('33333333-3333-4333-8333-333333333303', 'Promesa de ''viaje 100% garantizado'' (los traficantes de personas engañan a las víctimas).', 1),
  ('33333333-3333-4333-8333-333333333303', 'Exigencia de depósito a nombre de una persona particular por giros rápidos.', 2),
  ('33333333-3333-4333-8333-333333333303', 'Uso de redes sociales informales para coordinar traslados ilegales.', 3),
  ('33333333-3333-4333-8333-333333333304', 'El correo del remitente no es de @google.com (es un dominio falso de terceros).', 1),
  ('33333333-3333-4333-8333-333333333304', 'Amenaza con borrar tus fotos y documentos si no actúas de inmediato.', 2),
  ('33333333-3333-4333-8333-333333333304', 'Pide ingresar contraseñas en una página externa.', 3);

-- 10.7 Directorio Humanitario y Fuentes Oficiales
INSERT INTO public.directory_items (
  id, name, org_type, description, phone, emergency_phone, address, department_or_region, latitude, longitude, website_url, is_official, free_services_note
) VALUES
  (
    '44444444-4444-4444-8444-444444444401',
    'Instituto Guatemalteco de Migración (IGM)',
    'Oficial Gubernamental',
    'Institución estatal rectora de las políticas migratorias y emisión de documentos de viaje (pasaportes, visas y control fronterizo) en Guatemala.',
    '(+502) 2411-2411',
    '1572 (Línea de Denuncias y Ayuda Migratoria)',
    '6ª Avenida 3-11, Zona 4, Ciudad de Guatemala (Sede Central). Delegación Quetzaltenango: Centro de Emisión de Pasaportes, Centro Comercial San Nicolás, Zona 3.',
    'Guatemala / Quetzaltenango / Todo el País',
    14.834700, -91.518000,
    'https://igm.gob.gt',
    TRUE,
    'Las citas para pasaporte en el sitio web son 100% GRATUITAS. No pague a tramitadores.'
  ),
  (
    '44444444-4444-4444-8444-444444444402',
    'Plan Retorno al Hogar (Gobierno de Guatemala)',
    'Oficial Gubernamental',
    'Programa de asistencia social y dignificación para connacionales retornados, facilitando transporte, alimentación y vinculación laboral.',
    '(+502) 2414-3535',
    NULL,
    'Centro de Recepción de Retornados, Fuerza Aérea Guatemalteca / Ayutla (San Marcos)',
    'Ciudad de Guatemala / Tecún Umán',
    14.588900, -90.526900,
    'https://guatemala.gob.gt/plan-retorno-al-hogar/',
    TRUE,
    'Todos los servicios del Plan Retorno al Hogar son completamente gratuitos.'
  ),
  (
    '44444444-4444-4444-8444-444444444403',
    'Casa del Migrante Quetzaltenango (Pastoral de Movilidad Humana)',
    'Albergue / Casa del Migrante',
    'Espacio eclesial y humanitario de acogida temporal, alimentación, atención médica básica y apoyo psicosocial a migrantes y personas retornadas en el occidente del país.',
    '(+502) 7761-4115',
    '(+502) 5555-1234',
    'Zona 1, Quetzaltenango (Xela), Guatemala',
    'Quetzaltenango (Occidente)',
    14.833300, -91.516700,
    'https://movilidadhumana.com/casas-para-migrantes-iglesia-de-guatemala/',
    TRUE,
    'La estadía, alimentación y auxilio son 100% humanitarios y sin costo.'
  ),
  (
    '44444444-4444-4444-8444-444444444404',
    'Casa del Migrante Tecún Umán (San Marcos)',
    'Albergue / Casa del Migrante',
    'Punto de auxilio vital y refugio en la frontera occidental entre Guatemala y México, atendiendo a personas en tránsito y solicitantes de protección.',
    '(+502) 7776-8344',
    NULL,
    'Ayutla, Tecún Umán, San Marcos, Guatemala',
    'San Marcos / Frontera México',
    14.676900, -92.142200,
    'https://movilidadhumana.com',
    TRUE,
    'Atención gratuita sin discriminación por nacionalidad o estatus.'
  ),
  (
    '44444444-4444-4444-8444-444444444405',
    'Organización Internacional para las Migraciones (OIM Guatemala)',
    'Organismo Internacional',
    'Agencia de las Naciones Unidas dedicada a promover la migración humana y ordenada para el beneficio de todos, con programas de reintegración sostenible.',
    '(+502) 2414-7400',
    '1801-466-4828',
    'Avenida Las Américas, Zona 13, Ciudad de Guatemala',
    'Guatemala / Cobertura Nacional',
    14.590000, -90.520000,
    'https://guatemala.iom.int',
    TRUE,
    'La OIM no cobra honorarios por sus programas ni por información de orientación.'
  ),
  (
    '44444444-4444-4444-8444-444444444406',
    'Escuela Normal Rural de Occidente ''Guillermo Ovando Arriola'' (ENRO)',
    'Educación / Comunidad',
    'Centro educativo de formación docente en Quetzaltenango y aliado clave en alfabetización digital para estudiantes y familias vinculadas a la movilidad humana.',
    '(+502) 7763-1200',
    NULL,
    'Totonicapán / Quetzaltenango, Guatemala',
    'Occidente de Guatemala',
    14.880000, -91.450000,
    '#',
    TRUE,
    'Espacio escolar público de acompañamiento formativo e integral.'
  )
ON CONFLICT (id) DO NOTHING;

DELETE FROM public.directory_services WHERE directory_item_id IN (
  '44444444-4444-4444-8444-444444444401',
  '44444444-4444-4444-8444-444444444402',
  '44444444-4444-4444-8444-444444444403',
  '44444444-4444-4444-8444-444444444404',
  '44444444-4444-4444-8444-444444444405',
  '44444444-4444-4444-8444-444444444406'
);

INSERT INTO public.directory_services (directory_item_id, service_name) VALUES
  ('44444444-4444-4444-8444-444444444401', 'Emisión y renovación de pasaportes guatemaltecos'),
  ('44444444-4444-4444-8444-444444444401', 'Control de estatus migratorio oficial'),
  ('44444444-4444-4444-8444-444444444401', 'Atención y recepción de personas migrantes guatemaltecas retornadas'),
  ('44444444-4444-4444-8444-444444444401', 'Información sobre requisitos de viaje y regularización'),
  ('44444444-4444-4444-8444-444444444402', 'Recepción y bienvenida humanitaria en centros de retorno'),
  ('44444444-4444-4444-8444-444444444402', 'Kits de higiene y alimentación básica'),
  ('44444444-4444-4444-8444-444444444402', 'Llamadas telefónicas gratuitas a familiares'),
  ('44444444-4444-4444-8444-444444444402', 'Orientación para el traslado seguro a sus comunidades de origen'),
  ('44444444-4444-4444-8444-444444444403', 'Albergue temporal seguro y descanso'),
  ('44444444-4444-4444-8444-444444444403', 'Alimentación y agua potable'),
  ('44444444-4444-4444-8444-444444444403', 'Primeros auxilios médicos y medicinas básicas'),
  ('44444444-4444-4444-8444-444444444403', 'Llamadas internacionales y acceso a internet seguro para contacto familiar'),
  ('44444444-4444-4444-8444-444444444403', 'Acompañamiento psicológico y asesoría legal humanitaria'),
  ('44444444-4444-4444-8444-444444444404', 'Alojamiento de emergencia'),
  ('44444444-4444-4444-8444-444444444404', 'Alimentación y aseo personal'),
  ('44444444-4444-4444-8444-444444444404', 'Orientación sobre derechos humanos y prevención de trata'),
  ('44444444-4444-4444-8444-444444444404', 'Canalización médica y recarga de dispositivos celulares'),
  ('44444444-4444-4444-8444-444444444405', 'Asistencia para la reintegración económica y formación técnica'),
  ('44444444-4444-4444-8444-444444444405', 'Información verificada sobre migración laboral regular y visas H-2'),
  ('44444444-4444-4444-8444-444444444405', 'Lucha contra la trata de personas y el tráfico ilícito de migrantes'),
  ('44444444-4444-4444-8444-444444444405', 'Línea de información gratuita sobre trámites'),
  ('44444444-4444-4444-8444-444444444406', 'Departamento de Orientación y Acompañamiento Estudiantil'),
  ('44444444-4444-4444-8444-444444444406', 'Talleres de alfabetización y seguridad digital para jóvenes y familias'),
  ('44444444-4444-4444-8444-444444444406', 'Espacio comunitario de apoyo y prevención del riesgo migratorio');
