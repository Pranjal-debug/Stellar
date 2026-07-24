export default function FloatingPill({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        absolute
        flex
        items-center
        gap-2
        rounded-full
        border
        border-slate-700/60
        bg-slate-900/70
        px-4
        py-2
        text-sm
        font-medium
        text-slate-200
        backdrop-blur-xl
        shadow-lg
        shadow-black/30
        transition-all
        duration-300
        hover:scale-105
        hover:border-teal-500/40
        hover:shadow-teal-500/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}