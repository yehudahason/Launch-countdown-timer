import FlipCard from "./FlipCard";
import type { TimeUnitProps } from "../types";

export default function TimeUnit({ value, label }: TimeUnitProps) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex flex-col  gap-4 items-center ">
      <div className="flex gap-px">
        <FlipCard value={tens} left={true} />
        <FlipCard value={ones} left={false} />
      </div>

      <span className="sm:text-xs text-[10px] font-bold tracking-[0.3em] text-gray-400">
        {label}
      </span>
    </div>
  );
}
