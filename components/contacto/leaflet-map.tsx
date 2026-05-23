"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { site } from "@/content/site";

// Custom marker — sin requerir los PNG de leaflet (que rompen con bundlers)
const markerIcon = L.divIcon({
  className: "costa-marker",
  html: `<span class="costa-marker__pin"></span><span class="costa-marker__dot"></span>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -32],
});

export default function LeafletMap() {
  useEffect(() => {
    // Inject minimal styling for our divIcon (keeps the component self-contained)
    const id = "costa-marker-style";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .costa-marker { position: relative; width: 28px; height: 36px; display:block; }
      .costa-marker__pin {
        position:absolute; inset:0;
        background: #8C2518;
        clip-path: path('M14 0 C 6 0 0 6 0 14 C 0 24 14 36 14 36 C 14 36 28 24 28 14 C 28 6 22 0 14 0 Z');
        box-shadow: 0 6px 14px -6px rgba(140,37,24,0.6);
      }
      .costa-marker__dot {
        position:absolute; left:50%; top:12px; transform:translateX(-50%);
        width:8px; height:8px; border-radius:9999px; background:#FAFAF7;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px; box-shadow: 0 12px 32px -16px rgba(13,45,92,0.25);
        font-family: var(--font-geist), system-ui, sans-serif;
      }
      .leaflet-popup-content { margin: 12px 14px; font-size: 13.5px; color:#1A1A1A; }
      .leaflet-container { font-family: var(--font-geist), system-ui, sans-serif; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <MapContainer
      center={[site.geo.lat, site.geo.lng]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[site.geo.lat, site.geo.lng]} icon={markerIcon}>
        <Popup>
          <strong>{site.name}</strong>
          <br />
          {site.address.street}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
