import { useEffect, useState } from "react";
// import FlipCard from "./FlipCard";
import TimeUnit from "./TimeUnit";
export default function App() {
  const START_DAYS = 9;

  const [secondsRemaining, setSecondsRemaining] = useState(
    START_DAYS * 24 * 60 * 60,
  );

  const baseUrl = import.meta.env.BASE_URL;
  const days = Math.floor(secondsRemaining / (24 * 60 * 60));

  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));

  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);

  const seconds = secondsRemaining % 60;

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
    <>
      <main className="flex  flex-col gap-16 min-h-screen items-center justify-center bg-[#191A24]">
        <img
          className="inset-0 z-20 absolute"
          src={`${baseUrl}/bg-stars.svg`}
          alt=""
        />
        <img
          className="absolute z-10 left-0 right-0 bottom-0"
          src={`${baseUrl}/pattern-hills.svg`}
          alt=""
        />
        <h1 className="text-gray-100 uppercase font-bold sm:text-2xl mt-[-10rem] text-lg">
          We're launching soon
        </h1>
        <div className="flex mt-6 gap-4 sm:gap-6 md:gap-8">
          {/* Days Container */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-px sm:gap-2">
              {/* <FlipCard value={dayTens} />
            <FlipCard value={dayOnes} /> */}
              <TimeUnit value={days} label="DAYS" />
            </div>
          </div>
          {/* Hours Container */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1 sm:gap-2">
              <TimeUnit value={hours} label="HOURS" />
              {/* <FlipCard value={hourTens} />
            <FlipCard value={hourOnes} /> */}
            </div>
          </div>

          {/* Minutes Container */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1 sm:gap-2">
              <TimeUnit value={minutes} label="MINUTES" />
              {/* <FlipCard value={minuteTens} />
            <FlipCard value={minuteOnes} /> */}
            </div>
          </div>

          {/* Seconds Container */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1 sm:gap-2">
              <TimeUnit value={seconds} label="SECONDS" />
              {/* <FlipCard value={secondTens} />
            <FlipCard value={secondOnes} /> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
