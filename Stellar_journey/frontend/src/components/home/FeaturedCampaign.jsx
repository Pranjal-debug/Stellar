import { ShieldCheck, Wallet, HeartHandshake } from "lucide-react";
import Card from "../ui/Card";
import Container from "../common/Container";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: ShieldCheck,
    title: "Transparent",
    description:
      "Every donation and withdrawal is recorded on the Stellar blockchain.",
  },
  {
    icon: Wallet,
    title: "Secure Wallets",
    description:
      "Connect your Stellar wallet and interact directly with smart contracts.",
  },
  {
    icon: HeartHandshake,
    title: "Decentralized Funding",
    description:
      "Support creators without intermediaries using Soroban smart contracts.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          title="Why StellarFund?"
          subtitle="Built with transparency, speed, and security in mind."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="p-8">
                <div className="mb-6 inline-flex rounded-xl bg-teal-500/10 p-4">
                  <Icon className="h-8 w-8 text-teal-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}