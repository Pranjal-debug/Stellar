import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../StatusBadge";

export default function CampaignHero({ campaign }) {
  const navigate = useNavigate();

  const creator =
    campaign.creator.slice(0, 4) +
    "..." +
    campaign.creator.slice(-4);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

      {/* Banner */}
      <div className="h-72 bg-gradient-to-br from-teal-500 via-cyan-500 to-slate-900" />

      {/* Decorative Glow */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-teal-400/20 blur-[120px]" />

      {/* Content */}
      <div className="relative px-8 pb-10">

        {/* Floating Card */}
        <div className="-mt-20 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 backdrop-blur-xl">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-slate-400 transition hover:text-teal-400"
          >
            <ArrowLeft size={18} />
            Back to Explore
          </button>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            <div className="space-y-4">

              <StatusBadge status={campaign.status.tag} />

              <h1 className="text-5xl font-black text-white">
                {campaign.title}
              </h1>

              <p className="text-lg text-slate-400">
                Created by
              </p>

              <p className="font-semibold text-white">
                {creator}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-8 py-6">

              <p className="text-sm text-slate-400">
                Campaign ID
              </p>

              <h2 className="mt-2 text-4xl font-black text-white">
                #{campaign.id}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}