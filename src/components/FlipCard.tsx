import { useEffect, useRef, useState } from "react";

import type { FlipCardProps } from "../types";

export default function FlipCard({ value, left }: FlipCardProps) {
  const previous = useRef(value);

  const [top, setTop] = useState(value);
  const [bottom, setBottom] = useState(value);

  const [topFlip, setTopFlip] = useState(value);
  const [bottomFlip, setBottomFlip] = useState(value);

  const [flipTop, setFlipTop] = useState(false);
  const [flipBottom, setFlipBottom] = useState(false);

  useEffect(() => {
    if (value === previous.current) return;

    setTopFlip(previous.current);
    setBottomFlip(value);
    setFlipTop(true);

    const timer1 = setTimeout(() => {
      setTop(value);
      setFlipTop(false);
      setFlipBottom(true);

      const timer2 = setTimeout(() => {
        setBottom(value);
        setFlipBottom(false);
        previous.current = value;
      }, 400);

      // Store timer2 so cleanup can access it
      cleanupTimer2 = timer2;
    }, 400);

    let cleanupTimer2: ReturnType<typeof setTimeout>;

    return () => {
      clearTimeout(timer1);
      clearTimeout(cleanupTimer2);
    };
  }, [value]);

  return (
    <div
      className="relative aspect-5/9 sm:w-12  w-9 xs:w-10 ssm:w-11 md:w-17 lg:w-20"
      style={{ perspective: "1000px" }}
    >
      {/* Static Top */}
      <div
        className={`absolute border inset-x-0 top-0 z-12 flex h-1/2 items-end justify-center overflow-hidden ${left ? "sm:rounded-tl-xl rounded-tl  border-r-0 border-l-blue-900 border-t-blue-900" : "sm:rounded-tr-xl border-l-0 rounded-tr border-r-blue-900 border-t-blue-900"} bg-[#252530] shadow-inner`}
      >
        <span className="translate-y-[50%] text-[clamp(2rem,8vw,5rem)] leading-none font-bold text-[#FB5E84]">
          {top}
        </span>
      </div>

      {/* Static Bottom */}
      <div
        className={`absolute border inset-x-0 bottom-0 z-10 flex h-1/2 items-start justify-center overflow-hidden ${left ? "sm:rounded-bl-xl border-r-0 rounded-bl border-l-blue-900 border-b-blue-900" : "sm:rounded-br-xl border-l-0 rounded-br border-r-blue-900 border-b-blue-900"} bg-[#2C2E44]`}
      >
        <span className="translate-y-[-50%] text-[clamp(2rem,8vw,5rem)] leading-none font-bold text-[#FB5E84]">
          {bottom}
        </span>
      </div>

      {/* Animated Top */}
      {flipTop && (
        <div
          className={`animate-flip-top absolute inset-x-0 top-0 z-30 flex h-1/2 items-end justify-center overflow-hidden  bg-[#252530] border ${left ? "sm:rounded-tl-xl rounded-tl border-l-blue-900 border-r-0 border-t-blue-900" : "sm:rounded-tr-xl rounded-tr border-l-0 border-r-blue-900 border-t-blue-900"}`}
          style={{
            transformOrigin: "bottom",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="translate-y-[50%] text-[clamp(2rem,8vw,5rem)] leading-none font-bold text-[#FB5E84]">
            {topFlip}
          </span>
        </div>
      )}

      {/* Animated Bottom */}
      {flipBottom && (
        <div
          className={`border animate-flip-bottom absolute inset-x-0 bottom-0 z-20 flex h-1/2 items-start justify-center overflow-hidden  bg-[#2C2E44]
            ${left ? "sm:rounded-bl-xl border-r-0 rounded-bl border-l-blue-900 border-b-blue-900" : "sm:rounded-br-xl rounded-br border-l-0 border-r-blue-900 border-b-blue-900"}`}
          style={{
            transformOrigin: "top",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="translate-y-[-50%] text-[clamp(2rem,8vw,5rem)] leading-none font-bold text-[#FB5E84]">
            {bottomFlip}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="absolute left-0 top-1/2 z-40 h-px w-full -translate-y-1/2 bg-black/30" />

      {/* Side circles */}
      {left ? (
        <div className="absolute -left-1 top-1/2 z-50 h-2 w-2 -translate-y-1/2 rounded-full bg-[#191A24] sm:-left-2 sm:h-4 sm:w-4 " />
      ) : (
        <div className="absolute -right-1 top-1/2 z-50 h-2 w-2 -translate-y-1/2 rounded-full bg-[#191A24] sm:-right-2 sm:h-4 sm:w-4" />
      )}
    </div>
  );
}
