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
import { roleLabels, buildingTypeLabels } from "@/lib/validations/contact";

type Props = {
  data: ContactInput;
};

export function ContactEmail({ data }: Props) {
  const previewText = `Consulta de ${data.name} — ${roleLabels[data.role]}`;

  const fields: Array<[string, string]> = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ["Rol", roleLabels[data.role]],
    ["Tipo de edificio", buildingTypeLabels[data.buildingType]],
    ["Unidades", String(data.units)],
    ["Ubicación", data.neighborhood],
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
            Costa &amp; Asociados — formulario de contacto
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
