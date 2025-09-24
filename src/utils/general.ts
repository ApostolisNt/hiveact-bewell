export const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

export const splitName = (full: string) => {
  const [first, ...rest] = full.split(" ");
  return { first, rest: rest.join(" ") };
};

export const fmtDelta = (n: number) => `${n > 0 ? "+" : ""}${n}%`;
export const fmtMs = (n: number) => `${n}ms`;
