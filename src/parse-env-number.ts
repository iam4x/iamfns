export const parseEnvNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};
