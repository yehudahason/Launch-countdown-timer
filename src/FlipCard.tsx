import { useEffect, useRef, useState } from "react";

interface FlipCardProps {
  value: number;
  left: boolean;
  ones: number;
}

export default function FlipCard({ value, left, ones }: FlipCardProps) {
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

    const timer = setTimeout(() => {
      setTop(value);
      setFlipTop(false);
      setFlipBottom(true);

      setTimeout(() => {
        setBottom(value);
        setFlipBottom(false);
        previous.current = value;
      }, 400);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, ones]);

  return (
    <div
      className="relative aspect-[6/9] supersmall:w-8  w-6 xs:w-8 sm:w-12 md:w-16 lg:w-22"
      style={{ perspective: "1000px" }}
    >
      {/* Static Top */}
      <div
        className={`absolute border inset-x-0 top-0 z-10 flex h-1/2 items-end justify-center overflow-hidden ${left ? "rounded-tl-xl  border-l-blue-900 border-t-blue-900" : "rounded-tr-xl border-r-blue-900 border-t-blue-900"} bg-[#343650] shadow-inner`}
      >
        <span className="translate-y-[50%] text-[clamp(1.75rem,7vw,5rem)] leading-none font-bold text-[#FB5E84]">
          {top}
        </span>
      </div>

      {/* Static Bottom */}
      <div
        className={`absolute border inset-x-0 bottom-0 z-10 flex h-1/2 items-start justify-center overflow-hidden ${left ? "rounded-bl-xl border-l-blue-900 border-b-blue-900" : "rounded-br-xl border-r-blue-900 border-b-blue-900"} bg-[#2C2E44]`}
      >
        <span className="-translate-y-[50%] text-[clamp(1.75rem,7vw,5rem)] leading-none font-bold text-[#FB5E84]">
          {bottom}
        </span>
      </div>

      {/* Animated Top */}
      {flipTop && (
        <div
          className={`animate-flip-top absolute inset-x-0 top-0 z-30 flex h-1/2 items-end justify-center overflow-hidden  bg-[#343650] border ${left ? "rounded-tl-xl border-l-blue-900 border-t-blue-900" : "rounded-tr-xl border-r-blue-900 border-t-blue-900"}`}
          style={{
            transformOrigin: "bottom",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="translate-y-[50%] text-[clamp(1.75rem,7vw,5rem)] leading-none font-bold text-[#FB5E84]">
            {topFlip}
          </span>
        </div>
      )}

      {/* Animated Bottom */}
      {flipBottom && (
        <div
          className={`border animate-flip-bottom absolute inset-x-0 bottom-0 z-20 flex h-1/2 items-start justify-center overflow-hidden  bg-[#2C2E44]
            ${left ? "rounded-bl-xl border-l-blue-900 border-b-blue-900" : "rounded-br-xl border-r-blue-900 border-b-blue-900"}`}
          style={{
            transformOrigin: "top",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="-translate-y-[50%] text-[clamp(1.75rem,7vw,5rem)] leading-none font-bold text-[#FB5E84]">
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
