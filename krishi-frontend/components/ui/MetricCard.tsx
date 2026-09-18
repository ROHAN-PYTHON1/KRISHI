import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: string;
  statusColor?: "green" | "yellow" | "red" | "blue";
  icon?: string;
  trend?: { value: number; label: string };
  onClick?: () => void;
}

const statusColors = {
  green: { dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
  yellow: { dot: "bg-yellow-500", text: "text-yellow-700", bg: "bg-yellow-50" },
  red: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
  blue: { dot: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
};

export default function MetricCard({ title, value, unit, status, statusColor = "green", icon, trend, onClick }: MetricCardProps) {
  const sc = statusColors[statusColor];
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-5 card-hover ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm text-gray-500 mb-1">{unit}</span>}
      </div>
      {status && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {status}
        </div>
      )}
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <span className={trend.value >= 0 ? "text-green-600" : "text-red-500"}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
}
