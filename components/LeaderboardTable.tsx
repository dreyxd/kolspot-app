"use client";

import { LeaderboardEntry } from "@/types";
import Badge from "./Badge";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
            <th className="pb-3 font-medium">Rank</th>
            <th className="pb-3 font-medium">Player</th>
            <th className="pb-3 font-medium">Wallet</th>
            <th className="pb-3 font-medium">ROI %</th>
            <th className="pb-3 font-medium">PnL (SOL)</th>
            <th className="pb-3 font-medium">Trades</th>
            <th className="pb-3 font-medium">Reward</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isTop3 = entry.rank <= 3;
            const rewardEmoji = entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : null;

            return (
              <tr
                key={entry.rank}
                className={`border-b border-slate-800/50 transition-colors hover:bg-slate-800/30 ${
                  isTop3 ? "border-l-4 border-l-accent-orange" : ""
                }`}
              >
                <td className="py-4 pl-2">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${isTop3 ? "text-accent-orange" : "text-slate-300"}`}>
                      {entry.rank}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-medium text-white">{entry.player}</span>
                </td>
                <td className="py-4">
                  <code className="text-sm text-slate-400">{entry.wallet}</code>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-green-400">+{entry.roi.toFixed(1)}%</span>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-white">+{entry.pnl.toFixed(2)}</span>
                </td>
                <td className="py-4">
                  <span className="text-slate-300">{entry.trades}</span>
                </td>
                <td className="py-4">
                  {entry.reward ? (
                    <Badge variant="reward">
                      {rewardEmoji} {entry.reward} SOL
                    </Badge>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
