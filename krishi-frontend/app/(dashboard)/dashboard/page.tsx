"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DEMO_FIELD, DEMO_ADVISORY, DEMO_FARMER } from "@/lib/mockData";
import Link from "next/link";

export default function DashboardPage() {
  const [showExplanation, setShowExplanation] = useState(false);

  const metrics = [
    { title: "Crop Health", value: "86", unit: "%", status: "Healthy", statusColor: "green" as const, icon: "🌾" },
    { title: "Soil Moisture", value: "62", unit: "%", status: "Moderate", statusColor: "yellow" as const, icon: "💧" },
    { title: "Weather Risk", value: "Low", status: "Clear Skies", statusColor: "green" as const, icon: "⛅" },
    { title: "Disease Risk", value: "Moderate", status: "Monitor Closely", statusColor: "yellow" as const, icon: "🔍" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Good Morning, {DEMO_FARMER.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what your farm needs today.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm">
            <p className="font-semibold text-green-800">🌾 {DEMO_FARMER.crop} — Tillering Stage</p>
            <p className="text-green-600 text-xs">{DEMO_FARMER.village}, {DEMO_FARMER.state} • {DEMO_FARMER.farmSizeAcres} acres</p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const colorMap: Record<string, { text: string; bg: string; dot: string }> = {
            green: { text: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
            yellow: { text: "text-yellow-700", bg: "bg-yellow-50", dot: "bg-yellow-500" },
            red: { text: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" },
            blue: { text: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" },
          };
          const sc = colorMap[m.statusColor];
          return (
            <div key={m.title} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{m.title}</p>
                <span className="text-2xl">{m.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{m.value}{m.unit || ""}</p>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {m.status}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advisory Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌾</span>
              <h2 className="font-bold text-gray-900">Today's Krishi Advisory</h2>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Confidence: 89%</span>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">💧 Do not irrigate today</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{DEMO_ADVISORY.body}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-semibold text-green-800 mb-1">Recommended Action</p>
              <p className="text-sm text-green-700">{DEMO_ADVISORY.recommendedAction}</p>
            </div>
            {showExplanation && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold mb-2">Why this recommendation?</p>
                <p>The AI advisory engine considered: (1) Current soil moisture of 62% — adequate for Tillering stage. (2) Weather forecast showing 72% rain probability within 24-36 hours. (3) Expected rainfall of 12mm which will raise moisture to ~68-70%. (4) Localized stress in north-west zone suggesting existing moisture variation. Irrigating before rain would risk waterlogging in the low-NDVI north-west zone.</p>
                <p className="mt-2 text-xs text-gray-500 italic">This recommendation uses demo data. Real advisory integrates live satellite, sensor, and forecast feeds.</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-green-200 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
              >
                {showExplanation ? "Hide" : "View"} Explanation
              </button>
              <Link
                href="/advisor"
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm text-white text-center transition-colors"
                style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}
              >
                Ask Krishi AI
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Farm Overview</h3>
            <div className="space-y-3">
              {[
                { label: "Crop", value: "Wheat (HD-3226)" },
                { label: "Area", value: "2.5 acres" },
                { label: "Stage", value: "Tillering" },
                { label: "Sown", value: "Nov 25, 2024" },
                { label: "Expected Harvest", value: "Apr 10, 2025" },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: "/field", icon: "🛰️", label: "View Field Map" },
                { href: "/crop-doctor", icon: "📷", label: "Diagnose Crop" },
                { href: "/soil", icon: "🌱", label: "Soil Report" },
                { href: "/weather", icon: "🌦️", label: "Weather Forecast" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Crop Health Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-gray-900">Crop Health — Last 30 Days</h2>
            <p className="text-sm text-gray-500 mt-0.5">NDVI-based vegetation health index (demo data)</p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">NDVI: 0.71</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={DEMO_FIELD.ndviHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
              formatter={(value) => [`${value}%`, "Health Score"]}
            />
            <Line
              type="monotone"
              dataKey="health"
              stroke="#16803A"
              strokeWidth={2.5}
              dot={{ fill: "#16803A", r: 4 }}
              activeDot={{ r: 6, fill: "#16803A" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
