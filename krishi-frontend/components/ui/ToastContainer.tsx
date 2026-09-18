"use client";
import { useDemoMode } from "@/components/providers/DemoModeProvider";

export default function ToastContainer() {
  const { toasts, removeToast } = useDemoMode();
  
  const icons = { success: "✅", warning: "⚠️", error: "❌", info: "ℹ️" };
  const colors = {
    success: "border-green-500 bg-green-50",
    warning: "border-yellow-500 bg-yellow-50",
    error: "border-red-500 bg-red-50",
    info: "border-blue-500 bg-blue-50",
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast-enter flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg max-w-sm bg-white ${colors[toast.type]}`}
        >
          <span className="text-lg">{icons[toast.type]}</span>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-900">{toast.title}</p>
            <p className="text-xs text-gray-600 mt-0.5">{toast.message}</p>
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
        </div>
      ))}
    </div>
  );
}
