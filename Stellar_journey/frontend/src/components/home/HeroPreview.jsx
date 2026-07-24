import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import FloatingPill from "./FloatingPill";
import {
    Zap,
    ShieldCheck,
    Globe
} from "lucide-react";

export default function HeroPreview() {
  return (
      <div className="relative lg:-mt-32 w-full max-w-[600px] animate-float">

        <FloatingPill className="-top-20 right-4 float-slow float-delay-1hover:-translate-y-1 hover:scale-105">
            <Zap size={16} className="text-yellow-400" />
            Low Fees
        </FloatingPill>
    
        <FloatingPill className="-bottom-19 -left-12 float-slow float-delay-2 hover:-translate-y-1 hover:scale-105">
            <ShieldCheck
            size={16}
            className="text-emerald-400"
            />
            Secure
        </FloatingPill>
    
        <FloatingPill className="top-4/5 -right-29 float-slow float-delay-3hover:-translate-y-1 hover:scale-105 z-10">
        <Globe
        size={16}
        className="text-cyan-400"
        />
            Global
        </FloatingPill>

      <Card className="space-y-8 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,255,200,.08)]">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-400">
              Featured Campaign
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Community Library
            </h3>
          </div>

          <Badge color="emerald">
            Active
          </Badge>

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Creator
          </p>

          <p className="mt-1 font-medium text-white">
            GABX...39FK
          </p>

        </div>

        <ProgressBar value={45} />

        <div className="grid grid-cols-3 gap-6">

          <div>
            <p className="text-xs text-slate-500">
              Raised
            </p>

            <h4 className="mt-1 font-bold text-2xl">
              450 XLM
            </h4>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Goal
            </p>

            <h4 className="mt-1 text-2xl font-bold">
              1000 XLM
            </h4>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Days Left
            </p>

            <h4 className="mt-1 text-2xl font-bold">
              24
            </h4>
          </div>

        </div>

      </Card>

      {/* Decorative glow */}

      <div className="absolute -right-10 top-10 -z-10 h-60 w-60 rounded-full bg-teal-500/20 blur-[100px]" />

    </div>
  );
}