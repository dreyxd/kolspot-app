"use client";

import { useState } from 'react';
import Card from './Card';
import Badge from './Badge';
import { generateWallet, saveWallet, downloadWallet, WalletData } from '@/lib/wallet';
import { joinTournament } from '@/lib/api';

interface CreateWalletModalProps {
  onClose: () => void;
  onWalletCreated: (wallet: WalletData) => void;
}

export default function CreateWalletModal({ onClose, onWalletCreated }: CreateWalletModalProps) {
  const [step, setStep] = useState<'create' | 'created' | 'instructions'>('create');
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCreateWallet = async () => {
    try {
      setError('');
      setIsJoining(true);

      // Generate wallet
      console.log('Generating wallet...');
      const newWallet = generateWallet();
      console.log('Wallet generated:', newWallet.publicKey);
      setWallet(newWallet);

      // Save to localStorage
      console.log('Saving wallet to localStorage...');
      saveWallet(newWallet);

      // Automatically join tournament
      console.log('Joining tournament with public key:', newWallet.publicKey);
      const result = await joinTournament(newWallet.publicKey);
      console.log('Join tournament result:', result);

      setStep('created');
      onWalletCreated(newWallet);
    } catch (err: any) {
      console.error('Error creating wallet:', err);
      console.error('Error stack:', err.stack);
      setError(err.message || 'Failed to create wallet');
    } finally {
      setIsJoining(false);
    }
  };

  const handleDownload = () => {
    if (wallet) {
      downloadWallet(wallet);
      setStep('instructions');
    }
  };

  const handleCopyPrivateKey = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.privateKey);
      alert('Private key copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        {/* Step 1: Create Wallet */}
        {step === 'create' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create Tournament Wallet</h2>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-slate-300">
                Create a new Solana wallet to join the tournament. This wallet will be your unique identity for tracking trades and performance.
              </p>

              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <div className="font-semibold text-yellow-400 mb-1">Important</div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Your wallet will be automatically created and saved</li>
                      <li>• You&apos;ll be joined to the tournament instantly</li>
                      <li>• Download and save your private key securely</li>
                      <li>• Never share your private key with anyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleCreateWallet}
                disabled={isJoining}
                className="flex-1 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJoining ? 'Creating Wallet...' : 'Create Wallet & Join Tournament'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Wallet Created */}
        {step === 'created' && wallet && (
          <div>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Wallet Created Successfully!</h2>
              <Badge variant="success">✓ Joined Tournament</Badge>
            </div>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-accent/20 bg-accent/10 p-4">
                <div className="text-sm text-neutral-400 mb-1">Your Wallet Address</div>
                <div className="font-mono text-white break-all">{wallet.publicKey}</div>
              </div>

              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🔐</span>
                  <div className="flex-1">
                    <div className="font-semibold text-red-400 mb-2">Save Your Private Key</div>
                    <p className="text-sm text-slate-300 mb-3">
                      Your private key is required to access your wallet. Save it securely and never share it!
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleDownload}
                        className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-soft"
                      >
                        Download Wallet File
                      </button>
                      <button
                        onClick={handleCopyPrivateKey}
                        className="rounded-lg border border-surface px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
                      >
                        Copy Private Key
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('instructions')}
              className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-soft"
            >
              Continue to Instructions
            </button>
          </div>
        )}

        {/* Step 3: Instructions */}
        {step === 'instructions' && wallet && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Next Steps</h2>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-accent/20 bg-accent/10 p-4">
                <div className="font-semibold text-accent mb-2">📍 Your Wallet Address</div>
                <div className="font-mono text-sm text-white break-all">{wallet.publicKey}</div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">To Start Trading:</h3>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-white">Join Our X Community</div>
                    <p className="text-sm text-neutral-400">
                      Follow us on X (Twitter) and join the KOLSpot community
                    </p>
                    <a
                      href="https://x.com/kolspot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-accent hover:text-accent-soft text-sm font-medium"
                    >
                      Follow @KOLSpot →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-white">Contact Admin for 1 SOL</div>
                    <p className="text-sm text-neutral-400 mb-2">
                      Send your wallet address to the admin to receive 1 SOL to start trading
                    </p>
                    <div className="rounded bg-background p-2 font-mono text-xs text-slate-300 break-all">
                      {wallet.publicKey}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-white">Start Trading</div>
                    <p className="text-sm text-neutral-400">
                      Once you receive 1 SOL, start trading on Solana DEXs. All trades will be tracked automatically!
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-semibold text-green-400 mb-1">You&apos;re All Set!</div>
                    <p className="text-sm text-slate-300">
                      Your performance will be tracked automatically. Check the leaderboard to see your rank!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-soft"
            >
              Got It!
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
