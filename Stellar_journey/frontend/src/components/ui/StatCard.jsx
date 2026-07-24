import Card from "./Card";

export default function StatCard({
icon,
title,
value,
description,
}){

return(

<Card className="p-6">

<div className="space-y-4">

<div className="text-teal-400">

{icon}

</div>

<div>

<p className="text-slate-400">

{title}

</p>

<h3 className="mt-2 text-3xl font-bold text-white">

{value}

</h3>

</div>

{description && (

<p className="text-sm text-slate-500">

{description}

</p>

)}

</div>

</Card>

)

}