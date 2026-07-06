import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";

export default function App() {
  const [secondsRemaining, setSecondsRemaining] = useState(59 * 60 + 59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === 0) {
          return 59 * 60 + 59;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const minuteTens = Math.floor(minutes / 10);
  const minuteOnes = minutes % 10;

  const secondTens = Math.floor(seconds / 10);
  const secondOnes = seconds % 10;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191A24]">
      <div className="flex items-center gap-6">
        <div className="flex gap-3">
          <FlipCard value={minuteTens} />
          <FlipCard value={minuteOnes} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="h-2 w-2 rounded-full bg-[#FB5E84]" />
          <span className="h-2 w-2 rounded-full bg-[#FB5E84]" />
        </div>

        <div className="flex gap-3">
          <FlipCard value={secondTens} />
          <FlipCard value={secondOnes} />
        </div>
      </div>
    </main>
  );
}
