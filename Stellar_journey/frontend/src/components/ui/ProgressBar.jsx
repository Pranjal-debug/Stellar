export default function ProgressBar({ raised, goal }) {
  const percentage =
    goal > 0
      ? Math.min((Number(raised) / Number(goal)) * 100, 100)
      : 0;

  return (
    <div className="space-y-2">

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}