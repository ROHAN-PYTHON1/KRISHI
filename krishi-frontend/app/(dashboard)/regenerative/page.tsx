"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { REGENERATIVE_PRACTICES, THREE_YEAR_PLAN, DEMO_SOIL } from "@/lib/mockData";

export default function RegenerativePage() {
  const carbonProjection = [
    { year: "Now", score: 72, oc: 0.42 },
    { year: "Yr 1", score: 76, oc: 0.52 },
    { year: "Yr 2", score: 82, oc: 0.62 },
    { year: "Yr 3", score: 89, oc: 0.75 },
  ];

  const resilienceColors: Record<string, string> = {
    High: "bg-green-100 text-green-700",
    "Very High": "bg-green-200 text-green-800",
    Medium: "bg-yellow-100 text-yellow-700",
  };
  const effortColors: Record<string, string> = {
    Low: "bg-blue-100 text-blue-700",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🌱 Regenerative Farming Planner</h1>
        <p className="text-gray-500 text-sm mt-1">Build long-term farm resilience with sustainable practices • Demo Data</p>
      </div>

      {/* Current system */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Current Cropping System</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="font-bold text-blue-900">Rice</p>
              <p className="text-xs text-blue-600">Kharif (Jun–Nov)</p>
            </div>
          </div>
          <span className="text-2xl text-gray-400">→</span>
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="font-bold text-green-900">Wheat</p>
              <p className="text-xs text-green-600">Rabi (Nov–Apr)</p>
            </div>
          </div>
          <span className="text-2xl text-gray-400">→</span>
          <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3">
            <span className="text-2xl">❓</span>
            <div>
              <p className="font-bold text-yellow-900">Next?</p>
              <p className="text-xs text-yellow-600">See recommendations below</p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-sm text-amber-800">⚠️ The continuous Rice-Wheat system is depleting soil organic carbon. The 3-year plan below can reverse this trend.</p>
        </div>
      </div>

      {/* Practice Cards */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">AI-Recommended Sustainable Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGENERATIVE_PRACTICES.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{p.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{p.practice}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{p.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-green-50 rounded-xl p-2.5">
                  <p className="text-xs font-semibold text-green-700 mb-0.5">Expected Benefit</p>
                  <p className="text-xs text-green-800">{p.expectedBenefit}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-2.5">
                  <p className="text-xs font-semibold text-blue-700 mb-0.5">Water Impact</p>
                  <p className="text-xs text-blue-800">{p.waterImpact}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${resilienceColors[p.climateResilience] || "bg-gray-100 text-gray-700"}`}>
                  🌍 {p.climateResilience} Resilience
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${effortColors[p.effort] || "bg-gray-100 text-gray-700"}`}>
                  {p.effort} Effort
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-semibold ml-auto">
                  ⏰ {p.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Year Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-6">Your 3-Year Soil Improvement Plan</h2>
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />
          <div className="space-y-6">
            {THREE_YEAR_PLAN.map((year, i) => (
              <div key={year.year} className="flex gap-6">
                {/* Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${year.color}, ${year.color}99)` }}>
                    <span className="text-xs">{year.year}</span>
                    <span className="text-base">{i + 1}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{year.year}: {year.label}</h3>
                    <div className="flex gap-2">
                      <span className="text-xs bg-white border border-gray-200 px-2.5 py-1 rounded-full text-gray-600">
                        Score: <strong>{year.targetScore}</strong>/100
                      </span>
                      <span className="text-xs bg-white border border-gray-200 px-2.5 py-1 rounded-full text-gray-600">
                        OC: <strong>{year.targetOC}%</strong>
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {year.actions.map((action, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500 flex-shrink-0">✓</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-1">Projected Soil Health Improvement</h2>
        <p className="text-xs text-gray-500 mb-4">Projected values — based on demo assumptions, actual results depend on implementation</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Soil Health Score</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={carbonProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis domain={[65, 95]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="score" stroke="#16803A" strokeWidth={2.5} dot={{ fill: "#16803A", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Organic Carbon (%)</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={carbonProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis domain={[0.3, 0.9]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} formatter={(v) => [`${v}%`, "Org. Carbon"]} />
                <Line type="monotone" dataKey="oc" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
