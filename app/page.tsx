"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { getStoredWallet } from "@/lib/wallet";
import { getMyPerformance, getCurrentTournament, getKolBoard } from "@/lib/api";

export default function Home() {
  const [wallet, setWallet] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [tournament, setTournament] = useState<any>(null);
  const [topKols, setTopKols] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const storedWallet = getStoredWallet();
      setWallet(storedWallet);

      try {
        // Load tournament data
        const tournamentData = await getCurrentTournament();
        setTournament(tournamentData);

        // Load top KOLs
        const kolData = await getKolBoard();
        setTopKols(kolData.slice(0, 3)); // Get top 3 KOLs

        // Load performance data if wallet exists
        if (storedWallet) {
          const perfData = await getMyPerformance(storedWallet.publicKey);
          setPerformance(perfData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">KOLSpot App</span>
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-12">
          Track KOLs, join on-chain trading tournaments, and climb the leaderboard using your real Solana trades.
        </p>
        
        {/* Primary CTAs */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link href="/tournaments">
            <Card variant="highlight" className="cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-accent-orange/50">
              <div className="text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Open Tournaments</h3>
                <p className="text-slate-400">
                  Compete in live tournaments and win SOL rewards
                </p>
              </div>
            </Card>
          </Link>
          
          <Link href="/kolboard">
            <Card variant="highlight" className="cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-accent-orange/50">
              <div className="text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="text-xl font-bold text-white mb-2">View KOLBoard</h3>
                <p className="text-slate-400">
                  See top community KOLs and their performance
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Active Tournament */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Tournament</h3>
            <Badge variant="success">● Live</Badge>
          </div>
          {isLoading ? (
            <div className="text-center py-4 text-neutral-400">Loading...</div>
          ) : tournament ? (
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-accent-text mb-1">{tournament.name}</div>
                <div className="text-sm text-neutral-400">{tournament.description}</div>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="text-sm text-neutral-400 mb-1">Prize Pool</div>
                <div className="text-lg font-semibold text-accent-text">{tournament.prize_pool} SOL</div>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="text-sm text-neutral-400 mb-1">Participants</div>
                <div className="text-lg font-semibold text-white">{tournament.participant_count || 0} traders</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No active tournament
            </div>
          )}
        </Card>

        {/* My Rank */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">My Current Rank</h3>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-slate-400">Loading...</div>
          ) : wallet && performance ? (
            <div className="space-y-3">
              <div className="text-center pb-3 border-b border-white/10">
                <div className="text-3xl font-bold text-accent-text mb-1">#{performance.rank || 'N/A'}</div>
                <div className="text-sm text-neutral-400">Current Rank</div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">Total PnL</div>
                <div className={`text-lg font-semibold ${performance.total_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {performance.total_pnl >= 0 ? '+' : ''}{performance.total_pnl?.toFixed(4) || '0.0000'} SOL
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">Current Balance</div>
                <div className="text-lg font-semibold text-white">
                  {performance.current_balance?.toFixed(4) || '0.0000'} SOL
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">ROI</div>
                <div className={`text-lg font-semibold ${performance.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {performance.roi >= 0 ? '+' : ''}{performance.roi?.toFixed(2) || '0.00'}%
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-sm text-neutral-400 mb-2">Create a wallet to see your stats</div>
              <div className="text-xs text-neutral-500 mt-2">
                Click "Create Wallet" in the navigation
              </div>
            </div>
          )}
        </Card>

        {/* Top Community KOLs */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Top Community KOLs</h3>
            <Badge variant="reward">Featured</Badge>
          </div>
          {isLoading ? (
            <div className="text-center py-4 text-neutral-400">Loading...</div>
          ) : topKols.length > 0 ? (
            <>
              <div className="space-y-3">
                {topKols.map((kol, index) => (
                  <div key={kol.rank} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{kol.name}</div>
                      <div className="text-xs text-neutral-400">{kol.tier}</div>
                    </div>
                    <div className="text-sm font-semibold text-green-400">+{kol.lifetimeRoi.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
              <Link href="/kolboard" className="block mt-4 text-center text-sm text-accent-light hover:text-accent-text">
                View Full KOLBoard →
              </Link>
            </>
          ) : (
            <div className="text-center py-4 text-neutral-400">
              No KOL data available yet
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
