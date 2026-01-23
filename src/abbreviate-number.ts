import { pFloat } from "./parse-float";
import { roundDecimals } from "./round-decimals";

export const abbreviateNumber = (n: number) => {
  const isNegative = n < 0;
  const abs = Math.abs(n);

  let result: number | string;

  if (abs < 1e3) {
    result = roundDecimals(abs, 2);
  } else if (abs >= 1e3 && abs < 1e6) {
    result = `${pFloat((abs / 1e3).toFixed(2))}K`;
  } else if (abs >= 1e6 && abs < 1e9) {
    result = `${pFloat((abs / 1e6).toFixed(2))}m`;
  } else if (abs >= 1e9 && abs < 1e12) {
    result = `${pFloat((abs / 1e9).toFixed(2))}b`;
  } else if (abs >= 1e12) {
    result = `${pFloat((abs / 1e12).toFixed(2))}t`;
  } else {
    result = abs;
  }

  return isNegative
    ? typeof result === "string"
      ? `-${result}`
      : -result
    : result;
};
