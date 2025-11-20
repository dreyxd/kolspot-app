// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  season: string;
  subtitle: string;
  status: "live" | "upcoming" | "finished";
  prizePool: {
    first: number;
    second: number;
    third: number;
  };
  startDate: string;
  endDate: string;
  participants: number;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  player: string;
  wallet: string;
  roi: number; // percentage
  pnl: number; // SOL
  trades: number;
  reward?: number; // SOL for top 3
}

// My Performance Types
export interface MyPerformance {
  rank: number;
  roi: number;
  pnl: number;
  trades: number;
  winRate: number;
  hasJoined: boolean;
}

// Trade Types
export interface Trade {
  id: string;
  timestamp: string;
  token: {
    symbol: string;
    logo: string;
    address: string;
  };
  side: "BUY" | "SELL";
  size: number;
  entryPrice: number;
  exitPrice?: number;
  currentPrice?: number;
  pnl: number; // SOL
  txHash: string;
}

// KOLBoard Types
export interface KolBoardEntry {
  rank: number;
  tier: string;
  name: string;
  alias?: string;
  wallet: string;
  lifetimeRoi: number;
  lastSeasonResult?: string; // "🥇", "🥈", "🥉", "Top 10", etc.
  isCommunityKol?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
