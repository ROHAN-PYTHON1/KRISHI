"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import CircularProgress from "@/components/ui/CircularProgress";
import { DEMO_SOIL, THREE_YEAR_PLAN } from "@/lib/mockData";

export default function SoilPage() {
  // pH scale representation
  const phPosition = ((DEMO_SOIL.ph - 0) / 14) * 100;

  const nutrientCards = [
    { label: "pH", value: DEMO_SOIL.ph, unit: "", status: "Neutral", color: "green", desc: "Optimal for wheat (6.5-7.5)" },
    { label: "Nitrogen", value: DEMO_SOIL.nitrogen.valueKgHa, unit: "kg/ha", status: DEMO_SOIL.nitrogen.level, color: "yellow", desc: "180 kg/ha — slightly below upper optimal" },
    { label: "Phosphorus", value: DEMO_SOIL.phosphorus.valueKgHa, unit: "kg/ha", status: DEMO_SOIL.phosphorus.level, color: "green", desc: "28 kg/ha — within optimal range" },
    { label: "Potassium", value: DEMO_SOIL.potassium.valueKgHa, unit: "kg/ha", status: DEMO_SOIL.potassium.level, color: "yellow", desc: "145 kg/ha — adequate" },
    { label: "Organic Carbon", value: DEMO_SOIL.organicCarbon.valuePct, unit: "%", status: DEMO_SOIL.organicCarbon.level, color: "red", desc: "Below recommended 0.75% — needs attention" },
    { label: "Soil Moisture", value: DEMO_SOIL.soilMoisturePct, unit: "%", status: "Adequate", color: "blue", desc: "Good for current growth stage" },
  ];

  const beforeExpectedData = [
    { name: "Organic Carbon", current: 0.42, target: 0.75, unit: "%" },
    { name: "Nitrogen", current: 180, target: 200, unit: "kg/ha" },
    { name: "Health Score", current: 72, target: 85, unit: "/100" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🌱 Soil Health</h1>
          <p className="text-gray-500 text-sm mt-1">Last tested: January 2025 • Ludhiana, Punjab • Demo Data</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
          Download Report
        </button>
      </div>

      {/* Score + Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Circular score */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 mb-4">Soil Health Score</p>
          <CircularProgress value={72} size={140} strokeWidth={12} color="#16803A" />
          <p className="text-center text-xs text-gray-500 mt-3">Composite indicator — demo only, not an official measurement</p>
        </div>

        {/* Parameter cards */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {nutrientCards.map((card) => {
            const colorMap: Record<string, { text: string; bg: string; border: string }> = {
              green: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
              yellow: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
              red: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
              blue: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
            };
            const sc = colorMap[card.color];
            return (
              <div key={card.label} className={`rounded-2xl border p-4 ${sc.bg} ${sc.border}`}>
                <p className="text-xs font-medium text-gray-500 mb-1">{card.label}</p>
                <p className={`text-2xl font-bold ${sc.text}`}>{card.value}{card.unit}</p>
                <p className={`text-xs font-semibold mt-1 ${sc.text}`}>{card.status}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommendations */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Soil Recommendations</h2>
          <div className="space-y-3">
            {DEMO_SOIL.recommendations.map((rec, i) => {
              const priorityColors: Record<string, string> = {
                high: "border-red-200 bg-red-50",
                medium: "border-yellow-200 bg-yellow-50",
                low: "border-gray-200 bg-gray-50",
              };
              return (
                <div key={i} className={`rounded-xl border p-4 ${priorityColors[rec.priority]}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{rec.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{rec.title}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{rec.detail}</p>
                    </div>
                    <span className={`ml-auto text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                      rec.priority === "high" ? "bg-red-100 text-red-700" :
                      rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{rec.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Before vs Expected */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-1">Current vs Target</h2>
          <p className="text-xs text-gray-500 mb-4">Based on 3-year regenerative farming plan</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={beforeExpectedData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
              <Legend />
              <Bar dataKey="current" name="Current" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="#16803A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Soil health trend */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Soil Health Trend</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={DEMO_SOIL.history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="period" tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis domain={[60, 80]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
            <Line type="monotone" dataKey="score" stroke="#16803A" strokeWidth={2.5} dot={{ fill: "#16803A", r: 4 }} name="Health Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
