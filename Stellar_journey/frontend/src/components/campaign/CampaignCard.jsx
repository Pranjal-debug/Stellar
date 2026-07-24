import { Calendar, Target, Wallet } from "lucide-react";

import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export default function CampaignCard({ campaign }) {
  const deadline = new Date(
    Number(campaign.deadline) * 1000
  ).toLocaleDateString();

  const navigate = useNavigate();

  const progress = Math.min(
    100,
    (Number(campaign.raised) / Number(campaign.goal)) * 100
  );

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (Number(campaign.deadline) - Date.now() / 1000) / 86400
    )
  );

const creator =
  campaign.creator.slice(0, 4) +
  "..." +
  campaign.creator.slice(-4);

  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-teal-500">

      <div className="h-52 rounded-t-3xl bg-gradient-to-br from-teal-600 via-cyan-500 to-slate-800" />

      <div className="space-y-5 p-6">

        <div className="flex items-center justify-between">
          <StatusBadge status={campaign.status.tag} />

          <span className="text-xs text-slate-500">
            #{campaign.id}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {campaign.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm text-slate-400">
            {campaign.description}
          </p>
        </div>

        <div className="space-y-5">

  <div>
    <div className="mb-2 flex justify-between text-sm">
      <span className="text-slate-400">
        Raised
      </span>

      <span className="font-semibold text-white">
        {campaign.raised.toString()} XLM
      </span>
    </div>

    <ProgressBar
      raised={campaign.raised}
      goal={campaign.goal}
    />

    <div className="mt-2 flex justify-between text-xs text-slate-500">
      <span>
        Goal {campaign.goal.toString()} XLM
      </span>

      <span>
        {progress.toFixed(0)}%
      </span>
    </div>
  </div>

  <div className="border-t border-slate-800 pt-4 space-y-3">

    <div className="flex items-center justify-between">

      <span className="text-slate-400">
        Creator
      </span>

      <span className="font-medium text-white">
        {creator}
      </span>

    </div>

    <div className="flex items-center justify-between">

          <span className="text-slate-400">
            Ends In
          </span>
    
          <span className="font-medium text-teal-400">
            {daysLeft} Days
          </span>
    
        </div>
    
      </div>
    </div>


        <Button
            className="w-full"
            onClick={() =>
                navigate(`/campaign/${campaign.id}`)
            }
        >
            View Campaign →
        </Button>

      </div>
    </div>
  );
}