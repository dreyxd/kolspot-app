# KOLSpot App - Frontend

A clean, production-ready Next.js frontend for the KOLSpot trading tournament platform.

## Features

- 🎨 **Dark Theme** - Almost black background (#02040a - #05070c) with orange accent (#f97316)
- 🏆 **Tournament System** - Join on-chain Solana trading tournaments
- 📊 **Live Leaderboard** - Real-time rankings by ROI%
- 👤 **Performance Tracking** - Track your trades, PnL, and statistics
- ⭐ **KOLBoard** - View top community KOLs and their lifetime performance

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend Integration:** REST API (existing backend on DigitalOcean)

## Getting Started

### Prerequisites

- Node.js 18+ or compatible runtime
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
kolspot-app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Navbar
│   ├── page.tsx             # Dashboard (/)
│   ├── tournaments/         # Tournaments page
│   └── kolboard/            # KOLBoard page
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── StatCard.tsx
│   ├── Countdown.tsx
│   ├── Tabs.tsx
│   └── LeaderboardTable.tsx
├── lib/                     # API and utilities
│   └── api.ts              # Typed API functions with mock data
├── types/                   # TypeScript type definitions
│   └── index.ts
└── tailwind.config.ts       # Tailwind configuration
```

## Pages

### Dashboard (`/`)
- Hero section with KOLSpot branding
- Quick links to Tournaments and KOLBoard
- Summary cards showing active tournament, user rank, and top KOLs

### Tournaments (`/tournaments`)
- Tournament hero card with prize pool and countdown
- Three tabs: Leaderboard, My Performance, Rules & Info
- Live leaderboard with top 3 highlighting
- Personal performance tracking with stats and trade history
- Detailed tournament rules and reward structure

### KOLBoard (`/kolboard`)
- Top community KOLs ranked by lifetime ROI
- Tier-based badges (Legendary, Elite, Expert, Advanced)
- Last season results and community KOL status

## Backend Integration

The frontend is designed to consume existing backend APIs. Current mock functions in `lib/api.ts` need to be connected to:

- `GET /api/tournaments/current` - Current tournament data
- `GET /api/tournaments/leaderboard` - Tournament leaderboard
- `GET /api/tournaments/me` - User's performance
- `GET /api/tournaments/my-trades` - User's trade history
- `GET /api/kolboard/top` - Top KOLs
- `POST /api/tournaments/join` - Join tournament

The backend already integrates:
- **Helius API** - Solana transactions and wallet activity
- **Moralis API** - Token prices, logos, 24h change
- **Supabase Postgres** - Database for seasons, participants, trades, leaderboard

## TODO: Wallet Integration

To enable full functionality, integrate a Solana wallet adapter:

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

Update `app/layout.tsx` to wrap the app with wallet providers.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Environment Variables

Set these in your deployment platform:

- `NEXT_PUBLIC_API_URL` - Your backend API URL

## Design System

### Colors

- **Background Primary:** `#02040a`
- **Background Secondary:** `#05070c`
- **Background Card:** `#0a0d14`
- **Accent Orange:** `#f97316`
- **Accent Orange Light:** `#fb923c`
- **Accent Orange Dark:** `#ea580c`

### Component Variants

- **Badge:** default, success, danger, warning, reward
- **Card:** default, highlight
- **StatCard:** Displays metric with optional trend indicator

## Contributing

This is a production frontend. Make sure to:

1. Keep the dark + orange theme consistent
2. Use TypeScript with proper types
3. Follow the existing component structure
4. Add TODO comments where backend integration is needed

## License

Proprietary - KOLSpot 2025
