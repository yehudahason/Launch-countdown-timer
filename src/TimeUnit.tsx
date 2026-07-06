import FlipCard from "./FlipCard";

interface TimeUnitProps {
  value: number;
  label: string;
}

export default function TimeUnit({ value, label }: TimeUnitProps) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-0">
        <FlipCard value={tens} left={true} ones={ones} />
        <FlipCard value={ones} left={false} ones={ones} />
      </div>

      <span className="text-xs font-bold tracking-[0.3em] text-gray-500">
        {label}
      </span>
    </div>
  );
}
