import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export interface WalletData {
  publicKey: string;
  privateKey: string;
  created: string;
}

/**
 * Generate a new Solana wallet
 */
export function generateWallet(): WalletData {
  const keypair = Keypair.generate();
  
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
    created: new Date().toISOString(),
  };
}

/**
 * Save wallet to localStorage
 */
export function saveWallet(wallet: WalletData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('kolspot_wallet', JSON.stringify(wallet));
}

/**
 * Get wallet from localStorage
 */
export function getStoredWallet(): WalletData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('kolspot_wallet');
  if (!stored) return null;
  return JSON.parse(stored);
}

/**
 * Clear wallet from localStorage
 */
export function clearWallet(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('kolspot_wallet');
}

/**
 * Export wallet as downloadable file
 */
export function downloadWallet(wallet: WalletData): void {
  const dataStr = JSON.stringify(wallet, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kolspot-wallet-${wallet.publicKey.slice(0, 8)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
