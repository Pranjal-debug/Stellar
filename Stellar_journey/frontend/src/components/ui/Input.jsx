export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
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
          transition-all
          duration-300
          placeholder:text-slate-500
          focus:border-teal-400
          focus:ring-4
          focus:ring-teal-500/20
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}