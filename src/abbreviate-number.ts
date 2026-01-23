import { pFloat } from "./parse-float";
import { roundDecimals } from "./round-decimals";

export const abbreviateNumber = (n: number) => {
  const s = n < 0 ? "-" : "";
  const a = Math.abs(n);

  if (a < 1e3) return roundDecimals(n, 2);
  if (a >= 1e3 && a < 1e6) return `${s}${pFloat((a / 1e3).toFixed(1))}K`;
  if (a >= 1e6 && a < 1e9) return `${s}${pFloat((a / 1e6).toFixed(1))}M`;
  if (a >= 1e9 && a < 1e12) return `${s}${pFloat((a / 1e9).toFixed(1))}B`;
  if (a >= 1e12) return `${s}${pFloat((a / 1e12).toFixed(1))}T`;

  return n;
};
