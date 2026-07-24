import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/20",

    secondary:
      "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",

    outline:
      "border border-slate-700 bg-transparent hover:border-teal-400 hover:text-teal-400",

    ghost:
      "bg-transparent hover:bg-slate-800 text-slate-300",

    danger:
      "bg-red-500 hover:bg-red-400 text-white",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {leftIcon}

      {loading ? "Loading..." : children}

      {rightIcon}
    </button>
  );
}