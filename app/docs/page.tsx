import Card from "@/components/Card";
import Badge from "@/components/Badge";

export default function Docs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Documentation</h1>
        
        <div className="space-y-8 text-slate-300">
          {/* Getting Started */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 1: Create Your Tournament Wallet</h3>
                <p className="mb-2">
                  Click the &quot;Create Wallet&quot; button in the navigation bar to generate a new Solana wallet. This wallet will be used to track your tournament performance.
                </p>
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3">
                  <p className="text-sm text-yellow-400">
                    ⚠️ <strong>Important:</strong> Download and securely save your private key. You&apos;ll need it to access your wallet.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 2: Join the KOLSpot Community</h3>
                <p className="mb-2">
                  Follow <a href="https://x.com/kolspot" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">@KOLSpot on X (Twitter)</a> to stay updated with tournament announcements, results, and community discussions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 3: Get Your Starting Capital</h3>
                <p className="mb-2">
                  Contact the KOLSpot admin with your wallet address to receive 1 SOL as starting capital for the tournament.
                </p>
                <div className="rounded-lg bg-white/10 p-3 font-mono text-sm">
                  Your wallet address will be shown after wallet creation
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Step 4: Start Trading</h3>
                <p>
                  Once you receive your SOL, start trading on Solana DEXs. All your trades will be tracked automatically!
                </p>
              </div>
            </div>
          </section>

          {/* How Tournaments Work */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How Tournaments Work</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tournament Structure</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Each tournament runs for a fixed duration (displayed on tournament page)</li>
                  <li>All participants start with 1 SOL</li>
                  <li>Rankings are based on total PnL (Profit and Loss)</li>
                  <li>Leaderboard updates in real-time as trades are executed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Prize Distribution</h3>
                <div className="space-y-2 ml-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="warning">🥇 1st Place</Badge>
                    <span>5 SOL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">🥈 2nd Place</Badge>
                    <span>3 SOL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">🥉 3rd Place</Badge>
                    <span>1.5 SOL</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Supported Trading Platforms</h3>
                <p className="mb-2">Trades on the following Solana DEXs are tracked:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Jupiter</li>
                  <li>Raydium</li>
                  <li>Orca</li>
                  <li>Pump.fun</li>
                  <li>And other major Solana DEXs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Performance Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Performance Tracking</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Metrics Explained</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-white">Total PnL</div>
                    <p className="text-sm">
                      Total profit or loss from all your trades. This is the primary ranking metric.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-white">ROI (Return on Investment)</div>
                    <p className="text-sm">
                      Percentage return calculated as: (Total PnL / Starting Capital) × 100
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Win Rate</div>
                    <p className="text-sm">
                      Percentage of profitable trades: (Winning Trades / Total Trades) × 100
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Total Trades</div>
                    <p className="text-sm">
                      Number of completed trades during the tournament period
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Updates</h3>
                <p>
                  The leaderboard and your performance stats update automatically as trades are detected on-chain. There may be a brief delay (typically 1-2 minutes) for transaction confirmation.
                </p>
              </div>
            </div>
          </section>

          {/* KOLBoard */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">KOLBoard</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is KOLBoard?</h3>
                <p>
                  KOLBoard ranks the top-performing traders across all tournaments. It tracks lifetime performance and identifies community-recognized KOLs (Key Opinion Leaders).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Becoming a KOL</h3>
                <p className="mb-2">To earn the Community KOL badge, you must:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Maintain consistent positive performance across multiple tournaments</li>
                  <li>Demonstrate strong win rate and ROI</li>
                  <li>Be an active member of the KOLSpot community</li>
                  <li>Share insights and help other traders</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wallet Management */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Wallet Management</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Wallet Security</h3>
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 space-y-2">
                  <p className="font-semibold text-red-400">🔐 Critical Security Information:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>Your private key is stored ONLY on your device</li>
                    <li>KOLSpot cannot recover lost private keys</li>
                    <li>Download and back up your wallet file immediately</li>
                    <li>Never share your private key with anyone</li>
                    <li>Be cautious of phishing attempts</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Wallet Backup</h3>
                <p className="mb-2">When you create your wallet, you can:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Download Wallet File:</strong> Saves a JSON file with your public and private keys</li>
                  <li><strong>Copy Private Key:</strong> Copies your private key to clipboard for manual backup</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-400">
                  Store multiple backups in secure locations (encrypted USB drive, password manager, etc.)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Using Your Wallet</h3>
                <p>
                  Your tournament wallet is a standard Solana wallet. You can import it into other Solana wallet applications using your private key if needed.
                </p>
              </div>
            </div>
          </section>

          {/* Trading Rules */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Trading Rules & Fair Play</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Allowed Trading</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Any trading strategy is permitted</li>
                  <li>No restrictions on trade frequency or size</li>
                  <li>You can trade any Solana-based tokens</li>
                  <li>Use of technical analysis and trading tools is encouraged</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Prohibited Activities</h3>
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>Wash trading (trading with yourself to inflate metrics)</li>
                    <li>Market manipulation or coordinated pumps</li>
                    <li>Creating multiple accounts to game the system</li>
                    <li>Exploiting platform bugs or vulnerabilities</li>
                    <li>Transferring funds between tournament participants</li>
                  </ul>
                  <p className="mt-2 text-red-400 font-semibold">
                    Violation of these rules will result in immediate disqualification
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">How long do tournaments last?</h3>
                <p className="text-sm">
                  Tournament duration varies. Check the active tournament page for the countdown timer showing remaining time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">When are prizes distributed?</h3>
                <p className="text-sm">
                  Prizes are distributed within 48 hours after tournament completion, directly to winners&apos; wallets.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Can I participate in multiple tournaments?</h3>
                <p className="text-sm">
                  Yes! You can use the same wallet for multiple tournaments or create separate wallets for each.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">What if I lose all my starting capital?</h3>
                <p className="text-sm">
                  You can continue to participate and track your performance, but negative PnL will affect your ranking. Future tournaments offer new opportunities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">How accurate is the trade tracking?</h3>
                <p className="text-sm">
                  Trade tracking uses Helius and Moralis APIs for real-time blockchain data. Accuracy is extremely high, with minimal delay for on-chain confirmation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Can I withdraw my funds during a tournament?</h3>
                <p className="text-sm">
                  Yes, it&apos;s your wallet. However, withdrawing funds will affect your PnL calculations and tournament performance.
                </p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Support & Contact</h2>
            
            <div className="space-y-3">
              <p>Need help? Reach out through:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <a href="https://x.com/kolspot" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">
                    X (Twitter) @KOLSpot
                  </a>
                </li>
                <li>Community Discord (link in X bio)</li>
                <li>Telegram group (link in X bio)</li>
              </ul>
            </div>
          </section>

          <div className="pt-6 border-t border-slate-700">
            <p className="text-sm text-neutral-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
