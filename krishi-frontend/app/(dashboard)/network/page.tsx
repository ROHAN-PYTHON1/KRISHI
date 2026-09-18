"use client";
import { useState } from "react";
import { STATES_NETWORK, AI_MODELS, API_DEMO_ENDPOINTS } from "@/lib/mockData";

export default function NetworkPage() {
  const [selectedApi, setSelectedApi] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    Connected: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    Active: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    Pending: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  };
  const modelStatusColors: Record<string, string> = {
    Available: "bg-green-100 text-green-800",
    Beta: "bg-yellow-100 text-yellow-800",
    Deprecated: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔗 Krishi Network</h1>
          <p className="text-gray-500 text-sm mt-1">Connecting agricultural intelligence across Indian states as interoperable Digital Public Infrastructure</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm hidden md:block">
          <p className="font-bold text-green-800">4 States Connected</p>
          <p className="text-xs text-green-600">62,700+ farmers on network</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Connected States", value: "4", icon: "🇮🇳" },
          { label: "Total Farmers", value: "62,700+", icon: "👨🌾" },
          { label: "Active AI Models", value: "4", icon: "🤖" },
          { label: "Shared Datasets", value: "26", icon: "📊" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* State Cards */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">State Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATES_NETWORK.map((state) => {
            const sc = statusColors[state.status];
            return (
              <div key={state.state} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{state.flag}</span>
                    <h3 className="font-bold text-gray-900">{state.state}</h3>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${sc.bg} ${sc.text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {state.status}
                  </span>
                </div>

                {state.status !== "Pending" ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center bg-gray-50 rounded-xl p-2">
                        <p className="text-sm font-bold text-gray-900">{state.datasets}</p>
                        <p className="text-xs text-gray-500">Datasets</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-xl p-2">
                        <p className="text-sm font-bold text-gray-900">{state.activeModels}</p>
                        <p className="text-xs text-gray-500">AI Models</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-xl p-2">
                        <p className="text-sm font-bold text-gray-900">{(state.farmers / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-gray-500">Farmers</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-3">
                      {state.useCases.map(uc => (
                        <div key={uc} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="text-green-500">✓</span> {uc}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-green-200 text-green-700 hover:bg-green-50 transition-colors">
                        View Data
                      </button>
                      <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors" style={{background: "#16803A"}}>
                        {state.sharing ? "Sharing ✓" : "Request Access"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-2">Onboarding in progress</p>
                    <div className="space-y-1">
                      {state.useCases.map(uc => (
                        <p key={uc} className="text-xs text-gray-400">⏳ {uc}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-6">Interoperability Architecture</h2>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { label: "State Data", icon: "🇮🇳", color: "bg-blue-50 border-blue-200 text-blue-800" },
            { label: "Krishi API", icon: "🔗", color: "bg-green-50 border-green-200 text-green-800" },
            { label: "AI Model", icon: "🤖", color: "bg-purple-50 border-purple-200 text-purple-800" },
            { label: "Local Advisory", icon: "📱", color: "bg-orange-50 border-orange-200 text-orange-800" },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${step.color}`}>
                <span className="text-xl">{step.icon}</span>
                <span className="text-sm font-semibold">{step.label}</span>
              </div>
              {i < arr.length - 1 && <span className="text-gray-400 text-xl">→</span>}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">States can integrate Krishi through standardized REST APIs without rebuilding the platform</p>
      </div>

      {/* AI Models */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Shared AI Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_MODELS.map((model) => (
            <div key={model.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{model.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Provider: {model.provider} • v{model.version}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${modelStatusColors[model.status]}`}>{model.status}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{model.type}</span>
                {model.crops.map(c => (
                  <span key={c} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${model.accuracy}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-900">{model.accuracy}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{model.uses.toLocaleString()} uses</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedModel(model.id)}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View API
                </button>
                <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-white transition-colors" style={{background: "#16803A"}}>
                  Use Model
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Demo Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-2">API Interoperability Demo</h2>
        <p className="text-sm text-gray-500 mb-4">States can integrate Krishi advisory intelligence through these standardized REST endpoints:</p>
        <div className="space-y-3">
          {API_DEMO_ENDPOINTS.map((endpoint, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setSelectedApi(selectedApi === i ? null : i)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  endpoint.method === "GET" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}>{endpoint.method}</span>
                <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                <span className="text-sm text-gray-500 ml-2">{endpoint.description}</span>
                <span className="ml-auto text-gray-400 text-sm">{selectedApi === i ? "▲" : "▼"}</span>
              </button>
              {selectedApi === i && (
                <div className="border-t border-gray-100 bg-gray-900 rounded-b-xl">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                    <span className="text-xs text-gray-400">Response (200 OK)</span>
                    <span className="text-xs text-green-400">• application/json</span>
                  </div>
                  <pre className="p-4 text-xs text-green-300 overflow-x-auto leading-relaxed">
                    {JSON.stringify(endpoint.response, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Model API Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">API Reference — {AI_MODELS.find(m => m.id === selectedModel)?.name}</h3>
              <button onClick={() => setSelectedModel(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-xs text-green-300 font-mono">
              <p className="text-gray-500 mb-2"># POST request example</p>
              <p>curl -X POST https://api.krishi.network/v1/models/{selectedModel}/predict \</p>
              <p>  -H "Authorization: Bearer YOUR_API_KEY" \</p>
              <p>  -H "Content-Type: application/json" \</p>
              <p>  -d '{'{'}"field_id": "field_001", "state": "Punjab"{'}'}'</p>
            </div>
            <p className="text-xs text-gray-500 mt-4">🔒 API keys available to registered state agriculture departments via the Krishi Network portal.</p>
            <button onClick={() => setSelectedModel(null)} className="mt-4 w-full py-2.5 rounded-xl text-white font-semibold text-sm" style={{background: "#16803A"}}>Request Access</button>
          </div>
        </div>
      )}
    </div>
  );
}
