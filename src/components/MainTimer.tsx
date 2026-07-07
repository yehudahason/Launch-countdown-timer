import TimeUnit from "./TimeUnit";
import type { MainTimerProps } from "../types";
export default function MainTimer({
  days,
  hours,
  minutes,
  seconds,
}: MainTimerProps) {
  return (
    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-8">
      {/* Days Container */}
      <div className="flex flex-col items-center ">
        <TimeUnit value={days} label="DAYS" />
      </div>
      {/* Hours Container */}
      <div className="flex flex-col items-center ">
        <TimeUnit value={hours} label="HOURS" />
      </div>

      {/* Minutes Container */}
      <div className="flex flex-col items-center ">
        <TimeUnit value={minutes} label="MINUTES" />
      </div>

      {/* Seconds Container */}
      <div className="flex flex-col items-center ">
        <TimeUnit value={seconds} label="SECONDS" />
      </div>
    </div>
  );
}
