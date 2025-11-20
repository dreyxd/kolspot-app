import Card from "@/components/Card";

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2">KOLSpot collects the following information:</p>
            
            <div className="ml-4 space-y-3">
              <div>
                <h3 className="font-semibold text-white">Blockchain Data</h3>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Wallet addresses (public keys)</li>
                  <li>Transaction history on Solana blockchain</li>
                  <li>Trading activity and performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">Usage Data</h3>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>IP address and general location</li>
                  <li>Device information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">Local Storage</h3>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Wallet data (stored locally on your device)</li>
                  <li>User preferences and settings</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We DO NOT Collect</h2>
            <p className="mb-2">KOLSpot does NOT collect or have access to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your private keys or seed phrases</li>
              <li>Your personal identifying information (name, email, phone)</li>
              <li>Your passwords or authentication credentials</li>
              <li>Your financial account information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Track and display tournament performance</li>
              <li>Calculate leaderboard rankings and PnL metrics</li>
              <li>Improve platform functionality and user experience</li>
              <li>Detect and prevent fraudulent activity</li>
              <li>Analyze platform usage and trends</li>
              <li>Communicate platform updates and tournament results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage and Security</h2>
            <p className="mb-2">
              We implement security measures to protect your data:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Wallet private keys are NEVER transmitted to our servers</li>
              <li>Private keys are stored only in your browser&apos;s local storage</li>
              <li>Blockchain data is sourced from public Solana ledger</li>
              <li>We use secure HTTPS connections for all communications</li>
              <li>Database access is restricted and encrypted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-2">KOLSpot integrates with third-party services:</p>
            
            <div className="ml-4 space-y-3">
              <div>
                <h3 className="font-semibold text-white">Blockchain Data Providers</h3>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Helius - Solana blockchain data and webhooks</li>
                  <li>Moralis - Token prices and wallet analytics</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">Infrastructure</h3>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Supabase - Database hosting</li>
                  <li>DigitalOcean - Server hosting</li>
                </ul>
              </div>
            </div>

            <p className="mt-3">
              These services have their own privacy policies. We recommend reviewing their policies to understand how they handle data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
            <p>
              KOLSpot uses browser local storage to maintain your session and preferences. We do not use third-party tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Sharing and Disclosure</h2>
            <p className="mb-2">We may share your data in the following circumstances:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Publicly displaying wallet addresses and trading performance on leaderboards</li>
              <li>Complying with legal obligations or valid legal requests</li>
              <li>Protecting the rights and safety of KOLSpot and users</li>
              <li>With service providers who assist in platform operations (under strict confidentiality)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights and Choices</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Delete your locally stored wallet data at any time</li>
              <li>Opt out of tournament participation</li>
              <li>Request information about data we&apos;ve collected</li>
              <li>Clear your browser data and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Public Blockchain Data</h2>
            <p>
              All transactions on the Solana blockchain are public and permanent. Once a transaction is recorded on-chain, it cannot be deleted or modified. KOLSpot does not control blockchain data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Children&apos;s Privacy</h2>
            <p>
              KOLSpot is not intended for users under 18 years of age. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of KOLSpot after changes indicates acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
            <p>
              For privacy-related questions or concerns, please contact us through our official X (Twitter) account or community channels.
            </p>
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
