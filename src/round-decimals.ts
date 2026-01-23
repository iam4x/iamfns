export const roundDecimals = (num: number, decimals: number = 8) => {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
};
