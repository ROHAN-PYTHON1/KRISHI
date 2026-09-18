import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
              K
            </div>
            <span className="font-bold text-gray-900">Krishi</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#solution" className="text-gray-600 hover:text-green-700">Solution</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-700">How It Works</a>
            <a href="#network" className="text-gray-600 hover:text-green-700">Network</a>
          </div>
          <Link href="/dashboard" className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
            Open Platform
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-bg min-h-screen flex items-center pt-20 pb-16 px-6 bg-gradient-to-br from-green-900 to-green-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="text-yellow-300">★</span>
                <span className="text-white text-sm font-medium">Agricultural Intelligence Platform</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-4">
                Krishi
              </h1>
              <p className="text-2xl md:text-3xl text-green-200 font-light mb-6">
                Intelligence for Every Field.
              </p>
              <p className="text-lg text-green-100 leading-relaxed mb-10 max-w-lg">
                AI-powered agricultural intelligence combining satellite data, soil health, weather forecasting and crop diagnostics to help farmers make smarter, climate-resilient decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white rounded-2xl font-bold text-green-800 text-lg hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Explore Krishi
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 border-2 border-white/40 rounded-2xl font-bold text-white text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  View Demo ▶
                </Link>
              </div>
              <p className="mt-6 text-green-300 text-sm">🧪 Demo data — All displayed values are simulated for demonstration</p>
            </div>

            {/* Floating cards */}
            <div className="relative hidden lg:block h-96">
              {[
                { icon: "🛰️", title: "Satellite Intelligence", value: "NDVI: 0.71", color: "bg-white", top: "0%", left: "0%" },
                { icon: "🌱", title: "Soil Health", value: "Score: 72/100", color: "bg-white", top: "20%", right: "0%" },
                { icon: "🌦️", title: "Weather Risk", value: "Rain: 72%", color: "bg-white", bottom: "20%", left: "10%" },
                { icon: "🤖", title: "AI Advisory", value: "Skip Irrigation", color: "bg-white", bottom: "0%", right: "5%" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="absolute bg-white rounded-2xl p-4 shadow-xl border border-gray-100 min-w-[160px]"
                  style={{ top: card.top, left: (card as any).left, right: (card as any).right, bottom: (card as any).bottom }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{card.icon}</span>
                    <span className="text-xs font-bold text-gray-500">{card.title}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{card.value}</p>
                </div>
              ))}
              {/* Center field visual */}
              <div className="absolute inset-12 rounded-2xl flex items-center justify-center" style={{background: "linear-gradient(135deg, #16803A22, #16803A44)"}}>
                <div className="text-center">
                  <span className="text-5xl">🌾</span>
                  <p className="text-white font-bold mt-2">Village Farm</p>
                  <p className="text-green-200 text-xs">2.5 acres • Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-400 font-semibold mb-4">THE CHALLENGE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Small farmers often lack timely, localized, data-driven agricultural guidance</h2>
          <p className="text-gray-400 text-lg leading-relaxed">86% of Indian farmers are small or marginal. They face unpredictable weather, degrading soils, rising input costs, and crop diseases — without access to the expert knowledge and real-time data that could transform their outcomes.</p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { stat: "86%", desc: "of Indian farmers are small or marginal" },
              { stat: "30%", desc: "of crop losses are preventable with better information" },
              { stat: "0.42%", desc: "Soil organic carbon in Punjab — below optimal 0.75%" },
            ].map(s => (
              <div key={s.stat}>
                <p className="text-3xl font-bold text-green-400">{s.stat}</p>
                <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold mb-4">OUR SOLUTION</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Krishi transforms complex agricultural data into simple, actionable recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛰️", title: "Satellite Data", desc: "NDVI-based field health monitoring at the individual field level" },
              { icon: "🌱", title: "Soil Intelligence", desc: "pH, NPK, organic carbon analysis with specific improvement recommendations" },
              { icon: "🌦️", title: "Weather-to-Action", desc: "Weather forecasts converted directly into farm decisions, not just numbers" },
              { icon: "🤖", title: "AI Advisory", desc: "Conversational AI advisor that knows your crop, soil, and weather context" },
            ].map(f => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-green-50 border border-green-100">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold mb-4">HOW IT WORKS</p>
            <h2 className="text-3xl font-bold text-gray-900">Satellite + Soil + Weather + AI → Localized Farm Intelligence</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {[
              { step: "1", icon: "🛰️", title: "Data Collection", desc: "Satellite, soil sensors, weather stations" },
              { step: "2", icon: "🔬", title: "AI Processing", desc: "Machine learning + agricultural knowledge" },
              { step: "3", icon: "📊", title: "Intelligence", desc: "Field-level risk and opportunity analysis" },
              { step: "4", icon: "📱", title: "Advisory", desc: "Simple recommendation in farmer's language" },
            ].map((step, i, arr) => (
              <div key={step.step} className="flex items-center gap-4 flex-1">
                <div className="flex-1 bg-white rounded-2xl p-5 text-center border border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-3" style={{background: "#16803A"}}>
                    {step.step}
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                  <h3 className="font-bold text-gray-900 text-sm mt-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                </div>
                {i < arr.length - 1 && <span className="text-gray-300 text-2xl hidden md:block">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DPI Section */}
      <section id="network" className="py-20 px-6" style={{background: "linear-gradient(135deg, #0B4F2F, #16803A)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-300 font-semibold mb-4">DIGITAL PUBLIC INFRASTRUCTURE</p>
            <h2 className="text-3xl font-bold text-white mb-4">States share AI models through standardized APIs</h2>
            <p className="text-green-200">Krishi is designed as interoperable infrastructure. States don’t rebuild — they connect.</p>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["State Data", "→", "Krishi API", "→", "AI Model", "→", "Local Advisory"].map((item, i) => (
              item === "→" ? (
                <span key={i} className="text-green-300 text-2xl">{item}</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-5 py-3 text-white font-semibold">{item}</div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-600 font-semibold mb-4">DEMO INDICATORS</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Platform Capabilities</h2>
          <p className="text-gray-500 text-sm mb-12">(Demonstration metrics only — not real deployment statistics)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5+", label: "Data Sources", icon: "📊" },
              { value: "Multi-State", label: "Ready", icon: "🇮🇳" },
              { value: "AI-Powered", label: "Intelligence", icon: "🤖" },
              { value: "Farmer", label: "Centric Design", icon: "👨🌾" },
            ].map(m => (
              <div key={m.label} className="p-6 rounded-2xl bg-green-50 border border-green-100">
                <span className="text-3xl">{m.icon}</span>
                <p className="text-2xl font-bold text-green-700 mt-2">{m.value}</p>
                <p className="text-sm text-gray-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{background: "#16803A"}}>K</div>
            <span className="font-bold text-white text-lg">Krishi</span>
          </div>
          <p className="text-gray-500 text-sm">Intelligence for Every Field.</p>
          <p className="text-gray-600 text-xs mt-4">Built for demonstration purposes. All data shown is simulated. Krishi is not affiliated with any government body.</p>
        </div>
      </footer>
    </div>
  );
}
