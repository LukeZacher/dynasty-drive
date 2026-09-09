export const POSITIONS = [
  "QB",
  "RB",
  "FB",
  "WR",
  "TE",
  "OT",
  "OG",
  "C",
  "DE",
  "DT",
  "MLB",
  "OLB",
  "CB",
  "FS",
  "SS",
  "K",
  "P",
] as const;

export type Position = (typeof POSITIONS)[number];
