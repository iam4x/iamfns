export const take = <T>(array: T[], n: number): T[] => {
  return array.slice(0, n);
};

export const takeRight = <T>(array: T[], n: number): T[] => {
  return array.slice(-n);
};
