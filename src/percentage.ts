export const calcPercent = ({ now, start }: { now: number; start: number }) => {
  if (start === 0) return now === 0 ? 0 : Infinity;
  return ((now - start) / start) * 100;
};
