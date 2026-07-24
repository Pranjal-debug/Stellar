import clsx from "clsx";

export default function Badge({
    children,
    color="teal",
}) {

const colors={
    teal:"bg-teal-500/10 text-teal-400 border border-teal-500/20",
    emerald:"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    red:"bg-red-500/10 text-red-400 border border-red-500/20",
    yellow:"bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    slate:"bg-slate-800 text-slate-300 border border-slate-700",
}

return(

<span
className={clsx(
"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
colors[color]
)}
>
{children}
</span>

)

}