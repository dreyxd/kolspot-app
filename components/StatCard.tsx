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
    neutral: "text-slate-400",
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-background-card p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 flex items-baseline space-x-2">
        <div className={`text-2xl font-bold ${trend ? trendColors[trend] : "text-white"}`}>
          {value}
          {suffix && <span className="text-lg">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}
