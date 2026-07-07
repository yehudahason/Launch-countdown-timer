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
