import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-teal-500/20 p-2">
        <Sparkles className="h-6 w-6 text-teal-400" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-wide text-white">
          StellarFund
        </h1>

        <p className="text-xs text-slate-400">
          Powered by Stellar
        </p>
      </div>
    </div>
  );
}