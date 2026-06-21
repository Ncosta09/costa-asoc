export type FaqItem = {
  question: string;
  answer: string;
};

// FAQ de la página de Servicios (optimizada para featured snippets / PAA).
export const servicesFaq: FaqItem[] = [
  {
    question: "¿Qué incluye la administración de un consorcio?",
    answer:
      "Incluye la liquidación mensual de expensas, el control financiero y presupuestario, la supervisión del personal del edificio, la coordinación de reparaciones y obras, la convocatoria y asistencia a asambleas y una guardia para emergencias edilicias. En Costa & Asociados todo esto lo lleva un estudio contable matriculado.",
  },
  {
    question: "¿Las cuentas bancarias quedan a nombre del consorcio?",
    answer:
      "Sí. Cada edificio que administramos opera con una cuenta bancaria propia, a nombre del consorcio y con su CUIT. Nunca se mezclan fondos con otros consorcios ni con el estudio, lo que permite auditar cada movimiento en cualquier momento.",
  },
  {
    question: "¿Cómo es el cambio desde nuestro administrador actual?",
    answer:
      "El cambio lo decide la asamblea y no interrumpe la operación del edificio si se hace en paralelo. Recibimos la documentación (libros, cuentas, personal, seguros), hacemos un diagnóstico inicial y arrancamos sin que los propietarios perciban cortes. Ofrecemos un período de evaluación sin penalidades.",
  },
  {
    question: "¿Administran edificios corporativos y torres de oficinas?",
    answer:
      "Sí. Administramos tanto consorcios residenciales como torres corporativas y edificios de oficinas en CABA, con el mismo enfoque contable y de transparencia.",
  },
  {
    question: "¿En qué zonas de CABA trabajan?",
    answer:
      "Administramos consorcios en toda la Ciudad Autónoma de Buenos Aires, con foco en zonas como Recoleta, Belgrano y Puerto Madero. Nuestra oficina está en Campana 4710, CABA.",
  },
  {
    question: "¿Cómo solicito una propuesta?",
    answer:
      "Podés solicitar una propuesta sin cargo desde el formulario de contacto. Coordinamos una primera reunión, llevamos un diagnóstico inicial del edificio y presentamos una propuesta a medida, sin compromiso.",
  },
];

// FAQ de la home (subset de dudas de alta frecuencia, también con potencial de snippet).
export const homeFaq: FaqItem[] = [
  {
    question: "¿Qué hace un administrador de consorcios?",
    answer:
      "Un administrador de consorcios gestiona la operación del edificio: liquida las expensas, paga proveedores y al personal, contrata seguros, ejecuta las decisiones de la asamblea y atiende emergencias. En CABA debe estar matriculado en el Registro Público de Administradores (Ley 941) y rendir cuentas documentadas al consejo.",
  },
  {
    question: "¿Por qué elegir un estudio contable para administrar el consorcio?",
    answer:
      "Porque la administración de un consorcio es, en su núcleo, un trabajo contable y financiero. Tener Contadores Públicos matriculados al frente significa control presupuestario real, planificación financiera y protección patrimonial, no solo liquidar expensas.",
  },
  {
    question: "¿Qué significa que las cuentas estén a nombre del consorcio?",
    answer:
      "Significa que el dinero del edificio se maneja en una cuenta bancaria propia del consorcio, no del administrador. Cualquier propietario puede auditar adónde va su plata. Es la base de una administración transparente.",
  },
  {
    question: "¿Atienden emergencias fuera del horario de oficina?",
    answer:
      "Sí. Contamos con una guardia para contingencias edilicias fuera del horario de atención. El contacto es directo, sin call centers: el copropietario siempre tiene a quién llamar.",
  },
];
