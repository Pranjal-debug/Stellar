export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <textarea
        rows={6}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
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
          transition
          focus:border-teal-400
        "
      />
    </div>
  );
}