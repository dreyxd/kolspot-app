# KOLSpot App - Quick Start Commands

## Initial Setup

```bash
# Navigate to project
cd kolspot-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your backend URL
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Build & Deploy

```bash
# Create production build
npm run build

# Start production server locally
npm start

# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

## Common Tasks

```bash
# Type check without building
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Quick Reference

```
app/
  page.tsx              → Dashboard (/)
  tournaments/page.tsx  → Tournaments page
  kolboard/page.tsx     → KOLBoard page
  layout.tsx            → Root layout

components/
  Navbar.tsx            → Top navigation
  Card.tsx, Badge.tsx   → UI components
  Tabs.tsx              → Tab navigation
  LeaderboardTable.tsx  → Rankings table

lib/
  api.ts                → API functions (EDIT HERE to connect backend)

types/
  index.ts              → TypeScript types
```

## Connect to Backend

1. Open `lib/api.ts`
2. Find each function (e.g., `getCurrentTournament`)
3. Uncomment the `fetch()` lines
4. Comment out the mock data return

Example:
```typescript
// BEFORE (mock data)
export async function getCurrentTournament(): Promise<Tournament> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockTournament;
}

// AFTER (real backend)
export async function getCurrentTournament(): Promise<Tournament> {
  const response = await fetch(`${API_BASE_URL}/api/tournaments/current`);
  if (!response.ok) throw new Error("Failed to fetch tournament");
  const data: ApiResponse<Tournament> = await response.json();
  return data.data;
}
```

## Add Wallet Connection

```bash
# Install Solana wallet adapter
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js

# See SETUP.md for integration code
```

## Troubleshooting

```bash
# If build fails
rm -rf .next node_modules package-lock.json
npm install
npm run build

# If styles don't load
npm install -D tailwindcss postcss autoprefixer

# Check for errors
npm run dev
# Then open browser console and Network tab
```

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Production Checklist

- [ ] Dependencies installed: `npm install`
- [ ] `.env.local` created with `NEXT_PUBLIC_API_URL`
- [ ] Backend endpoints tested and working
- [ ] `lib/api.ts` updated to use real API calls
- [ ] CORS enabled on backend for frontend domain
- [ ] App builds successfully: `npm run build`
- [ ] Deployed to Vercel or hosting platform
- [ ] Custom domain configured: `app.kolspot.live`
- [ ] SSL certificate active
- [ ] Wallet integration added (optional)

## Documentation

- `README.md` - Main documentation
- `SETUP.md` - Detailed setup guide
- `BACKEND_INTEGRATION.md` - API integration specs
- `PROJECT_OVERVIEW.md` - Project structure and features

## Support

Questions? Check:
1. Browser console for errors
2. Network tab for API calls
3. `lib/api.ts` for TODO comments
4. Documentation files above

---

**You're ready to go! Start with:**

```bash
npm install && npm run dev
```

Then open http://localhost:3000 🚀
