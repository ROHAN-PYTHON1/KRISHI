"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">⚙️ Settings & Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your farm profile and app preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-700 text-3xl font-bold mb-4">
              JS
            </div>
            <h2 className="text-xl font-bold text-gray-900">Jagjit Singh</h2>
            <p className="text-sm text-gray-500 mb-4">+91 98765 43210</p>
            <div className="bg-gray-50 rounded-xl p-3 text-left">
              <p className="text-xs text-gray-500 font-medium">Village</p>
              <p className="text-sm font-semibold text-gray-900">Faridkot</p>
              <p className="text-xs text-gray-500 font-medium mt-2">State</p>
              <p className="text-sm font-semibold text-gray-900">Punjab</p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Language</h3>
            <div className="space-y-2">
              {["English", "ਪੰਜਾਬੀ", "हिन्दी", "मराठी", "ಕನ್ನಡ"].map((lang) => (
                <label key={lang} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{lang}</span>
                  <input type="radio" name="language" className="text-green-600" defaultChecked={lang === "English"} />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Farm Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Farm Details</h3>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Read Only Demo</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Primary Crop</label>
                <input type="text" readOnly value="Wheat (Rabi)" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 text-gray-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Farm Area (Acres)</label>
                <input type="text" readOnly value="2.5" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 text-gray-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Soil Type</label>
                <input type="text" readOnly value="Sandy Loam" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 text-gray-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Variety</label>
                <input type="text" readOnly value="PBW 826" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Govt Schemes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Government Schemes & Services</h3>
            <div className="space-y-3">
              {[
                { name: "PM-KISAN", desc: "Check installment status and update KYC", icon: "🏛️" },
                { name: "Soil Health Card", desc: "View official soil testing reports", icon: "📄" },
                { name: "eNAM", desc: "National Agriculture Market access", icon: "🌾" }
              ].map(scheme => (
                <div key={scheme.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-green-200 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{scheme.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{scheme.name}</h4>
                      <p className="text-xs text-gray-500">{scheme.desc}</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">App Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Weather Alerts</h4>
                  <p className="text-xs text-gray-500">Receive SMS for extreme weather</p>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Advisory Notifications</h4>
                  <p className="text-xs text-gray-500">Daily crop management tips</p>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Data Sharing</h4>
                  <p className="text-xs text-gray-500">Share anonymized data with network</p>
                </div>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
