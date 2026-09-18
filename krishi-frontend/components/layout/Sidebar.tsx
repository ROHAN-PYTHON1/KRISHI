"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/field", icon: "🛰️", label: "Field Intelligence" },
  { href: "/soil", icon: "🌱", label: "Soil Health" },
  { href: "/weather", icon: "🌦️", label: "Weather" },
  { href: "/advisor", icon: "🤖", label: "AI Farm Advisor" },
  { href: "/crop-doctor", icon: "📷", label: "Crop Doctor" },
  { href: "/regenerative", icon: "🌾", label: "Regenerative Farming" },
  { href: "/analytics", icon: "📊", label: "Analytics" },
  { href: "/network", icon: "🔗", label: "Krishi Network" },
  { href: "/settings", icon: "⚙️", label: "Settings" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onToggle} />
      )}
      
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-30 flex flex-col transition-all duration-300 shadow-sm
          ${ isOpen ? "w-64" : "w-16" }
          ${ isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: "linear-gradient(135deg, #16803A, #0B4F2F)"}}>
            <span className="text-white font-bold text-sm">K</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-tight">Krishi</h1>
              <p className="text-xs text-gray-500">Agricultural Intelligence</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${active
                    ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="truncate">{item.label}</span>}
                {!isOpen && (
                  <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Version badge */}
        {isOpen && (
          <div className="p-4 border-t border-gray-100">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-green-700">Krishi v1.0</p>
              <p className="text-xs text-green-600 mt-0.5">Demo Mode Active</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
