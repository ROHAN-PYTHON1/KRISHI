type RiskLevel = "Low" | "Moderate" | "High";

const configs = {
  Low: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500", label: "Low" },
  Moderate: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500", label: "Moderate" },
  High: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500", label: "High" },
};

export default function RiskBadge({ risk, size = "sm" }: { risk: RiskLevel; size?: "sm" | "md" | "lg" }) {
  const c = configs[risk];
  const sizeClass = size === "lg" ? "text-sm px-3 py-1.5" : size === "md" ? "text-xs px-2.5 py-1" : "text-xs px-2 py-0.5";
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${c.bg} ${c.text} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label} Risk
    </span>
  );
}
