export default function HeroBackground() {
  return (
    <>
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Glow */}
      <div className="absolute left-[-120px] top-20 h-96 w-96 rounded-full bg-teal-500/8 blur-[120px]" />
      <div className="absolute right-[-150px] bottom-10 h-[28rem] w-[28rem] rounded-full bg-cyan-500/8 blur-[140px]" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-[140px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />
    </>
  );
}