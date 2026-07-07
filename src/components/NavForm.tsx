import React from "react";
import type { NavFormProps } from "../types/index";

export default function NavForm({
  menuOpen,
  start,
  setStart,
  handleStart,
}: NavFormProps) {
  return (
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
            id="hours"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart((prev) => ({ ...prev, seconds: +e.target.value }))
            }
            className="max-w-[3.25rem] border border-blue-700 pl-2 py-2 text-gray-50 rounded bg-gray-700 h-7 "
          />
        </div>
        <button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleStart();
          }}
          className="hover:bg-blue-950 flex justify-center items-center py-1 rounded-2xl bg-gray-800 text-gray-50 cursor-pointer"
        >
          Apply
        </button>
      </form>
    </nav>
  );
}
