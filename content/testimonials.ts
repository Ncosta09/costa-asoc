// Testimonios REALES pendientes (con autorización del consorcio).
// Mientras los valores sean placeholders {{...}}, la sección no se renderiza
// (ver components/home/testimonials.tsx). NO completar con texto inventado.
export const testimonials = [
  {
    quote: "{{TESTIMONIO_1_TEXTO}}",
    author: "{{TESTIMONIO_1_NOMBRE_Y_ROL}}",
    role: "{{TESTIMONIO_1_EDIFICIO_BARRIO}}",
  },
  {
    quote: "{{TESTIMONIO_2_TEXTO}}",
    author: "{{TESTIMONIO_2_NOMBRE_Y_ROL}}",
    role: "{{TESTIMONIO_2_EDIFICIO_BARRIO}}",
  },
  {
    quote: "{{TESTIMONIO_3_TEXTO}}",
    author: "{{TESTIMONIO_3_NOMBRE_Y_ROL}}",
    role: "{{TESTIMONIO_3_EDIFICIO_BARRIO}}",
  },
] as const;

export const hasRealTestimonials = !testimonials.some((t) =>
  t.quote.startsWith("{{"),
);
