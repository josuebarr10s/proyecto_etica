import { TestQuestion } from "@/types";

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    category: "seguridad",
    question: "Si recibes un mensaje por WhatsApp diciendo que ganaste un bono económico de una entidad extranjera y te piden que abras un enlace e ingreses tus datos personales y número de DPI, ¿qué debes hacer?",
    options: [
      {
        id: "1a",
        text: "Abrir el enlace de inmediato para reclamar el dinero antes de que venza.",
        isCorrect: false,
        explanation: "Incorrecto. Este es el método clásico de estafa (phishing). Las entidades legítimas no regalan dinero por WhatsApp ni piden datos bancarios o DPI por enlaces desconocidos."
      },
      {
        id: "1b",
        text: "Desconfiar, no abrir el enlace, no proporcionar ningún dato personal y verificar con fuentes oficiales o bloquear el remitente.",
        isCorrect: true,
        explanation: "¡Correcto! Nunca debes abrir enlaces sospechosos ni ingresar documentos de identidad en páginas no verificadas."
      },
      {
        id: "1c",
        text: "Reenviar el mensaje a todos tus grupos familiares para preguntar si a ellos también les llegó.",
        isCorrect: false,
        explanation: "Incorrecto. Reenviar mensajes falsos propaga la desinformación y pone en riesgo a tus familiares y contactos."
      }
    ]
  },
  {
    id: 2,
    category: "fuentes_oficiales",
    question: "¿Cómo puedes identificar en internet que una página web pertenece realmente al Gobierno de Guatemala y no es un sitio falso creado por estafadores?",
    options: [
      {
        id: "2a",
        text: "Porque tiene el logo de Guatemala en una foto y muchas banderas.",
        isCorrect: false,
        explanation: "Incorrecto. Cualquier estafador puede descargar logotipos e imágenes patrias y pegarlas en su sitio falso."
      },
      {
        id: "2b",
        text: "Porque la dirección web oficial termina en el dominio gubernamental '.gob.gt' (por ejemplo igm.gob.gt) y cuenta con candado de seguridad (HTTPS).",
        isCorrect: true,
        explanation: "¡Correcto! Los dominios gubernamentales auténticos en Guatemala terminan siempre en '.gob.gt' y garantizan que estás en la institución legítima."
      },
      {
        id: "2c",
        text: "Porque aparece en el primer video de TikTok que viste.",
        isCorrect: false,
        explanation: "Incorrecto. Las redes sociales no son fuentes oficiales; proliferan cuentas falsas que cobran por citas gratuitas."
      }
    ]
  },
  {
    id: 3,
    category: "datos_personales",
    question: "¿Cuál es la forma más segura de guardar y proteger tus documentos de identificación (DPI, partida de nacimiento, pasaporte) en tu teléfono?",
    options: [
      {
        id: "3a",
        text: "Tener fotos claras en la galería y compartirlas en publicaciones abiertas de Facebook o estados públicos.",
        isCorrect: false,
        explanation: "Incorrecto. Exponer documentos personales públicamente te vuelve blanco fácil de robo de identidad y fraudes."
      },
      {
        id: "3b",
        text: "Anotar tu número de DPI y contraseñas en un papel pegado detrás del teléfono.",
        isCorrect: false,
        explanation: "Incorrecto. Si te extravían o roban el celular, perderás el control de toda tu información y cuentas."
      },
      {
        id: "3c",
        text: "Guardar copias digitales escaneadas en una cuenta privada en la nube (como Google Drive o iCloud) protegida con contraseña robusta y verificación en dos pasos (2FA).",
        isCorrect: true,
        explanation: "¡Correcto! El almacenamiento en la nube cifrado con doble factor de autenticación te permite recuperar tus documentos desde cualquier dispositivo seguro si pierdes tu celular."
      }
    ]
  },
  {
    id: 4,
    category: "tramites",
    question: "Si alguien en internet o en persona te ofrece una cita de pasaporte o una visa de trabajo garantizada a cambio de un 'depósito anticipado en cuenta particular', ¿qué debes saber?",
    options: [
      {
        id: "4a",
        text: "Las citas en el Instituto Guatemalteco de Migración (IGM) son GRATUITAS en su página web y ninguna visa oficial se compra con depósitos a cuentas personales particulares.",
        isCorrect: true,
        explanation: "¡Correcto! Los cobros por 'agilizar citas' son ilegales o estafas. Los pagos oficiales de aranceles se realizan en bancos autorizados con boleta oficial a nombre de la institución."
      },
      {
        id: "4b",
        text: "Que es normal y que conviene pagar para no esperar en la fila.",
        isCorrect: false,
        explanation: "Incorrecto. Pagar a tramitadores clandestinos fomenta el fraude, corres riesgo de recibir documentos falsos o perder tu dinero por completo."
      },
      {
        id: "4c",
        text: "Que si te muestran una foto de un carnet firmado, ya es totalmente confiable.",
        isCorrect: false,
        explanation: "Incorrecto. Los estafadores falsifican fácilmente credenciales, fotos y sellos en herramientas de edición."
      }
    ]
  },
  {
    id: 5,
    category: "seguridad",
    question: "¿Qué medida familiar de seguridad digital previene caer en estafas o extorsiones telefónicas donde fingen que un familiar está en peligro?",
    options: [
      {
        id: "5a",
        text: "Depositar de inmediato lo que solicitan por si acaso fuera verdad.",
        isCorrect: false,
        explanation: "Incorrecto. Los extorsionadores juegan con el miedo y la urgencia; nunca se debe transferir dinero de forma impulsiva."
      },
      {
        id: "5b",
        text: "Establecer una 'Palabra o Clave Secreta Familiar' y comunicarse de forma directa por el número privado habitual del familiar antes de tomar cualquier decisión.",
        isCorrect: true,
        explanation: "¡Correcto! Una palabra clave acordada previamente en el núcleo familiar permite verificar al instante si la emergencia es auténtica o un engaño de delincuentes."
      },
      {
        id: "5c",
        text: "Publicar en Facebook el número del que te llamaron preguntando qué hacer.",
        isCorrect: false,
        explanation: "Incorrecto. Esto puede alertar a los delincuentes o exponer más datos personales de tu familia."
      }
    ]
  }
];
