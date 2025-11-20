# Backend Integration Guide

This document explains how to connect the KOLSpot frontend to your existing backend APIs.

## Overview

Your backend (running on DigitalOcean Ubuntu Droplet) already integrates:
- **Helius API** - Solana wallet activity and transactions
- **Moralis API** - Token prices, logos, 24h price changes
- **Supabase Postgres** - Database for seasons, participants, trades, leaderboard

The frontend is designed to consume these APIs through a clean, typed interface.

---

## API Client Location

All API calls are centralized in: **`lib/api.ts`**

Currently uses **mock data** for development. To connect to real backend:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Uncomment the `fetch()` calls in each function
3. Comment out or remove the mock data returns

---

## Required Backend Endpoints

### 1. Get Current Tournament

**Endpoint:** `GET /api/tournaments/current`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "season-01",
    "name": "1 SOL Challenge",
    "season": "Season 01",
    "subtitle": "Compete using your real Solana trades...",
    "status": "live",  // "live" | "upcoming" | "finished"
    "prizePool": {
      "first": 5,
      "second": 3,
      "third": 1.5
    },
    "startDate": "2025-11-15T00:00:00Z",
    "endDate": "2025-12-15T23:59:59Z",
    "participants": 147
  }
}
```

**Frontend Usage:**
- Tournament hero card on `/tournaments`
- Dashboard summary card on `/`

---

### 2. Get Tournament Leaderboard

**Endpoint:** `GET /api/tournaments/leaderboard`

**Query Parameters:**
- `tournamentId` (optional) - defaults to current tournament
- `limit` (optional) - number of entries to return

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "player": "CryptoWhale",  // username or ENS
      "wallet": "9XqR...k3mP",  // shortened wallet address
      "roi": 847.3,  // percentage
      "pnl": 8.47,  // SOL
      "trades": 23,
      "reward": 5  // SOL (only for top 3)
    },
    // ... more entries
  ]
}
```

**Frontend Usage:**
- Leaderboard tab on `/tournaments`

**Sorting:**
- Primary: `roi` (descending)
- Tiebreaker: `pnl` (descending)

---

### 3. Get User Performance

**Endpoint:** `GET /api/tournaments/me`

**Query Parameters:**
- `wallet` (required) - user's Solana wallet address

**Response:**
```json
{
  "success": true,
  "data": {
    "rank": 12,
    "roi": 158.3,
    "pnl": 1.58,
    "trades": 15,
    "winRate": 73.3,  // percentage
    "hasJoined": true
  }
}
```

**Error Response (not joined):**
```json
{
  "success": false,
  "error": "User has not joined tournament",
  "data": {
    "hasJoined": false
  }
}
```

**Frontend Usage:**
- My Performance tab on `/tournaments`
- Dashboard "My Rank" card

---

### 4. Get User Trades

**Endpoint:** `GET /api/tournaments/my-trades`

**Query Parameters:**
- `wallet` (required) - user's Solana wallet address
- `limit` (optional) - default 50

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "trade_123",
      "timestamp": "2025-11-19T14:32:00Z",
      "token": {
        "symbol": "BONK",
        "logo": "https://...",
        "address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
      },
      "side": "BUY",  // "BUY" | "SELL"
      "size": 1500000,
      "entryPrice": 0.00002341,
      "exitPrice": 0.00003127,  // null if still open
      "currentPrice": null,  // null if closed, current if open
      "pnl": 0.12,  // SOL
      "txHash": "5Qk...mP9"
    },
    // ... more trades
  ]
}
```

**Frontend Usage:**
- Recent Trades table in My Performance tab

**Notes:**
- Trades fetched from Helius API
- Token metadata from Moralis API
- PnL calculated based on entry/exit or current price

---

### 5. Join Tournament

**Endpoint:** `POST /api/tournaments/join`

**Request Body:**
```json
{
  "wallet": "9XqR...k3mP",  // full wallet address
  "signature": "optional_signature_for_verification"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "joined": true,
    "tournamentId": "season-01",
    "joinedAt": "2025-11-19T14:32:00Z"
  }
}
```

**Response (Already Joined):**
```json
{
  "success": false,
  "error": "Already joined this tournament"
}
```

**Frontend Usage:**
- "Join Tournament" button on `/tournaments`

---

### 6. Get KOLBoard

**Endpoint:** `GET /api/kolboard/top`

**Query Parameters:**
- `limit` (optional) - default 50

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "tier": "Legendary",  // "Legendary" | "Elite" | "Expert" | "Advanced"
      "name": "AlphaSeeker",
      "alias": "The Oracle",  // optional
      "wallet": "9XqR...k3mP",
      "lifetimeRoi": 1247.8,
      "lastSeasonResult": "🥇",  // emoji or text
      "isCommunityKol": true  // featured status
    },
    // ... more KOLs
  ]
}
```

**Frontend Usage:**
- Full KOLBoard page at `/kolboard`
- Dashboard summary card

---

## Data Sources

### From Helius API
- Transaction history
- Wallet activity
- Token swaps/trades

### From Moralis API
- Token metadata (logo, symbol)
- Real-time token prices
- 24h price changes

### From Supabase
- Tournament data (seasons, participants)
- Leaderboard rankings
- User performance stats
- Trade history (processed from Helius)

---

## Error Handling

All endpoints should follow this error format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "data": null
}
```

The frontend will:
- Log errors to console
- Show user-friendly error messages
- Gracefully fall back to empty states

---

## CORS Configuration

Ensure your backend allows requests from:
- `http://localhost:3000` (development)
- `https://app.kolspot.live` (production)

Example (Express.js):
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://app.kolspot.live'
  ],
  credentials: true
}));
```

---

## Rate Limiting

Consider implementing rate limiting:
- Leaderboard: Cache for 30-60 seconds
- User performance: Cache for 10-30 seconds
- Token prices: Real-time or short cache

The frontend will handle stale data gracefully.

---

## Authentication

### Current State
Frontend has placeholder for wallet connection.

### Recommended Flow
1. User connects Solana wallet (Phantom, Solflare, etc.)
2. Frontend gets wallet's public key
3. Send requests with wallet address as query param
4. Backend verifies wallet owns the address (optional: signature verification)

### Optional: JWT Tokens
For enhanced security:
1. User signs message with wallet
2. Backend verifies signature
3. Backend issues JWT token
4. Frontend includes token in headers

---

## Real-Time Updates (Optional)

For live leaderboard updates, consider:

### WebSocket Endpoint
- `ws://your-backend/api/tournaments/live`
- Push updates when rankings change
- Frontend already has structure to handle updates

### Alternative: Polling
- Frontend can poll leaderboard every 30-60 seconds
- Set `setInterval` in `useEffect`

---

## Testing Endpoints

Use this curl command template:

```bash
# Get current tournament
curl https://your-backend/api/tournaments/current

# Get leaderboard
curl https://your-backend/api/tournaments/leaderboard

# Get user performance
curl https://your-backend/api/tournaments/me?wallet=YOUR_WALLET

# Get user trades
curl https://your-backend/api/tournaments/my-trades?wallet=YOUR_WALLET

# Join tournament
curl -X POST https://your-backend/api/tournaments/join \
  -H "Content-Type: application/json" \
  -d '{"wallet":"YOUR_WALLET"}'

# Get KOLBoard
curl https://your-backend/api/kolboard/top
```

---

## Integration Checklist

- [ ] Backend endpoints return expected JSON format
- [ ] CORS enabled for frontend domains
- [ ] Tournament data endpoint working
- [ ] Leaderboard endpoint working
- [ ] User performance endpoint working
- [ ] User trades endpoint working (integrates Helius)
- [ ] Token metadata endpoint working (integrates Moralis)
- [ ] Join tournament endpoint working
- [ ] KOLBoard endpoint working
- [ ] Error responses follow standard format
- [ ] Rate limiting configured
- [ ] Frontend `.env.local` configured with API URL
- [ ] Frontend `lib/api.ts` uncommented and connected

---

## Next Steps

1. **Set Backend URL**
   - Add `NEXT_PUBLIC_API_URL` to `.env.local`

2. **Update `lib/api.ts`**
   - Uncomment all `fetch()` calls
   - Remove or comment out mock data returns

3. **Test Each Endpoint**
   - Use browser DevTools Network tab
   - Check API responses match expected format

4. **Add Error Handling**
   - Test offline scenarios
   - Test API errors
   - Verify user-friendly messages

5. **Optimize Performance**
   - Add caching where appropriate
   - Consider pagination for large datasets
   - Implement loading states

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API endpoint URLs
3. Test endpoints with curl/Postman
4. Ensure CORS is configured correctly
5. Check that response format matches TypeScript types in `types/index.ts`

The frontend is production-ready and waiting for your backend integration! 🚀
