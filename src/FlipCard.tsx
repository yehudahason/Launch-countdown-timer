import { useEffect, useRef, useState } from "react";

interface FlipCardProps {
  value: number;
}

export default function FlipCard({ value }: FlipCardProps) {
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

    // After top half finishes, update static base and start bottom flip
    const timer = setTimeout(() => {
      setTop(value);
      setFlipTop(false);
      setFlipBottom(true);

      // After bottom half finishes, reset
      setTimeout(() => {
        setBottom(value);
        setFlipBottom(false);
        previous.current = value;
      }, 400);
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="relative h-36 w-28" style={{ perspective: "1000px" }}>
      {/* Static Top */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-18 items-end justify-center overflow-hidden rounded-t-xl bg-[#343650] shadow-inner">
        <span className="translate-y-[50%] text-[5rem] leading-none font-bold text-[#FB5E84]">
          {top}
        </span>
      </div>

      {/* Static Bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-18 items-start justify-center overflow-hidden rounded-b-xl bg-[#2C2E44]">
        <span className="-translate-y-[50%] text-[5rem] leading-none font-bold text-[#FB5E84]">
          {bottom}
        </span>
      </div>

      {/* Animated Top */}
      {flipTop && (
        <div
          className="animate-flip-top absolute inset-x-0 top-0 z-30 flex h-18 items-end justify-center overflow-hidden rounded-t-xl bg-[#343650]"
          style={{
            transformOrigin: "bottom",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="translate-y-[50%] text-[5rem] leading-none font-bold text-[#FB5E84]">
            {topFlip}
          </span>
        </div>
      )}

      {/* Animated Bottom */}
      {flipBottom && (
        <div
          className="animate-flip-bottom absolute inset-x-0 bottom-0 z-20 flex h-18 items-start justify-center overflow-hidden rounded-b-xl bg-[#2C2E44]"
          style={{
            transformOrigin: "top",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="-translate-y-[50%] text-[5rem] leading-none font-bold text-[#FB5E84]">
            {bottomFlip}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="absolute left-0 top-1/2 z-40 h-px w-full -translate-y-1/2 bg-black/30" />

      {/* Side circles */}
      <div className="absolute -left-2 top-1/2 z-50 h-4 w-4 -translate-y-1/2 rounded-full bg-[#191A24]" />
      <div className="absolute -right-2 top-1/2 z-50 h-4 w-4 -translate-y-1/2 rounded-full bg-[#191A24]" />
    </div>
  );
}
