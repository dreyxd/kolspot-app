"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { getKolBoard } from "@/lib/api";
import { KolBoardEntry } from "@/types";

export default function KolBoardPage() {
  const [kolBoard, setKolBoard] = useState<KolBoardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getKolBoard();
        setKolBoard(data);
      } catch (error) {
        console.error("Error loading KOLBoard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const getTierBadgeVariant = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "legendary":
        return "reward" as const;
      case "elite":
        return "warning" as const;
      case "expert":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-neutral-400">Loading KOLBoard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">
          <span className="text-white">KOL</span>
          <span className="text-accent">Board</span>
          <span className="text-white"> – Top Community KOLs</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          KOLBoard highlights top wallets from tournaments and tracked KOLs on Solana.
          These are the best-performing traders in the KOLSpot community, ranked by
          lifetime ROI and tournament success.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Total KOLs</div>
          <div className="text-2xl font-bold text-white">{kolBoard.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Community KOLs</div>
          <div className="text-2xl font-bold text-accent">
            {kolBoard.filter((k) => k.isCommunityKol).length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Legendary Tier</div>
          <div className="text-2xl font-bold text-yellow-400">
            {kolBoard.filter((k) => k.tier === "Legendary").length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Active Traders</div>
          <div className="text-2xl font-bold text-green-400">{kolBoard.length}</div>
        </Card>
      </div>

      {/* KOLBoard Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-neutral-400">
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">Tier</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Wallet</th>
                <th className="pb-3 font-medium">Lifetime ROI %</th>
                <th className="pb-3 font-medium">Last Season</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {kolBoard.map((entry) => {
                const isTop3 = entry.rank <= 3;
                const tierVariant = getTierBadgeVariant(entry.tier);

                return (
                  <tr
                    key={entry.rank}
                    className={`border-b border-white/10/50 transition-colors hover:bg-white/10/30 ${
                      entry.isCommunityKol
                        ? "border-l-4 border-l-accent"
                        : ""
                    }`}
                  >
                    <td className="py-4 pl-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-lg font-semibold ${
                            isTop3 ? "text-accent" : "text-slate-300"
                          }`}
                        >
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant={tierVariant}>{entry.tier}</Badge>
                    </td>
                    <td className="py-4">
                      <div>
                        <div className="font-semibold text-white">{entry.name}</div>
                        {entry.alias && (
                          <div className="text-xs text-neutral-400 italic">
                            "{entry.alias}"
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <code className="text-sm text-neutral-400">{entry.wallet}</code>
                    </td>
                    <td className="py-4">
                      <span className="text-lg font-bold text-green-400">
                        +{entry.lifetimeRoi.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4">
                      {entry.lastSeasonResult ? (
                        <span className="text-2xl">{entry.lastSeasonResult}</span>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="py-4">
                      {entry.isCommunityKol && (
                        <Badge variant="reward">
                          <span className="flex items-center space-x-1">
                            <span>⭐</span>
                            <span>Community KOL</span>
                          </span>
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="mt-8">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              About KOLBoard Rankings
            </h3>
            <p className="text-slate-300 mb-2">
              KOLBoard showcases the top-performing traders in the KOLSpot ecosystem.
              Rankings are based on:
            </p>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong className="text-white">Lifetime ROI:</strong> Overall trading performance across all tournaments</li>
              <li>• <strong className="text-white">Tournament Success:</strong> Placements in previous seasons</li>
              <li>• <strong className="text-white">Community Recognition:</strong> Featured KOLs with verified track records</li>
            </ul>
            <p className="text-neutral-400 mt-3 text-sm">
              Want to be featured on the KOLBoard? Join our tournaments and prove your
              trading skills!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
