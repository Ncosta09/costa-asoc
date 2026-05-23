import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/logos/costa-horizontal.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse at top left, #F4F2EC 0%, #FAFAF7 60%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={360} height={120} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              color: "#8C2518",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "Helvetica, sans-serif",
            }}
          >
            Administración de consorcios
          </div>
          <div
            style={{
              fontSize: 64,
              color: "#0D2D5C",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 900,
            }}
          >
            Gestión transparente, control financiero riguroso y respuesta inmediata.
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#4A4A48",
              fontFamily: "Helvetica, sans-serif",
              marginTop: 8,
            }}
          >
            {`CABA · Desde ${site.founded} · RPA 8192 · CAPHAI 2903`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
