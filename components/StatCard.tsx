interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  suffix?: string;
}

export default function StatCard({ label, value, trend, suffix }: StatCardProps) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-neutral-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl p-4 shadow-3d hover:shadow-3d-hover transition-all duration-300">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="mt-2 flex items-baseline space-x-2">
        <div className={`text-2xl font-bold ${trend ? trendColors[trend] : "text-white"}`}>
          {value}
          {suffix && <span className="text-lg">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}
