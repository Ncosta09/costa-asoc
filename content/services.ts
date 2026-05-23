import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  LineChart,
  Receipt,
  AlertCircle,
  Wrench,
  ShieldAlert,
  ClipboardCheck,
  Building2,
  Users,
  Scale,
  Vote,
  PhoneCall,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  intro: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "gestion-financiera",
    title: "Gestión financiera y contable",
    intro:
      "El núcleo del estudio. Contadores Públicos matriculados al frente del control presupuestario, las liquidaciones y el cumplimiento fiscal del consorcio.",
    services: [
      {
        title: "Liquidación mensual de expensas",
        description:
          "Cálculo, emisión y distribución de expensas conforme a la normativa vigente. Detalle claro por unidad y rubro.",
        icon: Calculator,
      },
      {
        title: "Control financiero y presupuestario",
        description:
          "Planificación anual, seguimiento mensual del presupuesto y proyección de fondos para gastos extraordinarios.",
        icon: LineChart,
      },
      {
        title: "Pago de servicios, impuestos y proveedores",
        description:
          "Gestión integral de pagos: cargas sociales, servicios, impuestos municipales y nacionales, proveedores.",
        icon: Receipt,
      },
      {
        title: "Seguimiento de morosidad",
        description:
          "Reportes mensuales, intimaciones formales y coordinación con asesoría legal cuando corresponde.",
        icon: AlertCircle,
      },
    ],
  },
  {
    slug: "operaciones",
    title: "Operaciones y mantenimiento",
    intro:
      "Coordinación de la operación diaria del edificio: obras, siniestros, proveedores y controles periódicos.",
    services: [
      {
        title: "Coordinación de reparaciones y obras",
        description:
          "Presupuestos, cotejo de proveedores, supervisión de avance y certificación de obras según lineamientos del consejo.",
        icon: Wrench,
      },
      {
        title: "Gestión de siniestros",
        description:
          "Denuncia, seguimiento ante aseguradoras y coordinación de peritajes hasta el cierre del reclamo.",
        icon: ShieldAlert,
      },
      {
        title: "Control y evaluación de proveedores",
        description:
          "Verificación de habilitaciones, seguros y antecedentes. Evaluación continua del cumplimiento.",
        icon: ClipboardCheck,
      },
      {
        title: "Inspecciones periódicas",
        description:
          "Recorridos programados al edificio para detectar necesidades de mantenimiento antes de que escalen.",
        icon: Building2,
      },
    ],
  },
  {
    slug: "rrhh-legales",
    title: "Recursos humanos y legales",
    intro:
      "Administración del personal del edificio y cumplimiento integral de obligaciones laborales, impositivas y normativas.",
    services: [
      {
        title: "Supervisión de personal y liquidación de haberes",
        description:
          "Encargados, suplentes y personal contratado. Liquidación, aportes, recibos y obligaciones sindicales.",
        icon: Users,
      },
      {
        title: "Cumplimiento legal, laboral e impositivo",
        description:
          "Seguimiento de obligaciones ante GCBA, AFIP, ANSES y registros profesionales. Resguardo documental ordenado.",
        icon: Scale,
      },
    ],
  },
  {
    slug: "gobierno",
    title: "Gobierno del consorcio",
    intro:
      "Soporte a las decisiones del consejo y los propietarios. Continuidad operativa frente a contingencias.",
    services: [
      {
        title: "Convocatoria y asistencia a asambleas",
        description:
          "Asambleas ordinarias y extraordinarias: convocatoria formal, asistencia, redacción de actas y seguimiento de resoluciones.",
        icon: Vote,
      },
      {
        title: "Guardia para emergencias",
        description:
          "Atención permanente para contingencias edilicias fuera del horario de oficina. Respuesta inmediata.",
        icon: PhoneCall,
      },
    ],
  },
];

// Subset destacado para preview en home
export const featuredServices: Service[] = [
  serviceCategories[0]!.services[0]!,
  serviceCategories[0]!.services[1]!,
  serviceCategories[2]!.services[0]!,
  serviceCategories[1]!.services[0]!,
  serviceCategories[3]!.services[0]!,
  serviceCategories[3]!.services[1]!,
];
