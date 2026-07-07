import { useEffect, useState } from "react";
// import FlipCard from "./FlipCard";
import TimeUnit from "./components/TimeUnit";
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

  const end2 = secondsRemaining === 0;
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
    setEnd(false);
  }
  useEffect(() => {
    if (endTime === null) return;

    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      setSecondsRemaining(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        setEnd(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <>
      <main className="flex  flex-col gap-13 min-h-screen items-center justify-center bg-[#191A24] pt-20">
        <img
          className="inset-0 z-0 absolute"
          src={`${baseUrl}/bg-stars.svg`}
          alt=""
        />
        <img
          className="absolute z-100 left-0 right-0 bottom-0"
          src={`${baseUrl}/pattern-hills.svg`}
          alt=""
        />
        {end2 ? (
          <>
            <h1 className="z-7001 sm:text-5xl text-3xl space-x-4 font-bold text-yellow-400 gradient-text">
              {" "}
              We've launched!
            </h1>
            <img
              src={`${baseUrl}BigBang.gif`}
              alt=""
              className="fixed top-0 left-0 h-screen  w-full z-7000"
            />
          </>
        ) : (
          ""
        )}
        <h1 className="text-gray-100 uppercase font-bold sm:text-3xl -mt-40 text-lg">
          We're launching soon
        </h1>

        <div className="flex justify-center mt-6 gap-4 sm:gap-6 md:gap-8">
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

        <nav
          className={` transition-transform duration-300  ${menuOpen ? "visible scale-110" : "invisible"} fixed 
        top-[45%] 
        left-[50%] translate-[-50%] z-7001`}
        >
          <form
            action=""
            className="border border-blue-700 flex flex-col gap-3 p-6 rounded-xl  bg-gray-600 text-xl text-gray-800 w-fit min-h-fit shadow-2xl"
          >
            <div className="flex justify-between items-center gap-4">
              <label htmlFor="days" className="text-gray-50">
                Days
              </label>
              <input
                className="max-w-[3.25rem] pl-2 py-2 border border-blue-700 text-gray-50 rounded bg-gray-700 h-7 "
                type="number"
                id="days"
                min={0}
                max={30}
                value={start.days}
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, days: +e.target.value }))
                }
              />
            </div>
            <div className="flex  justify-between items-center gap-4">
              <label htmlFor="hours" className="text-gray-50">
                Hours
              </label>
              <input
                value={start.hours}
                min={0}
                max={23}
                type="number"
                id="hours"
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, hours: +e.target.value }))
                }
                className="max-w-[3.25rem] border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <div className="flex  justify-between items-center gap-4">
              <label htmlFor="minutes" className="text-gray-50">
                Minutes
              </label>
              <input
                value={start.minutes}
                min={0}
                max={59}
                type="number"
                id="minutes"
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, minutes: +e.target.value }))
                }
                className="max-w-[3.25rem]  border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <div className="flex  justify-between items-center gap-4">
              <label htmlFor="seconds" className="text-gray-50">
                Seconds
              </label>
              <input
                min={0}
                max={59}
                value={start.seconds}
                type="number"
                id="seconds"
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, seconds: +e.target.value }))
                }
                className="max-w-[3.25rem] border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleStart();
              }}
              className="hover:bg-blue-950 flex justify-center items-center py-1 rounded-2xl bg-gray-800 text-gray-50 cursor-pointer"
            >
              Apply
            </button>
          </form>
        </nav>
      </main>
    </>
  );
}
