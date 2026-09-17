import { PhishingScenario } from "@/types";

export const PHISHING_SCENARIOS: PhishingScenario[] = [
  {
    id: "scam-1",
    type: "whatsapp",
    sender: "+502 4492-XXXX (Foto del Logo del Gobierno)",
    content: "¡Felicidades! Ha sido preseleccionado por el Programa de Ayuda Humanitaria 2026 para recibir un apoyo mensual de Q3,500. Para cobrar hoy mismo, ingrese a: http://bono-guatemala-ayuda2026.free-site.biz/reclamo e ingrese su DPI y número de cuenta bancaria. Cupos limitados, vence en 2 horas.",
    isScam: true,
    redFlags: [
      "Urgencia artificial ('vence en 2 horas') para que actúes sin pensar.",
      "Enlace no oficial (termina en .free-site.biz en lugar de .gob.gt).",
      "Solicitud de DPI y datos bancarios directos por WhatsApp.",
      "Número telefónico común y no una cuenta corporativa verificada."
    ],
    explanation: "Este es un intento típico de Phishing y robo de identidad. El Gobierno de Guatemala nunca distribuye subsidios a través de enlaces informales de dominios gratuitos ni pide datos bancarios por WhatsApp.",
    safeAction: "No abras el enlace, bloquea el número de WhatsApp y reporta el mensaje como spam."
  },
  {
    id: "scam-2",
    type: "sms",
    sender: "IGM_OFICIAL",
    content: "Estimado usuario: Le recordamos su cita programada para emisión de pasaporte en la Delegación Quetzaltenango para el 24/09/2026 a las 09:30 AM. Recuerde presentar su constancia impresa y DPI original. Información oficial en https://igm.gob.gt.",
    isScam: false,
    redFlags: [
      "No solicita contraseñas ni depósitos a cuentas de particulares.",
      "La dirección web proporcionada es el dominio oficial del estado guatemalteco (.gob.gt)."
    ],
    explanation: "Este es un mensaje informativo y legítimo. No te pide transferir dinero a ninguna cuenta particular ni te solicita ingresar tus claves personales.",
    safeAction: "Verifica tu boleta oficial y acude a tu cita en la fecha y hora indicadas con tus documentos originales."
  },
  {
    id: "scam-3",
    type: "whatsapp",
    sender: "+1 (915) 304-XXXX (Grupo de Facebook: 'Viajes Seguros al Norte')",
    content: "Amigo, tenemos cupos abiertos para viaje terrestre 100% garantizado con guía de confianza. Salida este viernes. Solo debes depositar un adelanto de Q1,500 por Western Union a nombre de 'Juan Pérez' para apartar tu lugar en la camioneta. ¡No dejes pasar esta oportunidad única!",
    isScam: true,
    redFlags: [
      "Promesa de 'viaje 100% garantizado' (los traficantes de personas engañan a las víctimas).",
      "Exigencia de depósito a nombre de una persona particular por giros rápidos.",
      "Uso de redes sociales informales para coordinar traslados ilegales."
    ],
    explanation: "Es una estafa de tráfico ilícito de personas. En cuanto la persona deposita el dinero, el supuesto 'guía' bloquea el número de teléfono o pone en riesgo extremo la vida de las personas.",
    safeAction: "Jamás deposites dinero a desconocidos y denuncia ante el Ministerio Público (MP) o la PNC al 110."
  },
  {
    id: "scam-4",
    type: "email",
    sender: "soporte@seguridad-google-cuentas-alert.com",
    content: "Alerta de Seguridad: Su cuenta de Google Drive ha sido bloqueada temporalmente por actividad sospechosa. Haga clic en el botón inferior para ingresar su usuario y contraseña antes de 24 horas para evitar la pérdida permanente de sus fotos y archivos.",
    isScam: true,
    redFlags: [
      "El correo del remitente no es de @google.com (es un dominio falso de terceros).",
      "Amenaza con borrar tus fotos y documentos si no actúas de inmediato.",
      "Pide ingresar contraseñas en una página externa."
    ],
    explanation: "Los ciberdelincuentes intentan robarte el acceso a tu cuenta de Google donde guardas copias de tus documentos de identidad y contactos familiares.",
    safeAction: "Ignora el correo y revisa tu estado de seguridad directamente ingresando desde la aplicación oficial de Google en tu teléfono (Ajustes > Cuenta Google > Seguridad)."
  }
];
