import clsx from "clsx";

export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/40 hover:shadow-[0_20px_60px_rgba(20,184,166,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}