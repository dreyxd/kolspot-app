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
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl shadow-3d">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="KOLSpot Logo" 
                className="h-10 w-auto object-contain rounded-lg"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-white bg-accent shadow-glow"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Create Wallet / Show Wallet Button */}
            {wallet ? (
              <div className="rounded-lg bg-accent/10 border border-accent/20 px-6 py-2.5 font-mono text-sm text-accent-text">
                {truncateAddress(wallet.publicKey)}
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent-soft shadow-glow hover:shadow-glow-lg transition-all duration-300"
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
