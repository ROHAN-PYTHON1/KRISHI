"use client";
import { useState, useRef, useEffect } from "react";
import { CHAT_SUGGESTIONS, DEMO_FARMER, DEMO_FIELD } from "@/lib/mockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  structured?: {
    recommendation: string;
    why: string;
    risk: "Low" | "Medium" | "High";
    confidence: number;
    nextStep: string;
    disclaimer: string;
  };
  timestamp: Date;
}

// Mock AI responses (used when backend is unavailable)
const MOCK_AI = {
  irrigate: {
    recommendation: "Do not irrigate today.",
    why: "Rainfall of ~12mm is expected within the next 24-36 hours, and your current soil moisture is already at 62%, which is adequate for Wheat at the Tillering stage. Irrigating now would raise moisture above optimal levels and risk waterlogging, especially in the stressed north-west zone.",
    risk: "Low" as const,
    confidence: 89,
    nextStep: "Check soil moisture after the rain event. If it drops below 50% in 5 days, schedule evening drip irrigation.",
    disclaimer: "This recommendation is based on demo data. Please verify with a local agricultural extension officer for live conditions.",
  },
  yellow: {
    recommendation: "Inspect affected plants carefully and use Crop Doctor to photograph the leaves.",
    why: "Yellow leaves in wheat at the Tillering stage can indicate nitrogen deficiency (your N is at Moderate level), early-stage leaf rust (risk is Moderate given current humidity of 64%), or waterlogging stress. The pattern and location of yellowing will help differentiate.",
    risk: "Medium" as const,
    confidence: 74,
    nextStep: "Upload a clear photo to Krishi Crop Doctor. If orange-yellow pustules are visible, consult your district agricultural officer urgently.",
    disclaimer: "Confidence is moderate — please consult a certified agricultural expert before applying any treatment.",
  },
  default: {
    recommendation: "Your wheat crop is in a generally healthy state. The main action today is to avoid irrigation.",
    why: "Crop health is at 86% and NDVI is 0.71, both within healthy ranges for the Tillering stage. The primary concern is low soil organic carbon (0.42%) which is a long-term issue, and the upcoming heavy rain which requires drainage preparation.",
    risk: "Low" as const,
    confidence: 80,
    nextStep: "Review the Dashboard advisory, check Weather for rain timing, and visit Regenerative Farming for the soil improvement plan.",
    disclaimer: "This is a general status summary based on demo data.",
  },
};

function detectIntent(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("irrigat") || m.includes("water")) return "irrigate";
  if (m.includes("yellow") || m.includes("rust") || m.includes("disease")) return "yellow";
  return "default";
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! I'm Krishi AI, your personal agricultural advisor. I have access to your field data, soil health, weather forecast, and crop information. What would you like to know about your farm today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200));
    
    // Try backend, fallback to mock
    let structured;
    try {
      const res = await fetch("http://localhost:8000/api/v1/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, field_id: "field_punjab_001" }),
      });
      if (res.ok) {
        const data = await res.json();
        structured = {
          recommendation: data.recommendation,
          why: data.why,
          risk: data.risk as "Low" | "Medium" | "High",
          confidence: data.confidence,
          nextStep: data.next_step,
          disclaimer: data.disclaimer,
        };
      } else throw new Error("Backend error");
    } catch {
      const intent = detectIntent(text);
      const mock = MOCK_AI[intent as keyof typeof MOCK_AI] || MOCK_AI.default;
      structured = mock;
    }

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: structured.recommendation,
      structured,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const riskColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto" style={{ height: "calc(100vh - 160px)" }}>
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Ask Krishi</h1>
            <p className="text-sm text-gray-500">AI Farm Advisor • Context: {DEMO_FARMER.crop}, {DEMO_FIELD.growthStage} stage, Ludhiana</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">⚡ AI Active — Demo Mode</span>
          </div>
        </div>

        {/* Context info */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Crop", value: "Wheat (Tillering)" },
            { label: "NDVI", value: "0.71" },
            { label: "Moisture", value: "62%" },
            { label: "Weather", value: "Rain Expected" },
            { label: "Disease Risk", value: "Moderate" },
          ].map(c => (
            <span key={c.label} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              <span className="font-medium">{c.label}:</span> {c.value}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
                🌾
              </div>
            )}
            <div className={`max-w-2xl ${msg.role === "user" ? "order-1" : ""}`}>
              {msg.role === "user" ? (
                <div className="px-4 py-3 rounded-2xl rounded-tr-sm text-white text-sm" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
                  {msg.content}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  {msg.structured ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Recommendation</p>
                        <p className="text-sm font-semibold text-gray-900">{msg.structured.recommendation}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Why?</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{msg.structured.why}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Risk</p>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskColors[msg.structured.risk]}`}>
                            {msg.structured.risk}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Confidence</p>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                            {msg.structured.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Next Step</p>
                        <p className="text-sm text-green-800">{msg.structured.nextStep}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 italic">⚠️ {msg.structured.disclaimer}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">{msg.content}</p>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start chat-bubble">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm mr-2 flex-shrink-0" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
              🌾
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 mb-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {CHAT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0">
        <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask about irrigation, soil, disease, crop planning..."
            className="flex-1 resize-none text-sm text-gray-900 bg-transparent outline-none min-h-[40px] max-h-32 placeholder-gray-400"
            rows={1}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl text-white font-bold transition-all disabled:opacity-40"
            style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">Krishi AI uses demo data. Always verify recommendations with a certified agricultural expert.</p>
      </div>
    </div>
  );
}
