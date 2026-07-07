import { useEffect, useState } from "react";
// import FlipCard from "./FlipCard";
import TimeUnit from "./components/TimeUnit";
import type { START } from "./types";
export default function App() {
  const [start, setStart] = useState<START>({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [endTime, setEndTime] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const baseUrl = import.meta.env.BASE_URL;
  const days = Math.floor(secondsRemaining / (24 * 60 * 60));

  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));

  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);

  const seconds = secondsRemaining % 60;

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
      <main className="flex  flex-col gap-10 min-h-screen items-center justify-center bg-[#191A24] pt-20">
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
        <h1 className="text-gray-100 uppercase font-bold sm:text-3xl -mt-40 text-lg">
          We're launching soon
        </h1>
        <button
          onClick={() =>
            setStart({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          }
        ></button>
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
          type="button"
          className="cursor-pointer z-5000"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <img src={`${baseUrl}settings.svg`} alt="" />
        </button>

        <nav
          className={`${menuOpen ? "flex" : "hidden"} fixed 
        top-[50%] 
        left-[50%] translate-[-50%] z-2000`}
        >
          <form
            action=""
            className="flex flex-col gap-3 p-6 rounded-xl  bg-gray-600 text-xl text-gray-800 w-fit min-h-fit shadow-2xl"
          >
            <div className="flex justify-between items-center gap-4">
              <label htmlFor="days" className="text-gray-50">
                Days:
              </label>
              <input
                className="max-w-[3.25rem] pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
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
                Hours:
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
                className="max-w-[3.25rem] pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <div className="flex  justify-between items-center gap-4">
              <label htmlFor="minutes" className="text-gray-50">
                Minutes:
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
                className="max-w-[3.25rem] pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <div className="flex  justify-between items-center gap-4">
              <label htmlFor="seconds" className="text-gray-50">
                Seconds:
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
                className="max-w-[3.25rem] pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                const totalSeconds = toSeconds(start);

                setSecondsRemaining(totalSeconds);
                setEndTime(Date.now() + totalSeconds * 1000);
                setMenuOpen(false);
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
