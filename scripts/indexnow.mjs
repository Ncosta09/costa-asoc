#!/usr/bin/env node
/**
 * Avisa a los buscadores del protocolo IndexNow (Bing → alimenta Copilot, Yandex,
 * Seznam, Naver) que una o más URLs cambiaron. Google NO participa de IndexNow:
 * para Google el recrawl depende del `lastmod` del sitemap (ver app/sitemap.ts) y,
 * si urge, de "Solicitar indexación" en Search Console.
 *
 * Uso:
 *   npm run indexnow                      → todas las URLs del sitemap en producción
 *   npm run indexnow -- /blog/mi-nota     → solo esas rutas (o URLs absolutas)
 *
 * La key es pública por diseño: se valida contra https://host/<key>.txt.
 */

const HOST = "www.costa-asoc.com.ar";
const ORIGIN = `https://${HOST}`;
const KEY = "cefff4e100142a6ded3f268f15e2b6aa";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml devolvió ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((a) => (a.startsWith("http") ? a : `${ORIGIN}${a.startsWith("/") ? a : `/${a}`}`))
  : await urlsFromSitemap();

if (urlList.length === 0) {
  console.error("No hay URLs para enviar.");
  process.exit(1);
}

console.log(`Enviando ${urlList.length} URL(s) a IndexNow:`);
for (const u of urlList) console.log(`  · ${u}`);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

// 200 = aceptado · 202 = aceptado, key pendiente de validación · 4xx = error real.
if (res.status === 200 || res.status === 202) {
  console.log(`\n✅ IndexNow ${res.status} — enviado.`);
} else {
  console.error(`\n❌ IndexNow ${res.status}: ${await res.text()}`);
  process.exit(1);
}
