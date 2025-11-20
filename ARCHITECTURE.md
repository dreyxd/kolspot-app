# KOLSpot App - Architecture Diagram

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                            │
│                   app.kolspot.live                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Next.js Frontend                             │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ Dashboard  │  │Tournaments │  │  KOLBoard  │           │
│  │    (/)     │  │(/tournaments)│ │(/kolboard) │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │         Shared Components                    │          │
│  │  Navbar, Card, Badge, Tabs, Tables, etc.    │          │
│  └──────────────────────────────────────────────┘          │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │         API Layer (lib/api.ts)               │          │
│  │  - getCurrentTournament()                     │          │
│  │  - getLeaderboard()                          │          │
│  │  - getMyPerformance()                        │          │
│  │  - getMyTrades()                             │          │
│  │  - getKolBoard()                             │          │
│  │  - joinTournament()                          │          │
│  └──────────────────────────────────────────────┘          │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │ (fetch API)
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│             Your Backend API                                 │
│         (DigitalOcean Ubuntu Droplet)                       │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │  API Endpoints                               │          │
│  │  - GET  /api/tournaments/current             │          │
│  │  - GET  /api/tournaments/leaderboard         │          │
│  │  - GET  /api/tournaments/me                  │          │
│  │  - GET  /api/tournaments/my-trades           │          │
│  │  - POST /api/tournaments/join                │          │
│  │  - GET  /api/kolboard/top                    │          │
│  └──────────────────────────────────────────────┘          │
│                       │                                      │
│  ┌──────────────┬─────┴────────┬──────────────┐           │
│  │              │              │              │            │
│  ▼              ▼              ▼              ▼            │
│  Helius      Moralis      Supabase      Custom             │
│  API          API         Postgres       Logic             │
│  (Solana)  (Token Data)  (Database)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
kolspot-app/
│
├── 📱 Pages (App Router)
│   ├── app/
│   │   ├── layout.tsx              # Root: Navbar + Footer
│   │   ├── page.tsx                # Dashboard
│   │   ├── globals.css             # Global styles
│   │   │
│   │   ├── tournaments/
│   │   │   └── page.tsx           # Full tournament UI
│   │   │
│   │   └── kolboard/
│   │       └── page.tsx           # Top KOLs
│   │
├── 🎨 Components
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation
│   │   ├── Card.tsx                # Container
│   │   ├── Badge.tsx               # Status pills
│   │   ├── StatCard.tsx            # Metrics
│   │   ├── Countdown.tsx           # Timer
│   │   ├── Tabs.tsx                # Tab navigation
│   │   └── LeaderboardTable.tsx    # Rankings
│   │
├── 🔌 API Layer
│   ├── lib/
│   │   └── api.ts                  # Backend integration
│   │
├── 📝 Types
│   ├── types/
│   │   └── index.ts                # TypeScript definitions
│   │
├── ⚙️ Configuration
│   ├── tailwind.config.ts          # Styling config
│   ├── tsconfig.json               # TypeScript
│   ├── next.config.js              # Next.js
│   ├── postcss.config.js           # PostCSS
│   ├── package.json                # Dependencies
│   ├── .env.example                # Environment template
│   └── .gitignore                  # Git ignore
│
└── 📚 Documentation
    ├── README.md                    # Main docs
    ├── SETUP.md                     # Setup guide
    ├── BACKEND_INTEGRATION.md       # API specs
    ├── PROJECT_OVERVIEW.md          # Architecture
    ├── QUICKSTART.md                # Commands
    ├── DELIVERY.md                  # Summary
    └── ARCHITECTURE.md              # This file
```

## 🔄 Data Flow

### Tournament Leaderboard Flow

```
User visits /tournaments
         │
         ▼
TournamentsPage component loads
         │
         ├──► useEffect triggers
         │
         ├──► getCurrentTournament() ──┐
         │                             │
         └──► getLeaderboard() ────────┤
                                       │
                                       ▼
                           fetch → Backend API
                                       │
                                       ├─► Helius (transaction data)
                                       ├─► Moralis (token prices)
                                       └─► Supabase (stored rankings)
                                       │
                                       ▼
                              Response (JSON)
                                       │
                                       ▼
                           Update React state
                                       │
                                       ▼
                           Render LeaderboardTable
                                       │
                                       ▼
                           Top 3 highlighted
                           with orange border
```

### User Performance Flow

```
User connects wallet
         │
         ▼
Wallet adapter provides publicKey
         │
         ▼
walletAddress = publicKey.toBase58()
         │
         ▼
getMyPerformance(walletAddress) ──┐
                                   │
getMyTrades(walletAddress) ────────┤
                                   │
                                   ▼
                       fetch → Backend API
                                   │
                                   ├─► Query Supabase for user stats
                                   ├─► Fetch Helius for trade history
                                   └─► Calculate ROI, PnL, Win Rate
                                   │
                                   ▼
                          Response (JSON)
                                   │
                                   ▼
                      Update React state
                                   │
                                   ▼
                      Render StatCards + Trades Table
```

## 🎨 Component Hierarchy

```
App Layout
│
├── Navbar
│   ├── Logo (Link to /)
│   ├── Nav Links (Dashboard, Tournaments, KOLBoard)
│   └── Connect Wallet Button
│
├── Page Content
│   │
│   ├── Dashboard (/)
│   │   ├── Hero Section
│   │   │   ├── Title + Subtitle
│   │   │   └── 2x Card (CTAs)
│   │   │       ├── Open Tournaments
│   │   │       └── View KOLBoard
│   │   │
│   │   └── Summary Section
│   │       └── 3x Card
│   │           ├── Active Tournament
│   │           ├── My Rank
│   │           └── Top KOLs
│   │
│   ├── Tournaments (/tournaments)
│   │   ├── Card (Tournament Hero)
│   │   │   ├── Left: Info + CTA
│   │   │   └── Right: Prize Pool
│   │   │
│   │   └── Tabs Component
│   │       ├── Tab 1: Leaderboard
│   │       │   └── Card
│   │       │       └── LeaderboardTable
│   │       │
│   │       ├── Tab 2: My Performance
│   │       │   ├── 5x StatCard
│   │       │   ├── Card (Chart placeholder)
│   │       │   └── Card (Trades Table)
│   │       │
│   │       └── Tab 3: Rules & Info
│   │           └── Card (Rich text)
│   │
│   └── KOLBoard (/kolboard)
│       ├── Header
│       ├── 4x Card (Stats)
│       ├── Card (KOLBoard Table)
│       └── Card (Info)
│
└── Footer
    ├── Copyright
    └── Links
```

## 🔐 Authentication Flow (Optional - Not Yet Implemented)

```
User clicks "Connect Wallet"
         │
         ▼
Wallet Modal appears
(Phantom, Solflare, etc.)
         │
         ▼
User approves connection
         │
         ▼
Wallet adapter provides:
- publicKey
- signMessage()
- signTransaction()
         │
         ▼
Frontend stores wallet state
         │
         ├──► Update Navbar (show address)
         ├──► Enable "Join Tournament"
         ├──► Load user performance data
         └──► Enable trade tracking
```

## 🌐 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                   DNS                            │
│         app.kolspot.live (CNAME)                │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│              Vercel Edge Network                 │
│          (CDN + SSL + Global Routing)           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│           Next.js Serverless Functions          │
│              (SSR + API Routes)                 │
└────────────────┬────────────────────────────────┘
                 │
                 │ API Calls
                 ▼
┌─────────────────────────────────────────────────┐
│         DigitalOcean Ubuntu Droplet             │
│              Your Backend API                    │
│                                                  │
│    ┌──────────────────────────────────┐        │
│    │  Express.js / Node.js Server     │        │
│    └──────────┬───────────────────────┘        │
│               │                                  │
│    ┌──────────┼───────────┬──────────┐        │
│    ▼          ▼           ▼          ▼         │
│  Helius   Moralis    Supabase   Custom         │
│    API       API      Postgres    Logic        │
└─────────────────────────────────────────────────┘
```

## 📊 State Management

```
Component State (useState)
├── activeTab (Tournaments page)
├── tournament (Tournament data)
├── leaderboard (Rankings array)
├── myPerformance (User stats)
├── myTrades (Trade history)
├── kolBoard (Top KOLs)
└── isLoading (Loading states)

No global state management needed
(Redux, Zustand, etc. not required)

Data fetching via useEffect on component mount
```

## 🎨 Styling Architecture

```
Tailwind CSS
│
├── Global Classes (globals.css)
│   ├── Base layer
│   ├── Body styles
│   └── Utility classes
│
├── Custom Theme (tailwind.config.ts)
│   ├── Colors
│   │   ├── background-primary (#02040a)
│   │   ├── background-secondary (#05070c)
│   │   ├── background-card (#0a0d14)
│   │   └── accent-orange (#f97316)
│   │
│   └── Extended utilities
│
└── Component Styles
    ├── Inline className props
    └── Variant-based styling
        ├── Badge variants (success, danger, etc.)
        └── Card variants (default, highlight)
```

## 🔄 Update Flow

```
Code Changes
     │
     ▼
Git commit & push
     │
     ▼
Vercel detects push
     │
     ▼
Automatic build
     │
     ├─► Install dependencies
     ├─► TypeScript check
     ├─► Next.js build
     └─► Optimize assets
     │
     ▼
Deploy to edge network
     │
     ▼
Live at app.kolspot.live
(typically < 2 minutes)
```

## 🧩 Integration Points

### Frontend → Backend
- HTTP REST API (fetch)
- JSON request/response
- CORS enabled
- Optional JWT auth

### Backend → External APIs
- Helius: WebSocket + REST for Solana data
- Moralis: REST for token metadata
- Supabase: PostgreSQL queries

### Frontend → Wallet
- Solana Wallet Adapter
- Connect/disconnect
- Sign messages
- Sign transactions

## 📈 Performance Optimizations

```
Next.js Features Used:
├── App Router (faster than Pages Router)
├── Server Components (where possible)
├── Image Optimization (configured)
├── Font Optimization (Inter from Google)
└── Automatic Code Splitting

Tailwind Optimizations:
├── PurgeCSS (removes unused styles)
├── Minification in production
└── Small bundle size

React Optimizations:
├── Minimal re-renders
├── Efficient state updates
└── Component memoization (where needed)
```

---

## 🎯 Summary

**Architecture Type:** JAMstack (JavaScript, APIs, Markup)

**Frontend:** Next.js 14 + React + TypeScript  
**Styling:** Tailwind CSS  
**Backend:** Your existing Express API on DigitalOcean  
**Database:** Supabase Postgres  
**External APIs:** Helius, Moralis  
**Deployment:** Vercel Edge Network  
**Domain:** app.kolspot.live  

**Status:** ✅ Ready for Integration & Deployment
