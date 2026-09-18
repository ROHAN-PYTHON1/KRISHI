"use client";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DEMO_WEATHER } from "@/lib/mockData";

export default function WeatherPage() {
  const riskColors: Record<string, { bg: string; text: string; dot: string }> = {
    High: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    Moderate: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
    Low: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  };
  const priorityColors: Record<string, string> = {
    high: "border-l-4 border-red-400 bg-red-50",
    medium: "border-l-4 border-yellow-400 bg-yellow-50",
    low: "border-l-4 border-blue-400 bg-blue-50",
  };
  
  // Full page implementation
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🌦️ Weather Intelligence</h1>
        <p className="text-gray-500 text-sm mt-1">Ludhiana, Punjab • Weather converted into farm decisions • Demo Data</p>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: "🌡️", label: "Temperature", value: `${DEMO_WEATHER.current.temperatureC}°C` },
          { icon: "💧", label: "Humidity", value: `${DEMO_WEATHER.current.humidityPct}%` },
          { icon: "🌧️", label: "Rain Chance", value: `${DEMO_WEATHER.current.rainProbabilityPct}%` },
          { icon: "☔", label: "Expected Rain", value: `${DEMO_WEATHER.current.expectedRainfallMm}mm` },
          { icon: "💨", label: "Wind", value: `${DEMO_WEATHER.current.windSpeedKmh} km/h` },
          { icon: "☀️", label: "UV Index", value: `${DEMO_WEATHER.current.uvIndex}` },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center card-hover">
            <span className="text-2xl">{item.icon}</span>
            <p className="text-xl font-bold text-gray-900 mt-2">{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 7-day Forecast */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-7 gap-2">
          {DEMO_WEATHER.forecast.map((day) => (
            <div key={day.day} className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="text-xs font-semibold text-gray-500">{day.day}</p>
              <span className="text-2xl my-2 block">{day.icon}</span>
              <p className="text-sm font-bold text-gray-900">{day.maxC}°</p>
              <p className="text-xs text-gray-400">{day.minC}°</p>
              <div className="mt-1.5 bg-blue-100 rounded-full px-1.5 py-0.5">
                <p className="text-xs font-semibold text-blue-700">{day.rainProb}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Temperature & Rain Probability — 7 Days</h2>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={DEMO_WEATHER.weeklyChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis yAxisId="temp" domain={[15, 35]} tick={{ fontSize: 12, fill: "#9ca3af" }} orientation="left" />
            <YAxis yAxisId="rain" domain={[0, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} orientation="right" />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
            <Legend />
            <Bar yAxisId="rain" dataKey="rain" name="Rain %" fill="#0ea5e9" opacity={0.5} radius={[4, 4, 0, 0]} />
            <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temp °C" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: "#f59e0b", r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">🌾 Weather → Farm Action</h2>
          <div className="space-y-3">
            {DEMO_WEATHER.farmActions.map((action, i) => (
              <div key={i} className={`rounded-xl p-4 ${priorityColors[action.priority]}`}>
                <p className="font-semibold text-gray-900 text-sm">{action.trigger}</p>
                <p className="text-sm text-gray-700 mt-1">{action.recommendation}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs bg-white bg-opacity-70 px-2.5 py-1 rounded-full font-semibold text-gray-700">→ {action.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">⚠️ Agricultural Risk Indicators</h2>
          <div className="space-y-3">
            {[
              { label: "Heavy Rain Risk", risk: DEMO_WEATHER.risks.heavyRain },
              { label: "Heat Stress Risk", risk: DEMO_WEATHER.risks.heatStress },
              { label: "Frost Risk", risk: DEMO_WEATHER.risks.frost },
              { label: "Wind Risk", risk: DEMO_WEATHER.risks.wind },
              { label: "Disease Favorability", risk: DEMO_WEATHER.risks.diseaseFavorability },
            ].map((item) => {
              const rc = riskColors[item.risk] || riskColors.Low;
              return (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${rc.bg} ${rc.text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                    {item.risk}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
