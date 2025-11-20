# KOLSpot App - Project Overview

## 🎯 Project Summary

A production-ready Next.js frontend for the KOLSpot trading tournament platform. This app allows users to join Solana on-chain trading tournaments, track their performance, view live leaderboards, and discover top community KOLs.

**Live URL:** `app.kolspot.live`

---

## 📁 Project Structure

```
kolspot-app/
│
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with Navbar & Footer
│   ├── page.tsx                 # Dashboard (/) - Hero & summary cards
│   ├── globals.css              # Global styles with Tailwind
│   ├── tournaments/
│   │   └── page.tsx            # Tournaments page with tabs
│   └── kolboard/
│       └── page.tsx            # KOLBoard page
│
├── components/                   # Reusable UI components
│   ├── Navbar.tsx              # Top navigation with wallet button
│   ├── Card.tsx                # Styled card container
│   ├── Badge.tsx               # Status/tier badges
│   ├── StatCard.tsx            # Performance stat display
│   ├── Countdown.tsx           # Tournament countdown timer
│   ├── Tabs.tsx                # Tab navigation component
│   └── LeaderboardTable.tsx    # Tournament leaderboard table
│
├── lib/
│   └── api.ts                  # API client with typed functions & mock data
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── Configuration Files
│   ├── tailwind.config.ts      # Tailwind with dark + orange theme
│   ├── tsconfig.json           # TypeScript configuration
│   ├── next.config.js          # Next.js configuration
│   ├── postcss.config.js       # PostCSS for Tailwind
│   ├── package.json            # Dependencies and scripts
│   └── .env.example            # Environment variables template
│
└── Documentation
    ├── README.md               # Main documentation
    ├── SETUP.md                # Setup and deployment guide
    ├── BACKEND_INTEGRATION.md  # Backend API integration guide
    └── PROJECT_OVERVIEW.md     # This file
```

---

## 🎨 Design System

### Color Palette

```css
/* Backgrounds */
--background-primary: #02040a    /* Almost black */
--background-secondary: #05070c   /* Slightly lighter */
--background-card: #0a0d14        /* Card surfaces */

/* Accent Colors */
--accent-orange: #f97316          /* Primary orange */
--accent-orange-light: #fb923c    /* Hover state */
--accent-orange-dark: #ea580c     /* Active state */

/* Text Colors */
--text-primary: rgb(241, 245, 249)     /* White/slate-100 */
--text-secondary: rgb(203, 213, 225)   /* Slate-300 */
--text-muted: rgb(148, 163, 184)       /* Slate-400 */
```

### Component Variants

**Badge:**
- `default` - Slate background
- `success` - Green for positive states (BUY, Live, etc.)
- `danger` - Red for negative states (SELL, etc.)
- `warning` - Yellow for warnings
- `reward` - Orange for rewards and featured items

**Card:**
- `default` - Standard dark card with border
- `highlight` - Orange-accented card for emphasis

**StatCard:**
- Displays metric with optional trend indicator
- Trends: `up` (green), `down` (red), `neutral` (slate)

---

## 📄 Pages

### 1. Dashboard (`/`)

**Purpose:** Landing page with quick access and overview

**Features:**
- Hero section with KOLSpot branding
- Two primary CTA cards:
  - "Open Tournaments" → `/tournaments`
  - "View KOLBoard" → `/kolboard`
- Three summary cards:
  - Active tournament info (prize pool, participants, status)
  - My current rank (requires wallet connection)
  - Top 3 community KOLs preview

**State:** Static with mock data until wallet connected

---

### 2. Tournaments (`/tournaments`)

**Purpose:** Main tournament interface

**Features:**

**Hero Card:**
- Tournament name and season
- Subtitle/description
- Status badge (Live/Upcoming/Finished)
- Countdown timer
- Prize pool breakdown (🥇 5 SOL, 🥈 3 SOL, 🥉 1.5 SOL)
- Participant count
- Join/View Performance CTA button

**Three Tabs:**

1. **Leaderboard Tab**
   - Full tournament leaderboard table
   - Columns: Rank, Player, Wallet, ROI %, PnL (SOL), Trades, Reward
   - Top 3 rows highlighted with orange left border
   - Reward badges for top 3 (🥇, 🥈, 🥉)
   - Sortable by ROI % and PnL

2. **My Performance Tab**
   - If not connected: "Connect Wallet" message
   - If not joined: "Join Tournament" prompt
   - If joined:
     - 5 stat cards: Rank, ROI %, PnL, Trades, Win Rate
     - Performance chart placeholder
     - Recent trades table with:
       - Time, Token (with logo), Side (BUY/SELL badge)
       - Size, Entry Price, Exit/Current Price, PnL
       - "View TX" link to Solscan

3. **Rules & Info Tab**
   - How It Works
   - Scoring methodology
   - Reward structure
   - Winner logic
   - Important notes

**Data Sources:**
- `getCurrentTournament()`
- `getLeaderboard()`
- `getMyPerformance(walletAddress)`
- `getMyTrades(walletAddress)`

---

### 3. KOLBoard (`/kolboard`)

**Purpose:** Showcase top community KOLs

**Features:**
- Page header with description
- 4 stat cards: Total KOLs, Community KOLs, Legendary Tier, Active Traders
- KOLBoard table:
  - Columns: Rank, Tier, Name, Wallet, Lifetime ROI %, Last Season, Status
  - Tier badges (Legendary, Elite, Expert, Advanced)
  - Community KOL badge with orange left border
  - Last season results (🥇, 🥈, 🥉, Top 10)
- Info card explaining rankings

**Data Source:**
- `getKolBoard()`

---

## 🔌 Backend Integration

### Current State
- All API functions use **mock data**
- Ready to connect to your existing backend

### Your Backend Stack
- **Platform:** DigitalOcean Ubuntu Droplet
- **Integrations:**
  - Helius API (Solana transactions)
  - Moralis API (token prices, logos)
  - Supabase Postgres (database)

### Required Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tournaments/current` | GET | Current tournament data |
| `/api/tournaments/leaderboard` | GET | Tournament rankings |
| `/api/tournaments/me` | GET | User performance |
| `/api/tournaments/my-trades` | GET | User trade history |
| `/api/tournaments/join` | POST | Join tournament |
| `/api/kolboard/top` | GET | Top KOLs |

**See `BACKEND_INTEGRATION.md` for detailed specs**

### Integration Steps

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Uncomment `fetch()` calls in `lib/api.ts`
3. Test endpoints with browser DevTools
4. Ensure CORS is configured on backend

---

## 🚀 Getting Started

### Quick Start

```bash
cd kolspot-app
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

Visit `http://localhost:3000`

### Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.3.6"
}
```

---

## 🔐 Wallet Integration (TODO)

The app is **ready for wallet integration** but doesn't include it by default.

### To Add Wallet Support

**Install:**
```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js
```

**Update `app/layout.tsx`:**
- Wrap with `ConnectionProvider`, `WalletProvider`, `WalletModalProvider`

**Update `components/Navbar.tsx`:**
- Replace button with `<WalletMultiButton />`

**Use in Pages:**
```tsx
import { useWallet } from '@solana/wallet-adapter-react';
const { publicKey } = useWallet();
const walletAddress = publicKey?.toBase58();
```

**See `SETUP.md` for complete code examples**

---

## 📦 Deployment

### Recommended: Vercel

```bash
npm run build
vercel --prod
```

Set environment variable: `NEXT_PUBLIC_API_URL`

### Custom Domain Setup

1. Add CNAME: `app.kolspot.live` → your deployment
2. Configure SSL (automatic on Vercel/Netlify)

**See `SETUP.md` for detailed deployment guide**

---

## ✅ Features Checklist

### Design & UI
- [x] Dark theme with near-black backgrounds
- [x] Orange accent color throughout
- [x] Responsive layout (mobile-friendly)
- [x] Consistent component styling
- [x] Professional typography and spacing

### Pages
- [x] Dashboard with hero and summary cards
- [x] Tournaments page with full functionality
- [x] KOLBoard page with top KOLs
- [x] Tab navigation on tournaments page
- [x] Leaderboard with top 3 highlighting

### Components
- [x] Navbar with navigation links
- [x] Card component with variants
- [x] Badge component with color variants
- [x] StatCard for performance metrics
- [x] Countdown timer component
- [x] Tabs component with state management
- [x] LeaderboardTable with formatting

### API Integration (Mock Data)
- [x] Tournament API functions
- [x] Leaderboard API functions
- [x] User performance API functions
- [x] Trade history API functions
- [x] KOLBoard API functions
- [x] Join tournament function
- [x] TypeScript types for all data
- [x] Error handling structure

### Documentation
- [x] Main README
- [x] Setup guide
- [x] Backend integration guide
- [x] Project overview
- [x] Environment variables example

### TODO: Not Included
- [ ] Solana wallet integration (guide provided)
- [ ] Real backend API connection (ready to connect)
- [ ] WebSocket for live updates (optional)
- [ ] Chart library for performance graphs (placeholder ready)
- [ ] Error tracking (e.g., Sentry)
- [ ] Analytics (e.g., Google Analytics)

---

## 🛠️ Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

3. **Type Checking**
   ```bash
   npx tsc --noEmit
   ```

4. **Linting** (if configured)
   ```bash
   npm run lint
   ```

---

## 📊 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)
- **State:** React useState/useEffect
- **API:** Fetch API with typed functions
- **Deployment:** Vercel (recommended)

---

## 🎯 Next Steps

### Immediate
1. ✅ Review project structure
2. ✅ Read `SETUP.md`
3. ✅ Install dependencies: `npm install`
4. ✅ Set up `.env.local`
5. ✅ Run dev server: `npm run dev`

### Backend Integration
6. Read `BACKEND_INTEGRATION.md`
7. Test your backend endpoints
8. Update `lib/api.ts` with real API calls
9. Enable CORS for `app.kolspot.live`

### Wallet Integration
10. Follow wallet setup in `SETUP.md`
11. Install Solana wallet adapter packages
12. Update layout and navbar
13. Test wallet connection flow

### Deployment
14. Push code to GitHub
15. Deploy to Vercel
16. Configure custom domain `app.kolspot.live`
17. Set production environment variables

### Polish
18. Add analytics tracking
19. Set up error monitoring
20. Optimize performance
21. Test on mobile devices

---

## 📞 Support

For questions or issues:
- Check documentation files in root directory
- Review TODO comments in code
- Test API endpoints with curl/Postman
- Verify environment variables are set

---

## 📝 License

Proprietary - KOLSpot 2025

---

**Status:** ✅ Production-ready frontend, awaiting backend integration and wallet setup

**Built with:** TypeScript, Next.js 14, Tailwind CSS

**Theme:** Dark mode with orange accent (#02040a background, #f97316 accent)

**Responsive:** Yes, mobile-friendly

**Ready to deploy:** Yes, after setting `NEXT_PUBLIC_API_URL`
