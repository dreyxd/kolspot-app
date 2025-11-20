"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateWalletModal from "./CreateWalletModal";
import { getStoredWallet, WalletData } from "@/lib/wallet";

export default function Navbar() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletData | null>(null);

  useEffect(() => {
    // Check for stored wallet on mount
    const storedWallet = getStoredWallet();
    if (storedWallet) {
      setWallet(storedWallet);
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/kolboard", label: "KOLBoard" },
  ];

  const handleWalletCreated = (newWallet: WalletData) => {
    setWallet(newWallet);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <nav className="border-b border-slate-800 bg-background-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="KOLSpot Logo" 
                className="h-10 w-auto"
              />
              <div className="text-2xl font-bold">
                <span className="text-white">KOL</span>
                <span className="text-accent-orange">Spot</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent-orange ${
                    pathname === link.href
                      ? "text-accent-orange"
                      : "text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Create Wallet / Show Wallet Button */}
            {wallet ? (
              <div className="rounded-lg bg-accent-orange/10 border border-accent-orange/20 px-6 py-2.5 font-mono text-sm text-accent-orange">
                {truncateAddress(wallet.publicKey)}
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg bg-accent-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-orange-light hover:ring-2 hover:ring-accent-orange/50"
              >
                Create Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <CreateWalletModal
          onClose={() => setIsModalOpen(false)}
          onWalletCreated={handleWalletCreated}
        />
      )}
    </>
  );
}
