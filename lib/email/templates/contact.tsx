import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ContactInput } from "@/lib/validations/contact";
import type { Attribution } from "@/lib/attribution-types";
import { describeSource } from "@/lib/attribution-server";
import { roleLabels, buildingTypeLabels } from "@/lib/validations/contact";

type Props = {
  data: ContactInput;
  attribution?: Attribution;
};

export function ContactEmail({ data, attribution = {} }: Props) {
  const previewText = `Consulta de ${data.name} (${data.neighborhood})`;

  // Solo nombre, barrio y un medio de contacto son obligatorios: lo que no se
  // completó se muestra como "Sin dato" para que se vea qué falta preguntar.
  const empty = "Sin dato";
  const fields: Array<[string, string]> = [
    ["Nombre", data.name],
    ["Teléfono", data.phone ?? empty],
    ["Email", data.email ?? empty],
    ["Ubicación", data.neighborhood],
    ["Rol", data.role ? roleLabels[data.role] : empty],
    ["Tipo de edificio", data.buildingType ? buildingTypeLabels[data.buildingType] : empty],
    ["Unidades", data.units !== undefined ? String(data.units) : empty],
    ["Formulario", `/${data.source}`],
  ];

  // De dónde vino el visitante (hidden `attribution` del form, ya saneado).
  const campaign = [attribution.utm_campaign, attribution.utm_source && attribution.utm_medium
    ? `${attribution.utm_source} / ${attribution.utm_medium}`
    : attribution.utm_source]
    .filter(Boolean)
    .join(" · ");
  const origin: Array<[string, string]> = [
    ["Canal", describeSource(attribution)],
    ["Página de entrada", attribution.landing ?? empty],
    ...(campaign ? [["Campaña", campaign] as [string, string]] : []),
    ...(attribution.kw
      ? [["Keyword", attribution.mt ? `${attribution.kw} (${attribution.mt})` : attribution.kw] as [string, string]]
      : []),
  ];

  return (
    <Html lang="es-AR">
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{
          backgroundColor: "#FAFAF7",
          fontFamily:
            "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "32px 0",
          margin: 0,
        }}
      >
        <Container
          style={{
            maxWidth: 560,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 32,
            border: "1px solid #E8E4D9",
          }}
        >
          <Heading
            style={{
              fontSize: 22,
              color: "#0D2D5C",
              margin: "0 0 8px",
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Nueva consulta desde el sitio
          </Heading>
          <Text style={{ color: "#76746E", fontSize: 14, margin: "0 0 24px" }}>
            Costa &amp; Asociados · formulario de contacto
          </Text>

          <Section>
            {fields.map(([label, value]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#8C2518",
                    margin: "0 0 2px",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1A1A1A",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {value}
                </Text>
              </div>
            ))}
          </Section>

          <Hr style={{ margin: "24px 0", borderColor: "#E8E4D9" }} />
          <Text
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#8C2518",
              margin: "0 0 10px",
              fontWeight: 500,
            }}
          >
            Origen
          </Text>
          <Section>
            {origin.map(([label, value]) => (
              <Text key={label} style={{ fontSize: 14, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1.4 }}>
                <span style={{ color: "#76746E" }}>{label}:</span> {value}
              </Text>
            ))}
            {attribution.gclid ? (
              <Text
                style={{
                  fontSize: 11,
                  color: "#76746E",
                  margin: "8px 0 0",
                  lineHeight: 1.4,
                  wordBreak: "break-all",
                }}
              >
                gclid: {attribution.gclid}
              </Text>
            ) : null}
          </Section>

          {data.message ? (
            <>
              <Hr style={{ margin: "24px 0", borderColor: "#E8E4D9" }} />
              <Text
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8C2518",
                  margin: "0 0 6px",
                  fontWeight: 500,
                }}
              >
                Mensaje
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#1A1A1A",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.55,
                }}
              >
                {data.message}
              </Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}
