export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
}) {
  return (
    <div
      className={`space-y-3 ${
        center ? "text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-lg leading-8 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}