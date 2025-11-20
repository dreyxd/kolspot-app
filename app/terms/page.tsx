import Card from "@/components/Card";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KOLSpot (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              KOLSpot is a trading tournament platform that tracks Solana blockchain trading performance of participants. The platform provides:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Tournament participation and leaderboard tracking</li>
              <li>KOL (Key Opinion Leader) performance analytics</li>
              <li>Wallet creation and management tools</li>
              <li>Real-time trading activity monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Tournament Rules</h2>
            <p className="mb-2">Participants agree to the following tournament conditions:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Only trades made through the tournament wallet will be tracked</li>
              <li>All trades must be conducted on supported Solana DEXs</li>
              <li>Tournament prizes are awarded based on PnL performance</li>
              <li>Manipulation, botting, or fraudulent activity will result in disqualification</li>
              <li>Wash trading or coordinated trading is strictly prohibited</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Wallet and Private Keys</h2>
            <p className="mb-2">
              When you create a wallet through KOLSpot:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>You are solely responsible for securing your private key</li>
              <li>KOLSpot does NOT store or have access to your private keys</li>
              <li>Loss of private keys means permanent loss of wallet access</li>
              <li>You must download and securely store your wallet backup</li>
              <li>Never share your private key with anyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Risk Disclosure</h2>
            <p className="mb-2">
              Cryptocurrency trading involves substantial risk:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>You may lose your entire investment</li>
              <li>Market volatility can result in significant losses</li>
              <li>Past performance does not guarantee future results</li>
              <li>Only invest what you can afford to lose</li>
              <li>KOLSpot is not responsible for trading losses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Prohibited Activities</h2>
            <p className="mb-2">Users are prohibited from:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Using bots or automated trading systems without disclosure</li>
              <li>Manipulating markets or engaging in wash trading</li>
              <li>Creating multiple accounts to gain unfair advantage</li>
              <li>Attempting to exploit platform vulnerabilities</li>
              <li>Engaging in illegal activities or money laundering</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of KOLSpot are owned by KOLSpot and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              KOLSpot and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform or participation in tournaments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Modifications to Terms</h2>
            <p>
              KOLSpot reserves the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us through our official X (Twitter) account or community channels.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
