export const tryParse = <T>(json: any): T | undefined => {
  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
};
