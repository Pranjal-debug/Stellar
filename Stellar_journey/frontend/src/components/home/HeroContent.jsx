import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function HeroContent() {
  return (
    <div className="space-y-10">

      <Badge color="teal">
        Powered by Stellar Blockchain
      </Badge>

      <div className="space-y-8">

        <h1 className="text-lg leading-[1.05] bg-cyan-500/5 tracking-tight max-w-[650px] font-black leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
          Fund Ideas.
          <br />
          Empower Innovation.
        </h1>

        <p className="max-w-[580px] text-lg leading-9 text-slate-400">
          Launch transparent crowdfunding campaigns with fast,
          secure and low-fee transactions powered by Soroban smart
          contracts.
        </p>

      </div>

      <div className="flex flex-wrap gap-4">

        <Link to="/create">
          <Button className="flex items-center gap-5 h-14 align-middle">
            Launch Campaign
            <ArrowRight size={18} />
          </Button>
        </Link>

        <Link to="/explore">
          <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-teal-500 hover:bg-slate-900">
            Explore Projects
          </button>
        </Link>

      </div>

      <div className="grid gap-5 pt-4 text-sm text-slate-400">

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-teal-400" />
          Smart Contract Secured
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-teal-400" />
          Low Transaction Fees
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-teal-400" />
          Instant Settlement
        </div>

      </div>

    </div>
  );
}