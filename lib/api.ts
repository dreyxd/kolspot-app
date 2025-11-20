import {
  Tournament,
  LeaderboardEntry,
  MyPerformance,
  Trade,
  KolBoardEntry,
  ApiResponse,
} from "@/types";

// TODO: Replace with actual backend API URL
// Backend is running on Ubuntu Droplet (DigitalOcean)
// Backend already integrates: Helius API, Moralis API, Supabase Postgres
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kolspot.live";

// ==========================================
// MOCK DATA (Remove when connecting to real backend)
// ==========================================

const mockTournament: Tournament = {
  id: "season-01",
  name: "1 SOL Challenge",
  season: "Season 01",
  subtitle: "Compete using your real Solana trades. Top 3 win rewards funded by KOLSpot creator fees.",
  status: "live",
  prizePool: {
    first: 5,
    second: 3,
    third: 1.5,
  },
  startDate: "2025-11-15T00:00:00Z",
  endDate: "2025-12-15T23:59:59Z",
  participants: 147,
};

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    player: "CryptoWhale",
    wallet: "9XqR...k3mP",
    roi: 847.3,
    pnl: 8.47,
    trades: 23,
    reward: 5,
  },
  {
    rank: 2,
    player: "SolanaKing",
    wallet: "7vNm...p9Kw",
    roi: 612.8,
    pnl: 6.13,
    trades: 31,
    reward: 3,
  },
  {
    rank: 3,
    player: "MoonShot",
    wallet: "4tQx...r2Vb",
    roi: 498.5,
    pnl: 4.99,
    trades: 19,
    reward: 1.5,
  },
  {
    rank: 4,
    player: "DiamondHands",
    wallet: "2pLk...m8Hy",
    roi: 387.2,
    pnl: 3.87,
    trades: 27,
  },
  {
    rank: 5,
    player: "TradeGuru",
    wallet: "8wBn...q5Rt",
    roi: 324.6,
    pnl: 3.25,
    trades: 42,
  },
  {
    rank: 6,
    player: "HODLMaster",
    wallet: "5yKp...t7Nm",
    roi: 289.4,
    pnl: 2.89,
    trades: 18,
  },
  {
    rank: 7,
    player: "AlphaSeekerr",
    wallet: "3mWv...k9Bp",
    roi: 251.7,
    pnl: 2.52,
    trades: 35,
  },
  {
    rank: 8,
    player: "DeFiWarrior",
    wallet: "6nRx...p3Qw",
    roi: 218.9,
    pnl: 2.19,
    trades: 29,
  },
  {
    rank: 9,
    player: "PumpFinder",
    wallet: "1kTy...m6Lv",
    roi: 194.3,
    pnl: 1.94,
    trades: 21,
  },
  {
    rank: 10,
    player: "ChartMaster",
    wallet: "9hZx...r4Kp",
    roi: 176.5,
    pnl: 1.77,
    trades: 33,
  },
];

const mockMyPerformance: MyPerformance = {
  rank: 12,
  roi: 158.3,
  pnl: 1.58,
  trades: 15,
  winRate: 73.3,
  hasJoined: true,
};

const mockMyTrades: Trade[] = [
  {
    id: "1",
    timestamp: "2025-11-19T14:32:00Z",
    token: {
      symbol: "BONK",
      logo: "https://assets.coingecko.com/coins/images/28600/small/bonk.jpg",
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    },
    side: "SELL",
    size: 1500000,
    entryPrice: 0.00002341,
    exitPrice: 0.00003127,
    pnl: 0.12,
    txHash: "5Qk...mP9",
  },
  {
    id: "2",
    timestamp: "2025-11-19T11:15:00Z",
    token: {
      symbol: "WIF",
      logo: "https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg",
      address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    },
    side: "BUY",
    size: 45,
    entryPrice: 2.134,
    currentPrice: 2.287,
    pnl: 0.07,
    txHash: "7Nm...k4R",
  },
  {
    id: "3",
    timestamp: "2025-11-18T16:45:00Z",
    token: {
      symbol: "POPCAT",
      logo: "https://assets.coingecko.com/coins/images/39402/small/popcat.png",
      address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    },
    side: "SELL",
    size: 120,
    entryPrice: 1.523,
    exitPrice: 1.889,
    pnl: 0.44,
    txHash: "2Vb...p7L",
  },
  {
    id: "4",
    timestamp: "2025-11-18T09:20:00Z",
    token: {
      symbol: "JTO",
      logo: "https://assets.coingecko.com/coins/images/33853/small/jito.png",
      address: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
    },
    side: "BUY",
    size: 25,
    entryPrice: 3.421,
    currentPrice: 3.156,
    pnl: -0.07,
    txHash: "9Kw...r3M",
  },
  {
    id: "5",
    timestamp: "2025-11-17T13:10:00Z",
    token: {
      symbol: "PYTH",
      logo: "https://assets.coingecko.com/coins/images/31385/small/pyth.png",
      address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
    },
    side: "SELL",
    size: 850,
    entryPrice: 0.387,
    exitPrice: 0.512,
    pnl: 0.11,
    txHash: "4Ty...m8Q",
  },
];

const mockKolBoard: KolBoardEntry[] = [
  {
    rank: 1,
    tier: "Legendary",
    name: "AlphaSeeker",
    alias: "The Oracle",
    wallet: "9XqR...k3mP",
    lifetimeRoi: 1247.8,
    lastSeasonResult: "🥇",
    isCommunityKol: true,
  },
  {
    rank: 2,
    tier: "Legendary",
    name: "CryptoWhale",
    wallet: "7vNm...p9Kw",
    lifetimeRoi: 1089.3,
    lastSeasonResult: "🥈",
    isCommunityKol: true,
  },
  {
    rank: 3,
    tier: "Elite",
    name: "SolanaKing",
    wallet: "4tQx...r2Vb",
    lifetimeRoi: 923.5,
    lastSeasonResult: "🥉",
    isCommunityKol: true,
  },
  {
    rank: 4,
    tier: "Elite",
    name: "MoonShot",
    wallet: "2pLk...m8Hy",
    lifetimeRoi: 847.2,
    lastSeasonResult: "Top 10",
  },
  {
    rank: 5,
    tier: "Elite",
    name: "DiamondHands",
    wallet: "8wBn...q5Rt",
    lifetimeRoi: 789.6,
    lastSeasonResult: "Top 10",
  },
  {
    rank: 6,
    tier: "Expert",
    name: "TradeGuru",
    wallet: "5yKp...t7Nm",
    lifetimeRoi: 712.4,
    lastSeasonResult: "Top 10",
  },
  {
    rank: 7,
    tier: "Expert",
    name: "HODLMaster",
    wallet: "3mWv...k9Bp",
    lifetimeRoi: 654.8,
    lastSeasonResult: "Top 10",
  },
  {
    rank: 8,
    tier: "Expert",
    name: "AlphaSeekerr",
    wallet: "6nRx...p3Qw",
    lifetimeRoi: 598.3,
  },
  {
    rank: 9,
    tier: "Advanced",
    name: "DeFiWarrior",
    wallet: "1kTy...m6Lv",
    lifetimeRoi: 541.7,
  },
  {
    rank: 10,
    tier: "Advanced",
    name: "PumpFinder",
    wallet: "9hZx...r4Kp",
    lifetimeRoi: 489.2,
  },
];

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * Get current active tournament
 * TODO: Connect to backend endpoint: GET /api/tournaments/current
 */
export async function getCurrentTournament(): Promise<Tournament> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tournaments/current`);
    if (!response.ok) throw new Error("Failed to fetch tournament");
    const data: ApiResponse<Tournament> = await response.json();
    return data.data;

    // Mock delay to simulate API call (commented out)
    // await new Promise((resolve) => setTimeout(resolve, 100));
    // return mockTournament;
  } catch (error) {
    console.error("Error fetching tournament:", error);
    throw error;
  }
}

/**
 * Get tournament leaderboard
 * TODO: Connect to backend endpoint: GET /api/tournaments/leaderboard
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tournaments/leaderboard`);
    if (!response.ok) throw new Error("Failed to fetch leaderboard");
    const data: ApiResponse<LeaderboardEntry[]> = await response.json();
    return data.data;

    // await new Promise((resolve) => setTimeout(resolve, 100));
    // return mockLeaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}

/**
 * Get user's performance in current tournament
 * TODO: Connect to backend endpoint: GET /api/tournaments/me
 * @param walletAddress - User's Solana wallet address
 */
export async function getMyPerformance(
  walletAddress?: string
): Promise<MyPerformance | null> {
  try {
    if (!walletAddress) return null;

    const response = await fetch(
      `${API_BASE_URL}/api/tournaments/me?wallet=${walletAddress}`
    );
    if (!response.ok) throw new Error("Failed to fetch performance");
    const data: ApiResponse<MyPerformance> = await response.json();
    return data.data;

    // await new Promise((resolve) => setTimeout(resolve, 100));
    // return mockMyPerformance;
  } catch (error) {
    console.error("Error fetching my performance:", error);
    throw error;
  }
}

/**
 * Get user's trades in current tournament
 * TODO: Connect to backend endpoint: GET /api/tournaments/my-trades
 * @param walletAddress - User's Solana wallet address
 */
export async function getMyTrades(walletAddress?: string): Promise<Trade[]> {
  try {
    if (!walletAddress) return [];

    const response = await fetch(
      `${API_BASE_URL}/api/tournaments/my-trades?wallet=${walletAddress}`
    );
    if (!response.ok) throw new Error("Failed to fetch trades");
    const data: ApiResponse<Trade[]> = await response.json();
    return data.data;

    // await new Promise((resolve) => setTimeout(resolve, 100));
    // return mockMyTrades;
  } catch (error) {
    console.error("Error fetching my trades:", error);
    throw error;
  }
}

/**
 * Get KOLBoard top performers
 * TODO: Connect to backend endpoint: GET /api/kolboard/top
 */
export async function getKolBoard(): Promise<KolBoardEntry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kolboard/top`);
    if (!response.ok) throw new Error("Failed to fetch KOLBoard");
    const data: ApiResponse<KolBoardEntry[]> = await response.json();
    return data.data;

    // await new Promise((resolve) => setTimeout(resolve, 100));
    // return mockKolBoard;
  } catch (error) {
    console.error("Error fetching KOLBoard:", error);
    throw error;
  }
}

/**
 * Join tournament
 * TODO: Connect to backend endpoint: POST /api/tournaments/join
 * @param walletAddress - User's Solana wallet address
 */
export async function joinTournament(walletAddress: string): Promise<boolean> {
  try {
    console.log('Attempting to join tournament with wallet:', walletAddress);
    console.log('API URL:', `${API_BASE_URL}/api/tournaments/join`);
    
    const response = await fetch(`${API_BASE_URL}/api/tournaments/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletAddress }),
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to join tournament: ${response.status} ${errorText}`);
    }
    
    const data: ApiResponse<{ success: boolean }> = await response.json();
    console.log('Join tournament response:', data);
    return data.data.success;

    // await new Promise((resolve) => setTimeout(resolve, 100));
    // console.log("Joining tournament with wallet:", walletAddress);
    // return true;
  } catch (error) {
    console.error("Error joining tournament:", error);
    throw error;
  }
}
