export const calcVolatility = (values: number[]): number => {
  const n = values.length;
  if (n < 2) return 0;

  let count = 0;
  let mean = 0;
  let m2 = 0;

  for (let i = 1; i < n; i++) {
    const pctChange = ((values[i] - values[i - 1]) / values[i - 1]) * 100;
    count++;
    const delta = pctChange - mean;
    mean += delta / count;
    const delta2 = pctChange - mean;
    m2 += delta * delta2;
  }

  return count < 2 ? 0 : Math.sqrt(m2 / (count - 1));
};
