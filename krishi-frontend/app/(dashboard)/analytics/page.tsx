"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ANALYTICS_DATA } from "@/lib/mockData";

export default function AnalyticsPage() {
  const radarData = [
    { subject: "Soil Health", value: 72, fullMark: 100 },
    { subject: "Water Mgmt", value: 68, fullMark: 100 },
    { subject: "Crop Health", value: 86, fullMark: 100 },
    { subject: "Climate", value: 64, fullMark: 100 },
    { subject: "Economics", value: 74, fullMark: 100 },
    { subject: "Advisory", value: 65, fullMark: 100 },
  ];
  const overallScore = Math.round(radarData.reduce((s, d) => s + d.value, 0) / radarData.length);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 Farm Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Season: Rabi 2024-25 • Punjab • Demo composite indicators only</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-sm">
          <p className="font-semibold text-amber-800">⚠️ Demo Data</p>
          <p className="text-xs text-amber-600">Not official measurements</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Yield Estimate", value: "4.2 T/ac", change: "+10.5%", positive: true },
          { label: "Soil Health Score", value: "72/100", change: "+4 pts", positive: true },
          { label: "Water Used", value: "17,700L", change: "-8%", positive: true },
          { label: "Advisory Adoption", value: "65%", change: "+12%", positive: true },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className={`text-xs font-semibold mt-1 ${m.positive ? "text-green-600" : "text-red-500"}`}>{m.change} vs last season</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Performance Radar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900">Farm Performance Score</h2>
              <p className="text-xs text-gray-500">Demo composite indicator — not an official measurement</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-700">{overallScore}</p>
              <p className="text-xs text-gray-500">/100</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="Farm" dataKey="value" stroke="#16803A" fill="#16803A" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Crop Health Trend */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Crop Health Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ANALYTICS_DATA.cropHealthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} formatter={(v) => [`${v}%`, "Health"]} />
              <Line type="monotone" dataKey="health" stroke="#16803A" strokeWidth={2.5} dot={{ fill: "#16803A", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Water Usage (Litres)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ANALYTICS_DATA.waterUsage} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="liters" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Litres" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Advisory Adoption */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Advisory Adoption Rate</h2>
          <div className="space-y-4">
            {ANALYTICS_DATA.advisoryAdoption.map((item: any) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="font-bold text-gray-900">{item.adopted}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.adopted}%`,
                      background: item.adopted >= 80 ? "#16803A" : item.adopted >= 60 ? "#f59e0b" : "#94a3b8"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
