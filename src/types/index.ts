export type START = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
export interface FlipCardProps {
  value: number;
  left: boolean;
}

export interface TimeUnitProps {
  value: number;
  label: string;
}

interface StartSetter {
  (value: React.SetStateAction<START>): void;
}
export interface NavFormProps {
  menuOpen: boolean;
  start: START;
  setStart: StartSetter;
  handleStart: () => void;
  setMenuOpen: (value: boolean) => void;
  btnRef: React.RefObject<HTMLButtonElement> | null;
}

export type MainTimerProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
