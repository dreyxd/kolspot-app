import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-xl mt-auto shadow-3d">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400 space-y-4 md:space-y-0">
          {/* Left: Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.jpg" 
              alt="KOLSpot Logo" 
              className="h-8 w-auto object-contain rounded-lg"
            />
            <span className="text-white">© 2025 KOLSpot. All rights reserved.</span>
          </div>

          {/* Center: Built on */}
          <div className="text-xs">
            Built on Solana, powered by Helius and Moralis
          </div>

          {/* Right: Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://x.com/kolspotonsol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent-light transition-colors"
            >
              X
            </a>
            <Link href="/privacy" className="hover:text-accent-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
