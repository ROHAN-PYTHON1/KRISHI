"use client";
export default function DemoModeBanner() {
  return (
    <div className="demo-banner text-xs flex items-center justify-center gap-2 py-1.5" style={{background: "linear-gradient(90deg, #d97706, #f59e0b)"}}>
      <span>🧪</span>
      <span className="font-semibold">DEMO MODE</span>
      <span className="opacity-80">— All data shown is simulated demo data for the Punjab wheat farm scenario</span>
    </div>
  );
}
