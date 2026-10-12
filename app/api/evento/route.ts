import { NextResponse, type NextRequest } from "next/server";
import { parseClickEvent } from "@/lib/attribution-server";
import { rateLimit } from "@/lib/rate-limit";
import { sendServerEvent } from "@/lib/measurement";

/**
 * POST /api/evento — conteo server-side de clicks de WhatsApp y teléfono.
 * Body: ClickEvent (lib/attribution-types.ts), mandado con navigator.sendBeacon.
 * 204 si el body es válido (aunque se descarte por bot o rate limit), 400 si no,
 * 403 si viene de otro origen.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 4096;
const BOT_UA_RE = /bot|crawler|spider|crawling|headless|slurp|preview|lighthouse/i;

function noContent() {
  return new NextResponse(null, { status: 204 });
}

function clientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// sendBeacon same-origin manda Origin; si viene y no coincide con el host, es otro sitio.
function isCrossOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(req: NextRequest) {
  if (isCrossOrigin(req)) return new NextResponse(null, { status: 403 });

  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) return new NextResponse(null, { status: 400 });

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (raw.length === 0 || raw.length > MAX_BODY) return new NextResponse(null, { status: 400 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const event = parseClickEvent(json);
  if (!event) return new NextResponse(null, { status: 400 });

  const ua = req.headers.get("user-agent") ?? "";
  if (ua.trim() === "" || BOT_UA_RE.test(ua)) return noContent();

  // Silencioso: devolver 429 a un beacon no sirve y le da señal a quien abusa.
  const limit = rateLimit(`evento:${clientIp(req)}`, { max: 20, windowMs: 10 * 60_000 });
  if (!limit.allowed) return noContent();

  await sendServerEvent(event.type === "whatsapp" ? "whatsapp_srv" : "phone_srv", event.attribution, {
    page: event.page,
  });
  return noContent();
}
