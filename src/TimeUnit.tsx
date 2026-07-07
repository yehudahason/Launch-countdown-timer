import FlipCard from "./FlipCard";

interface TimeUnitProps {
  value: number;
  label: string;
}

export default function TimeUnit({ value, label }: TimeUnitProps) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex flex-col items-center gap-0">
      <div className="flex gap-px">
        <FlipCard value={tens} left={true} />
        <FlipCard value={ones} left={false} />
      </div>

      <span className="text-xs mt-8 font-bold tracking-[0.3em] text-gray-500">
        {label}
      </span>
    </div>
  );
}
