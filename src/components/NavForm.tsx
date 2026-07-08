import { useRef, useEffect } from "react";
import type { NavFormProps } from "../types/index";

export default function NavForm({
  menuOpen,
  start,
  setStart,
  handleStart,
  setMenuOpen,
  btnRef,
}: NavFormProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        btnRef?.current &&
        !ref.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [setMenuOpen, btnRef]);
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-settings-title"
      className={` transition-transform duration-300  ${menuOpen ? "visible scale-110" : "invisible"} fixed 
        top-[42%] 
        left-[50%] translate-[-50%] z-16`}
    >
      <h2 id="timer-settings-title" className="sr-only">
        Timer settings
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleStart();
        }}
        className="border border-blue-700 flex flex-col gap-3 p-6 rounded-xl  bg-gray-600 text-xl text-gray-800 w-fit min-h-fit shadow-2xl"
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Countdown duration</legend>
          <div className="flex justify-between items-center gap-4">
            <label htmlFor="days" className="text-gray-50">
              Days
            </label>
            <input
              className="
              focus:outline-none
  focus:ring-1
  focus:ring-blue-950
  focus:border-blue-950 max-w-[3.25rem] pl-2 py-2 border border-blue-700 text-gray-50 rounded bg-gray-700 h-7 "
              type="number"
              inputMode="numeric"
              id="days"
              name="days"
              min={0}
              max={30}
              value={start.days}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
              inputMode="numeric"
              id="hours"
              name="hours"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStart((prev) => ({ ...prev, hours: +e.target.value }))
              }
              className="
             focus:outline-none
  focus:ring-1
  focus:ring-blue-950
  focus:border-blue-950
            max-w-[3.25rem] border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
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
              inputMode="numeric"
              id="minutes"
              name="minutes"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStart((prev) => ({ ...prev, minutes: +e.target.value }))
              }
              className="
              focus:outline-none
  focus:ring-1
  focus:ring-blue-950
  focus:border-blue-950
  
            max-w-[3.25rem]  border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
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
              inputMode="numeric"
              id="seconds"
              name="seconds"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStart((prev) => ({ ...prev, seconds: +e.target.value }))
              }
              className="
              focus:outline-none
  focus:ring-1
  focus:ring-blue-950
  focus:border-blue-950
            max-w-[3.25rem] border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="
          focus:outline-none
focus:ring-2
focus:ring-blue-600
focus:border-blue-600
          hover:opacity-85 flex justify-center items-center py-1 rounded-2xl bg-blue-950 text-gray-50 cursor-pointer"
        >
          Apply
        </button>
      </form>
    </div>
  );
}
