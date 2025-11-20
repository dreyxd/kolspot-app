"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Countdown from "@/components/Countdown";
import Tabs from "@/components/Tabs";
import LeaderboardTable from "@/components/LeaderboardTable";
import StatCard from "@/components/StatCard";
import { getCurrentTournament, getLeaderboard, getMyPerformance, getMyTrades } from "@/lib/api";
import { Tournament, LeaderboardEntry, MyPerformance, Trade } from "@/types";
import { getStoredWallet } from "@/lib/wallet";

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myPerformance, setMyPerformance] = useState<MyPerformance | null>(null);
  const [myTrades, setMyTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Load wallet from localStorage
    const storedWallet = getStoredWallet();
    if (storedWallet) {
      setWalletAddress(storedWallet.publicKey);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [tournamentData, leaderboardData] = await Promise.all([
          getCurrentTournament(),
          getLeaderboard(),
        ]);
        
        setTournament(tournamentData);
        setLeaderboard(leaderboardData);

        if (walletAddress) {
          const [performanceData, tradesData] = await Promise.all([
            getMyPerformance(walletAddress),
            getMyTrades(walletAddress),
          ]);
          setMyPerformance(performanceData);
          setMyTrades(tradesData);
        }
      } catch (error) {
        console.error("Error loading tournament data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [walletAddress]);

  const tabs = [
    { id: "leaderboard", label: "Leaderboard" },
    { id: "performance", label: "My Performance" },
    { id: "rules", label: "Rules & Info" },
  ];

  const statusConfig = {
    live: { color: "success" as const, icon: "●", label: "Live" },
    upcoming: { color: "warning" as const, icon: "●", label: "Upcoming" },
    finished: { color: "danger" as const, icon: "●", label: "Finished" },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-neutral-400">Loading tournament data...</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Tournament</h3>
            <p className="text-neutral-400">Check back soon for upcoming tournaments!</p>
          </div>
        </Card>
      </div>
    );
  }

  const status = statusConfig[tournament.status];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Tournament Hero Card */}
      <Card variant="highlight" className="mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Tournament Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {tournament.name} – {tournament.season}
            </h1>
            <p className="text-slate-300 mb-6">{tournament.subtitle}</p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <Badge variant={status.color}>
                  {status.icon} {status.label}
                </Badge>
                {tournament.status === "live" && (
                  <Countdown endDate={tournament.endDate} />
                )}
              </div>
              <div className="text-sm text-neutral-400">
                {tournament.participants} participants joined
              </div>
            </div>

            <div className="mt-6">
              {myPerformance?.hasJoined ? (
                <button
                  onClick={() => setActiveTab("performance")}
                  className="rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-all hover:bg-accent-soft hover:ring-2 hover:ring-accent/50"
                >
                  View My Performance
                </button>
              ) : (
                <button className="rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-all hover:bg-accent-soft hover:ring-2 hover:ring-accent/50">
                  Join Tournament
                </button>
              )}
            </div>
          </div>

          {/* Right: Prize Pool & Rewards */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
              <div className="text-sm font-semibold text-accent mb-3">
                PRIZE POOL
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">🥇 1st Place</span>
                  <span className="text-xl font-bold text-accent">
                    {tournament.prizePool.first} SOL
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">🥈 2nd Place</span>
                  <span className="text-lg font-bold text-slate-300">
                    {tournament.prizePool.second} SOL
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">🥉 3rd Place</span>
                  <span className="text-lg font-bold text-slate-300">
                    {tournament.prizePool.third} SOL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Tournament Leaderboard</h2>
              <p className="text-neutral-400">
                Top performers ranked by ROI%. Top 3 receive SOL rewards.
              </p>
            </div>
            <LeaderboardTable entries={leaderboard} />
          </Card>
        )}

        {/* My Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            {!walletAddress || !myPerformance?.hasJoined ? (
              <Card>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {!walletAddress ? "Connect Your Wallet" : "Join Tournament"}
                  </h3>
                  <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                    {!walletAddress
                      ? "Connect your wallet and join the tournament to see your performance here."
                      : "Join the tournament to start tracking your performance."}
                  </p>
                  <button className="rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-all hover:bg-accent-soft">
                    {!walletAddress ? "Connect Wallet" : "Join Tournament"}
                  </button>
                </div>
              </Card>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <StatCard label="Current Rank" value={`#${myPerformance.rank}`} />
                  <StatCard
                    label="ROI %"
                    value={myPerformance.roi.toFixed(1)}
                    suffix="%"
                    trend="up"
                  />
                  <StatCard
                    label="PnL (SOL)"
                    value={myPerformance.pnl.toFixed(2)}
                    trend={myPerformance.pnl > 0 ? "up" : "down"}
                  />
                  <StatCard label="Trades" value={myPerformance.trades} />
                  <StatCard
                    label="Win Rate"
                    value={myPerformance.winRate.toFixed(1)}
                    suffix="%"
                    trend={myPerformance.winRate > 50 ? "up" : "down"}
                  />
                </div>

                {/* Performance Chart Placeholder */}
                <Card>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Performance Over Time
                  </h3>
                  <div className="h-64 rounded-lg border border-white/10 bg-background/50 flex items-center justify-center">
                    <div className="text-neutral-500 text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <div>Chart will be integrated here</div>
                      <div className="text-sm mt-1">
                        (Connect to backend for historical performance data)
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recent Trades */}
                <Card>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 text-left text-sm text-neutral-400">
                          <th className="pb-3 font-medium">Time</th>
                          <th className="pb-3 font-medium">Token</th>
                          <th className="pb-3 font-medium">Side</th>
                          <th className="pb-3 font-medium">Size</th>
                          <th className="pb-3 font-medium">Entry Price</th>
                          <th className="pb-3 font-medium">Exit/Current</th>
                          <th className="pb-3 font-medium">PnL (SOL)</th>
                          <th className="pb-3 font-medium">TX</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myTrades.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text-neutral-400">
                              No trades yet. Start trading to see your activity here!
                            </td>
                          </tr>
                        ) : (
                          myTrades.map((trade) => (
                          <tr
                            key={trade.id}
                            className="border-b border-white/10/50 hover:bg-white/10/30"
                          >
                            <td className="py-3 text-sm text-neutral-400">
                              {new Date(trade.timestamp).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              {new Date(trade.timestamp).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={trade.token.logo}
                                  alt={trade.token.symbol}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span className="font-medium text-white">
                                  {trade.token.symbol}
                                </span>
                              </div>
                            </td>
                            <td className="py-3">
                              <Badge
                                variant={trade.side === "BUY" ? "success" : "danger"}
                              >
                                {trade.side}
                              </Badge>
                            </td>
                            <td className="py-3 text-slate-300">{trade.size}</td>
                            <td className="py-3 text-slate-300">
                              ${trade.entryPrice.toFixed(4)}
                            </td>
                            <td className="py-3 text-slate-300">
                              ${(trade.exitPrice || trade.currentPrice || 0).toFixed(4)}
                            </td>
                            <td className="py-3">
                              <span
                                className={`font-semibold ${
                                  trade.pnl > 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {trade.pnl > 0 ? "+" : ""}
                                {trade.pnl.toFixed(2)}
                              </span>
                            </td>
                            <td className="py-3">
                              <a
                                href={`https://solscan.io/tx/${trade.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-accent-soft text-sm"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Rules & Info Tab */}
        {activeTab === "rules" && (
          <Card>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tournament Rules & Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      • Connect your Solana wallet and join the tournament before it ends
                    </li>
                    <li>
                      • Make real trades on Solana DEXs with your connected wallet
                    </li>
                    <li>
                      • Your trades are automatically tracked via Helius API integration
                    </li>
                    <li>
                      • Leaderboard updates in real-time based on your performance
                    </li>
                    <li>• Top 3 traders by ROI % win SOL rewards at the end</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Scoring</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      • <strong className="text-white">Primary metric:</strong> ROI % (Return on
                      Investment)
                    </li>
                    <li>
                      • <strong className="text-white">Tiebreaker:</strong> Total PnL in SOL
                    </li>
                    <li>
                      • Only trades made during the tournament period count
                    </li>
                    <li>• Minimum trade size and activity requirements may apply</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Rewards</h3>
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">
                          🥇 1st Place
                        </span>
                        <span className="text-2xl font-bold text-accent">
                          5 SOL
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">
                          🥈 2nd Place
                        </span>
                        <span className="text-xl font-bold text-slate-300">3 SOL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">
                          🥉 3rd Place
                        </span>
                        <span className="text-xl font-bold text-slate-300">
                          1.5 SOL
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      • Rewards are paid in SOL from KOLSpot creator-fee revenue
                    </li>
                    <li>
                      • Only wallets that join the tournament before it ends are eligible
                    </li>
                    <li>
                      • Performance is ranked primarily by ROI %, then by total PnL (SOL) as a
                      tiebreaker
                    </li>
                    <li>
                      • At the end of the season, the top 3 wallets by ROI % are declared
                      winners and receive 5 / 3 / 1.5 SOL respectively
                    </li>
                    <li>• Rewards are sent to the same wallet used to join</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Important Notes</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Tournament duration: Check the countdown timer above</li>
                    <li>• Fair play is enforced - suspicious activity will be investigated</li>
                    <li>
                      • KOLSpot reserves the right to disqualify participants who violate terms
                    </li>
                    <li>• Join our Discord/Telegram for updates and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Tabs>
    </div>
  );
}
