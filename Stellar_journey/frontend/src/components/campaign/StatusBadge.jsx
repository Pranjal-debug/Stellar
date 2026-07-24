export default function StatusBadge({ status }) {
  const value =
    typeof status === "string"
      ? status
      : status?.tag ?? status?._tag ?? "Unknown";

  const colors = {
    Active: "bg-emerald-500/20 text-emerald-400",
    Successful: "bg-blue-500/20 text-blue-400",
    Closed: "bg-yellow-500/20 text-yellow-400",
    Expired: "bg-red-500/20 text-red-400",
    Withdrawn: "bg-slate-700 text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[value] ?? "bg-slate-700 text-white"
      }`}
    >
      {value}
    </span>
  );
}