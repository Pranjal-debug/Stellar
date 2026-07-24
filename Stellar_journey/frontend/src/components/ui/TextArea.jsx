export default function Textarea({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-slate-300">
          {label}
        </label>
      )}

      <textarea
        rows={6}
        className={`
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-950
          px-4
          py-3
          text-white
          outline-none
          resize-none
          transition-all
          duration-300
          focus:border-teal-400
          focus:ring-4
          focus:ring-teal-500/20
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}