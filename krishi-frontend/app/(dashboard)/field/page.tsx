"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DEMO_FIELD } from "@/lib/mockData";
import Link from "next/link";

const FieldMap = dynamic(() => import("@/components/field/FieldMap"), { ssr: false, loading: () => <div className="h-80 bg-green-50 rounded-2xl animate-pulse flex items-center justify-center"><p className="text-green-600">Loading Field Map...</p></div> });

export default function FieldPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const metadata = [
    { label: "Crop", value: "Wheat" },
    { label: "Area", value: "2.5 Acres" },
    { label: "Avg NDVI", value: "0.71" },
    { label: "Soil Moisture", value: "62%" },
    { label: "Growth Stage", value: "Tillering" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🛰️ Field Intelligence</h1>
          <p className="text-gray-500 text-sm mt-1">Satellite and sensor analysis of your field.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metadata.map((m) => (
          <div key={m.label} className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{m.label}</p>
            <p className="text-lg font-bold text-gray-900">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
            <FieldMap />
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">NDVI History (30 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={DEMO_FIELD.ndviHistory}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16803A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16803A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="health" stroke="#16803A" fillOpacity={1} fill="url(#colorHealth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Zone Health</h3>
            <div className="space-y-3">
              {DEMO_FIELD.healthZones.map((zone) => {
                const isSelected = selectedZone === zone.zone;
                const statusLabel = zone.status === "healthy" ? "Healthy" : zone.status === "stress" ? "Moderate Stress" : "High Stress";
                return (
                  <button
                    key={zone.zone}
                    onClick={() => setSelectedZone(isSelected ? null : zone.zone)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      isSelected ? "border-green-500 bg-green-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{zone.zone}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        zone.status === "healthy" ? "bg-green-100 text-green-700" :
                        zone.status === "stress" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">NDVI: {zone.ndvi}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">AI Field Analysis</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              The North-West zone is showing signs of moderate stress (NDVI 0.58). This correlates with lower soil moisture readings in that sector. Overall field health remains stable at 0.71 NDVI.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/advisor" className="w-full py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl font-semibold text-sm text-center hover:bg-green-100 transition-colors">
                Generate Advisory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
