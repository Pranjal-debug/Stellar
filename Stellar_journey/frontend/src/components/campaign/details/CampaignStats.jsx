import ProgressBar from "../../ui/ProgressBar";
import StatusBadge from "../StatusBadge";

export default function CampaignStats({ campaign }) {
  const percentage = Math.min(
    (Number(campaign.raised) / Number(campaign.goal)) * 100,
    100
  );

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (Number(campaign.deadline) - Date.now() / 1000) / 86400
    )
  );

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-3">

      {/* Progress */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:col-span-2">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Raised
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
              {campaign.raised.toString()} XLM
            </h2>

          </div>

          <StatusBadge status={campaign.status.tag} />

        </div>

        <div className="mt-8">

          <ProgressBar
            raised={campaign.raised}
            goal={campaign.goal}
          />

          <div className="mt-3 flex justify-between text-sm text-slate-400">

            <span>
              Goal {campaign.goal.toString()} XLM
            </span>

            <span>
              {percentage.toFixed(0)}%
            </span>

          </div>

        </div>

      </div>

      {/* Side Metrics */}

      <div className="space-y-6">

        <MetricCard
          title="Days Left"
          value={daysLeft}
        />

        <MetricCard
          title="Goal"
          value={`${campaign.goal.toString()} XLM`}
        />

        <MetricCard
          title="Raised"
          value={`${campaign.raised.toString()} XLM`}
        />

      </div>

    </section>
  );
}

function MetricCard({
  title,
  value,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-teal-500">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}