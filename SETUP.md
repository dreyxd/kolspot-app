# KOLSpot App - Setup & Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
cd kolspot-app
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend API URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Connecting to Your Backend

The frontend is ready to consume your existing backend APIs. All API calls are centralized in `lib/api.ts`.

### Backend Endpoints Required

Update the TODO comments in `lib/api.ts` and uncomment the fetch calls:

#### Tournament Endpoints
- `GET /api/tournaments/current` → Current tournament details
- `GET /api/tournaments/leaderboard` → Leaderboard rankings
- `GET /api/tournaments/me?wallet={address}` → User's performance
- `GET /api/tournaments/my-trades?wallet={address}` → User's trades
- `POST /api/tournaments/join` → Join tournament (body: `{ wallet: string }`)

#### KOLBoard Endpoints
- `GET /api/kolboard/top` → Top KOLs

### Expected Response Format

All endpoints should return:

```typescript
{
  "success": true,
  "data": <Your Data Here>,
  "error": null  // or error message string
}
```

---

## Adding Wallet Connection

### Install Solana Wallet Adapter

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base @solana/web3.js
```

### Update `app/layout.tsx`

Wrap your app with wallet providers:

```tsx
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export default function RootLayout({ children }) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Navbar />
              <main>{children}</main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
```

### Update `components/Navbar.tsx`

Replace the static "Connect Wallet" button:

```tsx
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// In your Navbar component, replace the button with:
<WalletMultiButton className="!rounded-lg !bg-accent-orange !px-6 !py-2.5 !text-sm !font-semibold" />
```

### Use Wallet in Pages

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

export default function TournamentsPage() {
  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey?.toBase58();
  
  // Now you can use walletAddress in your API calls
}
```

---

## Deployment to Production

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

Or via CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Netlify

```bash
npm run build
netlify deploy --prod --dir=.next
```

### Option 3: Custom Server (Node.js)

```bash
npm run build
npm start
```

Serve on port 3000 or configure with environment variable `PORT`.

---

## Domain Setup

### Set up `app.kolspot.live`

1. **DNS Configuration:**
   - Add a CNAME record pointing `app` to your deployment platform
   - For Vercel: `cname.vercel-dns.com`
   - For Netlify: `<your-site>.netlify.app`

2. **Platform Configuration:**
   - Add `app.kolspot.live` as a custom domain
   - Platform will handle SSL certificate automatically

---

## Production Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Set `NEXT_PUBLIC_API_URL` in production environment
- [ ] Test all pages load correctly
- [ ] Verify API endpoints return expected data
- [ ] Test wallet connection (if implemented)
- [ ] Verify tournament countdown works
- [ ] Check leaderboard updates
- [ ] Test responsive design on mobile
- [ ] Enable CORS on backend for frontend domain
- [ ] Set up proper error tracking (e.g., Sentry)
- [ ] Configure analytics (e.g., Google Analytics, Plausible)

---

## Environment Variables

### Required
- `NEXT_PUBLIC_API_URL` - Your backend API base URL

### Optional
- `NEXT_PUBLIC_SOLANA_RPC` - Custom Solana RPC endpoint (if not using default)
- `NEXT_PUBLIC_ENVIRONMENT` - `development` | `staging` | `production`

---

## Troubleshooting

### Build Errors

If you get TypeScript errors during build, they're likely from missing dependencies:

```bash
npm install next react react-dom
npm install -D @types/node @types/react @types/react-dom typescript
```

### API Connection Issues

1. Check CORS headers on your backend
2. Verify API URL in `.env.local`
3. Check browser console for errors
4. Test API endpoints directly with curl/Postman

### Styling Issues

If Tailwind classes don't work:

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

## Support

For questions or issues:
- Check the main README.md
- Review TODO comments in `lib/api.ts`
- Ensure backend endpoints match expected format

---

## Next Steps

1. **Install dependencies** and run dev server
2. **Connect to your backend** by updating `lib/api.ts`
3. **Add wallet integration** for user authentication
4. **Deploy to Vercel** or your preferred platform
5. **Configure DNS** for `app.kolspot.live`
6. **Monitor and optimize** based on user feedback

Happy building! 🚀
