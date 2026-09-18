"use client";
import { useEffect, useRef } from "react";
import { DEMO_FIELD } from "@/lib/mockData";

export default function FieldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Import CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const map = L.map(mapRef.current!, {
        center: [DEMO_FIELD.location.lat, DEMO_FIELD.location.lon],
        zoom: 14,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles (free, no API key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Field boundary polygon
      const fieldBoundary: [number, number][] = [
        [30.9050, 75.8520],
        [30.9050, 75.8630],
        [30.8970, 75.8630],
        [30.8970, 75.8520],
        [30.9050, 75.8520],
      ];

      L.polygon(fieldBoundary, {
        color: "#16803A",
        fillColor: "#16803A",
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(map).bindPopup("<b>Village Farm</b><br/>2.5 acres | Wheat (Tillering)");

      // Zone markers
      const zones = [
        { latlng: [30.9030, 75.8530] as [number, number], label: "NW Zone", color: "#f59e0b", ndvi: 0.58, status: "Moderate Stress" },
        { latlng: [30.9030, 75.8620] as [number, number], label: "NE Zone", color: "#22c55e", ndvi: 0.74, status: "Healthy" },
        { latlng: [30.8990, 75.8530] as [number, number], label: "SW Zone", color: "#22c55e", ndvi: 0.72, status: "Healthy" },
        { latlng: [30.8990, 75.8620] as [number, number], label: "SE Zone", color: "#22c55e", ndvi: 0.75, status: "Healthy" },
      ];

      zones.forEach((zone) => {
        const circle = L.circle(zone.latlng, {
          color: zone.color,
          fillColor: zone.color,
          fillOpacity: 0.5,
          radius: 150,
        }).addTo(map);
        circle.bindPopup(`<b>${zone.label}</b><br/>NDVI: ${zone.ndvi}<br/>Status: ${zone.status}`);
      });

      // Field center marker
      const icon = L.divIcon({
        html: `<div style="background:#16803A;color:white;padding:4px 8px;border-radius:8px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)">🌾 Village Farm</div>`,
        className: "",
        iconAnchor: [50, 15],
      });
      L.marker([DEMO_FIELD.location.lat, DEMO_FIELD.location.lon], { icon }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="h-80 w-full rounded-2xl z-0" />;
}
