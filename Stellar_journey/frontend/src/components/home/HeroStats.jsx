import Card from "../ui/Card";

const stats = [
  {
    title: "Campaigns",
    value: "24",
  },
  {
    title: "Raised",
    value: "15.8K XLM",
  },
  {
    title: "Donors",
    value: "182",
  },
];

export default function Stats() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="p-6 text-center"
        >
          <h3 className="text-3xl font-bold text-teal-400">
            {item.value}
          </h3>

          <p className="mt-2 text-slate-400">
            {item.title}
          </p>
        </Card>
      ))}
    </div>
  );
}