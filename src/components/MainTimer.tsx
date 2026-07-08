import TimeUnit from "./TimeUnit";
import type { MainTimerProps } from "../types";
export default function MainTimer({
  days,
  hours,
  minutes,
  seconds,
  isEnd,
}: MainTimerProps) {
  return (
    <div
      className={`${isEnd ? "h-[10rem]" : "h-fit z-14"} flex justify-center  gap-1 ssm:gap-3 sm:gap-6 md:gap-8`}
    >
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
