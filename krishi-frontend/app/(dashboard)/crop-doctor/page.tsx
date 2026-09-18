"use client";
import { useState, useRef, useCallback } from "react";
import { DEMO_DISEASE_RESULT } from "@/lib/mockData";

export default function CropDoctorPage() {
  const [dragOver, setDragOver] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof DEMO_DISEASE_RESULT | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setResult(null);
    setAnalyzing(true);
    
    // Mock analysis pipeline — simulates 2.5 second processing
    setTimeout(() => {
      setAnalyzing(false);
      setResult(DEMO_DISEASE_RESULT);
    }, 2500);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const riskColors = {
    High: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-800" },
    Moderate: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-800" },
    Low: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-800" },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📷 Krishi Crop Doctor</h1>
        <p className="text-gray-500 text-sm mt-1">Upload a crop image to identify possible disease or stress. AI-powered analysis — demo mode.</p>
      </div>

      {/* Upload Area */}
      {!imageUrl && (
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
            dragOver ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="text-5xl block mb-4">{dragOver ? "🌾" : "📷"}</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {dragOver ? "Drop your image here" : "Upload a Crop Image"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">Drag and drop, or click to select • Supports JPG, PNG, HEIC</p>
          <div className="flex justify-center gap-3">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
              📸 Upload Image
            </button>
            <button className="px-6 py-2.5 rounded-xl font-semibold text-sm text-gray-700 border border-gray-200 hover:bg-gray-50">
              📷 Use Camera
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">Images are processed locally (demo) — not sent to external servers</p>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        </div>
      )}

      {/* Image Preview + Analyzing */}
      {imageUrl && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">Uploaded Image</p>
                <button onClick={() => { setImageUrl(null); setResult(null); }} className="text-xs text-gray-500 hover:text-red-500 transition-colors">Remove</button>
              </div>
              <img src={imageUrl} alt="Crop sample" className="w-full rounded-xl object-cover max-h-60" />
            </div>

            {/* Supported diseases info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mt-4">
              <p className="font-semibold text-gray-900 text-sm mb-3">Supported Conditions</p>
              <div className="space-y-1.5">
                {["Leaf Rust", "Stem Rust", "Powdery Mildew", "Spot Blotch", "Loose Smut", "Nutrient Deficiency", "Water Stress"].map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-green-500">✓</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {analyzing ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <p className="font-semibold text-gray-900">Analyzing Image...</p>
                <p className="text-sm text-gray-500 mt-1">Running AI disease detection pipeline</p>
                <div className="mt-4 space-y-2">
                  {["Preprocessing image...", "Detecting patterns...", "Running classification model..."].map((step, i) => (
                    <p key={i} className="text-xs text-gray-400">✓ {step}</p>
                  ))}
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Main Diagnosis */}
                <div className={`bg-white rounded-2xl border p-5 ${riskColors[result.risk].border}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Primary Diagnosis</p>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{result.disease}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{result.confidence}%</p>
                      <p className="text-xs text-gray-500">Confidence</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${riskColors[result.risk].badge}`}>
                      {result.risk} Risk
                    </span>
                    <span className="text-xs text-gray-500">Affected area: ~{result.affectedAreaPct}% of field</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Symptoms Detected</p>
                    <ul className="space-y-1.5">
                      {result.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-red-500 mt-0.5">●</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                    <p className="text-xs font-bold text-amber-800 mb-1">Recommended Action</p>
                    <p className="text-sm text-amber-900 leading-relaxed">{result.recommendation}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <p className="text-xs font-bold text-gray-600 mb-1">Alternative Possibility</p>
                    <p className="text-sm text-gray-700">{result.alternative}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-xs text-blue-800">⚠️ {result.responsibleNote}</p>
                  </div>
                </div>

                <button onClick={() => { setImageUrl(null); setResult(null); }} className="w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Analyze Another Image
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Info cards at bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "🤖", title: "AI-Powered", desc: "Computer vision model trained on wheat disease images" },
          { icon: "⚠️", title: "Verify Locally", desc: "Always confirm diagnosis with a certified agricultural expert" },
          { icon: "🔒", title: "Privacy-First", desc: "Demo mode processes images locally without external upload" },
        ].map(card => (
          <div key={card.title} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <span className="text-2xl">{card.icon}</span>
            <p className="font-semibold text-gray-900 text-sm mt-2">{card.title}</p>
            <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
