import { useEffect, useState } from "react";
import EndScreen from "./components/EndScreen";
import NavForm from "./components/NavForm";
import MainTimer from "./components/MainTimer";
export default function App() {
  function toSeconds({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  }: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) {
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  }
  const initialStart = {
    days: 9,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [start, setStart] = useState(initialStart);

  const [secondsRemaining, setSecondsRemaining] = useState(() =>
    toSeconds(initialStart),
  );

  const [endTime, setEndTime] = useState(
    () => Date.now() + toSeconds(initialStart) * 1000,
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const isEnd = secondsRemaining === 0;
  const baseUrl = import.meta.env.BASE_URL;
  const days = Math.floor(secondsRemaining / (24 * 60 * 60));

  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));

  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);

  const seconds = secondsRemaining % 60;

  function handleStart() {
    const totalSeconds = toSeconds(start);

    if (totalSeconds < 0) return;

    setSecondsRemaining(totalSeconds);
    setEndTime(() => Date.now() + totalSeconds * 1000);
    setMenuOpen(false);
  }
  useEffect(() => {
    if (endTime === null) return;

    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      setSecondsRemaining(remaining);

      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <>
      <main className="flex  flex-col gap-13 min-h-screen items-center justify-center bg-[#191A24] pt-20">
        {/* stars img */}
        <img
          className="inset-0 z-0 absolute w-full"
          src={`${baseUrl}/bg-stars.svg`}
          alt=""
        />
        {/* hills  img*/}
        <img
          className="absolute z-100 left-0 right-0 bottom-0 w-full"
          src={`${baseUrl}/pattern-hills.svg`}
          alt=""
        />
        {/* End Screen */}
        {isEnd && <EndScreen />}
        <h1 className="text-gray-100 uppercase font-bold sm:text-3xl -mt-40 text-lg">
          We're launching soon
        </h1>

        <MainTimer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        <button
          aria-label="Menu"
          type="button"
          className=" mt-6 cursor-pointer z-7001"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <img src={`${baseUrl}settings.svg`} alt="" />
        </button>

        <NavForm
          menuOpen={menuOpen}
          start={start}
          setStart={setStart}
          handleStart={handleStart}
        />
      </main>
    </>
  );
}
