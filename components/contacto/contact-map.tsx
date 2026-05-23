"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-cream-100">
      <span className="text-[13px] text-ink-500">Cargando mapa…</span>
    </div>
  ),
});

export function ContactMap() {
  return (
    <div className="h-[280px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[320px]">
      <LeafletMap />
    </div>
  );
}
