"use client";
import { useState } from "react";
import { NOTIFICATIONS, DEMO_FARMER } from "@/lib/mockData";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center gap-4 z-10">
      {/* Menu toggle */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-green-600">📍</span>
        <span className="font-medium text-gray-700">Ludhiana, Punjab</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">🌾 Wheat — Tillering Stage</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{unread}</span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? "bg-green-50/50" : ""}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{n.icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${!n.read ? "text-gray-900" : "text-gray-600"}`}>{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
              {DEMO_FARMER.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900">{DEMO_FARMER.name}</p>
              <p className="text-xs text-gray-500">{DEMO_FARMER.village}, {DEMO_FARMER.state}</p>
            </div>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="font-semibold text-gray-900 text-sm">{DEMO_FARMER.name}</p>
                <p className="text-xs text-gray-500">{DEMO_FARMER.farmSizeAcres} acres • {DEMO_FARMER.crop}</p>
              </div>
              <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">⚙️ Settings</a>
              <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">👤 Profile</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
