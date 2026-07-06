import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";

export default function App() {
  const START_DAYS = 9;

  const [secondsRemaining, setSecondsRemaining] = useState(
    START_DAYS * 24 * 60 * 60,
  );

  const days = Math.floor(secondsRemaining / (24 * 60 * 60));

  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));

  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);

  const seconds = secondsRemaining % 60;

  const dayTens = Math.floor(days / 10);
  const dayOnes = days % 10;

  const hourTens = Math.floor(hours / 10);
  const hourOnes = hours % 10;

  const minuteTens = Math.floor(minutes / 10);
  const minuteOnes = minutes % 10;

  const secondTens = Math.floor(seconds / 10);
  const secondOnes = seconds % 10;
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === 0) {
          return START_DAYS * 24 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191A24]">
      <div className="flex gap-4 sm:gap-6 md:gap-8">
        {/* Days Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 sm:gap-2">
            <FlipCard value={dayTens} />
            <FlipCard value={dayOnes} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8486A9]">
            Days
          </span>
        </div>

        {/* Hours Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 sm:gap-2">
            <FlipCard value={hourTens} />
            <FlipCard value={hourOnes} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8486A9]">
            Hours
          </span>
        </div>

        {/* Minutes Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 sm:gap-2">
            <FlipCard value={minuteTens} />
            <FlipCard value={minuteOnes} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8486A9]">
            Minutes
          </span>
        </div>

        {/* Seconds Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 sm:gap-2">
            <FlipCard value={secondTens} />
            <FlipCard value={secondOnes} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8486A9]">
            Seconds
          </span>
        </div>
      </div>
    </main>
  );
}
